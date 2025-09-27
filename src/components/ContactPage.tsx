import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export function ContactPage() {
  const { language, t, isRTL } = useLanguage();

  const headerTitle = t('contactTitle');
  const getInTouch = language === 'ar' ? 'تواصل معنا' : 'Get In Touch';
  const intro = language === 'ar'
    ? 'هل أنتم مستعدون لتحويل مساحتكم بتصاميم أسقف مخصّصة؟ تواصلوا مع فريق خبرائنا لمناقشة مشروعكم وتحويل رؤيتكم إلى واقع.'
    : 'Ready to transform your space with our bespoke ceiling designs? Contact our experts to discuss your project and bring your vision to life.';
  const phoneLabel = language === 'ar' ? 'الهاتف' : 'Phone';
  const emailLabel = language === 'ar' ? 'البريد الإلكتروني' : 'Email';
  const locationLabel = language === 'ar' ? 'الموقع' : 'Location';
  const hoursLabel = language === 'ar' ? 'ساعات العمل' : 'Business Hours';
  const findUs = language === 'ar' ? 'موقعنا' : 'Find Us';
  const sendUsMsg = language === 'ar' ? 'أرسل لنا رسالة' : 'Send us a Message';
  const firstName = language === 'ar' ? 'الاسم الأول' : 'First Name';
  const lastName = language === 'ar' ? 'اسم العائلة' : 'Last Name';
  const emailPlaceholder = language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Enter your email address';
  const phonePlaceholder = language === 'ar' ? 'أدخل رقم هاتفك' : 'Enter your phone number';
  const projectType = language === 'ar' ? 'نوع المشروع' : 'Project Type';
  const selectProject = language === 'ar' ? 'اختر نوع المشروع' : 'Select project type';
  const residential = language === 'ar' ? 'سكني' : 'Residential';
  const commercial = language === 'ar' ? 'تجاري' : 'Commercial';
  const hospitality = language === 'ar' ? 'ضيافة' : 'Hospitality';
  const retail = language === 'ar' ? 'تجزئة' : 'Retail';
  const messageLabel = language === 'ar' ? 'الرسالة' : 'Message';
  const messagePlaceholder = language === 'ar' ? 'أخبرنا عن مشروعك...' : 'Tell us about your project...';
  const sendMessage = t('sendMessage');
  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header Section */}
      <div className="relative py-20 text-center">
        {/* Decorative wave at top */}
        <div className="absolute top-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            fill="none"
            className="w-full h-auto transform rotate-180"
          >
            <path
              d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,90.7C672,75,768,53,864,48C960,43,1056,53,1152,64C1200,75,1248,85,1296,90.7L1344,96L1344,0L1296,0C1248,0,1152,0,1056,0C960,0,864,0,768,0C672,0,576,0,480,0C384,0,288,0,192,0C96,0,48,0,24,0L0,0Z"
              fill="white"
            />
          </svg>
        </div>

        <div className="relative z-10 container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide">
            {headerTitle}
          </h1>
        </div>

        {/* Decorative wave at bottom with orange gradient */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            viewBox="0 0 1200 120"
            fill="none"
            className="w-full h-auto"
          >
            <defs>
              <linearGradient id="orangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'#f97316', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#eab308', stopOpacity:1}} />
              </linearGradient>
            </defs>
            <path
              d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,90.7C672,75,768,53,864,48C960,43,1056,53,1152,64C1200,75,1248,85,1296,90.7L1344,96L1344,120L1296,120C1248,120,1152,120,1056,120C960,120,864,120,768,120C672,120,576,120,480,120C384,120,288,120,192,120C96,120,48,120,24,120L0,120Z"
              fill="url(#orangeGradient)"
            />
          </svg>
        </div>
      </div>

      {/* Contact Content */}
      <div className="bg-white py-20">
        <div className="container mx-auto px-4">
          <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 ${isRTL ? 'text-right' : ''}`}>
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-wide">
                  {getInTouch}
                </h2>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">
                  {intro}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-full">
                    <Phone className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{phoneLabel}</h3>
                    <p className="text-gray-600">+966 575474699</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-full">
                    <Mail className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{emailLabel}</h3>
                    <p className="text-gray-600">info@ceilingsatr.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-full">
                    <MapPin className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{locationLabel}</h3>
                    <p className="text-gray-600">Riyadh, Saudi Arabia</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-full">
                    <Clock className="text-white" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">{hoursLabel}</h3>
                    <p className="text-gray-600">Mon - Sat: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Sunday: By Appointment</p>
                  </div>
                </div>
              </div>

              {/* Map Section */}
              <div className="mt-8">
                <h3 className="font-medium text-gray-900 mb-4">{findUs}</h3>
                <div className="bg-gray-100 rounded-lg overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d186332.60135430947!2d46.6752957!3d24.7135517!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e2ee2bdaad793c7%3A0x6b5f7325e547785c!2sRiyadh%2C%20Saudi%20Arabia!5e0!3m2!1sen!2sus!4v1699999999999!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Art Ceiling Location"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-2xl p-8 lg:p-12">
              <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
                {sendUsMsg}
              </h3>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">{firstName}</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                      placeholder={language === 'ar' ? 'أدخل اسمك الأول' : 'Enter your first name'}
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">{lastName}</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                      placeholder={language === 'ar' ? 'أدخل اسم العائلة' : 'Enter your last name'}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('email')}</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                    placeholder={emailPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{t('phone')}</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                    placeholder={phonePlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{projectType}</label>
                  <select className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black">
                    <option value="">{selectProject}</option>
                    <option value="residential">{residential}</option>
                    <option value="commercial">{commercial}</option>
                    <option value="hospitality">{hospitality}</option>
                    <option value="retail">{retail}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">{messageLabel}</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors resize-none text-black"
                    placeholder={messagePlaceholder}
                  ></textarea>
                </div>

                <button className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-4 rounded-lg hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 transform hover:scale-105 shadow-lg font-medium tracking-wide">
                  {sendMessage}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}