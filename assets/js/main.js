/* ============================================================
   AADIL — Personal Website
   main.js — All interactivity. No external dependencies.

   TO CONFIGURE: Update the CONFIG object below with your details.
   ============================================================ */

const CONFIG = {
  email:     'your@email.com',       // UPDATE: your email address
  linkedin:  'https://linkedin.com/in/yourhandle',  // UPDATE
  github:    'https://github.com/yourhandle',        // UPDATE
  twitter:   '',                      // UPDATE or leave blank to hide
  substack:  '',                      // UPDATE when live
};

/* ─── DOM Ready ──────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNav();
  initScrollAnimations();
  initActiveNav();
  renderWriting();
  renderProjects();
  initContactForm();
  injectSocialLinks();
  injectContactEmail();
  initHeroNameTypewriter();
});

/* ─── Theme (Dark Mode) ──────────────────────────────────── */
function initTheme() {
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = stored || (prefersDark ? 'dark' : 'light');
  setTheme(theme);

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
}

/* ─── Navigation ─────────────────────────────────────────── */
function initNav() {
  const nav = document.getElementById('main-nav');
  const hamburger = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-mobile-drawer');

  // Scroll: add .scrolled class
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Hamburger
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    drawer.classList.toggle('open', isOpen);
  });

  // Close drawer on link click
  drawer.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
    });
  });

  // Close drawer on outside click
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !drawer.contains(e.target)) {
      hamburger.classList.remove('open');
      drawer.classList.remove('open');
    }
  });
}

/* ─── Active Nav Link ────────────────────────────────────── */
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => observer.observe(s));
}

/* ─── Scroll Animations ──────────────────────────────────── */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}

/* ─── Render Writing Cards ───────────────────────────────── */
async function renderWriting() {
  const container = document.getElementById('writing-grid');
  if (!container) return;

  try {
    const res = await fetch('data/writing.json');
    const posts = await res.json();

    container.innerHTML = posts.map((post, i) => {
      const date = formatDate(post.date);
      const href = post.url || '#';
      const target = post.url ? 'target="_blank" rel="noopener"' : '';
      return `
        <a class="writing-card" href="${href}" ${target}
           data-animate data-animate-delay="${Math.min(i + 1, 4)}">
          <div class="writing-meta">
            <span>${date}</span>
            <span class="writing-dot"></span>
            <span>${post.readingTime}</span>
          </div>
          <h3>${post.title}</h3>
          <p>${post.summary}</p>
          <div class="writing-read-more">
            Read on Substack
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </div>
        </a>`;
    }).join('');

    // Re-observe newly added cards
    document.querySelectorAll('[data-animate]:not(.is-visible)').forEach(el => {
      if (container.contains(el)) initSingleObserve(el);
    });

  } catch (e) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">Writing coming soon.</p>`;
  }
}

/* ─── Render Project Cards ───────────────────────────────── */
async function renderProjects() {
  const container = document.getElementById('projects-grid');
  if (!container) return;

  try {
    const res = await fetch('data/projects.json');
    const projects = await res.json();

    container.innerHTML = projects.map((p, i) => {
      const statusLabel = { 'live': 'Live', 'in-progress': 'In Progress', 'concept': 'Concept' }[p.status] || p.status;
      const statusClass = { 'live': 'status-live', 'in-progress': 'status-in-progress', 'concept': 'status-concept' }[p.status] || 'status-concept';

      const urlLink = p.url ? `
        <a href="${p.url}" target="_blank" rel="noopener" class="project-link-icon" title="View project">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>` : '';

      const ghLink = p.github ? `
        <a href="${p.github}" target="_blank" rel="noopener" class="project-link-icon" title="View on GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/></svg>
        </a>` : '';

      const tags = (p.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('');

      return `
        <div class="project-card" data-animate data-animate-delay="${Math.min(i + 1, 4)}">
          <div class="project-card-top">
            <span class="project-status ${statusClass}">${statusLabel}</span>
            <div class="project-links">${urlLink}${ghLink}</div>
          </div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-tags">${tags}</div>
        </div>`;
    }).join('');

    document.querySelectorAll('[data-animate]:not(.is-visible)').forEach(el => {
      if (container.contains(el)) initSingleObserve(el);
    });

  } catch (e) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size:0.9rem;">Projects loading...</p>`;
  }
}

/* ─── Contact Form ───────────────────────────────────────── */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('form-submit-btn');
  if (!form || !btn) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name    = form.querySelector('[name="name"]').value.trim();
    const email   = form.querySelector('[name="email"]').value.trim();
    const message = form.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) return;

    const subject = encodeURIComponent(`Message from ${name} — aadil.dev`);
    const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;

    btn.textContent = '✓ Opening your email client...';
    btn.classList.add('success');
    setTimeout(() => {
      btn.textContent = 'Send Message';
      btn.classList.remove('success');
    }, 3000);
  });
}

/* ─── Inject Social Links ────────────────────────────────── */
function injectSocialLinks() {
  document.querySelectorAll('[data-social]').forEach(el => {
    const key = el.getAttribute('data-social');
    const url = CONFIG[key];
    if (url) {
      el.setAttribute('href', url);
      el.style.display = '';
    } else {
      el.style.display = 'none';
    }
  });
}

function injectContactEmail() {
  document.querySelectorAll('[data-email]').forEach(el => {
    el.setAttribute('href', `mailto:${CONFIG.email}`);
    if (el.classList.contains('email-text')) el.textContent = CONFIG.email;
  });
}

/* ─── Hero Name Typewriter ───────────────────────────────── */
function initHeroNameTypewriter() {
  const elText   = document.getElementById('hero-name-text');
  const elCursor = document.getElementById('hero-name-cursor');
  if (!elText || !elCursor) return;

  const name = 'Aadil Illyas.';
  let i = 0;

  // Wait for the hero animate-in delay before starting
  setTimeout(() => {
    const interval = setInterval(() => {
      elText.textContent = name.slice(0, i + 1);
      i++;
      if (i >= name.length) {
        clearInterval(interval);
        // Blink cursor a few more times then hide it
        setTimeout(() => {
          elCursor.classList.add('hidden');
        }, 2000);
      }
    }, 80);
  }, 500);
}

/* ─── Helpers ────────────────────────────────────────────── */
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

function initSingleObserve(el) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  observer.observe(el);
}
