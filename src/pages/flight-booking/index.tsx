import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const BookFlight = () => {
  const params = useParams();

  const { fields } = params;

  //   const [isLoading, setIsLoading] = useState(true);

  //   const [error, setError] = useState(null);

  //   const [flightDetails, setFlightDetails] = useState(null);

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
        // setFlightDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Fetch flight data based on params
    // Example: fetch(`/api/flights/${params.flightId}`)

    getFlightDetails();

    // Update flight data in the state
    // Example: setFlightData(response.data)
  }, [params]);

  return (
    <>
      <h1>Flight Booking Page</h1>
    </>
  );
};
