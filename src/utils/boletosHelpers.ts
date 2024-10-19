import mongoose from "mongoose";
import { boletoStatus, IBoleto } from "../interfaces/boletos";
import { incrementAndGetRifasCount } from "../../actions/admin/counters/rifas";
import { OrderItemType } from "../interfaces/orders";

export function generarListaDeBoletos(start: number, numeroBoletos: number) {
	const boletos = new Map<string, IBoleto>();
	for (let index = start; index < numeroBoletos; index++) {
		const boleto: IBoleto = {
			estado: boletoStatus.DISPONIBLE,
			idPublico: new mongoose.Types.ObjectId().toString(),
		};
		boletos.set(String(index), boleto);
	}
	return boletos;
}

// Función para generar un número de boleto aleatorio que no esté ocupado
export function getRandomAvailableTicketNum(
	boletosOcupados: number[],
	boletosTotal: number
): number {
	let ticketNumber: number;
	do {
		ticketNumber = Math.floor(Math.random() * boletosTotal);
	} while (boletosOcupados.includes(ticketNumber) || ticketNumber === 0);
	return ticketNumber;
}

export function generateRandomTickets(
	ticketsToGenerate: number,
	boletos: Map<string, IBoleto>,
	ticketsTotal: number,
	order: OrderItemType
): number[] {
	const ocupados = Object.entries(boletos)
		.filter(([, boleto]) => boleto.estado !== boletoStatus.DISPONIBLE)
		.map(([index]) => +index);

	const ocupadosAndElegidos = ocupados
		.concat(order?.boletosApartados || [])
		.sort((a, b) => a - b);

	const boletosNuevos: number[] = [];
	while (boletosNuevos.length < ticketsToGenerate) {
		const ticketNumber = getRandomAvailableTicketNum(
			ocupadosAndElegidos.concat(boletosNuevos),
			ticketsTotal
		);
		boletosNuevos.push(ticketNumber);
	}
	return boletosNuevos.sort((a, b) => a - b);
}

// Función para generar un número de serie único y corto
export async function generarRifaSerie(session: mongoose.mongo.ClientSession) {
	const prefix = "RIFA-";
	const counter = await incrementAndGetRifasCount(session);
	const serie = `${prefix}${String(counter.value).padStart(6, "0")}`; // Ejemplo: RIFA-000001
	return serie;
}
