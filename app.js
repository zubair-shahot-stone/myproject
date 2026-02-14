
// Mobile menu toggle
document.getElementById('mobileToggle').addEventListener('click', function () {
    document.getElementById('navMenu').classList.toggle('active');
    this.innerHTML = document.getElementById('navMenu').classList.contains('active') ?
        '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking a link
document.querySelectorAll('#navMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('navMenu').classList.remove('active');
        document.getElementById('mobileToggle').innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.animate').forEach(item => {
    observer.observe(item);
});


// --------------------------
// Language Switching Logic
// --------------------------

document.addEventListener('DOMContentLoaded', () => {
    const langToggleBtn = document.getElementById('langToggle');
    const savedLang = localStorage.getItem('language') || 'en';

    // Set initial language
    setLanguage(savedLang);

    // Event Listener for button
    langToggleBtn.addEventListener('click', () => {
        const currentLang = document.documentElement.lang;
        const newLang = currentLang === 'en' ? 'ar' : 'en';
        setLanguage(newLang);
    });
});

function setLanguage(lang) {
    // 1. Update HTML lang and dir attributes
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

    // 2. Save preference
    localStorage.setItem('language', lang);

    // 3. Update Button Text (Switch to the *other* language)
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        langToggleBtn.textContent = lang === 'en' ? 'عربي' : 'English';
    }

    // 4. Update all elements with data-i18n
    const elements = document.querySelectorAll('[data-i18n]');

    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');

        // Handle attributes like [placeholder]key
        if (key.startsWith('[')) {
            const matches = key.match(/\[(.*?)\](.*)/);
            if (matches) {
                const attr = matches[1];
                const cleanKey = matches[2];
                const translation = translations[lang][cleanKey];
                if (translation) {
                    if (attr === 'html') {
                        element.innerHTML = translation;
                    } else {
                        element.setAttribute(attr, translation);
                    }
                }
            }
        } else {
            // Standard text content
            const translation = translations[lang][key];
            if (translation) {
                element.textContent = translation;
            }
        }
    });
}
