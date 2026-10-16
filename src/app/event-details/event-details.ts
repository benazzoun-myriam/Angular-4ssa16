import { Component, input, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-event-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetailsComponent implements OnInit {
  // Récupération automatique du paramètre :id de la route grâce à withComponentInputBinding()
  id = input<string>();

  event = signal<any>(null);
  notFound = signal<boolean>(false);

  // Simulation d'une base de données locale d'événements
  private eventsList = [
    { id: 1, title: 'Atelier Angular Avancé', category: 'Atelier', price: 0, date: new Date('2026-06-10'), description: 'Apprenez à maîtriser les Signals et les nouveautés d’Angular.' },
    { id: 2, title: 'Conférence Intelligence Artificielle', category: 'Conférence', price: 45, date: new Date('2026-06-15'), description: 'Exploration des modèles génératifs et de leur impact.' },
    { id: 3, title: 'Tournoi Sportif Inter-Universitaire', category: 'Sport', price: 15, date: new Date('2026-06-20'), description: 'Compétition sportive annuelle entre étudiants.' }
  ];

  ngOnInit() {
    const eventId = Number(this.id());
    const foundEvent = this.eventsList.find(e => e.id === eventId);

    if (foundEvent) {
      this.event.set(foundEvent);
    } else {
      this.notFound.set(true);
    }
  }
}