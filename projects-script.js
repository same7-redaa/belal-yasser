document.addEventListener('DOMContentLoaded', () => {
    // Function to load projects from JSON file
    function loadProjects() {
        fetch('projects.json')
            .then(response => response.json())
            .then(data => {
                const categories = ['branding', 'social-media', 'packaging', 'infographics'];
                categories.forEach(category => {
                    const gridElement = document.getElementById(`${category}-grid`);
                    gridElement.innerHTML = '';
                    if (data[category]) {
                        data[category].forEach(project => {
                            const projectItem = document.createElement('div');
                            projectItem.className = 'portfolio-item fade-up';
                            projectItem.style.backgroundImage = `url('${project.image}')`;
                            gridElement.appendChild(projectItem);
                        });
                    }
                });
            })
            .catch(error => console.error('Error fetching projects:', error));
    }

    loadProjects();

    const categoryButtons = document.querySelectorAll('.category-btn');
    const sections = document.querySelectorAll('.portfolio-grid-section');

    categoryButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            const targetId = e.target.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const sectionsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                categoryButtons.forEach(btn => {
                    if (btn.getAttribute('href') === `#${id}`) {
                        btn.classList.add('active');
                    } else {
                        btn.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionsObserver.observe(section);
    });
});