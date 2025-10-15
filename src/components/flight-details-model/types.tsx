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
  segments: Segment[];
  totalFare?: number;
  taxes?: number;
  currency?: string;
};

export interface FlightDetailsDialogProps {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  data: FlightDetails;
}
