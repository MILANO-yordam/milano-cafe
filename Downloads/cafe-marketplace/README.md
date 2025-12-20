# MILANO KAFE - Premium Restaurant Marketplace

A luxury restaurant marketplace platform built with Next.js, Supabase, and Tailwind CSS. Features real-time order management, admin dashboard with notifications, user management, and full dark mode support.

## 🎯 Features

### Customer Features
- 🍕 Product catalog with categories and search
- 🛒 Shopping cart management
- 💳 Secure checkout
- 👤 User authentication and profile management
- 📱 Fully responsive mobile design
- 🌙 Dark mode support
- ✉️ Contact form

### Admin Features
- 📊 Real-time dashboard with statistics
- 🔔 Live order and message notifications
- 🔊 15-second audio alert system
- 📱 Web push notifications (browser notifications)
- 👥 User management (admin roles, ban/unban system)
- 🏪 Product management
- 📋 Order management with status tracking
- 💬 Message management
- ⚙️ Settings panel
- 🎨 Dark mode toggle

## 🛠️ Tech Stack

- **Frontend:** Next.js 16.0.10 with Turbopack
- **Styling:** Tailwind CSS with CSS Variables
- **UI Components:** shadcn/ui with Radix UI
- **Backend:** Supabase (PostgreSQL + Auth)
- **Real-time:** Supabase Realtime API
- **Theme:** next-themes for dark mode
- **Icons:** Lucide React
- **Forms:** React Hook Form

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or pnpm
- Supabase account
- Environment variables configured

### Installation

```bash
# Clone repository
git clone https://github.com/MILANO-yordam/milano-cafe.git
cd milano-cafe

# Install dependencies
npm install
# or
pnpm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
```

### Environment Variables

Create `.env.local` with:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

## 📁 Project Structure

```
├── app/                      # Next.js app directory
│   ├── admin/               # Admin panel routes
│   ├── auth/                # Authentication pages
│   ├── checkout/            # Checkout flow
│   └── ...                  # Public pages
├── components/              # React components
│   ├── ui/                 # shadcn/ui components
│   └── ...                 # Custom components
├── lib/                     # Utility functions
│   └── supabase/           # Supabase client setup
├── hooks/                   # Custom React hooks
├── public/                  # Static assets
└── scripts/                 # Database setup scripts
```

## 🗄️ Database Schema

### Tables
- `users` - User profiles and metadata
- `products` - Product catalog
- `categories` - Product categories
- `orders` - Order records
- `order_items` - Order line items
- `contact_messages` - Contact form messages

### Features
- Row Level Security (RLS) for data protection
- Real-time subscriptions on orders and messages
- User metadata for admin roles and ban status

## 🔐 Security

- Supabase Authentication with email/password
- Row Level Security policies on all tables
- User ban system with reason and timestamp
- Admin role management

## 🎨 Design

- **Color Scheme:** Gold (#d4a574) with dark slate backgrounds
- **Typography:** Playfair Display (serif) for headings, Inter for body
- **Responsive:** Mobile-first design approach
- **Dark Mode:** Full dark mode support with system preference detection

## 📱 Pages

### Public
- `/` - Home with hero, featured products, categories
- `/menu` - Product catalog with filtering
- `/categories` - Category showcase
- `/product/[slug]` - Product detail page
- `/cart` - Shopping cart
- `/checkout` - Checkout flow
- `/contact` - Contact form
- `/about` - About page
- `/profile` - User profile

### Authentication
- `/auth/login` - Login page
- `/auth/sign-up` - Registration page
- `/auth/sign-up-success` - Email verification page

### Admin
- `/admin` - Dashboard with stats and recent orders/messages
- `/admin/products` - Product management
- `/admin/orders` - Order management
- `/admin/messages` - Message management
- `/admin/users` - User management
- `/admin/settings` - Admin settings

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Deploy!

```bash
# Or deploy directly via Vercel CLI
npm i -g vercel
vercel
```

## 📊 Performance

- ✅ Build time: ~8.6 seconds (Turbopack)
- ✅ 20 routes configured
- ✅ Production-optimized
- ✅ Next.js Image Optimization
- ✅ CSS-in-JS with Tailwind

## 🔄 Real-time Features

### Order Notifications
- Real-time INSERT events from `orders` table
- Toast notifications (30-second persistence)
- Audio ringtone (15 seconds with fallback)
- Web push notifications

### Message Notifications
- Real-time INSERT events from `contact_messages` table
- Toast notifications
- Audio alert system
- Browser push notifications

## 🎵 Audio System

- **Primary:** MP3 fallback to `/public/ring.mp3`
- **Fallback:** Web Audio API with 15-second tone pattern
  - Three rising tones: 800Hz → 1000Hz → 1200Hz
  - Repeats 3 times (~12 seconds) + 3 second silence
  - Mutable with global sound control button

## 👥 Admin Features Details

### User Management
- View all users
- Promote/demote admin status
- Ban/unban users with reason tracking
- Delete users

### Real-time Monitoring
- Live order updates
- Message alerts
- Dashboard statistics
- Sound notifications (mutable)

## 📝 License

MIT License - see LICENSE file for details

## 👤 Author

MILANO KAFE - Premium Restaurant

---

**Status:** ✅ Production Ready | **Last Updated:** December 2025
