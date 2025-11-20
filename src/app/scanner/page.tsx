'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabaseClient } from '@/lib/supabase'
import { useI18n } from '@/lib/i18n-context'
import { Camera, Upload, Loader2, AlertCircle, CheckCircle, X } from 'lucide-react'

export default function ScannerPage() {
  const router = useRouter()
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(false)
  const [supabaseConfigured, setSupabaseConfigured] = useState(true)
  const [image, setImage] = useState<string | null>(null)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)

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

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImage(e.target?.result as string)
        setResult(null)
        setError('')
      }
      reader.readAsDataURL(file)
    }
  }

  const openCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        setIsCameraOpen(true)
      }
    } catch (err) {
      setError('Camera access denied or not available')
    }
  }

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      canvas.getContext('2d')?.drawImage(video, 0, 0)
      const imageData = canvas.toDataURL('image/jpeg')
      setImage(imageData)
      setResult(null)
      setError('')
      closeCamera()
    }
  }

  const closeCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach(track => track.stop())
      setIsCameraOpen(false)
    }
  }

  const analyzeImage = async () => {
    if (!image) return

    setIsLoading(true)
    setError('')
    setResult(null)

    try {
      // Simulate AI analysis (in a real app, this would call an AI service)
      await new Promise(resolve => setTimeout(resolve, 2000))

      // Mock result - in real implementation, this would come from AI analysis
      const mockResults = [
        {
          food: 'Apple',
          calories: 95,
          nutrients: { protein: 0.5, carbs: 25, fat: 0.3 },
          category: 'Fruit',
          recommendations: 'Good source of fiber and vitamin C'
        },
        {
          food: 'Chicken Breast',
          calories: 165,
          nutrients: { protein: 31, carbs: 0, fat: 3.6 },
          category: 'Protein',
          recommendations: 'Lean protein, good for muscle building'
        },
        {
          food: 'Brown Rice',
          calories: 216,
          nutrients: { protein: 5, carbs: 44, fat: 1.8 },
          category: 'Grain',
          recommendations: 'Complex carbohydrate, good energy source'
        }
      ]

      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)]
      setResult(randomResult)

      // Save to database
      const supabase = getSupabaseClient()
      if (supabase) {
        const { data: { user } } = await supabase.auth.getUser()
        if (user) {
          await supabase.from('food_scans').insert({
            user_id: user.id,
            image_url: image,
            food_name: randomResult.food,
            calories: randomResult.calories,
            nutrients: randomResult.nutrients,
            category: randomResult.category,
            recommendations: randomResult.recommendations,
            scanned_at: new Date().toISOString(),
          })
        }
      }
    } catch (err) {
      setError('Failed to analyze image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetScanner = () => {
    setImage(null)
    setResult(null)
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
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
              Please configure Supabase to use the scanner feature.
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
            Food Scanner
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Scan any food to get instant nutrition information
          </p>
        </div>

        {/* Scanner Interface */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {!image ? (
            <div className="space-y-6">
              {/* Camera */}
              {isCameraOpen ? (
                <div className="space-y-4">
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full max-w-md mx-auto rounded-lg"
                    />
                    <canvas ref={canvasRef} className="hidden" />
                  </div>
                  <div className="flex justify-center gap-4">
                    <button
                      onClick={capturePhoto}
                      className="px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition"
                    >
                      Capture Photo
                    </button>
                    <button
                      onClick={closeCamera}
                      className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={openCamera}
                    className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-500 transition flex flex-col items-center gap-4"
                  >
                    <Camera className="h-12 w-12 text-gray-400" />
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Take Photo</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Use your camera to scan food</p>
                    </div>
                  </button>

                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="p-8 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-emerald-500 transition cursor-pointer flex flex-col items-center gap-4"
                  >
                    <Upload className="h-12 w-12 text-gray-400" />
                    <div className="text-center">
                      <p className="font-semibold text-gray-900 dark:text-white mb-1">Upload Image</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Choose from gallery</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="relative">
                <img
                  src={image}
                  alt="Food to analyze"
                  className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                />
                <button
                  onClick={resetScanner}
                  className="absolute top-2 right-2 p-2 bg-black bg-opacity-50 text-white rounded-full hover:bg-opacity-70 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Analyze Button */}
              <div className="text-center">
                <button
                  onClick={analyzeImage}
                  disabled={isLoading}
                  className="px-8 py-4 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Analyze Food
                    </>
                  )}
                </button>
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
                  <p className="text-red-800 dark:text-red-200 text-center">{error}</p>
                </div>
              )}

              {/* Results */}
              {result && (
                <div className="bg-emerald-50 dark:bg-emerald-900/20 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-emerald-800 dark:text-emerald-200 mb-4 text-center">
                    Analysis Results
                  </h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.food}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{result.category}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.calories}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Calories</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.nutrients.protein}g</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Protein</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.nutrients.carbs}g</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Carbs</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold text-gray-900 dark:text-white">{result.nutrients.fat}g</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Fat</p>
                      </div>
                    </div>
                    <div className="bg-white dark:bg-gray-700 p-4 rounded-lg">
                      <p className="text-gray-700 dark:text-gray-300 text-center">
                        <strong>Recommendation:</strong> {result.recommendations}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
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