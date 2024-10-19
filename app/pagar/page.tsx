import { getSessionAndUserProfile } from "@/src/lib/auth/getSession";
import { redirect } from "next/navigation";
import { PagoComponent } from "@/components/pago/PagoComponent";
import { userRoles } from "@/src/interfaces/users";
import { getAdminPhone } from "@/actions/admin/getAdminPhone";

export default async function PagarPage() {
	const session = await getSessionAndUserProfile();
	
	if (!(session?.userProfile.role === userRoles.CLIENTE)) {
		redirect("/");
	}
	
	const adminPhone = await getAdminPhone();
	return <PagoComponent user={session.userProfile} adminPhoneNumber={adminPhone} />;
}
