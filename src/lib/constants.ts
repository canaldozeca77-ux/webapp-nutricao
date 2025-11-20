// ============================================
// NUTRIONE - CONSTANTS & CONFIGURATION
// ============================================

import { SubscriptionPlan, Language } from './types';

// ============================================
// SUBSCRIPTION PLANS
// ============================================

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    tier: 'essential',
    name: 'Essential',
    description: 'Perfect for getting started with personalized nutrition',
    features: [
      'Personalized food recommendations',
      'Basic recipe suggestions',
      'Food scanner (10 scans/month)',
      'AI chat assistant (limited)',
      'Health tracking',
      'Email support'
    ],
    monthly_price: 6.99,
    yearly_price: 59,
    yearly_savings: 24.88
  },
  {
    tier: 'pro',
    name: 'Pro',
    description: 'Advanced features for serious health goals',
    features: [
      'Everything in Essential',
      'Unlimited food scanner',
      'Advanced AI chat assistant',
      'Weekly meal plans',
      'Smart food substitutions',
      'Detailed health analytics',
      'Priority support',
      '5-day free trial'
    ],
    monthly_price: 14.99,
    yearly_price: 129,
    yearly_savings: 50.88,
    trial_days: 5
  },
  {
    tier: 'premium',
    name: 'Premium',
    description: 'Complete nutrition management solution',
    features: [
      'Everything in Pro',
      'Wearables integration',
      'Advanced health predictions',
      'Custom recipe creation',
      'Nutritionist consultation (1/month)',
      'Export health reports',
      'Family sharing (up to 5)',
      'White-glove support',
      '5-day free trial'
    ],
    monthly_price: 29.99,
    yearly_price: 259,
    yearly_savings: 100.88,
    trial_days: 5
  }
];

// ============================================
// SUPPORTED LANGUAGES
// ============================================

export const SUPPORTED_LANGUAGES: { code: Language; name: string; flag: string }[] = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' }
];

// ============================================
// MEDICAL DISCLAIMER
// ============================================

export const MEDICAL_DISCLAIMER = {
  en: 'NutriOne does not replace medical, nutritional, or professional diagnostic advice. The information provided is for educational purposes only. Always consult a healthcare professional.',
  pt: 'O NutriOne não substitui aconselhamento médico, nutricional ou diagnóstico profissional. As informações fornecidas são apenas para fins educativos. Consulte sempre um profissional de saúde.',
  es: 'NutriOne no reemplaza el consejo médico, nutricional o diagnóstico profesional. La información proporcionada es solo con fines educativos. Siempre consulte a un profesional de la salud.',
  fr: 'NutriOne ne remplace pas les conseils médicaux, nutritionnels ou diagnostiques professionnels. Les informations fournies sont à des fins éducatives uniquement. Consultez toujours un professionnel de la santé.',
  de: 'NutriOne ersetzt keine medizinische, ernährungswissenschaftliche oder professionelle diagnostische Beratung. Die bereitgestellten Informationen dienen nur zu Bildungszwecken. Konsultieren Sie immer einen Gesundheitsfachmann.',
  it: 'NutriOne non sostituisce la consulenza medica, nutrizionale o diagnostica professionale. Le informazioni fornite sono solo a scopo educativo. Consultare sempre un professionista sanitario.',
  zh: 'NutriOne不能替代医疗、营养或专业诊断建议。提供的信息仅供教育目的。请始终咨询医疗保健专业人员。',
  ja: 'NutriOneは、医療、栄養、または専門的な診断アドバイスに代わるものではありません。提供される情報は教育目的のみです。常に医療専門家に相談してください。'
};

// ============================================
// GOALS OPTIONS
// ============================================

export const GOALS_OPTIONS = [
  { value: 'lose_weight', label: { en: 'Lose weight', pt: 'Perder peso', es: 'Perder peso' } },
  { value: 'gain_muscle', label: { en: 'Gain muscle', pt: 'Ganhar massa muscular', es: 'Ganar músculo' } },
  { value: 'maintain_weight', label: { en: 'Maintain weight', pt: 'Manter peso', es: 'Mantener peso' } },
  { value: 'improve_diabetes', label: { en: 'Improve diabetes', pt: 'Melhorar diabetes', es: 'Mejorar diabetes' } },
  { value: 'improve_cholesterol', label: { en: 'Improve cholesterol', pt: 'Melhorar colesterol', es: 'Mejorar colesterol' } },
  { value: 'improve_triglycerides', label: { en: 'Improve triglycerides', pt: 'Melhorar triglicéridos', es: 'Mejorar triglicéridos' } },
  { value: 'improve_blood_pressure', label: { en: 'Improve blood pressure', pt: 'Melhorar tensão arterial', es: 'Mejorar presión arterial' } },
  { value: 'improve_digestive_health', label: { en: 'Improve digestive health', pt: 'Melhorar saúde digestiva', es: 'Mejorar salud digestiva' } },
  { value: 'other', label: { en: 'Other', pt: 'Outro', es: 'Otro' } }
];

// ============================================
// CONDITIONS OPTIONS
// ============================================

export const CONDITIONS_OPTIONS = [
  { value: 'diabetes_type1', label: { en: 'Type 1 Diabetes', pt: 'Diabetes tipo 1', es: 'Diabetes tipo 1' } },
  { value: 'diabetes_type2', label: { en: 'Type 2 Diabetes', pt: 'Diabetes tipo 2', es: 'Diabetes tipo 2' } },
  { value: 'prediabetes', label: { en: 'Prediabetes', pt: 'Pré-diabetes', es: 'Prediabetes' } },
  { value: 'insulin_resistance', label: { en: 'Insulin resistance', pt: 'Resistência à insulina', es: 'Resistencia a la insulina' } },
  { value: 'high_cholesterol', label: { en: 'High cholesterol', pt: 'Colesterol alto', es: 'Colesterol alto' } },
  { value: 'high_triglycerides', label: { en: 'High triglycerides', pt: 'Triglicéridos altos', es: 'Triglicéridos altos' } },
  { value: 'hypertension', label: { en: 'Hypertension', pt: 'Hipertensão', es: 'Hipertensión' } },
  { value: 'kidney_disease', label: { en: 'Kidney disease', pt: 'Doença renal', es: 'Enfermedad renal' } },
  { value: 'liver_problems', label: { en: 'Liver problems', pt: 'Problemas hepáticos', es: 'Problemas hepáticos' } },
  { value: 'metabolic_syndrome', label: { en: 'Metabolic syndrome', pt: 'Síndrome metabólica', es: 'Síndrome metabólico' } },
  { value: 'celiac_disease', label: { en: 'Celiac disease', pt: 'Doença celíaca', es: 'Enfermedad celíaca' } },
  { value: 'lactose_intolerance', label: { en: 'Lactose intolerance', pt: 'Intolerância à lactose', es: 'Intolerancia a la lactosa' } },
  { value: 'food_allergies', label: { en: 'Food allergies', pt: 'Alergias alimentares', es: 'Alergias alimentarias' } },
  { value: 'gastritis', label: { en: 'Gastritis', pt: 'Gastrite', es: 'Gastritis' } },
  { value: 'crohns_disease', label: { en: "Crohn's disease", pt: 'Doença de Crohn', es: 'Enfermedad de Crohn' } },
  { value: 'reflux', label: { en: 'Reflux', pt: 'Refluxo', es: 'Reflujo' } },
  { value: 'obesity', label: { en: 'Obesity', pt: 'Obesidade', es: 'Obesidad' } },
  { value: 'thyroid_issues', label: { en: 'Thyroid issues', pt: 'Problemas de tireoide', es: 'Problemas de tiroides' } },
  { value: 'other', label: { en: 'Other', pt: 'Outro', es: 'Otro' } }
];

// ============================================
// DIETARY PREFERENCES
// ============================================

export const DIETARY_PREFERENCES = [
  { value: 'omnivore', label: { en: 'Omnivore', pt: 'Omnívoro', es: 'Omnívoro' } },
  { value: 'vegetarian', label: { en: 'Vegetarian', pt: 'Vegetariano', es: 'Vegetariano' } },
  { value: 'vegan', label: { en: 'Vegan', pt: 'Vegano', es: 'Vegano' } },
  { value: 'pescatarian', label: { en: 'Pescatarian', pt: 'Pescetariano', es: 'Pescetariano' } },
  { value: 'low_carb', label: { en: 'Low-carb', pt: 'Low-carb', es: 'Bajo en carbohidratos' } },
  { value: 'low_fat', label: { en: 'Low-fat', pt: 'Low-fat', es: 'Bajo en grasas' } },
  { value: 'keto', label: { en: 'Keto', pt: 'Keto', es: 'Keto' } },
  { value: 'gluten_free', label: { en: 'Gluten-free', pt: 'Sem glúten', es: 'Sin gluten' } },
  { value: 'lactose_free', label: { en: 'Lactose-free', pt: 'Sem lactose', es: 'Sin lactosa' } },
  { value: 'religious', label: { en: 'Religious preferences', pt: 'Preferências religiosas', es: 'Preferencias religiosas' } }
];

// ============================================
// ACTIVITY LEVELS
// ============================================

export const ACTIVITY_LEVELS = [
  { value: 'sedentary', label: { en: 'Sedentary (little or no exercise)', pt: 'Sedentário (pouco ou nenhum exercício)', es: 'Sedentario (poco o ningún ejercicio)' } },
  { value: 'light', label: { en: 'Light (exercise 1-3 days/week)', pt: 'Leve (exercício 1-3 dias/semana)', es: 'Ligero (ejercicio 1-3 días/semana)' } },
  { value: 'moderate', label: { en: 'Moderate (exercise 3-5 days/week)', pt: 'Moderado (exercício 3-5 dias/semana)', es: 'Moderado (ejercicio 3-5 días/semana)' } },
  { value: 'active', label: { en: 'Active (exercise 6-7 days/week)', pt: 'Ativo (exercício 6-7 dias/semana)', es: 'Activo (ejercicio 6-7 días/semana)' } },
  { value: 'very_active', label: { en: 'Very active (intense exercise daily)', pt: 'Muito ativo (exercício intenso diário)', es: 'Muy activo (ejercicio intenso diario)' } }
];

// ============================================
// API ENDPOINTS
// ============================================

export const API_ENDPOINTS = {
  RECOMMENDATIONS: '/api/recommendations',
  SUBSTITUTIONS: '/api/substitutions',
  RECIPES: '/api/recipes',
  SCANNER: '/api/scanner',
  CHAT: '/api/chat',
  MEAL_PLAN: '/api/meal-plan',
  HEALTH_METRICS: '/api/health-metrics',
  SUBSCRIPTION: '/api/subscription'
};

// ============================================
// FEATURE FLAGS (PHASE CONTROL)
// ============================================

export const FEATURES = {
  PHASE_1: {
    ONBOARDING: true,
    RECOMMENDATIONS: true,
    SUBSTITUTIONS: true,
    RECIPES: true,
    SCANNER: true,
    CHAT: true,
    SUBSCRIPTIONS: true
  },
  PHASE_2: {
    ADVANCED_SCANNER: true,
    WEARABLES: true,
    HEALTH_TRACKING: true,
    GAMIFICATION: true,
    MEAL_PLANS: true
  },
  PHASE_3: {
    PROFESSIONAL_PANEL: true,
    MULTI_PATIENT: true,
    REPORTS: true,
    EHR_INTEGRATION: false // Future
  }
};
