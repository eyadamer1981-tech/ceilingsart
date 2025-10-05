"use client";

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { motion } from './ui/MotionWrapper';
const MDiv = motion.div as any;
const MH1 = motion.h1 as any;
const MP = motion.p as any;
const MButton = motion.button as any;
import { ArrowLeft, CheckCircle, Star, Shield, Zap } from 'lucide-react';

interface StretchCeilingDetailPageProps {
  ceilingType: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  features: string[];
  featuresAr?: string[];
  benefits: string[];
  benefitsAr?: string[];
  applications: string[];
  applicationsAr?: string[];
  specifications: {
    material: string;
    thickness: string;
    colors: string;
    warranty: string;
    installation: string;
  };
  specificationsAr?: {
    material: string;
    thickness: string;
    colors: string;
    warranty: string;
    installation: string;
  };
  images: {
    main: string;
    gallery: string[];
  };
  onBack: () => void;
}

export function StretchCeilingDetailPage({
  ceilingType,
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  features,
  featuresAr,
  benefits,
  benefitsAr,
  applications,
  applicationsAr,
  specifications,
  specificationsAr,
  images,
  onBack
}: StretchCeilingDetailPageProps) {
  const { language, isRTL, t } = useLanguage();

  // Get the appropriate arrays based on language
  const displayFeatures = isRTL && featuresAr ? featuresAr : features;
  const displayBenefits = isRTL && benefitsAr ? benefitsAr : benefits;
  const displayApplications = isRTL && applicationsAr ? applicationsAr : applications;
  const displaySpecifications = isRTL && specificationsAr ? specificationsAr : specifications;

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden">
      {/* Header Section */}
      <div className="relative h-screen flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src={images.main}
            alt={isRTL ? titleAr : titleEn}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center max-w-full overflow-x-hidden">
          <MButton
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            onClick={onBack}
            className="mb-8 flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
            <span>{t('back')}</span>
          </MButton>

          <MH1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-wide mb-6"
          >
            {isRTL ? titleAr : titleEn}
          </MH1>

          <MP 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed"
          >
            {isRTL ? descriptionAr : descriptionEn}
          </MP>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-20 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full">
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              {t('keyFeatures')}
            </h2>
          </MDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayFeatures.map((feature, index) => (
              <MDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg p-6 text-center"
                style={{ overflow: 'hidden' }}
              >
                <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <p className="text-white text-lg">{feature}</p>
              </MDiv>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-900 py-20 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full">
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              {t('benefits')}
            </h2>
          </MDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayBenefits.map((benefit, index) => (
              <MDiv
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex items-start gap-4"
                style={{ overflow: 'hidden' }}
              >
                <Star className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-lg leading-relaxed">{benefit}</p>
              </MDiv>
            ))}
          </div>
        </div>
      </div>

      {/* Applications Section */}
      <div className="bg-gray-800 py-20 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full">
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              {t('applications')}
            </h2>
          </MDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayApplications.map((application, index) => (
              <MDiv
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-700 rounded-lg p-6 text-center hover:bg-gray-600 transition-colors"
                style={{ overflow: 'hidden' }}
              >
                <Zap className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <p className="text-white font-medium">{application}</p>
              </MDiv>
            ))}
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      <div className="bg-gray-900 py-20 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full">
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              {t('technicalSpecifications')}
            </h2>
          </MDiv>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <MDiv
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-700 rounded-lg p-6"
                style={{ overflow: 'hidden' }}
              >
                <Shield className="w-8 h-8 text-blue-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t('material')}
                </h3>
                <p className="text-gray-300">{displaySpecifications.material}</p>
              </MDiv>

              <MDiv
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-700 rounded-lg p-6"
                style={{ overflow: 'hidden' }}
              >
                <Shield className="w-8 h-8 text-green-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t('thickness')}
                </h3>
                <p className="text-gray-300">{displaySpecifications.thickness}</p>
              </MDiv>

              <MDiv
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-700 rounded-lg p-6"
                style={{ overflow: 'hidden' }}
              >
                <Shield className="w-8 h-8 text-purple-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t('colors')}
                </h3>
                <p className="text-gray-300">{displaySpecifications.colors}</p>
              </MDiv>

              <MDiv
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="bg-gray-700 rounded-lg p-6"
                style={{ overflow: 'hidden' }}
              >
                <Shield className="w-8 h-8 text-yellow-400 mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">
                  {t('warranty')}
                </h3>
                <p className="text-gray-300">{displaySpecifications.warranty}</p>
              </MDiv>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="bg-gray-800 py-20 overflow-x-hidden">
        <div className="container mx-auto px-4 max-w-full">
          <MDiv 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6 tracking-wide">
              {t('gallery')}
            </h2>
          </MDiv>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.gallery.map((image, index) => (
              <MDiv
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="aspect-square overflow-hidden rounded-lg"
                style={{ overflow: 'hidden' }}
              >
                <img
                  src={image}
                  alt={`${isRTL ? titleAr : titleEn} - Image ${index + 1}`}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </MDiv>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
