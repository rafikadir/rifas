import { Schema, model, models } from "mongoose";
import { VentaStatus, VentaType } from "../interfaces/venta";
import { venta } from "../lib/validators/createErrorsMessages";
import { OrderSchema } from "./Order";

const _12_HRS = 12 * 60 * 60; // 12 horas en segundos



export const VentaSchema = new Schema<VentaType>(
	{
		total: {
			type: Number,
		},
		cliente: {
			id: {
				type: String,
				required: [true, venta.clienteId.required_error],
			},
			fullName: {
				type: String,
				required: [true, venta.clienteFullName.required_error],
			},
			phoneNumber: {
				type: String,
				default: null,
			},
			email: {
				type: String,
				required: [true, venta.clienteEmail.required_error],
			},
		},
		reciboUrl: {
			type: String,
			default: null,
		},
		estado: {
			type: String,
			enum: Object.values(VentaStatus),
			default: VentaStatus.PENDIENTE,
		},
		expireAt: {
			type: Date,
			expires: _12_HRS,
			default: function () {
				return new Date(Date.now() + _12_HRS * 1000); // Expiración 12 horas después de la creación
			},
		},
		order: {
			index: true,
			type: [OrderSchema],
			minlength: [1, "Ingresa al menos 1 orden"],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Venta = models?.Venta || model<VentaType>("Venta", VentaSchema);
export default Venta;
