// === Utilities ===
const throttle = (callback, delay) => {
  let lastCall = 0;
  return (...args) => {
    const now = new Date().getTime();
    if (now - lastCall < delay) return;
    lastCall = now;
    return callback(...args);
  };
};

// === Custom Cursor ===
const cursor = document.querySelector(".cursor");
const interactiveElements = document.querySelectorAll(
  "a, button, .project-card, .skill-item, .mobile-menu, .bento-item"
);

document.addEventListener("mousemove", (e) => {
  requestAnimationFrame(() => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;
  });
});

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  el.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// === Navbar & Scroll Effects ===
const navbar = document.querySelector(".navbar");
const scrollIndicator = document.querySelector(".scroll-indicator");
const parallaxBg = document.querySelector(".parallax-bg");

const handleScroll = () => {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;
  const docHeight = document.documentElement.scrollHeight;

  // Navbar scrolled state
  navbar.classList.toggle("scrolled", scrollY > 50);

  // Progress bar
  const scrollPercent = (scrollY / (docHeight - viewportHeight)) * 100;
  scrollIndicator.style.width = `${scrollPercent}%`;

  // Parallax background
  if (parallaxBg) {
    parallaxBg.style.transform = `translateY(${scrollY * 0.3}px)`;
  }
};

window.addEventListener("scroll", throttle(handleScroll, 10));

// === Smooth Scrolling ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Close mobile menu if open
      document.querySelector(".nav-links").classList.remove("active");

      targetElement.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// === Scroll Reveal Animation ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("revealed");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .skill-item, .section h2, .bento-item").forEach((el, index) => {
  // Add staggered delay for items in the same section
  el.style.transitionDelay = `${(index % 3) * 0.1}s`;
  observer.observe(el);
});

// === Magnetic Button Effect ===
const ctaBtn = document.querySelector(".cta-button");
if (ctaBtn) {
  ctaBtn.addEventListener("mousemove", (e) => {
    const rect = ctaBtn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    ctaBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });

  ctaBtn.addEventListener("mouseleave", () => {
    ctaBtn.style.transform = `translate(0px, 0px)`;
  });
}

// === Mobile Menu Toggle ===
const mobileMenuBtn = document.querySelector(".mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenuBtn.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  mobileMenuBtn.textContent = navLinks.classList.contains("active") ? "✕" : "☰";
});

// Close menu when clicking outside
document.addEventListener("click", (e) => {
  if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove("active");
    mobileMenuBtn.textContent = "☰";
  }
});