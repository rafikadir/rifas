"use client";
import { boletoStatus, IBoleto } from "@/src/interfaces/boletos";
import { IPublicRifaModel } from "@/src/interfaces/rifas";
import { useStore } from "@/src/utils/store";

type Props = {
	numeroBoleto: number;
	rifa: IPublicRifaModel;
};

export default function BoletosGridItem({ numeroBoleto, rifa }: Props) {
	const { boletos, serie } = rifa;
	const { addToCart, order } = useStore((state) => state);
	const isBoletoSelected =
		order[serie]?.boletosApartados?.includes(numeroBoleto);
	const isBoletoOcupado =
		Object.entries(boletos).filter(
			([index, boleto]: [string, IBoleto]) =>
				index === String(numeroBoleto) &&
				boleto.estado !== boletoStatus.DISPONIBLE
		).length !== 0;

	const onClickBoleto = () => {
		addToCart(rifa, [numeroBoleto]);
	};

	const className = `w-auto min-w-10 p-2 m-1 border rounded transition-all ${
		isBoletoSelected
			? "bg-gray-400 cursor-default border-0 shadow-dark shadow-inner"
			: isBoletoOcupado
			? "bg-blue-400 cursor-default border-0 shadow-dark shadow-inner"
			: "border-gray bg-none hover:border-0 hover:bg-gray"
	}`;

	return (
		<button
			className={className}
			aria-disabled={isBoletoOcupado}
			disabled={isBoletoOcupado}
			onClick={onClickBoleto}
		>
			{numeroBoleto}
		</button>
	);
}
