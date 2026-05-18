/**
 * Motion layer — GSAP + ScrollTrigger + Lenis
 * Respects prefers-reduced-motion per UI UX Pro Max guidelines
 */
(function () {
    'use strict';

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ─── Preloader ─── */
    function initPreloader(onComplete) {
        const preloader = document.getElementById('preloader');
        const countEl = document.getElementById('preloader-count');
        const fillEl = document.getElementById('preloader-fill');
        if (!preloader) {
            onComplete();
            return;
        }

        let progress = 0;
        const duration = reducedMotion ? 400 : 2200;
        const start = performance.now();

        function tick(now) {
            const elapsed = now - start;
            progress = Math.min(100, Math.round((elapsed / duration) * 100));
            if (countEl) countEl.textContent = progress;
            if (fillEl) fillEl.style.width = progress + '%';

            if (progress < 100) {
                requestAnimationFrame(tick);
            } else {
                preloader.classList.add('hidden');
                setTimeout(onComplete, reducedMotion ? 50 : 600);
            }
        }
        requestAnimationFrame(tick);
    }

    /* ─── Lenis smooth scroll ─── */
    let lenis;
    function initLenis() {
        if (reducedMotion || typeof Lenis === 'undefined') return;

        lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            touchMultiplier: 2
        });

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
    }

    /* ─── Custom cursor ─── */
    function initCursor() {
        const dot = document.getElementById('cursor-dot');
        const ring = document.getElementById('cursor-ring');
        if (!dot || !ring || reducedMotion) return;

        let mx = 0, my = 0, rx = 0, ry = 0;

        document.addEventListener('mousemove', (e) => {
            mx = e.clientX;
            my = e.clientY;
            dot.style.left = mx + 'px';
            dot.style.top = my + 'px';
        });

        function animateRing() {
            rx += (mx - rx) * 0.15;
            ry += (my - ry) * 0.15;
            ring.style.left = rx + 'px';
            ring.style.top = ry + 'px';
            requestAnimationFrame(animateRing);
        }
        animateRing();

        const hoverables = 'a, button, .project-card, .bento-card, .stat-card, .magnetic, .exp-item';
        document.querySelectorAll(hoverables).forEach((el) => {
            el.addEventListener('mouseenter', () => ring.classList.add('hover'));
            el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
        });
    }

    /* ─── Magnetic buttons ─── */
    function initMagnetic() {
        if (reducedMotion) return;
        document.querySelectorAll('.magnetic').forEach((el) => {
            el.addEventListener('mousemove', (e) => {
                const rect = el.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' });
            });
        });
    }

    /* ─── Bento card spotlight ─── */
    function initBentoSpotlight() {
        document.querySelectorAll('.bento-card').forEach((card) => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                card.style.setProperty('--mx', ((e.clientX - rect.left) / rect.width * 100) + '%');
                card.style.setProperty('--my', ((e.clientY - rect.top) / rect.height * 100) + '%');
            });
        });
    }

    /* ─── GSAP animations ─── */
    function initGSAP() {
        if (typeof gsap === 'undefined') return;
        gsap.registerPlugin(ScrollTrigger);

        if (reducedMotion) {
            gsap.set('.reveal-up, .split-line > span', { clearProps: 'all', opacity: 1, y: 0 });
            return;
        }

        /* Hero entrance */
        const heroTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
        heroTl
            .to('.split-line > span', { y: 0, duration: 1.1, stagger: 0.12 })
            .to('.hero-badge', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
            .to('.hero-role', { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
            .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
            .to('.hero-actions', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
            .to('.hero-visual', { opacity: 1, y: 0, scale: 1, duration: 1.2 }, '-=0.8');

        gsap.set('.hero-visual', { opacity: 0, y: 40, scale: 0.92 });

        /* Hero parallax on scroll */
        gsap.to('.profile-frame', {
            y: 80,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2
            }
        });

        gsap.to('.hero-copy', {
            y: 60,
            opacity: 0.3,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        /* Section reveals */
        gsap.utils.toArray('.reveal-up').forEach((el) => {
            if (el.closest('.hero')) return;
            gsap.fromTo(el,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.9,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 88%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });

        /* Experience timeline dots */
        gsap.from('.exp-dot', {
            scale: 0,
            stagger: 0.15,
            duration: 0.5,
            ease: 'back.out(2)',
            scrollTrigger: { trigger: '.exp-track', start: 'top 75%' }
        });

        /* Project cards stagger */
        gsap.from('.project-card', {
            opacity: 0,
            y: 60,
            scale: 0.95,
            stagger: 0.08,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '.projects-bento',
                start: 'top 80%'
            }
        });

        /* Section title parallax */
        gsap.utils.toArray('.section-title').forEach((title) => {
            gsap.from(title, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 85%'
                }
            });
        });

        /* Pin resume panel briefly */
        const resumePanel = document.querySelector('.resume-panel');
        if (resumePanel && window.innerWidth > 1024) {
            ScrollTrigger.create({
                trigger: resumePanel,
                start: 'top 60%',
                end: '+=200',
                pin: false
            });
        }
    }

    /* ─── Nav scroll state ─── */
    function initNav() {
        const header = document.getElementById('site-header');
        const links = document.querySelectorAll('.nav-links a');
        const sections = [...links].map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);

        function onScroll() {
            if (header) header.classList.toggle('scrolled', window.scrollY > 60);

            const scrollPos = window.scrollY + 120;
            sections.forEach((sec, i) => {
                if (!sec) return;
                const top = sec.offsetTop;
                const bottom = top + sec.offsetHeight;
                if (scrollPos >= top && scrollPos < bottom) {
                    links.forEach((l) => l.classList.remove('active'));
                    links[i]?.classList.add('active');
                }
            });
        }

        window.addEventListener('scroll', onScroll, { passive: true });
        onScroll();

        /* Smooth anchor with Lenis */
        document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
            anchor.addEventListener('click', (e) => {
                const id = anchor.getAttribute('href');
                if (!id || id === '#') return;
                const target = document.querySelector(id);
                if (!target) return;
                e.preventDefault();
                if (lenis) lenis.scrollTo(target, { offset: -80 });
                else target.scrollIntoView({ behavior: 'smooth' });

                document.getElementById('main-nav')?.classList.remove('nav-open');
            });
        });

        document.getElementById('nav-toggle')?.addEventListener('click', () => {
            const nav = document.getElementById('main-nav');
            nav?.classList.toggle('nav-open');
        });
    }

    /* ─── Boot ─── */
    initPreloader(() => {
        initLenis();
        initCursor();
        initMagnetic();
        initBentoSpotlight();
        initGSAP();
        initNav();
        window.dispatchEvent(new Event('portfolio-ready'));
    });
})();
