import { ModifyFlight } from '../../components/modify-search/flight-search';
import { Navbar } from '../../components/navbar/navbar';
import { FlightBox } from '../../components/flight';
import { useState } from 'react';
import { FlightFilters } from '../../components/search-filters';
import Footer from '../../components/footer/footer';
import { useLocation } from 'react-router-dom';

export default function FlightPage() {
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

  return (
    <div className="min-h-[60dvw]">
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
      {flightsData && (
        <div className="flex flex-col md:flex-row justify-evenly items-center md:items-start w-full">
          <FlightFilters setFilters={setFilters} />
          <FlightBox
            filters={filters}
            // flights={flights}
            flightsData={flightsData}
            // catalogProducts={catalogProducts}
            // products={products}
            // termsAndConditions={termsAndConditions}
            // brands={brands}
          />
        </div>
      )}
      <Footer />
    </div>
  );
}
