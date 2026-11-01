import { Injectable, computed, signal } from '@angular/core';
import { Event, NewEvent } from './event.model';

@Injectable({ providedIn: 'root' })
export class EventService {
  private readonly _events = signal<Event[]>([
    {
      id: 1,
      title: 'Atelier Angular Avancé',
      category: 'Atelier',
      date: '2026-06-10',
      place: 'Salle informatique A',
      price: 0,
      imageUrl: '/angular.png',
      description: 'Explore les patterns modernes d’Angular, les Signals et les bonnes pratiques de code collaboratif.',
    },
    {
      id: 2,
      title: 'Conférence Intelligence Artificielle',
      category: 'Conférence',
      date: '2026-06-15',
      place: 'Amphithéâtre principal',
      price: 45,
      imageUrl: '/ai.png',
      description: 'Découvre les tendances IA, le design responsable et leurs applications concrètes dans le monde étudiant.',
    },
    {
      id: 3,
      title: 'Tournoi Sportif Inter-Universitaire',
      category: 'Sport',
      date: '2026-06-20',
      place: 'Complexe sportif',
      price: 15,
      imageUrl: '/sport.jpg',
      description: 'Une journée d’énergie, de compétition et de cohésion entre associations et étudiants.',
    },
  ]);

  private readonly _favorites = signal<number[]>([]);

  readonly events = this._events.asReadonly();
  readonly favorites = this._favorites.asReadonly();
  readonly eventCount = computed(() => this._events().length);
  readonly favoriteCount = computed(() => this._favorites().length);
  readonly freeEventCount = computed(() => this._events().filter(event => event.price === 0).length);

  getEventById(id: number): Event | undefined {
    return this._events().find(event => event.id === id);
  }

  addEvent(event: NewEvent): void {
    const nextId = this._events().reduce((maxId, currentEvent) => Math.max(maxId, currentEvent.id), 0) + 1;
    this._events.update(events => [...events, { ...event, id: nextId }]);
  }

  deleteEvent(id: number): void {
    this._events.update(events => events.filter(event => event.id !== id));
    this._favorites.update(favorites => favorites.filter(favoriteId => favoriteId !== id));
  }

  toggleFavorite(id: number): void {
    this._favorites.update(favorites =>
      favorites.includes(id)
        ? favorites.filter(favoriteId => favoriteId !== id)
        : [...favorites, id],
    );
  }
}
