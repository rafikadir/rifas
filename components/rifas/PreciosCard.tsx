type Props = {
  precio: number;
};

const PreciosCard = ({ precio }: Props) => {
  return (
    <>
      <p className="p-2 bg-primary text-light rounded-t font-bold text-lg">
        Precios:
      </p>
      <div className="uppercase font-bold mx-auto mb-8 p-4 rounded-b border-2 border-gray border-t-0 bg-white">
        <p>1 boleto x ${precio}</p>
        <p>2 boletos x ${(precio * 2).toFixed(2)}</p>
        <p>3 boletos x ${(precio * 3).toFixed(2)}</p>
        <p>5 boletos x ${(precio * 5).toFixed(2)}</p>
        <p>11 boletos x ${(precio * 11).toFixed(2)}</p>
        <p>22 boletos x ${(precio * 22).toFixed(2)}</p>
        <p>33 boletos x ${(precio * 33).toFixed(2)}</p>
        <p>55 boletos x ${(precio * 55).toFixed(2)}</p>
        <p>100 boletos x ${(precio * 100).toFixed(2)}</p>
      </div>
    </>
  );
};

export default PreciosCard;
