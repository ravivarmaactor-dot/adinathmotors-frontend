import React, { useState } from 'react';
import { Save, AlertCircle, CheckCircle2, ChevronDown } from 'lucide-react';

type MenuSection = 'global' | 'home' | 'about' | 'contact';

export default function Settings() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState<MenuSection>('global');
  
  // Global / Contact Settings
  const [globalSettings, setGlobalSettings] = useState({
    brandName: 'Adinath Motors',
    email: 'motorsadinath@gmail.com',
    phone1: '98418 84351',
    phone2: '044 22760636',
    addressLine1: 'No. 650A, Mudichur Road',
    addressLine2: 'Krishna Nagar',
    city: 'West Tambaram, Chennai 600045',
  });

  // Home Page Settings
  const [homeSettings, setHomeSettings] = useState({
    heroTitle: 'Your Journey Starts Here',
    heroSubtitle: 'Discover the thrill of the open road with our premium selection of motorcycles. Experience unmatched performance, style, and reliability.',
    section1Title: 'Upgrade Your Ride',
    section1Subtitle: 'Exchange Your Used Two-Wheeler or Scooter for the Best Price',
    section2Title: 'Our Services',
    section2Subtitle: 'Comprehensive Automotive Solutions',
  });

  // About Us Settings
  const [aboutSettings, setAboutSettings] = useState({
    title: 'Adinath Motors',
    subtitle: 'Your Trusted Multi-Brand Two-Wheeler Showroom',
    description: 'We are a premier multi-brand showroom offering a wide range of motorcycles and scooters from top brands. With years of experience and a commitment to customer satisfaction, we provide the best deals, financing options, and reliable after-sales service.',
    mission: 'To provide high-quality two-wheelers and exceptional service, making every ride a memorable experience for our customers.',
  });

  // Contact Us Settings
  const [contactSettings, setContactSettings] = useState({
    title: 'Get in Touch',
    subtitle: 'We would love to hear from you. Visit our showroom or contact us for any queries.',
    workingHours: 'Monday - Sunday: 9:00 AM - 9:00 PM',
  });

  const handleGlobalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setGlobalSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleHomeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setHomeSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleAboutChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAboutSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactSettings((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);

    try {
      // Simulate API call / Firestore save
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-6 pb-12">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Website Settings (CMS)</h1>
        <p className="mt-1 text-sm text-gray-500">Manage your website content dynamically based on frontend menus.</p>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-200 p-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Select Frontend Menu to Edit</label>
        <div className="relative">
          <select
            value={selectedMenu}
            onChange={(e) => setSelectedMenu(e.target.value as MenuSection)}
            className="appearance-none block w-full bg-gray-50 border border-gray-300 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent font-medium text-gray-900 cursor-pointer"
          >
            <option value="global">Global Settings (Contact Details)</option>
            <option value="home">Home</option>
            <option value="about">About Us</option>
            <option value="contact">Contact Us</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-xl border border-gray-100 p-6 sm:p-8">
        <form onSubmit={handleSave} className="space-y-8">
          
          {selectedMenu === 'global' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Contact Details & Global Data</h2>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    name="brandName"
                    value={globalSettings.brandName}
                    onChange={handleGlobalChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Primary Email</label>
                  <input
                    type="email"
                    name="email"
                    value={globalSettings.email}
                    onChange={handleGlobalChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number 1 (Sales)</label>
                  <input
                    type="text"
                    name="phone1"
                    value={globalSettings.phone1}
                    onChange={handleGlobalChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone Number 2 (Landline)</label>
                  <input
                    type="text"
                    name="phone2"
                    value={globalSettings.phone2}
                    onChange={handleGlobalChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>

              <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2 pt-4">Address</h2>
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address Line 1</label>
                  <input
                    type="text"
                    name="addressLine1"
                    value={globalSettings.addressLine1}
                    onChange={handleGlobalChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Address Line 2 (Area)</label>
                    <input
                      type="text"
                      name="addressLine2"
                      value={globalSettings.addressLine2}
                      onChange={handleGlobalChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">City & Pincode</label>
                    <input
                      type="text"
                      name="city"
                      value={globalSettings.city}
                      onChange={handleGlobalChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'home' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Hero Section</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hero Title</label>
                  <input
                    type="text"
                    name="heroTitle"
                    value={homeSettings.heroTitle}
                    onChange={handleHomeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Hero Subtitle</label>
                  <textarea
                    name="heroSubtitle"
                    rows={3}
                    value={homeSettings.heroSubtitle}
                    onChange={handleHomeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Categories Section</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Section Small Title</label>
                  <input
                    type="text"
                    name="section1Title"
                    value={homeSettings.section1Title}
                    onChange={handleHomeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Section Main Title</label>
                  <textarea
                    name="section1Subtitle"
                    rows={2}
                    value={homeSettings.section1Subtitle}
                    onChange={handleHomeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm resize-none"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Services Section</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Section Small Title</label>
                  <input
                    type="text"
                    name="section2Title"
                    value={homeSettings.section2Title}
                    onChange={handleHomeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Section Main Title</label>
                  <input
                    type="text"
                    name="section2Subtitle"
                    value={homeSettings.section2Subtitle}
                    onChange={handleHomeChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'about' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">About Us Content</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Main Title</label>
                  <input
                    type="text"
                    name="title"
                    value={aboutSettings.title}
                    onChange={handleAboutChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <input
                    type="text"
                    name="subtitle"
                    value={aboutSettings.subtitle}
                    onChange={handleAboutChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    name="description"
                    rows={4}
                    value={aboutSettings.description}
                    onChange={handleAboutChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Our Mission</label>
                  <textarea
                    name="mission"
                    rows={3}
                    value={aboutSettings.mission}
                    onChange={handleAboutChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {selectedMenu === 'contact' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-2">Contact Us Content</h2>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={contactSettings.title}
                    onChange={handleContactChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Subtitle</label>
                  <textarea
                    name="subtitle"
                    rows={2}
                    value={contactSettings.subtitle}
                    onChange={handleContactChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Working Hours</label>
                  <input
                    type="text"
                    name="workingHours"
                    value={contactSettings.workingHours}
                    onChange={handleContactChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-6 border-t border-gray-100 mt-8">
            {success ? (
              <div className="flex items-center text-green-600 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 mr-2" />
                {selectedMenu === 'global' ? 'Global Settings' : selectedMenu.charAt(0).toUpperCase() + selectedMenu.slice(1) + ' Content'} saved successfully.
              </div>
            ) : (
              <div />
            )}
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center items-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-bold rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 transition-colors"
            >
              {loading ? 'Saving...' : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start">
        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 shrink-0" />
        <p className="text-sm text-blue-800 leading-relaxed">
          <strong>Note on Dynamic CMS:</strong> This settings panel provides the foundation for your dynamic CMS. Once fully integrated with Firestore, saving changes here will instantly update the respective sections on the live frontend pages.
        </p>
      </div>
    </div>
  );
}

