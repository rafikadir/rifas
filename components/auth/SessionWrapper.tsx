import { PropsWithChildren } from "react";
import { Suspense } from "react";
import { getSession } from "@/src/lib/auth/getSession";
import { userRoles } from "@/src/interfaces/users";
// import HeaderSkeleton from "../ui/loaders/HeaderSkeleton";
import Navbar from "../ui/Navbar";
import Footer from "../ui/Footer";

export async function SessionWrapperWithNavBar({
	children,
}: PropsWithChildren) {
	const session = await getSession();
	const user = session?.user;

	const className = "p-4 min-h-screen";
	const userIsAdmin = user?.role === userRoles.ADMIN;
	const userIsVendedor = user?.role === userRoles.VENDEDOR;

	const navigation =
		userIsAdmin || userIsVendedor
			? [
					{ url: "/admin/inicio", text: "Administrador" },
					{ url: "/", text: "Ver página", blank: "_blank" },
					{ url: "/verificador", text: "Verificar boletos" },
			  ]
			: [
					{ url: "/", text: "Inicio" },
					{ url: "/rifas/estado/activa", text: "Rifas" },
					{ url: "/compras/estado/pendiente", text: "Mis compras" },
					{
						url: "/#preguntasfrecuentes",
						text: "Preguntas frecuentes",
					},
					{ url: "/verificador", text: "Verificar boletos" },
			  ];

	return (
		<Suspense>
			<Navbar user={user} navigation={navigation} />
			<main className={className}>{children}</main>
			<Footer />
		</Suspense>
	);
}
