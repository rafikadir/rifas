import { IPublicRifaModel } from "@/src/interfaces/rifas";

type Props = {
  rifa: IPublicRifaModel;
};

const BuscarBoletosForm = ({ rifa: { ticketsTotal: tickets_total } }: Props) => {
  const searchTicket = () => {};
  return (
    <form
      // action={`/sorteos/tickets/buscar/${rifa.id}`}
      method="POST"
      //   encType="multipart/form-data"
    >
      <input
        id="ticket_index"
        name="ticket_index"
        type="number"
        min={0}
        max={tickets_total}
        onClick={searchTicket}
        className="text-center block mx-auto my-2 p-4 w-32 ring-1 ring-gray"
        placeholder="000000"
      />
      {/* {messages && <ErrorMessages messages={messages} />} */}
      <button
        type="submit"
        className="uppercase py-4 px-8 text-light bg-blue rounded"
      >
        Buscar
      </button>
    </form>
  );
};

export default BuscarBoletosForm;
