import models from "@/src/models";
import { DB_ERROR, dbResponse } from "@/src/interfaces/responses";
import { IRifaModel, RifaStatusType } from "@/src/interfaces/rifas";
import dbConnect from "../../src/lib/db/dbConnect";
import { cache } from "react";

export const adminGetRifasByEstado = cache(async (
	estado: RifaStatusType
): Promise<dbResponse<IRifaModel[]>> => {
	const data: dbResponse<IRifaModel[]> = {
		data: [],
		success: true,
	};
	await dbConnect();
	try {
		const rifas = await models.Rifa.model
			.find({
				estado,
			})
			.sort({ endDate: -1 })
			.limit(10);

		data.data = rifas;
	} catch (error) {
        data.success = false;
		data.errors = [{ message: DB_ERROR.MONGO_CONNECTION_ERROR }];
	} finally {
		return data;
	}
});
