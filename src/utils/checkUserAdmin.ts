import { redirect } from "next/navigation";
import { getSession } from "../lib/auth/getSession";
import { userRoles } from "../interfaces/users";

export const checkUserAdminRole = async () => {
	const session = await getSession();

	if(session?.user.role !== userRoles.ADMIN){
		redirect("/admin/inicio");
	}
};