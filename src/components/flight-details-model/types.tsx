// Types
export type Segment = {
  airline: string;
  flightNo: string;
  aircraft?: string;
  departure: { airport: string; code: string; date: string; time: string };
  arrival: { airport: string; code: string; date: string; time: string };
  durationMinutes: number;
  meal?: string;
  notes?: string[];
};

export type FlightDetails = {
  brandDetails: any[];
  flightDetails?: any[];
  priceDetails?: any;
  productDetails?: any[];
  termsAndConditionsDetails?: any[];
};

export interface FlightDetailsDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  data: FlightDetails[];
  airlines?: any[];
}
