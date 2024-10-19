import { getPendingVentas } from "@/actions/admin/ventas/adminGetVentasAll";
import BackButtonWrapper from "@/components/ui/BackButtonWraper";
import { Title } from "@/components/ui/Title";
import PendingTickets from "@/components/admin/PendingTicketCard";

export default async function VentasPage() {
	const { data: ventas } = await getPendingVentas(20);

	return (
		<BackButtonWrapper>
			<Title>Mis ventas</Title>

			{ventas?.length ? (
				<div className="w-11/12 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4">
					{ventas.map((venta, key) => (
						<PendingTickets venta={venta} key={key} />
					))}
				</div>
			) : (
				<p className="text-center text-gray-400">No hay ventas por confirmar</p>
			)}
		</BackButtonWrapper>
	);
}
