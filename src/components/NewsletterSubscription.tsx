'use client';

import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from './ui/MotionWrapper';
import { Mail, CheckCircle, AlertCircle, Loader } from 'lucide-react';

const MDiv = motion.div as any;
const MButton = motion.button as any;

interface NewsletterSubscriptionProps {
  className?: string;
  showFirstName?: boolean;
  showLastName?: boolean;
  source?: string;
  title?: string;
  description?: string;
  compact?: boolean;
}

interface SubscriptionState {
  status: 'idle' | 'loading' | 'success' | 'error';
  message: string;
  field?: string;
}

export function NewsletterSubscription({
  className = '',
  showFirstName = false,
  showLastName = false,
  source = 'blog',
  title,
  description,
  compact = false
}: NewsletterSubscriptionProps) {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [state, setState] = useState<SubscriptionState>({
    status: 'idle',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setState({
        status: 'error',
        message: language === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صحيح' : 'Please enter a valid email address',
        field: 'email'
      });
      return;
    }

    setState({ status: 'loading', message: '' });

    try {
      const response = await fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          firstName: showFirstName ? firstName : undefined,
          lastName: showLastName ? lastName : undefined,
          source
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setState({
          status: 'success',
          message: language === 'ar' 
            ? 'تم الاشتراك بنجاح! شكراً لك.' 
            : 'Successfully subscribed! Thank you.'
        });
        setEmail('');
        setFirstName('');
        setLastName('');
      } else {
        if (response.status === 409) {
          setState({
            status: 'error',
            message: language === 'ar' 
              ? 'هذا البريد الإلكتروني مشترك بالفعل' 
              : 'This email is already subscribed',
            field: 'email'
          });
        } else {
          setState({
            status: 'error',
            message: data.message || (language === 'ar' 
              ? 'حدث خطأ. يرجى المحاولة مرة أخرى.' 
              : 'Something went wrong. Please try again.')
          });
        }
      }
    } catch (error) {
      console.error('Subscription error:', error);
      setState({
        status: 'error',
        message: language === 'ar' 
          ? 'حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى.' 
          : 'Connection error. Please try again.'
      });
    }
  };

  const getTitle = () => {
    if (title) return title;
    return language === 'ar' ? 'ابق على اطلاع' : 'Stay Updated';
  };

  const getDescription = () => {
    if (description) return description;
    return language === 'ar' 
      ? 'اشترك في نشرتنا الإخبارية للحصول على آخر المقالات والأخبار' 
      : 'Subscribe to our newsletter for the latest articles and news';
  };

  const getEmailPlaceholder = () => {
    return language === 'ar' ? 'عنوان بريدك الإلكتروني' : 'Your email address';
  };

  const getFirstNamePlaceholder = () => {
    return language === 'ar' ? 'الاسم الأول' : 'First name';
  };

  const getLastNamePlaceholder = () => {
    return language === 'ar' ? 'اسم العائلة' : 'Last name';
  };

  const getSubscribeText = () => {
    return language === 'ar' ? 'اشترك' : 'Subscribe';
  };

  const getSendingText = () => {
    return language === 'ar' ? 'جاري الإرسال...' : 'Sending...';
  };

  if (compact) {
    return (
      <div className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-6 ${className}`}>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          {showFirstName && (
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={getFirstNamePlaceholder()}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
            />
          )}
          {showLastName && (
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={getLastNamePlaceholder()}
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm"
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={getEmailPlaceholder()}
            className={`flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent text-sm ${
              state.field === 'email' && state.status === 'error' ? 'border-red-500' : ''
            }`}
            disabled={state.status === 'loading'}
          />
          <MButton
            type="submit"
            disabled={state.status === 'loading'}
            whileHover={{ scale: state.status === 'loading' ? 1 : 1.05 }}
            whileTap={{ scale: state.status === 'loading' ? 1 : 0.95 }}
            className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
              state.status === 'loading'
                ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white hover:from-orange-500 hover:to-yellow-600'
            }`}
          >
            {state.status === 'loading' ? (
              <Loader size={16} className="animate-spin" />
            ) : (
              <Mail size={16} />
            )}
            {state.status === 'loading' ? getSendingText() : getSubscribeText()}
          </MButton>
        </form>
        
        {state.message && (
          <div className={`mt-3 flex items-center gap-2 text-sm ${
            state.status === 'success' ? 'text-green-600' : 'text-red-600'
          }`}>
            {state.status === 'success' ? (
              <CheckCircle size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {state.message}
          </div>
        )}
      </div>
    );
  }

  return (
    <MDiv
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 md:p-12 text-center ${className}`}
    >
      <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-wide">
        {getTitle()}
      </h2>
      <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
        {getDescription()}
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="space-y-4 mb-6">
          {showFirstName && (
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder={getFirstNamePlaceholder()}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              disabled={state.status === 'loading'}
            />
          )}
          {showLastName && (
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder={getLastNamePlaceholder()}
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent"
              disabled={state.status === 'loading'}
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={getEmailPlaceholder()}
            className={`w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent ${
              state.field === 'email' && state.status === 'error' ? 'border-red-500' : ''
            }`}
            disabled={state.status === 'loading'}
          />
        </div>
        
        <MButton
          type="submit"
          disabled={state.status === 'loading'}
          whileHover={{ scale: state.status === 'loading' ? 1 : 1.05 }}
          whileTap={{ scale: state.status === 'loading' ? 1 : 0.95 }}
          className={`w-full py-3 rounded-full font-medium transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 ${
            state.status === 'loading'
              ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-orange-400 to-yellow-500 text-white hover:from-orange-500 hover:to-yellow-600'
          }`}
        >
          {state.status === 'loading' ? (
            <Loader size={20} className="animate-spin" />
          ) : (
            <Mail size={20} />
          )}
          {state.status === 'loading' ? getSendingText() : getSubscribeText()}
        </MButton>
      </form>
      
      {state.message && (
        <div className={`mt-6 flex items-center justify-center gap-2 ${
          state.status === 'success' ? 'text-green-600' : 'text-red-600'
        }`}>
          {state.status === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-medium">{state.message}</span>
        </div>
      )}
    </MDiv>
  );
}
