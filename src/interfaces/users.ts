import { Document } from "mongoose";

export const userRoles = {
	ADMIN: "Admin",
	CLIENTE: "Cliente",
	VENDEDOR: "Vendedor",
} as const;
export type UserRolesType = (typeof userRoles)[keyof typeof userRoles];

export const userAuthMethods = {
	GOOGLE_USER: "Google",
	EMAIL: "Email",
} as const;
export type UserAuthMethods =
	(typeof userAuthMethods)[keyof typeof userAuthMethods];

export interface IUser {
	name: string;
	displayedName?: string;
	first_name: string;
	last_name: string;
	email: string;
	phone_number: string | null;
	image: string | null;
	auth: { providerId: string; method: UserAuthMethods };
	role: UserRolesType;
}

export interface IUserModel extends Document, IUser{};

export interface IVendedor extends IUserModel {
	userID: string;
	rifas: string[];
}

export type AdminType = IUserModel & {
	pageColor: string;
	socialMediaLinks: {
		facebook: string | undefined;
		whatsapp: string | undefined;
		instagram: string | undefined;
		twitter: string | undefined;
	};
	ofertas: {
		boletosGratis: {
			boletosGratis: number;
			compraMinima: number;
			compraMaxima: number;
		};
		// descuentos: {}
	};
	bankAccount: [
		{
			bankName: string;
			accountNumber: string;
			accountName: string;
		}
	];
};
