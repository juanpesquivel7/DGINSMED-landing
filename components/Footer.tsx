import Link from "next/link";
import { Zap, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-primary text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-accent rounded-lg p-1.5">
                <Zap className="h-5 w-5 text-white" />
              </div>
              <span className="text-white font-bold text-xl">TuTienda</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              La mejor tecnología gaming para Argentina. Productos originales, envíos a todo el país.
            </p>
            <div className="flex items-center gap-3 mt-4">
              <a
                href="https://instagram.com/tutienda"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors text-sm flex items-center gap-1"
                aria-label="Instagram"
              >
                <ExternalLink className="h-4 w-4" />
                Instagram
              </a>
              <a
                href="mailto:ventas@tutienda.com.ar"
                className="hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Tienda</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/#productos" className="hover:text-white transition-colors">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="hover:text-white transition-colors">
                  Mi carrito
                </Link>
              </li>
            </ul>
          </div>

          {/* Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Información</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span>📦 Envíos por Andreani</span>
              </li>
              <li>
                <span>💳 Mercado Pago hasta 12 cuotas</span>
              </li>
              <li>
                <span>🔒 Compra 100% segura</span>
              </li>
              <li>
                <span>✅ Garantía oficial</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} TuTienda. Todos los derechos reservados.</p>
          <p>Hecho con ❤️ en Argentina 🇦🇷</p>
        </div>
      </div>
    </footer>
  );
}
