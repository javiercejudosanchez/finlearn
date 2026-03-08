import { PrismaClient, ExerciseType } from "@prisma/client";

const prisma = new PrismaClient();

interface SeedOption {
  text: string;
  isCorrect: boolean;
}

interface SeedExercise {
  type: ExerciseType;
  question: string;
  explanation: string;
  options: SeedOption[];
}

interface SeedLesson {
  title: string;
  xpReward: number;
  exercises: SeedExercise[];
}

interface SeedUnit {
  title: string;
  lessons: SeedLesson[];
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// MUNDO 1 — Fundamentos del Dinero
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const units: SeedUnit[] = [
  // ── Unidad 1: Que es el dinero ──────────────────────────
  {
    title: "Que es el dinero",
    lessons: [
      {
        title: "Funciones del dinero",
        xpReward: 10,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Que funcion del dinero permite comparar el precio de una manzana con el de un coche?",
            explanation: "La funcion de unidad de cuenta permite expresar el valor de bienes y servicios en una medida comun, facilitando las comparaciones de precio.",
            options: [
              { text: "Medio de cambio", isCorrect: false },
              { text: "Unidad de cuenta", isCorrect: true },
              { text: "Reserva de valor", isCorrect: false },
              { text: "Medio de pago", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "El dinero siempre ha sido papel moneda emitido por gobiernos.",
            explanation: "Falso. Historicamente se han usado conchas, sal, ganado y metales preciosos como dinero. El papel moneda es relativamente reciente (China, siglo VII).",
            options: [
              { text: "Verdadero", isCorrect: false },
              { text: "Falso", isCorrect: true },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "Cuando guardas dinero para usarlo en el futuro, estas usando su funcion de ___.",
            explanation: "La funcion de reserva de valor permite transferir poder adquisitivo del presente al futuro.",
            options: [
              { text: "reserva de valor", isCorrect: true },
              { text: "medio de cambio", isCorrect: false },
              { text: "unidad de cuenta", isCorrect: false },
              { text: "liquidez", isCorrect: false },
            ],
          },
          {
            type: "MATCH_PAIRS",
            question: "Relaciona cada funcion del dinero con su ejemplo:",
            explanation: "El dinero cumple tres funciones principales: medio de cambio (facilita transacciones), unidad de cuenta (permite comparar valores) y reserva de valor (almacena riqueza).",
            options: [
              { text: "Medio de cambio → Pagar el cafe con una moneda", isCorrect: true },
              { text: "Unidad de cuenta → Ver que un movil cuesta 800 EUR", isCorrect: true },
              { text: "Reserva de valor → Ahorrar para la jubilacion", isCorrect: true },
            ],
          },
          {
            type: "ORDER",
            question: "Ordena la evolucion historica del dinero (de mas antiguo a mas reciente):",
            explanation: "El dinero evoluciono desde el trueque directo, pasando por mercancias con valor intrinseco, monedas metalicas, papel moneda respaldado y finalmente dinero fiduciario digital.",
            options: [
              { text: "Trueque de bienes", isCorrect: true },
              { text: "Monedas de oro y plata", isCorrect: true },
              { text: "Billetes de papel", isCorrect: true },
              { text: "Dinero digital y criptomonedas", isCorrect: true },
            ],
          },
        ],
      },
      {
        title: "Tipos de dinero",
        xpReward: 10,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es el dinero fiduciario?",
            explanation: "El dinero fiduciario no tiene valor intrinseco; su valor se basa en la confianza (del latin 'fiducia') en la institucion que lo emite, normalmente un banco central.",
            options: [
              { text: "Dinero respaldado por oro en un banco central", isCorrect: false },
              { text: "Dinero cuyo valor se basa en la confianza, sin respaldo en un bien fisico", isCorrect: true },
              { text: "Dinero exclusivamente digital", isCorrect: false },
              { text: "Monedas hechas de metales preciosos", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "El euro y el dolar son ejemplos de dinero fiduciario.",
            explanation: "Correcto. Desde que Nixon abandono el patron oro en 1971, las principales divisas son fiduciarias: su valor depende de la confianza en los bancos centrales.",
            options: [
              { text: "Verdadero", isCorrect: true },
              { text: "Falso", isCorrect: false },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "El dinero que los bancos comerciales crean al conceder prestamos se llama dinero ___.",
            explanation: "Los bancos crean dinero bancario (o escritural) cuando conceden creditos. Solo una fraccion de los depositos se mantiene en reserva (sistema de reserva fraccionaria).",
            options: [
              { text: "bancario", isCorrect: true },
              { text: "fiduciario", isCorrect: false },
              { text: "metalico", isCorrect: false },
              { text: "legal", isCorrect: false },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Cual de estas opciones NO es una caracteristica deseable del dinero?",
            explanation: "El dinero debe ser divisible, durable, portable, uniforme y escaso. Ser perecedero es lo contrario de durable, lo que lo haria un mal medio de intercambio.",
            options: [
              { text: "Divisibilidad", isCorrect: false },
              { text: "Durabilidad", isCorrect: false },
              { text: "Ser perecedero", isCorrect: true },
              { text: "Portabilidad", isCorrect: false },
            ],
          },
          {
            type: "ORDER",
            question: "Ordena de menor a mayor liquidez:",
            explanation: "La liquidez mide la facilidad para convertir un activo en medio de pago. El efectivo es el mas liquido; un inmueble puede tardar meses en venderse.",
            options: [
              { text: "Un piso en propiedad", isCorrect: true },
              { text: "Acciones cotizadas en bolsa", isCorrect: true },
              { text: "Un deposito a plazo fijo", isCorrect: true },
              { text: "Efectivo en tu cartera", isCorrect: true },
            ],
          },
        ],
      },
      {
        title: "El valor del dinero",
        xpReward: 15,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Si la inflacion anual es del 3%, que ocurre con 1.000 EUR guardados bajo el colchon durante un ano?",
            explanation: "Con un 3% de inflacion, esos 1.000 EUR podran comprar aproximadamente lo mismo que 970 EUR un ano antes. El dinero no desaparece, pero pierde poder adquisitivo.",
            options: [
              { text: "Siguen valiendo exactamente 1.000 EUR en poder de compra", isCorrect: false },
              { text: "Pueden comprar aproximadamente un 3% menos de bienes", isCorrect: true },
              { text: "Ganan un 3% de valor", isCorrect: false },
              { text: "Pierden todo su valor", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "La deflacion (bajada generalizada de precios) siempre es buena para la economia.",
            explanation: "Falso. Aunque suene positivo, la deflacion sostenida puede ser danina: los consumidores retrasan compras esperando precios mas bajos, las empresas reducen produccion y empleo, y la deuda real aumenta.",
            options: [
              { text: "Verdadero", isCorrect: false },
              { text: "Falso", isCorrect: true },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "El indice que mide la variacion de precios de una cesta de bienes y servicios se llama ___.",
            explanation: "El IPC (Indice de Precios al Consumo) mide como varian los precios de una cesta representativa de bienes y servicios que consume un hogar medio.",
            options: [
              { text: "IPC", isCorrect: true },
              { text: "PIB", isCorrect: false },
              { text: "IBEX", isCorrect: false },
              { text: "EBITDA", isCorrect: false },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es la hiperinflacion?",
            explanation: "Se considera hiperinflacion cuando los precios suben mas de un 50% al mes. Ejemplos historicos: Alemania en 1923, Zimbabwe en 2008, Venezuela reciente.",
            options: [
              { text: "Una inflacion moderada del 2-3% anual", isCorrect: false },
              { text: "Un aumento de precios extremo y descontrolado, tipicamente superior al 50% mensual", isCorrect: true },
              { text: "La inflacion que solo afecta a alimentos", isCorrect: false },
              { text: "Una subida de precios causada por impuestos", isCorrect: false },
            ],
          },
          {
            type: "MATCH_PAIRS",
            question: "Relaciona cada concepto con su definicion:",
            explanation: "Inflacion es la subida de precios; deflacion es la bajada; estanflacion combina estancamiento economico con inflacion alta; desinflacion es la reduccion del ritmo de la inflacion.",
            options: [
              { text: "Inflacion → Subida generalizada y sostenida de precios", isCorrect: true },
              { text: "Deflacion → Bajada generalizada y sostenida de precios", isCorrect: true },
              { text: "Estanflacion → Inflacion alta + estancamiento economico", isCorrect: true },
            ],
          },
        ],
      },
    ],
  },

  // ── Unidad 2: El sistema bancario ───────────────────────
  {
    title: "El sistema bancario",
    lessons: [
      {
        title: "Que hace un banco",
        xpReward: 10,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Cual es la funcion principal de un banco comercial?",
            explanation: "Los bancos comerciales actuan como intermediarios financieros: captan depositos de ahorradores y los prestan a quienes necesitan financiacion, obteniendo beneficio por la diferencia de tipos.",
            options: [
              { text: "Imprimir billetes", isCorrect: false },
              { text: "Intermediar entre ahorradores y prestatarios", isCorrect: true },
              { text: "Fijar el tipo de interes oficial", isCorrect: false },
              { text: "Recaudar impuestos para el gobierno", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "Los bancos comerciales pueden crear dinero al conceder prestamos.",
            explanation: "Correcto. Cuando un banco concede un prestamo, crea un deposito nuevo en la cuenta del prestatario. Esto se llama creacion de dinero bancario y es la forma principal en que se crea dinero en las economias modernas.",
            options: [
              { text: "Verdadero", isCorrect: true },
              { text: "Falso", isCorrect: false },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "La diferencia entre el tipo de interes que un banco cobra por prestamos y el que paga por depositos se llama ___.",
            explanation: "El margen de intermediacion (o spread bancario) es la principal fuente de ingresos de un banco comercial. Si paga un 1% por depositos y cobra un 4% por hipotecas, su margen es del 3%.",
            options: [
              { text: "margen de intermediacion", isCorrect: true },
              { text: "tipo de referencia", isCorrect: false },
              { text: "prima de riesgo", isCorrect: false },
              { text: "tasa de descuento", isCorrect: false },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es el coeficiente de reservas obligatorias?",
            explanation: "El coeficiente de reservas es el porcentaje de los depositos que los bancos deben mantener en el banco central como reserva. En la eurozona es del 1%. El resto lo pueden prestar.",
            options: [
              { text: "El porcentaje de beneficios que el banco debe repartir a accionistas", isCorrect: false },
              { text: "El porcentaje de depositos que el banco debe mantener sin prestar", isCorrect: true },
              { text: "La comision que cobra el banco por cada transferencia", isCorrect: false },
              { text: "El tipo de interes minimo legal", isCorrect: false },
            ],
          },
          {
            type: "ORDER",
            question: "Ordena el proceso de creacion de dinero bancario:",
            explanation: "El multiplicador monetario permite que un deposito inicial genere varios depositos sucesivos. Con un coeficiente de reservas del 10%, un deposito de 1.000 EUR puede generar hasta 10.000 EUR en el sistema.",
            options: [
              { text: "Un cliente deposita 1.000 EUR en el banco", isCorrect: true },
              { text: "El banco reserva un porcentaje (ej. 10%) y presta el resto", isCorrect: true },
              { text: "El prestatario gasta el dinero y el receptor lo deposita en su banco", isCorrect: true },
              { text: "El segundo banco reserva y vuelve a prestar, multiplicando el dinero", isCorrect: true },
            ],
          },
        ],
      },
      {
        title: "El Banco Central",
        xpReward: 15,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Cual es el objetivo principal del Banco Central Europeo (BCE)?",
            explanation: "El mandato principal del BCE es mantener la estabilidad de precios, definida como una inflacion cercana al 2% a medio plazo. A diferencia de la Fed (EEUU), el empleo no es un mandato primario.",
            options: [
              { text: "Maximizar el empleo", isCorrect: false },
              { text: "Mantener la estabilidad de precios (inflacion cercana al 2%)", isCorrect: true },
              { text: "Financiar el gasto publico", isCorrect: false },
              { text: "Regular el mercado de valores", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "El Banco Central Europeo puede prestar dinero directamente a los gobiernos de la eurozona.",
            explanation: "Falso. El Tratado de la UE prohibe la financiacion monetaria directa de gobiernos. El BCE solo puede comprar deuda publica en el mercado secundario (a otros inversores), no directamente a los estados.",
            options: [
              { text: "Verdadero", isCorrect: false },
              { text: "Falso", isCorrect: true },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "Cuando el BCE sube los tipos de interes, busca ___ la inflacion.",
            explanation: "Subir tipos encarece el credito, lo que reduce el consumo y la inversion, enfriando la economia y conteniendo las presiones inflacionistas.",
            options: [
              { text: "frenar", isCorrect: true },
              { text: "aumentar", isCorrect: false },
              { text: "ignorar", isCorrect: false },
              { text: "duplicar", isCorrect: false },
            ],
          },
          {
            type: "MATCH_PAIRS",
            question: "Relaciona cada herramienta del BCE con su efecto:",
            explanation: "El BCE tiene varias herramientas: los tipos afectan al coste del credito, las reservas limitan la creacion de dinero, y la compra de bonos inyecta liquidez al sistema.",
            options: [
              { text: "Subir tipos de interes → Encarece el credito, frena la economia", isCorrect: true },
              { text: "Bajar tipos de interes → Abarata el credito, estimula la economia", isCorrect: true },
              { text: "Compra de bonos (QE) → Inyecta liquidez en el sistema financiero", isCorrect: true },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es la politica monetaria expansiva?",
            explanation: "La politica expansiva (bajar tipos, comprar activos) busca estimular la economia cuando esta debil. La restrictiva (subir tipos) busca frenar la inflacion.",
            options: [
              { text: "Subir tipos y restringir el credito para frenar la inflacion", isCorrect: false },
              { text: "Bajar tipos y aumentar la liquidez para estimular la economia", isCorrect: true },
              { text: "Eliminar todos los impuestos", isCorrect: false },
              { text: "Aumentar el gasto publico del gobierno", isCorrect: false },
            ],
          },
        ],
      },
      {
        title: "Productos bancarios basicos",
        xpReward: 10,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Cual es la diferencia principal entre una cuenta corriente y un deposito a plazo fijo?",
            explanation: "La cuenta corriente ofrece disponibilidad inmediata pero poco o nulo interes. El deposito a plazo fijo ofrece mayor rentabilidad a cambio de inmovilizar el dinero durante un periodo.",
            options: [
              { text: "La cuenta corriente paga mas intereses", isCorrect: false },
              { text: "El deposito a plazo ofrece mas rentabilidad a cambio de menor liquidez", isCorrect: true },
              { text: "No hay ninguna diferencia", isCorrect: false },
              { text: "El deposito a plazo no esta garantizado", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "El Fondo de Garantia de Depositos en Espana cubre hasta 100.000 EUR por titular y entidad.",
            explanation: "Correcto. Si un banco quiebra, el FGD garantiza la devolucion de hasta 100.000 EUR por depositante y por entidad bancaria. Es un mecanismo clave para la confianza en el sistema.",
            options: [
              { text: "Verdadero", isCorrect: true },
              { text: "Falso", isCorrect: false },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "La TAE (Tasa Anual ___) permite comparar el coste o rentabilidad real de diferentes productos financieros.",
            explanation: "La TAE (Tasa Anual Equivalente) incluye el tipo de interes nominal mas las comisiones y la frecuencia de pago, permitiendo comparar productos de forma homogenea.",
            options: [
              { text: "Equivalente", isCorrect: true },
              { text: "Efectiva", isCorrect: false },
              { text: "Estimada", isCorrect: false },
              { text: "Europea", isCorrect: false },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es el Euribor?",
            explanation: "El Euribor (Euro Interbank Offered Rate) es el tipo de interes al que los bancos europeos se prestan entre si. Es la referencia principal para hipotecas a tipo variable en Espana.",
            options: [
              { text: "El tipo de interes oficial del BCE", isCorrect: false },
              { text: "El tipo al que los bancos europeos se prestan dinero entre si", isCorrect: true },
              { text: "Un indice bursatil europeo", isCorrect: false },
              { text: "La tasa de inflacion de la eurozona", isCorrect: false },
            ],
          },
          {
            type: "ORDER",
            question: "Ordena estos productos bancarios de menor a mayor riesgo para el cliente:",
            explanation: "Los depositos garantizados son los mas seguros. Los fondos monetarios invierten en deuda a muy corto plazo. Los fondos de renta fija tienen riesgo de tipos. Los fondos de renta variable dependen de la bolsa.",
            options: [
              { text: "Deposito a plazo fijo garantizado por el FGD", isCorrect: true },
              { text: "Fondo monetario", isCorrect: true },
              { text: "Fondo de renta fija a largo plazo", isCorrect: true },
              { text: "Fondo de renta variable (bolsa)", isCorrect: true },
            ],
          },
        ],
      },
    ],
  },

  // ── Unidad 3: Ahorro e inversion ───────────────────────
  {
    title: "Ahorro e inversion",
    lessons: [
      {
        title: "La diferencia entre ahorrar e invertir",
        xpReward: 10,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Cual es la diferencia fundamental entre ahorrar e invertir?",
            explanation: "Ahorrar es guardar dinero de forma segura y liquida (cuenta, deposito). Invertir implica destinar dinero a activos con expectativa de rentabilidad, asumiendo cierto riesgo de perdida.",
            options: [
              { text: "No hay diferencia, son sinonimos", isCorrect: false },
              { text: "Ahorrar es guardar dinero con seguridad; invertir busca rentabilidad asumiendo riesgo", isCorrect: true },
              { text: "Invertir es mas seguro que ahorrar", isCorrect: false },
              { text: "Solo los ricos pueden invertir", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "Si la inflacion es del 3% y tu cuenta de ahorro te da un 1%, estas perdiendo poder adquisitivo.",
            explanation: "Correcto. La rentabilidad real = rentabilidad nominal - inflacion. En este caso: 1% - 3% = -2%. Cada ano tu dinero compra un 2% menos de bienes y servicios.",
            options: [
              { text: "Verdadero", isCorrect: true },
              { text: "Falso", isCorrect: false },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "La relacion entre rentabilidad esperada y riesgo es generalmente ___: a mayor riesgo, mayor rentabilidad potencial.",
            explanation: "Es la ley fundamental de las finanzas: los inversores exigen mayor compensacion (rentabilidad) por asumir mayor incertidumbre (riesgo). No hay almuerzo gratis.",
            options: [
              { text: "directa", isCorrect: true },
              { text: "inversa", isCorrect: false },
              { text: "inexistente", isCorrect: false },
              { text: "aleatoria", isCorrect: false },
            ],
          },
          {
            type: "MATCH_PAIRS",
            question: "Relaciona cada perfil de inversor con su estrategia:",
            explanation: "El perfil de riesgo determina la asignacion de activos. Los conservadores priorizan preservar capital; los agresivos buscan maxima rentabilidad aceptando volatilidad.",
            options: [
              { text: "Conservador → Depositos y renta fija a corto plazo", isCorrect: true },
              { text: "Moderado → Mix de renta fija y renta variable", isCorrect: true },
              { text: "Agresivo → Mayoritariamente renta variable", isCorrect: true },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es el fondo de emergencia?",
            explanation: "Los expertos recomiendan tener entre 3 y 6 meses de gastos en una cuenta liquida antes de empezar a invertir. Es tu colchon ante imprevistos (perdida de empleo, reparaciones).",
            options: [
              { text: "Una inversion en bolsa para emergencias", isCorrect: false },
              { text: "Un ahorro liquido equivalente a 3-6 meses de gastos para imprevistos", isCorrect: true },
              { text: "Un seguro de vida obligatorio", isCorrect: false },
              { text: "Un prestamo rapido del banco", isCorrect: false },
            ],
          },
        ],
      },
      {
        title: "El interes compuesto",
        xpReward: 15,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es el interes compuesto?",
            explanation: "El interes compuesto genera intereses sobre los intereses ya acumulados. Einstein supuestamente lo llamo 'la octava maravilla del mundo'. Es la clave para crear riqueza a largo plazo.",
            options: [
              { text: "El interes que cobra un banco por un prestamo", isCorrect: false },
              { text: "Ganar intereses tanto sobre el capital inicial como sobre los intereses acumulados", isCorrect: true },
              { text: "Un tipo de interes fijado por el BCE", isCorrect: false },
              { text: "El interes que se paga en cuotas mensuales", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "Si inviertes 10.000 EUR al 7% anual con interes compuesto, en 10 anos tendras aproximadamente 19.672 EUR.",
            explanation: "Correcto. 10.000 x (1,07)^10 = 19.671,51 EUR. El capital casi se duplica en 10 anos. Con interes simple serian solo 17.000 EUR (10.000 + 7.000).",
            options: [
              { text: "Verdadero", isCorrect: true },
              { text: "Falso", isCorrect: false },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "La regla del ___ permite estimar rapidamente cuantos anos tarda una inversion en duplicarse: divide ese numero por el tipo de interes anual.",
            explanation: "La regla del 72: si inviertes al 6% anual, tu dinero se duplica en aproximadamente 72/6 = 12 anos. Al 8%, en 72/8 = 9 anos. Es una aproximacion muy util.",
            options: [
              { text: "72", isCorrect: true },
              { text: "100", isCorrect: false },
              { text: "50", isCorrect: false },
              { text: "36", isCorrect: false },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Usando la regla del 72, si inviertes al 8% anual, en cuantos anos aproximadamente se duplicara tu inversion?",
            explanation: "72 / 8 = 9 anos. Con interes compuesto al 8%, 10.000 EUR se convierten en ~20.000 EUR en 9 anos y en ~40.000 EUR en 18 anos.",
            options: [
              { text: "6 anos", isCorrect: false },
              { text: "9 anos", isCorrect: true },
              { text: "12 anos", isCorrect: false },
              { text: "15 anos", isCorrect: false },
            ],
          },
          {
            type: "ORDER",
            question: "Ordena estas inversiones de 10.000 EUR al 7% anual por tiempo invertido (de menor a mayor valor final):",
            explanation: "El tiempo es el aliado mas poderoso del interes compuesto. 10 anos: 19.672 EUR. 20 anos: 38.697 EUR. 30 anos: 76.123 EUR. 40 anos: 149.745 EUR. Empezar pronto es clave.",
            options: [
              { text: "5 anos → ~14.026 EUR", isCorrect: true },
              { text: "10 anos → ~19.672 EUR", isCorrect: true },
              { text: "20 anos → ~38.697 EUR", isCorrect: true },
              { text: "30 anos → ~76.123 EUR", isCorrect: true },
            ],
          },
        ],
      },
      {
        title: "Riesgo y rentabilidad",
        xpReward: 15,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es la diversificacion en inversiones?",
            explanation: "Diversificar es repartir la inversion entre diferentes activos, sectores y geografias para reducir el riesgo. 'No pongas todos los huevos en la misma cesta.'",
            options: [
              { text: "Invertir todo en la empresa con mas beneficios", isCorrect: false },
              { text: "Repartir la inversion entre diferentes activos para reducir el riesgo", isCorrect: true },
              { text: "Cambiar de inversion cada semana", isCorrect: false },
              { text: "Invertir solo en productos bancarios garantizados", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "Historicamente, la renta variable (bolsa) ha superado a la renta fija (bonos) en rentabilidad a largo plazo (+20 anos).",
            explanation: "Correcto. A largo plazo, las acciones han ofrecido una rentabilidad media del 7-10% anual frente al 2-4% de los bonos. Pero con mucha mayor volatilidad a corto plazo.",
            options: [
              { text: "Verdadero", isCorrect: true },
              { text: "Falso", isCorrect: false },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "La volatilidad mide la ___ de las variaciones en el precio de un activo.",
            explanation: "La volatilidad mide la magnitud (amplitud) de las fluctuaciones de precio. Un activo con alta volatilidad sube y baja mucho; uno con baja volatilidad se mueve poco. Es una medida de riesgo.",
            options: [
              { text: "magnitud", isCorrect: true },
              { text: "direccion", isCorrect: false },
              { text: "frecuencia", isCorrect: false },
              { text: "velocidad", isCorrect: false },
            ],
          },
          {
            type: "MATCH_PAIRS",
            question: "Relaciona cada tipo de riesgo con su descripcion:",
            explanation: "Existen distintos tipos de riesgo. El de mercado afecta a todos los activos. El de credito depende del emisor. El de liquidez se refiere a la dificultad de vender. El de divisa a las fluctuaciones de moneda.",
            options: [
              { text: "Riesgo de mercado → Caida general de los precios (crisis)", isCorrect: true },
              { text: "Riesgo de credito → El emisor no puede pagar su deuda", isCorrect: true },
              { text: "Riesgo de liquidez → Dificultad para vender el activo rapidamente", isCorrect: true },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Un inversor de 25 anos con empleo estable que no necesitara el dinero en 20 anos, que perfil de riesgo deberia considerar?",
            explanation: "Con un horizonte de 20+ anos, puede asumir mas volatilidad a corto plazo a cambio de mayor rentabilidad esperada. El tiempo permite recuperarse de caidas del mercado.",
            options: [
              { text: "Muy conservador — solo depositos garantizados", isCorrect: false },
              { text: "Conservador — mayoritariamente renta fija", isCorrect: false },
              { text: "Moderado-agresivo — mayoritariamente renta variable con algo de renta fija", isCorrect: true },
              { text: "Indiferente — el perfil no importa", isCorrect: false },
            ],
          },
        ],
      },
    ],
  },

  // ── Unidad 4: Presupuesto y deuda personal ─────────────
  {
    title: "Presupuesto y deuda personal",
    lessons: [
      {
        title: "Como hacer un presupuesto",
        xpReward: 10,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es la regla 50/30/20 para presupuestos personales?",
            explanation: "La regla 50/30/20 (popularizada por Elizabeth Warren) sugiere destinar el 50% de ingresos a necesidades, 30% a deseos y 20% a ahorro e inversion. Es un punto de partida, no una regla rigida.",
            options: [
              { text: "50% ahorro, 30% gastos, 20% impuestos", isCorrect: false },
              { text: "50% necesidades, 30% deseos, 20% ahorro", isCorrect: true },
              { text: "50% alquiler, 30% comida, 20% ocio", isCorrect: false },
              { text: "50% inversion, 30% necesidades, 20% deseos", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "Registrar todos tus gastos durante un mes es un buen primer paso para crear un presupuesto.",
            explanation: "Correcto. Antes de presupuestar necesitas saber en que gastas. Muchos descubren 'fugas' de dinero (suscripciones olvidadas, cafes diarios...) que pueden redirigir al ahorro.",
            options: [
              { text: "Verdadero", isCorrect: true },
              { text: "Falso", isCorrect: false },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "Los gastos ___ son aquellos que se repiten cada mes con un importe similar, como el alquiler o la cuota del gimnasio.",
            explanation: "Los gastos fijos (alquiler, seguros, suscripciones) son predecibles. Los gastos variables (comida, ocio, ropa) fluctuan. Controlar ambos es clave para un buen presupuesto.",
            options: [
              { text: "fijos", isCorrect: true },
              { text: "variables", isCorrect: false },
              { text: "extraordinarios", isCorrect: false },
              { text: "financieros", isCorrect: false },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Si ganas 2.000 EUR netos al mes y sigues la regla 50/30/20, cuanto deberirias destinar a ahorro?",
            explanation: "El 20% de 2.000 EUR = 400 EUR al mes para ahorro e inversion. Esto incluye el fondo de emergencia, planes de pensiones y cualquier otra inversion.",
            options: [
              { text: "200 EUR", isCorrect: false },
              { text: "400 EUR", isCorrect: true },
              { text: "600 EUR", isCorrect: false },
              { text: "1.000 EUR", isCorrect: false },
            ],
          },
          {
            type: "ORDER",
            question: "Ordena los pasos para crear tu primer presupuesto:",
            explanation: "Un buen presupuesto sigue un proceso: primero registras gastos reales, luego los clasificas, estableces limites por categoria y finalmente haces seguimiento mensual.",
            options: [
              { text: "Registrar todos tus ingresos y gastos durante un mes", isCorrect: true },
              { text: "Clasificar gastos en necesidades, deseos y ahorro", isCorrect: true },
              { text: "Establecer limites para cada categoria", isCorrect: true },
              { text: "Revisar y ajustar el presupuesto cada mes", isCorrect: true },
            ],
          },
        ],
      },
      {
        title: "Entender la deuda",
        xpReward: 15,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Cual es la diferencia entre deuda buena y deuda mala?",
            explanation: "La deuda 'buena' financia activos que generan valor (formacion, vivienda, negocio). La deuda 'mala' financia consumo depreciable (vacaciones, ropa, electronica) a tipos altos.",
            options: [
              { text: "Toda deuda es mala", isCorrect: false },
              { text: "La buena financia activos que generan valor; la mala financia consumo a tipos altos", isCorrect: true },
              { text: "La buena tiene tipo fijo; la mala tipo variable", isCorrect: false },
              { text: "No existe tal distincion", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "Pagar solo el minimo de la tarjeta de credito cada mes es una estrategia financiera recomendable.",
            explanation: "Falso. Pagar solo el minimo genera intereses muy altos (20-25% TAE en muchas tarjetas) sobre el saldo restante. Una deuda de 3.000 EUR pagando el minimo puede tardar mas de 10 anos en saldarse.",
            options: [
              { text: "Verdadero", isCorrect: false },
              { text: "Falso", isCorrect: true },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "El metodo ___ para pagar deudas consiste en pagar primero la deuda mas pequena para ganar motivacion.",
            explanation: "El metodo bola de nieve (Dave Ramsey) prioriza pagar la deuda mas pequena primero, independientemente del tipo de interes. El metodo avalancha prioriza la de mayor interes (es mas eficiente pero menos motivador).",
            options: [
              { text: "bola de nieve", isCorrect: true },
              { text: "avalancha", isCorrect: false },
              { text: "cascada", isCorrect: false },
              { text: "piramide", isCorrect: false },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Que porcentaje de tus ingresos netos recomiendan los expertos como maximo para el pago de deudas (excluyendo hipoteca)?",
            explanation: "La mayoria de asesores financieros recomiendan que el total de pagos de deuda (sin hipoteca) no supere el 20% de los ingresos netos. Con hipoteca incluida, el limite suele ser el 35-40%.",
            options: [
              { text: "10%", isCorrect: false },
              { text: "20%", isCorrect: true },
              { text: "50%", isCorrect: false },
              { text: "No hay limite recomendado", isCorrect: false },
            ],
          },
          {
            type: "MATCH_PAIRS",
            question: "Relaciona cada tipo de deuda con su tipo de interes tipico:",
            explanation: "Los tipos de interes reflejan el riesgo para el prestamista. Las hipotecas tienen colateral (la vivienda), por eso son mas baratas. Las tarjetas no tienen garantia, por eso son carisimas.",
            options: [
              { text: "Hipoteca → 2-5% TAE (garantia del inmueble)", isCorrect: true },
              { text: "Prestamo personal → 6-12% TAE", isCorrect: true },
              { text: "Tarjeta de credito → 18-25% TAE (sin garantia)", isCorrect: true },
            ],
          },
        ],
      },
      {
        title: "Tu puntuacion crediticia",
        xpReward: 15,
        exercises: [
          {
            type: "MULTIPLE_CHOICE",
            question: "Que es el historial crediticio?",
            explanation: "El historial crediticio es un registro de como has manejado tus deudas: si pagas a tiempo, cuanto debes, cuantas cuentas tienes. Los bancos lo consultan antes de concederte un prestamo.",
            options: [
              { text: "La cantidad total de dinero que has ganado en tu vida", isCorrect: false },
              { text: "Un registro de tu comportamiento como pagador de deudas", isCorrect: true },
              { text: "Tu saldo actual en el banco", isCorrect: false },
              { text: "Una lista de todos los bancos donde tienes cuenta", isCorrect: false },
            ],
          },
          {
            type: "TRUE_FALSE",
            question: "No tener ninguna deuda garantiza una puntuacion crediticia excelente.",
            explanation: "Falso. Sin historial de credito, los prestamistas no tienen datos para evaluarte. Es la 'paradoja del credito': necesitas haber usado credito responsablemente para demostrar que eres buen pagador.",
            options: [
              { text: "Verdadero", isCorrect: false },
              { text: "Falso", isCorrect: true },
            ],
          },
          {
            type: "FILL_BLANK",
            question: "En Espana, la lista de morosos mas conocida se llama ___ (Asociacion Nacional de Establecimientos Financieros de Credito).",
            explanation: "ASNEF es un fichero de morosidad. Si no pagas una deuda, el acreedor puede incluirte. Estar en ASNEF dificulta enormemente obtener credito, contratar servicios o incluso alquilar un piso.",
            options: [
              { text: "ASNEF", isCorrect: true },
              { text: "CIRBE", isCorrect: false },
              { text: "IBEX", isCorrect: false },
              { text: "CNMV", isCorrect: false },
            ],
          },
          {
            type: "MULTIPLE_CHOICE",
            question: "Que factor tiene MAS peso en tu puntuacion crediticia?",
            explanation: "El historial de pagos puntuales es el factor mas importante (~35%). Pagar siempre a tiempo, aunque sean importes pequenos, es la mejor forma de construir buen credito.",
            options: [
              { text: "Tus ingresos mensuales", isCorrect: false },
              { text: "Tu historial de pagos a tiempo", isCorrect: true },
              { text: "La cantidad de tarjetas que tienes", isCorrect: false },
              { text: "Tu edad", isCorrect: false },
            ],
          },
          {
            type: "ORDER",
            question: "Ordena estas acciones de mejor a peor para tu puntuacion crediticia:",
            explanation: "Pagar a tiempo es lo mejor. Usar poco credito disponible es positivo. Solicitar muchos creditos a la vez genera multiples consultas, lo que puede interpretarse como desesperacion financiera.",
            options: [
              { text: "Pagar siempre a tiempo y en su totalidad", isCorrect: true },
              { text: "Usar menos del 30% del limite de tu tarjeta", isCorrect: true },
              { text: "Solicitar varias tarjetas de credito a la vez", isCorrect: true },
              { text: "Dejar de pagar una cuota sin avisar al banco", isCorrect: true },
            ],
          },
        ],
      },
    ],
  },
];

async function main() {
  console.log("Limpiando base de datos...");
  await prisma.exerciseOption.deleteMany();
  await prisma.exercise.deleteMany();
  await prisma.userProgress.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.unit.deleteMany();
  await prisma.world.deleteMany();
  await prisma.user.deleteMany();

  console.log("Creando Mundo 1: Fundamentos del Dinero...");

  const world = await prisma.world.create({
    data: {
      title: "Fundamentos del Dinero",
      description: "Aprende los conceptos basicos sobre el dinero, los bancos, el ahorro y la deuda",
      icon: "banknote",
      color: "#10B981",
      order: 0,
    },
  });

  for (let ui = 0; ui < units.length; ui++) {
    const unitData = units[ui];
    console.log(`  Unidad ${ui + 1}: ${unitData.title}`);

    const unit = await prisma.unit.create({
      data: {
        worldId: world.id,
        title: unitData.title,
        order: ui,
      },
    });

    for (let li = 0; li < unitData.lessons.length; li++) {
      const lessonData = unitData.lessons[li];
      console.log(`    Leccion ${li + 1}: ${lessonData.title}`);

      const lesson = await prisma.lesson.create({
        data: {
          unitId: unit.id,
          title: lessonData.title,
          order: li,
          xpReward: lessonData.xpReward,
        },
      });

      for (let ei = 0; ei < lessonData.exercises.length; ei++) {
        const exData = lessonData.exercises[ei];

        await prisma.exercise.create({
          data: {
            lessonId: lesson.id,
            type: exData.type,
            question: exData.question,
            explanation: exData.explanation,
            order: ei,
            options: {
              create: exData.options.map((opt, oi) => ({
                text: opt.text,
                isCorrect: opt.isCorrect,
                order: oi,
              })),
            },
          },
        });
      }
    }
  }

  const counts = {
    worlds: await prisma.world.count(),
    units: await prisma.unit.count(),
    lessons: await prisma.lesson.count(),
    exercises: await prisma.exercise.count(),
    options: await prisma.exerciseOption.count(),
  };

  console.log("\nSeed completado:");
  console.log(`  ${counts.worlds} mundo(s)`);
  console.log(`  ${counts.units} unidades`);
  console.log(`  ${counts.lessons} lecciones`);
  console.log(`  ${counts.exercises} ejercicios`);
  console.log(`  ${counts.options} opciones`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
