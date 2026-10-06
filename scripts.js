// ============================================================
// EDITORIAL ENGINEERING PORTFOLIO JAVASCRIPT
// Interactive Behaviors, Cursor, Scroll Effects, Case Study Modal & Probe Simulator
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // === 1. Utilities ===
  const throttle = (callback, delay) => {
    let lastCall = 0;
    return (...args) => {
      const now = new Date().getTime();
      if (now - lastCall < delay) return;
      lastCall = now;
      return callback(...args);
    };
  };

  // === 2. Custom Cursor ===
  const cursor = document.querySelector('.cursor');
  if (cursor && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    });

    const hoverSelectors = 'a, button, .case-study, .project-card, .skill-group, .pillar-card, .contact-method, .timeline-content';
    const interactiveElements = document.querySelectorAll(hoverSelectors);

    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
  }

  // === 3. Scroll Progress Indicator & Navbar Scrolled State ===
  const navbar = document.querySelector('.navbar');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');

  const handleScroll = () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;

    // Navbar scrolled class
    if (navbar) {
      navbar.classList.toggle('scrolled', scrollY > 40);
    }

    // Scroll progress bar
    if (scrollIndicator && docHeight > 0) {
      const scrollPercent = (scrollY / docHeight) * 100;
      scrollIndicator.style.width = `${Math.min(100, Math.max(0, scrollPercent))}%`;
    }

    // Active navigation link tracking
    let currentSectionId = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    if (currentSectionId) {
      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
      });
    }
  };

  window.addEventListener('scroll', throttle(handleScroll, 16));
  handleScroll(); // Initial call

  // === 4. Smooth Anchor Scrolling & Mobile Menu Close ===
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksContainer = document.getElementById('nav-links');

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        e.preventDefault();
        // Close mobile drawer if open
        if (navLinksContainer && navLinksContainer.classList.contains('active')) {
          navLinksContainer.classList.remove('active');
          if (mobileMenuBtn) {
            mobileMenuBtn.classList.remove('active');
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
          }
        }

        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // === 5. Mobile Menu Toggle ===
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener('click', () => {
      const isExpanded = navLinksContainer.classList.toggle('active');
      mobileMenuBtn.classList.toggle('active', isExpanded);
      mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenuBtn.contains(e.target) && !navLinksContainer.contains(e.target)) {
        if (navLinksContainer.classList.contains('active')) {
          navLinksContainer.classList.remove('active');
          mobileMenuBtn.classList.remove('active');
          mobileMenuBtn.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  // === 6. Scroll Reveal Animation ===
  const revealElements = document.querySelectorAll('.reveal-item');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 4) * 0.08}s`;
      revealObserver.observe(el);
    });
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  // === 7. Case Study Modal Toggle (WebVal Analyzer) ===
  const webvalModal = document.getElementById('webval-modal');
  const openModalBtn = document.getElementById('open-webval-modal');
  const closeModalBtn = document.getElementById('close-webval-modal');
  const closeModalBottomBtn = document.getElementById('btn-close-modal-bottom');

  const openModal = () => {
    if (webvalModal) {
      webvalModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeModal = () => {
    if (webvalModal) {
      webvalModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (openModalBtn) openModalBtn.addEventListener('click', openModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);
  if (closeModalBottomBtn) closeModalBottomBtn.addEventListener('click', closeModal);

  // Close when clicking backdrop
  if (webvalModal) {
    webvalModal.addEventListener('click', (e) => {
      if (e.target === webvalModal) {
        closeModal();
      }
    });
  }

  // ESC key listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && webvalModal && webvalModal.classList.contains('active')) {
      closeModal();
    }
  });

  // === 8. Interactive Diagnostic Probe Simulator ===
  const simulateProbeBtn = document.getElementById('btn-simulate-probe');
  const terminalBody = document.getElementById('modal-terminal-body');

  if (simulateProbeBtn && terminalBody) {
    let isRunning = false;

    simulateProbeBtn.addEventListener('click', () => {
      if (isRunning) return;
      isRunning = true;
      simulateProbeBtn.textContent = 'Probing...';
      simulateProbeBtn.disabled = true;

      terminalBody.innerHTML = `
        <div class="terminal-line"><span class="term-dim">harrison@audit-box:~$</span> webval analyze https://target-audit.live --comprehensive</div>
      `;

      const steps = [
        { text: '<span class="term-tag">[INIT]</span> Initializing TLS 1.3 socket handshake via Axios...', delay: 300 },
        { text: '<span class="term-tag">[HTTP]</span> Response 200 OK received &mdash; TTFB: 84ms, Transfer: 14.2 KB', delay: 700 },
        { text: '<span class="term-tag">[DOM]</span> Synthesizing JSDOM AST structure (1,420 nodes mapped)', delay: 1100 },
        { text: '<span class="term-dim">SECURITY HEADERS EVALUATION MATRIX:</span>', delay: 1500 },
        { text: '  Strict-Transport-Security (HSTS): <span class="term-ok">&#10003; VALID (max-age=31536000; preload)</span>', delay: 1800 },
        { text: '  X-Frame-Options (Clickjacking): <span class="term-ok">&#10003; DENY</span>', delay: 2100 },
        { text: '  X-Content-Type-Options: <span class="term-ok">&#10003; nosniff</span>', delay: 2400 },
        { text: '  Content-Security-Policy (CSP): <span class="term-warn">&#9888; MISSING (High Risk for XSS injection)</span>', delay: 2700 },
        { text: '  Referrer-Policy: <span class="term-ok">&#10003; strict-origin-when-cross-origin</span>', delay: 3000 },
        { text: '<span class="term-tag">[SCRIPT AUDIT]</span> Evaluated 6 external scripts &mdash; 0 unpinned CDN hashes found', delay: 3300 },
        { text: '<span class="term-tag">[STATUS]</span> <span class="term-ok">AUDIT RUN COMPLETE IN 1.42s</span> &mdash; Overall Grade: <span class="term-ok">A-</span> (1 issue logged)', delay: 3600 }
      ];

      steps.forEach((step, idx) => {
        setTimeout(() => {
          const line = document.createElement('div');
          line.className = 'terminal-line';
          line.innerHTML = step.text;
          terminalBody.appendChild(line);
          terminalBody.scrollTop = terminalBody.scrollHeight;

          if (idx === steps.length - 1) {
            isRunning = false;
            simulateProbeBtn.textContent = 'Simulate Live Probe \u21bb';
            simulateProbeBtn.disabled = false;
          }
        }, step.delay);
      });
    });
  }

  // === 9. Subtle Cybersecurity Background Motif Canvas ===
  // Delegated to dedicated globe.js module (3D holographic vector globe with pulse-traced continents)
});