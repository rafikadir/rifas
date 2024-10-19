import { Document } from "mongoose";
import { OrderItemType } from "./orders";

export const VentaStatus = {
	PENDIENTE: "pendiente",
	PAGADA: "pagada",
	CANCELADA: "cancelada",
} as const;
export type VentaStatusType = (typeof VentaStatus)[keyof typeof VentaStatus];

export type VentaType = {
	total: number;
	cliente: {
		id: string;
		fullName: string;
		phoneNumber: string | null;
		email: string;
	};
	reciboUrl?: string;
	estado: VentaStatusType;
	order: OrderItemType[];

	expireAt: Date;
	createdAt: Date;
};

export type VentaModelType = VentaType & Document;
