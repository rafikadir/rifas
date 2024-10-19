import { VentaStatus, VentaStatusType } from "@/src/interfaces/venta";
import Link from "next/link";

export default function ComprasFiltroNavbar({
	estado,
}: {
	estado: VentaStatusType;
	isAdmin?: boolean;
}) {
	const comprasRoute = "/compras";

	const getLinkClasses = (status: string) =>
		`px-2 py-0.5 rounded-lg ${
			estado === status ? "bg-primary text-white" : "hover:bg-gray-400"
		}`;

	return (
		<div className="bg-blue-500 text-light p-2 rounded-xl flex flex-wrap space-x-4">
			<Link
				className={getLinkClasses(VentaStatus.PENDIENTE)}
				href={`${comprasRoute}/estado/${VentaStatus.PENDIENTE}`}
			>
				Pendientes
			</Link>
			<Link
				className={getLinkClasses(VentaStatus.PAGADA)}
				href={`${comprasRoute}/estado/${VentaStatus.PAGADA}`}
			>
				Pagadas
			</Link>
			<Link
				className={getLinkClasses(VentaStatus.CANCELADA)}
				href={`${comprasRoute}/estado/${VentaStatus.CANCELADA}`}
			>
				Canceladas
			</Link>
		</div>
	);
}
