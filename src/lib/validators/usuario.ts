import { z } from "zod";
import {
	MONGO_ID_LENGTH,
	validatorErrorMessages,
} from "./createErrorsMessages";

/**
 * Midleware para validar los datos del usuario
 */
const { vendedor } = validatorErrorMessages;

export const userSignInZodSchema = z.object({
	email: z.string().trim().email().toLowerCase(),
	password: z.string().min(8).max(64),
});

export const userSignUpZodSchema = z
	.object({
		name: z
			.string({
				required_error: "El nombre es requerido.",
				invalid_type_error: "El nombre debe ser una cadena de texto.",
			})
			.trim()
			.min(3, "El nombre debe contener al menos 3 carácteres.")
			.max(50, "El nombre debe contener máximo 50 carácteres.")
			.toLowerCase(),
		last_name: z
			.string({
				required_error: "El apellido es requerido.",
				invalid_type_error: "El apellido debe ser una cadena de texto.",
			})
			.trim()
			.min(3, "El apellido debe contener al menos 3 carácteres.")
			.max(50, "El apellido debe contener máximo 50 carácteres.")
			.toLowerCase(),

		email: z
			.string({
				required_error: "El email es requerido.",
				invalid_type_error: "El email debe ser una cadena de texto.",
			})
			.trim()
			.email("El email es inválido.")
			.toLowerCase(),
		phone_number: z
			.string({
				required_error: "El número de teléfono es requerido.",
				invalid_type_error:
					"El número de teléfono debe ser una cadena de texto.",
			})
			.trim()
			.min(10, "El teléfono debe contener al menos 10 carácteres.")
			.max(15, "El teléfono debe contener máximo 15 carácteres."),

		password: z
			.string({
				required_error: "La contraseña es requerida.",
				invalid_type_error: "La contraseña debe ser una cadena de texto.",
			})
			.min(8, "La contraseña debe contener al menos 8 carácteres.")
			.max(64, "La contraseña debe contener máximo 64 carácteres."),
		password_confirmation: z.string({
			required_error: "Por favor, confirma tu contraseña.",
			invalid_type_error:
				"La confirmación de contraseña debe ser una cadena de texto.",
		}),
	})
	.strict()
	.refine((data) => data.password === data.password_confirmation, {
		message: "Las contraseñas no coinciden.",
		path: ["password_confirmation"],
	});

export const createAdminZodSchema = z.object({
	userID: z
		.string({
			required_error: vendedor.userID.required_error,
			invalid_type_error: vendedor.userID.invalid_type_error,
		})
		.trim()
		.min(MONGO_ID_LENGTH, {
			message: vendedor.userID.minLength_error,
		})
		.max(MONGO_ID_LENGTH, {
			message: vendedor.userID.maxLength_error,
		}),
});

export type CreateAdminZodSchemaType = z.infer<typeof createAdminZodSchema>;
