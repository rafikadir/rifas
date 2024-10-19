import { VentaModelType } from "@/src/interfaces/venta";
import { formatCurrency } from "@/src/utils/parsers";
import { TicketCardOptions } from "./forms/TicketCardOptions";
import { formatDateToLocalDate, parseStringToDate } from "@/src/utils/Dates";

export default async function PendingTickets({
	venta,
}: {
	venta: VentaModelType;
}) {
	return (
		<div className="bg-white p-4 rounded-xl space-y-2 shadow-lg">
			{/* MOSTRAR PREVENTAS POR USUARIO */}
			<div className="text-lg font-bold text-gray-800">
				Usuario: {venta.cliente.fullName}
			</div>
			<div className="text-gray-400 text-sm">
				{venta.estado.toUpperCase()}
			</div>
			<dl className="mt-6 space-y-4">
				{venta.order.map((item) => (
					<div
						key={item.serie}
						className="flex items-center text-gray-800 text-sm gap-2 border-t border-gray-200 pt-4"
					>
						<dd className="font-medium">Serie {item.serie}</dd>
						<dt className="flex item-center">
							<span className="font-black">
								{"(x"}
								{item.boletosApartados.length}
								{") "}
							</span>
						</dt>
					</div>
				))}
				<div className="flex items-center justify-around text-center border-t border-gray-200 pt-4 gap-4">
					<dd className="font-medium text-sm text-gray-800">
						Creado el:{" "}
						{formatDateToLocalDate(parseStringToDate(String(venta.createdAt)))}
					</dd>
					<dd className="font-medium text-sm text-gray-800">
						Expira el:{" "}
						{formatDateToLocalDate(parseStringToDate(String(venta.expireAt)))}
					</dd>
				</div>
				<div className="flex items-center justify-center border-t border-gray-200 pt-4">
					<div className="text-md font-medium text-gray-800">
						Total a pagar:{" "}
						<span className="font-semibold">{formatCurrency(venta.total)}</span>
					</div>
				</div>
			</dl>
			<TicketCardOptions ventaId={String(venta._id)} />
		</div>
	);
}
