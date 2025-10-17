⚠️ **مهم: يجب تنفيذ هذا الكود في Supabase أولاً!**

# خطوة واحدة فقط: تحديث قاعدة البيانات

## افتح Supabase Dashboard:
1. اذهب إلى: https://supabase.com/dashboard
2. اختر مشروعك
3. من القائمة الجانبية اختر **SQL Editor**
4. انسخ والصق الكود التالي:

```sql
ALTER TABLE projects 
ADD COLUMN IF NOT EXISTS category_en TEXT;

UPDATE projects 
SET category_en = category 
WHERE category_en IS NULL OR category_en = '';
```

5. اضغط **RUN** أو **تشغيل**

✅ **انتهى!** الآن يمكنك استخدام الفئات باللغتين العربية والإنجليزية

---

## الاستخدام:
- افتح `admin-panel.html`
- عند إنشاء فئة جديدة، ستظهر حقلين (عربي + English)
- احفظ المشروع، وسيظهر بالترجمتين في معرض الأعمال
