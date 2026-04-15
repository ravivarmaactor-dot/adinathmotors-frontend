import { motion } from 'motion/react';
import { Phone } from 'lucide-react';

export default function AnnouncementBar() {
  const announcement = "🚚 Doorstep Service Available Anywhere in Chennai | Low CIBIL Score? Don’t worry — we’ll try our best to get your two-wheeler finance approved. 📞 Call 97105 03187 – Low CIBIL Finance Team";

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-red-600 text-white h-10 flex items-center overflow-hidden border-b border-red-500 shadow-md">
      <div className="relative flex items-center w-full">
        {/* Marquee Container */}
        <div className="flex-grow overflow-hidden whitespace-nowrap">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: "-100%" }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="inline-block pl-[100%]"
          >
            <span className="text-sm font-bold tracking-wide py-2 inline-block">
              {announcement}
            </span>
          </motion.div>
        </div>

        {/* Call Button - Fixed on the right for quick access */}
        <div className="flex-shrink-0 bg-red-700 h-10 px-4 flex items-center border-l border-red-500/50 shadow-[-10px_0_15px_rgba(0,0,0,0.1)]">
          <a
            href="tel:9710503187"
            className="flex items-center space-x-2 text-xs font-black uppercase tracking-tighter hover:text-red-200 transition-colors"
          >
            <Phone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Call Now</span>
            <span className="sm:hidden">Call</span>
          </a>
        </div>
      </div>
    </div>
  );
}
