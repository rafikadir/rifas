import {
	MAX_LENGTH_DESCRIPTION,
	MAX_LENGTH_PREMIOS,
	MAX_LENGTH_TITLE,
	MIN_LENGTH_DESCRIPTION,
	MIN_LENGTH_IMAGEN_URL,
	MIN_LENGTH_PREMIOS,
	MIN_LENGTH_TITLE,
	MONGO_ID_LENGTH,
} from "@/src/lib/validators/createErrorsMessages";
import { z } from "zod";
import { validatorErrorMessages } from "./createErrorsMessages";

const { rifa, premios } = validatorErrorMessages;

// const imageValidator = z
// 	.instanceof(File)
// 	.nullable()
// 	.optional()
// 	.refine(
// 		(file) => {
// 			if (!file) return true; // Si no hay archivo, es válido
// 			return ["image/jpeg", "image/png"].includes(file.type); // Validar tipo de archivo
// 		},
// 		{
// 			message: "El archivo debe ser una imagen (jpeg o png).",
// 		}
// 	)
// 	.refine(
// 		(file) => {
// 			if (!file) return true; // Si no hay archivo, es válido
// 			return file.size <= MAX_SIZE_IMAGE_FILE; // Máximo 5MB
// 		},
// 		{
// 			message: "El tamaño de la imagen no debe exceder los 5MB.",
// 		}
// 	);

export const premiosZodSchema = z.object({
	title: z
		.string({
			required_error: premios.title.required_error,
			invalid_type_error: premios.title.invalid_type_error,
		})
		.trim()
		.min(MIN_LENGTH_TITLE, {
			message: premios.title.minLength_error,
		})
		.max(MAX_LENGTH_TITLE, {
			message: premios.title.maxLength_error,
		})
		.toLowerCase(),
	description: z
		.string({
			required_error: premios.description.required_error,
			invalid_type_error: premios.description.invalid_type_error,
		})
		.trim()
		.min(MIN_LENGTH_DESCRIPTION, {
			message: premios.description.minLength_error,
		})
		.max(MAX_LENGTH_DESCRIPTION, {
			message: premios.description.maxLength_error,
		})
		.toLowerCase(),
	url: z
		.string({
			invalid_type_error: rifa.prizes.url.invalid_type_error,
			required_error: rifa.prizes.url.required_error,
		})
		.min(MIN_LENGTH_IMAGEN_URL, {
			message: rifa.prizes.url.required_error,
		}),
});

export const rifaZodSchema = z.object({
	title: z
		.string({
			required_error: rifa.title.required_error,
			invalid_type_error: rifa.title.invalid_type_error,
		})
		.trim()
		.min(MIN_LENGTH_TITLE, {
			message: rifa.title.minLength_error,
		})
		.max(MAX_LENGTH_TITLE, {
			message: rifa.title.maxLength_error,
		})
		.toLowerCase(),
	description: z
		.string({
			required_error: rifa.description.required_error,
			invalid_type_error: rifa.description.invalid_type_error,
		})
		.trim()
		.min(MIN_LENGTH_DESCRIPTION, {
			message: rifa.description.minLength_error,
		})
		.max(MAX_LENGTH_TITLE, {
			message: rifa.description.maxLength_error,
		})
		.toLowerCase(),
	ticketsTotal: z.coerce
		.number({
			required_error: rifa.ticketsTotal.required_error,
			invalid_type_error: rifa.ticketsTotal.invalid_type_error,
		})
		.positive(rifa.ticketsTotal.positive_error),
	price: z.coerce
		.number({
			invalid_type_error: rifa.price.invalid_type_error,
			required_error: rifa.price.required_error,
		})
		.positive(rifa.price.positive_error),
	estado: z.string({
		invalid_type_error: rifa.estado.invalid_type_error,
		required_error: rifa.estado.required_error,
	}),
	// publicId: z
	// 	.string({
	// 		invalid_type_error: rifa.publicId.invalid_type_error,
	// 		required_error: rifa.publicId.required_error,
	// 	}),
		// .min(MONGO_ID_LENGTH, {
		// 	message: rifa.publicId.minLength_error,
		// })
		// .max(MONGO_ID_LENGTH, {
		// 	message: rifa.publicId.maxLength_error,
		// }),
	imageUrl: z
		.string({
			invalid_type_error: rifa.imageUrl.invalid_type_error,
			required_error: rifa.imageUrl.required_error,
		})
		.min(MIN_LENGTH_IMAGEN_URL, {
			message: rifa.imageUrl.required_error,
		}),
	startDate: z
		.string({
			invalid_type_error: rifa.startDate.invalid_type_error,
			required_error: rifa.startDate.required_error,
		})
		.nullable()
		.optional()
		.refine(
			(date) => {
				if (!date) return true; // Si es nulo o indefinido, es válido
				return new Date(date) >= new Date();
			},
			{
				message: "Fecha de inicio no puede ser menor a hoy.",
			}
		),
	endDate: z
		.string({
			invalid_type_error: rifa.endDate.invalid_type_error,
			required_error: rifa.endDate.required_error,
		})
		.nullable()
		.optional()
		.refine(
			(date) => {
				if (!date) return true; // Si es nulo o indefinido, es válido
				return new Date(date) >= new Date(); // Validar solo si existe
			},
			{
				message: "Fecha de fin no puede ser menor a hoy.",
			}
		),
	prizes: z
		.array(premiosZodSchema, { message: "Ingresa al menos 1 premio." })
		.min(MIN_LENGTH_PREMIOS, { message: "Debes agregar al menos un premio." })
		.max(MAX_LENGTH_PREMIOS, {
			message: "No puedes agregar más de 10 premios.",
		}),
	vendedorId: z
		.string({
			required_error: rifa.vendedorId.required_error,
			invalid_type_error: rifa.vendedorId.invalid_type_error,
		})
		.trim()
		.min(MONGO_ID_LENGTH, { message: rifa.vendedorId.minLength_error })
		.max(MONGO_ID_LENGTH, { message: rifa.vendedorId.maxLength_error }),
});

export type RifaZodSchemaType = z.infer<typeof rifaZodSchema>;
export type RifaZodFormattedErrors = z.inferFlattenedErrors<
	typeof rifaZodSchema
>;
