import { Metadata } from "next";
import { IRifaForm, rifaStatusForm } from "@/src/interfaces/rifas";
import { getSessionAndUserProfile } from "@/src/lib/auth/getSession";

import RifaForm from "@/components/admin/forms/RifaForm";
import { redirect } from "next/navigation";
import { getDatePlus15Minutes, getDatePlus1Month } from "@/src/utils/Dates";
import { userRoles } from "@/src/interfaces/users";
import { Suspense } from "react";
import MainPageSkeleton from "@/components/ui/loaders/MainPageSkeleton";

export const metadata: Metadata = {
	title: "Nueva rifa",
	description: "Rifas El Magnate",
};

export default async function NewRifa() {
	const sessionData = await getSessionAndUserProfile();
	if (!sessionData) {
		return redirect("/api/auth/signin");
	}

	const { session } = sessionData;

	if (session.user.role === userRoles.CLIENTE || !session.user.vendedorId) {
		return redirect("/admin/rifas/estado/activa");
	}

	const rifaForm: IRifaForm = {
		title: "",
		description: "",
		ticketsTotal: 0,
		price: 0,
		startDate: getDatePlus15Minutes().toISOString(),
		endDate: getDatePlus1Month().toISOString(),
		imageUrl: "",
		prizes: [
			{
				title: "",
				description: "",
				url: "",
			},
		],
		estado: rifaStatusForm.ACTIVA,
		vendedorId: session.user.vendedorId,
	};

	return (
		<Suspense fallback={<MainPageSkeleton />}>
			<RifaForm
				formId="add-rifa-form"
				rifaForm={rifaForm}
				vendedorId={session.user.vendedorId}
			/>
		</Suspense>
	);
}
