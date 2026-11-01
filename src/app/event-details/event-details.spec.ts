import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { EventDetails } from './event-details';

describe('EventDetails', () => {
  let component: EventDetails;
  let fixture: ComponentFixture<EventDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventDetails],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(EventDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the event from the shared service', () => {
    expect(component.event()?.title).toBe('Atelier Angular Avancé');
    expect(component.notFound()).toBe(false);
  });
});
