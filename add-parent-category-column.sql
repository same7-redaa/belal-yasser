-- إضافة عمود parent_category لدعم الفئات الفرعية
-- هذا العمود سيحفظ اسم الفئة الرئيسية (إذا كانت فئة فرعية)

ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS parent_category TEXT;

-- يمكنك تنفيذ هذا SQL في Supabase SQL Editor
-- بعد ذلك يمكنك إنشاء فئات رئيسية وفئات فرعية

-- مثال:
-- الفئة الرئيسية: "تصميم شعارات"
-- الفئة الفرعية: "شعارات طبية" (parent_category = "تصميم شعارات")
