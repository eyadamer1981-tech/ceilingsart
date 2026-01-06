import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default:
      'Ceilings Art | سلينجز ارت للاسقف الفرنسية المشدودة وألواح العزل الصوتي بالسعودية',
    template: '%s | Ceilings Art',
  },
  description:
    'سلينجز ارت بالسعودية – خبراء تصميم وتركيب الاسقف الفرنسية المشدودة Stretch Ceilings بجودة أوروبية وتصاميم فاخرة للفلل والمنازل والمعارض والفنادق. نوفر حلول الإضاءة الحديثة والأسقف المضيئة وسقف روز بخامات باريسول الأصلية، بالإضافة إلى خدمات ألواح العزل الصوتي والأكوستيك وعزل الجدران والغرف بأعلى كفاءة.',
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

    /* ======================
       كلمات العزل الصوتي الجديدة
    =======================*/
    'ألواح عزل صوتي بالسعودية',
    'عزل صوتي بالرياض',
    'عزل صوتي للغرف',
    'عزل صوتي للجدران',
    'الواح فوم عزل صوتي',
    'أفضل مواد العزل الصوتي',
    'sound insulation saudi',
    'soundproof panels ksa',
    'acoustic panels saudi arabia',
    'ألواح أكوستيك',
    'ألواح عزل صوتي للمنازل',
    'تركيب عزل صوتي',
    'عزل صوتي للمباني'
  ],
  metadataBase: new URL('https://www.ceilingsart.sa'),
  alternates: {
    canonical: 'https://www.ceilingsart.sa/',
  },
  openGraph: {
    title:
      'سلينجز ارت بالسعودية | الاسقف الفرنسية وألواح العزل الصوتي – Ceilings Art',
    description:
      'شركة سلينجز ارت بالسعودية متخصصة في الاسقف الفرنسية المشدودة والمضيئة، وخدمات العزل الصوتي وألواح الأكوستيك بجودة عالية تناسب جميع الاستخدامات السكنية والتجارية.',
    url: 'https://www.ceilingsart.sa/',
    siteName: 'Ceilings Art',
    images: [
      {
        url: '/newlogo.png',
        width: 1200,
        height: 630,
        alt: 'Ceilings Art Saudi Arabia',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سلينجز ارت بالسعودية | الاسقف الفرنسية وألواح العزل الصوتي',
    description:
      'شركة سلينجز ارت بالسعودية متخصصة في الاسقف الفرنسية المشدودة والمضيئة، وخدمات العزل الصوتي وألواح الأكوستيك.',
    images: ['/newlogo.png'],
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
        {/* ========= hreflang for regional targeting ========= */}
        <link rel="alternate" hrefLang="ar-SA" href="https://www.ceilingsart.sa/" />
        <link rel="alternate" hrefLang="ar" href="https://www.ceilingsart.sa/" />
        <link rel="alternate" hrefLang="x-default" href="https://www.ceilingsart.sa/" />

        {/* ========= Schema LocalBusiness ========= */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: `
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.ceilingsart.sa/#business",
  "name": "Ceilings Art - سلينجز ارت",
  "description": "شركة متخصصة في الاسقف الفرنسية المشدودة وألواح العزل الصوتي والأكوستيك بالسعودية.",
  "url": "https://www.ceilingsart.sa/",
  "logo": "https://www.ceilingsart.sa/newlogo.png",
  "image": "https://www.ceilingsart.sa/newlogo.png",
  "telephone": "+96657547469",
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "SA",
    "addressRegion": "الرياض"
  },
  "areaServed": "SA",
  "priceRange": "$$"
}
            `,
          }}
        />

        {/* ========= Google Tag Manager ========= */}
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

        {/* ========= Google Ads ========= */}
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
