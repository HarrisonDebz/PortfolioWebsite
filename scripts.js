// === Custom Cursor ===
const cursor = document.querySelector(".cursor");
const links = document.querySelectorAll("a, button, .project-card, .skill-item");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

links.forEach((link) => {
  link.addEventListener("mouseenter", () => cursor.classList.add("hover"));
  link.addEventListener("mouseleave", () => cursor.classList.remove("hover"));
});

// === Navbar Scroll Effect ===
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// === Smooth Scrolling ===
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// === Scroll Progress Indicator ===
const scrollIndicator = document.querySelector(".scroll-indicator");
window.addEventListener("scroll", () => {
  const scrolled =
    (window.scrollY /
      (document.documentElement.scrollHeight - window.innerHeight)) *
    100;
  scrollIndicator.style.width = scrolled + "%";
});

// === Scroll Reveal Animation ===
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
    }
  });
}, observerOptions);

document.querySelectorAll(".project-card, .skill-item").forEach((el) => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "all 0.6s ease";
  observer.observe(el);
});

// === Parallax Background ===
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallaxBg = document.querySelector(".parallax-bg");
  parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// === Floating Elements Animation ===
setInterval(() => {
  const floatingElements = document.querySelectorAll(".floating-element");
  floatingElements.forEach((el) => {
    const randomX = Math.random() * window.innerWidth;
    const randomY = Math.random() * window.innerHeight;
    el.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${Math.random() * 360}deg)`;
    el.style.transition = "transform 3s ease-in-out";
  });
}, 5000);

// === Mobile Menu Toggle ===
document.querySelector(".mobile-menu").addEventListener("click", () => {
  const navLinks = document.querySelector(".nav-links");
  navLinks.style.display =
    navLinks.style.display === "flex" ? "none" : "flex";
});