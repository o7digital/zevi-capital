# Mise à jour ZeVi — novembre 2026

Travail effectué sur `dev`, après intégration de `origin/dev` puis de `origin/main`. Le dossier de travail `demo` et ses changements locaux sont conservés.

## Sources et arbitrages

Les PDF `ZeVi_Brand_Web_SEO_2027-1.pdf` et `ZeVi_Propuestas_Color_Web.pdf` sont des briefs éditoriaux et visuels. Leurs suggestions de phases futures et de capacités ne constituent pas des faits vérifiés ni des instructions de déploiement. Palette retenue : option 01 recommandée (bleu #102333, vert #087F83, champán #B49A70, fond #F3F5F5, texte secondaire #536575).

Les captures Google du Bureau du 15 novembre 2026 à 10:36:16 et 10:36:34 montrent l’accueil sur les recherches « Inversión inmobiliaria Zona Esmeralda » et « Consultoría inmobiliaria Zona Esmeralda ». Ce sont des observations ponctuelles, localisées et potentiellement personnalisées, sans historique Search Console : elles ne prouvent pas une position moyenne ou une évolution de trafic.

## Protection du référencement existant

- Titre, description et URL canonique de l’accueil conservés. Les thèmes locaux restent visibles dans le H2 et son texte ; le nouveau H1 introduit le positionnement corporate du brief.
- `/about_us_01`, `/services` et `/insurance` conservés. La division juridique utilise `/insurance` pour éviter une nouvelle page concurrente.
- Quatre URL dédiées : `/services/industrial-logistics`, `/services/retail-expansion`, `/services/capital-markets`, `/services/research-market-intelligence`. Titres, descriptions, canoniques et données structurées Service/BreadcrumbList propres à chaque division.
- Sitemap et middleware cohérents avec les nouvelles routes. Les fiches de propriétés avec identifiant numérique conservent leur URL et deviennent explorables sans l’ancien en-tête noindex contradictoire. Les templates restent exclus.
- Image de partage de l’accueil remplacée : l’ancien fichier `cdmx.webp` a été supprimé dans main.
- Contenu de l’accueil, de Nous connaître et des services disponible en ES/EN/FR. Les sélecteurs de langue existants restent des préférences client ; aucune architecture multilingue de nouvelles URL ni hreflang artificiel n’est introduit.
- Aucune présence nationale, aucun chiffre de performance, aucun client ni rendement n’est ajouté sans preuve. Les témoignages de démonstration sont retirés des pages refaites. Insights reste masqué en attendant du contenu original vérifié.

## Validation et suivi

Exécuter `npm run build`, démarrer `npm start -- -p 3100`, puis `npm run test:seo` (ou `TEST_BASE_URL=https://... npm run test:seo` pour une URL déployée). Les contrôles portent sur le HTML rendu, l’unicité du H1 et des titres, les canoniques, les images de partage, les données structurées, les en-têtes robots, le sitemap et les erreurs 404.

Après mise en ligne, comparer dans Search Console les clics, impressions, CTR et positions de l’accueil pour les deux requêtes locales et leurs variantes sur des périodes comparables de 28 jours. Suivre séparément les nouvelles pages de services. La conservation des éléments existants limite les changements inutiles, mais ne garantit pas les classements futurs.

Validation locale effectuée : compilation Next.js réussie, 12 tests SEO réussis, Firefox à 1440 px et viewport 390 px (ES/EN/FR), navigation mobile, formulaire avec requête Formspree simulée, attribution du service et réinitialisation après succès. Inventaire Directus : 133 propriétés publiées chargées ; galerie, zoom et fermeture vérifiés sur une fiche. Aucun message commercial réel envoyé lors des tests. La fausse page 404 a été remplacée par une vraie réponse HTTP 404 ; le lanceur Olivia mobile a été réduit pour laisser les CTA accessibles.

Production : version applicative `aaa28da` déployée avec Vercel CLI sur https://www.zevicapital.com (déploiement `dpl_4fQHnmpXHVQp9ixH3ateeV27aq65`). Les 12 tests SEO passent sur le domaine public. Firefox valide également la navigation, les trois langues, le viewport 390 px et le formulaire simulé sur ce domaine. Les 133 liens de fiches sont présents dans le HTML ; une fiche répond en 200 avec sa canonique et sans en-tête noindex. `main` n’a pas été modifiée ; les changements sont poussés sur `dev`.
