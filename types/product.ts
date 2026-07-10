export type WeightUnit = "KG" | "LB";
export type LengthUnit = "CM" | "IN";

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  lengthUnit: LengthUnit;
}

export type ApplicatorType = "automatic" | "semi-automatic";

export interface LocalizedText {
  es: string;
  en: string;
  pt: string;
}

export interface Product {
  slug: string;
  name: string;
  description: LocalizedText;
  applicatorType: ApplicatorType;
  syringeType: LocalizedText;
  treatments: LocalizedText;
  features: LocalizedText[];
  price: number;
  originalPrice?: number;
  currency: "ARS";
  image: string;
  stock: number;
  weight: number;
  weightUnit: WeightUnit;
  dimensions: ProductDimensions;
}
