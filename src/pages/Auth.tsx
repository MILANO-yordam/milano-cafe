import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const Auth = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { login, register } = useAuthStore()
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const success = await login(formData.email, formData.password)
        if (success) {
          toast.success(t('notifications.loginSuccess'), {
            icon: '🎉',
            duration: 3000
          })
          navigate('/')
        } else {
          toast.error('Email yoki parol noto\'g\'ri')
        }
      } else {
        if (formData.password !== formData.confirmPassword) {
          toast.error('Parollar mos kelmaydi')
          return
        }
        
        const success = await register(formData.email, formData.password, formData.name)
        if (success) {
          toast.success(t('notifications.registerSuccess'), {
            icon: '🎉',
            duration: 3000
          })
          navigate('/')
        }
      }
    } catch (error) {
      toast.error('Xatolik yuz berdi')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="glass-effect rounded-2xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              {isLogin ? t('auth.login') : t('auth.register')}
            </h1>
            <p className="text-white/70">
              {isLogin ? 'Hisobingizga kiring' : 'Yangi hisob yarating'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLogin && (
              <div>
                <label className="block text-white/70 mb-2 flex items-center">
                  <User size={18} className="mr-2" />
                  Ism
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
                  placeholder="Ismingizni kiriting"
                />
              </div>
            )}

            <div>
              <label className="block text-white/70 mb-2 flex items-center">
                <Mail size={18} className="mr-2" />
                {t('auth.email')}
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
                placeholder="email@example.com"
              />
            </div>

            <div>
              <label className="block text-white/70 mb-2 flex items-center">
                <Lock size={18} className="mr-2" />
                {t('auth.password')}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 pr-12 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
                  placeholder="Parolingizni kiriting"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-white/70 mb-2 flex items-center">
                  <Lock size={18} className="mr-2" />
                  {t('auth.confirmPassword')}
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
                  placeholder="Parolni takrorlang"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="loading-spinner w-5 h-5"></div>
              ) : (
                <>
                  <User size={20} />
                  <span>{isLogin ? t('auth.login') : t('auth.register')}</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-white/70 hover:text-white transition-colors"
            >
              {isLogin 
                ? "Hisobingiz yo'qmi? Ro'yxatdan o'ting" 
                : "Hisobingiz bormi? Kiring"
              }
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Auth