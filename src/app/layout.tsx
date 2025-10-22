import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ceilings Art | سلينجز ارت للاسقف الفرنسيه المشدوده بالرياض',
    template: '%s | Ceilings Art',
  },
  description:
    'سلينجز ارت بالرياض – خبراء تصميم وتركيب الاسقف الفرنسيه المشدوده Stretch Ceilings بجوده اوروبيه وتصاميم فاخره تناسب الفلل والمنازل والمعارض والفنادق. نقدم حلول مبتكره في الاضاءه والاسقف المضيئه وسقف روز مع خامات باريسول الاصليه.',
  keywords: [
    'Ceilings Art',
    'سلينجز ارت',
    'الاسقف الفرنسيه بالرياض',
    'شركه اسقف فرنسيه بالرياض',
    'الاسقف الفرنسيه',
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
    'افضل شركه اسقف بالرياض',
    'اسقف مضيئه للصالات',
  ],
  metadataBase: new URL('https://www.ceilingsart.sa/'),
  alternates: {
    canonical: 'https://www.ceilingsart.sa/',
  },
  openGraph: {
    title: 'سلينجز ارت بالرياض | الاسقف الفرنسيه المشدوده والمضيئه – Ceilings Art',
    description:
      'شركه سلينجز ارت بالرياض متخصصه في تصميم وتركيب الاسقف الفرنسيه المشدوده والمضيئه باعلى معايير الجوده. خامات باريسول الاصليه واضاءه مبتكره واشكال عصريه فاخره تناسب كل المساحات.',
    url: 'https://www.ceilingsart.sa/',
    siteName: 'Ceilings Art',
    images: [
      {
        url: '/newlogo.png',
        width: 1200,
        height: 630,
        alt: 'Ceilings Art Stretch Ceilings Riyadh',
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
        {/* End Google Tag Manager (noscript) */}

        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
