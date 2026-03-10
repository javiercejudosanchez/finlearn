// Nivel 1 — Dinero y economia basica
export const world1Config = {
  title: "Dinero y economia basica",
  description: "Los pilares del dinero, la inflacion, oferta/demanda y tipos de interes",
  icon: "coins",
  color: "#10B981",
  order: 0,
};

export const world1Units = [
  // ── Unidad 1: Que es el dinero ──
  {
    title: "Que es el dinero",
    lessons: [
      {
        title: "Historia del dinero",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Cual fue una de las primeras formas de dinero en la historia?", explanation: "Antes de las monedas, las civilizaciones usaban bienes como sal, conchas o ganado como medio de intercambio. La palabra 'salario' viene de 'sal'.", options: [{ text: "Tarjetas de credito", isCorrect: false }, { text: "Billetes de papel", isCorrect: false }, { text: "Bienes como sal, conchas o ganado", isCorrect: true }, { text: "Criptomonedas", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Las primeras monedas metalicas se acunaron en Lidia (actual Turquia) alrededor del siglo VII a.C.", explanation: "Correcto. El rey Creso de Lidia creo las primeras monedas estandarizadas de oro y plata, facilitando el comercio al tener un valor reconocido.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "La palabra 'salario' proviene de la palabra latina ___, porque los soldados romanos recibian parte de su paga en este bien.", explanation: "Los soldados romanos recibian 'salarium', una racion de sal que era un bien muy valioso para conservar alimentos.", options: [{ text: "sal", isCorrect: true }, { text: "oro", isCorrect: false }, { text: "trigo", isCorrect: false }, { text: "plata", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada etapa del dinero con su descripcion:", explanation: "El dinero ha evolucionado desde el trueque directo hasta formas digitales, pasando por monedas metalicas y billetes.", options: [{ text: "Trueque → Intercambio directo de bienes sin moneda", isCorrect: true }, { text: "Dinero mercancia → Bienes con valor intrinseco (oro, sal)", isCorrect: true }, { text: "Dinero fiduciario → Billetes y monedas respaldados por confianza", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena cronologicamente la evolucion del dinero:", explanation: "El dinero evoluciono del trueque al uso de mercancias valiosas, luego monedas metalicas, despues billetes de papel y finalmente dinero digital.", options: [{ text: "Trueque (intercambio directo de bienes)", isCorrect: true }, { text: "Dinero mercancia (sal, conchas, ganado)", isCorrect: true }, { text: "Monedas metalicas (oro y plata acunados)", isCorrect: true }, { text: "Billetes de papel y dinero digital", isCorrect: true }] },
        ],
      },
      {
        title: "Funciones del dinero",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Que funcion del dinero permite comparar el precio de una manzana con el de un coche?", explanation: "La funcion de unidad de cuenta permite expresar el valor de bienes y servicios en una medida comun, facilitando las comparaciones.", options: [{ text: "Medio de cambio", isCorrect: false }, { text: "Unidad de cuenta", isCorrect: true }, { text: "Reserva de valor", isCorrect: false }, { text: "Medio de pago", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "El dinero siempre ha sido papel moneda emitido por gobiernos.", explanation: "Falso. Durante milenios se usaron bienes como oro, sal o conchas. El papel moneda es relativamente reciente (China, siglo VII).", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "Cuando guardas dinero para comprar algo en el futuro, estas usando su funcion de ___.", explanation: "La reserva de valor permite trasladar poder adquisitivo al futuro. La inflacion es su mayor enemigo.", options: [{ text: "reserva de valor", isCorrect: true }, { text: "medio de cambio", isCorrect: false }, { text: "unidad de cuenta", isCorrect: false }, { text: "medio legal", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada funcion del dinero con su ejemplo:", explanation: "El dinero cumple tres funciones fundamentales: medio de cambio (comprar cosas), unidad de cuenta (comparar precios) y reserva de valor (ahorrar).", options: [{ text: "Medio de cambio → Pagas 3 EUR por un cafe", isCorrect: true }, { text: "Unidad de cuenta → Comparas que un movil cuesta 800 EUR y otro 400 EUR", isCorrect: true }, { text: "Reserva de valor → Ahorras 200 EUR al mes para vacaciones", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estas propiedades del dinero de mas basica a mas avanzada:", explanation: "El dinero primero debe ser aceptado por todos (aceptabilidad), luego divisible para facilitar transacciones, duradero para conservar valor, y portable para transportarlo.", options: [{ text: "Aceptabilidad (todos lo reconocen como pago)", isCorrect: true }, { text: "Divisibilidad (se puede fraccionar en unidades menores)", isCorrect: true }, { text: "Durabilidad (no se deteriora facilmente)", isCorrect: true }, { text: "Portabilidad (facil de transportar)", isCorrect: true }] },
        ],
      },
      {
        title: "Tipos de dinero hoy",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Que porcentaje aproximado del dinero en circulacion en la eurozona es dinero fisico (billetes y monedas)?", explanation: "Solo alrededor del 10-15% del dinero en la eurozona es fisico. El resto es dinero bancario (depositos electronicos).", options: [{ text: "Mas del 80%", isCorrect: false }, { text: "Aproximadamente 50%", isCorrect: false }, { text: "Menos del 20%", isCorrect: true }, { text: "Exactamente 0%", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "El Bitcoin es considerado dinero de curso legal en Espana.", explanation: "Falso. En Espana solo el euro es moneda de curso legal. El Bitcoin es un activo digital pero no tiene estatus de moneda oficial.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "El dinero que existe como apuntes en cuentas bancarias, no como billetes fisicos, se llama dinero ___.", explanation: "El dinero bancario o escritural es la mayor parte del dinero en circulacion. Se crea cuando los bancos conceden prestamos.", options: [{ text: "bancario", isCorrect: true }, { text: "virtual", isCorrect: false }, { text: "cripto", isCorrect: false }, { text: "publico", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada tipo de dinero con su ejemplo:", explanation: "El dinero fisico son billetes y monedas. El dinero bancario son depositos. El dinero electronico incluye tarjetas prepago y monederos digitales.", options: [{ text: "Dinero fisico → Billete de 50 EUR en tu cartera", isCorrect: true }, { text: "Dinero bancario → Saldo de 1.500 EUR en tu cuenta corriente", isCorrect: true }, { text: "Dinero electronico → Saldo en tu tarjeta Bizum o PayPal", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estos medios de pago del mas antiguo al mas reciente:", explanation: "El efectivo lleva siglos; las tarjetas surgieron en los 50; la banca online en los 90; los pagos moviles y contactless en la decada de 2010.", options: [{ text: "Efectivo (monedas y billetes)", isCorrect: true }, { text: "Tarjetas de credito/debito", isCorrect: true }, { text: "Banca online y transferencias", isCorrect: true }, { text: "Pagos moviles (Bizum, Apple Pay)", isCorrect: true }] },
        ],
      },
    ],
  },
  // ── Unidad 2: Inflacion ──
  {
    title: "Inflacion",
    lessons: [
      {
        title: "Que es la inflacion",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Que es la inflacion?", explanation: "La inflacion es la subida generalizada y sostenida de precios en una economia. No es que un producto suba, sino que sube el nivel general.", options: [{ text: "La subida generalizada de precios en una economia", isCorrect: true }, { text: "La bajada del tipo de interes", isCorrect: false }, { text: "El aumento del PIB", isCorrect: false }, { text: "La depreciacion de una moneda frente a otra", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Una inflacion del 2% anual es generalmente considerada saludable por los bancos centrales.", explanation: "Correcto. El BCE tiene como objetivo una inflacion cercana al 2%. Demasiado baja (deflacion) o demasiado alta son problematicas.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Cuando la inflacion sube, el poder ___ del dinero disminuye.", explanation: "El poder adquisitivo es la cantidad de bienes que puedes comprar con tu dinero. Si los precios suben un 10%, tu dinero compra un 10% menos.", options: [{ text: "adquisitivo", isCorrect: true }, { text: "nominal", isCorrect: false }, { text: "fiscal", isCorrect: false }, { text: "monetario", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada concepto con su definicion:", explanation: "Inflacion es subida de precios; deflacion es bajada; estanflacion combina estancamiento con inflacion alta.", options: [{ text: "Inflacion → Subida generalizada y sostenida de precios", isCorrect: true }, { text: "Deflacion → Bajada generalizada y sostenida de precios", isCorrect: true }, { text: "Estanflacion → Inflacion alta + estancamiento economico", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estos niveles de inflacion de menor a mayor gravedad:", explanation: "La inflacion moderada (1-3%) es saludable. La alta (5-10%) genera problemas. La muy alta (20-50%) es danina. La hiperinflacion (>50% mensual) destruye economias.", options: [{ text: "Inflacion moderada (1-3% anual)", isCorrect: true }, { text: "Inflacion alta (5-10% anual)", isCorrect: true }, { text: "Inflacion muy alta (20-50% anual)", isCorrect: true }, { text: "Hiperinflacion (>50% mensual)", isCorrect: true }] },
        ],
      },
      {
        title: "Como se mide: el IPC",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Que mide el IPC (Indice de Precios al Consumo)?", explanation: "El IPC mide la variacion de precios de una cesta de bienes y servicios que representa el consumo tipico de los hogares.", options: [{ text: "El precio del petroleo", isCorrect: false }, { text: "La variacion de precios de una cesta representativa de consumo", isCorrect: true }, { text: "El coste de produccion de las empresas", isCorrect: false }, { text: "Los salarios medios del pais", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Si el IPC sube un 5% en un ano, significa que TODOS los productos han subido exactamente un 5%.", explanation: "Falso. El IPC es una media ponderada. Algunos productos pueden subir un 20% y otros bajar. El 5% es la media del conjunto.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "En Espana, el organismo encargado de calcular el IPC es el ___ (Instituto Nacional de Estadistica).", explanation: "El INE publica el IPC mensualmente. Es el dato mas seguido para medir la inflacion en Espana.", options: [{ text: "INE", isCorrect: true }, { text: "BCE", isCorrect: false }, { text: "CNMV", isCorrect: false }, { text: "BdE", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada tipo de inflacion con su causa:", explanation: "La inflacion de demanda ocurre cuando hay mas demanda que oferta. La de costes cuando suben los costes de produccion. La monetaria cuando hay exceso de dinero.", options: [{ text: "Inflacion de demanda → La gente quiere comprar mas de lo que se produce", isCorrect: true }, { text: "Inflacion de costes → Sube el petroleo o las materias primas", isCorrect: true }, { text: "Inflacion monetaria → Se imprime demasiado dinero", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estos componentes del IPC de mayor a menor peso tipico en Espana:", explanation: "Vivienda y alimentos suelen ser los grupos con mas peso en el IPC espanol, seguidos de transporte. Ocio tiene menor ponderacion.", options: [{ text: "Vivienda (alquiler, electricidad, gas)", isCorrect: true }, { text: "Alimentos y bebidas no alcoholicas", isCorrect: true }, { text: "Transporte (gasolina, vehiculos)", isCorrect: true }, { text: "Ocio y cultura", isCorrect: true }] },
        ],
      },
      {
        title: "Como te afecta la inflacion",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Si la inflacion es del 4% y tu salario sube un 2%, que ocurre con tu poder adquisitivo?", explanation: "Poder adquisitivo real = subida salarial - inflacion = 2% - 4% = -2%. Aunque ganas mas en euros, puedes comprar menos.", options: [{ text: "Sube un 2%", isCorrect: false }, { text: "Se mantiene igual", isCorrect: false }, { text: "Baja un 2%", isCorrect: true }, { text: "Sube un 6%", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "La inflacion perjudica a los ahorradores y beneficia a los deudores.", explanation: "Correcto. Si tienes una deuda fija de 100.000 EUR y la inflacion sube, esos 100.000 EUR valen menos en terminos reales. Pero si ahorras, tu dinero pierde valor.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Si un cafe costaba 1,20 EUR hace 5 anos y ahora cuesta 1,80 EUR, el precio ha subido un ___% en total.", explanation: "Variacion = (1,80 - 1,20) / 1,20 x 100 = 50%. El precio del cafe ha subido un 50% en 5 anos.", options: [{ text: "50", isCorrect: true }, { text: "60", isCorrect: false }, { text: "33", isCorrect: false }, { text: "80", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada grupo con como le afecta la inflacion alta:", explanation: "La inflacion redistribuye riqueza: beneficia a deudores y perjudica a ahorradores y pensionistas con rentas fijas.", options: [{ text: "Ahorradores → Pierden poder adquisitivo si el interes < inflacion", isCorrect: true }, { text: "Deudores a tipo fijo → Se benefician porque su deuda vale menos en terminos reales", isCorrect: true }, { text: "Pensionistas → Pierden si las pensiones no se revalorizan con el IPC", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estas estrategias para protegerte de la inflacion de mas conservadora a mas arriesgada:", explanation: "Los depositos ofrecen seguridad pero baja rentabilidad. Los bonos indexados protegen directamente contra inflacion. Los inmuebles y acciones ofrecen mas rentabilidad pero con mas riesgo.", options: [{ text: "Depositos a plazo con tipo competitivo", isCorrect: true }, { text: "Bonos indexados a la inflacion", isCorrect: true }, { text: "Inversion en inmuebles (alquiler sube con IPC)", isCorrect: true }, { text: "Renta variable (acciones de empresas con pricing power)", isCorrect: true }] },
        ],
      },
    ],
  },
  // ── Unidad 3: Oferta y demanda ──
  {
    title: "Oferta y demanda",
    lessons: [
      {
        title: "Conceptos basicos",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Si la demanda de un producto sube y la oferta se mantiene, que ocurre con el precio?", explanation: "Cuando hay mas compradores que producto disponible, los vendedores pueden subir el precio. Es la ley basica de oferta y demanda.", options: [{ text: "Baja", isCorrect: false }, { text: "Se mantiene", isCorrect: false }, { text: "Sube", isCorrect: true }, { text: "Depende del gobierno", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "En un mercado perfectamente competitivo, una sola empresa puede fijar el precio.", explanation: "Falso. En competencia perfecta hay muchos compradores y vendedores, y ninguno tiene poder para influir en el precio individualmente.", options: [{ text: "Verdadero", isCorrect: false }, { text: "Falso", isCorrect: true }] },
          { type: "FILL_BLANK" as const, question: "El punto donde la curva de oferta y la de demanda se cruzan se llama punto de ___.", explanation: "El equilibrio es el precio y cantidad donde la oferta iguala a la demanda. No hay exceso ni escasez.", options: [{ text: "equilibrio", isCorrect: true }, { text: "maximo", isCorrect: false }, { text: "inflexion", isCorrect: false }, { text: "saturacion", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada situacion con su efecto en el precio:", explanation: "Mas demanda o menos oferta suben precios. Menos demanda o mas oferta los bajan.", options: [{ text: "Ola de calor y helados → Sube la demanda, sube el precio", isCorrect: true }, { text: "Cosecha record de naranjas → Sube la oferta, baja el precio", isCorrect: true }, { text: "Crisis economica y coches de lujo → Baja la demanda, baja el precio", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena lo que ocurre cuando se anuncia un nuevo iPhone:", explanation: "El lanzamiento crea alta demanda con oferta limitada, subiendo precios. Con el tiempo la produccion aumenta y la demanda se estabiliza.", options: [{ text: "Apple anuncia el nuevo modelo", isCorrect: true }, { text: "La demanda se dispara con oferta limitada", isCorrect: true }, { text: "Precios altos y colas en tiendas (o reventa)", isCorrect: true }, { text: "La produccion aumenta, el precio se estabiliza", isCorrect: true }] },
        ],
      },
      {
        title: "Elasticidad del precio",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Si el precio de la gasolina sube un 20% y la demanda solo baja un 5%, la demanda es:", explanation: "Cuando la variacion de cantidad es menor que la de precio, la demanda es inelastica. La gasolina es un bien necesario sin sustitutos faciles.", options: [{ text: "Muy elastica", isCorrect: false }, { text: "Inelastica", isCorrect: true }, { text: "Perfectamente elastica", isCorrect: false }, { text: "Unitaria", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Los bienes de primera necesidad (pan, leche) suelen tener demanda mas inelastica que los bienes de lujo.", explanation: "Correcto. Los bienes basicos se siguen comprando aunque suba el precio porque son necesarios. Los de lujo se pueden dejar de comprar.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Un bien cuya demanda cambia mucho ante cambios de precio se dice que tiene demanda ___.", explanation: "La demanda elastica significa que los consumidores son sensibles al precio. Si sube, dejan de comprar. Ejemplo: viajes de vacaciones.", options: [{ text: "elastica", isCorrect: true }, { text: "rigida", isCorrect: false }, { text: "fija", isCorrect: false }, { text: "constante", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada bien con su tipo de demanda:", explanation: "Los bienes necesarios sin sustitutos tienen demanda inelastica. Los bienes con alternativas o de lujo tienen demanda elastica.", options: [{ text: "Medicamentos esenciales → Demanda muy inelastica", isCorrect: true }, { text: "Viajes de vacaciones → Demanda elastica", isCorrect: true }, { text: "Agua potable → Demanda perfectamente inelastica", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estos bienes de demanda MAS inelastica a MAS elastica:", explanation: "Cuanto mas necesario y sin sustitutos, mas inelastica la demanda. Cuanto mas prescindible, mas elastica.", options: [{ text: "Insulina para diabeticos", isCorrect: true }, { text: "Gasolina", isCorrect: true }, { text: "Restaurantes", isCorrect: true }, { text: "Cruceros de lujo", isCorrect: true }] },
        ],
      },
      {
        title: "Mercados reales",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "En 2022, los precios de la energia en Europa se dispararon. Cual fue la causa principal?", explanation: "La invasion de Ucrania redujo drasticamente la oferta de gas ruso a Europa, disparando los precios energeticos por un shock de oferta.", options: [{ text: "Un aumento subito de la demanda por el calor", isCorrect: false }, { text: "Una reduccion de la oferta de gas por la guerra en Ucrania", isCorrect: true }, { text: "Una decision del BCE de subir tipos", isCorrect: false }, { text: "Una huelga de trabajadores del sector energetico", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Un monopolio puede fijar precios mas altos que en un mercado competitivo porque no tiene competencia.", explanation: "Correcto. Sin competencia, el monopolista tiene poder de mercado para fijar precios por encima del equilibrio competitivo.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Cuando el gobierno fija un precio maximo por debajo del equilibrio, se genera ___ del producto.", explanation: "Un precio maximo por debajo del equilibrio hace que la demanda supere a la oferta, creando escasez. Ejemplo: control de alquileres.", options: [{ text: "escasez", isCorrect: true }, { text: "excedente", isCorrect: false }, { text: "inflacion", isCorrect: false }, { text: "equilibrio", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada estructura de mercado con su ejemplo:", explanation: "Cada estructura de mercado tiene diferentes niveles de competencia y poder sobre los precios.", options: [{ text: "Monopolio → Red electrica de transporte (REE)", isCorrect: true }, { text: "Oligopolio → Telefonia movil (Movistar, Vodafone, Orange)", isCorrect: true }, { text: "Competencia perfecta → Mercado de frutas y verduras local", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estas estructuras de mercado de mayor a menor competencia:", explanation: "En competencia perfecta hay muchos vendedores. En monopolistica hay diferenciacion. En oligopolio, pocos dominan. En monopolio, solo hay uno.", options: [{ text: "Competencia perfecta (muchos vendedores, producto identico)", isCorrect: true }, { text: "Competencia monopolistica (muchos vendedores, productos diferenciados)", isCorrect: true }, { text: "Oligopolio (pocos vendedores dominantes)", isCorrect: true }, { text: "Monopolio (un solo vendedor)", isCorrect: true }] },
        ],
      },
    ],
  },
  // ── Unidad 4: Tipos de interes ──
  {
    title: "Tipos de interes",
    lessons: [
      {
        title: "Que son los tipos de interes",
        xpReward: 10,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Quien fija el tipo de interes de referencia en la Eurozona?", explanation: "El BCE (Banco Central Europeo) fija los tipos de interes oficiales que sirven de referencia para toda la economia de la eurozona.", options: [{ text: "La Comision Europea", isCorrect: false }, { text: "El Banco Central Europeo (BCE)", isCorrect: true }, { text: "El FMI", isCorrect: false }, { text: "Cada banco comercial", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "Cuando el BCE sube los tipos, las hipotecas a tipo variable se encarecen.", explanation: "Correcto. Las hipotecas variables estan referenciadas al Euribor, que sube cuando el BCE sube tipos. Ejemplo: con Euribor al 4% vs 0%, una hipoteca de 200.000 EUR puede costar 400 EUR mas al mes.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "El tipo de interes al que los bancos europeos se prestan dinero entre si a un ano se llama ___.", explanation: "El Euribor a 12 meses es la referencia mas usada en Espana para hipotecas a tipo variable.", options: [{ text: "Euribor", isCorrect: true }, { text: "Libor", isCorrect: false }, { text: "TAE", isCorrect: false }, { text: "TIN", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada accion del BCE con su efecto:", explanation: "Subir tipos frena la economia (politica restrictiva). Bajar tipos la estimula (politica expansiva).", options: [{ text: "Subir tipos → Encarece el credito, frena la inflacion", isCorrect: true }, { text: "Bajar tipos → Abarata el credito, estimula la economia", isCorrect: true }, { text: "Compra de bonos (QE) → Inyecta liquidez al sistema", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena el mecanismo de transmision de una subida de tipos:", explanation: "El BCE sube tipos, los bancos encarecen los prestamos, familias y empresas piden menos credito, se reduce el gasto y la inflacion baja.", options: [{ text: "El BCE sube el tipo de interes oficial", isCorrect: true }, { text: "Los bancos encarecen hipotecas y prestamos", isCorrect: true }, { text: "Familias y empresas reducen gasto e inversion", isCorrect: true }, { text: "La demanda baja y la inflacion se modera", isCorrect: true }] },
        ],
      },
      {
        title: "Tipos de interes en tu vida",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Si tienes una hipoteca de 150.000 EUR a tipo variable (Euribor + 1%) y el Euribor pasa del 0% al 4%, cuanto sube tu tipo de interes?", explanation: "Tu tipo pasa de 0% + 1% = 1% a 4% + 1% = 5%. Sube 4 puntos porcentuales, lo que en una hipoteca a 25 anos supone unos 350 EUR mas al mes.", options: [{ text: "1 punto porcentual", isCorrect: false }, { text: "4 puntos porcentuales", isCorrect: true }, { text: "5 puntos porcentuales", isCorrect: false }, { text: "150 puntos porcentuales", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "La TAE siempre es mayor o igual que el TIN porque incluye comisiones y gastos.", explanation: "Correcto. El TIN (Tipo de Interes Nominal) es solo el interes puro. La TAE (Tasa Anual Equivalente) anade comisiones y frecuencia de pago, reflejando el coste real.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Si depositas 10.000 EUR al 3% TIN anual, en un ano ganaras ___ EUR de intereses.", explanation: "Interes = Capital x Tipo = 10.000 x 0,03 = 300 EUR. Este es un calculo de interes simple a un ano.", options: [{ text: "300", isCorrect: true }, { text: "3.000", isCorrect: false }, { text: "30", isCorrect: false }, { text: "100", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada producto con su tipo de interes tipico en 2024:", explanation: "Los tipos varian segun el riesgo y plazo. Las hipotecas son mas baratas (tienen garantia), las tarjetas son carisimas (sin garantia).", options: [{ text: "Hipoteca fija → 2-4% TAE", isCorrect: true }, { text: "Prestamo personal → 6-10% TAE", isCorrect: true }, { text: "Tarjeta de credito (revolving) → 18-25% TAE", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena estos tipos de interes de menor a mayor tipicamente:", explanation: "El BCE fija el tipo mas bajo (referencia). El Euribor anade un pequeno margen. Los prestamos personales son mas caros que las hipotecas. Las tarjetas revolving son las mas caras.", options: [{ text: "Tipo oficial del BCE", isCorrect: true }, { text: "Euribor a 12 meses", isCorrect: true }, { text: "Hipoteca a tipo fijo", isCorrect: true }, { text: "Tarjeta revolving", isCorrect: true }] },
        ],
      },
      {
        title: "Tipos de interes negativos y la historia reciente",
        xpReward: 15,
        exercises: [
          { type: "MULTIPLE_CHOICE" as const, question: "Entre 2016 y 2022, el tipo de interes del BCE fue del 0%. Por que?", explanation: "Tras la crisis de 2008 y la pandemia, el BCE bajo tipos a 0% para estimular la economia, abaratando el credito y fomentando el gasto y la inversion.", options: [{ text: "Por un error tecnico", isCorrect: false }, { text: "Para estimular una economia debil tras las crisis", isCorrect: true }, { text: "Porque no habia inflacion y querian crearla", isCorrect: false }, { text: "Por presion de los gobiernos", isCorrect: false }] },
          { type: "TRUE_FALSE" as const, question: "En 2022-2023, el BCE subio tipos de interes del 0% al 4,5% en poco mas de un ano.", explanation: "Correcto. Fue la subida mas rapida de la historia del BCE, motivada por una inflacion que supero el 10% en la eurozona.", options: [{ text: "Verdadero", isCorrect: true }, { text: "Falso", isCorrect: false }] },
          { type: "FILL_BLANK" as const, question: "Un tipo de interes ___ significa que el prestamista paga al prestatario por prestarle dinero.", explanation: "Los tipos negativos se vieron en Europa y Japon. Los bancos pagaban al BCE por depositar dinero alli, incentivando que prestasen a la economia real.", options: [{ text: "negativo", isCorrect: true }, { text: "cero", isCorrect: false }, { text: "variable", isCorrect: false }, { text: "compuesto", isCorrect: false }] },
          { type: "MATCH_PAIRS" as const, question: "Relaciona cada periodo con la politica del BCE:", explanation: "El BCE adapta su politica monetaria al ciclo economico: baja tipos en crisis y los sube cuando hay inflacion alta.", options: [{ text: "2008-2016 → Bajada progresiva de tipos hasta 0%", isCorrect: true }, { text: "2016-2022 → Tipos al 0% para estimular la economia", isCorrect: true }, { text: "2022-2023 → Subida agresiva al 4,5% para frenar inflacion", isCorrect: true }] },
          { type: "ORDER" as const, question: "Ordena cronologicamente estas fases de los tipos de interes en Europa:", explanation: "Los tipos siguieron un ciclo: altos antes de 2008, bajadas progresivas, periodo ultrabajos, y finalmente subida brusca en 2022.", options: [{ text: "Tipos altos pre-crisis (4-5%)", isCorrect: true }, { text: "Bajadas tras la crisis de 2008", isCorrect: true }, { text: "Tipos al 0% (2016-2022)", isCorrect: true }, { text: "Subida rapida al 4,5% por inflacion (2022-2023)", isCorrect: true }] },
        ],
      },
    ],
  },
];
