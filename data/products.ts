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
//
// Traducciones EN/PT hechas automáticamente para lanzar rápido — recomendable
// una revisión profesional/nativa antes de depender de ellas en un contexto
// médico regulado.
const COMMON_FEATURES = [
  {
    es: "Lavable y desinfectable: compatible con cualquier método de limpieza, garantizando higiene y reutilización.",
    en: "Washable and disinfectable: compatible with any cleaning method, ensuring hygiene and reusability.",
    pt: "Lavável e desinfetável: compatível com qualquer método de limpeza, garantindo higiene e reutilização.",
  },
  {
    es: "Fabricado en ABS (plástico de alta resistencia): durable y seguro, diseñado para uso profesional.",
    en: "Made of ABS (high-strength plastic): durable and safe, designed for professional use.",
    pt: "Fabricado em ABS (plástico de alta resistência): durável e seguro, projetado para uso profissional.",
  },
  {
    es: "Regulador de profundidad ajustable: permite un control preciso para mayor comodidad y seguridad.",
    en: "Adjustable depth regulator: allows precise control for greater comfort and safety.",
    pt: "Regulador de profundidade ajustável: permite um controle preciso para maior conforto e segurança.",
  },
  {
    es: "Pulsador ergonómico: facilita inyecciones suaves y precisas, mejorando la experiencia del paciente.",
    en: "Ergonomic trigger button: enables smooth, precise injections, improving the patient experience.",
    pt: "Botão ergonômico: facilita injeções suaves e precisas, melhorando a experiência do paciente.",
  },
  {
    es: "Innovación en tratamiento: diseño menos invasivo, priorizando la comodidad y reduciendo el estrés durante el procedimiento.",
    en: "Treatment innovation: a less invasive design that prioritizes comfort and reduces stress during the procedure.",
    pt: "Inovação no tratamento: design menos invasivo, priorizando o conforto e reduzindo o estresse durante o procedimento.",
  },
];

const BASE_DIMENSIONS = { length: 16, width: 4, height: 4, lengthUnit: "CM" } as const;
const BASE_WEIGHT = { weight: 0.12, weightUnit: "KG" } as const;
const APPLICATOR_DESC = {
  es: "Aplicador de Jeringas",
  en: "Syringe Applicator",
  pt: "Aplicador de Seringas",
};

export const products: Product[] = [
  {
    slug: "dg-ject-i-semi-automatico-1ml",
    name: "DG-Ject I - Semi-automático Jeringas 1 ml. (BD Ultra Fine, Nipro o similares)",
    description: {
      es: `${APPLICATOR_DESC.es} Semi-Automático.`,
      en: `Semi-Automatic ${APPLICATOR_DESC.en}.`,
      pt: `${APPLICATOR_DESC.pt} Semi-Automático.`,
    },
    applicatorType: "semi-automatic",
    syringeType: {
      es: "BD Ultra Fine, Nipro o similares 1ml.",
      en: "BD Ultra Fine, Nipro or similar 1ml.",
      pt: "BD Ultra Fine, Nipro ou similares 1ml.",
    },
    treatments: {
      es: "Insulina / Tratamientos para Disfunción Eréctil / Hormona de crecimiento.",
      en: "Insulin / Erectile Dysfunction treatments / Growth hormone.",
      pt: "Insulina / Tratamentos para Disfunção Erétil / Hormônio de crescimento.",
    },
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
    description: {
      es: `${APPLICATOR_DESC.es} Automático.`,
      en: `Automatic ${APPLICATOR_DESC.en}.`,
      pt: `${APPLICATOR_DESC.pt} Automático.`,
    },
    applicatorType: "automatic",
    syringeType: {
      es: "BD Ultra Fine, Nipro o similares 1ml.",
      en: "BD Ultra Fine, Nipro or similar 1ml.",
      pt: "BD Ultra Fine, Nipro ou similares 1ml.",
    },
    treatments: {
      es: "Insulina / Hormona de crecimiento.",
      en: "Insulin / Growth hormone.",
      pt: "Insulina / Hormônio de crescimento.",
    },
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
    description: {
      es: `${APPLICATOR_DESC.es} Automático.`,
      en: `Automatic ${APPLICATOR_DESC.en}.`,
      pt: `${APPLICATOR_DESC.pt} Automático.`,
    },
    applicatorType: "automatic",
    syringeType: {
      es: "Prellenadas 1ml.",
      en: "Prefilled 1ml.",
      pt: "Pré-preenchidas 1ml.",
    },
    treatments: {
      es: "Diabetes tipo 2 - Obesidad (Semaglutida en todas sus presentaciones 0.25/0.5/1mg).",
      en: "Type 2 diabetes - Obesity (Semaglutide in all its presentations 0.25/0.5/1mg).",
      pt: "Diabetes tipo 2 - Obesidade (Semaglutida em todas as suas apresentações 0,25/0,5/1mg).",
    },
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
    description: {
      es: `${APPLICATOR_DESC.es} Automático.`,
      en: `Automatic ${APPLICATOR_DESC.en}.`,
      pt: `${APPLICATOR_DESC.pt} Automático.`,
    },
    applicatorType: "automatic",
    syringeType: {
      es: "Prellenadas de vidrio 0.5ml descartables.",
      en: "Disposable prefilled glass syringes 0.5ml.",
      pt: "Seringas de vidro pré-preenchidas descartáveis 0,5ml.",
    },
    treatments: {
      es: "Esclerosis Múltiple: Acetato de Glatiramer (Escadra/Polimunol/Copaxone), Blastoferon Beta e Interferon Beta (ambos de Biosidus).",
      en: "Multiple Sclerosis: Glatiramer Acetate (Escadra/Polimunol/Copaxone), Blastoferon Beta and Interferon Beta (both by Biosidus).",
      pt: "Esclerose Múltipla: Acetato de Glatirâmero (Escadra/Polimunol/Copaxone), Blastoferon Beta e Interferon Beta (ambos da Biosidus).",
    },
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
    description: {
      es: `${APPLICATOR_DESC.es} Automático.`,
      en: `Automatic ${APPLICATOR_DESC.en}.`,
      pt: `${APPLICATOR_DESC.pt} Automático.`,
    },
    applicatorType: "automatic",
    syringeType: {
      es: "Prellenadas de vidrio 0.3ml descartables.",
      en: "Disposable prefilled glass syringes 0.3ml.",
      pt: "Seringas de vidro pré-preenchidas descartáveis 0,3ml.",
    },
    treatments: {
      es: "Esclerosis Múltiple (Biosidus) / Teriparatida - Osteoporosis.",
      en: "Multiple Sclerosis (Biosidus) / Teriparatide - Osteoporosis.",
      pt: "Esclerose Múltipla (Biosidus) / Teriparatida - Osteoporose.",
    },
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
