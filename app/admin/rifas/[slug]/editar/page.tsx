import { notFound, redirect } from "next/navigation";
import { getSession } from "@/src/lib/auth/getSession";
import { getRifaBySlugAndSellerId } from "@/actions/vendedor/adminGetRifaBySlug";
import { IRifaForm, rifaStatusForm } from "@/src/interfaces/rifas";
import RifaForm from "@/components/admin/forms/RifaForm";
import MainPageSkeleton from "@/components/ui/loaders/MainPageSkeleton";
import { Suspense } from "react";

type Params = {
	params: { slug: string };
};

const EditarRifasPage = async ({ params }: Params) => {
	const session = await getSession();
	const vendedorId = session?.user.vendedorId;

	if (!vendedorId) {
		return redirect("/admin/inicio");
	}

	const { data: rifa } = await getRifaBySlugAndSellerId(
		params.slug,
		vendedorId
	);

	if (!rifa) {
		notFound();
	}

	if (vendedorId !== String(rifa.vendedorId)) {
		return redirect("api/auth/signin");
	}

	const rifaForm: IRifaForm = {
		title: rifa.title,
		description: rifa.description,
		ticketsTotal: rifa.ticketsTotal,
		price: rifa.price,
		startDate: rifa.startDate?.toISOString() || "",
		endDate: rifa.endDate?.toISOString() || "",
		imageUrl: rifa.imageUrl,
		prizes: rifa.prizes.map((premio) => ({
			title: premio.title,
			description: premio.description,
			url: premio.url,
		})),
		estado: rifaStatusForm.ACTIVA,
		vendedorId: String(rifa.vendedorId),
	};

	return (
		<Suspense fallback={<MainPageSkeleton />}>
			<RifaForm
				rifaForm={rifaForm}
				rifaPublicId={rifa.publicId}
				vendedorId={rifaForm.vendedorId}
				formId="edit-rifa"
				isNewForm={false}
			/>
		</Suspense>
	);
};

export default EditarRifasPage;
