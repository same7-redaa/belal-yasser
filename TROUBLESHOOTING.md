# 🔧 حل المشاكل الشائعة

## المشكلة: لا تظهر المشاريع في صفحة المعرض

### الأسباب المحتملة والحلول:

#### 1️⃣ جدول `projects` غير موجود
**الأعراض:**
- رسالة خطأ في Console: `relation "public.projects" does not exist`

**الحل:**
1. افتح لوحة تحكم Supabase: https://app.supabase.com
2. اذهب إلى **SQL Editor**
3. نفذ الكود التالي:

```sql
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

#### 2️⃣ Row Level Security (RLS) مفعل بدون سياسات
**الأعراض:**
- الجدول موجود لكن لا تظهر البيانات
- رسالة خطأ: `permission denied` أو `new row violates row-level security policy`

**الحل:**
نفذ هذه ا��أكواد في SQL Editor:

```sql
-- تفعيل RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- السماح بالقراءة للجميع
CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT
  USING (true);

-- السماح بالإضافة للجميع
CREATE POLICY "Enable insert for all users" ON projects
  FOR INSERT
  WITH CHECK (true);
```

#### 3️⃣ لا توجد مشاريع في قاعدة البيانات
**الأعراض:**
- رسالة: "لا توجد مشاريع لعرضها حالياً"
- لا توجد أخطاء في Console

**الحل:**
1. افتح `admin-panel.html`
2. أضف مشروع تجريبي
3. أو استخدم `test-supabase.html` لإضافة مشروع تجريبي

---

## المشكلة: لا يتم رفع الصور

### الأسباب المحتملة والحلول:

#### 1️⃣ Storage Bucket غير موجود
**الأعراض:**
- رسالة خطأ: `Bucket not found` أو `bucket does not exist`

**الحل:**
1. افتح لوحة تحكم Supabase
2. اذهب إلى **Storage**
3. انقر على **New bucket**
4. الاسم: `portfolio-images`
5. اجعله **Public** ✅
6. انقر على **Create bucket**

#### 2️⃣ Bucket موجود لكن ليس عام (Public)
**الأعراض:**
- يتم رفع الصورة لكن لا تظهر في الموقع
- رسالة خطأ 403 عند محاولة عرض الصورة

**الحل:**
1. اذهب إلى **Storage** > **portfolio-images**
2. انقر على **Settings** (الإعدادات)
3. فعّل خيار **Public bucket**
4. احفظ التغييرات

#### 3️⃣ سياسات Storage غير مضبوطة
**الأعراض:**
- رسالة خطأ: `new row violates row-level security policy for table "objects"`

**الحل:**
نفذ هذه الأكواد في SQL Editor:

```sql
-- السماح برفع الصور
CREATE POLICY "Enable upload for all users" ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'portfolio-images');

-- السماح بقراءة الصور
CREATE POLICY "Enable read access for all users" ON storage.objects
  FOR SELECT
  USING (bucket_id = 'portfolio-images');
```

---

## المشكلة: مكتبة Supabase لا تعمل

### الأسباب المحتملة والحلول:

#### 1️⃣ لا يوجد اتصال بالإنترنت
**الحل:**
- تحقق من اتصالك بالإنترنت
- جرب فتح موقع آخر للتأكد

#### 2️⃣ مشكلة في تحميل CDN
**الأعراض:**
- رسالة خطأ في Console: `Failed to load resource`
- `window.supabase is undefined`

**الحل:**
جرب استخدام CDN بديل في ملفات HTML:

```html
<!-- بدلاً من -->
<script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>

<!-- استخدم -->
<script src="https://unpkg.com/@supabase/supabase-js@2"></script>
```

---

## المشكلة: معلومات الاتصال خاطئة

### التحقق من المعلومات:

1. افتح لوحة تحكم Supabase
2. اذهب إلى **Settings** > **API**
3. تحقق من:
   - **Project URL**: يجب أن يكون `https://bkvcmceyxsgzvvcozwkf.supabase.co`
   - **anon/public key**: يجب أن يطابق المفتاح في الكود

---

## أدوات التشخيص

### 1. استخدم ملف الاختبار
افتح `test-supabase.html` في المتصفح وشغل جميع الاختبارات:
- ✅ اختبار المكتبة
- ✅ اختبار الاتصال
- ✅ اختبار قراءة المشاريع
- ✅ اختبار Storage
- ✅ اختبار إضافة مشروع

### 2. افتح Console المتصفح
اضغط `F12` وافتح تبويب **Console** لرؤية الأخطاء التفصيلية.

### 3. تحقق من Network
في أدوات المطور، افتح تبويب **Network** لرؤية طلبات API وحالتها.

---

## خطوات التشخيص السريع

1. ✅ افتح `test-supabase.html` وشغل جميع الاختبارات
2. ✅ افتح Console المتصفح (F12) وابحث عن أخطاء باللون الأحمر
3. ✅ تحقق من وجود جدول `projects` في Supabase
4. ✅ تحقق من وجود bucket `portfolio-images` في Storage
5. ✅ تحقق من سياسات RLS للجدول والـ Storage
6. ✅ جرب إضافة مشروع تجريبي من `admin-panel.html`

---

## الحصول على المساعدة

إذا استمرت المشكلة:
1. افتح Console المتصفح (F12)
2. انسخ رسالة الخطأ الكاملة
3. تحقق من الخطوات أعلاه مرة أخرى
4. راجع توثيق Supabase: https://supabase.com/docs

---

تم إعداد هذا الملف لمساعدتك في حل المشاكل بسرعة! 🚀
