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

type EventCategory = 'Atelier' | 'Conférence' | 'Sport';

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

    const eventValue: EventFormValue = this.eventForm.getRawValue();
    console.info('Événement prêt à être ajouté :', eventValue);
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
