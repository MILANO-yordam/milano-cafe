-- Supabase da admin user yaratish uchun
-- Bu script eng avval ishlatiladi

-- Eslatma: Supabase UI orqali user yaratish ham mumkin:
-- 1. Supabase Dashboard ga kirish
-- 2. Authentication -> Users bo'limiga o'tish+
-- 3. "Invite user" tugmasini bosish
-- 4. devolper2011@gmail.com emailni kiritish
-- 5. User yaratilgandan so'ng, user_metadata.is_admin = true qilish kerak

-- SQL orqali user yaratishni xohlasangiz, bu quyidagi SQL dan foydalaning:
-- ESLATMA: Supabase foydalanuvchini direct SQL orqali yaratishni taklif qilmaydi
-- Buning o'rniga bu ketma-ketlik ishlatiladi:

-- 1. Supabase CLI yoki API orqali user yaratish:
-- npx supabase auth create-user --email devolper2011@gmail.com --password "YourSecurePassword123"

-- 2. Yoki Supabase Dashboard UI dan:
-- - Authentication -> Users bo'limiga o'tish
-- - "Invite user" tugmasini bosish
-- - Email kiriting va user yaratish

-- 3. User yaratilgandan so'ng, user_metadata.is_admin = true qilish:
-- (Supabase Dashboard -> Authentication -> Users -> User tanlang -> Edit user -> 
-- Custom claims va metadata bo'limida is_admin: true qo'shing)

-- Test admins uchun quyidagi ma'lumot ishlatiladi:
-- Email: devolper2011@gmail.com
-- Role: is_admin = true
