-- ============================================
-- تحديث قاعدة البيانات لدعم الميزات الجديدة
-- ============================================

-- 1. إضافة عمود show_on_homepage
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS show_on_homepage BOOLEAN DEFAULT true;

-- 2. إضافة عمود created_at إذا لم يكن موجوداً
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. تحديث السجلات القديمة
UPDATE projects 
SET show_on_homepage = true 
WHERE show_on_homepage IS NULL;

UPDATE projects 
SET created_at = NOW() 
WHERE created_at IS NULL;

-- 4. عرض بنية الجدول
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- ============================================
-- رسالة النجاح
-- ============================================
DO $$
BEGIN
    RAISE NOTICE '✅ تم تحديث قاعدة البيانات بنجاح!';
    RAISE NOTICE '✅ يمكنك الآن استخدام لوحة التحكم الجديدة';
END $$;
