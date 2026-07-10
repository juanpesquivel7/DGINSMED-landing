export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-navy-900">
      <div className="mx-auto max-w-6xl px-4 py-10 text-sm text-foreground/70 sm:px-6">
        <div className="grid gap-8 sm:grid-cols-4">
          <div>
            <p className="font-semibold text-foreground">DG-INSMED</p>
            <p className="mt-2">
              Las instalaciones cumplen las Buenas Prácticas de Fabricación
              de Productos Médicos (MERCOSUR/GMC/RES. N°4/95 - Disposición
              ANMAT N° 191/99).
            </p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Contacto</p>
            <p className="mt-2">contacto@dginsmed.com</p>
            <p>+54 9 (341) 5621580</p>
            <p className="mt-2">Richieri 1235 - 2000 Rosario, Santa Fe, Argentina</p>
          </div>
          <div>
            <p className="font-semibold text-foreground">Menú</p>
            <ul className="mt-2 flex flex-col gap-1">
              <li>
                <a href="/" className="hover:text-brand-400">Home</a>
              </li>
              <li>
                <a href="/productos" className="hover:text-brand-400">Productos</a>
              </li>
              <li>
                <a href="/rastreo" className="hover:text-brand-400">Rastreo de pedido</a>
              </li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-foreground">ANMAT</p>
            <p className="mt-2">
              <span className="font-medium text-foreground">Habilitación</span>
              <br />
              Disposición N° 326/12
            </p>
            <p className="mt-2">
              <span className="font-medium text-foreground">Registro de Producto</span>
              <br />
              Disposición N° 3460
              <br />
              Legajo PM-2035-1
            </p>
            <p className="mt-2">
              <span className="font-medium text-foreground">Directora Técnica</span>
              <br />
              Bioingeniera Andrea Cattena Mat. N° ICIE 2-3395-1
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-border pt-6 text-xs text-foreground/50">
          © {new Date().getFullYear()} DG-INSMED. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
