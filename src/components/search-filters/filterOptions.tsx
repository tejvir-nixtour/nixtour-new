// List of airlines for filtering flights based on airline preference

export const airLines = [
  { code: 'Any', name: 'Any' },
  { code: 'AI', name: 'Air India' },
  { code: 'IX', name: 'Air India Express' },
  { code: 'AA', name: 'American Airlines' },
  { code: 'DL', name: 'Delta Airlines' },
  { code: 'UA', name: 'United Airlines' },
  { code: 'BA', name: 'British Airways' },
  { code: 'LH', name: 'Lufthansa' },
  { code: 'AF', name: 'Air France' },
  { code: 'EK', name: 'Emirates' },
  { code: 'QR', name: 'Qatar Airways' },
  { code: 'TG', name: 'Thai Airways' },
  { code: 'JL', name: 'Japan Airlines' },
  { code: 'SQ', name: 'Singapore Airlines' },
  { code: 'CX', name: 'Cathay Pacific' },
  { code: 'VS', name: 'Virgin Atlantic' },
  { code: 'AC', name: 'Air Canada' },
  { code: 'QF', name: 'Qantas' },
  { code: 'NZ', name: 'Air New Zealand' },
  { code: 'KL', name: 'KLM Royal Dutch Airlines' },
  { code: 'FI', name: 'Icelandair' },
  { code: 'SA', name: 'South African Airways' },
  { code: 'EY', name: 'Etihad Airways' },
  { code: 'TK', name: 'Turkish Airlines' },
  { code: 'LX', name: 'Swiss International Air Lines' },
  { code: 'MH', name: 'Malaysia Airlines' },
  { code: 'GA', name: 'Garuda Indonesia' },
  { code: 'BR', name: 'EVA Air' },
  { code: 'AS', name: 'Alaska Airlines' },
  { code: 'WN', name: 'Southwest Airlines' },
  { code: 'AZ', name: 'ITA Airways' },
];

// Time options for filtering flights based on departure and arrival times

export const timeOptions = [
  {
    label: 'Before 6 AM',
    value: { start: '00:00:00', end: '06:00:00' },
    icon: '🌙',
  },
  {
    label: '6 AM - 12 PM',
    value: { start: '06:00:00', end: '12:00:00' },
    icon: '☀️',
  },
  {
    label: '12 PM - 6 PM',
    value: { start: '12:00:00', end: '18:00:00' },
    icon: '🌤️',
  },
  {
    label: 'After 6 PM',
    value: { start: '18:00:00', end: '00:00:00' },
    icon: '🌙',
  },
];
