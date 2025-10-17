export interface FlightDetail {
  filters: {
    departureTimeRange: { start: string; end: string };
    arrivalTimeRange: { start: string; end: string };
    priceRange: [number, number];
    stops: {
      nonStop: Boolean;
      oneStop: Boolean;
      twoPlusStop: Boolean;
    };
    airline: string;
    duration: string;
    directFlight: boolean;
  };
  flights?: any[];
  airlineSpecificData?: any[];
  airlines?: any[];
  flightsData?: any;
  catalogProducts?: any[];
  products?: any[];
  termsAndConditions?: any[];
  brands?: any[];
  onClick?: () => void;
}
