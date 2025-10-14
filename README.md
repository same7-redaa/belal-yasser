# 🎨 موقع بلال ياسر - Portfolio

موقع بورتفوليو احترافي لمصمم جرافيك مع نظام إدارة محتوى متكامل باستخدام Supabase.

## 📋 المحتويات

- [الميزات](#-الميزات)
- [التقنيات المستخدمة](#-التقنيات-المستخدمة)
- [البدء السريع](#-البدء-السريع)
- [إعداد Supabase](#-إعداد-supabase)
- [الملفات الرئيسية](#-الملفات-الرئيسية)
- [حل المشاكل](#-حل-المشاكل)

## ✨ الميزات

- 🎯 تصميم عصري وجذاب
- 📱 متجاوب مع جميع الأجهزة
- 🗄️ نظام إدارة محتوى ديناميكي
- 🖼️ معرض أعمال تفاعلي مع تصنيفات
- 📤 رفع الصور مباشرة إلى السحابة
- ⚡ أداء سريع وتحميل فوري
- 🔒 آمن ومحمي

## 🛠️ التقنيات المستخدمة

- **Frontend:**
  - HTML5
  - CSS3 (مع تأثيرات متقدمة)
  - JavaScript (Vanilla JS)
  - Font Awesome Icons

- **Backend & Database:**
  - Supabase (PostgreSQL)
  - Supabase Storage

- **Hosting:**
  - يمكن استضافته على أي خدمة استضافة ثابتة (Netlify, Vercel, GitHub Pages, إلخ)

## 🚀 البدء السريع

### 1. تحميل المشروع

```bash
# استنساخ المشروع أو تحميله
cd بلال
```

### 2. اختبار الاتصال

افتح ملف `test-supabase.html` في المتصفح لاختبار الاتصال بـ Supabase.

### 3. إعداد قاعدة البيانات

اتبع التعليمات في ملف `SUPABASE_SETUP.md` لإعداد:
- جدول المشاريع
- Storage Bucket
- السياسات الأمنية

### 4. تشغيل الموقع

افتح `index.html` في المتصفح أو استخدم Live Server.

## 🗄️ إعداد Supabase

### الخطوة 1: إنشاء الجدول

```sql
CREATE TABLE projects (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);
```

### الخطوة 2: تفعيل Row Level Security

```sql
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Enable read access for all users" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Enable insert for all users" ON projects
  FOR INSERT WITH CHECK (true);
```

### الخطوة 3: إنشاء Storage Bucket

1. اذهب إلى Storage في لوحة تحكم Supabase
2. أنشئ bucket جديد باسم `portfolio-images`
3. اجعله **Public**

### الخطوة 4: سياسات Storage

```sql
CREATE POLICY "Enable upload for all users" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'portfolio-images');

CREATE POLICY "Enable read access for all users" ON storage.objects
  FOR SELECT USING (bucket_id = 'portfolio-images');
```

## 📁 الملفات الرئيسية

```
بلال/
├── index.html              # الصفحة الرئيسية
├── projects.html           # صفحة معرض الأعمال الكامل
├── admin-panel.html        # لوحة التحكم لإضافة المشاريع
├── test-supabase.html      # صفحة اختبار الاتصال
├── style.css               # ملف التنسيقات
├── script.js               # سكريبت الصفحة الرئيسية
├── projects-script.js      # سكري��ت صفحة المشاريع
├── SUPABASE_SETUP.md       # دليل إعداد Supabase
├── TROUBLESHOOTING.md      # دليل حل المشاكل
└── README.md               # هذا الملف
```

## 🎯 كيفية الاستخدا��

### إضافة مشروع جديد

1. افتح `admin-panel.html`
2. املأ البيانات:
   - اسم المشروع
   - فئة المشروع (مثل: هوية بصرية، سوشيال ميديا، إلخ)
   - صورة المشروع
3. اضغط "إضافة المشروع"
4. سيتم رفع الصورة وحفظ البيانات تلقائياً

### عرض المشاريع

- **الصفحة الرئيسية:** تعرض 6 مشاريع عشوائية
- **صفحة المشاريع:** تعرض جميع المشاريع مع إمكانية التصفية حسب الفئة

## 🔧 حل المشاكل

### المشاريع لا تظهر؟

1. افتح `test-supabase.html` وشغل جميع الاختبارات
2. افتح Console المتصفح (F12) وابحث عن الأخطاء
3. تحقق من:
   - ✅ وجود جدول `projects`
   - ✅ سياسات RLS مضبوطة
   - ✅ وجود مشاريع في قاعدة البيانات

### لا يتم رفع الصور؟

1. تحقق من وجود bucket `portfolio-images`
2. تأكد أن الـ bucket عام (Public)
3. تحقق من سياسات Storage

### للمزيد من التفاصيل

راجع ملف `TROUBLESHOOTING.md` للحصول على ��ليل شامل لحل المشاكل.

## 🔐 الأمان

⚠️ **ملاحظة مهمة:** 

السياسات الحالية تسمح للجميع بإضافة وتعديل المشاريع. لتأمين لوحة التحكم:

1. أضف نظام مصادقة (Authentication)
2. عدّل السياسات لتقييد الوصول
3. استخدم Service Role Key للعمليات الإدارية

## 📞 الدعم

إذا واجهت أي مشكلة:

1. راجع `TROUBLESHOOTING.md`
2. افتح Console المتصفح للأخطاء
3. استخدم `test-supabase.html` للتشخيص
4. راجع [توثيق Supabase](https://supabase.com/docs)

## 📝 معلومات الاتصال بـ Supabase

- **URL:** `https://bkvcmceyxsgzvvcozwkf.supabase.co`
- **Table:** `projects`
- **Storage Bucket:** `portfolio-images`

## 🎨 التخصيص

يمكنك تخصيص الموقع بسهولة:

- **الألوان:** عدّل متغيرات CSS في `style.css`
- **المحتوى:** عدّل النصوص في ملفات HTML
- **الصور:** استبدل الصور في الكود
- **الخطوط:** غيّر الخط في `style.css`

## 📄 الترخيص

هذا المشروع مصمم خصيصاً لبلال ياسر.

---

**تم التصميم والتطوير بواسطة:** سامح رضا

🌐 [www.doc-digital.online](https://www.doc-digital.online)
