import Link from "next/link";

export default function CheckoutSuccessPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-4 py-24 text-center">
      <h1 className="text-2xl font-semibold text-foreground">
        ¡Gracias por tu compra!
      </h1>
      <p className="text-foreground/70">
        Tu pago fue confirmado. En breve generaremos tu guía de envío y te
        compartiremos el número de rastreo.
      </p>
      <Link
        href="/rastreo"
        className="rounded-full bg-action-500 px-6 py-3 text-sm font-semibold text-white hover:bg-action-600"
      >
        Ir a rastreo de pedido
      </Link>
    </div>
  );
}
