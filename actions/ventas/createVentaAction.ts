"use server";
import mongoose from "mongoose";

import dbConnect from "@/src/lib/db/dbConnect";
import { boletoStatus, IBoleto } from "@/src/interfaces/boletos";
import { OrderItemType } from "@/src/interfaces/orders";
import { VentaType } from "@/src/interfaces/venta";
import { IPublicRifaModel } from "@/src/interfaces/rifas";
import { ReturnedActionType } from "@/src/interfaces/responses";

import { OrderZodSchemaType, orderZodSchema } from "@/src/lib/validators/order";

import { getRandomAvailableTicketNum } from "@/src/utils/boletosHelpers";
import { getSubtotal } from "@/src/utils/getSubtotal";
import models from "@/src/models";
import { ZodError } from "zod";
import { getDatePlus12Hrs } from "@/src/utils/Dates";
import { JSONDataParser } from "@/src/utils/parsers";

async function setBoletosGratisEnBD(
	item: OrderItemType,
	rifa: IPublicRifaModel,
	reservadoHasta: Date,
	session: mongoose.ClientSession
) {
	const boletosGratis = Math.floor(item.boletosApartados.length / 10);
	if (boletosGratis === 0) return [];

	const boletosOcupados = Object.values(
		(rifa.boletos as Map<string, IBoleto>).values()
	)
		.filter(
			([index, boleto]) => boleto.estado !== boletoStatus.DISPONIBLE && index
		)
		.concat(item.boletosApartados);

	while (item.boletosGratis.length < boletosGratis) {
		const boleto = getRandomAvailableTicketNum(
			boletosOcupados.concat(item.boletosGratis),
			rifa.ticketsTotal
		);
		item.boletosGratis.push(boleto);

		const idPublico = new mongoose.Types.ObjectId().toString();
		const newBoletoObj: IBoleto = {
			idPublico,
			estado: boletoStatus.APARTADO,
			reservadoHasta,
		};
		(rifa.boletos as Map<string, IBoleto>).set(String(boleto), newBoletoObj); // apartar boleto gratis
	}
	rifa.boletosApartados += boletosGratis;
	await rifa.save({ session });
	return item.boletosGratis;
}

async function apartarBoletosEnBD(
	order: OrderItemType,
	reservadoHasta: Date,
	session: mongoose.mongo.ClientSession
) {
	const rifa: IPublicRifaModel = await models.Rifa.model
		.findOne({
			serie: order.serie,
		})
		.select([
			"_id",
			"title",
			"price",
			"slug",
			"serie",
			"ticketsTotal",
			"boletos",
			"boletosApartados",
			"boletosVendidos",
		])
		.session(session)
		.exec();

	if (!rifa) throw new Error(`La rifa ${order.serie} no existe`);

	// Validar y apartar boletos
	const boletosInvalidos = order.boletosApartados.filter((boletoApartado) =>
		Object.values(rifa.boletos).find(
			(boleto) => boleto === boletoApartado && boleto?.estado !== "disponible"
		)
	);

	if (boletosInvalidos.length > 0) {
		throw new Error(
			`Los boletos ${boletosInvalidos.join(
				", "
			)} ya no están disponibles. Vacía tu carrito o elige otros boletos.`
		);
	}

	// Apartar temporalmente los boletos
	order.boletosApartados.forEach((boleto) => {
		// Actualizar el estado del boleto a "apartado" en la rifa
		const boletoActual = (rifa.boletos as Map<string, IBoleto>).get(
			String(boleto)
		);
		if (boletoActual) {
			boletoActual.estado = boletoStatus.APARTADO;
			boletoActual.reservadoHasta = reservadoHasta;
			(rifa.boletos as Map<string, IBoleto>).set(String(boleto), boletoActual);
		}
	});
	rifa.boletosApartados += order.boletosApartados.length;
	await rifa.save({ session });
	return rifa;
}

export async function createVentaAction(
	userData: OrderZodSchemaType
): Promise<ReturnedActionType> {
	const data: ReturnedActionType = { data: null, success: true };
	await dbConnect();
	try {
		const result = orderZodSchema.safeParse(userData);
		if (!result.success) {
			throw new ZodError(result.error.issues);
		}

		const user = result.data.cliente;
		const newOrders: OrderItemType[] = Object.entries(result.data.order).map(
			([serie, item]) => ({
				serie,
				title: "",
				price: 0,
				slug: "",
				boletosApartados: item.boletosApartados,
				boletosGratis: [],
				subtotal: 0,
			})
		);
		const newVenta = {
			cliente: {
				id: String(user.id),
				fullName: user.fullName,
				phoneNumber: user.phoneNumber || null,
				email: user.email,
			},
			order: newOrders,
			total: 0,
		};

		const session = await mongoose.startSession();
		await session.withTransaction(async () => {
			for (const orderItem of newVenta.order) {
				const reservadoHasta = getDatePlus12Hrs();
				const rifa: IPublicRifaModel = await apartarBoletosEnBD(
					orderItem,
					reservadoHasta,
					session
				);
				const boletosGratis = await setBoletosGratisEnBD(
					orderItem,
					rifa,
					reservadoHasta,
					session
				);

				const subtotal = getSubtotal(
					rifa.price,
					orderItem.boletosApartados.length
				);

				Object.assign(orderItem, {
					title: rifa.title,
					price: rifa.price,
					slug: rifa.slug,
					boletosGratis,
					subtotal,
				});
				newVenta.total += subtotal;
			}
			// Guardar venta
			const ventaCreated: VentaType = (
				await models.Venta.model.create([newVenta], { session })
			)[0];
			data.data = JSONDataParser(ventaCreated);
		});
		await session.endSession();
	} catch (error) {
		if (error instanceof ZodError) {
			data.errors = error.issues;
		} else if (error instanceof Error) {
			const message = error.message;
			data.errors = [{ message: `Error durante la compra: ${message}` }];
		} else {
			data.errors = [
				{ message: "Algo salió mal. Espera y vuelve a intentar después." },
			];
		}
	} finally {
		return data;
	}
}
