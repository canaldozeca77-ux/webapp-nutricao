'use client'

import { useEffect, useState } from 'react'
import { getSupabaseClient } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Utensils, TrendingUp, Target, Calendar, LogOut, Loader2, AlertCircle } from 'lucide-react'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [supabaseConfigured, setSupabaseConfigured] = useState(true)

  useEffect(() => {
    checkUser()
  }, [])

  const checkUser = async () => {
    const supabase = getSupabaseClient()
    
    if (!supabase) {
      setSupabaseConfigured(false)
      setIsLoading(false)
      return
    }

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/login')
    } else {
      setUser(user)
    }
    setIsLoading(false)
  }

  const handleLogout = async () => {
    const supabase = getSupabaseClient()
    if (supabase) {
      await supabase.auth.signOut()
    }
    router.push('/')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
      </div>
    )
  }

  if (!supabaseConfigured) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="h-8 w-8 text-orange-500" />
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Supabase Not Configured
              </h1>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              To use the dashboard, please configure your Supabase project:
            </p>

            <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300 mb-6">
              <li>Go to <strong>Project Settings</strong> (gear icon)</li>
              <li>Click on <strong>Integrations</strong></li>
              <li>Select a <strong>Supabase project</strong> from the list</li>
            </ol>

            <Link 
              href="/"
              className="block w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Utensils className="h-8 w-8 text-emerald-600" />
              <span className="text-2xl font-bold text-gray-900 dark:text-white">NutriOne</span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-emerald-600 transition"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Here's your nutrition overview for today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Target, label: 'Daily Goal', value: '2000 kcal', color: 'emerald' },
            { icon: TrendingUp, label: 'Progress', value: '75%', color: 'blue' },
            { icon: Calendar, label: 'Streak', value: '7 days', color: 'purple' },
            { icon: Utensils, label: 'Meals Today', value: '2/3', color: 'orange' },
          ].map((stat, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <stat.icon className={`h-8 w-8 text-${stat.color}-600`} />
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Today's Meals */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Today's Meals</h2>
          <div className="space-y-4">
            {[
              { meal: 'Breakfast', time: '8:00 AM', calories: '450 kcal', status: 'completed' },
              { meal: 'Lunch', time: '1:00 PM', calories: '650 kcal', status: 'completed' },
              { meal: 'Dinner', time: '7:00 PM', calories: '600 kcal', status: 'pending' },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{item.meal}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{item.time}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900 dark:text-white">{item.calories}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    item.status === 'completed' 
                      ? 'bg-emerald-100 text-emerald-700' 
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-3 gap-6">
          <button className="p-6 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition text-left">
            <h3 className="font-bold text-lg mb-2">Scan Food</h3>
            <p className="text-emerald-100 text-sm">Get instant nutrition info</p>
          </button>
          <button className="p-6 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition text-left">
            <h3 className="font-bold text-lg mb-2">Log Meal</h3>
            <p className="text-blue-100 text-sm">Track your nutrition</p>
          </button>
          <button className="p-6 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition text-left">
            <h3 className="font-bold text-lg mb-2">View Recipes</h3>
            <p className="text-purple-100 text-sm">Find healthy meals</p>
          </button>
        </div>
      </main>
    </div>
  )
}
