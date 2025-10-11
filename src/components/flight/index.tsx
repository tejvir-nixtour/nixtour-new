import React, { useState } from 'react';
import { FlightDetail } from './types';
import { IndianRupee } from 'lucide-react';
import { Button } from '../ui/button';
import dayjs from 'dayjs';
import FlightFareModal from '../flight-model';
import { airLines } from '../search-filters/filterOptions';

export const FlightBox: React.FC<FlightDetail> = ({
  filters,
  // catalogProducts,
  // flights,
  // brands,
  flightsData,
  // termsAndConditions,
  // products,
}) => {
  const [showStops, setShowStops] = useState<string>('');
  const [selectedFlight, setSelectedFlight] = useState<any[] | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  console.log(flightsData);

  const formatTimeToMinutes = (time: string) => {
    const [hour, min] = time.split(':').map(Number);
    return hour * 60 + min;
  };

  function calculateTimeDifference(
    durationStart: any,
    durationEnd: any
  ): string {
    // Convert time strings to Date objects
    const start = new Date(
      `${dayjs(durationStart.date).format('YYYY-MM-DD')}T${durationStart.time}:00Z`
    ); // Assume both times are on the same day
    const end = new Date(
      `${dayjs(durationEnd.date).format('YYYY-MM-DD')}T${durationEnd.time}:00Z`
    );

    // Get the difference in milliseconds
    let difference = end.getTime() - start.getTime();

    // If the durationEnd time is earlier than the start time, adjust for the next day
    if (difference < 0) {
      difference += 24 * 60 * 60 * 1000; // Add 24 hours in milliseconds
    }

    // Convert milliseconds to hours and minutes
    const hours = Math.floor(difference / (1000 * 60 * 60)); // Hours
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)); // Minutes

    return `${hours}H ${minutes}M`;
  }

  function dialodData(id: string) {
    const flightDetails: any = [];

    flightDetails.id = id;
    const catalogProduct =
      flightsData?.CatalogProductOfferingsResponse?.CatalogProductOfferings?.CatalogProductOffering?.find(
        (catalog: any) => {
          if (catalog.id === id) {
            return catalog?.ProductBrandOptions;
          }
        }
      );

    console.log('catalog', catalogProduct);

    catalogProduct.ProductBrandOptions?.map((options: any) => {
      options?.ProductBrandOffering?.map((offering: any) => {
        flightDetails.push({
          priceDetails:
            offering?.BestCombinablePrice?.PriceBreakdown[0]?.Amount,
          brandDetails: [
            flightsData?.CatalogProductOfferingsResponse?.ReferenceList[3]?.Brand?.filter(
              (b: any) => {
                if (b.id === offering?.Brand?.BrandRef) {
                  return b;
                }
              }
            ),
          ],
          productDetails: [
            flightsData?.CatalogProductOfferingsResponse?.ReferenceList[1]?.Product?.filter(
              (p: any) => {
                if (p.id === offering?.Product[0]?.productRef) {
                  return p;
                }
              }
            ),
          ],
          termsAndConditionsDetails: [
            flightsData?.CatalogProductOfferingsResponse?.ReferenceList[2]?.TermsAndConditions?.filter(
              (t: any) => {
                if (
                  t.id === offering?.TermsAndConditions?.termsAndConditionsRef
                ) {
                  return t;
                }
              }
            ),
          ],
          flightDetails: [
            flightsData?.CatalogProductOfferingsResponse?.ReferenceList[0]?.Flight?.filter(
              (f: any) => {
                if (options?.flightRefs?.includes(f.id)) {
                  return f;
                }
              }
            ),
          ],
        });
      });
    });

    return setSelectedFlight(flightDetails);
  }

  const filteredCatalogs =
    flightsData?.CatalogProductOfferingsResponse?.CatalogProductOfferings?.CatalogProductOffering?.filter(
      (catalog: any) => {
        const flightRefs = catalog?.ProductBrandOptions[0]?.flightRefs || [];
        const firstFlight =
          flightsData?.CatalogProductOfferingsResponse?.ReferenceList[0]?.Flight?.find(
            (f: any) => f.id === flightRefs[0]
          );
        const lastFlight =
          flightsData?.CatalogProductOfferingsResponse?.ReferenceList[0]?.Flight?.find(
            (f: any) => f.id === flightRefs[flightRefs.length - 1]
          );

        if (!firstFlight || !lastFlight) return false;

        const stops = flightRefs.length - 1;
        const price =
          catalog?.ProductBrandOptions[0]?.ProductBrandOffering[0]
            ?.BestCombinablePrice?.PriceBreakdown[0]?.Amount?.Total || 0;

        const depTime = firstFlight.Departure?.time || '';
        const arrTime = lastFlight.Arrival?.time || '';
        const depMinutes = formatTimeToMinutes(depTime);
        const arrMinutes = formatTimeToMinutes(arrTime);

        const depStart = formatTimeToMinutes(
          filters.departureTimeRange.start || '00:00:00'
        );
        const depEnd = formatTimeToMinutes(
          filters.departureTimeRange.end || '23:59:59'
        );
        const arrStart = formatTimeToMinutes(
          filters.arrivalTimeRange.start || '00:00:00'
        );
        const arrEnd = formatTimeToMinutes(
          filters.arrivalTimeRange.end || '23:59:59'
        );

        const matchesStops =
          (stops === 0 && filters.stops.nonStop) ||
          (stops === 1 && filters.stops.oneStop) ||
          (stops >= 2 && filters.stops.twoPlusStop);

        const matchesPrice =
          price >= filters.priceRange[0] && price <= filters.priceRange[1];

        const matchesAirline =
          !filters.airline ||
          filters.airline === 'Any' ||
          firstFlight.carrier === filters.airline;

        const durationMinutes =
          Number(
            firstFlight.duration?.slice(2).replace('H', '').replace('M', '')
          ) || 0;
        const matchesDuration =
          filters.duration === 'any' ||
          (filters.duration === 'short' && durationMinutes < 180) ||
          (filters.duration === 'medium' &&
            durationMinutes >= 180 &&
            durationMinutes <= 360) ||
          (filters.duration === 'long' && durationMinutes > 360);

        const matchesDeparture =
          !filters.departureTimeRange.start ||
          (depMinutes >= depStart && depMinutes <= depEnd);

        const matchesArrival =
          !filters.arrivalTimeRange.start ||
          (arrMinutes >= arrStart && arrMinutes <= arrEnd);

        return (
          matchesStops &&
          matchesPrice &&
          matchesAirline &&
          matchesDuration &&
          matchesDeparture &&
          matchesArrival
        );
      }
    );

  console.log('filteredCatalogs', filteredCatalogs);

  return (
    <div className="flex flex-col my-6 md:my-10 items-center gap-4 w-full md:w-[60%]">
      {filteredCatalogs?.length ? (
        filteredCatalogs.map((catalog: any) => {
          const direct =
            catalog?.ProductBrandOptions[0]?.flightRefs?.length || 1;
          const flightDetails: any[] = [];
          flightsData?.CatalogProductOfferingsResponse?.ReferenceList[0]?.Flight?.map(
            (f: any) => {
              catalog?.ProductBrandOptions[0]?.flightRefs.map((id: string) => {
                if (f.id === id) flightDetails.push(f);
              });
            }
          );
          let duration: string = calculateTimeDifference(
            {
              date: flightDetails[0]?.Departure?.date,
              time: flightDetails[0]?.Departure?.time.slice(0, 5),
            },
            {
              date: flightDetails[direct - 1]?.Arrival?.date,
              time: flightDetails[direct - 1]?.Arrival?.time.slice(0, 5),
            }
          );

          return (
            <div
              key={catalog.id}
              className="w-full max-w-[90dvw] rounded-xl border bg-white shadow-sm hover:shadow-md transition p-4 flex flex-col gap-4 sm:flex-row sm:items-center"
            >
              {/* Airline Info */}
              <div className="flex flex-row md:flex-col items-center md:items-start gap-1 min-w-[120px]">
                <span className="text-sm font-medium text-gray-900">
                  {airLines.find(
                    (airline) => airline.code === flightDetails[0]?.carrier
                  )?.name || flightDetails[0]?.carrier}
                </span>
                <span className="text-xs text-muted-foreground">
                  {flightDetails[0]?.carrier}-{flightDetails[0]?.number}
                </span>
              </div>

              {/* Flight Info */}
              <div className="flex flex-1 justify-between items-center flex-wrap gap-3">
                {/* Departure */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-base font-semibold text-gray-800">
                    {flightDetails[0]?.Departure?.time.slice(0, 5)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {flightDetails[0]?.Departure?.location} T
                    {flightDetails[0]?.Departure?.terminal}
                  </span>
                </div>

                {/* Duration & Stops */}
                <div className="flex flex-col items-center text-center gap-1">
                  <span className="text-xs text-gray-500">{duration}</span>
                  <div className="w-20 h-[4px] bg-gray-500 rounded-full" />
                  <span
                    className="text-xs text-gray-600 cursor-pointer"
                    onMouseOver={() => setShowStops(catalog.id)}
                    onMouseOut={() => setShowStops('')}
                  >
                    {direct === 1 ? 'Direct' : `${direct - 1} Stop`}
                  </span>
                  {showStops === catalog.id && direct > 1 && (
                    <div
                      className="p-4 bg-white rounded-xl shadow-md shadow-black absolute mt-8 z-10 text-md text-left"
                      onMouseOver={() => setShowStops(catalog.id)}
                      onMouseOut={() => setShowStops('')}
                    >
                      {flightDetails.slice(1).map((flight, inx) => {
                        return (
                          <div
                            key={inx}
                            className="text-gray-600 flex flex-col items-start gap-2 w-fit "
                          >
                            <div className="font-bold text-md">
                              Arrival From:{' '}
                              {flightDetails[inx]?.Departure?.location}
                              <br />
                              <p className="flex justify-between font-normal text-sm">
                                <span>
                                  Date:{' '}
                                  {dayjs(
                                    flightDetails[inx]?.Arrival?.date
                                  ).format('D MMM, ddd')}
                                </span>
                                <span>
                                  Time:{' '}
                                  {flightDetails[inx]?.Arrival?.time.slice(
                                    0,
                                    5
                                  )}
                                </span>
                              </p>
                            </div>
                            <div className="font-bold text-md">
                              Departure From: {flight?.Departure?.location} to{' '}
                              {flight?.Arrival?.location}
                              <br />
                              <p className="flex justify-between font-normal text-sm">
                                <span>
                                  Date:{' '}
                                  {dayjs(flight?.Departure?.date).format(
                                    'D MMM, ddd'
                                  )}
                                </span>
                                <span>
                                  Time: {flight?.Departure?.time.slice(0, 5)}
                                </span>
                              </p>
                            </div>
                            <div className="font-bold text-md">
                              Arrival To: {flight.Arrival?.location}{' '}
                              {flight.Arrival?.terminal &&
                                `at Terminal ${flight.Arrival?.terminal}`}
                              <br />
                              <p className="flex justify-between font-normal text-sm">
                                <span>
                                  Date:{' '}
                                  {dayjs(flight?.Arrival?.date).format(
                                    'D MMM, ddd'
                                  )}
                                </span>
                                <span>
                                  Time: {flight?.Arrival?.time.slice(0, 5)}
                                </span>
                              </p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Arrival */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-base font-semibold text-gray-800">
                    {flightDetails[direct - 1]?.Arrival?.time.slice(0, 5)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {
                      flightsData?.CatalogProductOfferingsResponse?.ReferenceList[0]?.Flight?.find(
                        (f: any) =>
                          f.id ===
                          catalog?.ProductBrandOptions[0]?.flightRefs[
                            direct - 1
                          ]
                      )?.Arrival?.location
                    }{' '}
                    T
                    {
                      flightsData?.CatalogProductOfferingsResponse?.ReferenceList[0]?.Flight?.find(
                        (f: any) =>
                          f.id ===
                          catalog?.ProductBrandOptions[0]?.flightRefs[
                            direct - 1
                          ]
                      )?.Arrival?.terminal
                    }
                  </span>
                </div>

                {/* Price */}
                <div className="text-primary font-bold flex items-center gap-1">
                  <IndianRupee className="w-4 h-4" />
                  {
                    catalog?.ProductBrandOptions[0]?.ProductBrandOffering[0]
                      ?.BestCombinablePrice?.PriceBreakdown[0]?.Amount?.Total
                  }
                </div>

                {/* CTA */}
                <div>
                  <Button
                    className="rounded-xl px-6 bg-[#BC1110] hover:bg-[#BC1110]/90 text-white"
                    onClick={() => {
                      dialodData(catalog.id);
                      setOpen(true);
                    }}
                  >
                    Select
                  </Button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h1 className="text-center text-muted-foreground text-lg mt-10">
          No Flights Found!
        </h1>
      )}
      {/* Modal for selected flight - To be implemented */}

      <FlightFareModal
        open={open}
        onOpenChange={setOpen}
        flight={selectedFlight}
      />
    </div>
  );
};
