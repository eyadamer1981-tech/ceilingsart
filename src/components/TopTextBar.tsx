"use client";

import React, { useEffect, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import { Phone } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";

/**
 * A slim top announcement bar inspired by Busmat Al-Andalus website.
 * It is only visible when the page is scrolled at the very top.
 */
const TopTextBar: React.FC = () => {
  const { language, isRTL, t } = useLanguage();
  const [isAtTop, setIsAtTop] = useState(true);
  const [showAdmin, setShowAdmin] = useState(false);

  useEffect(() => {
    // Keep handler in case we want subtle style changes at top, but
    // bar will be sticky, not hidden.
    const onScroll = () => setIsAtTop(window.scrollY <= 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    try {
      const flag = localStorage.getItem('hasAdminAccess');
      setShowAdmin(flag === 'true');
    } catch {}
  }, []);

  // Content per language
  const content = isRTL
    ? "حلول مبتكرة نحن الرائدون في الأسقف الفرنسية (Stretch ceiling) في السعودية"
    : "Innovative Solutions, we are the leaders in French ceilings (Stretch ceiling) in Saudi Arabia.";

  if (!isAtTop) {
    return null;
  }

  return (
    <div className="hidden md:block sticky top-0 left-0 right-0 z-50">
      <div
        className={
          "w-full px-4 sm:px-6 md:px-8 py-1.5 text-[12.5px] text-white bg-[#4A5259]"
        }
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              const email = 'info@ceilingsart.com';
              const subject = 'Contact from Website';
              const body = 'Hello, I would like to get more information about your services.';
              
              // Create mailto link
              const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
              
              // Try multiple approaches to open email client
              try {
                // Method 1: Create a temporary link and click it
                const link = document.createElement('a');
                link.href = mailtoLink;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              } catch (error) {
                try {
                  // Method 2: Use window.open
                  window.open(mailtoLink, '_self');
                } catch (error2) {
                  try {
                    // Method 3: Use window.location
                    window.location.href = mailtoLink;
                  } catch (error3) {
                    // Method 4: Copy to clipboard
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      navigator.clipboard.writeText(email).then(() => {
                        alert(`Email copied to clipboard: ${email}`);
                      }).catch(() => {
                        alert(`Please send an email to: ${email}`);
                      });
                    } else {
                      // Final fallback: Show email in alert
                      alert(`Please send an email to: ${email}`);
                    }
                  }
                }
              }
            }}
            className="flex items-center gap-2 opacity-90 hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-white/60 rounded px-1"
          >
            <span aria-hidden>✉️</span>
            <span className="hidden sm:inline">{isRTL ? "البريد الالكتروني" : "Email"}</span>
          </button>
          <span
            className={(isRTL ? "text-right" : "text-left") + " inline-block leading-6 mx-4 flex-1"}
          >
            {content}
          </span>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-orange-400">
              <Phone size={14} />
              <span className="text-[12.5px]" dir="ltr">+966 575474699</span>
            </div>
            <LanguageSwitcher />
            {showAdmin && (
              <a
                href="/admin"
                className="text-[12px] text-gray-300 hover:text-orange-400 transition-colors px-2 py-1 border border-gray-600 rounded hover:border-orange-400"
              >
                {t('admin')}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopTextBar;


