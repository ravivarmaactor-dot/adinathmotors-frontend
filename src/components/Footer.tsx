import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Car, Clock } from 'lucide-react';
import { CONTACT_DETAILS } from '../constants';

export default function Footer() {
  const [logoError, setLogoError] = useState(false);

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              {!logoError ? (
                <img 
                  src="/logo.png" 
                  alt="" 
                  onError={() => {
                    // Temporarily disabled fallback
                    // setLogoError(true)
                    console.error("Footer logo failed to load");
                  }}
                  className="h-12 md:h-14 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex items-center space-x-2 text-white">
                  <Car className="h-8 w-8 text-red-600" />
                  <span className="text-xl font-bold tracking-tight">{CONTACT_DETAILS.brandName}</span>
                </div>
              )}
            </Link>
            <p className="text-sm leading-relaxed">
              Multi Brand Exclusive Two Wheeler Boutique. Your trusted partner for premium automotive solutions in Chennai.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/about" className="hover:text-red-500 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-red-500 transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-red-500 transition-colors">Services</a></li>
            </ul>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="text-white font-semibold mb-6">Working Hours</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-white font-medium">Mon - Sat</p>
                  <p className="text-xs opacity-80">{CONTACT_DETAILS.openingHours.monFri}</p>
                </div>
              </li>
              <li className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-red-600 shrink-0" />
                <div>
                  <p className="text-white font-medium">Sunday</p>
                  <p className="text-xs opacity-80">{CONTACT_DETAILS.openingHours.sun}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-red-600 shrink-0" />
                <span>
                  {CONTACT_DETAILS.address.line1}<br />
                  {CONTACT_DETAILS.address.line2}<br />
                  {CONTACT_DETAILS.address.city}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-red-600 shrink-0" />
                <a href={`tel:${CONTACT_DETAILS.phones.sales[0]}`} className="hover:text-red-500 transition-colors">
                  {CONTACT_DETAILS.displayPhones.sales[0]}
                </a>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-red-600 shrink-0" />
                <a href={`mailto:${CONTACT_DETAILS.email}`} className="hover:text-red-500 transition-colors">
                  {CONTACT_DETAILS.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} {CONTACT_DETAILS.brandName}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
