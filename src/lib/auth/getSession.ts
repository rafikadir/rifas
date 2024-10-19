import { cache } from "react";
import { auth } from "./auth";
import models from "../../models";

import dbConnect from "../db/dbConnect";
import { IUserModel } from "@/src/interfaces/users";
import { getUserProfile } from "@/actions/users";
import { JSONDataParser } from "@/src/utils/parsers";

export const getSession = cache(async () => {
	const session = await auth();
	if (!session?.user) return null;
	await dbConnect();
	try {
		const dbUser = (await models.User.model
			.findOne({ "auth.providerId": session.user.providerId })
			.select("role")) as Pick<IUserModel, "role">;
		session.user.role = dbUser?.role;
	} catch (error) {
		return null;
	} finally {
		return session;
	}
});

export const getSessionAndUserProfile = cache(async () => {
	const session = await auth();
	if (!session?.user) return null;

	await dbConnect();
	const userProviderId = session.user.providerId || "";
	const response = await getUserProfile(userProviderId);

	if (!response.success || !response.data) return null;
	const userProfile = JSONDataParser(response.data) as IUserModel;

	if (session.user.role !== userProfile.role) return null; // Double check user role
	return { session, userProfile };
});
