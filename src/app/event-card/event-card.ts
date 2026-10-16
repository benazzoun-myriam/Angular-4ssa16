import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-event-card',
  imports: [CommonModule,RouterLink],
  templateUrl: './event-card.html',
  styleUrl: './event-card.css',
})
export class EventCard {

  event = input.required<any>();
  
  isFavorite = input<boolean>(false);

  favoriteToggle = output<number>();

  onToggleFavorite() {
    this.favoriteToggle.emit(this.event().id);
  }
}
