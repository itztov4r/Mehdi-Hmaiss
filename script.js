/* Mehdi Hmaiss — Portfolio premium (GitHub Pages compatible, no dependencies) */
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const body = document.body;
    const intro = document.getElementById('intro-screen');
    const skipIntro = document.getElementById('intro-skip');
    const replayIntro = document.getElementById('replay-intro');
    const themeToggle = document.getElementById('theme-toggle');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');
    const yearElement = document.getElementById('year');
    const progressBar = document.getElementById('scroll-progress');
    const roleElement = document.getElementById('rotating-role');
    const sectionAnchors = document.querySelectorAll('main section[id]');
    const navAnchorLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    const revealElements = document.querySelectorAll('.reveal');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card[data-category]');
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let introTimer = null;

    if (yearElement) yearElement.textContent = String(new Date().getFullYear());

    // Intro animation: can be skipped and replayed (without reloading the page).
    function endIntro() {
        if (introTimer) window.clearTimeout(introTimer);
        const introHadFocus = intro?.contains(document.activeElement);
        if (intro) {
            intro.inert = true;
            intro.classList.add('hidden');
            intro.setAttribute('aria-hidden', 'true');
        }
        body.classList.remove('loading');
        if (introHadFocus) (replayIntro || document.querySelector('main a'))?.focus();
        try { sessionStorage.setItem('mh-intro-seen','1'); } catch (_) { /* no storage */ }
    }

    function playIntro() {
        if (!intro) return;
        if (introTimer) window.clearTimeout(introTimer);
        intro.inert = false;
        intro.classList.remove('hidden');
        skipIntro?.focus();
        intro.removeAttribute('aria-hidden');
        body.classList.add('loading');
        const bar = intro.querySelector('.intro-progress span');
        if (bar) {
            bar.style.animation = 'none';
            // Force reflow to restart the timeline when the animation is replayed.
            void bar.offsetWidth;
            bar.style.animation = '';
        }
        introTimer = window.setTimeout(endIntro, reducedMotion ? 100 : 1900);
    }

    skipIntro?.addEventListener('click', endIntro);
    replayIntro?.addEventListener('click', playIntro);
    let introViewed=false;
    try { introViewed=sessionStorage.getItem('mh-intro-seen')==='1'; } catch (_) { /* no storage */ }
    if (window.location.hash || reducedMotion || introViewed) endIntro();
    else playIntro();

    // Theme preference, with a safe fallback when storage is disabled.
    try {
        if (localStorage.getItem('portfolio-theme') === 'dark') body.classList.add('dark');
    } catch (_) { /* Storage can be disabled by the browser. */ }

    function updateThemeButton() {
        if (!themeToggle) return;
        const dark = body.classList.contains('dark');
        themeToggle.textContent = dark ? '☀' : '☾';
        themeToggle.setAttribute('aria-label', dark ? 'Activer le thème clair' : 'Activer le thème sombre');
        themeToggle.setAttribute('aria-pressed', String(dark));
    }
    updateThemeButton();
    themeToggle?.addEventListener('click', () => {
        body.classList.toggle('dark');
        try { localStorage.setItem('portfolio-theme', body.classList.contains('dark') ? 'dark' : 'light'); } catch (_) { /* ignore */ }
        updateThemeButton();
    });

    // Responsive menu.
    function closeMenu() {
        if (!navLinks || !menuToggle) return;
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
    }
    menuToggle?.addEventListener('click', () => {
        if (!navLinks) return;
        const isOpen = navLinks.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
        menuToggle.textContent = isOpen ? '✕' : '☰';
    });
    navLinks?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') {
            closeMenu();
            if (!intro?.classList.contains('hidden')) endIntro();
        }
    });

    // Animate items as they enter the viewport.
    if ('IntersectionObserver' in window && !reducedMotion) {
        const revealObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, { threshold: .08, rootMargin: '0px 0px 40px 0px' });
        revealElements.forEach(item => revealObserver.observe(item));
    } else {
        revealElements.forEach(item => item.classList.add('visible'));
    }

    function updateScrollUI() {
        const scrollTop = Math.max(0, window.scrollY || document.documentElement.scrollTop);
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (progressBar) progressBar.style.width = `${scrollHeight > 0 ? scrollTop / scrollHeight * 100 : 0}%`;

        let currentId = 'accueil';
        sectionAnchors.forEach(section => {
            if (scrollTop >= section.offsetTop - 150) currentId = section.id;
        });
        navAnchorLinks.forEach(link => {
            const active = link.getAttribute('href') === `#${currentId}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'location');
            else link.removeAttribute('aria-current');
        });
    }
    window.addEventListener('scroll', updateScrollUI, { passive: true });
    window.addEventListener('resize', updateScrollUI, { passive: true });
    updateScrollUI();

    // Highlight the four current areas of interest in the hero.
    if (roleElement && !reducedMotion) {
        const words = (roleElement.dataset.words || '').split(',').map(item => item.trim()).filter(Boolean);
        let roleIndex = 0;
        if (words.length > 1) {
            window.setInterval(() => {
                if (document.hidden) return;
                roleElement.style.opacity = '0';
                roleElement.style.transform = 'translateY(6px)';
                window.setTimeout(() => {
                    roleIndex = (roleIndex + 1) % words.length;
                    roleElement.textContent = words[roleIndex];
                    roleElement.style.opacity = '1';
                    roleElement.style.transform = 'translateY(0)';
                }, 230);
            }, 2900);
        }
    }

    // Real GitHub projects: filter with visible, accessible controls.
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.filter;
            filterButtons.forEach(item => {
                const active = item === button;
                item.classList.toggle('is-active', active);
                item.setAttribute('aria-pressed', String(active));
            });
            projectCards.forEach(card => {
                const shown = category === 'all' || card.dataset.category === category;
                card.hidden = !shown;
                if (shown) card.classList.add('visible');
            });
        });
    });

    // One-click copy is optional; user can always select the displayed address.
    const copyEmail = document.getElementById('copy-email');
    const copyStatus = document.getElementById('copy-email-status');
    copyEmail?.addEventListener('click', async () => {
        const email='mhmaiss.pro@gmail.com';
        try {
            await navigator.clipboard.writeText(email);
            if (copyStatus) copyStatus.textContent='Adresse copiée !';
        } catch (_) {
            if (copyStatus) copyStatus.textContent='Copie indisponible : '+email;
        }
    });

    // Static website contact form: opens user's email client with pre-filled content.
    // A backend/email service is required to send messages directly from a web page.
    if (contactForm) {
        contactForm.querySelectorAll('input, textarea, select').forEach(field => {
            field.addEventListener('input', () => {field.classList.remove('invalid');field.setCustomValidity('');});
            field.addEventListener('change', () => field.classList.remove('invalid'));
        });
        contactForm.addEventListener('submit', event => {
            event.preventDefault();
            if (formStatus) formStatus.textContent = '';
            const fields = [...contactForm.querySelectorAll('input, textarea, select')];
            let firstInvalid = null;
            fields.forEach(field => {
                field.setCustomValidity(field.required && !field.value.trim() ? 'Ce champ est obligatoire.' : '');
                if (!field.checkValidity()) {
                    field.classList.add('invalid');
                    if (!firstInvalid) firstInvalid = field;
                }
            });
            if (firstInvalid) {
                if (formStatus) formStatus.textContent = 'Veuillez vérifier les champs du formulaire.';
                firstInvalid.focus();
                firstInvalid.reportValidity();
                return;
            }

            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value.trim();
            const mailSubject = `[Portfolio Mehdi Hmaiss] ${subject}`;
            const mailBody = `Bonjour Mehdi,\n\n${message}\n\n---\nNom : ${name}\nEmail : ${email}`;
            const mailUrl = `mailto:mhmaiss.pro@gmail.com?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(mailBody)}`;

            if (formStatus) formStatus.textContent = 'Votre messagerie devrait s’ouvrir avec le message préparé. Pensez à cliquer sur « Envoyer » dans votre messagerie.';
            window.location.href = mailUrl;
        });
    }
});

/* VISUAL EDITION V3 · Remote stock photographs get offline-local SVG fallback. */
document.querySelectorAll('img.remote-photo').forEach((image) => {
    const useFallback = () => {
        const fallback = image.dataset.fallback;
        if (fallback && !image.dataset.fallbackApplied) {
            image.dataset.fallbackApplied = 'true';
            image.src = fallback;
        }
    };
    image.addEventListener('error', useFallback);
    if (image.complete && image.naturalWidth === 0) useFallback();
});


// Local branded art replaces online photography automatically if offline.
document.querySelectorAll('img.remote-photo').forEach(image => {
    image.addEventListener('load', () => {
        if (image.dataset.fallbackApplied && image.dataset.localAlt) {
            image.setAttribute('alt', image.dataset.localAlt);
            const label = image.parentElement?.querySelector('.project-preview-label');
            if (label) label.textContent = 'Visuel illustratif · création graphique';
            const credit = image.parentElement?.querySelector('.visual-photo-credit');
            if (credit) credit.textContent = 'Illustration graphique originale';
        }
    });
});

