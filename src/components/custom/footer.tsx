'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { useTranslation } from '@/lib/i18n-context';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                NutriOne
              </span>
            </div>
            <p className="text-gray-600 text-sm mb-4 max-w-md">
              {t('hero.subtitle')}
            </p>
            <p className="text-xs text-gray-500 italic">
              ⚠️ {t('footer.disclaimer')}
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="#features" className="hover:text-emerald-600">{t('nav.features')}</Link></li>
              <li><Link href="#pricing" className="hover:text-emerald-600">{t('nav.pricing')}</Link></li>
              <li><Link href="#how-it-works" className="hover:text-emerald-600">{t('nav.howItWorks')}</Link></li>
              <li><Link href="/onboarding" className="hover:text-emerald-600">{t('nav.getStarted')}</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link href="/about" className="hover:text-emerald-600">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-emerald-600">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-600">Terms of Service</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-600">Contact</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} NutriOne. {t('footer.rights')}
            </p>
            <p className="text-sm text-gray-600 flex items-center">
              Made with <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" /> for better health
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
