"use server";
import { IVendedor } from "@/src/interfaces/users";
import models from "@/src/models";
import dbConnect from "../../src/lib/db/dbConnect";

export const getVendedorByUserId = async (
	id: string
): Promise<IVendedor | null> => {
	await dbConnect();
	try {
		const vendedor = (await models.Vendedor.model
			.findOne({ userID: id })
			.select(["id"])) as IVendedor;
		return vendedor;
	} catch (error) {
		return null;
	}
};
