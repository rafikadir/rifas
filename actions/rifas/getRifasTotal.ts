"use server"
import { cache } from "react";
import dbConnect from "../../src/lib/db/dbConnect";
import { DB_ERROR, dbResponse } from "@/src/interfaces/responses";
import models from "@/src/models";

export const getRifasCount = cache(
	async (): Promise<dbResponse<number | null>> => {
		await dbConnect();
		try {
			const data = await models.Rifa.model.countDocuments();
			return { success: true, data };
		} catch (error) {
			return {
				success: false,
				data: null,
				errors: [{ message: DB_ERROR.MONGO_CONNECTION_ERROR }],
			};
		}
	}
);
