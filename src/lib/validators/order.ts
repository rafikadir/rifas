import { z } from "zod";
import {
	MONGO_ID_LENGTH,
	validatorErrorMessages,
} from "./createErrorsMessages";

const orderItemZodSchema = z.object({
	boletosApartados: z.array(
		z.number({
			invalid_type_error: "Ingresa un número de boleto válido.",
			required_error: "El número de bolero es requerido.",
		})
	),
});

const { cliente } = validatorErrorMessages;

export const orderZodSchema = z.object({
	cliente: z.object({
		id: z
			.string({
				invalid_type_error: cliente.id.invalid_type_error,
				required_error: cliente.id.required_error,
			})
			.trim()
			.min(MONGO_ID_LENGTH, cliente.id.minLength_error)
			.max(MONGO_ID_LENGTH, cliente.id.maxLength_error),
		fullName: z
			.string({
				invalid_type_error: cliente.fullName.invalid_type_error,
				required_error: cliente.fullName.required_error,
			})
			.trim()
			.min(1, cliente.fullName.minLength_error)
			.max(50, cliente.fullName.maxLength_error),
		phoneNumber: z
			.string({
				invalid_type_error: cliente.phoneNumber.invalid_type_error,
				required_error: cliente.phoneNumber.required_error,
			})
			.nullable()
			.optional(),
		email: z
			.string({
				invalid_type_error: cliente.email.invalid_type_error,
				required_error: cliente.email.required_error,
			})
			.trim()
			.min(1, cliente.email.minLength_error)
			.max(50, cliente.email.maxLength_error),
	}),
	order: z.record(z.string().trim(), orderItemZodSchema, {
		message: "Ingresa una orden válida.",
	}),
});

export type OrderZodSchemaType = z.infer<typeof orderZodSchema>;
