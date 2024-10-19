"use server"
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import models from "@/src/models";
import { boletoStatus, IBoleto } from "@/src/interfaces/boletos";
import { ReturnedActionType } from "@/src/interfaces/responses";
import { IRifaModel } from "@/src/interfaces/rifas";
import { VentaModelType, VentaStatus } from "@/src/interfaces/venta";
import dbConnect from "@/src/lib/db/dbConnect";

export const cancelarVentaById = async (
	id: string
): Promise<ReturnedActionType> => {
	await dbConnect();
	const data: ReturnedActionType = {
		data: null,
		success: false,
	};
	const session = await mongoose.startSession();

	try {
		await session.withTransaction(async () => {
			const venta = (await models.Venta.model
				.findById(id)) as VentaModelType;

            if(venta.estado === VentaStatus.CANCELADA) throw new Error("La venta ya está cancelada");
            if(venta.estado === VentaStatus.PAGADA) throw new Error("La venta no se puede cancelar porque ya se pagó");
                
			for (const order of venta.order) {
				const rifa = (await models.Rifa.model
					.findOne({ serie: order.serie })
					.session(session)) as IRifaModel;

				if (!rifa) throw new Error(`La rifa ${order.serie} no existe`);

				for (const boletoApartado of order.boletosApartados) {
					const boleto = (rifa.boletos as Map<string, IBoleto>).get(
						String(boletoApartado)
					);

					if (boleto) {
						boleto.estado = boletoStatus.DISPONIBLE;
						boleto.reservadoHasta = null;
						(rifa.boletos as Map<string, IBoleto>).set(
							String(boletoApartado),
							boleto
						);
						rifa.boletosApartados -= 1;
					}
				}

				await rifa.save({ session });
			}

			venta.estado = VentaStatus.CANCELADA;
			await venta.save({ session });

			data.data = { ok: true };
			data.success = true;
			revalidatePath("/admin/inicio");
			revalidatePath("/admin/ventas");
		});
	} catch (error) {
		data.success = false;
		if (error instanceof Error) {
			const message = error.message;
			data.errors = [{ message }];
		}
	} finally {
		session.endSession();
	}

	return data;
};
