import React, { useState } from 'react';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Translations } from '../lib/translations';

interface FAQItem {
  id: string;
  questionKey: keyof Translations;
  answerKey: keyof Translations;
}

interface FAQsPageProps {
  onContactClick?: () => void;
}

export function FAQsPage({ onContactClick }: FAQsPageProps) {
  const { t, isRTL } = useLanguage();
  const [openItems, setOpenItems] = useState<string[]>([]);

  const faqItems: FAQItem[] = [
    {
      id: 'general-questions',
      questionKey: 'faqGeneralQuestions',
      answerKey: 'faqGeneralQuestionsAnswer'
    },
    {
      id: 'what-are-stretch-ceilings',
      questionKey: 'faqWhatAreStretchCeilings',
      answerKey: 'faqWhatAreStretchCeilingsAnswer'
    },
    {
      id: 'installation-time',
      questionKey: 'faqInstallationTime',
      answerKey: 'faqInstallationTimeAnswer'
    },
    {
      id: 'all-spaces',
      questionKey: 'faqAllSpaces',
      answerKey: 'faqAllSpacesAnswer'
    },
    {
      id: 'warranty',
      questionKey: 'faqWarranty',
      answerKey: 'faqWarrantyAnswer'
    },
    {
      id: 'quick-installation',
      questionKey: 'faqQuickInstallation',
      answerKey: 'faqQuickInstallationAnswer'
    },
    {
      id: 'benefits',
      questionKey: 'faqBenefits',
      answerKey: 'faqBenefitsAnswer'
    },
    {
      id: 'suspended-ceilings',
      questionKey: 'faqSuspendedCeilings',
      answerKey: 'faqSuspendedCeilingsAnswer'
    }
  ];

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const handlePhoneClick = () => {
    window.open('tel:+966575474699', '_self');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/966575474699', '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white pt-32">
      {/* Header Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide mb-4">
            {t('stretchCeilingsFAQs') || 'Stretch Ceilings - Frequently Asked Questions'}
          </h1>
          <p className="text-xl text-white tracking-wide underline decoration-orange-400 decoration-2 underline-offset-4">
            {t('commonQuestionsAboutStretchCeilings') || 'Common Questions About Stretch Ceilings'}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {faqItems.map((item, index) => (
              <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                <button
                  onClick={() => toggleItem(item.id)}
                  className={`w-full px-6 py-4 flex items-center hover:bg-gray-50 transition-colors ${
                    isRTL ? 'text-right justify-between' : 'text-left justify-between'
                  }`}
                >
                  <span className="text-gray-900 font-medium text-lg">
                    {t(item.questionKey)}
                  </span>
                  <ChevronDown 
                    size={20} 
                    className={`text-gray-500 transition-transform duration-200 ${
                      openItems.includes(item.id) ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                
                {openItems.includes(item.id) && (
                  <div className="px-6 pb-4">
                    <div className={`text-gray-700 leading-relaxed ${
                      isRTL ? 'text-right' : 'text-left'
                    }`}>
                      {t(item.answerKey)}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gray-900 rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-4">
              {t('stillHaveQuestions') || 'Still Have Questions?'}
            </h2>
            <p className="text-gray-300 mb-6">
              {t('contactUsForMoreInfo') || 'Our experts are here to help you with any additional questions about stretch ceilings'}
            </p>
            <button 
              onClick={() => onContactClick?.()}
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              {t('contactUs') || 'Contact Us'}
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        {/* Phone Button */}
        <button
          onClick={handlePhoneClick}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
          title="Call Us"
        >
          <Phone size={24} className="text-white" />
        </button>
        
        {/* WhatsApp Button */}
        <button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg transition-colors"
          title="WhatsApp Us"
        >
          <MessageCircle size={24} className="text-white" />
        </button>
      </div>
    </div>
  );
}

