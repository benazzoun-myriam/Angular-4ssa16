import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { EventForm } from './event-form';
import { EventService } from '../event.service';

describe('EventForm', () => {
  let component: EventForm;
  let fixture: ComponentFixture<EventForm>;
  let eventService: EventService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventForm],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventForm);
    component = fixture.componentInstance;
    eventService = TestBed.inject(EventService);
    fixture.detectChanges();
  });

  it('is invalid when empty and disables submission', () => {
    expect(component.eventForm.invalid).toBe(true);
    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBe(true);
  });

  it('validates title length and negative price', () => {
    component.eventForm.controls.title.setValue('Test');
    component.eventForm.controls.price.setValue(-1);

    expect(component.eventForm.controls.title.hasError('minlength')).toBe(true);
    expect(component.eventForm.controls.price.hasError('min')).toBe(true);
    expect(component.formStatus()).toBe('INVALID');
  });

  it('adds a valid event, resets the form and navigates to the list', () => {
    component.eventForm.setValue({
      title: 'Atelier de tests Angular',
      category: 'Atelier',
      date: '2026-07-10',
      place: 'Salle B',
      price: 10,
      imageUrl: '/angular.png',
      description: 'Un atelier de test avec une description détaillée.',
    });
    const router = TestBed.inject(Router);
    const navigateSpy = vi.spyOn(router, 'navigate').mockResolvedValue(true);

    component.addEvent();

    expect(eventService.eventCount()).toBe(4);
    expect(component.eventForm.pristine).toBe(true);
    expect(navigateSpy).toHaveBeenCalledWith(['/events']);
  });
});
