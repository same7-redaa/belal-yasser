# إعداد Supabase للمشروع

## 🔍 اختبار الاتصال أولاً

**قبل البدء، افتح ملف `test-supabase.html` في المتصفح لاختبار الاتصال وتشخيص المشاكل.**

## معلومات الاتصال
- **URL:** `https://bkvcmceyxsgzvvcozwkf.supabase.co`
- **Anon Key:** `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdmNtY2V5eHNnenZ2Y296d2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMDAyODQsImV4cCI6MjA3NTY3NjI4NH0.TtZg_fT1gBCfxx7jT9bTk_ylm7kAjQGflCbMKcyZJWY`
- **Table Name:** `projects`
- **Storage Bucket:** `portfolio-images`

## خطوات الإعداد

### 1. إنشاء جدول المشاريع (projects)

قم بتنفيذ الكود التالي في SQL Editor في لوحة تحكم Supabase:

```sql
-- إنشاء جدول المشاريع
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- تفعيل Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- السماح بالقراءة للجميع
CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT
  USING (true);

-- السماح بالإضافة للجميع (يمكنك تقييد هذا لاحقاً)
CREATE POLICY "Enable insert for all users" ON projects
  FOR INSERT
  WITH CHECK (true);

-- السماح بالتحديث للجميع (يمكنك تقييد هذا لاحقاً)
CREATE POLICY "Enable update for all users" ON projects
  FOR UPDATE
  USING (true);

-- السماح بالحذف للجميع (يمكنك تقييد هذا لاحقاً)
CREATE POLICY "Enable delete for all users" ON projects
  FOR DELETE
  USING (true);
```

### 2. إنشاء Storage Bucket للصور

1. اذهب إلى **Storage** في لوحة تحكم Supabase
2. انقر على **New bucket**
3. اسم الـ Bucket: `portfolio-images`
4. اجعله **Public** (عام)
5. انقر على **Create bucket**

### 3. تعيين سياسات Storage

قم بتنفيذ الكود التالي في SQL Editor:

```sql
-- السماح برفع الصور للجميع
CREATE POLICY "Enable upload for all users" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images');

-- السماح بقراءة الصور للجميع
CREATE POLICY "Enable read access for all users" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'portfolio-images');

-- السماح بحذف الصور للجميع (يمكنك تقييد هذا لاحقاً)
CREATE POLICY "Enable delete for all users" ON storage.objects
  FOR DELETE
  USING (bucket_id = 'portfolio-images');
```

## استخدام الموقع

### صفحة المشاريع (projects.html)
- تعرض جميع المشاريع من قاعدة البيانات
- تصنيف المشاريع حسب الفئات
- تحميل تلقائي للمشاريع عند فتح الصفحة

### لوحة التحكم (admin-panel.html)
- إضافة مشاريع جديدة
- رفع صور المشاريع تلقائياً إلى Supabase Storage
- حفظ بيانات المشروع في قاعدة البيانات

## ملاحظات أمنية

⚠️ **مهم:** السياسات الحالية تسمح للجميع بالإضافة والتعديل والحذف. لتأمين لوحة التحكم:

1. قم بإنشاء نظام مصادقة (Authentication)
2. قم بتعديل السياسات لتقييد الوصول على المستخدمين المصرح لهم فقط
3. استخدم Service Role Key بدلاً من Anon Key للعمليات الإدارية

## الملفات المحدثة

- ✅ `projects.html` - تم إضافة Supabase SDK
- ✅ `projects-script.js` - تم تحديث الاتصال بـ Supabase
- ✅ `admin-panel.html` - تم تحديث الاتصال بـ Supabase

## اختبار الموقع

1. افتح `admin-panel.html` في المتصفح
2. أضف مشروع تجريبي
3. افتح `projects.html` للتأكد من ظهور المشروع

---

تم الإعداد بنجاح! 🎉
