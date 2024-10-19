import { Document, ObjectId } from "mongoose";
import { IPremio } from "./premios";
import { IBoleto } from "./boletos";

export const rifaStatus = {
	ACTIVA: "activa", // Activa es pública
	FINALIZADA: "finalizada",
	PROXIMA: "proxima",
	OCULTA: "oculta",
} as const;
export type RifaStatusType = (typeof rifaStatus)[keyof typeof rifaStatus];

export const rifaStatusForm = {
	ACTIVA: "activa", // Es activa y publica
	PROXIMA: "proxima",
	OCULTA: "oculta", // No puede ser oculta si ya hay boletos apartados
} as const;
export type RifaStatusFormType = Exclude<RifaStatusType, "FINALIZADA">

export interface IRifa {
	slug: string;
	serie: string;
	title: string;
	description: string;
	ticketsTotal: number;
	imageUrl: string;
	price: number;
	startDate: Date | null;
	endDate: Date | null;

	prizes: IPremio[];
	winnerTicketId?: string;
	publicId: string;
	boletos: Map<string, IBoleto>|Record<string, IBoleto>;
	boletosVendidos: number;
	boletosApartados: number;

	estado: RifaStatusType;
	vendedorId: ObjectId;
}
export interface IRifaModel extends IRifa, Document{};

// Interfaz para usuarios públicos que no son administradores (sin información sensible)
export interface IPublicRifa extends Exclude<IRifa, "vendedorId"> {}
export interface IPublicRifaModel extends Exclude<IRifaModel, "vendedorId"> {}

// export interface IRifa extends IRifa, Document {};

export interface IRifaForm
	extends Pick<IRifaModel, "title" | "description" | "ticketsTotal" | "price" | "imageUrl"> {
	startDate: string | null;
	endDate: string | null;
	prizes: IPremio[];
	estado: RifaStatusFormType;
	vendedorId: string;
}

export interface IRifasGroup {
	ongoing: IRifaModel[];
	upcoming: IRifaModel[];
	past: IRifaModel[];
}

// export interface ISerializedRifa
// 	extends Pick<
// 		IRifa,
// 		| "slug"
// 		| "serie"
// 		| "title"
// 		| "description"
// 		| "ticketsTotal"
// 		| "imageUrl"
// 		| "price"
// 		| "startDate"
// 		| "endDate"
// 		| "prizes"
// 		| "winnerTicketId"
// 		| "boletos"
// 		| "boletosVendidos"
// 		| "estado"
// 		| "vendedorId"
// 	> {
// 	boletos: string;
// }

// export interface IPublicRifa extends Document {
// 	slug: string;
// 	serie: number;
// 	title: string;
// 	description: string;
// 	ticketsTotal: number;
// 	imageUrl: string;
// 	price: number;
// 	startDate: Date;
// 	endDate: Date;
// 	prizes: IPremio[];
// 	winnerTicketId?: string;
// 	boletosOcupados: Map<string, BoletoStatusType>;
// 	estado: RifaStatusType;
// }

// export type IRifaMongoose = Pick<IPublicRifa,
// "slug" | "serie" | "title" | "description" | "ticketsTotal" | "imageUrl" | "price" | "startDate" | "endDate" | "prizes" | "winnerTicketId" | "estado"
// > & {
//   boletosOcupados: Map<number, BoletoStatus>;
// }
