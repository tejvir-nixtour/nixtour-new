import { ModifyFlight } from '../../components/modify-search/flight-search';
import { Navbar } from '../../components/navbar/navbar';
import { FlightBox } from '../../components/flight';
import { useEffect, useState } from 'react';
import { FlightFilters } from '../../components/search-filters';
import Footer from '../../components/footer/footer';
import { useLocation } from 'react-router-dom';
import { useCitiesStore } from '../../../stores/flightStore';
import { Skeleton } from 'antd';

export default function FlightPage() {
  const { fetchAirlines, airlines, error } = useCitiesStore();

  useEffect(() => {
    fetchAirlines();
    console.log(error);
  }, [fetchAirlines]);

  const [flightsData, setFlightsData] = useState<any>(null);
  // const [catalogProducts, setCatalogProducts] = useState<any[]>([]);
  // const [flights, setFlights] = useState<any[]>([]);
  // const [products, setProducts] = useState<any[]>([]);
  // const [termsAndConditions, setTermsAndConditions] = useState<any[]>([]);
  // const [brands, setBrands] = useState<any[]>([]);
  const [filters, setFilters] = useState<any>({
    departureTimeRange: { start: '', end: '' },
    arrivalTimeRange: { start: '', end: '' },
    priceRange: [0, 1000000],
    stops: {
      nonStop: true,
      oneStop: true,
      twoPlusStop: true,
    },
    airline: '',
    duration: 'any',
    directFlight: false,
  });

  const location = useLocation();

  const airlineSpecificData: {
    id?: string;
    direct?: number;
    price?: number;
    airline?: string;
    airlineCode?: string;
  }[] = [];

  // finding cheap flights from each airline for every stops

  flightsData?.CatalogProductOfferingsResponse?.CatalogProductOfferings?.CatalogProductOffering?.forEach(
    (catalog: any) => {
      const flightRefs: any[] = [];
      flightsData?.CatalogProductOfferingsResponse?.ReferenceList?.[1]?.Product?.map(
        (p: any) => {
          if (
            p?.id ===
            catalog?.ProductBrandOptions?.[0]?.ProductBrandOffering?.[0]
              ?.Product?.[0]?.productRef
          ) {
            p?.FlightSegment?.map((f: any) => {
              flightRefs.push(f?.Flight?.FlightRef);
            });
          }
        }
      );
      const direct =
        catalog?.ProductBrandOptions?.[0]?.flightRefs?.length ||
        flightRefs?.length ||
        1;

      const airline =
        flightsData?.CatalogProductOfferingsResponse?.ReferenceList?.[0]?.Flight?.find(
          (fl: any) => flightRefs?.[0] === fl?.id
        )?.operatingCarrierName;

      const airlineCode =
        flightsData?.CatalogProductOfferingsResponse?.ReferenceList?.[0]?.Flight?.find(
          (fl: any) => flightRefs?.[0] === fl?.id
        )?.operatingCarrier ||
        flightsData?.CatalogProductOfferingsResponse?.ReferenceList?.[0]?.Flight?.find(
          (fl: any) => flightRefs?.[0] === fl?.id
        )?.carrier;

      const price =
        catalog?.ProductBrandOptions?.[0]?.ProductBrandOffering?.[0]
          ?.BestCombinablePrice?.TotalPrice;

      const id = catalog?.id;

      if (
        !airlineSpecificData?.find(
          (air: any) =>
            air?.direct === direct && air.airlineCode === airlineCode
        )
      )
        airlineSpecificData.push({
          id,
          direct,
          price,
          airline,
          airlineCode,
        });
    }
  );

  console.log('Airline Specific Data', airlineSpecificData);

  return (
    <div className="min-h-[60dvw] overflow-x-hidden">
      <Navbar />

      <div className="bg-blue-600 h-fit w-full relative">
        <ModifyFlight
          searchParams={location.state || {}}
          setFlightsData={setFlightsData}
          // setBrands={setBrands}
          // setCatalogProducts={setCatalogProducts}
          // setTermsAndConditions={setTermsAndConditions}
          // setFlights={setFlights}
          // setProducts={setProducts}
        />
      </div>

      {/* The filters object can now be used here */}
      {flightsData ? (
        <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start w-full">
          <FlightFilters setFilters={setFilters} />
          <FlightBox
            filters={filters}
            airlines={airlines}
            airlineSpecificData={airlineSpecificData}
            flightsData={flightsData}
            // catalogProducts={catalogProducts}
            // products={products}
            // termsAndConditions={termsAndConditions}
            // brands={brands}
          />
        </div>
      ) : (
        <div className="flex justify-between my-10 mx-auto px-10 overflow-hidden">
          <div className="border rounded-2xl overflow-hidden py-5">
            <Skeleton className="w-[95dvw] h-[20dvh] md:w-[40dvw] rounded-full" />
            <Skeleton className="w-[95dvw] h-[20dvh] md:w-[40dvw] rounded-full" />
            <Skeleton className="w-[95dvw] h-[20dvh] md:w-[40dvw] rounded-full" />
          </div>
          <div className="hidden md:inline-block border rounded-2xl overflow-hidden py-5">
            <Skeleton className="h-[20dvh] w-[50dvw] rounded-full" />
            <Skeleton className="h-[20dvh] w-[50dvw] rounded-full" />
            <Skeleton className="h-[20dvh] w-[50dvw] rounded-full" />
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
