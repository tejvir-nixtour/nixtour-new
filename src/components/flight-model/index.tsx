'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Dispatch, SetStateAction } from 'react';
import { brandColorMap } from './colorMap';
import { CheckCircle, XCircle } from 'lucide-react';

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

  const alreadyCovered: any[] = [];

  console.log(flight);

  // const fares = [
  //   {
  //     title: 'Economy class',
  //     subtitle: 'Recommended',
  //     baggage: 'Carry-on baggage: 1 × 7 kg\nChecked baggage: 1 × 15 kg',
  //     refundable: false,
  //     changeFee: 'from ₹ 3,890',
  //     other: 'Ticketing: Within 2 hours after payment',
  //     price: '₹ 4,552',
  //   },
  //   {
  //     title: 'Economy class',
  //     subtitle: 'Flexi Plus',
  //     baggage: 'Carry-on baggage: 1 × 7 kg\nChecked baggage: 1 × 15 kg',
  //     refundable: true,
  //     cancelFee: 'from ₹ 3,545',
  //     changeFee: 'from ₹ 1,015',
  //     other: 'Meals provided\nTicketing: Within 12 hours after payment',
  //     price: '₹ 5,018',
  //   },
  //   {
  //     title: 'Economy class',
  //     subtitle: 'Flexi Plus',
  //     baggage: 'Carry-on baggage: 1 × 7 kg\nChecked baggage: 1 × 15 kg',
  //     refundable: true,
  //     cancelFee: 'from ₹ 3,500',
  //     changeFee: 'from ₹ 1,000',
  //     other: 'Meals provided\nTicketing: Within 12 hours after payment',
  //     price: '₹ 5,185',
  //   },
  // ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="md:max-w-4xl bg-white md:rounded-2xl p-6 border border-gray-200 overflow-y-auto max-h-[90dvh] xs:w-[90dvw]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            New Delhi → Mumbai
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {flight?.map((option: any, index: number) => {
            if (!alreadyCovered.includes(option?.priceDetails?.Total)) {
              alreadyCovered.push(option?.priceDetails?.Total);
              return (
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
                    {index === 0 && (
                      <span className="text-xs bg-blue-500 text-white px-2 py-0.5 rounded">
                        {option?.brandDetails[0]?.name}
                      </span>
                    )}
                    {/* {option?.brandDetails[0]?.name?.split(" ").includes('Flex') && (
                  <span className="text-xs bg-green-500 text-white px-2 py-0.5 rounded">
                    {option?.brandDetails[0]?.name}
                  </span>
                )} */}
                    {option?.brandDetails[0]?.name && (
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${brandColorMap[option?.brandDetails[0]?.name] || 'bg-gray-500 text-white'}`}
                      >
                        {option?.brandDetails[0]?.name}
                      </span>
                    )}
                    <h2 className="font-semibold text-lg">
                      {
                        option?.productDetails[0]?.PassengerFlight[0]
                          ?.FlightProduct[0]?.cabin
                      }
                    </h2>
                    <div className="text-sm whitespace-pre-line text-gray-700">
                      {option?.termsAndConditionsDetails[0]?.BaggageAllowance?.map(
                        (bag: any, i: number) => {
                          return (
                            <p
                              key={i}
                              className=""
                              title="CHGS MAY APPLY IF BAGS EXCEED TTL WT ALLOWANCE"
                            >
                              {bag?.BaggageItem[0]?.includedInOfferPrice ===
                                'Yes' &&
                                `${bag?.baggageType}: 1 X ${bag?.BaggageItem[0]?.Measurement?.[0]?.value} Kg`}
                            </p>
                          );
                        }
                      )}
                    </div>
                    <div className="mt-2">
                      <h4 className="font-medium mb-1">Flexibility</h4>
                      {option?.brandDetails[0]?.BrandAttribute &&
                        option?.brandDetails[0]?.BrandAttribute?.map(
                          (f: any, i: number) => {
                            return (
                              <div key={i}>
                                {f?.inclusion === 'Included' ? (
                                  <p className="flex items-center text-sm text-gray-700">
                                    <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                                    {f?.classification}
                                  </p>
                                ) : (
                                  <p className="flex items-center text-sm text-gray-700">
                                    <XCircle className="w-4 h-4 mr-2 text-red-500" />
                                    {f?.classification}
                                    {f?.classification === 'Rebooking' &&
                                      `: ${option?.termsAndConditionsDetails[0]?.Penalties[0]?.Change[0]?.Penalty[0]?.Amount?.value} ${option?.termsAndConditionsDetails[0]?.Penalties[0]?.Change[0]?.PenaltyAppliesTo} ${option?.termsAndConditionsDetails[0]?.Penalties[0]?.Change[0]?.penaltyTypes[0]}`}
                                    {f?.classification === 'Refund' &&
                                      `: ${option?.termsAndConditionsDetails[0]?.Penalties[0]?.Cancel[0]?.Penalty[0]?.Amount?.value} ${option?.termsAndConditionsDetails[0]?.Penalties[0]?.Cancel[0]?.PenaltyAppliesTo} ${option?.termsAndConditionsDetails[0]?.Penalties[0]?.Cancel[0]?.penaltyTypes[0]}`}
                                  </p>
                                )}
                              </div>
                            );
                          }
                        )}
                    </div>
                    {/* <div className="mt-2 text-sm text-gray-700 whitespace-pre-line">
                  {fare.other}
                </div> */}
                    <div className="text-lg font-bold mt-4">
                      {option?.priceDetails?.Total}
                    </div>
                  </CardContent>
                </Card>
              );
            }
          })}
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
