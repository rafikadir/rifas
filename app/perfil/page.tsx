import { SessionWrapperWithNavBar } from "@/components/auth/SessionWrapper";
import BackButtonWrapper from "@/components/ui/BackButtonWraper";
import { Subtitle } from "@/components/ui/Title";
import { userRoles } from "@/src/interfaces/users";
import { getSessionAndUserProfile } from "@/src/lib/auth/getSession";
import Image from "next/image";

export default async function Perfil() {
	const session = await getSessionAndUserProfile();
	
	const userProfile = session?.userProfile;
	const userIsAdmin = userProfile?.role === userRoles.ADMIN;
	const userIsVendedor = userProfile?.role === userRoles.VENDEDOR;

	return (
		<SessionWrapperWithNavBar>
			<BackButtonWrapper>
				{userIsVendedor && (
					<div className="md:mr-20 font-bold text-sm text-white bg-orange-500 rounded-full py-1 px-2 text-center w-fit ml-auto shadow-md cursor-default">
						Vendedor
					</div>
				)}
				{userIsAdmin && (
					<div className="md:mr-20 font-bold text-sm text-white bg-blue-500 rounded-full py-1 px-2 text-center w-fit ml-auto shadow-md cursor-default">
						Admin
					</div>
				)}

				<div className="max-w-lg mx-auto mt-4 space-y-4">
					<Image
						src={userProfile?.image || ""}
						alt="foto de perfil"
						className="rounded-full mx-auto"
						width={36}
						height={36}
					/>

					<h1 className="text-center">
						Bienvenido <b>{userProfile?.name}</b>
					</h1>

					<p className="text-center">
						Correo: <u>{userProfile?.email}</u>
					</p>

					{userProfile?.role === userRoles.CLIENTE && (
						<Subtitle>Compras pendientes</Subtitle>
						// Fetch pending orders
					)}
				</div>
			</BackButtonWrapper>
		</SessionWrapperWithNavBar>
	);
}
