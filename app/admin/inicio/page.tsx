
import { getPendingVentas } from "@/actions/admin/ventas/adminGetVentasAll";
import PendingTickets from "@/components/admin/PendingTicketCard";
import { Subtitle, Title } from "@/components/ui/Title";

const AdminDashboardPage = async () => {
	const { data: ventasPorConfirmar } = await getPendingVentas(5);

	return (
		<div className="w-11/12 mx-auto">
			<Title>Inicio</Title>
			<Subtitle>Ventas</Subtitle>

			{ventasPorConfirmar?.length ? (
				<div className="rounded p-2 grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
					{ventasPorConfirmar.map((venta, key) => (
						<PendingTickets venta={venta} key={key} />
					))}
				</div>
			) : (
				<p className="text-center text-gray-400">No hay ventas por confirmar</p>
			)}

			{/* CARD */}
			{/* <ul className="bg-gray rounded p-2">
				<li>Nombre: Nombre, apellidos</li>
				<li>Rifa: Rifa amigos 001</li>
				<li>Hora: 07/04/2021 a las 12:21:00 pm</li>
				<li>Monto: {formatCurrency(42)}</li>
				<small className="flex flex-1 pr-2 justify-end">
					<Link href={""} className="text-blue">
						ver
					</Link>
				</small>
			</ul> */}
		</div>
	);
};

export default AdminDashboardPage;
