"use server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import { DB_ERROR, ReturnedActionType } from "@/src/interfaces/responses";
import models from "@/src/models";
import dbConnect from "@/src/lib/db/dbConnect";
import { IRifaModel } from "@/src/interfaces/rifas";

export const deleteRifaById = async (
	id: string,
	estado: string
): Promise<ReturnedActionType> => {
	const data: ReturnedActionType = {
		success: true,
		data: null,
	};
	try {
		await dbConnect();
		const session = await mongoose.startSession();
		await session.withTransaction(async () => {
			const deletedRifa = (await models.Rifa.model.findOneAndDelete(
				{ _id: id },
				{ session }
			)) as IRifaModel;

			if (deletedRifa.boletosVendidos > 0 || deletedRifa.boletosApartados > 0) {
				throw new Error(
					"La rifa no se pudo eliminar porque está en curso y ya hay boletos apartados o vendidos"
				);
			}

			if (!deletedRifa) {
				throw new Error("La rifa no existe.");
			}

			await models.Counter.model.findOneAndUpdate(
				{ key: "rifa" },
				{ $inc: { value: -1 } },
				{ new: true, upsert: true, session }
			);

			revalidatePath(`/admin/rifas/estado/${estado}`);
		});
		data.data = { ok: true };
	} catch (error) {
		data.success = false;
		if (error instanceof Error) {
			let message = error.message;
			if (!message) {
				message = "Ocurrió un error al eliminar la rifa.";
			}
			if (message.includes("for model")) {
				data.errors = [{ message: DB_ERROR.InvalidRequest }];
			} else {
				data.errors = [{ message }];
			}
		}
	} finally {
		return data;
	}
};
