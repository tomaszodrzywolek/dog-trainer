// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            // Open FAQ content when its nav link is clicked
            if (targetId === '#faq') {
                openFaq();
            }

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }

            // Close mobile menu if open
            const mobileNav = document.querySelector('.mobile-nav');
            if (mobileNav && mobileNav.classList.contains('active')) {
                mobileNav.classList.remove('active');
            }
        });
    });

    // ===== FAQ toggle =====
    function openFaq() {
        const toggle = document.querySelector('.faq-toggle');
        const content = document.querySelector('#faq-content');
        if (!toggle || !content) return;
        content.classList.add('is-visible');
        toggle.setAttribute('aria-expanded', 'true');
    }

    function toggleFaq() {
        const toggle = document.querySelector('.faq-toggle');
        const content = document.querySelector('#faq-content');
        if (!toggle || !content) return;
        const isOpen = content.classList.contains('is-visible');
        content.classList.toggle('is-visible', !isOpen);
        toggle.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    }

    const faqToggle = document.querySelector('.faq-toggle');
    if (faqToggle) {
        faqToggle.addEventListener('click', toggleFaq);
        // Keyboard accessibility: Enter or Space triggers toggle
        faqToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleFaq();
            }
        });
    }

    // Open FAQ if the page was loaded with #faq in the URL
    if (window.location.hash === '#faq') {
        openFaq();
    }

    // Mobile menu toggle functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuToggle.contains(e.target) && !mobileNav.contains(e.target)) {
                mobileNav.classList.remove('active');
            }
        });

        // Close mobile menu on window resize to desktop
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                mobileNav.classList.remove('active');
            }
        });
    }

    // Header background change on scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.style.background = 'rgba(242, 113, 39, 0.95)';
            } else {
                header.style.background = 'linear-gradient(135deg, #F27127 0%, #D65A1A 100%)';
            }
        });
    }

    // Form validation and submission
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic form validation
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                } else {
                    field.style.borderColor = '#F27127';
                }
            });
            
            if (isValid) {
                // Show success message
                alert('Dziękuję za wypełnienie formularza! Odezwę się do Ciebie w ciągu 24 godzin.');
                
                // In a real application, you would send the form data to a server
                // For now, we'll just reset the form
                form.reset();
            } else {
                alert('Proszę wypełnić wszystkie wymagane pola.');
            }
        });

        // Real-time validation
        const inputs = form.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value.trim()) {
                    this.style.borderColor = '#e74c3c';
                } else {
                    this.style.borderColor = '#e9ecef';
                }
            });
        });
    }

    // CTA button scroll to contact section
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const contactSection = document.querySelector('.contact');
            if (contactSection) {
                contactSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // ===== Oferta: rozwijane kategorie + podusługi =====
    // Klik w nagłówek głównej kategorii rozwija/zwija jej zawartość.
    // Klik w podusługę rozwija jej szczegóły. W obrębie tej samej kategorii
    // tylko jedna podusługa może być otwarta na raz.
    const categoryHeaders = document.querySelectorAll('.offer-category-header');
    categoryHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const category = this.closest('.offer-category');
            if (!category) return;
            const willOpen = !category.classList.contains('is-open');
            category.classList.toggle('is-open', willOpen);
            this.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
            // Zamknij podusługi przy zwijaniu kategorii — bez nagłych skoków po ponownym otwarciu
            if (!willOpen) {
                category.querySelectorAll('.offer-item.is-open').forEach(item => {
                    item.classList.remove('is-open');
                    const btn = item.querySelector('.offer-item-header');
                    if (btn) btn.setAttribute('aria-expanded', 'false');
                });
            }
        });
    });

    const itemHeaders = document.querySelectorAll('.offer-item-header');
    itemHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const item = this.closest('.offer-item');
            if (!item) return;
            const category = item.closest('.offer-category');
            const willOpen = !item.classList.contains('is-open');

            // Zamknij rodzeństwo (tylko jedna otwarta podusługa na kategorię)
            if (category) {
                category.querySelectorAll('.offer-item.is-open').forEach(sibling => {
                    if (sibling !== item) {
                        sibling.classList.remove('is-open');
                        const sBtn = sibling.querySelector('.offer-item-header');
                        if (sBtn) sBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            }

            item.classList.toggle('is-open', willOpen);
            this.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        });
    });
});