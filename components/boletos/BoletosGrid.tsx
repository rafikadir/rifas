import BoletosGridItem from "./BoletosGridItem";
import { IPublicRifaModel } from "@/src/interfaces/rifas";
import { BoletosGridCounter } from "./BoletosGridCounter";
import { boletoStatus, IBoleto } from "@/src/interfaces/boletos";

type Props = {
	rifa: IPublicRifaModel;
};

export const BoletosGrid = ({ rifa }: Props) => {
	function createGrid() {
		const boletos = [];
		for (
			let numeroBoleto = 1;
			numeroBoleto <= rifa.ticketsTotal;
			numeroBoleto++
		) {
			boletos.push(
				<BoletosGridItem
					key={numeroBoleto}
					numeroBoleto={numeroBoleto}
					rifa={rifa}
				/>
			);
		}
		return boletos;
	}
	return (
		<>
			<BoletosGridCounter
				ticketsTotal={rifa.ticketsTotal}
				boletosOcupados={
					Object.values(rifa.boletos).filter(
						(boleto: IBoleto) => boleto.estado !== boletoStatus.DISPONIBLE
					).length
				}
				rifaSerie={rifa.serie}
			/>
			<p className="italic p-0 text-sm text-gray-600">blancos: Disponibles</p>
			<p className="italic p-0 text-sm text-gray-600">azules: Ocupados</p>
			<div className="mt-4 grid-flow-row">{createGrid()}</div>
			<button className="p-1 m-2 rounded bg-gray-300">más boletos</button>
		</>
	);
};
