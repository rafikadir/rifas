"use client";
import { toast } from "react-toastify";
import { cancelarVentaById } from "@/actions/admin/ventas/cancelarVentaById";
import { confirmarVentaById } from "@/actions/admin/ventas/confirmarVenta";

export const VentaActionButtons = ({ id }: { id: string }) => {
	const handleCancelVenta = async (id: string) => {
		const response = await cancelarVentaById(id);
		if (!response.success) {
			response.errors?.forEach((issue) => {
				toast.error(issue.message);
			});
			return;
		}
		toast.success("Venta cancelada");
	};

	const handleConfirmarVenta = async (id: string) => {
		const response = await confirmarVentaById(id);
		if (!response.success) {
			response.errors?.forEach((issue) => {
				toast.error(issue.message);
			});
			return;
		}
		toast.success("Venta confirmada");
	};

	return (
		<div className="flex flex-col my-4 space-y-2">
			<button
				className="text-white bg-red-600 hover:bg-red-700 rounded-xl py-2 px-4"
				onClick={() => handleCancelVenta(id)}
			>
				Cancelar
			</button>
			<button
				className="text-white bg-green-700 hover:bg-green-800 rounded-xl py-2 px-4"
				onClick={() => handleConfirmarVenta(id)}
			>
				Confirmar
			</button>
		</div>
	);
};
