# CoPath - Interface Utilisateur (Front-End)

Projet de fin de formation // Certification développeur web  
**Stack :** Next.js (React), Tailwind CSS

---

## Présentation

CoPath est une application web permettant la gestion, la création et la consultation de scénarios de jeu de rôle.  
Ce dépôt contient la partie front-end de l’application, développée avec Next.js et Tailwind CSS, offrant une expérience utilisateur moderne, responsive et accessible.

---

## Prérequis

- Node.js (version recommandée : 18+)
- pnpm, npm, yarn ou bun
- Un accès à l’API back-end ([voir API](../G404_Certif_CoPath-API))

---

## Installation et lancement

### 1. Installer les dépendances

```bash
pnpm install
# ou
npm install
# ou
yarn install
# ou
bun install
```

### 2. Lancer le serveur de développement

```bash
pnpm dev
# ou
npm run dev
# ou
yarn dev
# ou
bun dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) pour accéder à l’application.

---

## Structure du projet

- `app/` : Pages et routes principales (Next.js app router)
- `components/` : Composants réutilisables (UI, formulaires, etc.)
- `contexts/` : Contexts React (Auth, etc.)
- `styles/` : Fichiers de styles (principalement Tailwind)
- `public/` : Fichiers statiques

---

## Personnalisation et configuration

- Les URLs de l’API sont configurées dans les fichiers d’environnement (`.env.local`).

- Mettre à jour vos informations pour : 

```bash 
NEXT_PUBLIC_API_URL=
```
```bash
NEXT_PUBLIC_ASSETS_URL=
```
- Voir la documentation du back-end pour les endpoints disponibles.

---

## Bonnes pratiques

- Respectez les conventions de nommage.
- Gardez le code lisible et documenté.
- N’hésitez pas à contribuer : ouvrez une issue ou une pull request !

---

## Ressources utiles

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev/)

---

## Contact

Pour tout souci ou question, contactez : [Esteranodin](https://github.com/Esteranodin)
