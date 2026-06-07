// Smooth page load effect
window.addEventListener("load", function () {
    document.body.classList.add('loaded');
    initScrollAnimations();
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    // Products-style header: hamburger toggles nav-panel
    const hamburger = document.querySelector('.topbar .hamburger') || document.querySelector('.hamburger');
    const navPanel = document.querySelector('.nav-panel');
    if (hamburger && navPanel) {
        hamburger.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', (!expanded).toString());
            navPanel.classList.toggle('open');
        });

        // Close menu when clicking outside the header nav area
        document.addEventListener('click', function(event) {
            if (!navPanel.classList.contains('open')) return;
            const clickedInsideMenu = navPanel.contains(event.target) || hamburger.contains(event.target);
            if (!clickedInsideMenu) {
                navPanel.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });

        // Close menu when clicking links
        navPanel.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navPanel.classList.remove('open');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const mobileOverlay = document.querySelector('.mobile-overlay');
    
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            this.classList.toggle('active');
        });
        
        // Close menu when clicking on overlay
        if (mobileOverlay) {
            mobileOverlay.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInside = mainNav.contains(event.target) || mobileMenuToggle.contains(event.target);
            if (!isClickInside && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
            }
        });
        
        // Close menu when clicking on a nav link
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
            });
        });
    }
    
    // Smooth scrolling for internal page links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = this.getAttribute('href');

            // Smooth scroll to the target section if the link points to an anchor (#)
            if (target.startsWith('#')) {
                const targetElement = document.querySelector(target);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});

// Scroll Animations - Motion Effects
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'float-in 0.8s ease-out forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all product cards, categories, sections, and vision items
    const elementsToAnimate = document.querySelectorAll(
        '.category, .product, .featured-products, .hero-section, #products, .product-categories, .footer-section, .vision-section, .vision-item, .trend-item'
    );
    
    elementsToAnimate.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
}

// Smooth scrolling with parallax effect for background
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-section');
    
    if (hero) {
        hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
    }
    
    // Add glow effect to header on scroll
    const header = document.querySelector('header');
    if (header) {
        if (scrolled > 50) {
            header.style.boxShadow = '0 4px 20px rgba(255, 255, 255, 0.2)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(255, 255, 255, 0.1)';
        }
    }
    
    // Animate vision items on scroll
    const visionItems = document.querySelectorAll('.vision-item');
    visionItems.forEach(item => {
        const elementTop = item.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }
    });
});
function toggleRadio() {
    const popup = document.getElementById('radioPopup');
    if (popup) {
        popup.style.display = (popup.style.display === 'block') ? 'none' : 'block';
    }
}

// Search overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchBtn = document.querySelector('.topbar .search-btn') || document.querySelector('.search-btn');
    const overlay = document.getElementById('searchOverlay');
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    const closeBtn = document.querySelector('.search-close');

    const CATALOG = [
        { name: 'Hoodie Denali', url: 'product-detail1.html', img: 'img/denali-prod-1.png' },
        { name: 'Camisa Oversized', url: 'product-detail3.html', img: 'img/denali-prod-2.png' },
        { name: 'Hoodie Edición Luna', url: 'product-detail2.html', img: 'img/denali-prod-3.png' },
        { name: 'Sudadera Básica', url: 'product-detail1.html', img: 'img/denali-prod-2.png' },
        { name: 'Pantalón Track', url: 'product-detail3.html', img: 'img/denali-prod-1.png' },
        { name: 'Chaqueta Envolvente', url: 'product-detail2.html', img: 'img/denali-prod-3.png' },
        { name: 'Camiseta Premium', url: 'product-detail1.html', img: 'img/denali-prod-1.png' }
    ];

    function render(list) {
        if (!results) return;
        results.innerHTML = list.length ? list.map(p => (
            `<a class="result" href="${p.url}">`
            + `<img src="${p.img}" alt="${p.name}">`
            + `<div class="meta"><div class="title">${p.name}</div><div class="hint">Ver producto</div></div>`
            + `</a>`
        )).join('') : '<div class="no-results">Sin resultados</div>';
    }

    function openSearch() {
        if (!overlay) return;
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        if (input) {
            input.value = '';
            render(CATALOG.slice(0, 6));
            setTimeout(() => input.focus(), 50);
        }
    }

    function closeSearch() {
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
    }

    if (searchBtn && overlay) {
        searchBtn.addEventListener('click', openSearch);
    }
    closeBtn && closeBtn.addEventListener('click', closeSearch);
    overlay && overlay.addEventListener('click', (e) => { if (e.target === overlay) closeSearch(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeSearch(); });

    input && input.addEventListener('input', (e) => {
        const normalize = (value) => value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '');

        const q = normalize(e.target.value.trim());
        const list = q
            ? CATALOG.filter(p => normalize(p.name).includes(q))
            : CATALOG.slice(0, 6);
        render(list);
    });
});
