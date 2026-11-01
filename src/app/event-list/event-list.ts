import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCard } from '../event-card/event-card';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {

  events = signal([
    { id: 1, title: 'Atelier Angular Avancé', category: 'Atelier', price: 0, date: new Date('2026-06-10'), imageUrl: '/angular.png', description: 'Explore les patterns modernes d’Angular, les Signals et les bonnes pratiques de code collaboratif.' },
    { id: 2, title: 'Conférence Intelligence Artificielle', category: 'Conférence', price: 45, date: new Date('2026-06-15'), imageUrl: '/ai.png', description: 'Découvre les tendances IA, le design responsable et leurs applications concrètes dans le monde étudiant.' },
    { id: 3, title: 'Tournoi Sportif Inter-Universitaire', category: 'Sport', price: 15, date: new Date('2026-06-20'), imageUrl: '/sport.jpg', description: 'Une journée d’énergie, de compétition et de cohésion entre associations et étudiants.' }
  ]);

  selectedCategory = signal<string>('Tous');

  favoriteIds = signal<number[]>([]);

  favoriteCount = computed(() => this.favoriteIds().length);

  filteredEvents = computed(() => {
    const category = this.selectedCategory();
    const allEvents = this.events();

    if (category === 'Tous') {
      return allEvents;
    }
    return allEvents.filter(event => event.category === category);
  });

  filterByCategory(category: string) {
    this.selectedCategory.set(category);
  }

  toggleFavorite(eventId: number) {
    this.favoriteIds.update(ids => {
      if (ids.includes(eventId)) {
        return ids.filter(id => id !== eventId);
      } else {
        return [...ids, eventId];
      }
    });
  }

  isFavorite(eventId: number): boolean {
    return this.favoriteIds().includes(eventId);
  }
  
}
