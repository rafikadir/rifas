import { formatCurrency } from "@/src/utils/parsers";
import { IPublicRifaModel } from "@/src/interfaces/rifas";
import Image from "next/image";
import Link from "next/link";

type Props = {
	rifa: IPublicRifaModel;
	width?: string;
	height?: string;
};

export const RifaCard = ({ rifa, width="w-full", height="h-auto" }: Props) => {
	return (
		<div className={`relative inline-block overflow-hidden ${width} ${height} border border-gray-300 rounded-xl transition-all duration-700 shadow-none hover:shadow-lg group hover:bg-gray-300 mx-auto`}>
			<Image
				quality={45}
				src={rifa.imageUrl}
				alt={rifa.title}
				width={100}
				height={100}
				className="w-full h-full object-cover"
			/>
			<h5 className="absolute text-center break-words bottom-0 left-0 p-1.5 text-light text-lg font-bold text-shadow-md bg-dark bg-opacity-50 w-full">
				{rifa.title}
			</h5>

			<div className="space-y-2 absolute text-sm text-light inset-0 bg-dark bg-opacity-80 p-2 opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100 group-hover:pointer-events-auto">
				<div className="absolute z-20 top-2 right-2 space-x-1">
					<span className="p-2 text-xs rounded ring-1 ring-inset ring-white bg-dark">#{rifa.serie}</span>
					<span className="p-2 text-xs rounded bg-white text-dark">{formatCurrency(rifa.price)}</span>
				</div>

				<div>
					<p className="font-bold mt-8 md:mt-4">Inicia:</p>
					<p>{new Date(rifa.startDate || "").toLocaleDateString()}</p>
				</div>

				<div>
					<p className="font-bold">Termina:</p>
					<p>{new Date(rifa.endDate || "").toLocaleDateString()}</p>
				</div>

				<p className="px-4 text-xs md:text-sm break-normal mt-2 overflow-hidden">
					{rifa.description}
				</p>

				<div className="absolute z-20 bottom-4 right-2">
					<Link
						href={`/rifas/${rifa.slug}`}
						className="px-4 py-2 bg-red text-light rounded-xl hover:bg-light hover:text-red hover:text-base transition-all duration-300"
					>
						¡Jugar!
					</Link>
				</div>
			</div>
		</div>
	);
};
