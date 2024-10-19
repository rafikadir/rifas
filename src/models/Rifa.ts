import mongoose, { Schema } from "mongoose";
import { rifaStatus, IRifaModel } from "@/src/interfaces/rifas";
import { validatorErrorMessages } from "../lib/validators/createErrorsMessages";
import {
	MAX_LENGTH_DESCRIPTION,
	MAX_LENGTH_IMAGEN_URL,
	MAX_LENGTH_TITLE,
	MIN_LENGTH_DESCRIPTION,
	MIN_LENGTH_IMAGEN_URL,
	MIN_LENGTH_TITLE,
	MIN_LENGTH_PREMIOS,
	MONGO_ID_LENGTH,
	MIN_RIFA_BOLETOS,
	MIN_RIFA_PRICE,
	MIN_RIFA_SERIE,
} from "@/src/lib/validators/createErrorsMessages";
import { BoletoSchema } from "./Boleto";

const { rifa, premios } = validatorErrorMessages;

export const RifaSchema = new Schema<IRifaModel>(
	{
		publicId: {
			type: String,
			unique: true,
			required: [true, rifa.publicId.required_error],
		},
		slug: {
			type: String,
			sparse: true,
			unique: true,
			default: null,
		},
		serie: {
			type: String,
			min: MIN_RIFA_SERIE,
			required: [true, "La serie es requerida."],
			sparse: true,
			unique: true,
		},
		title: {
			type: String,
			required: [true, rifa.title.required_error],
			trim: true,
			lowercase: true,
			minlength: [MIN_LENGTH_TITLE, rifa.title.minLength_error],
			maxlength: [MAX_LENGTH_TITLE, rifa.title.maxLength_error],
		},
		description: {
			type: String,
			required: [true, rifa.description.required_error],
			trim: true,
			minlength: [MIN_LENGTH_DESCRIPTION, rifa.description.minLength_error],
			maxlength: [MAX_LENGTH_DESCRIPTION, rifa.description.maxLength_error],
		},
		ticketsTotal: {
			type: Number,
			required: [true, rifa.ticketsTotal.required_error],
			min: [MIN_RIFA_BOLETOS, rifa.ticketsTotal.minLength_error],
		},
		price: {
			type: Number,
			required: [true, rifa.price.required_error],
			min: [MIN_RIFA_PRICE, rifa.price.positive_error],
		},
		startDate: {
			type: Date,
			default: null,
		},
		endDate: {
			type: Date,
			default: null,
		},
		prizes: {
			type: [
				{
					title: {
						type: String,
						required: [true, premios.title.required_error],
						trim: true,
						lowercase: true,
						minlength: [MIN_LENGTH_TITLE, premios.title.minLength_error],
						maxlength: [MAX_LENGTH_TITLE, premios.title.minLength_error],
					},
					description: {
						type: String,
						required: [true, premios.description.required_error],
						trim: true,
						minlength: [
							MIN_LENGTH_DESCRIPTION,
							premios.description.minLength_error,
						],
						maxlength: [
							MAX_LENGTH_DESCRIPTION,
							premios.description.maxLength_error,
						],
					},
					url: {
						type: String,
						trim: true,
					},
				},
			],
			minlength: MIN_LENGTH_PREMIOS,
			maxlength: MIN_LENGTH_PREMIOS,
			required: [true, "Añade al menos 1 premio."],
		},
		imageUrl: {
			type: String,
			minLength: [MIN_LENGTH_IMAGEN_URL, rifa.imageUrl.minLength_error],
			maxLength: [MAX_LENGTH_IMAGEN_URL, rifa.imageUrl.maxLength_error],
		},
		winnerTicketId: {
			type: String,
			trim: true,
			default: null,
		},
		boletosVendidos: { type: Number, default: 0 },
		boletosApartados: { type: Number, default: 0 },
		boletos: {
			type: Map,
			of: BoletoSchema,
			default: {},
		},
		estado: {
			type: String,
			enum: Object.values(rifaStatus),
			default: rifaStatus.ACTIVA,
		},
		vendedorId: {
			type: String,
			required: [true, rifa.vendedorId.required_error],
			minlength: [MONGO_ID_LENGTH, rifa.vendedorId.minLength_error],
			maxlength: [MONGO_ID_LENGTH, rifa.vendedorId.maxLength_error],
		},
	},
	{
		timestamps: true,
		versionKey: false,
		toJSON: { virtuals: true },
		toObject: { virtuals: true },
	}
);

RifaSchema.path("slug").index({ unique: true });
RifaSchema.path("serie").index({ unique: true });

// // Virtual para contar boletos ocupados, apartados y vendidos
// RifaSchema.virtual("countBoletos").get(function (this: IRifa) {
//   const ocupadosCount = Object.keys(this.boletosOcupados || {}).length;
//   return ocupadosCount;
// });

// RifaSchema.pre('deleteOne', {document:true}, async function(){
//   const rifaId = this._id;
//   if(!rifaId) return;
//   await BoletosModel.deleteOne({ id_rifa: rifaId });
// })

const Rifa =
	mongoose.models?.Rifa || mongoose.model<IRifaModel>("Rifa", RifaSchema);

export type RifaSchemaType = typeof RifaSchema;
export default Rifa;
