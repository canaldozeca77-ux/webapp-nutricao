import { createClient } from '@supabase/supabase-js'

// Função para obter o cliente Supabase de forma segura
export function getSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''

  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('⚠️ Supabase credentials not configured. Please set up your Supabase project in Settings > Integrations.')
    // Retorna um cliente mock para evitar erros
    return null
  }

  return createClient(supabaseUrl, supabaseAnonKey)
}

// Cliente Supabase singleton
export const supabase = getSupabaseClient()
