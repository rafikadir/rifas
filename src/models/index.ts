import Counter, { CounterSchema } from "./Counter";
import Order, { OrderSchema } from "./Order";
import Rifa, { RifaSchema } from "./Rifa";
import User, { UserSchema } from "./Usuario";
import Vendedor, { VendedorSchema } from "./Vendedor";
import Venta, { VentaSchema } from "./Venta";

const models = {
	User: {
		model: User,
		schema: UserSchema,
	},
    Rifa: {
        model: Rifa,
        schema: RifaSchema,
    },
    Counter: {
        model: Counter,
        schema: CounterSchema,
    },
    Venta: {
        model: Venta,
        schema: VentaSchema,
    },
    Order: {
        model: Order,
        schema: OrderSchema,
    },
    Vendedor: {
        model: Vendedor,
        schema: VendedorSchema,
    }
};

export default models;
