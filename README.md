# EventHub — Catalogue d’événements

## 1. Description du projet
**EventHub** est une application web moderne développée dans le cadre d'une étude de cas individuelle avec **Angular 21**. Elle permet à une association étudiante de présenter ses activités (ateliers, conférences, sports), de filtrer les événements par catégorie, de gérer une liste de favoris en temps réel grâce aux **Signals**, et de consulter les détails de chaque activité via un routage dynamique. L'application fonctionne entièrement côté client avec des données statiques intégrées.

## 2. Versions et cadre technique
- **Framework :** Angular 21 (Architecture *Standalone Components*)
- **Gestion d'état réactive :** Angular Signals (`signal`, `computed`, `.update()`, `.set()`)
- **Flux de contrôle :** `@for`, `@empty`, `@if / @else`
- **Routage :** `provideRouter()`, `withComponentInputBinding()`, *Lazy Loading* (`loadComponent()`)
- **Langages :** TypeScript, HTML5, CSS3

## 3. Instructions d'installation et de lancement
1. Cloner le dépôt Git :
   ```bash
   git clone <URL_DU_DEPOT>
   cd eventhub-ben-azzoun-myriam