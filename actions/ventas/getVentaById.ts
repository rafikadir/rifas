"use server";

import models from "@/src/models";
import dbConnect from "@/src/lib/db/dbConnect";
import { ReturnedActionType } from "@/src/interfaces/responses";
import { JSONDataParser } from "@/src/utils/parsers";

export const getVentaById = async (id: string) => {
	await dbConnect();
	const data: ReturnedActionType = {
		data: null,
		success: true,
	};
	try {
        const ventaExist =await models.Venta.model.findById(id).lean();
        if(!ventaExist) throw new Error("La Venta no existe");
        data.data = JSONDataParser(ventaExist);
    } catch (error) {
		if (error instanceof Error) {
			const message = error.message;
			data.errors = [{ message }];
		}
	} finally {
		return data;
	}
};
