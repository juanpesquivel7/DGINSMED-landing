export interface ArticleSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Article {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  publishedAt: string;
  readingTime: string;
  relatedProductSlugs: string[];
  intro: string;
  sections: ArticleSection[];
  disclaimer: string;
  videoId?: string;
}

// Contenido SEO informativo sobre autoinyección. Solo en español (mercado
// prioritario Argentina). No reemplaza indicación médica: cada artículo
// incluye un disclaimer y enlaza a los productos DG-Ject relevantes.
export const articles: Article[] = [
  {
    slug: "autoinyector-semaglutida-tirzepatida-sin-miedo-agujas",
    title:
      "Autoinyector para semaglutida y tirzepatida: aplicate el tratamiento GLP-1 sin miedo a las agujas",
    metaDescription:
      "Cómo funciona un autoinyector para tratamientos GLP-1 (semaglutida, tirzepatida), por qué reduce el miedo a las agujas y qué tener en cuenta antes de aplicarte la dosis en casa.",
    excerpt:
      "El miedo a la aguja es una de las razones más comunes por las que se abandona un tratamiento GLP-1. Así ayuda un autoinyector a que la aplicación semanal sea simple y sin sobresaltos.",
    publishedAt: "2026-07-14",
    readingTime: "6 min",
    relatedProductSlugs: ["dg-ject-iii-automatico-1ml-semaglutida"],
    intro:
      "Los tratamientos con agonistas GLP-1 (como semaglutida y tirzepatida) se aplican con una inyección subcutánea, generalmente una vez por semana. Para mucha gente, ese es el paso más incómodo de todo el tratamiento: no por el dolor en sí, sino por la anticipación de ver la aguja. Un autoinyector está diseñado justamente para sacar ese momento de la ecuación.",
    sections: [
      {
        heading: "¿Por qué genera tanto rechazo la autoaplicación?",
        paragraphs: [
          "La ansiedad ante las agujas (belonefobia, en su forma más marcada) es mucho más común de lo que se piensa, y no tiene que ver con la tolerancia al dolor. Tiene que ver con la anticipación: ver la aguja acercarse, sostener el pulso firme, calcular el ángulo correcto.",
          "En tratamientos que se extienden por meses o años, ese momento de tensión semanal puede transformarse en una razón real de abandono del tratamiento, incluso cuando está funcionando bien.",
        ],
      },
      {
        heading: "Qué cambia con un autoinyector",
        paragraphs: [
          "Un autoinyector automático como el DG-Ject III esconde la aguja en todo momento: no se ve antes, durante ni después de la aplicación. El dispositivo apoya sobre la piel, se activa con un pulsador y hace todo el recorrido de inserción y aplicación de forma automática.",
          "Esto no cambia la dosis ni el principio activo — sigue siendo la misma jeringa prellenada que indicó tu médico —, pero cambia por completo la experiencia de aplicártela.",
        ],
        list: [
          "La aguja permanece oculta en todo momento.",
          "El regulador de profundidad ajustable adapta la inyección a distintos tipos de piel.",
          "El pulsador ergonómico reduce el margen de error de la aplicación manual.",
          "Es reutilizable: se lava y desinfecta entre aplicaciones.",
        ],
      },
      {
        heading: "Antes de tu primera aplicación",
        paragraphs: [
          "Ningún dispositivo reemplaza la indicación de tu médico o farmacéutico: ellos son quienes definen la dosis, la frecuencia y la zona de aplicación adecuada para tu tratamiento GLP-1 específico.",
          "Lo que sí podés resolver de antemano es el método de aplicación. Si el motivo por el que dudás en empezar (o en sostener) el tratamiento es la aguja, contás con una alternativa concreta antes de discontinuar algo que te está haciendo bien.",
        ],
      },
    ],
    disclaimer:
      "Este artículo es información general sobre el uso de autoinyectores y no reemplaza la indicación de un profesional de la salud. Consultá siempre a tu médico o farmacéutico sobre la dosis, frecuencia y forma de aplicación de tu tratamiento.",
  },
  {
    slug: "tratamientos-glp1-argentina-que-son-como-se-aplican",
    title:
      "Tratamientos GLP-1 en Argentina: qué son, para qué se usan y cómo se aplican",
    metaDescription:
      "Guía general sobre los tratamientos GLP-1 (agonistas del receptor GLP-1) disponibles en Argentina: para qué se usan, cómo se administran y qué rol cumple el dispositivo de aplicación.",
    excerpt:
      "Cada vez se habla más de los tratamientos GLP-1 para diabetes tipo 2 y control de peso. Repasamos qué son, en qué se diferencian y qué implica aplicárselos vos mismo en casa.",
    publishedAt: "2026-07-14",
    readingTime: "7 min",
    relatedProductSlugs: ["dg-ject-iii-automatico-1ml-semaglutida"],
    intro:
      "GLP-1 (péptido similar al glucagón tipo 1) es una hormona que el propio cuerpo produce para regular el azúcar en sangre y la sensación de saciedad. Los tratamientos conocidos como \"agonistas GLP-1\" imitan ese efecto, y hoy son una de las líneas de tratamiento más recetadas para diabetes tipo 2 y, en presentaciones específicas, para control de peso bajo indicación médica.",
    sections: [
      {
        heading: "Para qué se recetan",
        paragraphs: [
          "Los agonistas GLP-1 se usan principalmente en dos escenarios: el control glucémico en diabetes tipo 2, y — en presentaciones y dosis específicas aprobadas para ese fin — el acompañamiento de tratamientos de control de peso, siempre combinados con cambios de alimentación y actividad física indicados por un profesional.",
          "No son intercambiables entre sí ni con otros tratamientos hormonales o metabólicos: cada molécula, dosis y esquema de aplicación lo define tu médico según tu historia clínica.",
        ],
      },
      {
        heading: "Cómo se aplican en la práctica",
        paragraphs: [
          "La gran mayoría de estos tratamientos se presentan en jeringas o lapiceras prellenadas de aplicación subcutánea (debajo de la piel, generalmente en abdomen o muslo), con una frecuencia semanal en la mayoría de los esquemas.",
          "Esa es la razón por la que el dispositivo de aplicación importa tanto como la medicación en sí: si la aplicación semanal es incómoda o genera rechazo, el tratamiento se sostiene peor en el tiempo.",
        ],
      },
      {
        heading: "El rol de un buen autoinyector",
        paragraphs: [
          "Un autoinyector automático, como el DG-Ject III diseñado para jeringas prellenadas de 1 ml, estandariza la aplicación: profundidad regulable, aguja oculta y un solo gesto para completar la dosis. Esto es especialmente útil para quienes recién empiezan un tratamiento GLP-1 y todavía no tienen práctica con la autoaplicación.",
        ],
      },
    ],
    disclaimer:
      "Este contenido es educativo y general. No constituye indicación médica ni promueve el uso de ningún medicamento específico fuera de una prescripción profesional. Ante cualquier duda sobre tu tratamiento, consultá a tu médico.",
  },
  {
    slug: "guia-autoaplicacion-insulina-en-casa",
    title:
      "Guía práctica para aplicarte insulina en casa: pasos, errores comunes y consejos",
    metaDescription:
      "Guía paso a paso para la autoaplicación de insulina en casa: preparación, zonas de aplicación, errores frecuentes y cómo un autoinyector simplifica la rutina diaria.",
    excerpt:
      "Aplicarse insulina es una rutina diaria para millones de personas con diabetes. Repasamos los pasos básicos, los errores más comunes y cómo un autoinyector puede simplificar el día a día.",
    publishedAt: "2026-07-14",
    readingTime: "7 min",
    relatedProductSlugs: [
      "dg-ject-i-semi-automatico-1ml",
      "dg-ject-ii-automatico-1ml",
    ],
    intro:
      "Para quienes conviven con diabetes tipo 1 o tipo 2 en tratamiento insulínico, la autoaplicación es parte de la rutina diaria, a veces varias veces al día. Con esa frecuencia, cualquier detalle que simplifique el proceso o reduzca el margen de error hace una diferencia real en la calidad de vida.",
    sections: [
      {
        heading: "Los pasos básicos de la aplicación",
        paragraphs: [
          "Aunque el esquema exacto lo define tu equipo médico (tipo de insulina, dosis, horarios y zonas de rotación), la mecánica de aplicación comparte una base común en la mayoría de los tratamientos.",
        ],
        list: [
          "Lavado de manos y desinfección de la zona de aplicación.",
          "Verificación de la dosis cargada en la jeringa o lapicera.",
          "Rotación de la zona de aplicación (abdomen, muslo, brazo) para evitar lipodistrofia.",
          "Aplicación con el ángulo y profundidad indicados por tu médico.",
          "Descarte seguro de la aguja en un contenedor adecuado.",
        ],
      },
      {
        heading: "Errores comunes al autoaplicarse insulina",
        paragraphs: [
          "Dos de los errores más frecuentes son no rotar la zona de aplicación (lo que puede generar zonas de tejido endurecido que absorben peor la insulina) y aplicar con miedo o de forma apurada, lo que suele traducirse en una inserción poco profunda o angulada de manera incorrecta.",
          "Acá es donde un dispositivo de aplicación bien diseñado ayuda: estandariza el ángulo y la profundidad, y reduce la variabilidad que introduce el nerviosismo o la falta de práctica.",
        ],
      },
      {
        heading: "Automático o semi-automático: ¿cuál elegir?",
        paragraphs: [
          "El DG-Ject II es un autoinyector automático: un solo gesto activa la inserción y la aplicación completa. El DG-Ject I es semi-automático, con un pulsador que da más sensación de control manual del proceso, algo que muchas personas con años de experiencia en autoaplicación prefieren.",
          "Ninguna opción es \"mejor\" en términos absolutos: depende de tu comodidad, tu experiencia previa y si preferís mayor automatización o mayor control manual del gesto.",
        ],
      },
    ],
    disclaimer:
      "Esta guía es informativa y no reemplaza la educación diabetológica de tu equipo médico. La dosis, el tipo de insulina y el esquema de aplicación siempre deben ser indicados y controlados por un profesional de la salud.",
  },
  {
    slug: "autoinyeccion-trimix-disfuncion-erectil-que-saber",
    title:
      "Autoinyección de Trimix para disfunción eréctil: qué necesitás saber antes de empezar",
    metaDescription:
      "Qué es la terapia inyectable (Trimix) para disfunción eréctil, cómo se aplica y qué rol cumple un autoinyector para reducir la incomodidad de la autoaplicación.",
    excerpt:
      "La terapia inyectable es una de las alternativas más efectivas para la disfunción eréctil cuando otros tratamientos no funcionan. Repasamos qué implica la autoaplicación y cómo hacerla menos incómoda.",
    publishedAt: "2026-07-14",
    readingTime: "6 min",
    relatedProductSlugs: ["dg-ject-i-semi-automatico-1ml"],
    intro:
      "La terapia inyectable intracavernosa —conocida comercialmente como Trimix, por la combinación de tres fármacos vasoactivos— es una alternativa que suelen indicar los urólogos cuando otros tratamientos para la disfunción eréctil no dieron el resultado esperado. Es un tratamiento efectivo, pero la barrera más frecuente para sostenerlo en el tiempo es, otra vez, la autoaplicación.",
    sections: [
      {
        heading: "Por qué se indica",
        paragraphs: [
          "A diferencia de los tratamientos orales, la terapia inyectable actúa directamente a nivel local, lo que la vuelve una opción efectiva incluso en casos donde otras alternativas no funcionaron. Es tu urólogo quien evalúa si esta es la indicación adecuada para tu caso, la dosis inicial (que suele ajustarse en consultorio) y el esquema de aplicación.",
        ],
      },
      {
        heading: "El desafío de la autoaplicación",
        paragraphs: [
          "Aplicarse una inyección en una zona sensible genera, comprensiblemente, más tensión que una aplicación en abdomen o brazo. Esa tensión suele traducirse en dudar el gesto, lo que paradójicamente puede hacer la aplicación menos precisa y más incómoda.",
          "Un autoinyector semi-automático como el DG-Ject I fue pensado justamente para este tipo de escenario: la aguja permanece oculta durante todo el proceso y el regulador de profundidad ajustable permite calibrar la aplicación de forma consistente, aplicación tras aplicación.",
        ],
      },
      {
        heading: "Qué llevar a la consulta con tu urólogo",
        paragraphs: [
          "Si estás evaluando empezar este tratamiento, es un buen momento para conversar con tu urólogo no solo sobre la dosis, sino también sobre el método de aplicación. Preguntá específicamente si un dispositivo autoinyector es compatible con la presentación que te van a recetar, y practicá la primera aplicación en consultorio si es posible.",
        ],
      },
    ],
    disclaimer:
      "Este artículo es información general y no reemplaza la consulta con un urólogo. La indicación, dosis y forma de aplicación de la terapia inyectable deben ser siempre definidas y supervisadas por un profesional.",
  },
  {
    slug: "autoinyectores-vs-jeringas-tradicionales-ventajas",
    title:
      "Autoinyectores vs. jeringas tradicionales: ventajas para tratamientos crónicos",
    metaDescription:
      "Comparamos autoinyectores y jeringas tradicionales para tratamientos de aplicación frecuente (insulina, GLP-1, terapia inyectable) y cuándo tiene sentido cambiar de método.",
    excerpt:
      "Si tenés un tratamiento de aplicación frecuente, la herramienta que usás para aplicarlo importa tanto como la medicación. Comparamos autoinyectores y jeringas tradicionales.",
    publishedAt: "2026-07-14",
    readingTime: "5 min",
    videoId: "WS8UbD8eals",
    relatedProductSlugs: [
      "dg-ject-i-semi-automatico-1ml",
      "dg-ject-ii-automatico-1ml",
      "dg-ject-iii-automatico-1ml-semaglutida",
      "dg-ject-iv-automatico-05ml",
      "dg-ject-v-automatico-03ml",
    ],
    intro:
      "Cuando un tratamiento requiere aplicaciones frecuentes —diarias, semanales o varias veces por semana—, la forma en la que te aplicás la dosis deja de ser un detalle menor. Acá comparamos las dos alternativas más comunes: la jeringa tradicional y el autoinyector.",
    sections: [
      {
        heading: "Jeringa tradicional: control total, más exposición visual",
        paragraphs: [
          "Con una jeringa tradicional (o una lapicera sin cobertor automático), ves la aguja durante todo el proceso: al cargar la dosis, al elegir el ángulo, al insertarla. Para quienes ya tienen práctica y no les genera tensión, esto no es un problema — de hecho, da una sensación de control total sobre cada paso.",
          "El punto débil aparece cuando la exposición a la aguja genera ansiedad, dudas en el gesto, o cuando se trata de zonas más sensibles del cuerpo.",
        ],
      },
      {
        heading: "Autoinyector: la aguja no se ve, la dosis no cambia",
        paragraphs: [
          "Un autoinyector no modifica el medicamento ni la dosis — sigue siendo la misma jeringa o cartucho prellenado indicado por tu médico —, pero cambia la experiencia: la aguja queda oculta dentro del dispositivo en todo momento, y el mecanismo (automático o semi-automático, según el modelo) estandariza el ángulo y la profundidad de aplicación.",
          "Esto es especialmente valioso en tratamientos de aplicación semanal o diaria sostenidos en el tiempo, donde pequeñas fricciones repetidas (dudar, tensar el brazo, aplicar con apuro) se acumulan y afectan la adherencia al tratamiento.",
        ],
      },
      {
        heading: "¿Cuándo tiene sentido cambiar?",
        paragraphs: [
          "Si notás que postergás o saltás aplicaciones por la incomodidad del proceso —más que por la medicación en sí—, vale la pena que converses con tu médico sobre si un autoinyector es compatible con tu tratamiento. En DG-INSMED tenemos modelos automáticos y semi-automáticos para distintos tipos de jeringa: 1 ml (insulina, GLP-1), y prellenadas de vidrio de 0.3 ml y 0.5 ml.",
        ],
      },
    ],
    disclaimer:
      "Este artículo compara métodos de aplicación de forma general y no reemplaza la indicación médica sobre tu tratamiento específico. Consultá a tu médico antes de cambiar el método o dispositivo de aplicación.",
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
