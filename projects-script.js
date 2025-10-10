document.addEventListener('DOMContentLoaded', () => {
    const GITHUB_USER = 'same7-redaa';
    const GITHUB_REPO = 'belal';
    const PROJECTS_PATH = 'projects';

    const categoriesContainer = document.querySelector('.category-list');
    const projectsContainer = document.getElementById('portfolio-grid-container');
    let allProjectsData = []; // Cache for all project images

    async function fetchJson(url) {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    }

    function renderProjects(projects) {
        projectsContainer.innerHTML = '';
        projects.forEach(project => {
            const projectItem = document.createElement('a');
            projectItem.href = project.download_url; // Link to the full image
            projectItem.target = '_blank'; // Open in a new tab
            projectItem.className = 'portfolio-item fade-up';
            projectItem.style.backgroundImage = `url(${project.download_url})`;
            projectItem.setAttribute('data-category', project.category);
            projectsContainer.appendChild(projectItem);
        });
        // Trigger fade-up animation
        setTimeout(() => {
            document.querySelectorAll('.portfolio-item.fade-up').forEach(item => {
                item.classList.add('visible');
            });
        }, 100);
    }

    function filterProjects(category) {
        document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-category-name="${category}"]`).classList.add('active');

        if (category === 'الكل') {
            renderProjects(allProjectsData);
        } else {
            const filtered = allProjectsData.filter(p => p.category === category);
            renderProjects(filtered);
        }
    }

    async function loadProjects() {
        if (!categoriesContainer || !projectsContainer) return;

        projectsContainer.innerHTML = '<p>جاري تحميل المشاريع...</p>';

        try {
            const categories = await fetchJson(`https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${PROJECTS_PATH}`);
            const categoryFolders = categories.filter(item => item.type === 'dir');

            if (categoryFolders.length === 0) {
                projectsContainer.innerHTML = '<p>لم يتم العثور على مجلدات مشاريع في المستودع.</p>';
                return;
            }
            
            // 'All' button
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

            for (const folder of categoryFolders) {
                // Category button
                const btn = document.createElement('a');
                btn.href = '#';
                btn.className = 'category-btn';
                btn.textContent = folder.name;
                btn.dataset.categoryName = folder.name;
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    filterProjects(folder.name);
                });
                categoriesContainer.appendChild(btn);

                // Fetch images
                const images = await fetchJson(folder.url);
                const imageFiles = images.filter(file => file.type === 'file' && /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name));
                
                imageFiles.forEach(image => {
                    allProjectsData.push({
                        ...image,
                        category: folder.name
                    });
                });
            }

            // Initial render
            renderProjects(allProjectsData);

        } catch (error) {
            console.error('Error loading projects:', error);
            projectsContainer.innerHTML = '<p>حدث خطأ أثناء تحميل المشاريع. حاول مرة أخرى لاحقاً.</p>';
        }
    }

    loadProjects();
});