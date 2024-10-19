"use client";
import Link from "next/link";
import { toast } from "react-toastify";
import { cancelarVentaById } from "@/actions/admin/ventas/cancelarVentaById";

export const TicketCardOptions = ({ ventaId }: { ventaId: string }) => {
	const handleCancelVenta = async (id: string) => {
		const response = await cancelarVentaById(id);
		if (!response.success) {
			response.errors?.forEach(issue => {
				toast.error(issue.message);
			})
			return;
		}
		toast.success("Venta cancelada");
	};

	return (
		<div className="flex justify-between px-2 text-xs">
			<button
				onClick={() => handleCancelVenta(ventaId)}
				className="text-red-600 hover:underline"
			>
				Cancelar
			</button>

			<Link
				href={`/admin/ventas/${ventaId}`}
				className="text-blue-600 hover:underline"
			>
				Ver
			</Link>
		</div>
	);
};
