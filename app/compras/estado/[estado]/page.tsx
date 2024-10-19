import Link from "next/link";
import { redirect } from "next/navigation";
import { getClienteComprasByStatus } from "@/actions/clientes/getClientOrdersAction";
import { getSessionAndUserProfile } from "@/src/lib/auth/getSession";
import { userRoles } from "@/src/interfaces/users";
import {
	VentaModelType,
	VentaStatus,
	VentaStatusType,
} from "@/src/interfaces/venta";
import { formatCurrency, JSONDataParser } from "@/src/utils/parsers";
import BackButtonWrapper from "@/components/ui/BackButtonWraper";
import { Title } from "@/components/ui/Title";
import { BoletoCard } from "@/components/boletos/BoletoCard";
import ComprasFiltroNavbar from "@/components/compras/ComprasFiltroNavbar";

type Params = {
	params: { estado: VentaStatusType };
};

const ComprasPage = async ({ params }: Params) => {
	const session = await getSessionAndUserProfile();
	if (!session) {
		redirect("/api/auth/signin");
	}

	if (session?.userProfile.role !== userRoles.CLIENTE) {
		redirect("/");
	}

	const { userProfile } = session;

	const comprasResponse = await getClienteComprasByStatus(
		String(userProfile._id),
		params.estado
	);
	const compras = JSONDataParser(comprasResponse.data) as VentaModelType[];

	return (
		<BackButtonWrapper>
			<Title>Mis compras</Title>
			<ComprasFiltroNavbar estado={params.estado} />
			<div className="w-11/12 mx-auto space-y-4">
				{params.estado === VentaStatus.PAGADA && (
					<div>
						<h1 className="font-bold my-2">Mis premios</h1>
						<small className="text-gray-400">No hay premios para mostrar</small>
					</div>
				)}
				<div>
					<h1 className="font-bold my-2">Mis boletos</h1>
					{compras.length === 0 ? (
						<div className="flex flex-col space-y-2">
							<small className="text-gray-400">No hay nada aquí</small>
							<Link
								href={"/rifas/estado/activa"}
								className="w-fit text-sm rounded-lg bg-blue-700 text-white py-2 px-4 hover:bg-blue-800"
							>
								Ir a rifas
							</Link>
						</div>
					) : (
						<div className="grid gap-2 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
							{compras.map((compra) => (
								<div
									key={String(compra._id)}
									className="p-2 shadow-sm bg-white rounded-lg"
								>
									<div className="text-gray-400 ml-4 pb-1">
										{compra.estado.toUpperCase()}
									</div>
									{compra.order.map((order) => (
										<BoletoCard key={String(order.serie)} order={order} />
									))}

									<div className="flex justify-between mx-4 pt-2">
										<span className="font-bold">
											Total: {formatCurrency(compra.total)}
										</span>
										<Link
											href={`/compras/id/${String(compra._id)}`}
											className="ml-4 text-blue hover:underline"
										>
											Ver
										</Link>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</BackButtonWrapper>
	);
};

export default ComprasPage;
