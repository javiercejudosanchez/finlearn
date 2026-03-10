// Nivel 2 — Finanzas personales
export const world2Config = {
  title: "Finanzas personales",
  description: "Ingresos, gastos, ahorro y deuda: controla tu dinero",
  icon: "wallet",
  color: "#F59E0B",
  order: 1,
};

export const world2Units = [
  // ── Unidad 1: Ingresos ──
  {
    title: "Ingresos",
    lessons: [
      {
        title: "Tipos de ingresos",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Cual es la diferencia entre ingresos activos y pasivos?", explanation: "Los ingresos activos requieren tu tiempo y trabajo (salario). Los pasivos se generan sin trabajo directo (alquileres, dividendos, intereses).", options: [{ text: "No hay diferencia", isCorrect: false }, { text: "Activos requieren tu trabajo; pasivos se generan sin trabajar activamente", isCorrect: true }, { text: "Activos son mas grandes que los pasivos", isCorrect: false }, { text: "Pasivos son ilegales", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Un autonomo y un asalariado pagan los mismos impuestos y cotizaciones sociales.", explanation: "Falso. Los autonomos pagan su propia cuota a la Seguridad Social y tributan de forma diferente (IRPF por estimacion directa). Los asalariados tienen retenciones y cotizaciones a cargo de la empresa.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "Los ingresos que recibes por alquilar un piso o por dividendos de acciones se llaman ingresos ___.", explanation: "Los ingresos pasivos no requieren dedicacion diaria. Son clave para la independencia financiera.", options: [{ text: "pasivos", isCorrect: true }, { text: "activos", isCorrect: false }, { text: "brutos", isCorrect: false }, { text: "variables", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada tipo de ingreso con su ejemplo:", explanation: "Los ingresos pueden venir del trabajo, del capital o de la propiedad.", options: [{ text: "Ingreso activo → Salario mensual de 2.000 EUR", isCorrect: true }, { text: "Ingreso pasivo → 300 EUR/mes de alquiler de un piso", isCorrect: true }, { text: "Ingreso por capital → Dividendos de acciones de Iberdrola", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estas fuentes de ingresos de mas comun a menos comun en Espana:", explanation: "La mayoria de espanoles dependen del salario. Los autonomos son el segundo grupo. Los ingresos por alquileres e inversiones son menos frecuentes.", options: [{ text: "Salario por cuenta ajena", isCorrect: true }, { text: "Ingresos de trabajo autonomo", isCorrect: true }, { text: "Alquiler de inmuebles", isCorrect: true }, { text: "Dividendos e intereses de inversiones", isCorrect: true }] },
        ],
      },
      {
        title: "La nomina: bruto vs neto",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Si tu salario bruto es de 30.000 EUR anuales y las retenciones (IRPF + SS) son del 25%, cual es tu salario neto anual?", explanation: "Neto = Bruto - Retenciones = 30.000 - (30.000 x 0,25) = 30.000 - 7.500 = 22.500 EUR. Es lo que realmente recibes.", options: [{ text: "30.000 EUR", isCorrect: false }, { text: "25.000 EUR", isCorrect: false }, { text: "22.500 EUR", isCorrect: true }, { text: "7.500 EUR", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "El salario bruto es la cantidad que recibes en tu cuenta bancaria cada mes.", explanation: "Falso. El bruto es antes de descontar impuestos (IRPF) y cotizaciones (Seguridad Social). Lo que recibes es el neto.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "Las cotizaciones a la ___ que se descuentan de tu nomina financian tu futura pension, sanidad y desempleo.", explanation: "La Seguridad Social recauda cotizaciones de trabajadores y empresas para pagar pensiones, prestaciones por desempleo, sanidad publica, etc.", options: [{ text: "Seguridad Social", isCorrect: true }, { text: "Hacienda", isCorrect: false }, { text: "Agencia Tributaria", isCorrect: false }, { text: "Comision Europea", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada concepto de la nomina con su significado:", explanation: "La nomina desglosa tu salario bruto, las deducciones y lo que finalmente cobras (neto).", options: [{ text: "Salario bruto → Importe total antes de descuentos", isCorrect: true }, { text: "Retencion IRPF → Anticipo del impuesto sobre la renta", isCorrect: true }, { text: "Salario neto → Lo que recibes en tu cuenta bancaria", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena los conceptos de la nomina de arriba a abajo:", explanation: "La nomina se estructura desde el bruto total, se aplican las deducciones (SS e IRPF), y el resultado final es el neto que cobras.", options: [{ text: "Salario bruto (sueldo base + complementos)", isCorrect: true }, { text: "Cotizacion a la Seguridad Social (~6,5% del bruto)", isCorrect: true }, { text: "Retencion del IRPF (variable segun tramo)", isCorrect: true }, { text: "Salario neto (lo que recibes)", isCorrect: true }] },
        ],
      },
      {
        title: "El IRPF y los tramos",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "El IRPF en Espana es progresivo. Que significa esto?", explanation: "Progresivo significa que quien mas gana, paga un porcentaje mayor. Los primeros 12.450 EUR tributan al 19%, de 12.450 a 20.200 al 24%, etc.", options: [{ text: "Todos pagan el mismo porcentaje", isCorrect: false }, { text: "Quien mas gana paga un porcentaje mayor sobre la parte que supera cada tramo", isCorrect: true }, { text: "Solo pagan los ricos", isCorrect: false }, { text: "El porcentaje baja cuanto mas ganas", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Si subes de tramo del IRPF, TODO tu salario pasa a tributar al tipo mas alto.", explanation: "Falso. Solo la parte que excede el tramo anterior tributa al nuevo tipo. Si ganas 25.000 EUR, los primeros 12.450 tributan al 19%, los siguientes al 24%, etc.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "En Espana, el primer tramo del IRPF (hasta 12.450 EUR) tiene un tipo del ___% .", explanation: "El 19% es el tipo minimo del IRPF. Se aplica a los primeros 12.450 EUR de base liquidable.", options: [{ text: "19", isCorrect: true }, { text: "24", isCorrect: false }, { text: "15", isCorrect: false }, { text: "30", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada tramo del IRPF con su tipo impositivo (2024):", explanation: "El IRPF tiene tramos progresivos. A mas renta, mayor tipo marginal.", options: [{ text: "Hasta 12.450 EUR → 19%", isCorrect: true }, { text: "12.450 - 20.200 EUR → 24%", isCorrect: true }, { text: "20.200 - 35.200 EUR → 30%", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena las pagas extras de mas a menos comun en Espana:", explanation: "La mayoria de convenios incluyen 14 pagas (12 mensuales + 2 extras en junio y diciembre). Algunos tienen 15 o 16, y otros las prorratean en 12.", options: [{ text: "14 pagas (12 + junio y diciembre)", isCorrect: true }, { text: "12 pagas (extras prorrateadas)", isCorrect: true }, { text: "15 pagas (con paga de beneficios)", isCorrect: true }, { text: "16 pagas (poco frecuente)", isCorrect: true }] },
        ],
      },
    ],
  },
  // ── Unidad 2: Gastos ──
  {
    title: "Gastos",
    lessons: [
      {
        title: "Gastos fijos vs variables",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Cual de estos es un gasto fijo?", explanation: "El alquiler es un gasto fijo porque se repite cada mes con el mismo importe. Restaurantes, ropa y viajes son variables.", options: [{ text: "Cena en restaurante", isCorrect: false }, { text: "Alquiler mensual", isCorrect: true }, { text: "Ropa nueva", isCorrect: false }, { text: "Viaje de fin de semana", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Las suscripciones (Netflix, Spotify, gimnasio) son gastos fijos.", explanation: "Correcto. Se cobran automaticamente cada mes con un importe fijo. Son faciles de olvidar y pueden acumularse.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Los gastos ___ son aquellos que fluctuan cada mes, como comida fuera de casa, ocio o compras puntuales.", explanation: "Los gastos variables son mas dificiles de presupuestar pero tambien mas faciles de recortar cuando necesitas ahorrar.", options: [{ text: "variables", isCorrect: true }, { text: "fijos", isCorrect: false }, { text: "obligatorios", isCorrect: false }, { text: "financieros", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Clasifica estos gastos:", explanation: "Los gastos fijos son predecibles y recurrentes. Los variables cambian cada mes segun tus decisiones.", options: [{ text: "Hipoteca/alquiler → Gasto fijo", isCorrect: true }, { text: "Compra semanal del super → Gasto variable", isCorrect: true }, { text: "Seguro del coche → Gasto fijo", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estos gastos mensuales tipicos en Espana de mayor a menor importe medio:", explanation: "La vivienda es el mayor gasto para la mayoria de hogares espanoles (~35%), seguido de alimentacion, transporte y suministros.", options: [{ text: "Vivienda (alquiler/hipoteca): ~700 EUR", isCorrect: true }, { text: "Alimentacion: ~300 EUR", isCorrect: true }, { text: "Transporte: ~200 EUR", isCorrect: true }, { text: "Suministros (luz, agua, gas): ~150 EUR", isCorrect: true }] },
        ],
      },
      {
        title: "Como hacer un presupuesto",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Que es la regla 50/30/20 para presupuestos personales?", explanation: "El 50% para necesidades (alquiler, comida, transporte), 30% para deseos (ocio, restaurantes) y 20% para ahorro e inversion.", options: [{ text: "50% ahorro, 30% gastos, 20% impuestos", isCorrect: false }, { text: "50% necesidades, 30% deseos, 20% ahorro", isCorrect: true }, { text: "50% alquiler, 30% comida, 20% ocio", isCorrect: false }, { text: "50% inversion, 30% necesidades, 20% deseos", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Si ganas 2.000 EUR netos y gastas 2.100 EUR al mes, estas en deficit aunque tengas ahorros.", explanation: "Correcto. Cada mes pierdes 100 EUR. Aunque tengas colchon, es insostenible. Necesitas recortar gastos o aumentar ingresos.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Si ganas 2.500 EUR netos al mes y aplicas la regla 50/30/20, destinaras ___ EUR al ahorro.", explanation: "20% de 2.500 = 500 EUR al mes para ahorro e inversion. En un ano son 6.000 EUR.", options: [{ text: "500", isCorrect: true }, { text: "750", isCorrect: false }, { text: "250", isCorrect: false }, { text: "1.250", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Clasifica estos gastos segun la regla 50/30/20:", explanation: "Necesidades son gastos imprescindibles. Deseos son gastos prescindibles. Ahorro es lo que no gastas.", options: [{ text: "Alquiler de 800 EUR → Necesidades (50%)", isCorrect: true }, { text: "Cena con amigos por 40 EUR → Deseos (30%)", isCorrect: true }, { text: "Aportacion mensual a un fondo indexado → Ahorro (20%)", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena los pasos para crear tu primer presupuesto:", explanation: "Primero registra gastos reales, luego clasificalos, establece limites y revisa cada mes.", options: [{ text: "Registrar todos tus ingresos y gastos durante un mes", isCorrect: true }, { text: "Clasificar gastos en necesidades, deseos y ahorro", isCorrect: true }, { text: "Establecer limites para cada categoria", isCorrect: true }, { text: "Revisar y ajustar el presupuesto cada mes", isCorrect: true }] },
        ],
      },
      {
        title: "Trampas de gasto y suscripciones",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Cuanto puedes gastar al ano si tomas un cafe de 1,80 EUR cada dia laborable (~220 dias)?", explanation: "1,80 x 220 = 396 EUR al ano. Los micro-gastos diarios se acumulan. No es 'malo' si lo disfrutas, pero es importante ser consciente.", options: [{ text: "Unos 100 EUR", isCorrect: false }, { text: "Unos 200 EUR", isCorrect: false }, { text: "Unos 400 EUR", isCorrect: true }, { text: "Unos 650 EUR", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Segun estudios, el espanol medio tiene suscripciones que no usa por valor de 30-50 EUR al mes.", explanation: "Correcto. Gimnasios, plataformas de streaming, apps premium... Es comun acumular suscripciones olvidadas. Revisarlas es una forma facil de ahorrar.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Si pagas 4 suscripciones de 12 EUR al mes que apenas usas, al ano te cuestan ___ EUR.", explanation: "4 x 12 x 12 = 576 EUR al ano. Revisar y cancelar suscripciones innecesarias es una forma rapida de ahorrar.", options: [{ text: "576", isCorrect: true }, { text: "48", isCorrect: false }, { text: "144", isCorrect: false }, { text: "288", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada trampa de gasto con su solucion:", explanation: "Ser consciente de las trampas de gasto te ayuda a tomar mejores decisiones financieras.", options: [{ text: "Compras impulsivas online → Esperar 48h antes de comprar", isCorrect: true }, { text: "Suscripciones olvidadas → Revisar cargos bancarios cada trimestre", isCorrect: true }, { text: "Micro-gastos diarios → Llevar un registro semanal de gastos", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estos recortes de gasto de mas facil a mas dificil de implementar:", explanation: "Cancelar suscripciones es inmediato. Cocinar mas requiere habito. Cambiar de compania es puntual. Mudarse es una decision mayor.", options: [{ text: "Cancelar suscripciones que no usas", isCorrect: true }, { text: "Cocinar mas y comer menos fuera", isCorrect: true }, { text: "Cambiar a companias de suministros mas baratas", isCorrect: true }, { text: "Mudarte a una zona mas economica", isCorrect: true }] },
        ],
      },
    ],
  },
  // ── Unidad 3: Ahorro ──
  {
    title: "Ahorro",
    lessons: [
      {
        title: "El fondo de emergencia",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Cuantos meses de gastos recomiendan los expertos tener en un fondo de emergencia?", explanation: "La recomendacion general es 3-6 meses de gastos. Si tus gastos mensuales son 1.500 EUR, necesitas entre 4.500 y 9.000 EUR.", options: [{ text: "1 mes", isCorrect: false }, { text: "3-6 meses", isCorrect: true }, { text: "12-24 meses", isCorrect: false }, { text: "No es necesario tener uno", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "El fondo de emergencia debe estar invertido en bolsa para que crezca.", explanation: "Falso. Debe estar en un lugar seguro y liquido (cuenta de ahorro, deposito a la vista). Su objetivo es disponibilidad inmediata, no rentabilidad.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "Si tus gastos mensuales son 1.800 EUR, tu fondo de emergencia minimo (3 meses) deberia ser de ___ EUR.", explanation: "3 x 1.800 = 5.400 EUR. Este colchon te protege ante imprevistos como perdida de empleo, averia del coche o gastos medicos.", options: [{ text: "5.400", isCorrect: true }, { text: "1.800", isCorrect: false }, { text: "3.600", isCorrect: false }, { text: "10.800", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada situacion con si deberias usar el fondo de emergencia:", explanation: "El fondo es para imprevistos reales, no para gastos planificables o caprichos.", options: [{ text: "Te despiden del trabajo → Si, es una emergencia", isCorrect: true }, { text: "Quieres comprar el ultimo iPhone → No, es un deseo", isCorrect: true }, { text: "Se te rompe la caldera en invierno → Si, es un imprevisto", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena los pasos para construir tu fondo de emergencia:", explanation: "Primero calcula cuanto necesitas, automatiza el ahorro, y solo cuando este completo empieza a invertir el resto.", options: [{ text: "Calcula tus gastos mensuales esenciales", isCorrect: true }, { text: "Multiplica por 3-6 para fijar tu objetivo", isCorrect: true }, { text: "Automatiza una transferencia mensual a una cuenta separada", isCorrect: true }, { text: "Una vez completo, empieza a invertir el ahorro extra", isCorrect: true }] },
        ],
      },
      {
        title: "La regla 50/30/20 en practica",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Maria gana 2.000 EUR netos. Paga 750 EUR de alquiler, 200 de comida y 100 de transporte. Cuanto le queda para deseos y ahorro?", explanation: "Necesidades = 750 + 200 + 100 = 1.050 EUR. Quedan 2.000 - 1.050 = 950 EUR para deseos (30% = 600) y ahorro (20% = 400).", options: [{ text: "1.250 EUR", isCorrect: false }, { text: "950 EUR", isCorrect: true }, { text: "750 EUR", isCorrect: false }, { text: "1.050 EUR", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Si tus necesidades basicas superan el 50% de tu sueldo, la regla 50/30/20 no funciona para ti.", explanation: "Falso. La regla es una guia, no una ley. Si las necesidades superan el 50%, ajusta los otros porcentajes pero intenta mantener al menos un 10-15% de ahorro.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "Si ganas 1.800 EUR netos y ahorras el 20% cada mes, en un ano habras ahorrado ___ EUR.", explanation: "20% de 1.800 = 360 EUR/mes. 360 x 12 = 4.320 EUR al ano. Es un fondo de emergencia en poco mas de un ano.", options: [{ text: "4.320", isCorrect: true }, { text: "3.600", isCorrect: false }, { text: "2.160", isCorrect: false }, { text: "360", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada perfil con la distribucion que mejor le encaja:", explanation: "La distribucion ideal depende de tus circunstancias. Quien gana poco prioriza necesidades; quien gana mas puede ahorrar mas.", options: [{ text: "Sueldo 1.200 EUR en ciudad cara → 60/20/20 (necesidades altas)", isCorrect: true }, { text: "Sueldo 3.000 EUR sin deudas → 40/30/30 (mas ahorro)", isCorrect: true }, { text: "Sueldo 2.000 EUR con deudas → 50/20/30 (prioriza eliminar deuda)", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena las prioridades financieras de mas urgente a menos:", explanation: "Primero cubre necesidades basicas, elimina deuda toxica, construye un colchon de seguridad y finalmente invierte.", options: [{ text: "Cubrir necesidades basicas (techo, comida, transporte)", isCorrect: true }, { text: "Pagar deudas de alto interes (tarjetas de credito)", isCorrect: true }, { text: "Construir fondo de emergencia (3-6 meses)", isCorrect: true }, { text: "Invertir para el largo plazo", isCorrect: true }] },
        ],
      },
      {
        title: "El interes compuesto",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Usando la regla del 72, si inviertes al 6% anual, en cuantos anos se duplica tu dinero?", explanation: "72 / 6 = 12 anos. La regla del 72 es una aproximacion rapida: divide 72 entre el tipo de interes para saber cuantos anos tarda en duplicarse.", options: [{ text: "6 anos", isCorrect: false }, { text: "12 anos", isCorrect: true }, { text: "18 anos", isCorrect: false }, { text: "72 anos", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Si inviertes 10.000 EUR al 7% anual con interes compuesto, en 10 anos tendras aproximadamente 19.672 EUR.", explanation: "Correcto. 10.000 x (1,07)^10 = 19.672 EUR. Con interes simple serian solo 17.000 EUR. La diferencia es el poder del interes compuesto.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "La regla del ___ permite estimar cuantos anos tarda una inversion en duplicarse: divide ese numero entre el tipo de interes.", explanation: "Regla del 72: al 8% se duplica en 72/8 = 9 anos. Al 4% en 72/4 = 18 anos. Muy util para estimaciones rapidas.", options: [{ text: "72", isCorrect: true }, { text: "100", isCorrect: false }, { text: "50", isCorrect: false }, { text: "36", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada escenario de inversion (10.000 EUR al 7%):", explanation: "El interes compuesto crece exponencialmente. Cuanto mas tiempo, mayor el efecto.", options: [{ text: "10 anos → ~19.672 EUR", isCorrect: true }, { text: "20 anos → ~38.697 EUR", isCorrect: true }, { text: "30 anos → ~76.123 EUR", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena el impacto de empezar a invertir 200 EUR/mes al 7% segun la edad:", explanation: "Empezar a los 25 vs 35 supone una diferencia enorme por el interes compuesto. El tiempo es tu mejor aliado.", options: [{ text: "Empezar a los 25 (40 anos hasta jubilacion) → ~525.000 EUR", isCorrect: true }, { text: "Empezar a los 30 (35 anos) → ~365.000 EUR", isCorrect: true }, { text: "Empezar a los 35 (30 anos) → ~245.000 EUR", isCorrect: true }, { text: "Empezar a los 45 (20 anos) → ~104.000 EUR", isCorrect: true }] },
        ],
      },
    ],
  },
  // ── Unidad 4: Deuda personal ──
  {
    title: "Deuda personal",
    lessons: [
      {
        title: "Tipos de deuda",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Cual es la diferencia entre deuda buena y deuda mala?", explanation: "La deuda 'buena' financia activos que generan valor (formacion, vivienda). La 'mala' financia consumo depreciable a tipos altos (tarjetas, vacaciones a credito).", options: [{ text: "Toda deuda es mala", isCorrect: false }, { text: "La buena financia activos que generan valor; la mala financia consumo a tipos altos", isCorrect: true }, { text: "La buena tiene tipo fijo; la mala tipo variable", isCorrect: false }, { text: "No existe tal distincion", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Pagar solo el minimo de la tarjeta de credito cada mes es una estrategia recomendable.", explanation: "Falso. Las tarjetas revolving cobran 20-25% TAE. Una deuda de 3.000 EUR pagando el minimo puede tardar mas de 10 anos y costar mas de 5.000 EUR en intereses.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "Una hipoteca es un tipo de deuda ___ porque esta respaldada por el inmueble como garantia.", explanation: "Las deudas garantizadas (hipotecas, leasing) tienen tipos mas bajos porque si no pagas, el acreedor puede quedarse con el bien. Las no garantizadas (tarjetas) son mas caras.", options: [{ text: "garantizada", isCorrect: true }, { text: "personal", isCorrect: false }, { text: "publica", isCorrect: false }, { text: "variable", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada tipo de deuda con su tipo de interes tipico:", explanation: "Cuanto mayor la garantia para el prestamista, menor el tipo de interes.", options: [{ text: "Hipoteca → 2-4% TAE", isCorrect: true }, { text: "Prestamo personal → 6-12% TAE", isCorrect: true }, { text: "Tarjeta revolving → 18-25% TAE", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estas deudas de mas urgente a menos urgente de pagar:", explanation: "Prioriza pagar primero la deuda con mayor tipo de interes (metodo avalancha). Las tarjetas revolving son las mas caras.", options: [{ text: "Tarjeta revolving al 22% TAE", isCorrect: true }, { text: "Prestamo personal al 9% TAE", isCorrect: true }, { text: "Prestamo coche al 5% TAE", isCorrect: true }, { text: "Hipoteca al 2,5% TAE", isCorrect: true }] },
        ],
      },
      {
        title: "TAE vs TIN",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Un banco ofrece un prestamo al 5% TIN con 300 EUR de comision de apertura. La TAE sera:", explanation: "La TAE incluye el TIN mas las comisiones, por lo que siempre sera mayor que el TIN. Es el dato que debes comparar entre ofertas.", options: [{ text: "Menor que el 5%", isCorrect: false }, { text: "Exactamente 5%", isCorrect: false }, { text: "Mayor que el 5%", isCorrect: true }, { text: "No tiene relacion con el TIN", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Para comparar dos prestamos de distintos bancos, es mejor fijarse en la TAE que en el TIN.", explanation: "Correcto. La TAE incluye todos los costes (interes + comisiones + frecuencia de pago). Dos prestamos con el mismo TIN pueden tener TAE muy diferentes.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "El TIN (Tipo de Interes ___) refleja solo el porcentaje de interes puro, sin comisiones.", explanation: "El TIN es el coste puro del interes. La TAE anade comisiones de apertura, estudio, y otros gastos para dar una imagen completa.", options: [{ text: "Nominal", isCorrect: true }, { text: "Neto", isCorrect: false }, { text: "Natural", isCorrect: false }, { text: "Nacional", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada concepto con lo que incluye:", explanation: "El TIN es el interes puro. La TAE anade comisiones. El coste total incluye todo el dinero que pagaras por el prestamo.", options: [{ text: "TIN → Solo el porcentaje de interes anual", isCorrect: true }, { text: "TAE → Interes + comisiones + frecuencia de pago", isCorrect: true }, { text: "Coste total → Todos los pagos durante la vida del prestamo", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena lo que debes comprobar al pedir un prestamo:", explanation: "Compara la TAE (no el TIN), revisa comisiones ocultas, mira el coste total y asegurate de que la cuota cabe en tu presupuesto.", options: [{ text: "Comparar la TAE entre distintas ofertas", isCorrect: true }, { text: "Revisar comisiones (apertura, cancelacion anticipada)", isCorrect: true }, { text: "Calcular el coste total (intereses + comisiones)", isCorrect: true }, { text: "Verificar que la cuota mensual cabe en tu presupuesto", isCorrect: true }] },
        ],
      },
      {
        title: "Amortizacion de deuda",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "En un prestamo con sistema frances (cuota constante), al principio la mayor parte de la cuota se destina a:", explanation: "En el sistema frances, las primeras cuotas son mayoritariamente intereses. Conforme avanza el prestamo, mas parte de la cuota va a reducir el capital (principal).", options: [{ text: "Pagar el capital (principal)", isCorrect: false }, { text: "Pagar intereses", isCorrect: true }, { text: "Pagar comisiones", isCorrect: false }, { text: "Partes iguales de capital e intereses", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Amortizar anticipadamente una hipoteca siempre es la mejor decision financiera.", explanation: "Falso. Si el tipo de la hipoteca es bajo (2-3%) y puedes invertir al 7%, es mejor invertir. Hay que comparar el coste de la deuda con la rentabilidad esperada de la inversion.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "El metodo ___ para pagar deudas prioriza pagar primero la de mayor tipo de interes para minimizar el coste total.", explanation: "El metodo avalancha es matematicamente optimo: pagas menos intereses totales. El metodo bola de nieve (pagar la mas pequena primero) es psicologicamente mas motivador.", options: [{ text: "avalancha", isCorrect: true }, { text: "bola de nieve", isCorrect: false }, { text: "cascada", isCorrect: false }, { text: "piramide", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada metodo de pago de deudas:", explanation: "El metodo avalancha ahorra mas dinero. El bola de nieve da mas motivacion psicologica al tener victorias rapidas.", options: [{ text: "Metodo avalancha → Pagar primero la deuda con mayor interes", isCorrect: true }, { text: "Metodo bola de nieve → Pagar primero la deuda mas pequena", isCorrect: true }, { text: "Consolidacion → Unificar varias deudas en una sola con menor tipo", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena los pasos para salir de deudas:", explanation: "Primero ten un panorama claro, para los intereses mas caros, crea un plan de pago y evita contraer mas deuda mientras pagas.", options: [{ text: "Listar todas tus deudas con saldo, tipo y cuota", isCorrect: true }, { text: "Dejar de usar tarjetas de credito / no contraer mas deuda", isCorrect: true }, { text: "Destinar todo el ahorro extra a la deuda mas cara", isCorrect: true }, { text: "Una vez pagada, pasar al siguiente y asi sucesivamente", isCorrect: true }] },
        ],
      },
    ],
  },
];
