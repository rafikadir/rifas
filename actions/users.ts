"use server";
import { cache } from "react";
import models from "@/src/models";
import dbConnect from "@/src/lib/db/dbConnect";

import { IUserModel } from "@/src/interfaces/users";
import { dbResponse, ReturnedActionType } from "@/src/interfaces/responses";
import { JSONDataParser } from "@/src/utils/parsers";

export const fetchAllUsers = cache(async (limit=20) => {
	const data: ReturnedActionType = { data: null, success: true };
	try {
		await dbConnect();
		const users = (await models.User.model.find({}).limit(limit)) as IUserModel[];
		data.data = JSONDataParser(users);
	} catch (error) {
		data.success = false;
		data.errors = [{ message: "Ocurrió un error al buscar los usuarios." }];
	} finally {
		return data;
	}
});

export const getUserProfile = cache(
	async (providerId: string): Promise<ReturnedActionType> => {
		const data: ReturnedActionType = { data: null, success: true };

		try {
			await dbConnect();
			const user = (await models.User.model
				.findOne({ "auth.providerId": providerId })
				.select([
					"_id",
					"name",
					"first_name",
					"last_name",
					"email",
					"phone_number",
					"image",
					"role",
					"auth",
				])) as IUserModel;
			if (!user) {
				data.success = false;
				data.errors = [{ message: "No existe el usuario." }];
			}
			data.data = JSONDataParser(user);
		} catch (error) {
			data.success = false;
			data.errors = [{ message: "Ocurrió un error al buscar el usuario." }];
		} finally {
			return data;
		}
	}
);

export const deleteUserById = async (id: string): Promise<dbResponse<null>> => {
	try {
		await dbConnect();
		const user = await models.User.model.findByIdAndDelete(id);
		if (user) return { data: null, success: true };
		return { data: null, success: false, details: "No existe el usuario." };
	} catch (error) {
		return {
			data: null,
			success: false,
			details: "Ocurrió un error al eliminar el usuario.",
		};
	}
};
