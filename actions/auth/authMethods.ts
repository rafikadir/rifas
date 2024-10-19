"use server";

import { signIn, signOut } from "@/src/lib/auth/auth";

export const signInWithGoogleAction = async () => {
	await signIn("google");
};

export const logoutAction = async () => {
	await signOut({redirectTo: "/"});
};