'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'
import { useI18n } from '@/lib/i18n-context'
import { Send, Bot, User, Loader2, AlertCircle } from 'lucide-react'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

export default function ChatbotPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hello! I\'m your nutrition assistant. I can help you with meal planning, nutrition questions, recipe ideas, and more. What would you like to know?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [supabaseConfigured, setSupabaseConfigured] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const supabase = getSupabaseClient()
    if (!supabase) {
      setSupabaseConfigured(false)
    } else {
      checkUser()
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const checkUser = async () => {
    const supabase = getSupabaseClient()
    if (supabase) {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/login')
      }
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Simulate AI response (in a real app, this would call an AI service like OpenAI)
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Mock responses based on keywords
      let response = ''
      const lowerInput = input.toLowerCase()

      if (lowerInput.includes('calories') || lowerInput.includes('kcal')) {
        response = 'To maintain a healthy weight, aim for 1,800-2,400 calories per day depending on your age, gender, and activity level. I can help you calculate your specific needs based on your profile!'
      } else if (lowerInput.includes('protein') || lowerInput.includes('protein')) {
        response = 'Protein is essential for muscle repair and growth. Good sources include chicken, fish, eggs, beans, and nuts. Aim for 1.6-2.2 grams per kg of body weight daily.'
      } else if (lowerInput.includes('recipe') || lowerInput.includes('cook')) {
        response = 'I can suggest healthy recipes! For example, try a grilled chicken salad with mixed greens, cherry tomatoes, cucumber, and a light vinaigrette. Would you like the full recipe?'
      } else if (lowerInput.includes('weight') && lowerInput.includes('lose')) {
        response = 'Sustainable weight loss involves creating a calorie deficit while maintaining nutrient-dense foods. Focus on whole foods, portion control, and regular exercise. Aim for 0.5-1 kg per week.'
      } else if (lowerInput.includes('water') || lowerInput.includes('hydration')) {
        response = 'Stay hydrated! Aim for 8-10 glasses (2-3 liters) of water daily. Signs of dehydration include dry mouth, fatigue, and dark urine.'
      } else if (lowerInput.includes('vitamin') || lowerInput.includes('supplement')) {
        response = 'While supplements can help, focus on getting nutrients from whole foods first. Common deficiencies include vitamin D, B12, and iron. Consult a doctor before starting supplements.'
      } else {
        response = 'That\'s a great question! For personalized nutrition advice, I recommend consulting with a registered dietitian. In the meantime, I can help with general nutrition information and meal planning.'
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, assistantMessage])

      // Save conversation to database
      const supabase = getSupabaseClient()
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('chat_messages').insert([
            {
              user_id: user.id,
              role: 'user',
              content: input,
              created_at: new Date().toISOString(),
            },
            {
              user_id: user.id,
              role: 'assistant',
              content: response,
              created_at: new Date().toISOString(),
            },
          ])
        }
      }
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Sorry, I\'m having trouble responding right now. Please try again later.',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
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
                Supabase Required
              </h1>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please configure Supabase to use the chatbot feature.
            </p>
            <button
              onClick={() => router.push('/')}
              className="block w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition font-semibold text-center"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Nutrition Assistant
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Ask me anything about nutrition, recipes, and healthy eating
          </p>
        </div>

        {/* Chat Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
          {/* Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.role === 'assistant' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                      <Bot className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                {message.role === 'user' && (
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 justify-start">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 px-4 py-2 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about nutrition, recipes, or healthy eating..."
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                disabled={isLoading}
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Questions */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">
            Quick Questions
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              'How many calories should I eat daily?',
              'What are good protein sources?',
              'Suggest a healthy dinner recipe',
            ].map((question, index) => (
              <button
                key={index}
                onClick={() => setInput(question)}
                className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-md transition text-left"
              >
                <p className="text-sm text-gray-700 dark:text-gray-300">{question}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Back to Dashboard */}
        <div className="text-center mt-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="text-emerald-600 hover:text-emerald-700 transition"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}