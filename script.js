/**
 * Portfolio interactions — modals, contact, resume, experience
 */
document.addEventListener('DOMContentLoaded', () => {
    initTyping();
    initExperience();
    initProjectModals();

    function bootExtras() {
        if (window._portfolioInit) return;
        window._portfolioInit = true;
        initContactForm();
        initResumeDownloader();
        initEasterEgg();
    }

    window.addEventListener('portfolio-ready', bootExtras);
    setTimeout(bootExtras, 4000);
});

/* ─── Typing animation ─── */
function initTyping() {
    const el = document.getElementById('dynamic-text');
    if (!el) return;

    const titles = [
        'Software Engineer @ Techwards',
        'Backend · Django · GCP',
        'Full Stack @ Nexus Academy',
        'AI-Native Builder'
    ];
    let ti = 0, ci = 0, deleting = false;

    function tick() {
        const word = titles[ti];
        let delay = 90;

        if (deleting) {
            el.textContent = word.substring(0, ci - 1);
            ci--;
            delay = 45;
            if (ci === 0) {
                deleting = false;
                ti = (ti + 1) % titles.length;
                delay = 500;
            }
        } else {
            el.textContent = word.substring(0, ci + 1);
            ci++;
            if (ci === word.length) {
                deleting = true;
                delay = 1800;
            }
        }
        setTimeout(tick, delay);
    }
    setTimeout(tick, 1200);
}

/* ─── Experience accordion ─── */
function initExperience() {
    document.querySelectorAll('.exp-item').forEach((item) => {
        const toggle = item.querySelector('.exp-toggle');
        const open = () => {
            document.querySelectorAll('.exp-item.active').forEach((o) => {
                if (o !== item) o.classList.remove('active');
            });
            item.classList.toggle('active');
        };
        toggle?.addEventListener('click', (e) => { e.stopPropagation(); open(); });
        item.addEventListener('click', open);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
        });
    });
    document.querySelector('.exp-item')?.classList.add('active');
}

/* ─── Project modals ─── */
function initProjectModals() {
    const container = document.getElementById('project-modal-container');
    const modals = document.querySelectorAll('.project-modal');
    const cards = document.querySelectorAll('.project-card');
    if (!container || !cards.length) return;

    function openModal(modal) {
        modals.forEach((m) => m.classList.remove('active'));
        container.classList.add('active');
        container.setAttribute('aria-hidden', 'false');
        setTimeout(() => modal.classList.add('active'), 10);
        document.body.classList.add('modal-open');
    }

    function closeModal() {
        container.classList.remove('active');
        container.setAttribute('aria-hidden', 'true');
        modals.forEach((m) => m.classList.remove('active'));
        document.body.classList.remove('modal-open');
    }

    cards.forEach((card) => {
        const open = () => {
            const id = card.getAttribute('data-project');
            const modal = document.getElementById(`${id}-modal`);
            if (modal) openModal(modal);
        };
        card.addEventListener('click', (e) => {
            if (e.target.closest('.view-details-btn')) return;
            open();
        });
        card.querySelector('.view-details-btn')?.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            open();
        });
    });

    document.querySelectorAll('.modal-close').forEach((btn) => {
        btn.addEventListener('click', closeModal);
    });
    container.addEventListener('click', (e) => {
        if (e.target === container) closeModal();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });
}

/* ─── EmailJS contact ─── */
function initContactForm() {
    if (typeof emailjs === 'undefined') return;
    emailjs.init({ publicKey: '-96bhH6DhqoesGnJx' });

    const form = document.getElementById('contact-form');
    const successEl = document.getElementById('success-message');
    const submitBtn = form?.querySelector('.submit-btn');
    if (!form) return;

    const config = {
        serviceID: 'service_b43wlpr',
        templateID: 'template_vomrhjs'
    };

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (!validateForm(form)) return;

        submitBtn.disabled = true;
        const textEl = submitBtn.querySelector('.btn-text');
        const orig = textEl?.textContent;
        if (textEl) textEl.textContent = 'Sending…';

        try {
            await emailjs.send(config.serviceID, config.templateID, {
                from_name: form.name.value.trim(),
                from_email: form.email.value.trim(),
                message: form.message.value.trim()
            });
            form.reset();
            successEl?.classList.add('active');
            setTimeout(() => successEl?.classList.remove('active'), 5000);
        } catch (err) {
            alert('Could not send message. Email me at sarim.uk@outlook.com');
            console.error(err);
        } finally {
            submitBtn.disabled = false;
            if (textEl) textEl.textContent = orig || 'Send message';
        }
    });

    form.querySelectorAll('input, textarea').forEach((field) => {
        field.addEventListener('blur', () => validateField(field));
        field.addEventListener('input', () => clearFieldError(field));
    });
}

function validateForm(form) {
    let ok = true;
    form.querySelectorAll('input, textarea').forEach((f) => {
        if (!validateField(f)) ok = false;
    });
    return ok;
}

function validateField(field) {
    const err = document.getElementById(`${field.id}-error`);
    let msg = '';
    if (field.required && !field.value.trim()) msg = 'This field is required';
    else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
        msg = 'Enter a valid email';
    }
    if (err) err.textContent = msg;
    return !msg;
}

function clearFieldError(field) {
    const err = document.getElementById(`${field.id}-error`);
    if (err) err.textContent = '';
}

/* ─── Resume download ─── */
function initResumeDownloader() {
    const btn = document.getElementById('download-btn');
    const progress = document.getElementById('download-progress');
    const success = document.getElementById('download-success');
    const fill = document.getElementById('progress-fill');
    const pct = document.getElementById('progress-pct');
    if (!btn) return;

    const url = './sarim_khan_resume.pdf';

    btn.addEventListener('click', () => {
        btn.disabled = true;
        progress?.classList.add('active');
        success?.classList.remove('active');

        let p = 0;
        const iv = setInterval(() => {
            p += 4;
            if (fill) fill.style.width = p + '%';
            if (pct) pct.textContent = p + '%';
            if (p >= 100) {
                clearInterval(iv);
                progress?.classList.remove('active');
                success?.classList.add('active');
                const a = document.createElement('a');
                a.href = url;
                a.download = 'sarim_khan_resume.pdf';
                a.click();
                setTimeout(() => {
                    btn.disabled = false;
                    success?.classList.remove('active');
                }, 4000);
            }
        }, 80);
    });
}

/* ─── Easter egg ─── */
function initEasterEgg() {
    const egg = document.getElementById('floating-easter-egg');
    const modal = document.getElementById('easter-egg-modal');
    const msg = document.getElementById('easter-egg-message');
    if (!egg || !modal) return;

    const messages = [
        'You found the hidden node. Every great system has observability — including this portfolio.',
        'Fun fact: I once migrated millions of records without downtime. Your curiosity just migrated you here.',
        'grep -r "awesome" . — Match found: you.',
        '404: Boredom not found. Thanks for exploring.',
        'sudo make-me-hire — Permission granted (pending interview).'
    ];
    let idx = 0;

    egg.style.position = 'fixed';
    egg.style.bottom = '2rem';
    egg.style.right = '2rem';
    egg.style.left = 'auto';
    egg.style.top = 'auto';

    const show = () => {
        if (msg) msg.textContent = messages[idx % messages.length];
        idx++;
        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
    };

    const hide = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (!document.getElementById('project-modal-container')?.classList.contains('active')) {
            document.body.classList.remove('modal-open');
        }
    };

    egg.addEventListener('click', show);
    egg.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(); }
    });
    modal.querySelector('.easter-egg-close')?.addEventListener('click', hide);
    modal.querySelector('.modal-overlay')?.addEventListener('click', hide);
    modal.querySelector('.easter-egg-another-btn')?.addEventListener('click', show);
}
