"use server"
import { DB_ERROR, dbResponse } from "@/src/interfaces/responses";
import { JSONDataParser } from "@/src/utils/parsers";
import {
	IPublicRifaModel,
	rifaStatus,
	RifaStatusType,
} from "@/src/interfaces/rifas";
import dbConnect from "../../src/lib/db/dbConnect";
import models from "@/src/models";

export const getAllRifas = async (): Promise<
	dbResponse<IPublicRifaModel[] | null>
> => {
	try {
		await dbConnect();
		const data = (await models.Rifa.model
			.find(
				{},
				{
					slug: 1,
					serie: 1,
					title: 1,
					description: 1,
					ticketsTotal: 1,
					imageUrl: 1,
					price: 1,
					startDate: 1,
					endDate: 1,
					prizes: 1,
					boletosOcupados: 1,
					estado: 1,
				}
			)
			.lean({})
			.where({
				estado:
					rifaStatus.ACTIVA || rifaStatus.PROXIMA || rifaStatus.FINALIZADA,
			})
			.sort({ startDate: -1 })
			.limit(10)) as IPublicRifaModel[];
		const dataParsed = JSONDataParser(data);
		return {
			success: true,
			data: dataParsed,
		};
	} catch (error) {
		return {
			success: false,
			errors: [{ message: DB_ERROR.MONGO_CONNECTION_ERROR }],
			data: null,
		};
	}
};

export const getRifasByEstado = async (
	estado: RifaStatusType
): Promise<dbResponse<IPublicRifaModel[] | null>> => {
	try {
		await dbConnect();
		// Obtener las primeras 10 rifas
		const data = await models.Rifa.model
			.find(
				{
					estado,
					// endDate: { $lt: new Date() }, // fecha de fin en el pasado
				},
				{
					slug: 1,
					serie: 1,
					title: 1,
					description: 1,
					ticketsTotal: 1,
					imageUrl: 1,
					price: 1,
					startDate: 1,
					endDate: 1,
					prizes: 1,
					boletosOcupados: 1,
					estado: 1,
				}
			)
			.lean({})
			.sort({ endDate: -1 })
			.limit(10);

		const dataParsed = JSONDataParser(data) as IPublicRifaModel[];

		return {
			success: true,
			data: dataParsed,
		};
	} catch (error) {
		return {
			success: false,
			errors: [{ message: DB_ERROR.MONGO_CONNECTION_ERROR }],
			data: null,
		};
	}
};
