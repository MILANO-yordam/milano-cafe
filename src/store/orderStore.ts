import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from './cartStore'

export interface Order {
  id: string
  items: CartItem[]
  totalPrice: number
  customerEmail: string
  customerName: string
  location: {
    lat: number
    lng: number
    address: string
  }
  status: 'pending' | 'confirmed' | 'completed'
  createdAt: Date
}

interface OrderState {
  orders: Order[]
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => void
  updateOrderStatus: (id: string, status: Order['status']) => void
  getOrdersByEmail: (email: string) => Order[]
  getAllOrders: () => Order[]
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (orderData) => {
        const order: Order = {
          ...orderData,
          id: Date.now().toString(),
          createdAt: new Date()
        }
        set({ orders: [...get().orders, order] })
      },
      updateOrderStatus: (id, status) => {
        set({
          orders: get().orders.map(order =>
            order.id === id ? { ...order, status } : order
          )
        })
      },
      getOrdersByEmail: (email) => {
        return get().orders.filter(order => order.customerEmail === email)
      },
      getAllOrders: () => get().orders
    }),
    {
      name: 'orders-storage'
    }
  )
)