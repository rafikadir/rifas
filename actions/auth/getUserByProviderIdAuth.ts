"use server"
import { ReturnedActionType } from "@/src/interfaces/responses";
import dbConnect from "@/src/lib/db/dbConnect";
import models from "@/src/models";
import { JSONDataParser } from "@/src/utils/parsers";

export const getUserByProviderIdAuth = async (
	providerId: string
): Promise<ReturnedActionType> => {
	const data: ReturnedActionType = {
		data: null,
		success: true,
	};
	await dbConnect();
	try {
		const userExist = await models.User.model
        .findOne({
            "auth.providerId": providerId,
        })
        .select(["_id", "role", "auth"]).lean();    
		if (!userExist) throw new Error("El usuario no existe");
		data.data = JSONDataParser(userExist);
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
