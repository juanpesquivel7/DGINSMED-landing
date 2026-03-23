import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Truck, Shield, CreditCard, Headphones, Star, ArrowRight } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "TuTienda | Tecnología Gaming en Argentina",
  description:
    "Comprá los mejores productos gaming con envío a todo el país. Monitores, teclados, mouse, auriculares y sillas gamer.",
};

const benefits = [
  {
    icon: Truck,
    title: "Envíos a todo el país",
    description: "Despachamos por Andreani con seguimiento en tiempo real.",
  },
  {
    icon: Shield,
    title: "Garantía oficial",
    description: "Todos los productos cuentan con garantía del fabricante.",
  },
  {
    icon: CreditCard,
    title: "Hasta 12 cuotas",
    description: "Pagá con Mercado Pago con todas las tarjetas.",
  },
  {
    icon: Headphones,
    title: "Atención personalizada",
    description: "Respondemos tus consultas en menos de 24 horas.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-accent/20 text-accent border border-accent/30 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Star className="h-3.5 w-3.5 fill-current" />
              Los mejores precios de Argentina
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-6">
              Tecnología gaming{" "}
              <span className="text-accent">al siguiente nivel</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-8 max-w-2xl">
              Equipate con los mejores periféricos y accesorios gaming. Envíos a
              todo el país con Andreani y pagos con Mercado Pago.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/#productos"
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-white font-semibold px-6 py-3 rounded-xl transition-colors shadow-lg"
              >
                Ver productos
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/carrito"
                className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl transition-colors border border-white/20"
              >
                Ver mi carrito
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Products grid */}
      <section id="productos" className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
              Nuestros productos
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Selección curada de tecnología gaming con la mejor relación calidad-precio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section id="beneficios" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary mb-3">
              ¿Por qué elegirnos?
            </h2>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Comprá con confianza y disfrutá de la mejor experiencia de compra online.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="text-center p-6 rounded-2xl bg-gray-50 hover:bg-primary/5 transition-colors group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 group-hover:bg-primary rounded-2xl transition-colors mb-4">
                  <benefit.icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-accent py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-1">
              ¿Listo para equiparte?
            </h2>
            <p className="text-orange-100">
              Comprá hoy y recibís en tu domicilio en todo Argentina.
            </p>
          </div>
          <Link
            href="/#productos"
            className="inline-flex items-center gap-2 bg-white text-accent font-bold px-8 py-3 rounded-xl hover:bg-orange-50 transition-colors shadow whitespace-nowrap"
          >
            Ver todos los productos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
