# 🎨 موقع بلال ياسر - Portfolio Website

موقع بورتفوليو احترافي لعرض أعمال التصميم الجرافيكي مع لوحة تحكم كاملة.

## 🌟 المميزات

### 🎯 الموقع الرئيسي
- **تصميم احترافي متجاوب** - يعمل على جميع الأجهزة
- **نظام عرض متقدم** - عرض مميز للمشاريع المختارة (Featured Projects)
- **تنظيم هرمي للمشاريع** - تصنيفات رئيسية وفرعية
- **دعم كامل للغتين** - العربية والإنجليزية مع RTL/LTR
- **تحميل سريع** - صور محسنة من Google Drive

### 🎛️ لوحة التحكم
- **إدارة كاملة للتصنيفات** - إضافة وتعديل وحذف
- **نظام التصنيفات الفرعية** - تنظيم هرمي للمشاريع
- **إدارة الصور** - رفع وتعديل وحذف
- **نظام المشاريع المميزة** - اختيار 3 مشاريع للعرض في الصفحة الرئيسية
- **محول Google Drive تلقائي** - تحويل روابط Google Drive للعرض المباشر
- **واجهة سهلة الاستخدام** - تصميم بسيط وواضح

## 🛠️ التقنيات المستخدمة

- **HTML5** - بنية الموقع
- **CSS3** - التصميم والتنسيق
- **JavaScript (ES6+)** - البرمجة
- **Firebase v10.7.1** - قاعدة البيانات والمصادقة
  - Firestore - تخزين البيانات
  - Authentication - نظام الدخول
- **Google Drive** - استضافة الصور
- **Font Awesome** - الأيقونات

## 📁 هيكل المشروع

```
📦 belal-yasser/
├── 📄 index.html              # الصفحة الرئيسية
├── 📄 projects.html           # صفحة المشاريع
├── 📄 control.html            # لوحة التحكم
├── 🎨 style.css               # ملف التنسيق الرئيسي
├── 📜 script.js               # سكريبت الصفحة الرئيسية
├── 📜 projects-script.js      # سكريبت صفحة المشاريع
├── 🔥 firebase-config.js      # إعدادات Firebase
├── 🌐 translations.js         # ترجمات الموقع
└── 📁 fonts/                  # الخطوط العربية
    └── Nahdi-Black.ttf
```

## 🚀 البدء السريع

### 1. إعداد Firebase

1. أنشئ مشروع جديد على [Firebase Console](https://console.firebase.google.com/)
2. فعّل **Firestore Database**
3. فعّل **Authentication** (Email/Password)
4. انسخ بيانات الاعتماد وحدث ملف `firebase-config.js`

### 2. إعداد Firestore

أنشئ مجموعتين (Collections):

#### Categories Collection
```javascript
{
  name: "اسم التصنيف",
  nameEn: "Category Name",
  parentId: null, // أو ID التصنيف الأب للتصنيفات الفرعية
  order: 1
}
```

#### Images Collection
```javascript
{
  title: "عنوان المشروع",
  description: "وصف المشروع",
  imageUrl: "رابط الصورة من Google Drive",
  categoryId: "ID التصنيف",
  isFeaturedProject: false,
  createdAt: timestamp
}
```

### 3. إعداد المصادقة

1. اذهب إلى **Authentication** في Firebase
2. فعّل طريقة **Email/Password**
3. أضف مستخدم إداري جديد
4. استخدم البريد وكلمة المرور للدخول إلى لوحة التحكم

### 4. رفع الملفات

ارفع الملفات التالية إلى الاستضافة:
- ✅ index.html
- ✅ projects.html
- ✅ control.html
- ✅ style.css
- ✅ script.js
- ✅ projects-script.js
- ✅ firebase-config.js
- ✅ translations.js
- ✅ fonts/Nahdi-Black.ttf

## 🎯 كيفية الاستخدام

### للمستخدمين العاديين:
1. **الصفحة الرئيسية** - عرض المشاريع المميزة والخدمات
2. **صفحة المشاريع** - تصفح جميع المشاريع مع إمكانية الفلترة

### للمدير (Admin):
1. افتح صفحة `control.html`
2. سجل الدخول ببياناتك
3. استخدم التبويبات:
   - **Categories** - إدارة التصنيفات
   - **Images** - إدارة المشاريع والصور

## 🔐 الأمان

⚠️ **مهم جداً:**
- لا تنشر ملف `firebase-config.js` مع بيانات حقيقية على GitHub العام
- استخدم **Firebase Security Rules** لحماية البيانات
- غيّر كلمة مرور المدير بشكل دوري

### قواعد Firestore الموصى بها:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // السماح بالقراءة للجميع
    match /{document=**} {
      allow read: if true;
    }
    
    // السماح بالكتابة للمستخدمين المصادقين فقط
    match /categories/{categoryId} {
      allow write: if request.auth != null;
    }
    
    match /images/{imageId} {
      allow write: if request.auth != null;
    }
  }
}
```

## 📝 ملاحظات مهمة

### استخدام Google Drive للصور:
- ارفع الصور على Google Drive
- اجعل الصورة **عامة** (Anyone with the link)
- الموقع سيحول الرابط تلقائياً للصيغة الصحيحة
- الصيغة المستخدمة: `https://drive.google.com/thumbnail?id=FILE_ID&sz=w2000`

### نظام المشاريع المميزة:
- يمكن اختيار **3 مشاريع فقط** كمشاريع مميزة
- تظهر في الصفحة الرئيسية بتصميم خاص
- انقر على النجمة ⭐ في لوحة التحكم لتفعيل/إلغاء

### التصنيفات الهرمية:
- يمكن إنشاء تصنيفات رئيسية
- يمكن إنشاء تصنيفات فرعية تحت أي تصنيف رئيسي
- في صفحة المشاريع، التصنيفات الفرعية تظهر كمجلدات 📁

## 🌐 استضافة موصى بها

- **Netlify** (مجاني) - [netlify.com](https://netlify.com)
- **Vercel** (مجاني) - [vercel.com](https://vercel.com)
- **GitHub Pages** (مجاني) - [pages.github.com](https://pages.github.com)
- **Firebase Hosting** (مجاني) - [firebase.google.com/products/hosting](https://firebase.google.com/products/hosting)

## 📞 التواصل

**بلال ياسر**
- 📱 الهاتف: +201069125804
- 📧 البريد: blal.yaser15@gmail.com
- 💼 Behance: [behance.net/belalyasser](https://www.behance.net/belalyasser)
- 🔗 LinkedIn: [linkedin.com/in/belal-yasser](https://www.linkedin.com/in/belal-yasser-8aaa03342/)

**المطور - سامح رضا**
- 📧 البريد: samehabdealsalam@gmail.com
- 🌐 الموقع: doc-digital.online

## 📄 الترخيص

جميع الحقوق محفوظة © 2025 بلال ياسر

---

**آخر تحديث:** نوفمبر 2025
**الإصدار:** 2.0.0 (Firebase Version)
