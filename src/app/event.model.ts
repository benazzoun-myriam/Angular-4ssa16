export type EventCategory = 'Atelier' | 'Conférence' | 'Sport';

export interface Event {
  id: number;
  title: string;
  category: EventCategory;
  date: string;
  place: string;
  price: number;
  imageUrl: string;
  description: string;
}

export type NewEvent = Omit<Event, 'id'>;
