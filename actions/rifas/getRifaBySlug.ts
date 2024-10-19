"use server"
import { DB_ERROR, ReturnedActionType } from "@/src/interfaces/responses";
import dbConnect from "../../src/lib/db/dbConnect";
import models from "@/src/models";
import { JSONDataParser } from "@/src/utils/parsers";

export const getRifaBySlug = async (
	slug: string
): Promise<ReturnedActionType> => {
	const data: ReturnedActionType = {
		data: null,
		success: true,
	};
	await dbConnect();
	try {
		const rifa = await models.Rifa.model
			.findOne({ slug })
			.select([
				"_id",
				"slug",
				"serie",
				"title",
				"description",
				"ticketsTotal",
				"imageUrl",
				"price",
				"startDate",
				"endDate",
				"prizes",
				"boletos",
				"estado",
			]);

		if (!rifa) {
			throw new Error("La rifa no existe");
		} else {
			data.data = JSONDataParser(rifa);
		}
	} catch (error) {
		data.success = false;
		if (error instanceof Error) {
			const message = error.message;
			if (!message) {
				data.errors = [{ message: DB_ERROR.MONGO_CONNECTION_ERROR }];
			} else {
				data.errors = [{ message }];
			}
		}
	} finally {
		return data;
	}
};
