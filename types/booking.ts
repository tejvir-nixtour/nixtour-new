export interface Travelers {
  adults: number;
  children: number;
  infants: number;
}

export type TravelClass =
  | 'Economy'
  | 'Premium Economy'
  | 'Business'
  | 'First Class';
