# Portfolio Mehdi Hmaiss — Brand Edition V4

Version complète du portfolio (site HTML/CSS/JavaScript, statique, compatible GitHub Pages).

## Démarrer
1. Décompressez l’archive.
2. Ouvrez `index.html` dans un navigateur ou utilisez un petit serveur local (`python -m http.server 8000`).
3. Pour publier sur GitHub Pages, placez **le contenu** de ce dossier à la racine du dépôt, puis activez Pages (branche main, dossier root).

## Identité visuelle unifiée
- `assets/branding/mh-logo.svg` : **logo MH principal**, réutilisé dans l’intro, le header, les sections, les cartes, les projets, la zone contact et le footer.
- `assets/branding/favicon.svg` : même logo pour l’onglet du navigateur.
- `assets/branding/mh-logo-64.png`, `mh-logo-180.png`, `mh-logo-512.png` : versions PNG pour usage web.
- `assets/branding/social-card.png` : aperçu de partage social (Open Graph).
- `assets/illustrations/` : visuels de remplacement locaux pour les sections et projets.

## Contenu
- Bac Pro CIEL — lycée de l’Hyrôme à Chemillé-en-Anjou.
- PFMP recherchée : 22 mars au 20 avril 2027.
- Stage 2025 : École Polytechnique des Génies (site vitrine).
- Compétences actuelles : HTML, CSS, JavaScript et Python.
- Projets GitHub : TOV4R, AIMLAB, VOLTEX et portfolio.
- Coordonnées publiées : email professionnel et localisation générale Cholet/Chemillé-en-Anjou (pas d’adresse privée).

## Fonctionnalités testables
- Intro animée, passage / répétition, mémorisée par onglet.
- Menu responsive, navigation active, barre de progression.
- Thème sombre / clair (préférence locale), respect de la réduction du mouvement.
- Cartes projets avec visuels et liens cliquables, filtres.
- Formulaire validé : **ouvre le logiciel email**, n’envoie pas directement (GitHub Pages statique).
- Copie rapide de l’email sur les navigateurs prenant en charge le presse-papier.
- Galerie de photographies Unsplash avec **illustrations locales différentes en secours** : si offline, les SVG s’affichent.

## Personnalisation
- Texte, projets, liens, email : `index.html`.
- Styles, responsive, couleurs : `style.css`.
- Animations, navigation et formulaire : `script.js`.
- Le PDF `assets/cv-mehdi-hmaiss.pdf` vient de votre dossier original : pensez à vérifier sa mise à jour avant publication.
- Les miniatures projets sont des visuels d’ambiance, **pas des captures réelles**.

## Crédits et confidentialité
Les photos distantes utilisées sont des illustrations Unsplash (voir `PHOTO-CREDITS.md`). Les illustrations SVG, le logo MH et l’aperçu social sont créés spécialement pour cette version. Aucune donnée personnelle sensible ni adresse privée n’a été ajoutée.
