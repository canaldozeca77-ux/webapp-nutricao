'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'
import { useI18n } from '@/lib/i18n-context'
import { Utensils, ArrowRight, ArrowLeft, Check, AlertCircle } from 'lucide-react'

export default function OnboardingPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [currentStep, setCurrentStep] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [supabaseConfigured, setSupabaseConfigured] = useState(true)
  const [acceptedDisclaimer, setAcceptedDisclaimer] = useState(false)

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    height: '',
    weight: '',
    activityLevel: '',
    goals: [] as string[],
    dietaryRestrictions: [] as string[],
    allergies: [] as string[],
  })

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      setSupabaseConfigured(false)
    } else {
      checkUser()
    }
  }, [])

  const checkUser = async () => {
    const supabase = getSupabaseClient()
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      }
    }
  }

  const steps = [
    {
      title: t('onboarding.step1.title') || 'Welcome to NutriOne',
      subtitle: t('onboarding.step1.subtitle') || 'Let\'s create your personalized nutrition plan',
      content: (
        <div className="text-center space-y-6">
          <Utensils className="h-16 w-16 text-emerald-600 mx-auto" />
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {t('onboarding.step1.desc') || 'Answer a few questions to get started with your personalized nutrition journey.'}
          </p>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              {t('onboarding.disclaimer') || 'This app is not a substitute for professional medical advice. Please consult with a healthcare professional.'}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: t('onboarding.step2.title') || 'Basic Information',
      subtitle: t('onboarding.step2.subtitle') || 'Tell us about yourself',
      content: (
        <div className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('onboarding.age') || 'Age'}
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="25"
                min="13"
                max="120"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('onboarding.gender') || 'Gender'}
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="">{t('onboarding.selectGender') || 'Select gender'}</option>
                <option value="male">{t('onboarding.male') || 'Male'}</option>
                <option value="female">{t('onboarding.female') || 'Female'}</option>
                <option value="other">{t('onboarding.other') || 'Other'}</option>
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('onboarding.height') || 'Height (cm)'}
              </label>
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="170"
                min="100"
                max="250"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                {t('onboarding.weight') || 'Weight (kg)'}
              </label>
              <input
                type="number"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                placeholder="70"
                min="30"
                max="300"
              />
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t('onboarding.step3.title') || 'Activity Level',
      subtitle: t('onboarding.step3.subtitle') || 'How active are you?',
      content: (
        <div className="space-y-4">
          {[
            { value: 'sedentary', label: t('onboarding.sedentary') || 'Sedentary (little to no exercise)' },
            { value: 'lightly', label: t('onboarding.lightly') || 'Lightly active (light exercise 1-3 days/week)' },
            { value: 'moderately', label: t('onboarding.moderately') || 'Moderately active (moderate exercise 3-5 days/week)' },
            { value: 'very', label: t('onboarding.very') || 'Very active (hard exercise 6-7 days/week)' },
            { value: 'extremely', label: t('onboarding.extremely') || 'Extremely active (very hard exercise & physical job)' },
          ].map((option) => (
            <label key={option.value} className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="radio"
                name="activity"
                value={option.value}
                checked={formData.activityLevel === option.value}
                onChange={(e) => setFormData({ ...formData, activityLevel: e.target.value })}
                className="mr-3"
              />
              <span className="text-gray-900 dark:text-white">{option.label}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: t('onboarding.step4.title') || 'Health Goals',
      subtitle: t('onboarding.step4.subtitle') || 'What are your main goals?',
      content: (
        <div className="space-y-4">
          {[
            { value: 'lose_weight', label: t('onboarding.loseWeight') || 'Lose weight' },
            { value: 'gain_weight', label: t('onboarding.gainWeight') || 'Gain weight' },
            { value: 'maintain_weight', label: t('onboarding.maintainWeight') || 'Maintain weight' },
            { value: 'build_muscle', label: t('onboarding.buildMuscle') || 'Build muscle' },
            { value: 'improve_health', label: t('onboarding.improveHealth') || 'Improve overall health' },
            { value: 'increase_energy', label: t('onboarding.increaseEnergy') || 'Increase energy levels' },
          ].map((goal) => (
            <label key={goal.value} className="flex items-center p-4 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
              <input
                type="checkbox"
                checked={formData.goals.includes(goal.value)}
                onChange={(e) => {
                  const newGoals = e.target.checked
                    ? [...formData.goals, goal.value]
                    : formData.goals.filter(g => g !== goal.value)
                  setFormData({ ...formData, goals: newGoals })
                }}
                className="mr-3"
              />
              <span className="text-gray-900 dark:text-white">{goal.label}</span>
            </label>
          ))}
        </div>
      ),
    },
    {
      title: t('onboarding.step5.title') || 'Dietary Preferences',
      subtitle: t('onboarding.step5.subtitle') || 'Any restrictions or preferences?',
      content: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              {t('onboarding.dietaryRestrictions') || 'Dietary Restrictions'}
            </h3>
            <div className="space-y-3">
              {[
                { value: 'vegetarian', label: t('onboarding.vegetarian') || 'Vegetarian' },
                { value: 'vegan', label: t('onboarding.vegan') || 'Vegan' },
                { value: 'gluten_free', label: t('onboarding.glutenFree') || 'Gluten-free' },
                { value: 'dairy_free', label: t('onboarding.dairyFree') || 'Dairy-free' },
                { value: 'keto', label: t('onboarding.keto') || 'Keto' },
                { value: 'paleo', label: t('onboarding.paleo') || 'Paleo' },
              ].map((restriction) => (
                <label key={restriction.value} className="flex items-center p-3 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700">
                  <input
                    type="checkbox"
                    checked={formData.dietaryRestrictions.includes(restriction.value)}
                    onChange={(e) => {
                      const newRestrictions = e.target.checked
                        ? [...formData.dietaryRestrictions, restriction.value]
                        : formData.dietaryRestrictions.filter(r => r !== restriction.value)
                      setFormData({ ...formData, dietaryRestrictions: newRestrictions })
                    }}
                    className="mr-3"
                  />
                  <span className="text-gray-900 dark:text-white">{restriction.label}</span>
                </label>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-3">
              {t('onboarding.allergies') || 'Food Allergies'}
            </h3>
            <input
              type="text"
              value={formData.allergies.join(', ')}
              onChange={(e) => setFormData({ ...formData, allergies: e.target.value.split(',').map(s => s.trim()).filter(s => s) })}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder={t('onboarding.allergiesPlaceholder') || 'e.g., nuts, dairy, shellfish'}
            />
          </div>
        </div>
      ),
    },
    {
      title: t('onboarding.step6.title') || 'Legal Disclaimer',
      subtitle: t('onboarding.step6.subtitle') || 'Please read and accept',
      content: (
        <div className="space-y-6">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-6 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                  {t('onboarding.disclaimerTitle') || 'Important Legal Disclaimer'}
                </h3>
                <p className="text-yellow-700 dark:text-yellow-300 text-sm leading-relaxed">
                  {t('onboarding.disclaimerText') || 'NutriOne is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this app. The information provided is for educational purposes only and is not intended to diagnose, treat, cure, or prevent any disease.'}
                </p>
              </div>
            </div>
          </div>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedDisclaimer}
              onChange={(e) => setAcceptedDisclaimer(e.target.checked)}
              className="mt-1"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {t('onboarding.acceptDisclaimer') || 'I have read and accept the disclaimer above'}
            </span>
          </label>
        </div>
      ),
    },
  ]

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    if (!acceptedDisclaimer) {
      alert(t('onboarding.acceptRequired') || 'Please accept the disclaimer to continue')
      return
    }

    setIsLoading(true)
    try {
      const supabase = getSupabaseClient()
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('profiles').upsert({
            id: user.id,
            ...formData,
            onboarding_completed: true,
            updated_at: new Date().toISOString(),
          })
        }
      }
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving profile:', error)
      alert(t('onboarding.error') || 'Error saving your profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('onboarding.supabaseRequired') || 'Supabase Required'}
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t('onboarding.supabaseDesc') || 'Please configure Supabase to complete your profile setup.'}
            </p>
            <button
              onClick={() => router.push('/')}
              className="block w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold text-center"
            >
              {t('onboarding.backToHome') || 'Back to Home'}
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {t('onboarding.step') || 'Step'} {currentStep + 1} {t('onboarding.of') || 'of'} {steps.length}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {Math.round(((currentStep + 1) / steps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div
              className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {steps[currentStep].title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            {steps[currentStep].subtitle}
          </p>
          {steps[currentStep].content}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ArrowLeft className="h-5 w-5" />
            {t('onboarding.back') || 'Back'}
          </button>
          <button
            onClick={handleNext}
            disabled={isLoading || (currentStep === steps.length - 1 && !acceptedDisclaimer)}
            className="flex items-center gap-2 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            ) : (
              <>
                {currentStep === steps.length - 1 ? t('onboarding.complete') || 'Complete' : t('onboarding.next') || 'Next'}
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}