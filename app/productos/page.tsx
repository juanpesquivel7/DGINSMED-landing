import { ProductCard } from "@/components/ProductCard";
import { products } from "@/data/products";

export const metadata = { title: "Productos | DG-INSMED" };

export default function ProductsPage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-2xl font-semibold text-brand-400">
        Nuestros Productos
      </h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  );
}
