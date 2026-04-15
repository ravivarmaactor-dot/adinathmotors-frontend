import { motion } from 'motion/react';
import { Landmark, Zap, FileText, Wallet, HandCoins, MessageCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CONTACT_DETAILS } from '../constants';

const badges = [
  'Up to 90% Loan Available',
  'Spot Finance Available',
  'Quick Approval',
  'Minimum Documentation'
];

const partners = [
  'L&T Finance',
  'Shriram Finance',
  'TVS Credit',
  'Bajaj Finance',
  'Hero FinCorp',
  'Tata Capital',
  'IDFC First Bank',
  'Hinduja Leyland Finance'
];

export default function FinanceSection() {
  return (
    <section className="py-24 bg-white overflow-hidden" id="finance">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-bold text-red-600 uppercase tracking-widest"
          >
            Finance Options
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-gray-900"
          >
            Easy Finance to Buy Your Dream Two Wheeler
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 text-lg"
          >
            Get instant approvals with leading finance partners. Ride home your dream bike or scooter today.
          </motion.p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap justify-center gap-4 mb-20">
          {badges.map((badge, index) => (
            <motion.div
              key={badge}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="px-6 py-2 bg-red-50 text-red-700 rounded-full text-sm font-bold border border-red-100 flex items-center shadow-sm"
            >
              <Zap className="w-4 h-4 mr-2 fill-red-600" />
              {badge}
            </motion.div>
          ))}
        </div>

        {/* Private Finance Banner */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative mb-24 rounded-3xl overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-gray-900 p-8 md:p-16 shadow-2xl"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                <HandCoins className="text-white w-6 h-6" />
                <span className="text-white font-bold uppercase tracking-wider text-sm">Instant Approval</span>
              </div>
              <h4 className="text-4xl md:text-6xl font-black text-white leading-tight">
                Private Finance <br />
                <span className="text-red-200 italic">Available</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  { icon: Zap, text: 'Fast Approval' },
                  { icon: Wallet, text: 'Flexible EMI' },
                  { icon: FileText, text: 'Easy Eligibility' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 text-white/90">
                    <item.icon className="w-5 h-5 text-red-300" />
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <a 
                href="/contact" 
                className="px-8 py-4 bg-white text-red-600 font-bold rounded-xl hover:bg-gray-100 transition-all text-center shadow-lg flex items-center justify-center group"
              >
                Apply for Finance
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={`https://wa.me/${CONTACT_DETAILS.phones.complaint}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-green-500 text-white font-bold rounded-xl hover:bg-green-600 transition-all text-center shadow-lg flex items-center justify-center"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                Get Loan Assistance
              </a>
            </div>
          </div>
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-400/10 rounded-full -ml-32 -mb-32 blur-3xl" />
        </motion.div>

        {/* Finance Partners Grid */}
        <div className="space-y-12">
          <div className="text-center">
            <h4 className="text-2xl font-bold text-gray-900">Our Trusted Finance Partners</h4>
            <p className="text-gray-500 mt-2">Choose from the best financial institutions in India</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-gray-50 p-8 rounded-2xl border border-gray-100 flex flex-col items-center justify-center text-center group hover:bg-white hover:shadow-xl hover:border-red-100 transition-all cursor-default"
              >
                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Landmark className="w-6 h-6 text-red-600" />
                </div>
                <span className="font-bold text-gray-800 text-sm md:text-base">{partner}</span>
                <div className="mt-3 flex items-center text-[10px] text-green-600 font-bold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Verified Partner
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SEO Keywords (Hidden but present for crawlers) */}
        <div className="sr-only">
          <h2>Two wheeler finance Chennai</h2>
          <p>Looking for bike loan near me? Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom offers the best scooter EMI options Chennai.</p>
          <p>Electric scooter finance available with low down payment bike loan options.</p>
        </div>
      </div>
    </section>
  );
}
