// Firebase Import
import { db, collection, getDocs, query, where, orderBy } from './firebase-config.js';

// Language toggle function
window.toggleLanguage = function() {
    const currentLang = getCurrentLanguage();
    const newLang = currentLang === 'ar' ? 'en' : 'ar';
    setLanguage(newLang);
}

// Hide loading screen immediately when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
        }, 100);
    }
});

// Header Scroll Effect and Mobile Menu
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Header scroll effect
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }, { passive: true });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle && navMenu) {
                menuToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (menuToggle && navMenu && 
            !menuToggle.contains(e.target) && 
            !navMenu.contains(e.target)) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Enhanced Scroll Animations with Fade Effects
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class for fade-up animation
            entry.target.classList.add('visible');
            
            // Animate skill progress bars
            if (entry.target.classList.contains('skill-card')) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    const progress = progressBar.getAttribute('data-progress');
                    progressBar.style.width = progress + '%';
                }
            }
            
            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '50px'
});

// Observe all fade-up elements
const fadeElements = document.querySelectorAll('.fade-up');
fadeElements.forEach(el => observer.observe(el));

// Observe skill cards
const skillCards = document.querySelectorAll('.skill-card');
skillCards.forEach(el => observer.observe(el));

// Counter Animation for Achievements
function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const duration = 1500;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

// Observe achievement numbers
const achievementObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.achievement-number');
            numbers.forEach(number => {
                if (number.textContent === '0') {
                    animateCounter(number);
                }
            });
            achievementObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

const achievementsSection = document.querySelector('.achievements');
if (achievementsSection) {
    achievementObserver.observe(achievementsSection);
}

// Featured Projects Slider
document.addEventListener('DOMContentLoaded', () => {
    const sliderTrack = document.querySelector('.slider-track');
    let currentIndex = 0;
    let featuredProjects = [];
    let autoSlideInterval;

    async function loadFeaturedSlider() {
        if (!sliderTrack) return;

        sliderTrack.innerHTML = '<p style="text-align: center; width: 100%; color: var(--text-light); padding: 50px;">جاري تحميل المشاريع المميزة...</p>';

        try {
            // Load featured projects from Firebase
            const q = query(
                collection(db, 'images'),
                where('isFeaturedProject', '==', true)
            );
            
            const snapshot = await getDocs(q);
            featuredProjects = snapshot.docs.map(doc => ({
                id: doc.id,
                image_url: doc.data().url,
                name: doc.data().name || ''
            }));

            if (featuredProjects.length === 0) {
                sliderTrack.innerHTML = '<p style="text-align: center; width: 100%;">لا توجد مشاريع مميزة لعرضها حالياً.</p>';
                return;
            }

            // Show only first 3 projects
            featuredProjects = featuredProjects.slice(0, 3);

            renderSlider();
            
            // Start pulse animation after render
            setTimeout(() => {
                startPulseAnimation();
            }, 500);

        } catch (error) {
            console.error('Error loading featured slider:', error);
            sliderTrack.innerHTML = '<p>حدث خطأ أثناء تحميل المشاريع.</p>';
        }
    }

    function renderSlider() {
        sliderTrack.innerHTML = '';
        
        featuredProjects.forEach((project, index) => {
            const sliderItem = document.createElement('div');
            sliderItem.className = 'slider-item';
            
            const img = document.createElement('img');
            img.src = project.image_url;
            img.alt = project.name || 'Project Image';
            img.loading = 'lazy';
            
            img.onerror = function() {
                console.error('Failed to load featured image:', project.image_url);
                this.style.display = 'none';
            };
            
            sliderItem.appendChild(img);
            sliderTrack.appendChild(sliderItem);
        });
    }

    function startPulseAnimation() {
        const items = document.querySelectorAll('.slider-item');
        if (items.length === 0) return;

        let currentIndex = 0;

        function pulseNext() {
            // Remove pulse from all items
            items.forEach(item => item.classList.remove('pulse'));
            
            // Add pulse to current item
            if (items[currentIndex]) {
                items[currentIndex].classList.add('pulse');
            }

            // Move to next item
            currentIndex = (currentIndex + 1) % items.length;

            // Schedule next pulse
            setTimeout(pulseNext, 2500); // Pulse every 2.5 seconds
        }

        // Start the sequence
        pulseNext();
    }

    loadFeaturedSlider();
    
    // Wave Ripple Effect - تأثير التموج المتتابع
    function startWaveRipple() {
        const portfolioItems = document.querySelectorAll('#portfolio .portfolio-item');
        if (portfolioItems.length === 0) return;
        
        let currentIndex = 0;
        
        setInterval(() => {
            // تطبيق التأثير على البطاقة الحالية
            const card = portfolioItems[currentIndex];
            card.classList.add('wave-ripple');
            
            // إزالة التأثير بعد انتهاء الأنيميشن
            setTimeout(() => {
                card.classList.remove('wave-ripple');
            }, 1200);
            
            // الانتقال للبطاقة التالية
            currentIndex = (currentIndex + 1) % portfolioItems.length;
        }, 1500); // كل 1.5 ثانية
    }
    
    // بدء تأثير التموج بعد تحميل الصور
    setTimeout(() => {
        startWaveRipple();
    }, 2000);
    
    // Add hover and click effects to portfolio items
    function addInteractiveEffects() {
        const portfolioItems = document.querySelectorAll('#portfolio .portfolio-item');
        
        portfolioItems.forEach(item => {
            // تأثير عند النقر
            item.addEventListener('click', function() {
                // إضافة تأثير عشوائي عند النقر
                const effects = ['glow-pulse', 'rotate-scale', 'float-bounce'];
                const randomEffect = effects[Math.floor(Math.random() * effects.length)];
                
                this.classList.add(randomEffect);
                
                setTimeout(() => {
                    this.classList.remove(randomEffect);
                }, 1000);
            });
        });
    }
    
    // تفعيل التأثيرات التفاعلية بعد تحميل الصور
    setTimeout(() => {
        addInteractiveEffects();
    }, 2000);
    
    // Auto-shuffle images - DISABLED FOR PERFORMANCE
    // Uncomment below to enable shuffling (may impact performance)
    /*
    let allProjects = [];
    
    async function loadAllProjects() {
        try {
            if (resourceCache.projects && resourceCache.projects.length > 0) {
                allProjects = resourceCache.projects;
                startImageShuffling();
                return;
            }
            
            const { data: projects, error } = await supabase
                .from('projects')
                .select('image_url')
                .or('show_on_homepage.eq.true,show_on_homepage.is.null')
                .order('id', { ascending: false });

            if (!error && projects) {
                allProjects = projects;
                resourceCache.projects = projects;
                startImageShuffling();
            }
        } catch (error) {
            console.error('Error loading all projects:', error);
        }
    }

    function shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    function startImageShuffling() {
        const portfolioGridElement = document.querySelector('#portfolio .portfolio-grid');
        if (!portfolioGridElement || allProjects.length <= 3) return;

        setInterval(() => {
            const portfolioItems = portfolioGridElement.querySelectorAll('.portfolio-item');
            if (portfolioItems.length === 0) return;

            const shuffledProjects = shuffleArray(allProjects);
            const selectedImages = shuffledProjects.slice(0, 3);

            portfolioItems.forEach((item, index) => {
                item.classList.add('shuffling');
                
                setTimeout(() => {
                    const img = item.querySelector('img');
                    if (img && selectedImages[index]) {
                        img.src = selectedImages[index].image_url;
                    }
                }, 300);

                setTimeout(() => {
                    item.classList.remove('shuffling');
                }, 600);
            });

        }, 5000);
    }

    setTimeout(() => {
        loadAllProjects();
    }, 3000);
    */
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Handle smooth scrolling for all anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Specifically handle the hero CTA button
    const heroCTA = document.querySelector('.hero .btn-primary');
    if (heroCTA) {
        heroCTA.addEventListener('click', function(e) {
            e.preventDefault();
            
            const portfolioSection = document.querySelector('#portfolio');
            if (portfolioSection) {
                const headerHeight = document.querySelector('.main-header').offsetHeight;
                const targetPosition = portfolioSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
});
