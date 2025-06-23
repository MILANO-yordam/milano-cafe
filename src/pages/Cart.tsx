import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Minus, Plus, Trash2, MapPin, Send } from 'lucide-react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import { useCartStore } from '../store/cartStore'
import { useOrderStore } from '../store/orderStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'
import 'leaflet/dist/leaflet.css'

// Fix for default markers in react-leaflet
import L from 'leaflet'
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

const Cart = () => {
  const { t } = useTranslation()
  const { items, updateQuantity, removeItem, clearCart, getTotalPrice } = useCartStore()
  const { addOrder } = useOrderStore()
  const { user, isAuthenticated } = useAuthStore()
  const [showLocationPicker, setShowLocationPicker] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, address: string} | null>(null)

  const LocationPicker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng
        setSelectedLocation({
          lat,
          lng,
          address: `${lat.toFixed(6)}, ${lng.toFixed(6)}`
        })
      },
    })
    return selectedLocation ? <Marker position={[selectedLocation.lat, selectedLocation.lng]} /> : null
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
    } else {
      updateQuantity(id, newQuantity)
    }
  }

  const handleOrder = () => {
    if (!isAuthenticated) {
      toast.error('Buyurtma berish uchun tizimga kiring')
      return
    }

    if (items.length === 0) {
      toast.error('Savat bo\'sh')
      return
    }

    setShowLocationPicker(true)
  }

  const handleSendOrder = () => {
    if (!selectedLocation) {
      toast.error('Joylashuvni tanlang')
      return
    }

    const order = {
      items: [...items],
      totalPrice: getTotalPrice(),
      customerEmail: user!.email,
      customerName: user!.name,
      location: selectedLocation,
      status: 'pending' as const
    }

    addOrder(order)
    clearCart()
    setShowLocationPicker(false)
    setSelectedLocation(null)
    
    toast.success(t('notifications.orderSent'), {
      icon: '🚀',
      duration: 5000
    })
  }

  if (items.length === 0 && !showLocationPicker) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <div className="text-8xl mb-8">🛒</div>
          <h2 className="text-4xl font-bold text-white mb-4">{t('cart.empty')}</h2>
          <p className="text-white/70 text-xl mb-8">Menyudan mazali taomlar tanlang</p>
          <a href="/menu" className="btn-primary text-lg px-8 py-4">
            Menyuga o'tish
          </a>
        </motion.div>
      </div>
    )
  }

  if (showLocationPicker) {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-effect rounded-2xl p-8"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
              <MapPin className="mr-3" />
              {t('cart.location')}
            </h2>
            
            <div className="h-96 rounded-xl overflow-hidden mb-6">
              <MapContainer
                center={[41.2995, 69.2401]} // Tashkent coordinates
                zoom={13}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <LocationPicker />
              </MapContainer>
            </div>

            {selectedLocation && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-effect rounded-xl p-4 mb-6"
              >
                <h3 className="text-white font-semibold mb-2">Tanlangan joylashuv:</h3>
                <p className="text-white/70">{selectedLocation.address}</p>
              </motion.div>
            )}

            <div className="flex gap-4">
              <button
                onClick={() => setShowLocationPicker(false)}
                className="flex-1 py-3 px-6 glass-effect rounded-full text-white hover:bg-white/10 transition-all duration-300"
              >
                Orqaga
              </button>
              <button
                onClick={handleSendOrder}
                disabled={!selectedLocation}
                className="flex-1 btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send size={20} />
                <span>{t('cart.sendOrder')}</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-display font-bold gradient-text mb-4">
            {t('cart.title')}
          </h1>
          <p className="text-white/70 text-xl">
            {items.length} ta mahsulot tanlandi
          </p>
        </motion.div>

        <div className="space-y-6 mb-8">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect rounded-2xl p-6 flex items-center space-x-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover"
              />
              
              <div className="flex-1">
                <h3 className="text-xl font-bold text-white mb-2">{item.name}</h3>
                <p className="text-white/70 text-sm mb-2">{item.recipe}</p>
                <p className="text-gold-400 font-bold">
                  {item.price.toLocaleString()} so'm
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 glass-effect rounded-full px-4 py-2">
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    className="text-white hover:text-red-400 transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="text-white font-bold w-8 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    className="text-white hover:text-green-400 transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-400 hover:text-red-300 transition-colors p-2"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total and Order Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8"
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-2xl font-bold text-white">{t('cart.total')}:</span>
            <span className="text-3xl font-bold gradient-text">
              {getTotalPrice().toLocaleString()} so'm
            </span>
          </div>

          <button
            onClick={handleOrder}
            className="w-full btn-primary text-xl py-4 flex items-center justify-center space-x-3"
          >
            <span>🍔</span>
            <span>{t('cart.order')} ({getTotalPrice().toLocaleString()} so'm)</span>
          </button>
        </motion.div>
      </div>
    </div>
  )
}

export default Cart