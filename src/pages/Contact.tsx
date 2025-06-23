import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Send, MessageCircle, User, Mail } from 'lucide-react'
import toast from 'react-hot-toast'

const Contact = () => {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Simulate sending message
    toast.success('Xabar yuborildi! Tez orada javob beramiz.', {
      icon: '📧',
      duration: 5000
    })
    
    setFormData({ name: '', email: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-6">
            {t('contact.title')}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Bizga yozing! Har qanday savol yoki takliflaringizni eshitishdan xursandmiz.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <MessageCircle className="mr-3" />
              Xabar yuborish
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-white/70 mb-2 flex items-center">
                  <User size={18} className="mr-2" />
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
                  placeholder="Ismingizni kiriting"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-2 flex items-center">
                  <Mail size={18} className="mr-2" />
                  {t('contact.email')}
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
                <label className="block text-white/70 mb-2">
                  {t('contact.message')}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500 resize-none"
                  placeholder="Xabaringizni yozing..."
                />
              </div>

              <button
                type="submit"
                className="w-full btn-primary flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>{t('contact.send')}</span>
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Aloqa ma'lumotlari</h3>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    📞
                  </div>
                  <div>
                    <p className="text-white/70">Telefon</p>
                    <p className="text-white font-semibold">+998 90 123 45 67</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    📍
                  </div>
                  <div>
                    <p className="text-white/70">Manzil</p>
                    <p className="text-white font-semibold">Toshkent sh., Chilonzor t., Milano ko'chasi 1-uy</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                    📧
                  </div>
                  <div>
                    <p className="text-white/70">Email</p>
                    <p className="text-white font-semibold">info@milanocafe.uz</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Ijtimoiy tarmoqlar</h3>
              
              <div className="flex space-x-4">
                <a
                  href="https://instagram.com/milanocafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  📷
                </a>
                <a
                  href="https://t.me/milanocafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  ✈️
                </a>
                <a
                  href="https://facebook.com/milanocafe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  📘
                </a>
              </div>
            </div>

            <div className="glass-effect rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Ish vaqti</h3>
              <div className="space-y-2 text-white/70">
                <p>Dushanba - Yakshanba: 09:00 - 23:00</p>
                <p>Bayramlar: 10:00 - 22:00</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Contact