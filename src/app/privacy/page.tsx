'use client'

import { useTranslation } from '@/lib/i18n-context'
import { Utensils, Shield, Lock, Eye, FileText, AlertCircle } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const { t } = useTranslation()

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 dark:bg-gray-900/80 backdrop-blur-md z-50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <Utensils className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">NutriOne</span>
            </Link>
            
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition">
              {t('nav.getStarted')}
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('privacy.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('privacy.lastUpdated')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              {t('privacy.intro')}
            </p>

            <div className="space-y-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <FileText className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('privacy.collection.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('privacy.collection.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Eye className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('privacy.use.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('privacy.use.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <AlertCircle className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('privacy.sharing.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('privacy.sharing.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Lock className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('privacy.security.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('privacy.security.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Shield className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('privacy.rights.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('privacy.rights.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {t('privacy.contact')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">{t('footer.rights')}</p>
        </div>
      </footer>
    </div>
  )
}
