export type WeightUnit = "KG" | "LB";
export type LengthUnit = "CM" | "IN";

export interface ProductDimensions {
  length: number;
  width: number;
  height: number;
  lengthUnit: LengthUnit;
}

export type ApplicatorType = "Automático" | "Semi-automático";

export interface Product {
  slug: string;
  name: string;
  description: string;
  applicatorType: ApplicatorType;
  syringeType: string;
  treatments: string;
  features: string[];
  price: number;
  originalPrice?: number;
  currency: "ARS";
  image: string;
  stock: number;
  weight: number;
  weightUnit: WeightUnit;
  dimensions: ProductDimensions;
}
