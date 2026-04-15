import ContactForm from '../components/ContactForm';
import { Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, UserCog, Headphones } from 'lucide-react';
import { motion } from 'motion/react';
import { CONTACT_DETAILS } from '../constants';

const contactSections = [
  {
    icon: Phone,
    title: 'Sales & Enquiries',
    items: CONTACT_DETAILS.displayPhones.sales.map((p, i) => ({
      label: p,
      href: `tel:${CONTACT_DETAILS.phones.sales[i]}`
    })),
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: ShieldCheck,
    title: 'RTO Department',
    items: CONTACT_DETAILS.displayPhones.rto.map((p, i) => ({
      label: p,
      href: `tel:${CONTACT_DETAILS.phones.rto[i]}`
    })),
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: UserCog,
    title: 'Management',
    items: CONTACT_DETAILS.displayPhones.manager.map((p, i) => ({
      label: p,
      href: `tel:${CONTACT_DETAILS.phones.manager[i]}`
    })),
    color: 'bg-amber-50 text-amber-600',
  },
  {
    icon: Headphones,
    title: 'Complaints (Call/WA)',
    items: [{
      label: CONTACT_DETAILS.displayPhones.complaint,
      href: `tel:${CONTACT_DETAILS.phones.complaint}`
    }],
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Mail,
    title: 'Email Us',
    items: [{
      label: CONTACT_DETAILS.email,
      href: `mailto:${CONTACT_DETAILS.email}`
    }],
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: Clock,
    title: 'Working Hours',
    items: [
      { label: `Mon - Fri: ${CONTACT_DETAILS.openingHours.monFri}` },
      { label: `Sat: ${CONTACT_DETAILS.openingHours.sat}` },
      { label: `Sun: ${CONTACT_DETAILS.openingHours.sun}` },
    ],
    color: 'bg-purple-50 text-purple-600',
  },
];

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      {/* Header */}
      <section className="bg-gray-50 py-20 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Contact Us</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Visit our showroom in West Tambaram or reach out to our team for any assistance.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Details */}
          <div className="lg:col-span-1 space-y-8">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <MessageSquare className="h-6 w-6 text-red-600" />
                <span>Contact Information</span>
              </h2>
              <div className="p-6 rounded-2xl bg-gray-50 border border-gray-100 space-y-3">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-6 w-6 text-red-600 shrink-0 mt-1" />
                  <div className="text-sm text-gray-700 leading-relaxed">
                    <p className="font-bold text-gray-900">{CONTACT_DETAILS.brandName}</p>
                    <p>{CONTACT_DETAILS.address.line1}</p>
                    <p>{CONTACT_DETAILS.address.line2}</p>
                    <p>{CONTACT_DETAILS.address.city}</p>
                    <p className="text-gray-500 italic">{CONTACT_DETAILS.address.landmark}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {contactSections.map((item) => (
                <div key={item.title} className="flex items-start space-x-4 p-4 rounded-xl border border-gray-100 hover:border-red-100 hover:bg-red-50/30 transition-all group">
                  <div className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h4>
                    {item.items.map((detail, idx) => (
                      detail.href ? (
                        <a 
                          key={idx} 
                          href={detail.href}
                          className="block text-sm text-gray-600 hover:text-red-600 transition-colors"
                        >
                          {detail.label}
                        </a>
                      ) : (
                        <p key={idx} className="text-sm text-gray-600">{detail.label}</p>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-2xl shadow-gray-200/50 border border-gray-100 p-8 md:p-12">
              <div className="mb-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                <p className="text-gray-500">Fill out the form below and our representative will contact you shortly.</p>
              </div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="w-full h-[450px] bg-gray-200 rounded-3xl overflow-hidden shadow-lg">
          <iframe
            src="https://maps.google.com/maps?q=Adinath%20Motors%20No.%20650A%2C%20Mudichur%20Road%2C%20Krishna%20Nagar%2C%20West%20Tambaram%2C%20Chennai%20600045&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="Adinath Motors – Multi Brand Two Wheelers and Electric Scooter Showroom Location"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
