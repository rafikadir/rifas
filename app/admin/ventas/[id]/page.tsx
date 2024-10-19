import { getVentaById } from "@/actions/ventas/getVentaById";
import { VentaActionButtons } from "@/components/admin/ventas/VentaActionButtons";
import { BoletoCard } from "@/components/boletos/BoletoCard";
import BackButtonWrapper from "@/components/ui/BackButtonWraper";
import { Title } from "@/components/ui/Title";
import { VentaModelType } from "@/src/interfaces/venta";
import { formatDateToLocalDate, parseStringToDate } from "@/src/utils/Dates";
import { formatCurrency, JSONDataParser } from "@/src/utils/parsers";

const VentaByIdPage = async ({ params }: { params: { id: string } }) => {
	const response = await getVentaById(params.id);
	const venta = JSONDataParser(response.data) as VentaModelType;
	return (
		<BackButtonWrapper>
			<Title>Venta</Title>
			<div className="mx-auto w-fit rounded-lg p-4 space-y-1 bg-white">
				<div>
					Cliente: <span className="font-bold">{venta.cliente.fullName}</span>
				</div>
				<div>
					Email: <span className="font-bold">{venta.cliente.email}</span>
				</div>
				<div>
					Creado el:{" "}
					<span className="font-bold">
						{formatDateToLocalDate(parseStringToDate(String(venta.createdAt)))}
					</span>
				</div>
				<div>
					Expira el:{" "}
					<span className="font-bold">
						{formatDateToLocalDate(parseStringToDate(String(venta.expireAt)))}
					</span>
				</div>
				<div className="text-gray-400">{venta.estado.toUpperCase()}</div>
			</div>

			<VentaActionButtons id={params.id} />

			<div className="mx-auto min-w-72 w-fit rounded-lg ">
				<div key={String(venta._id)} className="pt-2 my-2 bg-blue-200 rounded-lg">
					{venta.order.map((order) => (
						<BoletoCard key={String(order.serie)} order={order} />
					))}
					<div className="ml-4 py-1 font-bold">
						Total: {formatCurrency(venta.total)}
					</div>
				</div>
			</div>
		</BackButtonWrapper>
	);
};

export default VentaByIdPage;
