import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { 
  Home, 
  Menu as MenuIcon, 
  ShoppingCart, 
  Phone, 
  Info, 
  Globe, 
  User,
  LogOut,
  Settings,
  Languages
} from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import { useAuthStore } from '../store/authStore'
import LanguageSwitcher from './LanguageSwitcher'

const Header = () => {
  const { t } = useTranslation()
  const location = useLocation()
  const { getTotalItems } = useCartStore()
  const { user, isAuthenticated, logout } = useAuthStore()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const totalItems = getTotalItems()

  const navItems = [
    { path: '/', icon: Home, label: t('nav.home') },
    { path: '/menu', icon: MenuIcon, label: t('nav.menu') },
    { path: '/cart', icon: ShoppingCart, label: t('nav.cart'), badge: totalItems },
    { path: '/contact', icon: Phone, label: t('nav.contact') },
    { path: '/about', icon: Info, label: t('nav.about') },
    { path: '/virtual', icon: Globe, label: t('nav.virtual') },
  ]

  // Show admin only for specific email
  if (user?.email === 'devolper2011@gmail.com') {
    navItems.push({ path: '/admin', icon: Settings, label: t('nav.admin') })
  }

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-white/10"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col items-center">
            <motion.h1 
              className="text-4xl font-display font-bold gradient-text"
              whileHover={{ scale: 1.05 }}
            >
              Milano
            </motion.h1>
            <span className="text-gold-400 text-sm font-semibold tracking-widest">
              CAFE
            </span>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
                {item.badge && item.badge > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                  >
                    {item.badge}
                  </motion.span>
                )}
              </Link>
            ))}
          </nav>

          {/* User Menu & Language Switcher */}
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300"
                >
                  <User size={20} className="text-white" />
                  <span className="text-white font-medium">{user?.name}</span>
                </button>
                
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute right-0 mt-2 w-48 glass-effect rounded-lg shadow-xl border border-white/20"
                  >
                    <button
                      onClick={() => {
                        logout()
                        setShowUserMenu(false)
                      }}
                      className="w-full flex items-center space-x-2 px-4 py-3 text-white hover:bg-white/10 rounded-lg transition-all duration-300"
                    >
                      <LogOut size={18} />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </motion.div>
                )}
              </div>
            ) : (
              <Link
                to="/auth"
                className="flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-500 hover:bg-primary-600 text-white transition-all duration-300"
              >
                <User size={20} />
                <span className="font-medium">{t('nav.login')}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-4 flex flex-wrap gap-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative flex items-center space-x-1 px-3 py-2 rounded-full text-sm transition-all duration-300 ${
                location.pathname === item.path
                  ? 'bg-primary-500 text-white'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <item.icon size={16} />
              <span>{item.label}</span>
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </motion.header>
  )
}

export default Header