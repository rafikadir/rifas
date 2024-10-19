import { getVentaById } from "@/actions/ventas/getVentaById";
import { BoletoCard } from "@/components/boletos/BoletoCard";
import BackButtonWrapper from "@/components/ui/BackButtonWraper";
import { Subtitle, Title } from "@/components/ui/Title";
import { VentaModelType, VentaStatus } from "@/src/interfaces/venta";
import { formatDateToLocalDate, parseStringToDate } from "@/src/utils/Dates";
import { formatCurrency, JSONDataParser } from "@/src/utils/parsers";

type Params = {
	params: { id: string };
};

const CompraByIdPage = async ({ params }: Params) => {
	const compraResponse = await getVentaById(params.id);
	const compra = JSONDataParser(compraResponse.data) as VentaModelType;

	return (
		<BackButtonWrapper>
			<Title>Detalles</Title>
			{!compra ? (
				<div className="text-center">
					<small className="text-gray-400">La compra no existe</small>
				</div>
			) : (
				<>
					<div className="mx-auto w-fit rounded-lg p-4 space-y-1 bg-white">
						<div>
							Cliente:{" "}
							<span className="font-bold">{compra.cliente.fullName}</span>
						</div>
						<div>
							Email: <span className="font-bold">{compra.cliente.email}</span>
						</div>
						<div>
							Creado el:{" "}
							<span className="font-bold">
								{formatDateToLocalDate(
									parseStringToDate(String(compra.createdAt))
								)}
							</span>
						</div>
						<div>
							Expira el:{" "}
							<span className="font-bold">
								{formatDateToLocalDate(
									parseStringToDate(String(compra.expireAt))
								)}
							</span>
						</div>
						<div className="text-gray-400">{compra.estado.toUpperCase()}</div>
					</div>

					<div>
						<Subtitle>Comprobante</Subtitle>

						{!compra.reciboUrl || compra.estado === VentaStatus.PENDIENTE ? (
							<div className="bg-red rounded-xl p-2">
								No has enviado el recibo
							</div>
						) : (
							<div className="bg-green rounded-xl p-2">Comprobante enviado</div>
						)}

					</div>

					<Subtitle>Boletos</Subtitle>
					<div className="mx-auto w-fit rounded-lg ">
						<div
							key={String(compra._id)}
							className="my-2 pt-2 bg-blue-200 rounded-lg"
						>
							{compra.order.map((order) => (
								<BoletoCard key={String(order.serie)} order={order} />
							))}
							<div className="ml-4 py-1 font-bold">
								Total: {formatCurrency(compra.total)}
							</div>
						</div>
					</div>
				</>
			)}
		</BackButtonWrapper>
	);
};

export default CompraByIdPage;
