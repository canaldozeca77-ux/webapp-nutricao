'use client'

import { useTranslation } from '@/lib/i18n-context'
import { Utensils, FileText, CheckCircle, AlertTriangle, Shield, XCircle } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
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
          <FileText className="h-16 w-16 text-emerald-600 mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('terms.title')}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('terms.lastUpdated')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
              {t('terms.intro')}
            </p>

            <div className="space-y-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <CheckCircle className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.acceptance.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('terms.acceptance.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <FileText className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.service.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('terms.service.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Shield className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.account.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('terms.account.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-amber-500">
                <div className="flex items-start gap-4 mb-4">
                  <AlertTriangle className="h-8 w-8 text-amber-500 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.disclaimer.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('terms.disclaimer.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <Shield className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.liability.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('terms.liability.desc')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                <div className="flex items-start gap-4 mb-4">
                  <XCircle className="h-8 w-8 text-emerald-600 flex-shrink-0" />
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {t('terms.termination.title')}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {t('terms.termination.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12 p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <p className="text-gray-700 dark:text-gray-300 font-medium">
                {t('terms.contact')}
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
