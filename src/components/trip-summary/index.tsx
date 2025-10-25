'use client';

import { useEffect, useState } from 'react';
import { Card } from '../../components/ui/card';
import { Clock } from 'lucide-react';
import dayjs from 'dayjs';
import { calculateTimeDifference, toTitleCase } from '../helpers';

export const TripSummary: React.FC<any> = ({ flightDetails }) => {
  const [showSummary, setShowSummary] = useState<boolean>(false);

  useEffect(() => {
    setShowSummary(false);
  }, []);

  return (
    <div className="w-full p-4 pb-0">
      <Card
        className={showSummary ? 'p-5 space-y-4' : 'p-5 space-y-4 bg-blue-600'}
      >
        {/* Header */}
        <div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between cursor-pointer"
          onClick={() => setShowSummary(!showSummary)}
        >
          <h2
            className={
              showSummary
                ? 'text-xl font-semibold'
                : 'text-xl text-white font-semibold'
            }
          >
            Trip to{' '}
            {sessionStorage.getItem('toAirportCode') ===
              flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                ?.FlightSegment?.[
                flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                  ?.FlightSegment?.length - 1
              ]?.Flight?.Arrival?.location && sessionStorage.getItem('toCity')
              ? sessionStorage.getItem('toCity')
              : flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                  ?.FlightSegment?.[
                  flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                    ?.FlightSegment?.length - 1
                ]?.Flight?.Arrival?.location}
          </h2>
          <button
            className={
              showSummary
                ? 'text-sm text-blue-600 hover:underline p-5 space-y-4'
                : 'text-sm text-white hover:underline'
            }
            onClick={() => window.history.back()}
          >
            Change Flight
          </button>
        </div>

        {/* Flight Summary */}

        {showSummary && (
          <>
            {' '}
            <div className="h-1 bg-gray-200"></div>
            <div className="text-sm text-gray-700 cursor-pointer">
              <p className="font-medium hover:text-black">
                {sessionStorage.getItem('fromAirportCode') ===
                  flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                    ?.FlightSegment?.[0]?.Flight?.Departure?.location &&
                sessionStorage.getItem('fromCity')
                  ? sessionStorage.getItem('fromCity')
                  : flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.[0]?.Flight?.Departure?.location}{' '}
                →{' '}
                {sessionStorage.getItem('toAirportCode') ===
                  flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                    ?.FlightSegment?.[
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.length - 1
                  ]?.Flight?.Arrival?.location &&
                sessionStorage.getItem('toCity')
                  ? sessionStorage.getItem('toCity')
                  : flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.[
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.length - 1
                    ]?.Flight?.Arrival?.location}
              </p>
              <div>
                <span className="text-gray-500 font-normal hover:text-black">
                  {' '}
                  |{' '}
                  {dayjs(
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.[0]?.Flight?.Departure?.date
                  ).format('DD MMM YYYY')}
                </span>
                <span className="text-gray-500 font-normal hover:text-black">
                  {' '}
                  |{' '}
                  {calculateTimeDifference(
                    {
                      date: flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.[0]?.Flight?.Departure
                        ?.date,
                      time: flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]?.FlightSegment?.[0]?.Flight?.Departure?.time?.slice(
                        0,
                        5
                      ),
                    },
                    {
                      date: flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.[
                        flightDetails?.OfferListResponse?.OfferID?.[0]
                          ?.Product?.[0]?.FlightSegment?.length - 1
                      ]?.Flight?.Arrival?.date,
                      time: flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]?.FlightSegment?.[
                        flightDetails?.OfferListResponse?.OfferID?.[0]
                          ?.Product?.[0]?.FlightSegment?.length - 1
                      ]?.Flight?.Arrival?.time?.slice(0, 5),
                    }
                  )}
                </span>
              </div>
            </div>
            <div className="pl-2 space-y-6 mt-2">
              {flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]?.FlightSegment?.map(
                (flight: any, index: number) => {
                  return (
                    <div
                      className="space-y-1 cursor-pointer border-l-2 border-gray-200 pl-2 hover:border-gray-400"
                      key={index}
                    >
                      <p className="text-base font-medium">
                        {flight?.Flight?.Departure?.time?.slice(0, 5)} —{' '}
                        {sessionStorage.getItem('fromAirportCode') ===
                          flight?.Flight?.Departure?.location &&
                        sessionStorage.getItem('fromCity')
                          ? sessionStorage.getItem('fromCity')
                          : flight?.Flight?.Departure?.location}{' '}
                        {flight?.Flight?.Departure?.terminal &&
                          `— [ Terminal ${
                            flight?.Flight?.Departure?.terminal
                          } ]`}
                      </p>
                      <p className="text-gray-600">
                        {toTitleCase(
                          flight?.Flight?.operatingCarrierName || ''
                        ) ||
                          flight?.Flight?.operatingCarrier ||
                          flight?.Flight?.carrier}{' '}
                        ·{' '}
                        {flight?.Flight?.number &&
                          `${flight?.Flight?.operatingCarrier || flight?.Flight?.carrier}-${flight?.Flight?.number}`}{' '}
                      </p>
                      <p className="flex items-center text-gray-600 text-sm">
                        <Clock className="w-4 h-4 mr-1" /> Flight time:{' '}
                        {flight?.Flight?.duration?.slice(2)}
                      </p>
                    </div>
                  );
                }
              )}

              {/* Final Arrival */}

              <div className="space-y-1 cursor-pointer border-l-2 border-gray-200 pl-2 hover:border-gray-400">
                <p className="text-base font-medium">
                  {flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]?.FlightSegment?.[
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.length - 1
                  ]?.Flight?.Arrival?.time?.slice(0, 5)}{' '}
                  —{' '}
                  {sessionStorage.getItem('toAirportCode') ===
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.[
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.length - 1
                    ]?.Flight?.Arrival?.location &&
                  sessionStorage.getItem('toCity')
                    ? sessionStorage.getItem('toCity')
                    : flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.[
                        flightDetails?.OfferListResponse?.OfferID?.[0]
                          ?.Product?.[0]?.FlightSegment?.length - 1
                      ]?.Flight?.Arrival?.location}{' '}
                  {flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                    ?.FlightSegment?.[
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.length - 1
                  ]?.Flight?.Arrival?.terminal &&
                    `— [ Terminal ${
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.[
                        flightDetails?.OfferListResponse?.OfferID?.[0]
                          ?.Product?.[0]?.FlightSegment?.length - 1
                      ]?.Flight?.Arrival?.terminal
                    } ]`}
                </p>
                <p className="text-gray-600">
                  {toTitleCase(
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.[
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.length - 1
                    ]?.Flight?.operatingCarrierName || ''
                  ) ||
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.[
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.length - 1
                    ]?.Flight?.operatingCarrier ||
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.[
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.length - 1
                    ]?.Flight?.carrier}{' '}
                  ·{' '}
                  {flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                    ?.FlightSegment?.[
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.length - 1
                  ]?.Flight?.number &&
                    `${
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.[
                        flightDetails?.OfferListResponse?.OfferID?.[0]
                          ?.Product?.[0]?.FlightSegment?.length - 1
                      ]?.Flight?.operatingCarrier ||
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.[
                        flightDetails?.OfferListResponse?.OfferID?.[0]
                          ?.Product?.[0]?.FlightSegment?.length - 1
                      ]?.Flight?.carrier
                    }-${
                      flightDetails?.OfferListResponse?.OfferID?.[0]
                        ?.Product?.[0]?.FlightSegment?.[
                        flightDetails?.OfferListResponse?.OfferID?.[0]
                          ?.Product?.[0]?.FlightSegment?.length - 1
                      ]?.Flight?.number
                    }`}{' '}
                </p>
                <p className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" /> Flight time:{' '}
                  {flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]?.FlightSegment?.[
                    flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                      ?.FlightSegment?.length - 1
                  ]?.Flight?.duration?.slice(2)}
                </p>
              </div>

              {/* Transfer */}
              {/* <div className="bg-gray-50 rounded-md p-3 border border-gray-100">
                <p className="text-sm text-gray-800">
                  Transfer in Goa <span className="font-medium">1h 15m</span>
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-1 text-sm">
                  <span className="flex items-center text-red-600">
                    <Luggage className="w-4 h-4 mr-1" /> Collect &amp; re-check
                    baggage
                  </span>
                  <span className="flex items-center text-amber-600">
                    <AlertTriangle className="w-4 h-4 mr-1" /> Short transfer
                    time
                  </span>
                </div>
              </div> */}

              {/* Leg 2 */}
              {/* <div className="space-y-1">
                <p className="text-base font-medium">22:05 — GOX Goa Mopa</p>
                <p className="text-gray-600">
                  Air India Express IX1209 · Boeing 737 MAX 8 · Economy class
                </p>
                <p className="flex items-center text-gray-600 text-sm">
                  <Clock className="w-4 h-4 mr-1" /> Flight time: 1h 20m
                </p>
              </div> */}

              {/* Arrival */}
              {/* <div className="space-y-1">
                <p className="text-base font-medium">
                  23:25 — BOM Mumbai Chhatrapati Shivaji Maharaj Intl. T2
                </p>
              </div> */}
            </div>
          </>
        )}
      </Card>
    </div>
  );
};
