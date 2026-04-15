import { motion } from 'motion/react';
import { Bike, Truck, Gift, Star, Wallet, CheckCircle2, PhoneCall, ShieldCheck, MapPin, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CONTACT_DETAILS } from '../constants';

import AboutSection from '../components/AboutSection';

const features = [
  {
    icon: Truck,
    title: 'Doorstep Service',
    description: 'We bring the showroom to you. Documentation, RTO, and delivery handled at your home.',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Bike,
    title: 'Wide Range',
    description: 'Extensive collection of motorcycles and scooters for everyone - Gents & Ladies.',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Gift,
    title: 'Exclusive Offers',
    description: 'Enjoy cashback offers and exciting gifts with every purchase to make it rewarding.',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Wallet,
    title: 'Easy Finance',
    description: 'Quick approvals for Bank Loans and Private Finance with flexible EMI options.',
    color: 'bg-green-50 text-green-600',
  },
];

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800';

export default function About() {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    // Temporarily disabled fallback to verify original images
    // e.currentTarget.src = FALLBACK_IMAGE;
    console.error("Image failed to load:", e.currentTarget.src);
  };

  return (
    <div className="pt-32 pb-24 space-y-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative bg-gray-900 py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=2000" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
            onError={handleImageError}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight">
              About <span className="text-red-600">Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto font-medium">
              Your ultimate destination for all things two-wheeler in Tambaram, Chennai.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <AboutSection />

      {/* Doorstep Service Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, order: 2 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="lg:order-2 space-y-8"
            >
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900">Friendly Customer Service</h2>
                <p className="text-lg text-gray-600">
                  Our commitment to customer satisfaction goes <strong>beyond the showroom</strong> — we bring our services <strong>right to your doorstep</strong>.
                </p>
              </div>
              <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 space-y-6">
                <p className="text-gray-700 font-medium">
                  Imagine this: You are at home, relaxed, and thinking about owning your dream bike. No need to visit the showroom or deal with complex paperwork.
                </p>
                <div className="space-y-4">
                  <h4 className="font-bold text-red-600 flex items-center">
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    That's where Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom makes it easy.
                  </h4>
                  <ul className="space-y-3">
                    {['Just give us a call', 'Our executives will reach you anywhere in Chennai', 'We handle Documentation & RTO Registration'].map((item, i) => (
                      <li key={i} className="flex items-center text-gray-600">
                        <span className="w-2 h-2 bg-red-600 rounded-full mr-3"></span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="lg:order-1 relative"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="/interior-adinath.png" 
                  alt="Showroom Interior" 
                  className="w-full h-auto"
                  referrerPolicy="no-referrer"
                  onError={handleImageError}
                />
                {/* Watermark Overlay Badge */}
                <div className="absolute bottom-6 right-6 bg-red-600 text-white p-4 rounded-full shadow-xl flex items-center justify-center border-2 border-white">
                  <Star className="w-8 h-8 fill-current" />
                </div>
                <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border border-white/20">
                  Premium Experience
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className={`w-14 h-14 rounded-2xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="h-7 w-7" />
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-red-600 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full -mr-48 -mt-48 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Why Choose Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom?</h2>
            <p className="text-red-100 max-w-2xl mx-auto">
              We are proud to be one of the most reliable multi-brand two-wheeler showrooms in Tambaram, Chennai.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: ShieldCheck, title: 'Trusted & Reliable', desc: 'Complete support from enquiry to delivery.' },
              { icon: MapPin, title: 'Doorstep Assistance', desc: 'Hassle-free experience right at your home.' },
              { icon: Users, title: 'Complete Support', desc: 'Professionalism and efficiency in every step.' }
            ].map((item, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 text-center text-white">
                <item.icon className="h-10 w-10 mx-auto mb-4 text-red-200" />
                <h4 className="text-xl font-bold mb-2">{item.title}</h4>
                <p className="text-red-100 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Finance Section Highlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gray-900 rounded-[3rem] p-8 md:p-20 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                Easy Finance Options <br />
                <span className="text-red-600">No Budget Worries!</span>
              </h2>
              <p className="text-gray-400 text-lg">
                Our team ensures quick approvals and guaranteed loan assistance with plans that suit your budget perfectly.
              </p>
              <div className="flex flex-wrap gap-4">
                {['Bank Loans', 'Private Finance', 'Flexible EMI'].map((tag) => (
                  <span key={tag} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm p-8 rounded-3xl border border-white/10 space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center">
                <Wallet className="mr-3 text-red-600" />
                Loan Assistance
              </h4>
              <ul className="space-y-4">
                {['Quick Approvals', 'Guaranteed Assistance', 'Budget-Friendly Plans'].map((item, i) => (
                  <li key={i} className="flex items-center text-gray-300">
                    <CheckCircle2 className="mr-3 h-5 w-5 text-green-500" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link 
                to="/contact" 
                className="block w-full py-4 bg-red-600 text-white text-center font-bold rounded-xl hover:bg-red-700 transition-colors"
              >
                Check Eligibility
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900">Start Your Ride Today</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experience the thrill of owning your dream two-wheeler with Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom. 
            Just make one call, and we'll bring your dream bike to your doorstep.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href={`tel:${CONTACT_DETAILS.phones.sales[0]}`}
              className="inline-flex items-center justify-center px-8 py-4 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition-all shadow-lg"
            >
              <PhoneCall className="mr-2 h-5 w-5" />
              Call Now
            </a>
            <Link 
              to="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white font-bold rounded-xl hover:bg-gray-800 transition-all shadow-lg"
            >
              Visit Showroom
            </Link>
          </div>
          <p className="text-sm font-bold text-red-600 uppercase tracking-widest">
            Ride without hassle. Ride with confidence.
          </p>
        </div>
      </section>
    </div>
  );
}
