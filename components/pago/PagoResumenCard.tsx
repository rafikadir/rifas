import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import { createVentaAction } from "@/actions/ventas/createVentaAction";
import { orderZodSchema } from "@/src/lib/validators/order";

import type { Store } from "@/src/utils/store";
import { useStore } from "@/src/utils/store";
import { formatCurrency } from "@/src/utils/parsers";

import { Title } from "../ui/Title";
import CarritoDetailsCard from "../ui/carrito/OrderDetailsCard";
import {
	calculateTotal,
	loadOrderFromLocalStorage,
} from "../ui/carrito/Carrito";
import { IUserModel } from "@/src/interfaces/users";

type Props = {
	order: Store["order"];
	user: IUserModel;
	adminPhoneNumber: string;
};

export default function PagoResumenCard({ order, user, adminPhoneNumber }: Props) {
	const [loading, setLoading] = useState(false);
	const total = useMemo(() => calculateTotal(order), [order]);

	const confirmOrder = useStore((state) => state.confirmOrder);
	const removeRifa = useStore((state) => state.removeRifa);
	const initOrderFromLocalStorage = useStore(
		(state) => state.initOrderFromLocalStorage
	);

	const handleCreateOrder = async () => {
		setLoading(true);
		const data = {
			cliente: {
				id: String(user._id),
				fullName: user.name,
				phoneNumber: user.phone_number || null,
				email: user.email,
			},
			order,
		};
		// validations front
		const result = orderZodSchema.safeParse(data);
		if (!result.success) {
			result.error.issues.forEach((issue) => {
				toast.error(issue.message);
			});
			setLoading(false);
			return;
		}
		// validations back
		try {
			// Apartar boletos
			const response = await createVentaAction(result.data);
			if (response?.errors) {
				response.errors.forEach((issue: { message: string }) => {
					toast.error(issue.message);
				});
				return;
			}

			toast.success("Orden creada");
			confirmOrder();
			// Crear el enlace de WhatsApp
			const messageDetails = Object.values(order).map(orderDetails => ({
				serie: orderDetails.serie,
				rifa: orderDetails.slug,
				"boletos apartados": orderDetails.boletosApartados,
				subtotal: formatCurrency(orderDetails.subtotal), 
			}))
			const message = encodeURIComponent(
				`Nueva orden creada por ${user.name}.\nTotal: ${formatCurrency(total)}\nDetalles: ${JSON.stringify(
					messageDetails,
					null,
					2
				).replace("title", "título")}`
			);
			const whatsappLink = `https://wa.me/${adminPhoneNumber}?text=${message}`;

			// Redirigir a WhatsApp
			window.open(whatsappLink, "_blank");
		} catch (error) {
			toast.error(`Ocurrió un error al reservar los boletos.`);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedOrder = loadOrderFromLocalStorage();
			if (storedOrder) {
				initOrderFromLocalStorage(storedOrder);
			}
		}
	}, [initOrderFromLocalStorage]);

	return (
		<div className="p-4 rounded-lg shadow-lg bg-white">
			<Title>Resumen de Compra</Title>

			{Object.keys(order).length === 0 ? (
				<p className="text-center my-8 text-gray-400">
					No tienes boletos en tu carrito...
					<br />
					¡Añade boletos y regresa!
				</p>
			) : (
				<div className="mt-5 space-y-4">
					{Object.entries(order).map(([key, item]) => (
						<CarritoDetailsCard
							key={key}
							item={item}
							serie={key}
							removeRifa={removeRifa}
						/>
					))}
					<div className="text-xl font-semibold text-center mt-10">
						Total a pagar: {""}
						<p className="font-bold text-2xl text-blue-600">
							{formatCurrency(total)}
						</p>
					</div>
					<div className="mt-4 p-4 border rounded-lg">
						<p className="text-center text-sm">
							<strong>Importante:</strong>
							{` Al hacer clic en "Pagar", tus boletos se apartarán durante `}
							<strong>12 horas</strong>. Si no completas el pago en ese tiempo,
							los boletos serán liberados y{" "}<b>se cancelará tu orden</b>.
							
						</p>
						<p className="text-center">
							<br />
							Se te redigirá a WhatsApp para confirmar tu compra, por favor confírmala y regresa a esta ventana para ver los detalles de tu compra.
						</p>
					</div>
					<form action={handleCreateOrder} className="w-full">
						<button
							type="submit"
							aria-disabled={loading}
							disabled={loading}
							className="py-3 mt-4 bg-blue-500 text-light w-full text-center font-bold rounded-lg hover:bg-opacity-30 hover:text-blue-500 transition duration-200 disabled:bg-opacity-30"
						>
							Apartar
						</button>
					</form>
				</div>
			)}
		</div>
	);
}
