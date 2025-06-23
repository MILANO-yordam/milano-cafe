import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ShoppingCart, Star } from 'lucide-react'
import { useCartStore } from '../store/cartStore'
import toast from 'react-hot-toast'

interface FoodItem {
  id: string
  name: string
  price: number
  image: string
  recipe: string
  rating: number
  category: string
}

interface FoodCardProps {
  item: FoodItem
  index: number
}

const FoodCard: React.FC<FoodCardProps> = ({ item, index }) => {
  const { t } = useTranslation()
  const { addItem } = useCartStore()

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      recipe: item.recipe
    })
    toast.success(t('notifications.addedToCart'), {
      icon: '🛒',
      duration: 3000
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -10 }}
      className="food-card bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden border border-white/20 shadow-xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center space-x-1">
          <Star size={14} className="text-yellow-400 fill-current" />
          <span className="text-white text-sm font-medium">{item.rating}</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
        <p className="text-white/70 text-sm mb-4 line-clamp-2">{item.recipe}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-2xl font-bold gradient-text">
              {item.price.toLocaleString()} so'm
            </span>
            <span className="text-white/50 text-xs">{t('menu.price')}</span>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            className="btn-primary flex items-center space-x-2"
          >
            <ShoppingCart size={18} />
            <span className="hidden sm:inline">{t('menu.addToCart')}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default FoodCard