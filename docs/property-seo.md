# Publication et référencement des propriétés

Les URL de fiches existantes sont conservées : `/listing_details_01?id=163`.
Une nouvelle propriété utilise le même schéma avec son identifiant Directus. Modifier son titre ou sa localisation ne change pas l’URL de sa fiche.

Le catalogue compte les annonces publiées, pas les unités disponibles dans chaque développement. La disponibilité commerciale reste à confirmer avec l’agence et doit être tenue à jour dans les annonces.

## Pour ajouter un bien

Dans Directus, renseigner le titre, la description réelle, le type de bien, l’opération, la localisation et une photo de couverture. Passer le statut à `published` lorsque la fiche est prête.

- Localisation recommandée : `quartier, ville ou municipalité, État`, par exemple `Centro, Mérida, Yucatán` ou `La Paz, Baja California Sur, México`.
- Les États sont reconnus sans dépendre des accents ; `CDMX` est reconnu comme `Ciudad de México`.
- Opérations reconnues : `Venta`, `Renta`, `Venta y renta`, `sale`, `rental`. `Por confirmar` ne génère pas de promesse de vente ou location.
- Les localisations absentes ou ambiguës ne sont pas remplacées par Estado de México. Compléter les données dans Directus pour bénéficier du classement géographique.
- Ne pas inventer de coordonnées, de surface, de prix ni de modalités. Les prix au m² ne sont pas déclarés comme des prix totaux dans les données structurées.

Le site génère le titre SEO, la description, la canonique, les données structurées et les liens géographiques. Les mots-clés sont exprimés dans ce contenu et dans les étiquettes cliquables ; aucune liste de hashtags ou balise `meta keywords` n’est nécessaire.

## URL géographiques générées

| Vue | Exemple |
| --- | --- |
| Catalogue national | `/propiedades` |
| Type de bien au Mexique | `/propiedades/tipo/terrenos` |
| État | `/propiedades/yucatan` |
| Ville ou municipalité | `/propiedades/yucatan/merida` |
| Type dans un État | `/propiedades/yucatan/tipo/terrenos` |
| Type dans une ville | `/propiedades/yucatan/merida/tipo/terrenos` |

Les groupes correspondent aux biens publiés et aux localisations réellement renseignées. Aucun code supplémentaire n’est nécessaire pour une nouvelle ville dans un État reconnu. Les combinaisons sans biens répondent 404.

Les collections comptant moins de trois annonces restent consultables avec `noindex, follow` et sont exclues du sitemap. Ce seuil est une précaution éditoriale configurable dans `MIN_INDEXABLE_COLLECTION_SIZE`, pas une règle Google. Une collection rejoint automatiquement le sitemap lorsqu’elle atteint ce seuil.

Le sitemap et les collections utilisent une revalidation de cinq minutes. Une annonce publiée avec photo de couverture rejoint automatiquement le sitemap au prochain rafraîchissement. La revalidation peut servir une version précédente pendant le renouvellement ; la découverte et l’indexation par Google prennent ensuite leur propre délai.

Une fiche absente ou non publiée répond 404. Une panne du backend produit une erreur serveur plutôt qu’une fausse suppression ou un sitemap vide.

## Préserver le référencement existant

L’accueil et les pages institutionnelles conservent leurs titres, descriptions, H1 et canoniques. Le catalogue national vise les recherches d’inventaire ; l’accueil conserve son positionnement de conseil local. Les modèles de démonstration et pages internes restent exclus de l’indexation.

Avant de réécrire une page déjà performante, examiner ses requêtes, clics et positions dans Search Console. Le classement des pages géographiques et le trafic doivent être suivis après publication ; le nombre de biens disponibles ne mesure pas le volume de recherche.

Vérifications : `node --test tests/property-*.test.cjs`, `npm run build`, puis contrôle HTTP sans JavaScript des métadonnées, fiches, collections, sitemap et robots.txt, et vérification Firefox sur mobile et ordinateur.
