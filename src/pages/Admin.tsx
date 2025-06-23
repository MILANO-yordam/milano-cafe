import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { 
  Package, 
  Users, 
  ShoppingBag, 
  Check, 
  Clock, 
  Plus,
  Bell,
  Trash2
} from 'lucide-react'
import { useOrderStore } from '../store/orderStore'
import { useAuthStore } from '../store/authStore'
import toast from 'react-hot-toast'

const Admin = () => {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { orders, updateOrderStatus } = useOrderStore()
  const [activeTab, setActiveTab] = useState('orders')
  const [newItem, setNewItem] = useState({
    name: '',
    price: '',
    recipe: '',
    category: '',
    image: ''
  })

  // Only allow access for specific email
  if (user?.email !== 'devolper2011@gmail.com') {
    return (
      <div className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-white mb-2">Ruxsat yo'q</h2>
          <p className="text-white/70">Bu sahifaga kirish uchun ruxsatingiz yo'q</p>
        </div>
      </div>
    )
  }

  const pendingOrders = orders.filter(order => order.status === 'pending')
  const confirmedOrders = orders.filter(order => order.status === 'confirmed')
  const completedOrders = orders.filter(order => order.status === 'completed')

  const handleConfirmOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'confirmed')
    toast.success('Buyurtma tasdiqlandi!', {
      icon: '✅',
      duration: 3000
    })
  }

  const handleCompleteOrder = (orderId: string) => {
    updateOrderStatus(orderId, 'completed')
    toast.success('Buyurtma yakunlandi!', {
      icon: '🎉',
      duration: 3000
    })
  }

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send to backend
    toast.success('Yangi taom qo\'shildi!', {
      icon: '🍽️',
      duration: 3000
    })
    setNewItem({ name: '', price: '', recipe: '', category: '', image: '' })
  }

  const tabs = [
    { id: 'orders', label: 'Buyurtmalar', icon: ShoppingBag, count: pendingOrders.length },
    { id: 'confirmed', label: 'Tasdiqlangan', icon: Check, count: confirmedOrders.length },
    { id: 'completed', label: 'Yakunlangan', icon: Clock, count: completedOrders.length },
    { id: 'add-item', label: 'Taom qo\'shish', icon: Plus, count: 0 }
  ]

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-5xl font-display font-bold gradient-text mb-4">
            {t('admin.title')}
          </h1>
          <p className="text-white/70 text-xl">
            Xush kelibsiz, {user?.name}! Restoran boshqaruvi
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap gap-4 mb-8"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === tab.id
                  ? 'bg-primary-500 text-white shadow-lg'
                  : 'glass-effect text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              <tab.icon size={20} />
              <span className="font-medium">{tab.label}</span>
              {tab.count > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold"
                >
                  {tab.count}
                </motion.span>
              )}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-effect rounded-2xl p-8"
        >
          {/* Pending Orders */}
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Bell className="mr-3" />
                Yangi buyurtmalar ({pendingOrders.length})
              </h2>
              
              {pendingOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">📋</div>
                  <p className="text-white/70 text-xl">Yangi buyurtmalar yo'q</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {pendingOrders.map((order) => (
                    <div key={order.id} className="glass-effect rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{order.customerName}</h3>
                          <p className="text-white/70">{order.customerEmail}</p>
                          <p className="text-white/50 text-sm">
                            {new Date(order.createdAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold gradient-text">
                            {order.totalPrice.toLocaleString()} so'm
                          </p>
                          <p className="text-white/70">Jami summa</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2">Buyurtma tarkibi:</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between items-center">
                              <span className="text-white/70">
                                {item.name} x{item.quantity}
                              </span>
                              <span className="text-white">
                                {(item.price * item.quantity).toLocaleString()} so'm
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="text-white font-semibold mb-2">Yetkazib berish manzili:</h4>
                        <p className="text-white/70">{order.location.address}</p>
                      </div>

                      <button
                        onClick={() => handleConfirmOrder(order.id)}
                        className="w-full btn-primary flex items-center justify-center space-x-2"
                      >
                        <Check size={20} />
                        <span>Buyurtmani tasdiqlash</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Confirmed Orders */}
          {activeTab === 'confirmed' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Tasdiqlangan buyurtmalar ({confirmedOrders.length})
              </h2>
              
              {confirmedOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">✅</div>
                  <p className="text-white/70 text-xl">Tasdiqlangan buyurtmalar yo'q</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {confirmedOrders.map((order) => (
                    <div key={order.id} className="glass-effect rounded-xl p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-white">{order.customerName}</h3>
                          <p className="text-green-400 font-semibold">✅ Tasdiqlangan</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold gradient-text">
                            {order.totalPrice.toLocaleString()} so'm
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCompleteOrder(order.id)}
                        className="w-full btn-secondary flex items-center justify-center space-x-2"
                      >
                        <Clock size={20} />
                        <span>Yakunlash</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Completed Orders */}
          {activeTab === 'completed' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                Yakunlangan buyurtmalar ({completedOrders.length})
              </h2>
              
              {completedOrders.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🎉</div>
                  <p className="text-white/70 text-xl">Yakunlangan buyurtmalar yo'q</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {completedOrders.map((order) => (
                    <div key={order.id} className="glass-effect rounded-xl p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-lg font-bold text-white">{order.customerName}</h3>
                          <p className="text-blue-400 font-semibold">🎉 Yakunlangan</p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold gradient-text">
                            {order.totalPrice.toLocaleString()} so'm
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Add New Item */}
          {activeTab === 'add-item' && (
            <div>
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Plus className="mr-3" />
                Yangi taom qo'shish
              </h2>
              
              <form onSubmit={handleAddItem} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 mb-2">Taom nomi</label>
                    <input
                      type="text"
                      value={newItem.name}
                      onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                      required
                      className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
                      placeholder="Masalan: Klassik Burger"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-2">Narx (so'm)</label>
                    <input
                      type="number"
                      value={newItem.price}
                      onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                      required
                      className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
                      placeholder="45000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-2">Retsept</label>
                  <textarea
                    value={newItem.recipe}
                    onChange={(e) => setNewItem({...newItem, recipe: e.target.value})}
                    required
                    rows={3}
                    className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500 resize-none"
                    placeholder="Taom tarkibi va tayyorlash usuli..."
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white/70 mb-2">Kategoriya</label>
                    <select
                      value={newItem.category}
                      onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                      required
                      className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white focus:outline-none focus:border-primary-500"
                    >
                      <option value="">Kategoriya tanlang</option>
                      <option value="burgers">Burgerlar</option>
                      <option value="pizza">Pizza</option>
                      <option value="hotdogs">Hot Doglar</option>
                      <option value="chicken">Tovuq</option>
                      <option value="salads">Salatlar</option>
                      <option value="seafood">Dengiz mahsulotlari</option>
                      <option value="steaks">Steaklar</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-2">Rasm URL</label>
                    <input
                      type="url"
                      value={newItem.image}
                      onChange={(e) => setNewItem({...newItem, image: e.target.value})}
                      required
                      className="w-full px-4 py-3 glass-effect rounded-xl border border-white/20 text-white placeholder-white/50 focus:outline-none focus:border-primary-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Taom qo'shish</span>
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Admin