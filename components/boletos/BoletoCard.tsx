import { OrderItemType } from "@/src/interfaces/orders";
import { formatCurrency } from "@/src/utils/parsers";

export const BoletoCard = ({ order }: { order: OrderItemType }) => {
	return (
		<div className="shadow-md flex flex-col p-2 mx-2 space-y-1 text-blue-950 bg-white-100 rounded-xl">
			<span>
				Serie: <span className="font-bold">{order.serie}</span>
			</span>
			<span>
				Precio: <span className="font-bold">{formatCurrency(order.price)}</span>
			</span>
			<span>
				Boletos:{" "}
				{order.boletosApartados.map((boleto, index) => (
					<span key={boleto} className="inline font-bold">
						#{boleto}
						{index < order.boletosApartados.length - 1 ? ", " : ""}
					</span>
				))}
			</span>

			{order.boletosGratis.length > 0 && (
				<span>
					Boletos gratis:{" "}
					{order.boletosGratis.map((boleto, index) => (
						<span key={boleto} className="inline font-bold">
							#{boleto}
							{index < order.boletosGratis.length - 1 ? ", " : ""}
						</span>
					))}
				</span>
			)}

			<span>
				Subtotal:{" "}
				<span className="font-bold">{formatCurrency(order.subtotal)}</span>
			</span>
		</div>
	);
};
