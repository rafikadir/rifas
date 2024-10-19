"use server"

import { cache } from "react";
import models from "@/src/models";
import dbConnect from "@/src/lib/db/dbConnect";
import { DB_ERROR, dbResponse } from "@/src/interfaces/responses";
import { IRifaModel } from "@/src/interfaces/rifas";

export const getRifaBySlugAndSellerId = cache(
	async (
		slug: string,
		vendedorId: string
	): Promise<dbResponse<IRifaModel | null>> => {
		await dbConnect();
		const data: dbResponse<IRifaModel | null> = {
			data: null,
			success: true,
		};
		try {
			const rifa = await models.Rifa.model.findOne({ slug }).where({
				vendedorId,
			});

			if (!rifa) {
				throw new Error("La rifa no existe");
			}

			data.data = rifa;
		} catch (error) {
			data.success = false;
			if (error instanceof Error) {
				let message = error.message;
				if (!message) message = DB_ERROR.MONGO_CONNECTION_ERROR;
				data.errors = [{ message }];
			}
		} finally {
			return data;
		}
	}
);
