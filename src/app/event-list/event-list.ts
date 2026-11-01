import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCard } from '../event-card/event-card';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  imports: [CommonModule, EventCard],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {
  private readonly eventService = inject(EventService);

  selectedCategory = signal<string>('Tous');

  readonly events = this.eventService.events;
  readonly eventCount = this.eventService.eventCount;
  readonly favoriteCount = this.eventService.favoriteCount;
  readonly freeEventCount = this.eventService.freeEventCount;

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
    this.eventService.toggleFavorite(eventId);
  }

  isFavorite(eventId: number): boolean {
    return this.eventService.favorites().includes(eventId);
  }

  deleteEvent(eventId: number): void {
    const event = this.eventService.getEventById(eventId);
    if (event && window.confirm(`Supprimer l’événement « ${event.title} » ?`)) {
      this.eventService.deleteEvent(eventId);
    }
  }
}
