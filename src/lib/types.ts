// ============================================
// NUTRIONE - TYPE DEFINITIONS
// ============================================

export type Language = 'en' | 'pt' | 'es' | 'fr' | 'de' | 'it' | 'zh' | 'ja';

export type Gender = 'male' | 'female' | 'other' | 'prefer_not_to_say';

export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';

export type Goal = 
  | 'lose_weight'
  | 'gain_muscle'
  | 'maintain_weight'
  | 'improve_diabetes'
  | 'improve_cholesterol'
  | 'improve_triglycerides'
  | 'improve_blood_pressure'
  | 'improve_digestive_health'
  | 'other';

export type Condition = 
  | 'diabetes_type1'
  | 'diabetes_type2'
  | 'prediabetes'
  | 'insulin_resistance'
  | 'high_cholesterol'
  | 'high_triglycerides'
  | 'hypertension'
  | 'kidney_disease'
  | 'liver_problems'
  | 'metabolic_syndrome'
  | 'celiac_disease'
  | 'lactose_intolerance'
  | 'food_allergies'
  | 'gastritis'
  | 'crohns_disease'
  | 'reflux'
  | 'obesity'
  | 'thyroid_issues'
  | 'other';

export type DietaryPreference = 
  | 'omnivore'
  | 'vegetarian'
  | 'vegan'
  | 'pescatarian'
  | 'low_carb'
  | 'low_fat'
  | 'keto'
  | 'gluten_free'
  | 'lactose_free'
  | 'religious';

export type FoodClassification = 'allowed' | 'ideal' | 'avoid' | 'prohibited';

export type SubscriptionTier = 'essential' | 'pro' | 'premium';

export type SubscriptionInterval = 'monthly' | 'yearly';

// ============================================
// USER PROFILE
// ============================================

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  gender: Gender;
  country: string;
  language: Language;
  weight: number; // kg
  height: number; // cm
  goals: Goal[];
  other_goal?: string;
  conditions: Condition[];
  other_conditions?: string[];
  dietary_preferences: DietaryPreference[];
  religious_preferences?: string;
  liked_foods: string[];
  disliked_foods: string[];
  prohibited_foods: string[];
  activity_level: ActivityLevel;
  meal_times: string[];
  cooking_time: number; // minutes
  weekly_budget: number; // USD
  additional_info?: string;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
}

// ============================================
// FOOD RECOMMENDATIONS
// ============================================

export interface FoodRecommendation {
  id: string;
  user_id: string;
  food_name: string;
  classification: FoodClassification;
  reason: string;
  alternatives?: string[];
  created_at: string;
}

// ============================================
// RECIPES
// ============================================

export interface Recipe {
  id: string;
  user_id?: string; // null for global recipes
  name: string;
  description: string;
  ingredients: RecipeIngredient[];
  instructions: string[];
  prep_time: number; // minutes
  cook_time: number; // minutes
  servings: number;
  macros: Macros;
  tags: string[];
  dietary_preferences: DietaryPreference[];
  suitable_for_conditions: Condition[];
  medical_justification: string;
  estimated_cost: number; // USD
  difficulty: 'easy' | 'medium' | 'hard';
  image_url?: string;
  created_at: string;
}

export interface RecipeIngredient {
  name: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface Macros {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sugar: number; // grams
  sodium: number; // mg
}

// ============================================
// FOOD SUBSTITUTIONS
// ============================================

export interface FoodSubstitution {
  id: string;
  user_id: string;
  original_food: string;
  substitute_food: string;
  reason: string;
  similarity_score: number; // 0-100
  health_improvement: string;
  created_at: string;
}

// ============================================
// SCANNER RESULTS
// ============================================

export interface ScannerResult {
  id: string;
  user_id: string;
  image_url: string;
  identified_foods: IdentifiedFood[];
  overall_classification: FoodClassification;
  recommendations: string;
  alternatives: string[];
  created_at: string;
}

export interface IdentifiedFood {
  name: string;
  confidence: number; // 0-100
  classification: FoodClassification;
  reason: string;
}

// ============================================
// HEALTH TRACKING (PHASE 2)
// ============================================

export interface HealthMetric {
  id: string;
  user_id: string;
  date: string;
  weight?: number;
  blood_glucose?: number;
  blood_pressure_systolic?: number;
  blood_pressure_diastolic?: number;
  cholesterol_total?: number;
  cholesterol_ldl?: number;
  cholesterol_hdl?: number;
  triglycerides?: number;
  notes?: string;
  created_at: string;
}

// ============================================
// MEAL PLANS
// ============================================

export interface MealPlan {
  id: string;
  user_id: string;
  week_start_date: string;
  meals: DailyMeals[];
  total_weekly_cost: number;
  created_at: string;
}

export interface DailyMeals {
  date: string;
  breakfast?: Recipe;
  lunch?: Recipe;
  dinner?: Recipe;
  snacks?: Recipe[];
}

// ============================================
// CHAT LOGS
// ============================================

export interface ChatMessage {
  id: string;
  user_id: string;
  role: 'user' | 'assistant';
  content: string;
  created_at: string;
}

// ============================================
// SUBSCRIPTIONS
// ============================================

export interface Subscription {
  id: string;
  user_id: string;
  tier: SubscriptionTier;
  interval: SubscriptionInterval;
  status: 'active' | 'trial' | 'cancelled' | 'expired';
  stripe_subscription_id?: string;
  stripe_customer_id?: string;
  current_period_start: string;
  current_period_end: string;
  trial_end?: string;
  cancel_at_period_end: boolean;
  created_at: string;
  updated_at: string;
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  description: string;
  features: string[];
  monthly_price: number;
  yearly_price: number;
  yearly_savings: number;
  trial_days?: number;
}

// ============================================
// GAMIFICATION (PHASE 2)
// ============================================

export interface Achievement {
  id: string;
  user_id: string;
  achievement_type: string;
  title: string;
  description: string;
  icon: string;
  earned_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_scans: number;
  total_recipes_created: number;
  total_substitutions: number;
  days_streak: number;
  total_points: number;
  level: number;
  updated_at: string;
}

// ============================================
// PROFESSIONAL PANEL (PHASE 3 - B2B)
// ============================================

export interface ProfessionalProfile {
  id: string;
  user_id: string;
  professional_type: 'nutritionist' | 'dietitian' | 'clinic' | 'doctor';
  license_number: string;
  clinic_name?: string;
  verified: boolean;
  patients: string[]; // user_ids
  created_at: string;
}

export interface PatientReport {
  id: string;
  professional_id: string;
  patient_id: string;
  report_type: 'progress' | 'initial_assessment' | 'follow_up';
  content: any;
  generated_at: string;
}

// ============================================
// ONBOARDING STATE
// ============================================

export interface OnboardingState {
  step: number;
  totalSteps: number;
  data: Partial<UserProfile>;
}
