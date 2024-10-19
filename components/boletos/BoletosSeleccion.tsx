"use client";
import { useStore } from "@/src/utils/store";
import DeleteIcon from "../ui/buttons/DeleteIcon";

type BoletosElegidosListProps = {
  boletos: number[];
  onRemoveBoleto: (index: number) => void;
};

type BoletoItemProps = { boleto: number; onRemove: () => void };

const BoletoElegidoItem = ({ boleto, onRemove }: BoletoItemProps) => (
  <span className="min-w-16 p-1 bg-white border border-gray rounded-lg shadow-inner relative">
    <DeleteIcon
      buttonClassName="absolute -top-1/2 -right-3"
      handler={onRemove}
      iconHeight={22}
      iconWidth={22}
      alt="icono:eliminar:"
    />
    {boleto}
  </span>
);

const BoletosElegidosList = ({
  boletos,
  onRemoveBoleto,
}: BoletosElegidosListProps) => (
  <div className="flex flex-wrap gap-4 justify-center text-xs my-4">
    {boletos.map((boleto, index) => (
      <BoletoElegidoItem
        key={index}
        boleto={boleto}
        onRemove={() => onRemoveBoleto(boleto)}
      />
    ))}
  </div>
);

const BoletosSeleccionados = ({ serie }: { serie: string }) => {
  const currentOrder = useStore((state) => state.order[serie]);
  const removeBoleto = useStore((state) => state.removeBoleto);

  const onRemove = (index: number) => {
    removeBoleto(serie, index);
  };

  return (
    <div className="border-2 border-gray rounded my-8 p-4">
      {!currentOrder || currentOrder.boletosApartados.length === 0 ? (
        <p className="p-4 text-gray-400">Tus boletos aparecerán aquí</p>
      ) : (
        <>
          <p className="uppercase text-sm">
            Boletos seleccionados {"("}
            {currentOrder.boletosApartados.length}
            {")"}
          </p>
          <div className="text-xs my-4 flex flex-wrap justify-around gap-3">
            <BoletosElegidosList
              boletos={currentOrder.boletosApartados}
              onRemoveBoleto={onRemove}
            />
          </div>
          <button
            type="submit"
            className="py-2 px-8 h-10 w-36 text-light bg-blue-500 hover:bg-blue-600 hover:text-sm rounded-full transition-all duration-300"
            onClick={() =>
              window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
            }
          >
            Ver carrito
          </button>
        </>
      )}
    </div>
  );
};

export default BoletosSeleccionados;
