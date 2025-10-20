import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'Ceilings Art | سيلينجز آرت للأسقف الفرنسية بالرياض',
    template: '%s | Ceilings Art',
  },
  description:
    'Ceilings Art – سيلينجز آرت بالرياض، نقدم تصاميم الأسقف الفرنسية المبتكرة، حلول عصرية تدمج بين الفخامة والأناقة لتجعل مساحتك تنبض بالإبداع. French Stretch Ceilings in Riyadh with premium materials and artistic design.',
  keywords: [
    'Ceilings Art',
    'سيلينجز آرت',
    'الأسقف الفرنسية بالرياض',
    'شركة أسقف فرنسية بالرياض',
    'تصميم أسقف حديثة بالرياض',
    'Stretch Ceiling Riyadh',
    'French Ceiling Design',
    'Luxury Ceilings Saudi Arabia',
    'ديكور أسقف حديثة',
    'أفضل شركة أسقف بالرياض',
  ],
  metadataBase: new URL('https://www.ceilingsart.sa/'),
  alternates: {
    canonical: 'https://www.ceilingsart.sa/',
  },
  openGraph: {
    title: 'Ceilings Art | سيلينجز آرت للأسقف الفرنسية بالرياض',
    description:
      'شركة سيلينجز آرت بالرياض – روعة التصميم والفخامة في الأسقف الفرنسية. اكتشف أحدث التصاميم المعلقة والمضيئة بتقنيات عصرية تضيف لمسة فنية راقية لمساحتك.',
    url: 'https://www.ceilingsart.sa/',
    siteName: 'Ceilings Art',
    images: [
      {
        url: '/newlogo.png',
        width: 1200,
        height: 630,
        alt: 'Ceilings Art Logo',
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
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  )
}
