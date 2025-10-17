-- إضافة عمود category_en إلى جدول projects
-- هذا العمود سيحفظ اسم الفئة بالإنجليزية

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS category_en TEXT;

-- تحديث القيم الفارغة لتكون نفس category (للمشاريع القديمة)
UPDATE projects 
SET category_en = category 
WHERE category_en IS NULL OR category_en = '';

-- يمكنك تنفيذ هذا SQL في Supabase SQL Editor
