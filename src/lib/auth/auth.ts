import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

import dbConnect from "../db/dbConnect";
import {
	userRoles,
	IUserModel,
	userAuthMethods,
	IVendedor,
	UserAuthMethods,
	UserRolesType,
} from "../../interfaces/users";
import { getVendedorByUserId } from "@/actions/vendedor/getVendedorByUserId";
import { getUserByProviderIdAuth } from "@/actions/auth/getUserByProviderIdAuth";
import { JSONDataParser } from "@/src/utils/parsers";
import { createUserFromAuth } from "@/actions/usuarios/createUser";

export const authConfig = {
	providers: [
		Google({
			clientId: process.env.AUTH_GOOGLE_ID as string,
			clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
			profile(profile) {
				return {
					// Create JWT user
					authMethod: userAuthMethods.GOOGLE_USER,
					providerId: profile.sub,
					role: userRoles.CLIENTE,
				};
			},
		}),
	],
	callbacks: {
		async session({ session, token }) {
			if (token.providerId) {
				try {
					session.user.providerId = token.providerId as string;
					session.user.role = token.role as string;
					session.user.authMethod = token.authMethod as string;
					if (token.vendedorId)
						session.user.vendedorId = token.vendedorId as string;
				} catch (error) {
					throw new Error(
						"SESSION ERROR: Ocurrió un error. Actualiza la página."
					);
				}
			}
			return session; // this session is passed to the client on every request
		},
		async jwt({ token, user }) {
			if (user) {
				await dbConnect();
				try {
					// Usuario es Cliente
					const userExistResponse = await getUserByProviderIdAuth(
						String(user.providerId)
					);
					const userExist = JSONDataParser(userExistResponse.data) as Pick<
						IUserModel,
						"_id" | "role" | "auth"
					>;
					if (!userExist) return null;
				
					if (userExist.role === userRoles.VENDEDOR || userExist.role === userRoles.ADMIN) {
						const vendedor = (await getVendedorByUserId(
							String(userExist._id)
						)) as IVendedor;
						
						if (!vendedor) return null;
						token.vendedorId = vendedor.id;
					}
					token.providerId = userExist.auth.providerId || "";
					token.authMethod = userExist.auth.method || "";
					token.role = userExist.role || userRoles.CLIENTE;
				} catch (error) {
					throw new Error("JWT ERROR: Ocurrió un error. Actualiza la página.");
				}
			}
			return token; // this JWT persist in a http cookie
		},
		signIn: async ({ user, profile, account }) => {
			// Register or fetch user from mongo
			if (account?.provider === "google") {
				try {
					await dbConnect();

					const userExist = await getUserByProviderIdAuth(
						String(user.providerId)
					);
					if (userExist) return true;
					// Registrar nuevo usuario
					const nuevoUsuario = {
						name: profile?.name as string,
						first_name: profile?.given_name || "",
						last_name: profile?.family_name || "",
						email: profile?.email as string,
						phone_number: profile?.phone_number || null,
						image: profile?.picture || null,
						auth: {
							providerId: String(user.providerId),
							method: String(user.authMethod) as UserAuthMethods,
						},
						role: user.role as UserRolesType,
					};
					await createUserFromAuth(nuevoUsuario);
					return true;
				} catch (error) {
					throw new Error("Error al crear el usuario.");
				}
			}
			return false;
		},
	},
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
