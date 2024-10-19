import { getRifaBySlugAndSellerId } from "@/actions/vendedor/adminGetRifaBySlug";
import { RifaAdminCardBySlug } from "@/components/admin/rifas/RifaAdminCardBySlug";
import { notFound } from "next/navigation";
import { getSession } from "@/src/lib/auth/getSession";
import { getUserByProviderId } from "@/actions/usuarios/getUserById";
import { JSONDataParser } from "@/src/utils/parsers";
import { IUserModel } from "@/src/interfaces/users";

type Params = {
	params: { slug: string };
};

const getRifaBySlugPage = async ({ params }: Params) => {
	const session = await getSession();
	const vendedorId = session?.user.vendedorId;
	const providerId = session?.user.providerId;

	const userResponse = await getUserByProviderId(String(providerId));
	const vendedor = JSONDataParser(userResponse.data) as IUserModel;
	const { data: rifa } = await getRifaBySlugAndSellerId(
		params.slug,
		String(vendedorId)
	);

	if (!rifa) notFound();

	return <RifaAdminCardBySlug rifa={rifa} vendedor={vendedor} />;
};

export default getRifaBySlugPage;
