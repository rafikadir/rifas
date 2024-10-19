import { Schema, model, models } from "mongoose";
import { OrderItemType } from "../interfaces/orders";

export const OrderSchema = new Schema<OrderItemType>(
	{
		serie: String,
		title: String,
		price: Number,
		boletosApartados: {
			type: [Number],
			required: [true, "Escoge tus boletos para completar la orden."],
		},
		boletosGratis: [Number],
		subtotal: {
			type: Number,
			required: [true, "El subtotal el requerido."],
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

const Order = models?.Order || model<OrderItemType>("Order", OrderSchema);
export default Order;
