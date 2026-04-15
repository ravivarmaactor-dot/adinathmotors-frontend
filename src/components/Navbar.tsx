import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car } from 'lucide-react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About Us', path: '/about' },
  { name: 'Contact Us', path: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={cn(
        'fixed top-10 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            {!logoError ? (
              <img 
                src="/logo.png" 
                alt="" 
                onError={() => {
                  // Temporarily disabled fallback
                  // setLogoError(true)
                  console.error("Logo failed to load");
                }}
                className="h-10 md:h-12 w-auto transition-all object-contain"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex items-center space-x-2">
                <Car className={cn("h-8 w-8", isScrolled ? "text-red-600" : "text-white")} />
                <span className={cn("text-xl font-bold tracking-tight", isScrolled ? "text-gray-900" : "text-white")}>
                  ADINATH MOTORS <span className="hidden lg:inline text-sm opacity-80 font-medium ml-1">– Multi Brand Showroom</span>
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-red-500',
                  location.pathname === link.path
                    ? 'text-red-600'
                    : isScrolled ? 'text-gray-600' : 'text-gray-400/90'
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                'p-2 rounded-md transition-colors',
                isScrolled ? 'text-gray-900 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              )}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-xl absolute top-full left-0 right-0 py-4 px-4 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block px-3 py-2 rounded-md text-base font-medium transition-colors',
                location.pathname === link.path
                  ? 'bg-red-50 text-red-600'
                  : 'text-gray-700 hover:bg-gray-50 hover:text-red-600'
              )}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
