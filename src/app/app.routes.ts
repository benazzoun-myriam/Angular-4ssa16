import { Routes } from '@angular/router';
import { EventList } from './event-list/event-list';
import { EventDetailsComponent} from './event-details/event-details';
import { NotFound } from './not-found/not-found';
import { EventForm } from './event-form/event-form';
export const routes: Routes = [{ path: '', redirectTo: 'events', pathMatch: 'full' },

  { path: 'events/add', component: EventForm },
  
  { path: 'events', component: EventList },
  
  { path: 'events/:id', component: EventDetailsComponent },
  
  { 
    path: 'about', 
    loadComponent: () => import('./about/about').then(m => m.AboutComponent) 
  },
  
  { path: '**', component: NotFound }
];
