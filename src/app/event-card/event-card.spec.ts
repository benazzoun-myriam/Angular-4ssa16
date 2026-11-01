import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EventCard } from './event-card';

describe('EventCard', () => {
  let component: EventCard;
  let fixture: ComponentFixture<EventCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('event', {
      id: 1,
      title: 'Événement de test',
      category: 'Atelier',
      date: '2026-07-01',
      place: 'Salle A',
      price: 0,
      imageUrl: '/angular.png',
      description: 'Description de test suffisamment longue.',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('emits favorite and delete actions for its event', () => {
    const favoriteSpy = vi.spyOn(component.favoriteToggle, 'emit');
    const deleteSpy = vi.spyOn(component.deleteEvent, 'emit');

    component.onToggleFavorite();
    component.onDeleteEvent();

    expect(favoriteSpy).toHaveBeenCalledWith(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});
