-- ============================================
-- تحديث بنية الجدول - إزالة اسم المشروع
-- ============================================

-- 1. حذف عمود name (لم نعد بحاجة له)
ALTER TABLE projects DROP COLUMN IF EXISTS name;

-- 2. التأكد من وجود الأعمدة المطلوبة
ALTER TABLE projects ADD COLUMN IF NOT EXISTS category TEXT NOT NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS image_url TEXT NOT NULL;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS show_on_homepage BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE projects ADD COLUMN IF NOT EXISTS created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();

-- 3. تحديث السجلات القديمة
UPDATE projects SET created_at = NOW() WHERE created_at IS NULL;

-- 4. عرض بنية الجدول النهائية
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'projects'
ORDER BY ordinal_position;

-- ============================================
-- البنية النهائية للجدول:
-- - id (BIGSERIAL PRIMARY KEY)
-- - category (TEXT NOT NULL)
-- - image_url (TEXT NOT NULL)
-- - show_on_homepage (BOOLEAN NOT NULL DEFAULT true)
-- - created_at (TIMESTAMP WITH TIME ZONE DEFAULT NOW())
-- ============================================

DO $$
BEGIN
    RAISE NOTICE '✅ تم تحديث بنية الجدول بنجاح!';
    RAISE NOTICE '✅ الآن الجدول يحتوي على: id, category, image_url, show_on_homepage, created_at';
END $$;
