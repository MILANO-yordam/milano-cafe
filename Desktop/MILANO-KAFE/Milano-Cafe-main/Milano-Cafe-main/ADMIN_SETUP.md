# Milano Kafe Admin Panel - O'rnatish Qo'llanmasi

## Yangi Xususiyatlar

Ushbu yangilash quyidagi xususiyatlarni o'z ichiga oladi:

### 1. **Kategoriyalar Boshqaruvi**
- Yangi kategoriyalar yaratish, o'zgartirish va o'chirish
- Kategoriyalarga rasm yuklash (lokal fayl)
- Real-time yangilashlar (WebSocket orqali)
- Admin paneldan osongina boshqarish

### 2. **Mahsulotlar Boshqaruvi (Takomillashtirilgan)**
- **Lokal Rasm Yuklash**: Placeholder URL o'rniga, endi rasmlarni bevosita fayldan yuklash mumkin
- Rasm preview
- Real-time yangilashlar
- Kategoriya bo'yicha filtrlash

### 3. **Kengaytirilgan Admin Dashboard**
- Umumiy statistika (Mahsulotlar, Buyurtmalar, Xabarlar, Daromad)
- Real-time bildirishnomalar
- Eng so'nggi buyurtmalar
- Eng so'nggi xabarlar
- Shovqinli xabarnoma sistema

### 4. **Test Ma'lumotlari**
Database avvaldi ma'lumotlar bilan to'ldiriladi:
- **8 ta Kategoriya**: Qahva, Choy, Shirinliklar, Nonushta, Salatlar, Sendvichlar, Ichimliklar, Pitsalar
- **30+ Mahsulot**: Har bir kategoriyada ko'p miqdorda test mahsulotlari
- **Predefined Settings**: Kafe nomi, manzili, telefon, va boshqalar

---

## Boshlang'ich O'rnatish

### 1. Database Sozlamalari (Supabase)

#### SQL Skriptlarni Ishlatish:

1. **Jadvallarni Yaratish** (`scripts/001-create-tables.sql`):
   - Supabase Dashboard → SQL Editor
   - Script mazmunini joylab, execute qiling
   - Bu barcha zarur jadvallrni yaratadi

2. **Test Ma'lumotlarini Qo'shish** (`scripts/002-seed-data.sql`):
   - Xuddi shunday yo'l bilan script ishga tushiring
   - 8 ta kategoriya va 30+ mahsulot qo'shiladi

3. **Admin User Yaratish** (`scripts/003-create-admin-user.sql`):
   - Skriptni o'qib, ko'rsatilgan yo'l bilan admin foydalanuvchisini yarating

#### Rasm Bucketlarini Yaratish:

Supabase Dashboard → Storage bo'limida:

1. Yangi bucket yaratish:
   - Nomi: `products`
   - Public: ON
   
2. Yangi bucket yaratish:
   - Nomi: `categories`
   - Public: ON

---

### 2. Admin Foydalanuvchisini Yaratish

#### Yo'l 1: Setup Sahifasidan (Tavsiyalangan)
```
URL: http://localhost:3000/admin/setup
```

1. Email kiriting (tavsiya: `devolper2011@gmail.com`)
2. Xavfsiz parol o'rnating (kamita 8 ta belgi)
3. "Admin Yaratish" tugmasini bosing
4. Avtomatik ravishda login sahifasiga yuboriladi

#### Yo'l 2: Supabase Dashboard (Qo'lbola)
1. Supabase Dashboard → Authentication → Users
2. "Invite user" tugmasini bosing
3. Email: `devolper2011@gmail.com`
4. Parol: Tanlang (yoki avtomatik)
5. User yaratilgandan so'ng:
   - User tanlang
   - "Edit user" bosing
   - **Custom claims** bo'limiga quyidagini qo'shing:
   ```json
   {
     "is_admin": true
   }
   ```
6. Saqlang

---

### 3. Rasm Storage Sozlamalari

#### RLS (Row Level Security) Politikalarini Qo'shish:

Supabase Dashboard → Storage → "products" bucket:

```sql
-- Hamma foydalanuvchilar rasmlarni ko'rishi mumkin
CREATE POLICY "Allow public read access"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'products');

-- Faqat adminlar rasmlarni yuklashi va o'chirishi mumkin
CREATE POLICY "Allow authenticated uploads"
  ON storage.objects FOR INSERT
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'products' AND auth.role() = 'authenticated');
```

Xuddi shunday "categories" bucket uchun ham qo'shing.

---

## Admin Panel Struktura

### Menyular:
```
Dashboard
├── Umumiy Statistika
├── So'nggi Buyurtmalar
└── So'nggi Xabarlar

Mahsulotlar
├── Mahsulot Ro'yxati
├── Qidirish
├── Kategoriya Filtri
└── Rasm Yuklash

Kategoriyalar (YANGI)
├── Kategoriya Ro'yxati
├── Kategoriya Yaratish
├── Kategoriya O'zgartirish
└── Rasm Yuklash

Buyurtmalar
├── Buyurtma Ro'yxati
└── Buyurtma Statusi

Xabarlar
├── Xabar Ro'yxati
└── O'qilgan/O'qilmagan

Foydalanuvchilar
├── Foydalanuvchi Ro'yxati
└── Admin Talaflari

Sozlamalar
├── Kafe Ma'lumotlari
└── Delivery Sozlamalari
```

---

## API Endpoints

### Admin User Yaratish
```
POST /api/admin/create-admin
Content-Type: application/json

{
  "email": "devolper2011@gmail.com",
  "password": "YourSecurePassword123"
}

Response:
{
  "success": true,
  "message": "Admin user muvaffaqiyatli yaratildi",
  "user": {
    "id": "user-uuid",
    "email": "devolper2011@gmail.com",
    "role": "admin"
  }
}
```

---

## Real-Time Xususiyatlari

### WebSocket Subscriptions

#### Mahsulotlar Real-Time Yangilash:
```typescript
channel = supabase
  .channel('products-updates')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'products' },
    (payload) => { /* yangilash */ }
  )
  .subscribe()
```

#### Kategoriyalar Real-Time Yangilash:
```typescript
channel = supabase
  .channel('categories-updates')
  .on('postgres_changes',
    { event: '*', schema: 'public', table: 'categories' },
    (payload) => { /* yangilash */ }
  )
  .subscribe()
```

#### Buyurtmalar Real-Time Bildirishnomasi:
- Yangi buyurtma kelganda shovqinli bildirishnoma
- Browser push notification
- Toast ko'rinishida uzunroq bildirishnoma

---

## Test Ma'lumotlari

### Kategoriyalar (8 ta):
1. **Qahva** - 8 turli kofe ichimlik
2. **Choy** - 4 turli choylar
3. **Shirinliklar** - 5 ta dessert
4. **Nonushta** - 4 ta ertalabki ovqat
5. **Salatlar** - 3 ta salatlar
6. **Sendvichlar** - 3 ta sendvich
7. **Ichimliklar** - 3 ta ichimlik
8. **Pitsalar** - 3 ta pizza

**Jami: 30+ Mahsulot**

---

## Xavfsizlik

### RLS Politikalari:

#### Adminlar uchun:
- Barcha jadvallardagi barcha operatsiyalar (SELECT, INSERT, UPDATE, DELETE)
- RLS politikalari `is_admin = true` orqali tekshiriladi

#### Oddiy Foydalanuvchilar uchun:
- Mahsulotlar va kategoriyalarni ko'rishi mumkin (SELECT)
- O'z buyurtmalarini ko'rishi mumkin
- Sharhlar qoldirishi mumkin

#### Himoya:
```sql
-- Namunaviy politika
CREATE POLICY "Admins can manage products"
  ON products FOR ALL
  USING (
    (SELECT (auth.jwt() -> 'user_metadata' ->> 'is_admin')::boolean) = true
  );
```

---

## Muhim Havolalar

- **Supabase Docs**: https://supabase.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **TypeScript**: https://www.typescriptlang.org/docs/

---

## Muammoni Hal Qilish

### Rasm Yuklash Ishlamasa:

1. Storage bucket nomlarini tekshiring:
   - `products` va `categories` bucketlari mavjud bo'lishi kerak

2. RLS politikalarini tekshiring:
   - Storage → Policies bo'limida qo'shimcha politikalar qo'shing

3. Browser consoleda errorslarni tekshiring:
   - F12 → Console tabini ochlang
   - Xatolik xabariga qarang

### Real-Time Yangilash Ishlamasa:

1. Supabase connection tekshiring:
   - `.env.local` faylda `NEXT_PUBLIC_SUPABASE_URL` va `NEXT_PUBLIC_SUPABASE_ANON_KEY` mavjud bo'lishi kerak

2. WebSocket port tekshiring (Umumiy o'lcham 6789)

3. Browser consoleda subscription xatolarini tekshiring

### Login Ishlamasa:

1. Email va parolni tekshiring
2. Supabase → Authentication → Users da user mavjud bo'lishi kerak
3. Email confirmed bo'lishi kerak

---

## Quyidagi Bosqichlar

- [ ] Database sozlamalari
- [ ] Rasm bucket'larini yaratish
- [ ] Admin user yaratish
- [ ] Test ma'lumotlarini kiritish
- [ ] Admin panelga kirish
- [ ] Mahsulot qo'shish
- [ ] Kategoriya qo'shish
- [ ] Real-time tekshirish

---

**Savollar yoki muammolar bo'lsa, texnik qo'llab-quvvatlash bo'limiga murojaat qiling.**
