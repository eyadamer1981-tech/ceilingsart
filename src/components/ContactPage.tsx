'use client';

import { ImageWithFallback } from './figma/ImageWithFallback';
import { useLanguage } from '../contexts/LanguageContext';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { motion } from './ui/MotionWrapper';
import { useState } from 'react';
const MH1 = motion.h1 as any;
const MDiv = motion.div as any;
const MP = motion.p as any;
const MButton = motion.button as any;

export function ContactPage() {
  const { language, t, isRTL } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    projectType: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

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

  // Contact information array for animations
  const contactInfo = [
    {
      icon: Phone,
      title: phoneLabel,
      value: '+966 575474699',
      link: 'tel:+966575474699'
    },
    {
      icon: Mail,
      title: emailLabel,
      value: 'info@ceilingsart.com',
      link: 'mailto:info@ceilingsart.com'
    },
    {
      icon: MapPin,
      title: locationLabel,
      value: 'Riyadh, Saudi Arabia'
    },
    {
      icon: Clock,
      title: hoursLabel,
      value: 'Mon - Sat: 9:00 AM - 6:00 PM\nSunday: By Appointment'
    }
  ];

  // Extended contact content
  const extendedContent = language === 'ar'
    ? {
        title: 'تواصل معنا في سيلينجز آرت بسهولة وسرعة',
        paragraphs: [
          'تواصل معنا هو الخيار الأمثل لكل من يبحث عن خدمات احترافية في مجال الأسقف الفرنسية والعزل الصوتي داخل المملكة العربية السعودية. في سيلينجز آرت، نضمن لك تجربة تواصل سهلة، سريعة، ومباشرة سواء عن طريق الاتصال الهاتفي أو البريد الإلكتروني أو عبر نموذج التواصل الموجود في هذه الصفحة. نحن نؤمن بأن بداية التواصل هي أول خطوة نحو تقديم خدمة مميزة، ولذلك نحرص على أن نكون دائمًا متاحين للرد على استفساراتك.',
          'نحن نعمل طوال الأسبوع ما عدا الجمعة، من الساعة 7 صباحًا وحتى 8 مساءً. يمكنك التواصل معنا عن طريق الرقم 0575474699، أو عبر البريد الإلكتروني info@ceilingsart.com، أو ببساطة تعبئة النموذج الموجود. كما يمكنك زيارة مقرنا في الرياض.',
          'لماذا تختار التواصل معنا؟ اختيارك لـ التواصل معنا يعني أنك تتعامل مع فريق متخصص يمتلك خبرة طويلة في تنفيذ مشاريع الأسقف الفرنسية، بما في ذلك الأسقف المضيئة، اللامعة، ثلاثية الأبعاد، والأسقف المثقبة العازلة للصوت. فريقنا يقدم استشارات مجانية وتقييمات فنية دقيقة لضمان حصولك على أفضل حلول التصميم والتنفيذ. كما أننا نولي اهتمامًا كبيرًا برضا العملاء وسرعة الاستجابة لكل طلب.',
          'إذا كنت ترغب في معرفة المزيد عن خدماتنا، يمكنك زيارة صفحة من نحن أو تصفح خدمات الأسقف الفرنسية. لا تتردد في التواصل معنا الآن للحصول على عرض سعر أو استشارة أولية مجانية.'
        ]
      }
    : {
        title: 'Contact Us at Ceilings Art Easily and Quickly',
        paragraphs: [
          'Contacting us is the optimal choice for anyone looking for professional services in French ceilings and acoustic insulation within the Kingdom of Saudi Arabia. At Ceilings Art, we guarantee you an easy, fast, and direct communication experience whether by phone call, email, or through the contact form on this page. We believe that the beginning of communication is the first step towards providing exceptional service, and therefore we ensure that we are always available to respond to your inquiries.',
          'We work throughout the week except Friday, from 7 AM to 8 PM. You can contact us via phone number 0575474699, or via email info@ceilingsart.com, or simply fill out the form provided. You can also visit our headquarters in Riyadh.',
          'Why choose to contact us? Choosing to contact us means you are dealing with a specialized team with extensive experience in implementing French ceiling projects, including illuminated, glossy, 3D, and perforated sound-insulating ceilings. Our team provides free consultations and accurate technical assessments to ensure you get the best design and implementation solutions. We also pay great attention to customer satisfaction and quick response to every request.',
          'If you would like to know more about our services, you can visit our About Us page or browse our French ceiling services. Do not hesitate to contact us now to get a quote or a free initial consultation.'
        ]
      };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900">
      {/* Header Section */}
      <div className="relative py-20 text-center">
        {/* Decorative wave at top (hidden on mobile) */}
        <div className="hidden md:block absolute top-0 left-0 w-full">
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
          <MH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide"
          >
            {headerTitle}
          </MH1>
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
            {/* Contact Form */}
            <MDiv
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-gray-50 rounded-2xl p-8 lg:p-12"
            >
              <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-8 tracking-wide">
                {sendUsMsg}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <MDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                  >
                    <label className="block text-gray-700 mb-2">{firstName}</label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                      placeholder={language === 'ar' ? 'أدخل اسمك الأول' : 'Enter your first name'}
                    />
                  </MDiv>
                  <MDiv
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <label className="block text-gray-700 mb-2">{lastName}</label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                      placeholder={language === 'ar' ? 'أدخل اسم العائلة' : 'Enter your last name'}
                    />
                  </MDiv>
                </div>

                <MDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <label className="block text-gray-700 mb-2">{t('email')}</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                    placeholder={emailPlaceholder}
                  />
                </MDiv>

                <MDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <label className="block text-gray-700 mb-2">{t('phone')}</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                    placeholder={phonePlaceholder}
                    dir="ltr"
                  />
                </MDiv>

                <MDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <label className="block text-gray-700 mb-2">{projectType}</label>
                  <select 
                    name="projectType"
                    value={formData.projectType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors text-black"
                  >
                    <option value="">{selectProject}</option>
                    <option value="residential">{residential}</option>
                    <option value="commercial">{commercial}</option>
                    <option value="hospitality">{hospitality}</option>
                    <option value="retail">{retail}</option>
                  </select>
                </MDiv>

                <MDiv
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <label className="block text-gray-700 mb-2">{messageLabel}</label>
                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-lg focus:border-orange-400 focus:outline-none transition-colors resize-none text-black"
                    placeholder={messagePlaceholder}
                  ></textarea>
                </MDiv>

                <MButton 
                  type="submit"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-4 rounded-lg hover:from-orange-500 hover:to-yellow-600 transition-all duration-300 shadow-lg font-medium tracking-wide flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  {sendMessage}
                </MButton>
              </form>
            </MDiv>

            {/* Contact Information */}
            <MDiv
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
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
                {contactInfo.map((info, index) => (
                  <MDiv
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-gradient-to-r from-orange-400 to-yellow-500 p-3 rounded-full flex-shrink-0">
                      <info.icon className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">{info.title}</h3>
                      {info.link ? (
                        <a
                          href={info.link}
                          className="text-orange-600 hover:text-orange-700 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 whitespace-pre-line">{info.value}</p>
                      )}
                    </div>
                  </MDiv>
                ))}
              </div>

              {/* Map Section */}
              <MDiv 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-8"
              >
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
              </MDiv>
            </MDiv>
          </div>
        </div>
      </div>

      {/* Extended Content Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <MDiv 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className={`text-center mb-16 ${isRTL ? 'text-right' : ''}`}
            >
              <h2 className="text-3xl lg:text-4xl font-light text-gray-900 mb-8 tracking-wide">
                {extendedContent.title}
              </h2>
              
              <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                {extendedContent.paragraphs.map((paragraph, index) => (
                  <MP 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={isRTL ? 'text-right' : 'text-left'}
                  >
                    {paragraph}
                  </MP>
                ))}
              </div>
            </MDiv>
          </div>
        </div>
      </div>
    </section>
  );
}