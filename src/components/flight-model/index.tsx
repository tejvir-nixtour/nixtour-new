'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { CheckCircle, XCircle } from 'lucide-react';
import { Dispatch, SetStateAction } from 'react';

interface FlightFareModalProps {
  open: boolean;
  onOpenChange: Dispatch<SetStateAction<boolean>>;
  flight?: any; // You can define a more specific type based on your flight data structure
}

export default function FlightFareModal({
  open,
  onOpenChange,
  flight,
}: FlightFareModalProps) {
  const [selected, setSelected] = useState<number>(0);

  console.log(flight);

  const fares = [
    {
      title: 'Economy class',
      subtitle: 'Recommended',
      baggage: 'Carry-on baggage: 1 × 7 kg\nChecked baggage: 1 × 15 kg',
      refundable: false,
      changeFee: 'from ₹ 3,890',
      other: 'Ticketing: Within 2 hours after payment',
      price: '₹ 4,552',
    },
    {
      title: 'Economy class',
      subtitle: 'Flexi Plus',
      baggage: 'Carry-on baggage: 1 × 7 kg\nChecked baggage: 1 × 15 kg',
      refundable: true,
      cancelFee: 'from ₹ 3,545',
      changeFee: 'from ₹ 1,015',
      other: 'Meals provided\nTicketing: Within 12 hours after payment',
      price: '₹ 5,018',
    },
    {
      title: 'Economy class',
      subtitle: 'Flexi Plus',
      baggage: 'Carry-on baggage: 1 × 7 kg\nChecked baggage: 1 × 15 kg',
      refundable: true,
      cancelFee: 'from ₹ 3,500',
      changeFee: 'from ₹ 1,000',
      other: 'Meals provided\nTicketing: Within 12 hours after payment',
      price: '₹ 5,185',
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-4xl bg-white md:rounded-2xl p-6 border border-gray-200 overflow-y-auto max-h-[80dvh] xs:w-[90dvw]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            New Delhi → Mumbai
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {fares.map((fare, index) => (
            <Card
              key={index}
              onClick={() => setSelected(index)}
              className={`cursor-pointer border-2 rounded-xl transition ${
                selected === index
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200'
              }`}
            >
              <CardContent className="p-4 space-y-3">
                {fare.subtitle === 'Recommended' && (
                  <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                    {fare.subtitle}
                  </span>
                )}
                {fare.subtitle === 'Flexi Plus' && (
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                    {fare.subtitle}
                  </span>
                )}
                <h2 className="font-semibold text-lg">{fare.title}</h2>
                <div className="text-sm whitespace-pre-line text-gray-700">
                  {fare.baggage}
                </div>
                <div className="mt-2">
                  <h4 className="font-medium mb-1">Flexibility</h4>
                  {fare.refundable ? (
                    <>
                      <p className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Cancellation fee: {fare.cancelFee}
                      </p>
                      <p className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Change fee: {fare.changeFee}
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="flex items-center text-sm text-gray-700">
                        <XCircle className="w-4 h-4 mr-2 text-red-500" />
                        Non-refundable
                      </p>
                      <p className="flex items-center text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                        Change fee: {fare.changeFee}
                      </p>
                    </>
                  )}
                </div>
                <div className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                  {fare.other}
                </div>
                <div className="text-lg font-bold mt-4">{fare.price}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <Button
            onClick={() => onOpenChange(false)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            Continue
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
