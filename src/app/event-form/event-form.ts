import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router, RouterLink } from '@angular/router';
import { EventCategory, NewEvent } from '../event.model';
import { EventService } from '../event.service';

interface EventFormValue {
  title: string;
  category: EventCategory | '';
  date: string;
  place: string;
  price: number | null;
  imageUrl: string;
  description: string;
}

@Component({
  selector: 'app-event-form',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './event-form.html',
  styleUrl: './event-form.css',
})
export class EventForm {
  private readonly router = inject(Router);
  private readonly eventService = inject(EventService);

  readonly eventForm = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(5), Validators.maxLength(50)],
    }),
    category: new FormControl<EventCategory | ''>('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    date: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    place: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)],
    }),
    price: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    imageUrl: new FormControl('', { nonNullable: true }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(20)],
    }),
  });

  readonly formValue = toSignal(this.eventForm.valueChanges, {
    initialValue: this.eventForm.getRawValue(),
  });

  readonly formStatus = toSignal(this.eventForm.statusChanges, {
    initialValue: this.eventForm.status,
  });

  addEvent(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const eventValue = this.eventForm.getRawValue();
    const newEvent: NewEvent = {
      title: eventValue.title,
      category: eventValue.category as EventCategory,
      date: eventValue.date,
      place: eventValue.place,
      price: eventValue.price ?? 0,
      imageUrl: eventValue.imageUrl || '/angular.png',
      description: eventValue.description,
    };
    this.eventService.addEvent(newEvent);
    this.eventForm.reset({
      title: '',
      category: '',
      date: '',
      place: '',
      price: null,
      imageUrl: '',
      description: '',
    });
    void this.router.navigate(['/events']);
  }

  hasError(controlName: keyof EventFormValue, errorCode: string): boolean {
    const control = this.eventForm.controls[controlName];
    return control.touched && control.hasError(errorCode);
  }
}
