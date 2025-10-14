# 🎨 موقع بلال ياسر - Portfolio Website

موقع بورتفوليو احترافي لمصمم جرافيك مع لوحة تحكم كاملة لإدارة المشاريع.

---

## 🌟 المميزات

### للزوار:
- ✨ تصميم عصري وجذاب
- 📱 متجاوب بالكامل مع جميع الأجهزة
- 🎯 تجربة مستخدم سلسة
- ⚡ سرعة تحميل عالية
- 🌐 دعم كامل للغة العربية (RTL)
- 🖼️ معرض أعمال ديناميكي
- 🔍 فلترة المشاريع حسب الفئات

### للمدير (لوحة التحكم):
- 🔐 نظام تسجيل دخول آمن
- 📤 رفع صور متعددة دفعة واحدة
- 🗜️ ضغط الصور تلقائياً (توفير 60-80% من المساحة)
- 📁 إنشاء وإدارة الفئات
- ✏️ تعديل وحذف المشاريع
- 👁️ التحكم في عرض المشاريع بالصفحة الرئيسية
- 🔄 عمليات جماعية (Bulk Actions)
- 📊 واجهة سهلة ��لاستخدام

---

## 📁 هيكل المشروع

```
📦 Portfolio Website/
│
├── 📄 index.html              # الصفحة الرئيسية
├── 📄 projects.html           # صفحة عرض جميع المشاريع
├── 📄 admin-panel.html        # لوحة التحكم
│
├── 🎨 style.css               # ملف التنسيق الرئيسي
├── 📜 script.js               # سكريبت الصفحة الرئيسية
├── 📜 projects-script.js      # سكريبت صفحة المشاريع
│
├── 📁 fonts/                  # الخطوط العربية
│   └── Nahdi-Black.ttf
│
└── 📚 Documentation/           # ملفات التوثيق
    ├── DEPLOYMENT_GUIDE.md    # دليل الرفع والنشر
    ├── ADMIN_GUIDE.md         # دليل استخدام لوحة التحكم
    ├── SUPABASE_SETUP.md      # إعداد قاعدة البيانات
    └── TROUBLESHOOTING.md     # حل المشاكل
```

---

## 🚀 البدء السريع

### 1. تحميل المشروع
```bash
# نسخ المشروع
git clone [repository-url]
cd portfolio-website
```

### 2. إعداد قاعدة البيانات
راجع ملف `SUPABASE_SETUP.md` للتفاصيل الكاملة.

### 3. تحديث الإعدادات
في الملفات التالية، حدّث مفاتيح Supabase:
- `script.js`
- `projects-script.js`
- `admin-panel.html`

### 4. رفع الموقع
راجع ملف `DEPLOYMENT_GUIDE.md` للخطوات التفصيلية.

---

## 🛠️ التقنيات المستخدمة

### Frontend:
- **HTML5** - هيكل الصفحات
- **CSS3** - التنسيق والتصميم
- **JavaScript (ES6+)** - البرمجة والتفاعل
- **Font Awesome** - الأيقونات

### Backend & Database:
- **Supabase** - قاعدة البيانات وتخزين الصور
  - PostgreSQL Database
  - Storage Bucket
  - Real-time API

### الميزات التقنية:
- ✅ Responsive Design
- ✅ CSS Grid & Flexbox
- ✅ Intersection Observer API
- ✅ Canvas API (لضغط الصور)
- ✅ Async/Await
- ✅ Local Storage
- ✅ Image Compression

---

## 📄 الصفحات

### 1. الصفحة الرئيسية (index.html)
- قسم Hero مع عنوان جذاب
- قسم "من أنا"
- قسم الخدمات (5 خدمات)
- قسم "لماذا تختارني"
- معرض أعمال (6 صور)
- قسم التواصل
- Footer

### 2. صفحة المشاريع (projects.html)
- عرض جميع المشاريع
- فلترة حسب الفئات
- تصميم Grid متجاوب
- فتح الصور في تاب جديد

### 3. لوحة التحكم (admin-panel.html)
- تسجيل دخول آمن
- رفع صور متعددة
- إدارة الفئات
- تعديل وحذف المشاريع
- عمليات جماعية

---

## 🎨 التصميم

### الألوان:
- **الخلفية الداكنة:** `#121212`
- **اللون الأساسي:** `#FF5722` (برتقالي)
- **النص الفاتح:** `#f5f5f5`
- **النص الثانوي:** `#aaaaaa`

### الخطوط:
- **الخط الرئيسي:** Nahdi-Black (عربي)
- **الخط الاحتياطي:** Arial, sans-serif

### التأثيرات:
- Fade-up animations
- Hover effects
- Smooth transitions
- Backdrop blur
- Box shadows

---

## 📱 التجاوب

الموقع متجاوب بالكامل مع:
- 💻 Desktop (1200px+)
- 💻 Laptop (992px - 1199px)
- 📱 Tablet (768px - 991px)
- 📱 Mobile (< 768px)

---

## 🔐 الأمان

### لوحة التحكم:
- كلمة مرور محمية
- Session Storage
- تشفير HTTPS (عند الرفع)

### قاعدة البيانات:
- Row Level Security (RLS)
- Public Read Access
- Authenticated Write Access

### الصور:
- تخزين آمن في Supabase Storage
- روابط عامة للعرض فقط
- ضغط تلقائي قبل الرفع

---

## 📊 الأداء

### سرعة التحميل:
- ⚡ First Contentful Paint: < 1.5s
- ⚡ Time to Interactive: < 2.5s
- ⚡ Total Page Size: < 500KB (بدون الصور)

### تحسينات الأداء:
- ✅ Lazy Loading للصور
- ✅ ضغط الصور (80% quality)
- ✅ تحجيم الصور (max 1920px)
- ✅ CSS Minification
- ✅ Font Display Swap
- ✅ Cache Control Headers

---

## 🔧 الإعدادات

### تغيير كلمة مرور لوحة التحكم:
في `admin-panel.html`:
```javascript
const ADMIN_PASSWORD = 'كلمة_المرور_الجديدة';
```

### تحديث معلومات الاتصال:
في `index.html` و `projects.html`:
- رقم الهاتف
- رقم WhatsApp
- البريد الإلكتروني
- روابط السوشيال ميديا

### تخصيص الألوان:
في `style.css`:
```css
:root {
    --bg-dark: #121212;
    --accent-orange: #FF5722;
    --text-light: #f5f5f5;
    --text-muted: #aaaaaa;
}
```

---

## 📚 ا��توثيق

### الملفات المتوفرة:
1. **DEPLOYMENT_GUIDE.md** - دليل شامل للرفع والنشر
2. **ADMIN_GUIDE.md** - دليل استخدام لوحة التحكم
3. **SUPABASE_SETUP.md** - إعداد قاعدة البيانات
4. **TROUBLESHOOTING.md** - حل المشاكل الشائعة
5. **QUICK_START.md** - البدء السريع

---

## 🐛 حل المشاكل

### الصور لا تظهر؟
1. تحقق من Supabase Storage Bucket (يجب أن يكون Public)
2. تحقق من مفاتيح API
3. افتح Console وابحث عن الأخطاء

### لوحة التحكم لا تعمل؟
1. تحقق من كلمة المرور
2. تحقق من اتصال الإنترنت
3. امسح Cache المتصفح

### الخط العربي لا يظهر؟
1. تأكد من رفع مجلد `fonts/`
2. تحقق من مسار الخط في CSS
3. امسح Cache وأعد التحميل

---

## 📈 التحديثات المستقبلية

### مخطط لها:
- [ ] نظام تعليقات للزوار
- [ ] إحصائيات الزيارات
- [ ] نظام بحث متقدم
- [ ] تصدير المشاريع PDF
- [ ] Multi-language Support
- [ ] Dark/Light Mode Toggle
- [ ] Blog Section

---

## 🤝 المساهمة

هذا المشروع مفتوح للتحسينات. إذا كان لديك اقتراحات:
1. Fork المشروع
2. أنشئ Branch جديد
3. قم بالتعديلات
4. أرسل Pull Request

---

## 📄 الترخيص

هذا المشروع مملوك لـ **بلال ياسر**.
جميع الحقوق محفوظة © 2025

---

## 👨‍💻 المطور

**سامح رضا**
- 🌐 Website: [doc-digital.online](https://www.doc-digital.online)
- 📱 WhatsApp: +201023160657
- 📘 Facebook: [SAME7.REDAA](https://www.facebook.com/SAME7.REDAA)

---

## 📞 التواصل مع صاحب الموقع

**بلال ياسر - مصمم جرافيك**
- 📱 Phone: +201069125804
- 💬 WhatsApp: +201069125804
- 📧 Email: blal.yaser15@gmail.com
- 🎨 Behance: [Belalyaser](https://www.behance.net/Belalyaser)
- 💼 LinkedIn: [belalyasser](https://www.linkedin.com/in/belalyasser)

---

## ⭐ إذا أعجبك المشروع

إذا وجدت هذا المشروع مفيداً:
- ⭐ ضع نجمة على GitHub
- 🔄 شاركه مع الآخرين
- 💬 اترك تعليقاً

---

## 🎉 شكراً لاستخدامك هذا المشروع!

**نتمنى لك التوفيق في عرض أعمالك! 🚀**

---

**آخر تحديث:** يناير 2025
**الإصدار:** 1.0.0
