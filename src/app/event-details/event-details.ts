import { Component, computed, inject, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetailsComponent {
  id = input<string>();

  private readonly eventService = inject(EventService);
  readonly event = computed(() => {
    const eventId = Number(this.id());
    return Number.isInteger(eventId) ? this.eventService.getEventById(eventId) : undefined;
  });
  readonly notFound = computed(() => !this.event());
}

export { EventDetailsComponent as EventDetails };