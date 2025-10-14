-- ============================================
-- إصلاح مشكلة عمود show_on_homepage
-- ============================================

-- 1. حذف العمود إذا كان موجوداً (لإعادة إنشائه بشكل صحيح)
ALTER TABLE projects DROP COLUMN IF EXISTS show_on_homepage;

-- 2. إضافة العمود من جديد
ALTER TABLE projects 
ADD COLUMN show_on_homepage BOOLEAN NOT NULL DEFAULT true;

-- 3. التأكد من وجود عمود created_at
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 4. تحديث السجلات القديمة
UPDATE projects 
SET created_at = NOW() 
WHERE created_at IS NULL;

-- 5. عرض بنية الجدول للتأكد
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- ============================================
-- رسالة النجاح
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ تم إصلاح العمود بنجاح!';
    RAISE NOTICE '✅ يمكنك الآن استخدام لوحة التحكم';
END $$;
