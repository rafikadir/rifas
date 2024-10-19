"use server";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import models from "@/src/models";
import { boletoStatus, IBoleto } from "@/src/interfaces/boletos";
import { ReturnedActionType } from "@/src/interfaces/responses";
import { IRifaModel, rifaStatus } from "@/src/interfaces/rifas";
import { VentaModelType, VentaStatus } from "@/src/interfaces/venta";
import dbConnect from "@/src/lib/db/dbConnect";

export const confirmarVentaById = async (
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
			const venta = (await models.Venta.model.findById(id)) as VentaModelType;

			if (venta.estado === VentaStatus.CANCELADA)
				throw new Error("La venta está cancelada");
			if (venta.estado === VentaStatus.PAGADA)
				throw new Error("La venta ya se confirmó");

			for (const order of venta.order) {
				const rifa = (await models.Rifa.model
					.findOne({ serie: order.serie })
					.session(session)) as IRifaModel;

				if (!rifa) throw new Error(`La rifa ${order.serie} no existe`);
				if (rifa.estado !== rifaStatus.ACTIVA)
					throw new Error(`La rifa ${order.serie} ya no está activa`);

				for (const boletoApartado of order.boletosApartados) {
					const boleto = (rifa.boletos as Map<string, IBoleto>).get(
						String(boletoApartado)
					);

					if (boleto) {
						boleto.estado = boletoStatus.VENDIDO;
						boleto.reservadoHasta = null;
						(rifa.boletos as Map<string, IBoleto>).set(
							String(boletoApartado),
							boleto
						);
						rifa.boletosApartados -= 1;
						rifa.boletosVendidos += 1;
					}
				}

				await rifa.save({ session });
			}

			venta.estado = VentaStatus.PAGADA;
			await venta.save({ session });

			data.data = { ok: true };
			data.success = true;
			revalidatePath(`/admin/ventas/${venta.id}`);
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
