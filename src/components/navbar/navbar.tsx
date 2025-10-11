import logo from '../../assets/nixtour_logo.svg';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import hotelIcon from '../../assets/images/hotel-header.webp';
import visaIcon from '../../assets/images/visa-header.webp';
import transferIcon from '../../assets/images/travel insurance-header.webp';
import flightIcon from '../../assets/images/Flight-header.webp';
import holidaysIcon from '../../assets/images/holidays-header.webp';
import { Link } from 'react-router-dom';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 border-b ${
        isScrolled ? 'bg-white/70 backdrop-blur-md shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <a href="/" className="flex justify-evenly items-center mr-6">
            <img
              src={logo}
              alt="NixTour Logo"
              width={48}
              height={48}
              className="w-auto h-12"
            />
          </a>
          <div className="hidden md:flex items-center justify-between gap-8">
            {[
              { icon: flightIcon, label: 'FLIGHTS', link: '/' },
              { icon: holidaysIcon, label: 'HOLIDAYS', link: '/holiday' },
              { icon: hotelIcon, label: 'HOTELS', link: '/hotel' },
              { icon: visaIcon, label: 'VISA', link : '/visa' },
              { icon: transferIcon, label: 'TRAVEL INS.' },
            ].map(({ icon, label, link }) =>
              link ? (
                <Link
                  to={link}
                  key={label}
                  className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110 active:scale-95 text-gray-700 hover:text-[#BC1110]"
                >
                  <img
                    src={icon}
                    className="h-5 w-5 lg:h-9 lg:w-9 object-cover mb-1"
                  />
                  <span className="text-xs lg:text-sm font-semibold">
                    {label}
                  </span>
                </Link>
              ) : (
                <div
                  key={label}
                  className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110 active:scale-95 text-gray-700 hover:text-[#BC1110]"
                >
                  <img
                    src={icon}
                    className="h-5 w-5 lg:h-9 lg:w-9  object-cover mb-1"
                  />
                  <span className="text-xs lg:text-sm font-semibold">
                    {label}
                  </span>
                </div>
              )
            )}
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-6">
          {/* <NavLink href="/holiday">Holiday</NavLink> */}
          <NavLink href="https://fares.nixtour.com/online3s/UrlLandingPage.aspx?langcode=GB&ReqType=BOOKINGSTATUS&comid=KN2182&webid=13671">
            Manage Booking
          </NavLink>
          <NavLink href="https://agents.nixtour.com/B2BDashBoard/asp/Login.aspx">
            Agent Login
          </NavLink>
          <NavLink href=" https://fares.nixtour.com/Online3s/UrlLandingPage.aspx?ReqType=agt&comid=KN2182&webid=13671&langCode=GB&callfrom=true">
            Agency Signup
          </NavLink>
        </nav>
        <button
          className="md:hidden p-2 text-primary hover:text-[#8B0000] transition-colors duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden px-4">
          <div className="flex items-center justify-evenly gap-4">
            {[
              { icon: flightIcon, label: 'FLIGHTS', link: '/' },
              { icon: holidaysIcon, label: 'HOLIDAYS', link: '/holiday' },
              { icon: hotelIcon, label: 'HOTELS', link: '/hotel' },
              { icon: visaIcon, label: 'VISA', link: '/visa' },
              { icon: transferIcon, label: 'TRAVEL INS.' },
            ].map(({ icon, label, link }) =>
              link ? (
                <Link
                  to={link}
                  key={label}
                  className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110 active:scale-95 text-gray-700 hover:text-[#BC1110]"
                >
                  <img src={icon} className="h-9 w-9 object-cover mb-1" />
                  <span className="text-xs md:text-sm font-semibold">
                    {label}
                  </span>
                </Link>
              ) : (
                <div
                  key={label}
                  className="flex flex-col items-center cursor-pointer transition-transform transform hover:scale-110 active:scale-95 text-gray-700 hover:text-[#BC1110]"
                >
                  <img src={icon} className="h-8 w-8 object-cover mb-1" />
                  <span className="text-xs md:text-sm font-semibold">
                    {label}
                  </span>
                </div>
              )
            )}
          </div>
          <nav className="flex flex-col space-y-4 px-4 py-6 bg-white/90 backdrop-blur-md">
            <NavLink href="https://fares.nixtour.com/online3s/UrlLandingPage.aspx?langcode=GB&ReqType=BOOKINGSTATUS&comid=KN2182&webid=13671">
              Manage Booking
            </NavLink>
            <NavLink href="https://agents.nixtour.com/B2BDashBoard/asp/Login.aspx">
              Agent Login
            </NavLink>
            <NavLink href=" https://fares.nixtour.com/Online3s/UrlLandingPage.aspx?ReqType=agt&comid=KN2182&webid=13671&langCode=GB&callfrom=true">
              Agency Signup
            </NavLink>
          </nav>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      className="text-base font-bold text-primary hover:text-[#8B0000] transition-colors duration-200"
    >
      {children}
    </a>
  );
}
