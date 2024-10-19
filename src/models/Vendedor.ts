import { model, models, Schema } from "mongoose";
import { IVendedor } from "../interfaces/users";

export const VendedorSchema = new Schema<IVendedor>(
	{
		userID: {
			type: String,
			required: [true, "userID es obligatorio."],
			unique: true,
		},
		rifas: [
			{
				type: String,
				default: [],
			},
		],
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// VendedorSchema.path("userID").index({ unique: true });

const Vendedor =
	models?.Vendedor || model<IVendedor>("Vendedor", VendedorSchema);
export default Vendedor;
