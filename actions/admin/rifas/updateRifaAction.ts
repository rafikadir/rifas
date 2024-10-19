"use server";

import { revalidatePath } from "next/cache";
import { ZodError } from "zod";
import { ReturnedActionType } from "@/src/interfaces/responses";
import { IRifaForm, IRifaModel, rifaStatus } from "@/src/interfaces/rifas";
import { rifaZodSchema } from "@/src/lib/validators/rifa";
import models from "@/src/models";
import { generarListaDeBoletos } from "@/src/utils/boletosHelpers";
import { generarSlug } from "@/src/utils/slugGenerator";
import { IBoleto } from "@/src/interfaces/boletos";
import mongoose from "mongoose";

export const updateRifa = async (
	publicId: string,
	userData: IRifaForm
): Promise<ReturnedActionType> => {
	const data: ReturnedActionType = {
		success: true,
		data: null,
	};
	const session = await mongoose.startSession();

	try {
		const result = rifaZodSchema.safeParse(userData);
		if (!result.success) {
			throw new ZodError(result.error.issues);
		}

		const rifaExist = (await models.Rifa.model.findOne({
			publicId,
		})) as IRifaModel;
		if (!rifaExist) throw new Error("La rifa no existe");

		if (result.data.ticketsTotal > rifaExist.ticketsTotal) {
			if (
				rifaExist.estado === rifaStatus.ACTIVA ||
				rifaExist.estado === rifaStatus.PROXIMA
			) {
				throw new Error(
					"La rifa ya ha comenzado o está por comenzar. Actualiza primero el estado de la rifa a 'oculta' e intenta de nuevo."
				);
			}
			const boletos = generarListaDeBoletos(
				(rifaExist.boletos as Map<string, IBoleto>).size,
				result.data.ticketsTotal
			);
			rifaExist.boletos = { ...rifaExist.boletos, ...boletos };
		} else if (result.data.ticketsTotal < rifaExist.ticketsTotal) {
			if (rifaExist.boletosApartados > 0 || rifaExist.boletosVendidos > 0)
				throw new Error("No puedes eliminar boletos");
		}

		const slug = generarSlug(result.data.title);
		rifaExist.updateOne(
			{
				...result.data,
				slug,
			},
			{ new: true }
		);
		await rifaExist.save({ session });

		data.data = { ok: true };
		data.details = `/admin/rifas/${rifaExist.slug}`;
		revalidatePath(`/amdin/rifas/${rifaExist.slug}`);
	} catch (error) {
		if (error instanceof ZodError) {
			data.errors = error.issues;
		} else if (error instanceof Error) {
			let message = error.message;
			if (!message) {
				message = "Ocurrió un error al eliminar la rifa.";
			}
			if (message.includes("duplicate key error"))
				message = `El nombre de la rifa: ${userData.title} ya está en uso.`;
			data.errors = [{ message }];
		}
	} finally {
		session.endSession();
	}
	return data;
};
