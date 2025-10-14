# 🚀 دليل البدء السريع

## ✅ قائمة المهام

### 1️⃣ اختبار الاتصال (5 دقائق)

- [ ] افتح ملف `test-supabase.html` في المتصفح
- [ ] شغّل جميع الاختبارات الخمسة
- [ ] تأكد من ظهور علامات ✅ الخضراء

---

### 2️⃣ إعداد قاعدة البيانات (10 دقائق)

#### أ. إنشاء الجدول

1. افتح لوحة تحكم Supabase: https://app.supabase.com
2. اذهب إلى **SQL Editor**
3. انسخ والصق هذا الكود:

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
  FOR SELECT USING (true);

-- السماح بالإضافة للجميع
CREATE POLICY "Enable insert for all users" ON projects
  FOR INSERT WITH CHECK (true);

-- السماح بالتحديث للجميع
CREATE POLICY "Enable update for all users" ON projects
  FOR UPDATE USING (true);

-- السماح بالحذف للجميع
CREATE POLICY "Enable delete for all users" ON projects
  FOR DELETE USING (true);
```

4. اضغط **Run** أو **F5**

#### ب. إنشاء Storage Bucket

1. في لوحة تحكم Supabase، اذهب إلى **Storage**
2. اضغط **New bucket**
3. الاسم: `portfolio-images`
4. فعّل خيار **Public bucket** ✅
5. اضغط **Create bucket**

#### ج. سياسات Storage

1. ارجع إلى **SQL Editor**
2. انسخ والصق هذا الكود:

```sql
-- السماح برفع الصور
CREATE POLICY "Enable upload for all users" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio-images');

-- السماح بقراءة الصور
CREATE POLICY "Enable read access for all users" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-images');

-- السماح بحذف الصور
CREATE POLICY "Enable delete for all users" ON storage.objects
  FOR DELETE USING (bucket_id = 'portfolio-images');
```

3. اضغط **Run**

---

### 3️⃣ اختبار النظام (5 دقائق)

#### أ. إضافة مشروع تجريبي

1. افتح `admin-panel.html` في المتصفح
2. املأ النموذج:
   - **اسم المشروع:** مشروع تجريبي
   - **فئة المشروع:** تجريبي
   - **صورة المشروع:** اختر أي صورة
3. اضغط **إضافة المشروع**
4. انتظر رسالة "تم إضافة المشروع بنجاح! ✅"

#### ب. التحقق من ظهور المشروع

1. افتح `projects.html` في المتصفح
2. يجب أن ترى المشروع التجريبي
3. افتح `index.html` وتحقق من ظهور المشاريع في قسم المعرض

---

### 4️⃣ إضافة مشاريع حقيقية

الآن يمكنك إضافة مشاريعك الحقيقية:

1. افتح `admin-panel.html`
2. لكل مشروع:
   - أدخل اسم المشروع
   - اختر الفئة (مثل: هوية بصرية، سوشيال ميديا، تصميم طباعي، إلخ)
   - ارفع صورة المشروع
   - اضغط إضافة

**💡 نصيحة:** است��دم نفس اسم الفئة للمشاريع المتشابهة لتجميعها معاً.

---

## 🎯 الفئات المقترحة

استخدم هذه الفئات لتنظيم مشاريعك:

- هوية بصرية
- سوشيال ميديا
- تصميم طباعي
- تصميم تغليف
- انفوجرافيك
- موشن جرافيك
- تصميم إعلانات

---

## ❌ إذا واجهت مشكلة

### المشاريع لا تظهر؟

1. افتح Console المتصفح (اضغط F12)
2. ابحث عن رسائل خطأ باللون الأحمر
3. راجع ملف `TROUBLESHOOTING.md`

### لا يتم رفع الصور؟

1. تحقق من أن bucket `portfolio-images` موجود
2. تأكد أنه **Public**
3. تحقق من سياسات Storage

### رسالة خطأ "permission denied"؟

- تحقق من سياسات RLS
- تأكد من تنفيذ جميع أكواد SQL

---

## 📞 المساعدة

- 📖 دليل كامل: `README.md`
- 🔧 حل المشاكل: `TROUBLESHOOTING.md`
- ⚙️ إعداد Supabase: `SUPABASE_SETUP.md`
- 🧪 اختبار: `test-supabase.html`

---

## ✨ بعد الانتهاء

بعد إضافة مشاريعك:

1. ✅ احذف المشروع التجريبي من لوحة تحكم Supabase
2. ✅ يمكنك حذف ملف `test-supabase.html` (اختياري)
3. ✅ ارفع الموقع على الاستضافة المفضلة لديك

---

**🎉 مبروك! موقعك جاهز للعمل!**

الآن يمكنك:
- ✅ إضافة مشاريع جديدة بسهولة
- ✅ تصنيف المشاريع حسب الفئات
- ✅ عرض أعمالك بشكل احترافي
- ✅ تحديث المحتوى في أي وقت

---

تم التصميم والتطوير بواسطة: **سامح رضا**
