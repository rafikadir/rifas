"use server";

import models from "@/src/models";
import dbConnect from "@/src/lib/db/dbConnect";
import { VentaModelType } from "@/src/interfaces/venta";
import { dbResponse } from "@/src/interfaces/responses";
import { JSONDataParser } from "@/src/utils/parsers";

export const getPendingVentas = async (
	limit: number
	// offset = 0
): Promise<dbResponse<VentaModelType[]>> => {
	await dbConnect();
	try {
		const data = await models.Venta.model.find({}).limit(limit).lean();
		const parsedData = JSONDataParser(data);
		return { success: true, data: parsedData };
	} catch (error) {
		return {
			success: false,
			errors: [{ message: "Ocurrió un error al leer las ventas." }],
			data: [],
		};
	}
};

