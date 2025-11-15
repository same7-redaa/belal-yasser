// Firebase Configuration (استبدال Supabase بـ Firebase)
import { db, collection, getDocs, query, orderBy } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const categoriesContainer = document.querySelector('.category-list');
    const projectsContainer = document.getElementById('portfolio-grid-container');
    let allProjectsData = [];
    let allCategoriesData = {};
    let currentCategory = 'الكل';
    let navigationHistory = []; // Track navigation history
    let parentCategoryMap = {}; // Map subcategory to parent

    async function fetchAllProjects() {
        try {
            console.log('🔄 Fetching projects and categories from Firebase...');
            
            // Load categories first
            const categoriesSnapshot = await getDocs(collection(db, 'categories'));
            categoriesSnapshot.docs.forEach(doc => {
                allCategoriesData[doc.id] = { id: doc.id, ...doc.data() };
            });
            
            // Load images
            const q = query(collection(db, 'images'), orderBy('createdAt', 'desc'));
            const snapshot = await getDocs(q);
            const projects = snapshot.docs.map(doc => {
                const data = doc.data();
                const cat = allCategoriesData[data.categoryId] || { nameAr: 'غير مصنف', nameEn: 'Uncategorized' };
                return {
                    id: doc.id,
                    image_url: data.url,
                    category: cat.nameAr,
                    category_en: cat.nameEn,
                    categoryId: data.categoryId,
                    parent_category: cat.parentId || null,
                    show_on_homepage: data.showOnHomepage || false,
                    name: data.name || '',
                    description: data.description || ''
                };
            });

            console.log('✅ Projects fetched successfully:', projects);
            return projects || [];
        } catch (err) {
            console.error('❌ Exception while fetching projects:', err);
            projectsContainer.innerHTML = '<p>حدث خطأ غير متوقع. حاول مرة أخرى لاحقاً.</p>';
            return [];
        }
    }

    function renderProjects(projectsToRender, selectedCategory = 'الكل') {
        projectsContainer.innerHTML = '';
        
        console.log('📂 Rendering projects for category:', selectedCategory);
        console.log('📊 Projects to render:', projectsToRender.length);
        
        // If showing a main category, show subfolders first
        if (selectedCategory !== 'الكل') {
            // Find the category ID
            const mainCat = Object.values(allCategoriesData).find(c => c.nameAr === selectedCategory);
            console.log('🔍 Found main category:', mainCat);
            
            if (mainCat && !mainCat.parentId) { // Only show folders if it's a main category
                // Get subcategories
                const subCategories = Object.values(allCategoriesData).filter(c => c.parentId === mainCat.id);
                console.log('📁 Found subcategories:', subCategories.length);
                
                // Create folder cards for subcategories that have images
                subCategories.forEach(subCat => {
                    const hasImages = allProjectsData.some(p => p.categoryId === subCat.id);
                    console.log(`📂 ${subCat.nameAr} has images:`, hasImages);
                    
                    if (hasImages) {
                        const folderCard = document.createElement('div');
                        folderCard.className = 'portfolio-item folder-item fade-up';
                        folderCard.style.cursor = 'pointer';
                        folderCard.style.minHeight = '250px';
                        folderCard.onmouseover = () => {
                            folderCard.style.transform = 'translateY(-5px)';
                        };
                        folderCard.onmouseout = () => {
                            folderCard.style.transform = 'translateY(0)';
                        };
                        folderCard.onclick = () => {
                            console.log('🖱️ Clicked folder:', subCat.nameAr);
                            // Store parent category before navigating to subfolder
                            filterProjects(subCat.nameAr, true, mainCat.nameAr);
                        };
                        
                        folderCard.innerHTML = `
                            <i class="fas fa-folder" style="font-size: 80px; color: var(--accent-orange, #FF5722); margin-bottom: 20px;"></i>
                            <h3 style="margin: 0; font-size: 20px; text-align: center; font-weight: bold; color: var(--text-light, #f5f5f5);">${subCat.nameAr}</h3>
                        `;
                        folderCard.style.display = 'flex';
                        folderCard.style.flexDirection = 'column';
                        folderCard.style.alignItems = 'center';
                        folderCard.style.justifyContent = 'center';
                        folderCard.style.padding = '20px';
                        
                        projectsContainer.appendChild(folderCard);
                    }
                });
            }
        }
        
        if (projectsToRender.length === 0 && projectsContainer.children.length === 0) {
            projectsContainer.innerHTML = '<p style="text-align: center; width: 100%;">لا توجد مشاريع في هذه الفئة</p>';
            return;
        }

        // عرض الصور
        projectsToRender.forEach(project => {
            const projectItem = document.createElement('a');
            projectItem.href = project.image_url;
            projectItem.target = '_blank';
            projectItem.className = 'portfolio-item fade-up';
            
            const img = document.createElement('img');
            img.src = project.image_url;
            img.alt = project.name || 'Project Image';
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.display = 'block';
            img.style.objectFit = 'cover';
            
            img.onerror = function() {
                console.error('Failed to load image:', project.image_url);
                this.parentElement.style.display = 'none';
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

    function filterProjects(category, addToHistory = true, parentCategory = null) {
        currentCategory = category;
        
        // Store parent relationship if provided
        if (parentCategory) {
            parentCategoryMap[category] = parentCategory;
        }
        
        // Add to history if it's a new navigation (not back button)
        if (addToHistory) {
            navigationHistory.push(category);
            console.log('📚 Navigation history:', navigationHistory);
        }
        
        // Update URL hash for browser back button support
        window.location.hash = category === 'الكل' ? '' : category;
        
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        const activeBtn = document.querySelector(`[data-category-name="${category}"]`);
        if (activeBtn) activeBtn.classList.add('active');

        if (category === 'الكل') {
            // Show only main categories (no parent)
            const mainCategoryImages = allProjectsData.filter(p => {
                const cat = Object.values(allCategoriesData).find(c => c.id === p.categoryId);
                return cat && !cat.parentId;
            });
            renderProjects(mainCategoryImages, 'الكل');
        } else {
            // Find the selected category
            const selectedCat = Object.values(allCategoriesData).find(c => c.nameAr === category);
            
            if (selectedCat) {
                // If it's a main category, show only its direct images (not subcategory images)
                if (!selectedCat.parentId) {
                    const directImages = allProjectsData.filter(p => p.categoryId === selectedCat.id);
                    renderProjects(directImages, category);
                } else {
                    // If it's a subcategory, show its images
                    const filtered = allProjectsData.filter(p => p.category === category);
                    renderProjects(filtered, category);
                }
            }
        }
    }

    async function initializePortfolio() {
        if (!categoriesContainer || !projectsContainer) return;

        projectsContainer.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-light);">جاري تحميل المشاريع...</p>';
        allProjectsData = await fetchAllProjects();

        if (allProjectsData.length > 0) {
            // Load all categories from Firebase to build hierarchy
            const categoriesSnapshot = await getDocs(collection(db, 'categories'));
            const allCategories = {};
            categoriesSnapshot.docs.forEach(doc => {
                allCategories[doc.id] = { id: doc.id, ...doc.data() };
            });

            // Get unique categories from projects
            const categoriesMap = new Map();
            allProjectsData.forEach(p => {
                if (!categoriesMap.has(p.category)) {
                    categoriesMap.set(p.category, {
                        ar: p.category,
                        en: p.category_en || p.category
                    });
                }
            });

            // زر "الكل"
            const allBtn = document.createElement('a');
            allBtn.href = '#';
            allBtn.className = 'category-btn active';
            allBtn.textContent = 'الكل';
            allBtn.dataset.categoryName = 'الكل';
            allBtn.onclick = (e) => {
                e.preventDefault();
                filterProjects('الكل');
            };
            categoriesContainer.appendChild(allBtn);

            // Build category hierarchy
            const mainCategories = Object.values(allCategories).filter(c => !c.parentId);
            const subCategories = Object.values(allCategories).filter(c => c.parentId);

            mainCategories.forEach(mainCat => {
                // Check if main category has projects (direct or in subcategories)
                const hasDirectProjects = allProjectsData.some(p => p.categoryId === mainCat.id);
                const subs = subCategories.filter(s => s.parentId === mainCat.id);
                const hasSubProjects = subs.some(sub => allProjectsData.some(p => p.categoryId === sub.id));
                
                if (hasDirectProjects || hasSubProjects) {
                    const btn = document.createElement('a');
                    btn.href = '#';
                    btn.className = 'category-btn';
                    btn.textContent = mainCat.nameAr;
                    btn.dataset.categoryName = mainCat.nameAr;
                    btn.onclick = (e) => {
                        e.preventDefault();
                        filterProjects(mainCat.nameAr);
                    };
                    categoriesContainer.appendChild(btn);
                }
            });

            // Show "الكل" view by default
            navigationHistory = ['الكل'];
            filterProjects('الكل', false);
        } else {
            projectsContainer.innerHTML = '<p>لا توجد مشاريع لعرضها حالياً.</p>';
        }
    }

    initializePortfolio();
    
    // Handle browser back/forward buttons
    window.addEventListener('hashchange', (event) => {
        const hash = window.location.hash.substring(1);
        const targetCategory = hash ? decodeURIComponent(hash) : 'الكل';
        
        console.log('⬅️ Hash changed to:', targetCategory);
        console.log('📍 Current category:', currentCategory);
        
        // Don't navigate if we're already there
        if (targetCategory !== currentCategory) {
            // Don't add to history when navigating via hash change
            currentCategory = targetCategory;
            
            document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
            const activeBtn = document.querySelector(`[data-category-name="${targetCategory}"]`);
            if (activeBtn) activeBtn.classList.add('active');
            
            // Re-render based on category
            if (targetCategory === 'الكل') {
                const mainCategoryImages = allProjectsData.filter(p => {
                    const cat = Object.values(allCategoriesData).find(c => c.id === p.categoryId);
                    return cat && !cat.parentId;
                });
                renderProjects(mainCategoryImages, 'الكل');
            } else {
                const selectedCat = Object.values(allCategoriesData).find(c => c.nameAr === targetCategory);
                if (selectedCat) {
                    if (!selectedCat.parentId) {
                        const directImages = allProjectsData.filter(p => p.categoryId === selectedCat.id);
                        renderProjects(directImages, targetCategory);
                    } else {
                        const filtered = allProjectsData.filter(p => p.category === targetCategory);
                        renderProjects(filtered, targetCategory);
                    }
                }
            }
        }
    });
    
    // Handle hash on page load (if user bookmarked a specific category)
    if (window.location.hash) {
        const hashCategory = decodeURIComponent(window.location.hash.substring(1));
        if (hashCategory) {
            setTimeout(() => {
                filterProjects(hashCategory, false);
            }, 500);
        }
    }
    
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