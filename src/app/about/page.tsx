'use client'

import { useTranslation } from '@/lib/i18n-context'
import { Utensils, Target, BookOpen, Shield, Users } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
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
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            {t('about.title')}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-gray-900">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-6 mb-12">
            <Target className="h-12 w-12 text-emerald-600 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.mission.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.mission.desc')}
              </p>
            </div>
          </div>

          <div className="flex items-start gap-6">
            <BookOpen className="h-12 w-12 text-emerald-600 flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {t('about.story.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {t('about.story.desc')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            {t('about.values.title')}
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl">
              <Users className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('about.values.personalization')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.values.personalizationDesc')}
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl">
              <BookOpen className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('about.values.science')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.values.scienceDesc')}
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl">
              <Target className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('about.values.accessibility')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.values.accessibilityDesc')}
              </p>
            </div>

            <div className="p-8 bg-white dark:bg-gray-800 rounded-xl">
              <Shield className="h-10 w-10 text-emerald-600 mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {t('about.values.privacy')}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {t('about.values.privacyDesc')}
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
