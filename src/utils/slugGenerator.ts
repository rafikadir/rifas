import slugify from 'slugify';

export const generarSlug = (text: string): string => {
  return slugify(text, {
    lower: true,   // Convierte a minúsculas
    strict: true,  // Elimina caracteres especiales
  });
};
