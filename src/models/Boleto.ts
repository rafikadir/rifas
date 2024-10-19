import { Schema } from "mongoose";
import { boletoStatus, IBoleto } from "../interfaces/boletos";

export const BoletoSchema = new Schema<IBoleto>(
	{
		estado: {
			type: String,
			enum: Object.values(boletoStatus),
			default: boletoStatus.DISPONIBLE,
		},
		idPublico: {
			type: String,
			required: [true, "Ingresa un id público."]
		},
		reservadoHasta: {
			type: Date,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	}
);

// const Boleto = models?.Boleto || model<IBoleto>("Boleto", BoletoSchema);
// export default Boleto;
