"use server"

import { ReturnedActionType } from "@/src/interfaces/responses";
import { IUser } from "@/src/interfaces/users";
import dbConnect from "@/src/lib/db/dbConnect";
import models from "@/src/models";


export const createUserFromAuth = async (
	userData: IUser
): Promise<ReturnedActionType> => {
	const data: ReturnedActionType = {
		success: true,
		data: null,
	};
	await dbConnect();

    try {
        await models.User.model.create(userData);
        data.data = {ok: true};

    } catch (error) {
        data.success = false;
		if (error instanceof Error) {
			let message = error.message;
			if (!message) message = "No se pudo crear la rifa.";
        }
    }
    return data;

};
