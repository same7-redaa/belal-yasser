// Scroll Animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

const elementsToAnimate = document.querySelectorAll('.fade-up');
elementsToAnimate.forEach(el => observer.observe(el));