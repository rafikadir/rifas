import { userRoles } from "@/src/interfaces/users";
import AdminSecondaryNavbarRoute from "./AdminRoute";

const adminNavigation = [
	{ url: "/admin/inicio", text: "Inicio" },
	{ url: "/admin/rifas/estado/activa", text: "Rifas" },
	{ url: "/admin/ventas", text: "Ventas" },
	{ url: "/admin/ajustes", text: "Ajustes" },
	{ url: "/admin/usuarios", text: "Usuarios" },
];

const vendedorNavigation = [
	{ url: "/admin/inicio", text: "Inicio" },
	{ url: "/admin/rifas/estado/activa", text: "Rifas" },
	{ url: "/admin/ventas", text: "Ventas" },
];

export default function AdminSecondaryNavbar({
	role,
}: {
	role: string;
}) {
	return (
		<nav className="md:ml-4 my-4 flex flex-row flex-wrap gap-2 md:gap-4 text-sm md:text-base">
			{role === userRoles.ADMIN
				? adminNavigation.map((link) => (
						<AdminSecondaryNavbarRoute link={link} key={link.url} />
				  ))
				: vendedorNavigation.map((link) => (
						<AdminSecondaryNavbarRoute link={link} key={link.url} />
				  ))}
		</nav>
	);
}
