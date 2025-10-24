import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '../../components/navbar/navbar';
import { PassengerForm } from '../../components/passenger-form';
import { Label } from '@radix-ui/react-label';
import { Input } from 'antd';
import { Card, CardContent } from '../../components/ui/card';
import {
  Backpack,
  Briefcase,
  CalendarCheck,
  CalendarX2,
  Info,
  Luggage,
  Percent,
  TicketPercent,
} from 'lucide-react';
import Footer from '../../components/footer/footer';

export const BookFlight = () => {
  const params = useParams();

  const { fields } = params;

  //   const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(null);

  const [flightDetails, setFlightDetails] = useState<any>(null);

  const data: any = {};

  fields?.split('&')?.map((a: any) => {
    const [key, value] = a.split('=');
    data[key] = value;
  });

  console.log(data);

  const getFlightDetails = async () => {
    // Fetch flight details from server based on params
    // Example: fetch(`/api/flights/${params.flightId}`)

    const parameters = {
      OfferQueryBuildFromCatalogProductOfferings: {
        BuildFromCatalogProductOfferingsRequestAir: {
          '@type': 'BuildFromCatalogProductOfferingsRequestAir',
          CatalogProductOfferingsIdentifier: {
            Identifier: {
              value: data?.if || 'dd5c71d0-5be2-4c18-90f8-d8aa481bc826',
            },
          },
          CatalogProductOfferingSelection: [
            {
              CatalogProductOfferingIdentifier: {
                Identifier: {
                  value: data?.cid || 'o6',
                },
              },
              ProductIdentifier: [
                {
                  Identifier: {
                    value: data?.pid || 'p8',
                  },
                },
              ],
            },
          ],
        },
      },
    };

    await axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/api/travelport/price`,
        parameters,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      .then((response) => {
        console.log(response.data);
        // Update flight data in the state
        setFlightDetails(response.data);
      })
      .catch((error) => {
        setError(error);
      });
  };

  useEffect(() => {
    // Fetch flight data based on params
    // Example: fetch(`/api/flights/${params.flightId}`)

    getFlightDetails();
    console.log(error);

    // Update flight data in the state
    // Example: setFlightData(response.data)
  }, [params]);

  return (
    <>
      <Navbar />
      <div className="bg-blue-700 p-4 max-w-[95dvw] mx-auto rounded-xl overflow-x-hidden">
        <h1 className="font-bold text-2xl">
          Trip to{' '}
          {
            flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
              ?.FlightSegment?.[
              flightDetails?.OfferListResponse?.OfferID?.[0]?.Product?.[0]
                ?.FlightSegment?.length - 1
            ]?.Flight?.Arrival?.location
          }
        </h1>
      </div>
      <div className="flex justify-between flex-col md:flex-row w-[95dvw] mx-auto">
        <PassengerForm />
        <div className="border p-4 my-4 rounded-xl font-bold h-fit w-[30%] hidden md:inline-block space-y-2">
          <h2>Price Details</h2>
          <p className="flex justify-between">
            <span>Base Price:</span>
            <span>
              {' '}
              {flightDetails?.OfferListResponse?.OfferID?.[0]?.Price
                ?.CurrencyCode?.value || 'Rs'}{' '}
              {flightDetails?.OfferListResponse?.OfferID?.[0]?.Price?.Base}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Total Taxes:</span>
            <span>
              {flightDetails?.OfferListResponse?.OfferID?.[0]?.Price
                ?.CurrencyCode?.value || 'Rs'}{' '}
              {
                flightDetails?.OfferListResponse?.OfferID?.[0]?.Price
                  ?.TotalTaxes
              }
            </span>
          </p>
          <div className="w-full h-1 bg-gray-500 rounded-full"></div>
          <p className="flex justify-between">
            <span>Total:</span>
            <span>
              {flightDetails?.OfferListResponse?.OfferID?.[0]?.Price
                ?.CurrencyCode?.value || 'Rs'}{' '}
              {
                flightDetails?.OfferListResponse?.OfferID?.[0]?.Price
                  ?.TotalPrice
              }
            </span>
          </p>
        </div>
      </div>
      <div className="w-[95dvw] mx-auto space-y-2 my-2 p-4">
        <h2 className="font-bold text-xl">Contact Details</h2>

        <div className="flex gap-4 md:justify-between flex-wrap rounded-xl md:w-[69.5%] border shadow-lg p-4">
          <div className="flex-1 min-w-40">
            <Label htmlFor="contactName">Contact Name *</Label>
            <Input
              id="contactName"
              placeholder="Enter contact name"
              className="text-lg rounded-xl my-2 placeholder:text-gray-400"
              required
            />
          </div>

          <div className="flex-1 min-w-40">
            <Label htmlFor="contactEmail">Contact Email *</Label>
            <Input
              id="contactEmail"
              placeholder="Enter contact email"
              className="text-lg rounded-xl my-2 placeholder:text-gray-400"
              required
              type="email"
            />
          </div>

          <div className="flex-1 min-w-40">
            <Label htmlFor="contactNumber">Contact Number *</Label>
            <Input
              id="contactNumber"
              placeholder="Enter contact name"
              className="text-lg rounded-xl my-2 placeholder:text-gray-400"
              required
            />
          </div>
        </div>
      </div>

      <div className="w-[95dvw] mx-auto space-y-2 my-2">
        <div className="md:w-[69.5%] space-y-4 p-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-xl font-semibold">Baggage allowance</h2>
            <a href="#" className="text-sm text-blue-600 hover:underline">
              Baggage allowance
            </a>
          </div>

          <Card className="border rounded-xl shadow-lg">
            <CardContent className="p-4 sm:p-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                {/* Personal item */}
                <div className="flex flex-col items-center space-y-2">
                  <Backpack className="w-8 h-8 text-blue-500" />
                  <div className="font-medium">Personal item</div>
                  <p className="text-sm text-muted-foreground">
                    Overall size limit (L + W + H): 90 cm
                  </p>
                  <p className="text-sm font-semibold">1 × 3 kg</p>
                </div>

                {/* Carry-on baggage */}
                <div className="flex flex-col items-center space-y-2">
                  <Briefcase className="w-8 h-8 text-yellow-500" />
                  <div className="font-medium">Carry-on baggage</div>
                  <p className="text-sm text-muted-foreground">
                    Overall size limit (L + W + H): 115 cm
                  </p>
                  <p className="text-sm font-semibold">1 × 7 kg</p>
                </div>

                {/* Checked baggage */}
                <div className="flex flex-col items-center space-y-2">
                  <Luggage className="w-8 h-8 text-blue-700" />
                  <div className="font-medium">Checked baggage</div>
                  <p className="text-sm text-muted-foreground">View Details</p>
                  <p className="text-sm font-semibold">15 kg</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* <div className="border-t pt-3 text-sm text-muted-foreground flex items-center justify-between">
            <span className="font-medium text-gray-700">Passenger 1</span>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-right">
              <span>1 × 3 kg</span>
              <span>1 × 7 kg</span>
              <span>15 kg</span>
            </div>
          </div> */}
        </div>
      </div>

      <div className="w-[95dvw] mx-auto">
        <div className="w-full md:w-[69.5%] space-y-4 p-4">
          <h2 className="text-xl font-semibold">Cancellations &amp; changes</h2>

          {/* Cancellations */}
          <Card className="border rounded-xl shadow-sm hover:bg-gray-100">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-md">
                  <CalendarX2 className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Cancellations</div>
                  <p className="text-sm text-gray-600">
                    Cancellation policy:{' '}
                    <span className="text-red-600 font-medium">
                      Non-refundable
                    </span>{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Details
                    </a>
                  </p>
                </div>
              </div>

              <div className="text-sm font-medium text-gray-500 sm:text-right">
                Included
              </div>
            </CardContent>
          </Card>

          {/* Changes */}
          <Card className="border rounded-xl shadow-sm hover:bg-gray-100">
            <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 p-2 rounded-md">
                  <CalendarCheck className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-800">Changes</div>
                  <p className="text-sm text-gray-600">
                    Change policy: From{' '}
                    <span className="font-medium">₹ 3,000</span>{' '}
                    <a href="#" className="text-blue-600 hover:underline">
                      Details
                    </a>
                  </p>
                </div>
              </div>

              <div className="text-sm font-medium text-gray-500 sm:text-right">
                Included
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-[95dvw] mx-auto">
        <div className="md:w-[69.5%] p-4 space-y-4">
          {/* Header */}
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-semibold">Stay Discounts</h2>
            <Info className="w-4 h-4 text-gray-400" />
          </div>

          {/* Discount Cards */}
          <Card className="border rounded-xl shadow-sm">
            <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center p-4 sm:p-6">
              {/* 1st Booking */}
              <div className="flex flex-col items-center space-y-2">
                <TicketPercent className="w-8 h-8 text-yellow-500" />
                <div className="font-medium text-gray-800">
                  New user promo code (1st booking)
                </div>
                <p className="text-sm text-orange-600 font-semibold">
                  10% off (up to ₹ 600.00)
                </p>
              </div>

              {/* 2nd Booking */}
              <div className="flex flex-col items-center space-y-2">
                <TicketPercent className="w-8 h-8 text-yellow-500" />
                <div className="font-medium text-gray-800">
                  New user promo code (2nd booking)
                </div>
                <p className="text-sm text-orange-600 font-semibold">
                  5% off (up to ₹ 375.00)
                </p>
              </div>

              {/* Flyer Exclusive */}
              <div className="flex flex-col items-center space-y-2">
                <Percent className="w-8 h-8 text-orange-400" />
                <div className="font-medium text-gray-800">
                  Flyer Exclusive Offer
                </div>
                <p className="text-sm text-orange-600 font-semibold">
                  Up to 25% Off
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </>
  );
};
