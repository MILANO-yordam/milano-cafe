import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Search, Filter } from 'lucide-react'
import FoodCard from '../components/FoodCard'

const Menu = () => {
  const { t } = useTranslation()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const menuItems = [
    {
      id: '1',
      name: 'Klassik Burger',
      price: 45000,
      image: 'https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=400',
      recipe: 'Yumshoq bulochka, mol go\'shti, pomidor, salat, piyoz, maxsus sous',
      rating: 4.8,
      category: 'burgers'
    },
    {
      id: '2',
      name: 'Margarita Pizza',
      price: 55000,
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
      recipe: 'Klassik italyan pitsasi, mozzarella, pomidor sousi, rayhon',
      rating: 4.9,
      category: 'pizza'
    },
    {
      id: '3',
      name: 'Hot Dog Deluxe',
      price: 25000,
      image: 'https://images.pexels.com/photos/4676410/pexels-photo-4676410.jpeg?auto=compress&cs=tinysrgb&w=400',
      recipe: 'Premium kolbasa, maxsus bulochka, ketchup, gorchitsa, piyoz',
      rating: 4.6,
      category: 'hotdogs'
    },
    {
      id: '4',
      name: 'Chicken Wings',
      price: 35000,
      image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg?auto=compress&cs=tinysrgb&w=400',
      recipe: 'Achchiq tovuq qanotlari, maxsus sous, sabzavotlar',
      rating: 4.7,
      category: 'chicken'
    },
    {
      id: '5',
      name: 'Caesar Salad',
      price: 30000,
      image: 'https://images.pexels.com/photos/1059905/pexels-photo-1059905.jpeg?auto=compress&cs=tinysrgb&w=400',
      recipe: 'Yangi salat barglari, parmesan pishloqi, kruton, Caesar sousi',
      rating: 4.5,
      category: 'salads'
    },
    {
      id: '6',
      name: 'Pepperoni Pizza',
      price: 60000,
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg?auto=compress&cs=tinysrgb&w=400',
      recipe: 'Pepperoni kolbasasi, mozzarella, pomidor sousi',
      rating: 4.8,
      category: 'pizza'
    },
    {
      id: '7',
      name: 'Fish & Chips',
      price: 40000,
      image: 'https://images.pexels.com/photos/1633578/pexels-photo-1633578.jpeg?auto=compress&cs=tinysrgb&w=400',
      recipe: 'Qovurilgan baliq, kartoshka fri, tartar sousi',
      rating: 4.4,
      category: 'seafood'
    },
    {
      id: '8',
      name: 'Beef Steak',
      price: 85000,
      image: 'https://images.pexels.com/photos/361184/asparagus-steak-veal-steak-veal-361184.jpeg?auto=compress&cs=tinysrgb&w=400',
      recipe: 'Premium mol go\'shti, grilled sabzavotlar, maxsus sous',
      rating: 4.9,
      category: 'steaks'
    }
  ]

  const categories = [
    { id: 'all', name: 'Barchasi' },
    { id: 'burgers', name: 'Burgerlar' },
    { id: 'pizza', name: 'Pizza' },
    { id: 'hotdogs', name: 'Hot Doglar' },
    { id: 'chicken', name: 'Tovuq' },
    { id: 'salads', name: 'Salatlar' },
    { id: 'seafood', name: 'Dengiz mahsulotlari' },
    { id: 'steaks', name: 'Steaklar' }
  ]

  const filteredItems = menuItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-display font-bold gradient-text mb-6">
            {t('menu.title')}
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Eng mazali va sifatli taomlarimizni tanlang
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/50" />
              <input
                type="text"
                placeholder="Taom qidirish..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 glass-effect rounded-full border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-primary-500 text-white'
                      : 'glass-effect text-white/70 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredItems.map((item, index) => (
            <FoodCard key={item.id} item={item} index={index} />
          ))}
        </div>

        {/* No Results */}
        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-2xl font-bold text-white mb-2">Hech narsa topilmadi</h3>
            <p className="text-white/70">Boshqa kalit so'z bilan qidiring yoki kategoriyani o'zgartiring</p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Menu