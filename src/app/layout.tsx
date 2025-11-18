import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ceilings Art | سلينجز ارت للاسقف الفرنسيه المشدوده بالسعودية',
    template: '%s | Ceilings Art',
  },
  description:
    'سلينجز ارت بالسعودية – خبراء تصميم وتركيب الاسقف الفرنسيه المشدوده Stretch Ceilings بجوده اوروبيه وتصاميم فاخره تناسب الفلل والمنازل والمعارض والفنادق. نقدم حلول مبتكره في الاضاءه والاسقف المضيئه وسقف روز مع خامات باريسول الاصليه.',
  keywords: [
    'Ceilings Art',
    'سلينجز ارت',
    'الاسقف الفرنسيه بالسعودية',
    'شركه اسقف فرنسيه بالسعودية',
    'الاسقف الفرنسيه في السعودية',
    'اسقف فرنسيه',
    'الاسقف الفرنسيه المشدوده',
    'السقف الفرنسي',
    'الاسقف المشدوده',
    'سقف فرنسي',
    'اسقف مشدوده',
    'اسقف فرنسيه مضيئه',
    'سقف روز',
    'اسقف مضيئه',
    'باريسول',
    'ورق سقف فرنسي',
    'barrisol',
    'stretch ceilings',
    'stretch fabric ceiling',
    'stretch ceiling material',
    'fabric ceiling light',
    'light box',
    'stretch ceiling lighting',
    'swimming pool lighting',
    'stretch fabric ceiling lighting',
    'fabric lights',
    'wave fabric ceiling',
    'stretch lighting',
    'swarovski ceiling lights',
    'pvc ceiling',
    'تصميم اسقف مودرن',
    'اسقف مطابخ حديثه',
    'اسقف غرف نوم',
    'ديكور اسقف 2025',
    'افضل شركه اسقف بالسعودية',
    'اسقف مضيئه للصالات',
  ],
  metadataBase: new URL('https://www.ceilingsart.sa/'),
  alternates: {
    canonical: 'https://www.ceilingsart.sa/',
  },
  openGraph: {
    title: 'سلينجز ارت بالسعودية | الاسقف الفرنسيه المشدوده والمضيئه – Ceilings Art',
    description:
      'شركه سلينجز ارت بالسعودية متخصصه في تصميم وتركيب الاسقف الفرنسيه المشدوده والمضيئه باعلى معايير الجوده. خامات باريسول الاصليه واضاءه مبتكره واشكال عصريه فاخره تناسب كل المساحات.',
    url: 'https://www.ceilingsart.sa/',
    siteName: 'Ceilings Art',
    images: [
      {
        url: '/newlogo.png',
        width: 1200,
        height: 630,
        alt: 'Ceilings Art Stretch Ceilings Saudi Arabia',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/newlogo.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/newlogo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>

        {/* ==================== سكيما السعودية ==================== */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.ceilingsart.sa/#business",
  "name": "Ceilings Art - سلينجز ارت للاسقف الفرنسيه المشدوده بالسعودية",
  "description": "سلينجز ارت بالسعودية – خبراء تصميم وتركيب الاسقف الفرنسيه المشدوده Stretch Ceilings بجوده اوروبيه وتصاميم فاخره تناسب الفلل والمنازل والمعارض والفنادق.",
  "url": "https://www.ceilingsart.sa/",
  "image": "https://www.ceilingsart.sa/newlogo.png",
  "logo": "https://www.ceilingsart.sa/newlogo.png",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SA",
    "addressRegion": "الرياض",
    "addressLocality": "السعودية",
    "streetAddress": "-"
  },
  "areaServed": "SA",
  "telephone": "+96657547469",
  "priceRange": "$$",
  "sameAs": [
    "https://www.ceilingsart.sa/"
  ]
}
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://www.ceilingsart.sa/#website",
  "url": "https://www.ceilingsart.sa/",
  "name": "Ceilings Art",
  "alternateName": "سلينجز ارت",
  "inLanguage": "ar-SA",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.ceilingsart.sa/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.ceilingsart.sa/#organization",
  "name": "Ceilings Art",
  "url": "https://www.ceilingsart.sa/",
  "logo": "https://www.ceilingsart.sa/newlogo.png",
  "sameAs": [
    "https://www.ceilingsart.sa/"
  ]
}
            `,
          }}
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
{
  "@context": "https://schema.org",
  "@type": "ImageObject",
  "@id": "https://www.ceilingsart.sa/#logo",
  "url": "https://www.ceilingsart.sa/newlogo.png",
  "width": 1200,
  "height": 630
}
            `,
          }}
        />

        {/* ==================== نهاية السكيما ==================== */}

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-KZLX7XJS');
            `,
          }}
        />
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=AW-17667203885"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'AW-17667203885');
            `,
          }}
        />

      </head>

      <body className={inter.className}>

        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KZLX7XJS"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>

        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
