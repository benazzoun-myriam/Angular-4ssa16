import { Component,computed,signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventCard } from '../event-card/event-card';
@Component({
  selector: 'app-event-list',
  imports: [CommonModule],
  templateUrl: './event-list.html',
  styleUrl: './event-list.css',
})
export class EventList {

  events = signal([
    { id: 1, title: 'Atelier Angular', category: 'Atelier', price: 0, date: new Date() },
    { id: 2, title: 'Conférence Tech', category: 'Conférence', price: 50, date: new Date() }
  ]);
  favoriteIds = signal<number[]>([]);
  favoriteCount = computed(() => this.favoriteIds().length);

  toggleFavorite(eventId: number) {
    this.favoriteIds.update(ids => {
      if (ids.includes(eventId)) {
        return ids.filter(id => id !== eventId);
      } else {
        return [...ids, eventId];
      }
    });
  }
}
