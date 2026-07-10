import type { Product } from "@/types/product";

// Catálogo real de DG-INSMED (autoinyectores DG-Ject), con datos técnicos
// provistos por el cliente. Peso/dimensiones son estimados razonables para
// un autoinyector de bolsillo — ajustar con las specs reales cuando el
// cliente las confirme (son obligatorios para cotizar envío con Envia.com).
//
// Asignación de fotos confirmada por el cliente:
// I = gris (semi-automático, sin botón de deslizamiento lateral)
// II = azul marino con tapa naranja
// III = blanco con tapa turquesa
// IV = azul (más claro que el II) con tapa naranja
// V = blanco con tapa naranja
const COMMON_FEATURES = [
  "Lavable y desinfectable: compatible con cualquier método de limpieza, garantizando higiene y reutilización.",
  "Fabricado en ABS (plástico de alta resistencia): durable y seguro, diseñado para uso profesional.",
  "Regulador de profundidad ajustable: permite un control preciso para mayor comodidad y seguridad.",
  "Pulsador ergonómico: facilita inyecciones suaves y precisas, mejorando la experiencia del paciente.",
  "Innovación en tratamiento: diseño menos invasivo, priorizando la comodidad y reduciendo el estrés durante el procedimiento.",
];

const BASE_DIMENSIONS = { length: 16, width: 4, height: 4, lengthUnit: "CM" } as const;
const BASE_WEIGHT = { weight: 0.12, weightUnit: "KG" } as const;

export const products: Product[] = [
  {
    slug: "dg-ject-i-semi-automatico-1ml",
    name: "DG-Ject I - Semi-automático Jeringas 1 ml. (BD Ultra Fine, Nipro o similares)",
    description: "Aplicador de Jeringas Semi-Automático.",
    applicatorType: "Semi-automático",
    syringeType: "BD Ultra Fine, Nipro o similares 1ml.",
    treatments: "Insulina / Tratamientos para Disfunción Eréctil / Hormona de crecimiento.",
    features: COMMON_FEATURES,
    price: 39000,
    originalPrice: 45000,
    currency: "ARS",
    image: "/products/pen-gray-semiauto.jpg",
    stock: 40,
    ...BASE_WEIGHT,
    dimensions: BASE_DIMENSIONS,
  },
  {
    slug: "dg-ject-ii-automatico-1ml",
    name: "DG-Ject II - Automático Jeringas 1 ml. (BD Ultra Fine, Nipro o similares)",
    description: "Aplicador de Jeringas Automático.",
    applicatorType: "Automático",
    syringeType: "BD Ultra Fine, Nipro o similares 1ml.",
    treatments: "Insulina / Hormona de crecimiento.",
    features: COMMON_FEATURES,
    price: 49000,
    currency: "ARS",
    image: "/products/pen-navy-orange.jpg",
    stock: 40,
    ...BASE_WEIGHT,
    dimensions: BASE_DIMENSIONS,
  },
  {
    slug: "dg-ject-iii-automatico-1ml-semaglutida",
    name: "DG Ject III - Automático 1ml. (Semaglutida)",
    description: "Aplicador de Jeringas Automático.",
    applicatorType: "Automático",
    syringeType: "Prellenadas 1ml.",
    treatments: "Diabetes tipo 2 - Obesidad (Semaglutida en todas sus presentaciones 0.25/0.5/1mg).",
    features: COMMON_FEATURES,
    price: 36000,
    originalPrice: 49000,
    currency: "ARS",
    image: "/products/pen-white-teal.webp",
    stock: 40,
    ...BASE_WEIGHT,
    dimensions: BASE_DIMENSIONS,
  },
  {
    slug: "dg-ject-iv-automatico-05ml",
    name: "DG-Ject IV Automático Jeringas 0.5ml",
    description: "Aplicador de Jeringas Automático.",
    applicatorType: "Automático",
    syringeType: "Prellenadas de vidrio 0.5ml descartables.",
    treatments:
      "Esclerosis Múltiple: Acetato de Glatiramer (Escadra/Polimunol/Copaxone), Blastoferon Beta e Interferon Beta (ambos de Biosidus).",
    features: COMMON_FEATURES,
    price: 49000,
    currency: "ARS",
    image: "/products/pen-blue-orange.jpg",
    stock: 40,
    ...BASE_WEIGHT,
    dimensions: BASE_DIMENSIONS,
  },
  {
    slug: "dg-ject-v-automatico-03ml",
    name: "DG-Ject V Automático Jeringas 0.3ml",
    description: "Aplicador de Jeringas Automático.",
    applicatorType: "Automático",
    syringeType: "Prellenadas de vidrio 0.3ml descartables.",
    treatments: "Esclerosis Múltiple (Biosidus) / Teriparatida - Osteoporosis.",
    features: COMMON_FEATURES,
    price: 49000,
    currency: "ARS",
    image: "/products/pen-white-orange.webp",
    stock: 40,
    ...BASE_WEIGHT,
    dimensions: BASE_DIMENSIONS,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
