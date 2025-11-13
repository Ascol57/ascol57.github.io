// Génération de particules
for (let i = 0; i < 50; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 15 + 's';
    particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
    document.body.appendChild(particle);
}

// Animation au scroll pour les cartes
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 150);
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    observer.observe(card);
});

// Parallax effect sur le scroll
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.glow-orb');
    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.3;
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Effet de suivi de la souris sur les cartes
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        // apply only 3D rotation — avoid vertical lift/scale
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ----------------------
   Multilingual (FR/EN)
   ---------------------- */
let translations = {};

async function loadTranslations() {
    try {
        const [frRes, enRes] = await Promise.all([
            fetch('locales/fr.json'),
            fetch('locales/en.json')
        ]);

        if (!frRes.ok || !enRes.ok) throw new Error('Failed to fetch translation files');

        translations.fr = await frRes.json();
        translations.en = await enRes.json();
    } catch (err) {
        console.error('Failed to load translation files:', err);
    }
}

function applyTranslations(lang) {
    const elems = document.querySelectorAll('[data-i18n]');
    elems.forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.innerHTML = translations[lang][key];
        }
    });
    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl && translations[lang] && translations[lang].title) titleEl.textContent = translations[lang].title;
    document.documentElement.lang = (lang === 'en') ? 'en' : 'fr';
}

async function initLanguageSwitcher() {
    await loadTranslations();

    const saved = localStorage.getItem('site-lang');
    const browserPref = navigator.language && navigator.language.startsWith('en') ? 'en' : 'fr';
    let lang = saved || browserPref;

    if (!translations[lang]) {
        // fallback if load failed
        lang = translations.en ? 'en' : 'fr';
    }

    applyTranslations(lang);

    const switchEl = document.querySelector('.lang-switch');
    if (switchEl) switchEl.setAttribute('data-lang', lang);

    const buttons = document.querySelectorAll('.lang-btn');
    buttons.forEach(btn => {
        const bLang = btn.getAttribute('data-lang');
        btn.addEventListener('click', () => {
            if (bLang === lang) return;
            lang = bLang;
            localStorage.setItem('site-lang', lang);
            applyTranslations(lang);
            if (switchEl) switchEl.setAttribute('data-lang', lang);
            buttons.forEach(b => b.setAttribute('aria-pressed', b.getAttribute('data-lang') === lang ? 'true' : 'false'));
        });
        btn.setAttribute('aria-pressed', btn.getAttribute('data-lang') === lang ? 'true' : 'false');
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { initLanguageSwitcher().catch(e => console.error(e)); });
} else {
    initLanguageSwitcher().catch(e => console.error(e));
}

// Modal behaviour: open on card click and populate with details
function initModalFeature() {
    const modal = document.getElementById('modal');
    if (!modal) return;

    const modalTitle = modal.querySelector('#modal-title');
    const modalSubtitle = modal.querySelector('.modal-subtitle');
    const modalBody = modal.querySelector('.modal-body');
    const modalIcon = modal.querySelector('.modal-icon');
    const modalCloseBtn = modal.querySelector('.modal-close');

    function openModal({ title = '', subtitle = '', description = '', icon = '' } = {}) {
        if (modalTitle) modalTitle.textContent = title;
        if (modalSubtitle) modalSubtitle.textContent = subtitle;
        if (modalBody) modalBody.innerHTML = description;
        if (modalIcon) modalIcon.textContent = icon;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // Open modal when clicking a project card
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('button')) return;

            const titleEl = card.querySelector('.project-title');
            const subtitleEl = card.querySelector('.project-subtitle');
            const descEl = card.querySelector('.project-detail');
            const iconEl = card.querySelector('.project-icon');

            openModal({
                title: titleEl ? titleEl.textContent.trim() : '',
                subtitle: subtitleEl ? subtitleEl.textContent.trim() : '',
                description: descEl ? descEl.innerHTML.trim() : '',
                icon: iconEl ? iconEl.textContent.trim() : ''
            });
        });
    });

    // Close handlers
    modal.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initModalFeature);
} else {
    initModalFeature();
}

// Footer: set dynamic year
function initFooter() {
    const el = document.getElementById('footer-year');
    if (el) el.textContent = new Date().getFullYear();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFooter);
} else {
    initFooter();
}
