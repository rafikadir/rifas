import { IPremio } from "@/src/interfaces/premios";
import Image from "next/image";

type Props = {
	premios: IPremio[];
};

const PremiosCard = ({ premios }: Props) => {
	return (
		<>
			<p className="p-2 bg-primary text-light rounded-t font-bold text-lg">
				Con tu boleto estarás participando para ganar:
			</p>
			<div className="mx-auto mb-8 p-4 rounded-b border-2 border-gray border-t-0 bg-white space-y-6">
				{premios.map((premio, key) => {
					return (
						<div key={key}>
							<p className="font-bold">{premio.title}</p>
							<p className="pb-4">{premio.description}</p>
							<Image
								width={200}
								height={200}
								className="rounded-xl mx-auto"
								src={premio.url}
								alt={`(imagen) ${premio.title}`}
							/>
						</div>
					);
				})}
			</div>
		</>
	);
};

export default PremiosCard;
