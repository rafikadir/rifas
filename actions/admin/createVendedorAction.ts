"use server";
import mongoose from "mongoose";

import { ReturnedActionType } from "@/src/interfaces/responses";

import models from "@/src/models";
import dbConnect from "@/src/lib/db/dbConnect";
import { createAdminZodSchema } from "@/src/lib/validators/usuario";
import { ZodError } from "zod";
import { IUserModel, IVendedor, userRoles } from "@/src/interfaces/users";
import { revalidatePath } from "next/cache";

export const registrarNuevoVendedor = async (
	userID: string
): Promise<ReturnedActionType> => {
	const data: ReturnedActionType = {
		data: null,
		success: true,
	};
	try {
		await dbConnect();
		const session = await mongoose.startSession();

		const validatedFields = createAdminZodSchema.safeParse({ userID });
		if (!validatedFields.success) {
			throw new ZodError(validatedFields.error.issues);
		}

		await session.withTransaction(async () => {
			const vendedorExist = (await models.Vendedor.model.findOne({userID})) as IVendedor;
			const userExists = (await models.User.model.findById(userID)) as IUserModel;

			if (vendedorExist) {
				throw new Error(`El vendedor con ID: ${userID} ya existe`);
			}
			if (!userExists) {
				throw new Error(`El usuario con ID: ${userID} no existe`);
			}
			if (!userExists) {
				throw new Error(`El usuario con ID: ${userID} no existe`);
			}

			if (userExists.role === userRoles.CLIENTE) { // leave admin as an admin
				userExists.role = userRoles.VENDEDOR;
			}

			await userExists.save({ session });

			const nuevoVendedor = new models.Vendedor.model({
				userID,
			});
			await nuevoVendedor.save({ session });
		});
		await session.endSession();

		revalidatePath("/admin/usuarios");
		data.data = { ok: true };
	} catch (error) {
		data.success = false;
		if (error instanceof ZodError) {
			data.errors = error.issues;
		} else if (error instanceof Error) {
			let message = error.message;
			if (message.includes("Cast to ObjectId failed"))
				message = "ID de usuario inválido";
			if (message.includes("E11000"))
				message = "El vendedor ya existe";
			if (!message) message = "No se pudo añadir al miembro";
			data.errors = [{ message }];
		}
	} finally {
		return data;
	}
};
