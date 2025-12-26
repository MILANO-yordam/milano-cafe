# Milano Kafe Admin Panel - QUICK START

## Daqiqa Bo'yicha O'rnatish

### ⏱️ 1-2 Daqiqa: Database Jadvallarini Yaratish
```
1. Supabase Dashboard ochish
2. SQL Editor bo'limiga o'tish
3. scripts/001-create-tables.sql mazmunini copy qiling
4. Supabase SQL editorga paste qiling
5. "Execute" tugmasini bosing
✅ Jadvalllar yaratildi!
```

### ⏱️ 3-4 Daqiqa: Test Ma'lumotlarini Qo'shish
```
1. scripts/002-seed-data.sql mazmunini copy qiling
2. SQL editorga paste qiling
3. "Execute" tugmasini bosing
✅ 30+ mahsulot qo'shildi!
```

### ⏱️ 5 Daqiqa: Storage Setup
```
1. Supabase Storage bo'limiga o'tish
2. "New bucket" tugmasini bosing
   - Nomi: products
   - Public: ON
3. Qayta: "New bucket" bosing
   - Nomi: categories
   - Public: ON
✅ Storage tayyor!
```

### ⏱️ 6 Daqiqa: Admin User Yaratish
```
1. http://localhost:3000/admin/setup
2. Email: devolper2011@gmail.com
3. Parol: YourSecurePassword123
4. Parol Tasdir: YourSecurePassword123
5. "Admin Yaratish" tugmasini bosing
✅ Admin user yaratildi!
```

### ⏱️ 7 Daqiqa: Login Qilish
```
1. http://localhost:3000/auth/login
2. devolper2011@gmail.com (email)
3. YourSecurePassword123 (parol)
4. LOGIN tugmasini bosing
✅ Admin panelga kirdingiz!
```

---

## 🎯 ASOSIY URL'LAR

```
Admin Dashboard:     http://localhost:3000/admin
Admin Setup:         http://localhost:3000/admin/setup
Login:              http://localhost:3000/auth/login

Categories:         http://localhost:3000/admin/categories
Products:           http://localhost:3000/admin/products
Orders:             http://localhost:3000/admin/orders
Messages:           http://localhost:3000/admin/messages
Users:              http://localhost:3000/admin/users
Settings:           http://localhost:3000/admin/settings
```

---

## 📋 ADMIN CREDENTIALS

```
Email:    devolper2011@gmail.com
Password: YourSecurePassword123 (o'zingizning parolingiz)
Role:     Admin
Status:   Active
```

---

## 🚀 ISHLASHNI BOSHLASH

### Dashboard Ko'rish
```
✅ Statistika kartalar (5 ta):
   - Mahsulotlar: 30
   - Kategoriyalar: 8
   - Buyurtmalar: 0
   - Xabarlar: 0
   - Daromad: 0
```

### Kategoriya Qo'shish
```
1. "Kategoriyalar" menyu qismiga o'tish
2. "Yangi kategoriya" tugmasini bosing
3. Kategoriya nomi: "Test Kategoriya"
4. Tavsif: "Test kategoriyasi"
5. Rasm: PNG/JPG fayli tanlang
6. "Saqlash" tugmasini bosing
✅ Kategoriya qo'shildi!
```

### Mahsulot Qo'shish
```
1. "Mahsulotlar" menyu qismiga o'tish
2. "Yangi mahsulot" tugmasini bosing
3. Nomi: "Yangi Kofe"
4. Narx: 25000
5. Kategoriya: Qahva tanlang
6. Tavsif: "Chiroyli kofe"
7. Rasm: PNG/JPG fayli tanlang
8. "Saqlash" tugmasini bosing
✅ Mahsulot qo'shildi!
```

---

## 🔍 TEKSHIRUV

### Dashboard
- [ ] 5 ta statistika kartasi ko'rinadi
- [ ] Kategoriyalar soni: 8
- [ ] Mahsulotlar soni: 30+

### Kategoriyalar
- [ ] 8 ta kategoriya ko'rinadi
- [ ] Kategoriya qo'sha olasiz
- [ ] Kategoriya tahrir qila olasiz
- [ ] Kategoriya o'chira olasiz
- [ ] Rasm yuklaya olasiz

### Mahsulotlar
- [ ] 30+ mahsulot ko'rinadi
- [ ] Mahsulot qo'sha olasiz
- [ ] Mahsulot tahrir qila olasiz
- [ ] Mahsulot o'chira olasiz
- [ ] Rasm yuklaya olasiz

### Dark Mode
- [ ] Theme toggle ishlaydi
- [ ] Dark theme ko'riadi
- [ ] Light theme ko'rinadi

### Responsive
- [ ] Mobile ko'rinadi
- [ ] Tablet ko'rinadi
- [ ] Desktop ko'rinadi

---

## 🆘 MUAMMO BO'LSA

### Login ishlamasa
```
1. Email: devolper2011@gmail.com
2. Parol: YourSecurePassword123 (to'g'ri yozganingizni tekshiring)
3. Supabase -> Auth -> Users da user mavjud bo'lishi kerak
```

### Kategoriyalar ko'rinmasa
```
1. SQL script ishga tushganingizmi?
2. scripts/002-seed-data.sql ishlatdingizmi?
3. "Execute" bosdingizmi?
4. Errors bo'lsa, console da qidiring
```

### Rasm upload ishlamasa
```
1. Storage bucket nomlarini tekshiring:
   - "products" bucket mavjud bo'lishi kerak
   - "categories" bucket mavjud bo'lishi kerak
2. Public: ON bo'lishi kerak
3. Browser console da errorlarni qidiring (F12)
```

### Real-time ishlamasa
```
1. WebSocket connection tekshiring
2. Supabase dashboard logs tekshiring
3. Network tab (F12) -> WS portini qidiring
```

---

## 📚 BATAFSILROQ HUJJATLAR

Quyidagi fayllarni o'qing:

1. **BOSHLANG_ICH.md** - Tezkor boshlanish (bu sahifa)
2. **ADMIN_SETUP.md** - To'liq setup qo'llanma
3. **ADMIN_ENHANCEMENTS.md** - Technical details
4. **YANGILIKLAR.txt** - Feature summary

---

## 📊 DATABASE MA'LUMOTLARI

### Kategoriyalar (8 ta)
```
1. Qahva (8 ta mahsulot)
2. Choy (4 ta)
3. Shirinliklar (5 ta)
4. Nonushta (4 ta)
5. Salatlar (3 ta)
6. Sendvichlar (3 ta)
7. Ichimliklar (3 ta)
8. Pitsalar (3 ta)
```

### Settings
```
- cafe_name: Milano Kafe
- cafe_phone: +998 77 183 99 99
- delivery_fee: 15000 so'm
- min_order_amount: 50000 so'm
```

---

## ⚡ QUICK COMMANDS

### Development
```bash
npm run dev          # Dev server bosish
npm run build        # Build qilish
npm run start        # Prod start
npm run lint         # Lint tekshirish
```

### Database
```bash
# Supabase CLI (opsional)
supabase db push     # Migration push qilish
supabase db pull     # Yangi migration pull qilish
```

---

## 🎉 TAYYOR!

```
✅ Admin panel ishlashga tayyor
✅ 30+ test mahsulot
✅ 8 ta kategoriya
✅ Admin user yaratilgan
✅ Hujjatlar mavjud
```

**Xush kelibsiz, Admin Panel'ga! 🚀**

---

## 📞 YORDAM

Savollar bo'lsa:
1. Browser F12 bosing -> Console tab
2. Errorlarni qidiring
3. ADMIN_SETUP.md da "Muammoni Hal Qilish" bo'limini o'qing
4. Supabase logs tekshiring

---

**Bugun o'rnatish, ertaga ishlatish! 💪**
