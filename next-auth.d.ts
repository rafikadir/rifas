/* eslint-disable @typescript-eslint/no-unused-vars */
import {type Session } from "next-auth";
declare module "next-auth" {
	interface Session {
		user: User & {
			providerId?: string;
			authMethod?: string;
			vendedorId?: string;
			role?: string;
		};
	}
	interface User {
		authMethod?: string;
		providerId?: string;
		vendedorId?: string;
		role: string;
	}
}
