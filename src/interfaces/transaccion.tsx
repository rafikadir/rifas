import { Document } from "mongoose";

type TipoDeTransaccion = "Creacion de Rifa" | "Compra de boletos" | "Reserva" | "Cancelacion";

export type Transaccion = Document & {
  tipo: TipoDeTransaccion;
  clienteID?: string;
  vendedorID?: string;
  compraID?: string;
};