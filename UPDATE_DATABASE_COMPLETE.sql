-- ═══════════════════════════════════════════════════════════════
-- تحديثات قاعدة البيانات لدعم الميزات الجديدة
-- نفذ هذا الكود في Supabase SQL Editor
-- ═══════════════════════════════════════════════════════════════

-- 1. إضافة عمود category_en لدعم الترجمة الإنجليزية
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS category_en TEXT;

-- 2. إضافة عمود parent_category لدعم الفئات الفرعية
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS parent_category TEXT;

-- 3. تحديث القيم الفارغة (للمشاريع القديمة)
UPDATE projects 
SET category_en = category 
WHERE category_en IS NULL OR category_en = '';

-- 4. (اختياري) إضافة indexes لتحسين الأداء
CREATE INDEX IF NOT EXISTS idx_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_parent_category ON projects(parent_category);

-- ═══════════════════════════════════════════════════════════════
-- انتهى! الآن يمكنك استخدام جميع الميزات الجديدة:
-- ✅ الفئات بالعربية والإنجليزية
-- ✅ الفئات الفرعية
-- ✅ إدارة الفئات من لوحة التحكم
-- ═══════════════════════════════════════════════════════════════
