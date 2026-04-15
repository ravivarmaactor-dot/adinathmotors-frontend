import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';

const brands = ['Yamaha', 'Hero', 'Honda', 'TVS', 'Bajaj', 'Royal Enfield', 'Suzuki', 'Aprilia', 'Ather', 'Ola', 'Vida', 'Ampere'];

interface AboutSectionProps {
  isShortened?: boolean;
}

export default function AboutSection({ isShortened = false }: AboutSectionProps) {
  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${isShortened ? 'py-24' : ''}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest flex items-center">
              <span className="w-8 h-[2px] bg-red-600 mr-3"></span>
              Welcome to Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom
            </h2>
            <h3 className="text-4xl font-bold text-gray-900 leading-tight">
              {isShortened ? 'About Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom' : 'One-Stop Showroom for Motorcycles & Scooters'}
            </h3>
          </div>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-600 leading-relaxed">
              Welcome to <strong>Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom</strong>, your ultimate destination for all things two-wheeler in Tambaram, Chennai. 
              We take pride in catering to every need and preference, offering a wide range of options from the world's leading brands.
            </p>
            
            <p className="text-lg text-gray-600 leading-relaxed">
              With years of experience in the automotive industry, we have established ourselves as a trusted name for quality vehicles and exceptional service. Our showroom features the latest models from top manufacturers, ensuring that you find the perfect ride that matches your style and requirements.
            </p>

            {!isShortened && (
              <>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom, we believe in building long-term relationships with our customers. Our dedicated team of professionals is always ready to assist you with expert advice, easy finance options, and comprehensive after-sales support. We understand that buying a two-wheeler is a significant decision, and we are here to make it as smooth and enjoyable as possible.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our commitment to excellence extends beyond sales. We offer state-of-the-art service facilities and genuine spare parts to keep your vehicle in peak condition. Whether you are looking for a fuel-efficient commuter or a powerful performance machine, Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom is your partner in every mile.
                </p>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-3">
            {brands.map((brand) => (
              <span key={brand} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-bold border border-gray-200">
                {brand}
              </span>
            ))}
          </div>
          
          <p className="text-gray-500 italic">👉 We've got you covered with a wide range of options.</p>

          {isShortened && (
            <Link
              to="/about"
              className="inline-flex items-center text-red-600 font-bold hover:text-red-700 transition-colors group"
            >
              Read More About Us
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-red-600/10 rounded-3xl -rotate-2"></div>
          <div className="relative rounded-2xl overflow-hidden shadow-2xl z-10">
            <img
              src="/adinathextrioer.png"
              alt="Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom"
              className="w-full h-auto"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Temporarily disabled fallback
                // e.currentTarget.src = 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=800';
                console.error("Image failed to load:", e.currentTarget.src);
              }}
            />
            {/* Watermark Overlay Badge */}
            <div className="absolute bottom-4 right-4 bg-red-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center border-2 border-white animate-pulse">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border border-white/20">
              Official Showroom
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
