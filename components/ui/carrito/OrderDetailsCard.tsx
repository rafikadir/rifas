import { OrderItemType } from "@/src/interfaces/orders";
import { formatCurrency } from "@/src/utils/parsers";
import React from "react";
import DeleteIcon from "../buttons/DeleteIcon";
import Link from "next/link";
import Image from "next/image";

type Props = {
	item: OrderItemType;
	serie: string;
	removeRifa: (serie: string) => void;
};

export default function CarritoDetailsCard({ item, serie, removeRifa }: Props) {
	const sortedBoletos = item.boletosApartados.sort((a, b) => a - b);
	const handlerRemoveRifa = () => {
		removeRifa(serie);
	};
	return (
		<div className="text-sm rounded-lg bg-white-100 p-4 shadow-md relative">
			<DeleteIcon
				buttonClassName="absolute top-2 right-2 p-1"
				handler={handlerRemoveRifa}
				iconHeight={24}
				iconWidth={24}
				alt="icono:eliminar:"
			/>
			<Link
				href={`/rifas/${item.slug}`}
				className="font-bold text-lg break-words text-blue-500 hover:underline"
			>
				{item.title}
			</Link>
			<div className="font-semibold text-xs mb-2 text-gray-400">
				Rifa: {serie}
			</div>
			{item.boletosGratis[0] > 0 ? (
				<div className="font-semibold text-gray-700 flex">
					Gratis:
					<Image
						className="ml-1"
						alt="Regalo"
						src={"/assets/icons/gift.svg"}
						width={16}
						height={16}
					/>
					{`x${item.boletosGratis}`}
				</div>
			) : null}
			<div className="font-semibold text-gray-700">
				Números:{" "}
				{sortedBoletos.map((boleto, index) => (
					<span key={boleto} className="inline">
						{boleto}
						{index < sortedBoletos.length - 1 ? ", " : ""}
					</span>
				))}
			</div>
			<p className="font-bold text-gray-800 mt-2">
				{item.boletosApartados.length} x {formatCurrency(item.price)}
			</p>
			<p className="text-gray-600">Subtotal: {formatCurrency(item.subtotal)}</p>
		</div>
	);
}
