import { Document } from "mongoose";
import { IPublicRifa } from "./rifas";

export type OrderItemType = Pick<
  IPublicRifa,
  "serie" | "title" | "price" | "slug"
> & {
  boletosApartados: number[];
  boletosGratis: number[];
  subtotal: number;
};

export type OrderItemModelType = OrderItemType & Document;