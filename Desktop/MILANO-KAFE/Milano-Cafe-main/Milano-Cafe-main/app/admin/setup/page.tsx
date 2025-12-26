"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Coffee, AlertCircle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"

export default function AdminSetupPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [email, setEmail] = useState("devolper2011@gmail.com")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [setupSteps, setSetupSteps] = useState({
    adminUser: false,
    database: false,
    testData: false,
  })

  const createAdminUser = async () => {
    if (!email || !password) {
      toast({
        title: "Xatolik",
        description: "Email va parol zarur",
        variant: "destructive",
      })
      return
    }

    if (password !== confirmPassword) {
      toast({
        title: "Xatolik",
        description: "Parollar mos kelmadi",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Xatolik",
        description: "Parol kamida 8 ta belgidan iborat bo'lishi kerak",
        variant: "destructive",
      })
      return
    }

    setLoading(true)

    try {
      const response = await fetch("/api/admin/create-admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Admin user yaratishda xatolik")
      }

      setSetupSteps((prev) => ({ ...prev, adminUser: true }))
      toast({
        title: "Muvaffaqiyatli",
        description: `Admin user "${email}" muvaffaqiyatli yaratildi`,
      })

      // Auto redirect after 2 seconds
      setTimeout(() => {
        router.push("/auth/login")
      }, 2000)
    } catch (error) {
      toast({
        title: "Xatolik",
        description: error instanceof Error ? error.message : "Noma'lum xatolik",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600">
              <Coffee className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="font-serif text-3xl font-bold text-white mb-2">MILANO KAFE</h1>
          <p className="text-slate-400">Admin Panel O'rnatish</p>
        </div>

        {/* Setup Card */}
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-white">Admin Foydalanuvchisi Yaratish</CardTitle>
            <CardDescription className="text-slate-400">
              Birinchi admin hisobini yarating va sistem sozlamalarini yangilang
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">
                Email Manzili
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-400">
                Admin panel uchun email manzili
              </p>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Parol
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Xavfsiz parol kiriting"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
              <p className="text-xs text-slate-400">
                Kamida 8 ta belgidan iborat bo'lishi kerak
              </p>
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-slate-200">
                Parolni Tasdiqlash
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Parolni qayta kiriting"
                className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500"
              />
            </div>

            {/* Info Box */}
            <div className="bg-blue-900/30 border border-blue-700 rounded-lg p-4 flex gap-3">
              <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-blue-200">
                <p className="font-semibold mb-1">Muhim:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Parolni xavfsiz joyga saqlang</li>
                  <li>• Email manzili emailni olish uchun mavjud bo'lishi kerak</li>
                  <li>• Admin yaratilgandan so'ng tizimga kirish mumkin bo'ladi</li>
                </ul>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={createAdminUser}
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold"
              >
                {loading ? "Yaratilmoqda..." : "Admin Yaratish"}
              </Button>
            </div>

            {/* Setup Progress */}
            <div className="space-y-3 pt-4 border-t border-slate-700">
              <h3 className="text-sm font-semibold text-slate-200">O'rnatish Bosqichlari:</h3>
              <div className="space-y-2">
                {[
                  { key: "adminUser", label: "Admin Foydalanuvchisi Yaratish" },
                  { key: "database", label: "Database Sozlamalari (Avtomatik)" },
                  { key: "testData", label: "Test Ma'lumotlari (Avtomatik)" },
                ].map((step) => (
                  <div key={step.key} className="flex items-center gap-3 text-sm">
                    {setupSteps[step.key as keyof typeof setupSteps] ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2 border-slate-600 flex-shrink-0" />
                    )}
                    <span className="text-slate-300">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-400">
          <p>
            Ish stali: <a href="https://milanokafe.uz" className="text-amber-400 hover:text-amber-300">
              Milano Kafe
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
