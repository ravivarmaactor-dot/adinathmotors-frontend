import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Settings, Award, Users, ArrowRight, X, Phone, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_DETAILS } from '../constants';
import FinanceSection from '../components/FinanceSection';
import { useState } from 'react';

const categories = [
  { name: 'Commuter Bikes', image: '/commuter.png' },
  { name: 'Sports Motorcycles', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600' },
  { name: 'Cruiser Bikes', image: '/re1.png' },
  { name: 'Family Scooters', image: '/activablue.png' },
  { name: 'Electric Scooters', image: '/atherelec.png' },
  { name: 'Adventure Tourers', image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600' },
  { name: 'Executive Segment', image: '/do.png' },
  { name: 'Performance Scooters', image: '/buman.jpg' },
  { name: 'Retro Classics', image: '/bulletr.png' },
  { name: 'Off-Road/Dirt Bikes', image: '/hero.jpeg' },
  { name: 'Premium Motorcycles', image: 'https://images.unsplash.com/photo-1558981359-219d6364c9c8?auto=format&fit=crop&q=80&w=600' },
  { name: 'High-Speed Electric', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&q=80&w=600' },
];

const features = [
  {
    icon: Shield,
    title: 'Multi-brand Showroom',
    description: 'Explore a wide range of motorcycles and scooters from all leading Indian brands under one roof.',
  },
  {
    icon: Award,
    title: 'Best Price Deals',
    description: 'We offer the most competitive prices and exclusive showroom discounts on all models.',
  },
  {
    icon: Users,
    title: 'Finance Options',
    description: 'Easy finance assistance with low interest rates and flexible EMI options available.',
  },
  {
    icon: Settings,
    title: 'Trusted Service',
    description: 'Expert maintenance and genuine parts to keep your two-wheeler in peak condition.',
  },
];

const services = [
  {
    title: 'New Vehicle Sales',
    image: '/salesman.png',
    description: 'Explore the latest motorcycles and scooters with cutting-edge technology and safety features.',
  },
  {
    title: 'Electric Scooter Sales',
    image: '/electricrange.png',
    description: 'Go green with our exclusive range of high-performance electric scooters from Ather and Ola.',
  },
  {
    title: 'Finance & Exchange',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800',
    description: 'Easy finance assistance and best exchange offers for your old two-wheeler.',
  },
];

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800';

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showSalesModal, setShowSalesModal] = useState(false);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Temporarily disabled fallback to verify original images
    // e.currentTarget.src = FALLBACK_IMAGE;
    console.error("Image failed to load:", e.currentTarget.src);
  };

  const handleCategoryClick = (categoryName: string) => {
    if (categoryName === 'Commuter Bikes') {
      setSelectedImage('/about-us-main.png');
    } else if (categoryName === 'Cruiser Bikes') {
      setSelectedImage('/re.png');
    }
  };

  return (
    <div className="space-y-24 pb-24">
      <Hero />

      <AboutSection isShortened={true} />

      {/* Sales Contact Modal */}
      <AnimatePresence>
        {showSalesModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowSalesModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-red-600 p-8 text-white text-center relative">
                <button 
                  onClick={() => setShowSalesModal(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold">Sales & Enquiries</h3>
                <p className="text-red-100 mt-2 text-sm">Get in touch with our sales team for the best exchange value.</p>
              </div>
              <div className="p-8 space-y-4">
                {CONTACT_DETAILS.displayPhones.sales.map((phone, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100 group hover:border-red-200 transition-colors">
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Sales Executive {idx + 1}</p>
                      <p className="text-xl font-black text-gray-900">{phone}</p>
                    </div>
                    <div className="flex gap-2">
                      <a 
                        href={`tel:${CONTACT_DETAILS.phones.sales[idx]}`}
                        className="p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200"
                        title="Call Now"
                      >
                        <Phone className="w-5 h-5" />
                      </a>
                      <a 
                        href={`https://wa.me/91${CONTACT_DETAILS.phones.sales[idx]}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors shadow-lg shadow-green-200"
                        title="WhatsApp"
                      >
                        <MessageSquare className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => setShowSalesModal(false)}
                  className="w-full py-4 text-gray-500 font-bold hover:text-gray-900 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-10"
            onClick={() => setSelectedImage(null)}
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white hover:text-red-500 transition-colors z-[110]"
            >
              <X className="w-10 h-10" />
            </motion.button>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="All Models"
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
                onError={handleImageError}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Product Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Upgrade Your Ride</h2>
          <h3 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight max-w-4xl mx-auto">
            Exchange Your Used Two-Wheeler or Scooter for the <span className="text-red-600">Best Price</span>
          </h3>
          <p className="text-gray-600 mt-6 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium">
            Exchange your old two-wheeler or scooter and upgrade to a brand-new motorcycle or scooter. 
            Get the best exchange value along with exciting exchange bonuses.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="group cursor-pointer"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative h-48 md:h-64 rounded-2xl overflow-hidden mb-4">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h4 className="font-bold text-gray-900 group-hover:text-red-600 transition-colors">{category.name}</h4>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest">Our Services</h2>
            <h3 className="text-4xl font-bold text-gray-900">Comprehensive Automotive Solutions</h3>
            <p className="text-gray-600">From sales to service, we provide everything you need for a seamless ownership experience.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all group"
              >
                <div className="h-64 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={handleImageError}
                  />
                </div>
                <div className="p-8 space-y-4">
                  <h4 className="text-xl font-bold text-gray-900">{service.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                  {service.title === 'Finance & Exchange' || service.title === 'Electric Scooter Sales' || service.title === 'New Vehicle Sales' ? (
                    <button 
                      onClick={() => setShowSalesModal(true)}
                      className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700 transition-colors group/btn"
                    >
                      Enquire Now
                      <ArrowRight className="ml-1 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  ) : (
                    <Link to="/contact" className="inline-flex items-center text-sm font-bold text-red-600 hover:text-red-700">
                      Enquire Now
                      <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="space-y-4"
            >
              <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-red-600" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">{feature.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Finance Section */}
      <FinanceSection />

      {/* Trust Section */}
      <section className="bg-red-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h3 className="text-3xl md:text-4xl font-bold mb-8">Ready to find your perfect ride?</h3>
          <p className="text-red-100 mb-10 max-w-2xl mx-auto">
            Join over 50,000 happy customers who have found their dream two-wheeler with {CONTACT_DETAILS.brandName}. 
            Visit our showroom at West Tambaram today for a personalized experience.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-white text-red-600 font-bold rounded-md hover:bg-gray-100 transition-all shadow-xl"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
