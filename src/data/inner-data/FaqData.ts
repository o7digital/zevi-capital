export type FaqLocale = "es" | "en" | "fr";

const inner_faq_data = {
  es: [
    {
      id: 1, id_name: "Estrategia", title: "ESTRATEGIA Y ASESORÍA", md_pt: true,
      faq: [
        { id: 1, question: "¿Qué diferencia a ZeVi Capital de una inmobiliaria tradicional?", answer: "Integramos análisis de mercado, estrategia comercial, evaluación técnica, coordinación jurídica y ejecución. No nos limitamos a publicar un inmueble: construimos una ruta para convertirlo en una operación viable y bien sustentada." },
        { id: 2, question: "¿Con qué tipo de clientes trabajan?", answer: "Acompañamos a propietarios, empresas en expansión e inversionistas que necesitan tomar decisiones inmobiliarias con información clara, visión patrimonial y objetivos medibles." },
        { id: 3, question: "¿La primera conversación tiene algún costo?", answer: "La conversación inicial nos permite conocer el activo o proyecto y definir si podemos aportar valor. Si se requiere un diagnóstico, estudio o mandato especializado, presentamos previamente el alcance y los honorarios." },
      ],
    },
    {
      id: 2, id_name: "Propietarios", title: "PROPIETARIOS Y ACTIVOS",
      faq: [
        { id: 4, question: "¿Cómo determinan el valor comercial de una propiedad?", answer: "Analizamos ubicación, estado físico y documental, comparables reales, demanda, competencia, vocación del activo y condiciones de mercado. El objetivo es definir un posicionamiento defendible, no una cifra basada en expectativas." },
        { id: 5, question: "¿Pueden ayudarme a vender o rentar un activo que lleva tiempo detenido?", answer: "Sí. Primero identificamos por qué el activo no ha avanzado y después replanteamos precio, narrativa, audiencia, canales y condiciones comerciales para volverlo competitivo." },
        { id: 6, question: "¿Trabajan propiedades comerciales, industriales y terrenos?", answer: "Sí. Atendemos activos comerciales, industriales, corporativos, hoteleros, residenciales premium y terrenos con potencial de desarrollo o inversión." },
      ],
    },
    {
      id: 3, id_name: "Expansion", title: "EXPANSIÓN EMPRESARIAL",
      faq: [
        { id: 7, question: "¿Cómo ayudan a una empresa a encontrar nuevas ubicaciones?", answer: "Traducimos el plan de crecimiento en criterios inmobiliarios: mercado objetivo, cobertura, accesibilidad, operación, presupuesto y riesgos. Después filtramos ubicaciones y acompañamos evaluación, negociación y cierre." },
        { id: 8, question: "¿Pueden buscar ubicaciones fuera de Ciudad de México?", answer: "Sí. Desarrollamos búsquedas en los principales mercados de México y estructuramos cada proyecto según la ciudad, el sector y la velocidad de expansión requerida." },
        { id: 9, question: "¿ZeVi Capital también participa en la negociación?", answer: "Sí. Preparamos información comparable, identificamos puntos críticos y coordinamos la negociación comercial para proteger la viabilidad operativa y financiera del proyecto." },
      ],
    },
    {
      id: 4, id_name: "Certeza", title: "INVERSIÓN Y CERTEZA",
      faq: [
        { id: 10, question: "¿Realizan due diligence inmobiliario?", answer: "Apoyamos la revisión comercial y documental del activo y coordinamos especialistas legales, fiscales o técnicos cuando la operación lo requiere. El alcance se define según el tipo de propiedad y transacción." },
        { id: 11, question: "¿Garantizan la rentabilidad de una inversión?", answer: "No. Ninguna inversión seria puede prometer resultados garantizados. Nuestro trabajo es aportar análisis, escenarios, riesgos y criterios objetivos para que la decisión esté mejor fundamentada." },
        { id: 12, question: "¿Cómo inicio un proyecto con ZeVi Capital?", answer: "Compártenos tu objetivo, tipo de activo, ubicación y horizonte. Nuestro equipo revisará la información y propondrá el siguiente paso: diagnóstico, búsqueda, estrategia comercial o evaluación de oportunidad." },
      ],
    },
  ],
  en: [
    {
      id: 1, id_name: "Strategy", title: "STRATEGY & ADVISORY", md_pt: true,
      faq: [
        { id: 1, question: "What makes ZeVi Capital different from a traditional real estate agency?", answer: "We combine market analysis, commercial strategy, technical assessment, legal coordination and execution. We do not simply list a property; we build a route toward a viable, well-supported transaction." },
        { id: 2, question: "Who do you work with?", answer: "We advise property owners, expanding companies and investors who need to make real estate decisions with clear information, a long-term view and measurable goals." },
        { id: 3, question: "Is the initial conversation free?", answer: "The first conversation helps us understand the asset or project and determine how we can add value. If a formal diagnosis, study or specialized mandate is needed, scope and fees are presented in advance." },
      ],
    },
    {
      id: 2, id_name: "Owners", title: "OWNERS & ASSETS",
      faq: [
        { id: 4, question: "How do you determine a property's commercial value?", answer: "We assess location, physical and legal condition, real comparables, demand, competition, best use and market conditions to establish a defensible position rather than an expectation-based figure." },
        { id: 5, question: "Can you help sell or lease an asset that has been inactive?", answer: "Yes. We first identify why it has not moved, then rethink price, narrative, audience, channels and commercial terms to make the asset competitive again." },
        { id: 6, question: "Do you handle commercial, industrial properties and land?", answer: "Yes. We work with commercial, industrial, corporate, hospitality, premium residential assets and land with development or investment potential." },
      ],
    },
    {
      id: 3, id_name: "Expansion", title: "BUSINESS EXPANSION",
      faq: [
        { id: 7, question: "How do you help companies find new locations?", answer: "We translate the growth plan into real estate criteria: target market, coverage, access, operations, budget and risk. We then shortlist locations and support assessment, negotiation and closing." },
        { id: 8, question: "Can you search beyond Mexico City?", answer: "Yes. We conduct searches across Mexico's main markets and structure each assignment around the city, sector and required expansion pace." },
        { id: 9, question: "Does ZeVi Capital participate in negotiations?", answer: "Yes. We prepare comparable information, identify critical points and coordinate commercial negotiations to protect the project's operational and financial viability." },
      ],
    },
    {
      id: 4, id_name: "Certainty", title: "INVESTMENT & CERTAINTY",
      faq: [
        { id: 10, question: "Do you conduct real estate due diligence?", answer: "We support the commercial and documentary review of assets and coordinate legal, tax or technical specialists when required. The scope is defined according to the property and transaction." },
        { id: 11, question: "Do you guarantee investment returns?", answer: "No. No serious investment can promise guaranteed results. We provide analysis, scenarios, risks and objective criteria so the decision is better informed." },
        { id: 12, question: "How do I start a project with ZeVi Capital?", answer: "Tell us your objective, asset type, location and time horizon. Our team will review the information and recommend the next step: diagnosis, search, commercial strategy or opportunity assessment." },
      ],
    },
  ],
  fr: [
    {
      id: 1, id_name: "Strategie", title: "STRATÉGIE ET CONSEIL", md_pt: true,
      faq: [
        { id: 1, question: "Qu'est-ce qui différencie ZeVi Capital d'une agence immobilière traditionnelle ?", answer: "Nous réunissons analyse de marché, stratégie commerciale, évaluation technique, coordination juridique et exécution. Nous ne nous contentons pas de publier un bien : nous construisons une trajectoire vers une opération viable et maîtrisée." },
        { id: 2, question: "Avec quels types de clients travaillez-vous ?", answer: "Nous accompagnons les propriétaires, les entreprises en expansion et les investisseurs qui souhaitent décider avec des informations claires, une vision patrimoniale et des objectifs mesurables." },
        { id: 3, question: "Le premier échange est-il payant ?", answer: "Le premier échange sert à comprendre l'actif ou le projet et à déterminer notre valeur ajoutée. Si un diagnostic, une étude ou un mandat spécialisé est nécessaire, le périmètre et les honoraires sont présentés au préalable." },
      ],
    },
    {
      id: 2, id_name: "Proprietaires", title: "PROPRIÉTAIRES ET ACTIFS",
      faq: [
        { id: 4, question: "Comment déterminez-vous la valeur commerciale d'un bien ?", answer: "Nous analysons l'emplacement, l'état physique et documentaire, les comparables réels, la demande, la concurrence, la vocation du bien et le marché afin de définir un positionnement défendable." },
        { id: 5, question: "Pouvez-vous relancer la vente ou la location d'un actif immobilisé ?", answer: "Oui. Nous identifions d'abord les causes du blocage, puis retravaillons le prix, le récit, la cible, les canaux et les conditions commerciales pour rendre l'actif à nouveau compétitif." },
        { id: 6, question: "Traitez-vous les biens commerciaux, industriels et les terrains ?", answer: "Oui. Nous intervenons sur les actifs commerciaux, industriels, tertiaires, hôteliers, résidentiels premium et les terrains à potentiel de développement ou d'investissement." },
      ],
    },
    {
      id: 3, id_name: "Expansion", title: "EXPANSION D'ENTREPRISE",
      faq: [
        { id: 7, question: "Comment aidez-vous une entreprise à trouver de nouveaux emplacements ?", answer: "Nous traduisons son plan de croissance en critères immobiliers : marché cible, couverture, accès, exploitation, budget et risques. Nous sélectionnons ensuite les sites et accompagnons l'évaluation, la négociation et la conclusion." },
        { id: 8, question: "Pouvez-vous chercher en dehors de Mexico ?", answer: "Oui. Nous menons des recherches sur les principaux marchés mexicains et adaptons chaque mission à la ville, au secteur et au rythme d'expansion recherché." },
        { id: 9, question: "ZeVi Capital intervient-il dans la négociation ?", answer: "Oui. Nous préparons les comparables, identifions les points critiques et coordonnons la négociation commerciale afin de préserver la viabilité opérationnelle et financière du projet." },
      ],
    },
    {
      id: 4, id_name: "Certitude", title: "INVESTISSEMENT ET SÉCURITÉ",
      faq: [
        { id: 10, question: "Réalisez-vous une due diligence immobilière ?", answer: "Nous accompagnons la revue commerciale et documentaire de l'actif et coordonnons les spécialistes juridiques, fiscaux ou techniques nécessaires. Le périmètre dépend du bien et de l'opération." },
        { id: 11, question: "Garantissez-vous la rentabilité d'un investissement ?", answer: "Non. Aucun investissement sérieux ne peut garantir un résultat. Nous apportons analyses, scénarios, risques et critères objectifs afin de mieux éclairer la décision." },
        { id: 12, question: "Comment démarrer un projet avec ZeVi Capital ?", answer: "Présentez-nous votre objectif, le type d'actif, l'emplacement et l'horizon. Notre équipe examinera les informations et proposera l'étape suivante : diagnostic, recherche, stratégie commerciale ou évaluation." },
      ],
    },
  ],
};

export default inner_faq_data;
