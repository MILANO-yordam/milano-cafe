# 🚀 Milano Kafe - TEZKOR O'RNATISH QOIDA

**5 daqiqada admin panelni ishga tushuning!**

---

## QADAM 1️⃣: DATABASE SOZLAMLARI (3 daqiqa)

### 1.1 Supabase Dashboard ochish
```
👉 https://app.supabase.com/projects
👉 Sizning projectingizni tanlang
```

### 1.2 Database Jadvallarini Yaratish
```
1. SQL Editor bo'limiga o'tish
2. Fayl: scripts/001-create-tables.sql
3. Barcha mazmunini nusxa olish va joylab, Execute bosing
4. ✅ Shu bo'ldi!
```

### 1.3 Test Ma'lumotlarini Qo'shish
```
1. Xuddi shunday usul bilan
2. Fayl: scripts/002-seed-data.sql
3. Copy → Paste → Execute
4. ✅ 30+ mahsulot qo'shildi!
```

---

## QADAM 2️⃣: STORAGE SOZLAMLARI (1 daqiqa)

### 2.1 Rasm Bucket'larini Yaratish
```
1. Storage bo'limiga o'tish
2. "Create new bucket" bosing
3. Nomi: products → Public ON ✅
4. Qayta: "Create new bucket"
5. Nomi: categories → Public ON ✅
```

---

## QADAM 3️⃣: ADMIN USER YARATISH (1 daqiqa)

### 3.1 Setup Sahifasiga O'tish
```
👉 http://localhost:3000/admin/setup
```

### 3.2 Admin Yaratish
```
Email:           devolper2011@gmail.com
Parol:           YourSecurePassword123
Parolni Tasdir:  YourSecurePassword123
```

✅ **Admin muvaffaqiyatli yaratildi!**

---

## QADAM 4️⃣: LOGIN QILISH (30 soniya)

### 4.1 Login Sahifasiga O'tish
```
👉 http://localhost:3000/auth/login
```

### 4.2 Kiritish
```
Email:  devolper2011@gmail.com
Parol:  YourSecurePassword123

➜ LOGIN BOSING
```

✅ **Admin panelda borasiz!**

---

## QADAM 5️⃣: TEKSHIRUV (30 soniya)

Admin panelda quyidagilarni tekshiring:

✅ **Dashboard** - Statistika ko'rinadi mi?
   - Mahsulotlar: 30+
   - Kategoriyalar: 8
   - Daromad: 0

✅ **Kategoriyalar** - Kategoriya ro'yxati ko'rinadi mi?
   - Qahva, Choy, Shirinliklar va boshqalar

✅ **Mahsulotlar** - Mahsulot ro'yxati ko'rinadi mi?
   - Espresso, Americano, Cappuccino va boshqalar

✅ **Yangi Mahsulot Qo'shish:**
   1. "Yangi mahsulot" tugmasini bosing
   2. Nomi: "Test Kofe"
   3. Narx: 25000
   4. Kategoriya: Qahva tanlang
   5. Rasmni yuklang (PNG/JPG)
   6. SAQLASH bosing

---

## 🎉 TAYYOR!

Admin panelni foydalanishga tayyor!

```
╔════════════════════════════════════════╗
║  ADMIN PANEL: localhost:3000/admin     ║
║  EMAIL: devolper2011@gmail.com        ║
╚════════════════════════════════════════╝
```

---

## MUAMMO BO'LSA?

### Login ishlamasa:
```
1. Email manzilini tekshiring
2. Parolni tekshiring
3. Katta/kichik harfga e'tibor qiling
```

### Mahsulot rasm yuklash ishlamasa:
```
1. Storage bucket nomlarini tekshiring:
   - products (mavjud bo'lishi kerak)
   - categories (mavjud bo'lishi kerak)
2. Public ON bo'lishi kerak
```

### Kategoriyalar ko'rinmasa:
```
1. scripts/002-seed-data.sql ni ishga tushdingizmi?
2. SQL editorida "Execute" bosayotganingizmi?
3. Errors bo'lsa, console da qidiring
```

---

## KENGAYTIRISH

Batafsilroq hujjatlar:
- 📖 `ADMIN_SETUP.md` - To'liq qoida
- 📋 `ADMIN_ENHANCEMENTS.md` - Nima qo'shildi

---

**Shaxmat! Admin paneli tayyorchi! 🎉**

Hozir quyidagilarni qila olasiz:
- ✅ Mahsulot qo'shish/o'zgartirish/o'chirish
- ✅ Kategoriya boshqaruvi
- ✅ Rasmlarni lokal yuklash
- ✅ Real-time yangilashlarni ko'rish
- ✅ Buyurtmalarni boshqarish
- ✅ Statistika ko'rish

**OMAD! 🚀**
