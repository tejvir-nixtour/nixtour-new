import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import GroupBooking from '../pages/group-booking';
import AboutUs from '../pages/about-us';
import PrivacyPolicy from '../pages/privacy-policy';
import ContactUs from '../pages/contact-us';
import TermsConditions from '../pages/terms-conditions';
import Header from '../pages/header';
import Footer from '../pages/footer';
import AirlineDetails from '../pages/airline-details';

import OfferDetails from '../pages/offer-details';
import Offers from '../pages/offers';
import DomesticFlights from '../pages/domestic-flights';
import CanonicalTag from '../components/canonicalTag';
import PackageDetails from '../pages/holiday-package-details';
import HolidayLandingPage from '../pages/holiday-landing-page';
import GroupBookingDetails from '../pages/group-booking-details';
import Hotel from '../pages/hotel/hotel';
import B2bagents from '../pages/b2bagents/B2bagents';
import Visa from '../pages/visa/visa';
import VisaCountryDetail from '../pages/visa/[country]';
import HolidaySearchResults from '../pages/holiday-landing-page/HolidaySearchResults';
import InternationalFlights from '../pages/international-flights/index';
import EnquiryPage from '../pages/enquiry';
import LatestNewsPage from '../pages/news';
import NewsDetailsPage from '../pages/news/[slug]';
import ScrollToTop from '../components/ScrollToTop';
import ServicePage from '../pages/service';
import HolidayRouteHandler from '../components/HolidayRouteHandler';
import Popup from '../components/Popup/Popup';
import FlightRouteDetailsPage from '../pages/flight-route-details';

// New Page

import FlightPage from '../pages/new-pages';
import { Analytics } from '@vercel/analytics/react';

const Home = React.lazy(() => import('../pages/home'));
const Router: React.FC = () => {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Popup />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <CanonicalTag />
                  <Helmet>
                    <title>
                      {' '}
                      Book Flight Tickets, Hotels, Visa & Insurance Online -
                      Nixtour{' '}
                    </title>
                    <meta
                      name="description"
                      content="Book flight tickets, hotels, visa, and insurance online with Nixtour. Get the best deals on domestic and international flights, hotels, visa, and insurance."
                    />
                  </Helmet>
                  <Home />
                </>
              }
            />
            <Route
              path="/holiday"
              element={
                <>
                  <CanonicalTag />
                  <Helmet>
                    <title>
                      {' '}
                      Book Flight Tickets, Hotels, Visa & Insurance Online -
                      Nixtour{' '}
                    </title>
                  </Helmet>
                  <HolidayLandingPage />
                </>
              }
            />
            {/* <Route
            path="/holiday/search-results"
            element={
              <>
                <CanonicalTag />
                <Helmet>
                  <title>Holiday Search Results - Nixtour</title>
                </Helmet>
                <HolidaySearchResults />
              </>
            }
          /> */}
            <Route
              path="/holiday/search/:slug"
              element={
                <>
                  <CanonicalTag />
                  <Helmet>
                    <title>Holiday Search Results - Nixtour</title>
                  </Helmet>
                  <HolidaySearchResults />
                </>
              }
            />
            <Route
              path="/group-booking"
              element={
                <>
                  <Helmet>
                    <title>Nixtour - Group Booking</title>
                    <meta
                      name="description"
                      content="Looking to book air tickets for 9 or more passengers? Nixtour offers excellent deals on group bookings with top airlines like Aeroflot, Uzbekistan Airways, Air India, IndiGo, Emirates, Etihad, Singapore Airlines, and many more"
                    />
                  </Helmet>
                  <CanonicalTag />
                  <GroupBooking />
                </>
              }
            />
            <Route
              path="/group-booking/:groupBookingName"
              element={
                <>
                  <CanonicalTag />
                  <GroupBookingDetails />
                </>
              }
            />
            <Route
              path="/about-us"
              element={
                <>
                  <Helmet>
                    <title>Nixtour - About Us</title>
                    <meta
                      name="description"
                      content="Nixtour offers flight tickets, hotels, travel insurance, holiday packages, and visa services for a seamless travel experience. Contact us now!"
                    />
                  </Helmet>
                  <CanonicalTag />
                  <AboutUs />
                </>
              }
            />
            <Route
              path="/privacy-policy"
              element={
                <>
                  <Helmet>
                    <title>Nixtour - Privacy Policy</title>
                    <meta
                      name="description"
                      content="At Nixtour, we prioritize your privacy. Our Privacy Policy details how we collect, use, and protect your personal information for a secure travel experience."
                    />
                  </Helmet>
                  <CanonicalTag />
                  <PrivacyPolicy />
                </>
              }
            />
            <Route
              path="/contact-us"
              element={
                <>
                  <Helmet>
                    <title>Nixtour - Contact Us</title>
                  </Helmet>
                  <CanonicalTag />
                  <ContactUs />
                </>
              }
            />
            <Route
              path="/user-agreement"
              element={
                <>
                  <Helmet>
                    <title>Nixtour - Terms & Conditions</title>
                    <meta
                      name="description"
                      content="Nixtour's Terms & Conditions outline the rules for using our services, bookings, and travel experiences. Please review them carefully for essential information."
                    />
                  </Helmet>
                  <CanonicalTag />
                  <TermsConditions />
                </>
              }
            />
            <Route
              path="/flights/klm-airlines"
              element={
                <Navigate to="/flights/klm-royal-dutch-airlines" replace />
              }
            />
            <Route
              path="/flights/:airlineName"
              element={
                <>
                  <CanonicalTag />
                  <AirlineDetails />
                </>
              }
            />
            <Route
              path="/offer"
              element={
                <>
                  <Helmet>
                    <title>Nixtour - Offers</title>
                    <meta
                      name="description"
                      content="Discover amazing travel offers and deals with Nixtour. Save on flights, hotels, and holiday packages."
                    />
                  </Helmet>
                  <CanonicalTag />
                  <Offers />
                </>
              }
            />
            <Route
              path="/domesticflights"
              element={
                <>
                  <Helmet>
                    <title>Nixtour - Domestic Flights</title>
                    <meta
                      name="description"
                      content="Book domestic flights across India with Nixtour. Find the best deals on domestic air travel with top airlines."
                    />
                  </Helmet>
                  <CanonicalTag />
                  <DomesticFlights />
                </>
              }
            />
            <Route
              path="/internationalflights"
              element={
                <>
                  <Helmet>
                    <title>Nixtour - International Flights</title>
                    <meta
                      name="description"
                      content="Book international flights with Nixtour. Find the best deals on international air travel with top airlines."
                    />
                  </Helmet>
                  <CanonicalTag />
                  <InternationalFlights />
                </>
              }
            />
            <Route
              path="/offer/:offerId"
              element={
                <>
                  <CanonicalTag />
                  <OfferDetails />
                </>
              }
            />
            <Route
              path="/holiday/:packageName/:filterSlug"
              element={
                <>
                  <CanonicalTag />
                  <PackageDetails />
                </>
              }
            />
            <Route
              path="/holiday/*"
              element={
                <>
                  <CanonicalTag />
                  <HolidayRouteHandler />
                </>
              }
            />
            <Route
              path="/holidays/*"
              element={
                <>
                  <CanonicalTag />
                  <HolidaySearchResults />
                </>
              }
            />
            <Route
              path="/hotel"
              element={
                <>
                  <CanonicalTag />
                  <Hotel />
                </>
              }
            />
            <Route
              path="/visa"
              element={
                <>
                  <CanonicalTag />
                  <Visa />
                </>
              }
            />
            <Route
              path="/visa/:country"
              element={
                <>
                  <CanonicalTag />
                  <VisaCountryDetail />
                </>
              }
            />
            <Route path="/b2bagents" element={<B2bagents />} />
            <Route path="/enquiry" element={<EnquiryPage />} />
            <Route path="/news" element={<LatestNewsPage />} />
            <Route path="/news/:slug" element={<NewsDetailsPage />} />
            <Route
              path="/service"
              element={
                <>
                  <Helmet>
                    <title>
                      NixTour Services - Flight Bookings, Hotels, Visa & Travel
                      Solutions
                    </title>
                    <meta
                      name="description"
                      content="Discover NixTour's comprehensive travel services including flight bookings, hotel reservations, visa assistance, travel insurance, and holiday packages. Your trusted travel partner in India."
                    />
                  </Helmet>
                  <CanonicalTag />
                  <ServicePage />
                </>
              }
            />
            <Route path="/header" element={<Header />} />
            <Route path="/footer" element={<Footer />} />

            {/* Flight Route Details - Catch dynamic flight route URLs */}
            <Route
              path="/flight-routes/*"
              element={
                <>
                  <CanonicalTag />
                  <FlightRouteDetailsPage />
                </>
              }
            />

            {/* New Routes */}

            <Route path="/flight-search" element={<FlightPage />} />
            <Route path="/analytics" element={<Analytics />} />

            {/* Catch all remaining routes and determine if they're flight routes or 404 */}
            <Route
              path="*"
              element={
                <>
                  <CanonicalTag />
                  <FlightRouteDetailsPage />
                </>
              }
            />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </HelmetProvider>
  );
};

export default Router;
