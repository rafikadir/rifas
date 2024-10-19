import models from "@/src/models";
import dbConnect from "@/src/lib/db/dbConnect";
import { ReturnedActionType } from "@/src/interfaces/responses";
import { JSONDataParser } from "@/src/utils/parsers";

export const getClienteComprasByStatus = async (id: string, estado: string): Promise<ReturnedActionType> => {
	const data: ReturnedActionType = {
		data: null,
		success: true,
	};
    await dbConnect();
	try {
        const compras = await models.Venta.model.find({ "cliente.id": id }).where({estado}).lean({});
		if (compras.length === 0) {
            data.data = JSONDataParser([]);
            return data;
        }
		data.data = JSONDataParser(compras);
	} catch (error) {
		data.success = false;
		if (error instanceof Error) {
			const message = error.message;
			data.errors = [{ message }];
		}
	} finally {
		return data;
	}
};
