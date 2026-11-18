export const sectors = [
  { id: "industrial", icon: "industrial", href: "/?sector=industrial#properties" },
  { id: "offices", icon: "offices", href: "/?sector=offices#properties" },
  { id: "retail", icon: "retail", href: "/?sector=retail#properties" },
  { id: "land", icon: "land", href: "/?sector=land#properties" },
  { id: "residential", icon: "residential", href: "/?sector=residential#properties" },
  { id: "developments", icon: "developments", href: "/contact?sector=developments" },
] as const;

export const advisoryCopy = {
  es: {
    services: "Servicios", properties: "Propiedades", sectors: "Sectores", about: "Nosotros", contact: "Contacto",
    advisory: "Consultoría e inversión", allProperties: "Explorar todas las propiedades", listProperty: "Vender o rentar mi propiedad",
    language: "Seleccionar idioma", navigation: "Navegación principal", menu: "Abrir o cerrar menú",
    description: "Consultoría inmobiliaria, inversión y expansión corporativa para empresas, inversionistas y desarrolladores.",
    explore: "Explorar propiedades", ourServices: "Nuestros servicios", sectorLabel: "Explora nuestros sectores",
    sectorNames: ["Industrial", "Oficinas", "Retail", "Terrenos", "Residencial", "Desarrollos"],
    sectorDescriptions: ["Naves y parques logísticos", "Espacios corporativos", "Locales y expansión", "Uso comercial, industrial y de desarrollo", "Propiedades premium", "Proyectos en cuenta propia o con socios"],
    all: "Todas las propiedades", noResults: "Por el momento no hay propiedades disponibles en este sector.", clear: "Ver todas las propiedades",
  },
  en: {
    services: "Services", properties: "Properties", sectors: "Sectors", about: "About us", contact: "Contact",
    advisory: "Real estate & investment advisory", allProperties: "Explore all properties", listProperty: "Sell or lease my property",
    language: "Select language", navigation: "Main navigation", menu: "Open or close menu",
    description: "Real estate advisory, investment and corporate expansion for businesses, investors and developers.",
    explore: "Explore properties", ourServices: "Our services", sectorLabel: "Explore our sectors",
    sectorNames: ["Industrial", "Offices", "Retail", "Land", "Residential", "Developments"],
    sectorDescriptions: ["Warehouses & logistics parks", "Corporate spaces", "Retail spaces & expansion", "Commercial, industrial & development land", "Premium properties", "Independent & joint venture projects"],
    all: "All properties", noResults: "There are currently no properties available in this sector.", clear: "View all properties",
  },
  fr: {
    services: "Services", properties: "Propriétés", sectors: "Secteurs", about: "À propos", contact: "Contact",
    advisory: "Conseil immobilier et investissement", allProperties: "Explorer toutes les propriétés", listProperty: "Vendre ou louer mon bien",
    language: "Choisir la langue", navigation: "Navigation principale", menu: "Ouvrir ou fermer le menu",
    description: "Conseil immobilier, investissement et expansion d’entreprise pour les entreprises, investisseurs et promoteurs.",
    explore: "Explorer les propriétés", ourServices: "Nos services", sectorLabel: "Explorer nos secteurs",
    sectorNames: ["Industriel", "Bureaux", "Commerce", "Terrains", "Résidentiel", "Développements"],
    sectorDescriptions: ["Entrepôts et parcs logistiques", "Espaces d’entreprise", "Locaux et expansion", "Usage commercial, industriel et développement", "Propriétés haut de gamme", "Projets propres ou en partenariat"],
    all: "Toutes les propriétés", noResults: "Aucune propriété n’est actuellement disponible dans ce secteur.", clear: "Voir toutes les propriétés",
  },
};
