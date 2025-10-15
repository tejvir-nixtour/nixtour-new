// import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '../../components/ui/dialog';
import { Button } from '../../components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import { X, Plane } from 'lucide-react';

import { FlightDetails, FlightDetailsDialogProps } from './types';

// Helpers
const formatTime = (str: string) => str.slice(0, 5); // expect HH:MM:SS
const formatDate = (iso: string) => new Date(iso).toLocaleDateString();
const minutesToHourMin = (min: number) => {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return `${h}h ${m}m`;
};

// Main Dialog (controlled)
export const FlightDetailsDialog: React.FC<FlightDetailsDialogProps> = ({
  open,
  onOpenChange,
  data,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  data: FlightDetails;
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Accessibility: DialogContent requires a DialogTitle for screen readers.
          We include a visually-hidden DialogTitle via the DialogHeader component.
          The visible heading further down is kept for visual layout. */}
      <DialogContent className="bg-white max-w-5xl gap-0 w-[95vw] md:w-[90vw] lg:w-[1100px] p-0 rounded-none md:rounded-2xl overflow-hidden border-none">
        <DialogHeader>
          {/* visually hidden title to satisfy accessibility requirements */}
          <DialogTitle className="sr-only">Flight Details</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col md:flex-row min-h-[60vh]">
          {/* Left - Flight timeline/details */}
          <div className="flex-1 p-6 md:pr-0 border-b md:border-b-0 md:border-r border-gray-200">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold">Flight Details</h3>
                <p className="text-sm text-muted-foreground">
                  Review segments, times and connection notes
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onOpenChange(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <ScrollArea className="mt-4 max-h-[60vh] pr-4">
              <ol className="space-y-6">
                {data?.segments?.map((s, i) => (
                  <li
                    key={i}
                    className="bg-white shadow-sm rounded-lg p-4 border"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-md p-2 bg-violet-50 border border-violet-100">
                          <Plane className="w-6 h-6 text-violet-700" />
                        </div>
                        <div>
                          <div className="text-sm font-medium">
                            {s?.airline} • {s?.flightNo}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {s?.aircraft ?? 'Aircraft'}
                          </div>
                        </div>
                      </div>

                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2 items-center">
                        <div className="col-span-1">
                          <div className="text-xs text-muted-foreground">
                            Departure
                          </div>
                          <div className="text-sm font-semibold">
                            {s?.departure.code} — {s?.departure.airport}
                          </div>
                          <div className="text-xs">
                            {formatDate(s?.departure.date)} •{' '}
                            {formatTime(s?.departure.time)}
                          </div>
                        </div>
                        <div className="col-span-1">
                          <div className="text-xs text-muted-foreground">
                            Arrival
                          </div>
                          <div className="text-sm font-semibold">
                            {s?.arrival.code} — {s?.arrival.airport}
                          </div>
                          <div className="text-xs">
                            {formatDate(s?.arrival.date)} •{' '}
                            {formatTime(s?.arrival.time)}
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-1 flex items-center">
                          <div>
                            <div className="text-xs text-muted-foreground">
                              Duration
                            </div>
                            <div className="text-sm font-medium">
                              {minutesToHourMin(s?.durationMinutes)}
                            </div>
                          </div>
                        </div>
                        <div className="col-span-1 md:col-span-1 text-right md:text-left">
                          <div className="text-xs text-muted-foreground">
                            Meal
                          </div>
                          <div className="text-sm">{s?.meal ?? '—'}</div>
                        </div>
                      </div>
                    </div>

                    {s?.notes && s?.notes.length > 0 && (
                      <div className="mt-3 text-xs text-muted-foreground bg-yellow-50 border border-yellow-100 rounded-md p-2">
                        {s?.notes.map((n, idx) => (
                          <p key={idx} className="leading-tight">
                            {n}
                          </p>
                        ))}
                      </div>
                    )}
                  </li>
                ))}
              </ol>

              {/* Important passenger note */}
              <div className="mt-6 p-4 bg-gray-50 rounded-md text-xs text-muted-foreground">
                Passenger of all nationalities are advised to confirm with
                respective embassies for all visa requirements. This
                communication is for informational & general purposes only.
              </div>
            </ScrollArea>
          </div>

          {/* Right - Fare Summary / Tabs */}
          <div className="w-full md:w-[360px] h-full p-6 bg-violet-900 text-white flex flex-col">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-lg font-semibold">Fare Summary</h4>
                <p className="text-sm opacity-80">Summary & rules</p>
              </div>
              <div className="text-sm text-white/80">
                {data?.currency ?? '₹'}
              </div>
            </div>

            <div className="mt-6 flex-1">
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center justify-between text-sm">
                  <div>Base Fare</div>
                  <div className="font-medium">
                    {data?.currency}
                    {data?.totalFare ? Math.round(data?.totalFare * 0.6) : '—'}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm mt-2">
                  <div>Fees & Taxes</div>
                  <div className="font-medium">
                    {data?.currency}
                    {data?.taxes ?? '—'}
                  </div>
                </div>
                <hr className="my-3 border-white/20" />
                <div className="flex items-center justify-between text-base font-semibold">
                  <div>Total</div>
                  <div>
                    {data?.currency}
                    {data?.totalFare ?? '—'}
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <Button className="w-full">Book</Button>
                <Button variant="ghost" className="w-full">
                  Share
                </Button>
              </div>
            </div>

            <div className="mt-4 text-xs opacity-90">
              <div className="mb-2">
                * Total fare displayed above has been rounded off and may thus
                show a slight difference.
              </div>
              <div className="bg-white/5 p-2 rounded-md text-[12px]">
                Deal — Get up to 19,000 off. Valid on all payment modes. Use
                code: INSTALE. TnC apply
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// // Convenience component: a button that opens the dialog with sample data
// export default function FlightDetailsButton() {
//   const [open, setOpen] = useState(false);

//   const sample: FlightDetails = {
//     currency: '₹',
//     totalFare: 65904,
//     taxes: 36824,
//     segments: [
//       {
//         airline: 'Qatar Airways',
//         flightNo: 'QR-573',
//         aircraft: 'Airbus A350-1000',
//         departure: {
//           airport: 'Bangalore (BLR)',
//           code: 'BLR',
//           date: '2025-10-16',
//           time: '04:00:00',
//         },
//         arrival: {
//           airport: 'Doha (DOH)',
//           code: 'DOH',
//           date: '2025-10-16',
//           time: '05:50:00',
//         },
//         durationMinutes: 260,
//         meal: 'Free Meal',
//         notes: ['Change plane at Doha (DOH), Connecting Time: 2h 10m'],
//       },
//       {
//         airline: 'Qatar Airways',
//         flightNo: 'QR-739',
//         aircraft: 'Airbus A350-1000',
//         departure: {
//           airport: 'Doha (DOH)',
//           code: 'DOH',
//           date: '2025-10-16',
//           time: '08:00:00',
//         },
//         arrival: {
//           airport: 'Los Angeles (LAX)',
//           code: 'LAX',
//           date: '2025-10-16',
//           time: '14:00:00',
//         },
//         durationMinutes: 960,
//         meal: 'Free Meal',
//         notes: [
//           'Change plane at Los Angeles (LAX), Connecting Time: 3h 17m — Connecting flight may depart from a different terminal',
//         ],
//       },
//     ],
//   };

//   return (
//     <div>
//       <Button onClick={() => setOpen(true)}>Open flight details</Button>

//       <FlightDetailsDialog open={open} onOpenChange={setOpen} data={sample} />
//     </div>
//   );
// }
