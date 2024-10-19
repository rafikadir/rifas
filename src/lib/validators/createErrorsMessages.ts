export const MAX_LENGTH_DESCRIPTION = 300;
export const MIN_LENGTH_DESCRIPTION = 3;
export const MAX_LENGTH_TITLE = 50;
export const MIN_LENGTH_TITLE = 3;
export const MIN_RIFA_SERIE = 1;
export const MIN_RIFA_BOLETOS = 1;
export const MAX_RIFA_BOLETOS = 100000;
export const MIN_LENGTH_PREMIOS = 1;
export const MAX_LENGTH_PREMIOS = 5;
export const MIN_RIFA_PRICE = 1;
export const MONGO_ID_LENGTH = 24;
export const MIN_LENGTH_IMAGEN_URL = 8;
export const MAX_LENGTH_IMAGEN_URL = 255;
export const MAX_SIZE_IMAGE_FILE = 5 * 1024 * 1024; // 5MB
export const MAX_RIFA_IMAGE_FILES = 1;

type Params = {
	campo: string;
	tipo:
		| "string"
		| "number"
		| "noNegativeNumber"
		| "boolean"
		| "object"
		| "array";
	minLength?: number;
	maxLength?: number;
	min?: number;
};

type ErrorZodMessageType = {
	required_error: string;
	invalid_type_error: string;
	minLength_error: string;
	maxLength_error: string;
	positive_error: string;
};

/**
 * Crea un objeto con mensajes de error personalizados para validación de campos.
 *
 * @param {string} campo - El nombre del campo que se está validando y que se mostrará en el mensaje.
 * @param {number} [minLength=0] - La longitud mínima permitida para el campo.
 * @param {number} [maxLength=0] - La longitud máxima permitida para el campo.
 * @param {string} [tipo='string'] - El tipo de variable que debe ser compatible (por ejemplo, 'string', 'number').
 * @param {number} [min=0] - El valor mínimo para el campo.
 * @returns {Object} Un objeto que contiene mensajes de error personalizados.
 */
export const createErrorMessages = ({
	campo,
	tipo = "string",
	minLength = 0,
	maxLength = 0,
	min = 0,
}: Params): ErrorZodMessageType => {
	const tipoSlug = {
		string: "cadena de texto",
		number: "un número",
		boolean: "booleano",
		object: "objeto",
		array: "arreglo",
		noNegativeNumber: "entero positivo",
	};

	return {
		required_error: `${campo} es requerido.`,
		invalid_type_error: `${campo} debe ser ${tipoSlug[tipo] || tipo}.`,
		positive_error: `${campo} debe ser mayor o igual que ${min}`,
		minLength_error: `${campo} debe contener al menos ${minLength} caracteres.`,
		maxLength_error: `${campo} debe contener ${maxLength} caracteres máximo.`,
	};
};

export const premios = {
	title: createErrorMessages({
		campo: "Título del premio",
		tipo: "string",
		minLength: MIN_LENGTH_TITLE,
		maxLength: MAX_LENGTH_TITLE,
	}),
	description: createErrorMessages({
		campo: "Descripción del premio",
		tipo: "string",
		minLength: MIN_LENGTH_DESCRIPTION,
		maxLength: MAX_LENGTH_DESCRIPTION,
	}),
};

export const rifa = {
	publicId: createErrorMessages({
		campo: "publicId",
		tipo: "string",
	}),
	slug: createErrorMessages({
		campo: "Slug",
		tipo: "string",
	}),
	serie: createErrorMessages({
		campo: "Serie",
		tipo: "number",
		min: MIN_RIFA_SERIE,
	}),
	title: createErrorMessages({
		campo: "Título",
		tipo: "string",
		minLength: MIN_LENGTH_TITLE,
		maxLength: MAX_LENGTH_TITLE,
	}),
	estado: createErrorMessages({
		campo: "Estado",
		tipo: "string",
	}),
	description: createErrorMessages({
		campo: "Descripción",
		tipo: "string",
		minLength: MIN_LENGTH_DESCRIPTION,
		maxLength: MAX_LENGTH_DESCRIPTION,
	}),
	ticketsTotal: createErrorMessages({
		campo: "Número de tickets",
		tipo: "noNegativeNumber",
		min: MIN_RIFA_BOLETOS,
	}),
	price: createErrorMessages({
		campo: "Precio",
		tipo: "noNegativeNumber",
		min: MIN_RIFA_PRICE,
	}),
	startDate: createErrorMessages({
		campo: "Fecha de inicio",
		tipo: "string",
	}),
	endDate: createErrorMessages({
		campo: "Fecha de fin",
		tipo: "string",
	}),
	vendedorId: createErrorMessages({
		campo: "ID de vendedor",
		tipo: "string",
		minLength: MONGO_ID_LENGTH,
		maxLength: MONGO_ID_LENGTH,
	}),
	prizes: {
		title: createErrorMessages({
			campo: "Título del premio",
			tipo: "string",
			minLength: MIN_LENGTH_TITLE,
			maxLength: MAX_LENGTH_TITLE,
		}),
		description: createErrorMessages({
			campo: "Descripción del premio",
			tipo: "string",
			minLength: MIN_LENGTH_DESCRIPTION,
			maxLength: MIN_LENGTH_DESCRIPTION,
		}),
		url: createErrorMessages({
			campo: "Imagen del premio",
			tipo: "string",
			minLength: MIN_LENGTH_IMAGEN_URL,
			maxLength: MIN_LENGTH_IMAGEN_URL,
		}),
	},
	imageUrl: createErrorMessages({
		campo: "Imagen principal",
		tipo: "string",
		minLength: MIN_LENGTH_IMAGEN_URL,
		maxLength: MAX_LENGTH_IMAGEN_URL,
	}),
};

export const vendedor = {
	userID: createErrorMessages({
		campo: "ID de usuario",
		tipo: "string",
		minLength: MONGO_ID_LENGTH,
		maxLength: MONGO_ID_LENGTH,
	}),
};

export const venta = {
	clienteId: createErrorMessages({
		campo: "ID de cliente",
		tipo: "string",
		minLength: MONGO_ID_LENGTH,
		maxLength: MONGO_ID_LENGTH,
	}),
	clienteFullName: createErrorMessages({
		campo: "Nombre del cliente",
		tipo: "string",
		minLength: 1,
		maxLength: 50,
	}),
	clientePhone: createErrorMessages({
		campo: "Teléfono del cliente",
		tipo: "string",
		minLength: 10,
		maxLength: 15,
	}),
	clienteEmail: createErrorMessages({
		campo: "Email del cliente",
		tipo: "string",
		minLength: 1,
		maxLength: 50,
	}),
};

export const cliente = {
	id: createErrorMessages({
		campo: "ID de cliente",
		tipo: "string",
		minLength: MONGO_ID_LENGTH,
		maxLength: MONGO_ID_LENGTH,
	}),
	fullName: createErrorMessages({
		campo: "Nombre del cliente",
		tipo: "string",
		minLength: MONGO_ID_LENGTH,
		maxLength: MONGO_ID_LENGTH,
	}),
	phoneNumber: createErrorMessages({
		campo: "Teléfono del cliente",
		tipo: "string",
		minLength: 10,
		maxLength: 15,
	}),
	email: createErrorMessages({
		campo: "Email del cliente",
		tipo: "string",
		minLength: 1,
		maxLength: 50,
	}),
};

export const validatorErrorMessages = {
	rifa,
	premios,
	vendedor,
	venta,
	cliente,
};
