import { Product } from "@/types";

export const products: Product[] = [
  {
    id: "prod-001",
    slug: "monitor-curvo-27-gaming",
    name: "Monitor Curvo 27\" Gaming 165Hz",
    description: "Monitor gaming Full HD con panel VA curvo 1500R y tasa de refresco de 165Hz.",
    longDescription: `Llevá tu experiencia gamer al siguiente nivel con este monitor curvo de 27 pulgadas.
    Con su panel VA de alta calidad y curvatura 1500R, disfrutás de colores más vívidos y una inmersión total en cada partida.

    **Características principales:**
    - Resolución Full HD 1920x1080
    - Tasa de refresco de 165Hz
    - Tiempo de respuesta 1ms (MPRT)
    - Panel VA con curvatura 1500R
    - Compatible con FreeSync/G-Sync
    - HDMI 2.0 y DisplayPort 1.4
    - Sin bordes en 3 lados
    - Soporte ajustable en altura e inclinación

    **Ideal para:** Gaming competitivo, entretenimiento y trabajo creativo.`,
    price: 215000,
    images: [
      "https://placehold.co/800x600/1a2744/ffffff?text=Monitor+Gaming+27",
      "https://placehold.co/800x600/1a2744/ffffff?text=Monitor+Vista+Lateral",
      "https://placehold.co/800x600/1a2744/ffffff?text=Monitor+Detalle",
    ],
    weight: 4500,
    stock: 15,
    variants: [
      {
        name: "Color",
        options: ["Negro", "Blanco"],
      },
    ],
  },
  {
    id: "prod-002",
    slug: "teclado-mecanico-rgb",
    name: "Teclado Mecánico RGB TKL",
    description: "Teclado mecánico compacto TKL con switches ópticos y retroiluminación RGB personalizable.",
    longDescription: `El teclado mecánico ideal para gamers y entusiastas de la productividad.
    Su diseño TKL (tenkeyless) ahorra espacio sin sacrificar funcionalidad, y los switches ópticos
    garantizan una vida útil de más de 100 millones de pulsaciones.

    **Características principales:**
    - Layout TKL compacto (87 teclas)
    - Switches ópticos de alta velocidad
    - Retroiluminación RGB por tecla
    - Polling rate 1000Hz
    - Cable USB-C desmontable
    - Keycaps PBT doble disparo
    - Memoria interna para perfiles
    - Compatible con Windows y Mac

    **Perfecto para:** Gaming, programación y uso diario.`,
    price: 89000,
    images: [
      "https://placehold.co/800x600/1a2744/ffffff?text=Teclado+Mecanico+RGB",
      "https://placehold.co/800x600/1a2744/ffffff?text=Teclado+Detalle",
      "https://placehold.co/800x600/1a2744/ffffff?text=Teclado+Switches",
    ],
    weight: 850,
    stock: 30,
    variants: [
      {
        name: "Switch",
        options: ["Red (Linear)", "Blue (Clicky)", "Brown (Táctil)"],
      },
      {
        name: "Color",
        options: ["Negro", "Blanco"],
      },
    ],
  },
  {
    id: "prod-003",
    slug: "mouse-gaming-wireless",
    name: "Mouse Gaming Inalámbrico Pro",
    description: "Mouse gaming inalámbrico con sensor óptico de 25.600 DPI y batería de 70 horas.",
    longDescription: `El mouse definitivo para el gamer exigente. Con tecnología inalámbrica de ultra baja latencia
    y un sensor óptico de precisión, eliminá el lag y llevá tu juego al máximo nivel.

    **Características principales:**
    - Sensor óptico 25.600 DPI ajustable
    - Latencia inalámbrica de 1ms
    - Batería de 70 horas de uso continuo
    - Carga rápida USB-C (15 min = 3 horas)
    - 6 botones programables
    - RGB sincronizable
    - Peso: 80g
    - Receptor USB de 2.4GHz incluido

    **Ideal para:** Gaming competitivo y uso diario.`,
    price: 67500,
    images: [
      "https://placehold.co/800x600/1a2744/ffffff?text=Mouse+Gaming+Pro",
      "https://placehold.co/800x600/1a2744/ffffff?text=Mouse+Lateral",
      "https://placehold.co/800x600/1a2744/ffffff?text=Mouse+Base",
    ],
    weight: 120,
    stock: 25,
    variants: [
      {
        name: "Color",
        options: ["Negro", "Blanco"],
      },
    ],
  },
  {
    id: "prod-004",
    slug: "auriculares-gaming-7-1",
    name: "Auriculares Gaming 7.1 Surround",
    description: "Auriculares gaming con sonido envolvente 7.1 virtual, drivers de 50mm y micrófono retráctil.",
    longDescription: `Escuchá cada detalle del juego con estos auriculares de alta fidelidad.
    El sonido envolvente 7.1 virtual te ubica perfectamente en el campo de batalla y
    el micrófono con cancelación de ruido garantiza comunicación cristalina con tu equipo.

    **Características principales:**
    - Sonido surround 7.1 virtual por software
    - Drivers de 50mm neodimio
    - Respuesta en frecuencia: 20Hz - 20.000Hz
    - Micrófono retráctil con cancelación de ruido
    - Almohadillas memory foam con cuero PU
    - RGB en orejeras
    - Compatible: PC, PS5, PS4, Xbox, Switch
    - Cable trenzado de 1.5m con splitter incluido

    **Perfecto para:** Gaming, streaming y videoconferencias.`,
    price: 54000,
    images: [
      "https://placehold.co/800x600/1a2744/ffffff?text=Auriculares+Gaming",
      "https://placehold.co/800x600/1a2744/ffffff?text=Auriculares+Detalle",
      "https://placehold.co/800x600/1a2744/ffffff?text=Auriculares+Mic",
    ],
    weight: 350,
    stock: 20,
    variants: [
      {
        name: "Color",
        options: ["Negro", "Negro/Rojo"],
      },
    ],
  },
  {
    id: "prod-005",
    slug: "silla-gamer-ergonomica",
    name: "Silla Gamer Ergonómica Pro",
    description: "Silla gamer con soporte lumbar ajustable, reposabrazos 4D y reclinación hasta 180°.",
    longDescription: `Jugá por horas sin molestias con esta silla gamer diseñada para el máximo confort ergonómico.
    Su estructura de acero reforzada y espuma de alta densidad garantizan durabilidad y soporte óptimo.

    **Características principales:**
    - Estructura de acero reforzada
    - Espuma de alta densidad 50kg/m³
    - Reclinación ajustable 90° a 180°
    - Reposabrazos 4D (altura, profundidad, lateral, rotación)
    - Soporte lumbar con almohada incluida
    - Almohada cervical incluida
    - Base en estrella de nylon con ruedas PU
    - Capacidad de peso: 150kg
    - Altura ajustable: 42-52cm

    **Ideal para:** Gamers, diseñadores y trabajo desde casa.`,
    price: 185000,
    images: [
      "https://placehold.co/800x600/1a2744/ffffff?text=Silla+Gamer+Pro",
      "https://placehold.co/800x600/1a2744/ffffff?text=Silla+Lateral",
      "https://placehold.co/800x600/1a2744/ffffff?text=Silla+Detalle",
    ],
    weight: 25000,
    stock: 10,
    variants: [
      {
        name: "Color",
        options: ["Negro/Rojo", "Negro/Azul", "Negro/Verde", "Blanco/Rosa"],
      },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}
