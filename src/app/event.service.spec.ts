import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(() => {
    service = new EventService();
  });

  it('exposes the initial event counters', () => {
    expect(service.eventCount()).toBe(3);
    expect(service.favoriteCount()).toBe(0);
    expect(service.freeEventCount()).toBe(1);
  });

  it('adds an event with a generated identifier', () => {
    service.addEvent({
      title: 'Nouvel atelier de test',
      category: 'Atelier',
      date: '2026-07-01',
      place: 'Salle B',
      price: 0,
      imageUrl: '/angular.png',
      description: 'Un atelier de test avec une description suffisamment longue.',
    });

    expect(service.eventCount()).toBe(4);
    expect(service.getEventById(4)?.title).toBe('Nouvel atelier de test');
  });

  it('toggles favorites and removes deleted event ids from favorites', () => {
    service.toggleFavorite(1);
    expect(service.favoriteCount()).toBe(1);

    service.deleteEvent(1);
    expect(service.getEventById(1)).toBeUndefined();
    expect(service.favoriteCount()).toBe(0);
  });
});
