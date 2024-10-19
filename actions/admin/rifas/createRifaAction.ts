"use server";
import mongoose from "mongoose";
import { ZodError } from "zod";
import { ReturnedActionType } from "@/src/interfaces/responses";
import { IRifaModel, IRifaForm } from "@/src/interfaces/rifas";
import models from "@/src/models";

import dbConnect from "@/src/lib/db/dbConnect";
import { rifaZodSchema } from "@/src/lib/validators/rifa";
import { generarSlug } from "@/src/utils/slugGenerator";
import {
	generarListaDeBoletos,
	generarRifaSerie,
} from "@/src/utils/boletosHelpers";

export const createRifa = async (
	userData: IRifaForm
): Promise<ReturnedActionType> => {
	const data: ReturnedActionType = {
		success: true,
		data: null,
	};
	await dbConnect();
	const session = await mongoose.startSession();
	try {
		const result = rifaZodSchema.safeParse(userData);

		if (!result.success) {
			throw new ZodError(result.error.issues);
		}

		let rifaSlug = "";
		await session.withTransaction(async () => {
			const slug = generarSlug(result.data.title);
			const boletos = generarListaDeBoletos(1, result.data.ticketsTotal);
			const serie = await generarRifaSerie(session);
			const publicId = new mongoose.Types.ObjectId().toString();

			const newRifa = (
				await models.Rifa.model.create(
					[{ ...result.data, publicId, boletos, slug, serie }],
					{
						session,
					}
				)
			)[0] as IRifaModel;
			rifaSlug = newRifa.slug;
		});
		await session.endSession();
		data.data = { created: true };
		data.details = `/admin/rifas/${rifaSlug}`;
	} catch (error) {
		data.success = false;
		if (error instanceof ZodError) {
			data.errors = error.issues;
		} else if (error instanceof Error) {
			let message = error.message;
			if (!message) message = "No se pudo crear la rifa.";
			if (message.includes("duplicate key error"))
				message = `El nombre de la rifa: ${userData.title} ya está en uso.`;
			data.errors = [{ message }];
		}
	} finally {
		session.endSession();
	}
	return data;
};
