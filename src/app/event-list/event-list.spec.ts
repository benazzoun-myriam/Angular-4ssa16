import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EventList } from './event-list';

describe('EventList', () => {
  let component: EventList;
  let fixture: ComponentFixture<EventList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventList],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('updates filtering and delegates favorites to the service', () => {
    component.filterByCategory('Sport');
    expect(component.filteredEvents().length).toBe(1);
    expect(component.filteredEvents()[0].category).toBe('Sport');

    component.toggleFavorite(3);
    expect(component.favoriteCount()).toBe(1);
    expect(component.isFavorite(3)).toBe(true);
  });

  it('confirms deletion and removes the event from favorites', () => {
    component.toggleFavorite(1);
    const confirmSpy = vi.spyOn(window, 'confirm').mockReturnValue(true);

    component.deleteEvent(1);

    expect(confirmSpy).toHaveBeenCalled();
    expect(component.eventCount()).toBe(2);
    expect(component.isFavorite(1)).toBe(false);
    confirmSpy.mockRestore();
  });
});
