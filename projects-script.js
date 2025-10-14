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
            
            // محاولة الجلب مع الترتيب حسب created_at
            let { data: projects, error } = await supabase
                .from('projects')
                .select('*')
                .order('created_at', { ascending: false });

            // إذا فشل بسبب عدم وجود created_at، جرب بدون ترتيب
            if (error && error.message.includes('created_at')) {
                console.log('⚠️ Column created_at not found, fetching without ordering...');
                const result = await supabase
                    .from('projects')
                    .select('*')
                    .order('id', { ascending: false });
                
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

    function renderProjects(projectsToRender) {
        projectsContainer.innerHTML = '';
        if (projectsToRender.length === 0) {
            projectsContainer.innerHTML = '<p style="text-align: center; width: 100%; grid-column: 1 / -1;">لا توجد مشاريع في هذه الفئة حالياً.</p>';
            return;
        }

        projectsToRender.forEach(project => {
            const projectItem = document.createElement('a');
            projectItem.href = project.image_url;
            projectItem.target = '_blank';
            projectItem.className = 'portfolio-item fade-up';
            
            // إنشاء عنصر img بدلاً من background-image
            const img = document.createElement('img');
            img.src = project.image_url;
            img.alt = project.category || 'Project Image';
            img.style.width = '100%';
            img.style.height = '100%';
            img.style.objectFit = 'cover';
            img.style.position = 'absolute';
            img.style.top = '0';
            img.style.left = '0';
            
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
            const filtered = allProjectsData.filter(p => p.category === category);
            renderProjects(filtered);
        }
    }

    async function initializePortfolio() {
        if (!categoriesContainer || !projectsContainer) return;

        projectsContainer.innerHTML = '<p>جاري تحميل المشاريع...</p>';
        allProjectsData = await fetchAllProjects();

        if (allProjectsData.length > 0) {
            const categories = [...new Set(allProjectsData.map(p => p.category))].sort();

            const allBtn = document.createElement('a');
            allBtn.href = '#';
            allBtn.className = 'category-btn active';
            allBtn.textContent = 'الكل';
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
                btn.textContent = category;
                btn.dataset.categoryName = category;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterProjects(category);
                });
                categoriesContainer.appendChild(btn);
            });

            renderProjects(allProjectsData);
        } else {
            projectsContainer.innerHTML = '<p>لا توجد مشاريع لعرضها حالياً.</p>';
        }
    }

    initializePortfolio();
});