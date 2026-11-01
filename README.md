# EventHub — Catalogue d’événements

## 1. Description du projet
**EventHub** est une application web moderne développée dans le cadre d'une étude de cas individuelle avec **Angular 21**. Elle permet à une association étudiante de présenter ses activités (ateliers, conférences, sports), de filtrer les événements par catégorie, de gérer une liste de favoris en temps réel grâce aux **Signals**, de créer et supprimer des événements, et de consulter les détails de chaque activité via un routage dynamique. L'application fonctionne entièrement côté client avec un état conservé en mémoire.

## 2. Versions et cadre technique
- **Framework :** Angular 21 (Architecture *Standalone Components*)
- **Gestion d'état réactive :** Angular Signals (`signal`, `computed`, `.update()`, `.set()`)
- **Flux de contrôle :** `@for`, `@empty`, `@if / @else`
- **Routage :** `provideRouter()`, `withComponentInputBinding()`, *Lazy Loading* (`loadComponent()`)
- **Service d'état :** `EventService` injectable à la racine, avec événements et favoris partagés par les composants
- **Formulaires :** formulaire réactif `/events/add` avec validations et signaux `formValue` / `formStatus`
- **Langages :** TypeScript, HTML5, CSS3

## 3. Fonctionnalités
- Affichage et filtrage des événements par catégorie
- Compteurs du nombre total, des favoris et des événements gratuits
- Ajout d'un événement avec validation des champs obligatoires
- Suppression d'un événement avec confirmation
- Synchronisation immédiate des favoris, de la liste et des compteurs
- Réinitialisation de l'état au rechargement complet de l'application

## 3. Instructions d'installation et de lancement
1. Cloner le dépôt Git :
   ```bash
   git clone <URL_DU_DEPOT>
   cd eventhub-ben-azzoun-myriam