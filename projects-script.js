// إعداد Supabase Client
const SUPABASE_URL = 'https://bkvcmceyxsgzvvcozwkf.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJrdmNtY2V5eHNnenZ2Y296d2tmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAxMDAyODQsImV4cCI6MjA3NTY3NjI4NH0.TtZg_fT1gBCfxx7jT9bTk_ylm7kAjQGflCbMKcyZJWY';

let supabase;

// التحقق من تحميل مكتبة Supabase
if (typeof window.supabase !== 'undefined') {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('✅ Supabase client initialized successfully');
} else {
    console.error('❌ Supabase library not loaded. Make sure the script tag is included.');
}

document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.querySelector('.category-list');
    const projectsContainer = document.getElementById('portfolio-grid-container');
    let allProjectsData = [];

    async function fetchAllProjects() {
        if (!supabase) {
            console.error('❌ Supabase client not initialized');
            projectsContainer.innerHTML = '<p>خطأ في الاتصال بقاعدة البيانات.</p>';
            return [];
        }

        try {
            console.log('🔄 Fetching projects from Supabase...');
            
            // محاولة الجلب مع الترتيب حسب created_at (من الأقدم للأحدث)
            let { data: projects, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: true });

            // إذا فشل بسبب عدم وجود created_at، جرب بترتيب id (من الأقدم للأحدث)
            if (error && error.message.includes('created_at')) {
                console.log('⚠️ Column created_at not found, fetching with id ordering...');
                const result = await supabase
                    .from('projects')
                    .select('*')
                    .order('id', { ascending: true });
                
                projects = result.data;
                error = result.error;
            }

            if (error) {
                console.error('❌ Error fetching projects:', error);
                projectsContainer.innerHTML = `<p>حدث خطأ أثناء تحميل المشاريع: ${error.message}</p>`;
                return [];
            }

            console.log('✅ Projects fetched successfully:', projects);
            return projects || [];
        } catch (err) {
            console.error('❌ Exception while fetching projects:', err);
            projectsContainer.innerHTML = '<p>حدث خطأ غير متوقع. حاول مرة أخرى لاحقاً.</p>';
            return [];
        }
    }

    function renderProjects(projectsToRender, showSubFolders = false, parentCategory = null) {
        projectsContainer.innerHTML = '';
        
        if (projectsToRender.length === 0 && !showSubFolders) {
            const currentLang = document.documentElement.lang || 'ar';
            const noCategoryText = currentLang === 'ar' 
                ? '<p style="text-align: center; width: 100%; grid-column: 1 / -1;">لا توجد مشاريع في هذه الفئة حالياً.</p>'
                : '<p style="text-align: center; width: 100%; grid-column: 1 / -1;">No projects in this category currently.</p>';
            projectsContainer.innerHTML = noCategoryText;
            return;
        }

        const currentLang = document.documentElement.lang || 'ar';

        // إذا كانت فئة رئيسية، نعرض الفئات الفرعية كفولدرات
        if (showSubFolders) {
            const subCategories = [...new Set(allProjectsData
                .filter(p => p.parent_category === parentCategory)
                .map(p => ({ category: p.category, category_en: p.category_en })))];
            
            subCategories.forEach(subCat => {
                const folderItem = document.createElement('div');
                folderItem.className = 'portfolio-item folder-item fade-up';
                folderItem.onclick = () => filterProjects(subCat.category);
                
                const folderIcon = document.createElement('div');
                folderIcon.className = 'folder-icon';
                folderIcon.innerHTML = '<i class="fas fa-folder" style="font-size: 60px; color: var(--accent-orange);"></i>';
                
                const folderName = document.createElement('div');
                folderName.className = 'folder-name';
                folderName.textContent = currentLang === 'ar' ? subCat.category : (subCat.category_en || subCat.category);
                
                folderItem.appendChild(folderIcon);
                folderItem.appendChild(folderName);
                projectsContainer.appendChild(folderItem);
            });
        }

        // عرض الصور
        projectsToRender.forEach(project => {
            const projectItem = document.createElement('a');
            projectItem.href = project.image_url;
            projectItem.target = '_blank';
            projectItem.className = 'portfolio-item fade-up';
            
            // إنشاء عنصر img بحجمه الطبيعي
            const img = document.createElement('img');
            img.src = project.image_url;
            const categoryName = currentLang === 'ar' ? project.category : (project.category_en || project.category);
            img.alt = categoryName || 'Project Image';
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.objectFit = 'contain';
            
            // إضافة معالج للأخطاء
            img.onerror = function() {
                console.error('Failed to load image:', project.image_url);
                this.style.display = 'none';
                projectItem.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
                projectItem.innerHTML = '<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); color: #aaa;">⚠️</span>';
            };
            
            projectItem.appendChild(img);
            projectsContainer.appendChild(projectItem);
        });

        setTimeout(() => {
            document.querySelectorAll('.portfolio-item.fade-up').forEach(item => {
                item.classList.add('visible');
            });
        }, 100);
    }

    function filterProjects(category) {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-category-name="${category}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        if (category === 'الكل') {
            renderProjects(allProjectsData);
        } else {
            // التحقق إذا كانت فئة رئيسية بها فئات فرعية
            const hasSubCategories = allProjectsData.some(p => p.parent_category === category);
            
            if (hasSubCategories) {
                // عرض الفئات الفرعية كفولدرات + صور الفئة الرئيسية
                const mainCategoryProjects = allProjectsData.filter(p => 
                    p.category === category && !p.parent_category
                );
                renderProjects(mainCategoryProjects, true, category);
            } else {
                // عرض الصور فقط
                const filtered = allProjectsData.filter(p => p.category === category);
                renderProjects(filtered);
            }
        }
    }

    async function initializePortfolio() {
        if (!categoriesContainer || !projectsContainer) return;

        const currentLang = document.documentElement.lang || 'ar';
        const loadingText = currentLang === 'ar' ? '<p>جاري تحميل المشاريع...</p>' : '<p>Loading projects...</p>';
        projectsContainer.innerHTML = loadingText;
        allProjectsData = await fetchAllProjects();

        if (allProjectsData.length > 0) {
            const currentLang = document.documentElement.lang || 'ar';
            
            // إنشاء قائمة فريدة من الفئات الرئيسية فقط
            const categoriesMap = new Map();
            allProjectsData.forEach(p => {
                // عرض الفئات الرئيسية فقط (بدون parent_category)
                if (!p.parent_category && !categoriesMap.has(p.category)) {
                    categoriesMap.set(p.category, {
                        ar: p.category,
                        en: p.category_en || p.category
                    });
                }
            });
            const categories = Array.from(categoriesMap.keys()).sort();

            const allBtn = document.createElement('a');
            allBtn.href = '#';
            allBtn.className = 'category-btn active';
            allBtn.textContent = currentLang === 'ar' ? 'الكل' : 'All';
            allBtn.dataset.categoryName = 'الكل';
            allBtn.addEventListener('click', (e) => {
                e.preventDefault();
                filterProjects('الكل');
            });
            categoriesContainer.appendChild(allBtn);

            categories.forEach(category => {
                const btn = document.createElement('a');
                btn.href = '#';
                btn.className = 'category-btn';
                const categoryData = categoriesMap.get(category);
                btn.textContent = currentLang === 'ar' ? categoryData.ar : categoryData.en;
                btn.dataset.categoryName = category;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterProjects(category);
                });
                categoriesContainer.appendChild(btn);
            });

            renderProjects(allProjectsData);
        } else {
            const noProjectsText = document.documentElement.lang === 'en' 
                ? '<p>No projects to display currently.</p>' 
                : '<p>لا توجد مشاريع لعرضها حالياً.</p>';
            projectsContainer.innerHTML = noProjectsText;
        }
    }

    initializePortfolio();
    
    // تحميل اللغة المحفوظة عند فتح الصفحة
    const savedLanguage = localStorage.getItem('language') || 'ar';
    if (typeof setLanguage === 'function') {
        setLanguage(savedLanguage);
    }
    
    // إعادة تحميل الفئات عند تغيير اللغة
    window.addEventListener('languageChanged', () => {
        if (allProjectsData.length > 0) {
            // إعادة بناء أزرار الفئات
            initializePortfolio();
        }
    });
});