// Laveena's portfolio — ES6+ JavaScript
"use strict";

const projectData = {
  monastery: {
    title: "Monastery360",
    kicker: "PROJECT 01 / WEB • DATA • TOURISM",
    description:
      "A website concept designed to boost tourism in Sikkim by bringing monastery information into one place. It combines itinerary planning, Google Maps integration and immersive 360° virtual views so visitors can explore before travelling — or experience the monasteries remotely.",
    focus: "Web experience • tourism • information design",
    highlight: "The 360° monastery view is the central experience, with digital preservation and accessible information as supporting goals.",

  },
  agrisense: {
    title: "AgriSense — AI Field Advisor",
    kicker: "PROJECT 02 / AI • AGRICULTURE",
    description:
      "An AI Field Advisor project focused on applying technology to agricultural decision making. The project explores how an intelligent interface can make field-oriented guidance easier to access and understand.",
    focus: "Artificial intelligence • field advisory",
    highlight: "The project connects an AI-focused idea with a practical, real-world domain.",

  },
  compiler: {
    title: "Intermediate Code Generation",
    kicker: "PROJECT 03 / COMPILER DESIGN",
    description:
      "A compiler design project centred on intermediate code generation, with a focus on identifying basic blocks and representing control flow through flow graphs.",
    focus: "Compiler design • intermediate representation",
    highlight: "Basic blocks and flow graphs provide the core structure for understanding program control flow.",

  }
};

// Theme switching
const root = document.documentElement;
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = document.querySelector("#themeIcon");

const applyTheme = (theme) => {
  root.dataset.theme = theme;
  const dark = theme === "dark";
  themeIcon.className = dark ? "bi bi-sun-fill" : "bi bi-moon-stars-fill";
  themeToggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
  localStorage.setItem("portfolio-theme", theme);
};

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
applyTheme(savedTheme || (preferredDark ? "dark" : "light"));

themeToggle.addEventListener("click", () => {
  applyTheme(root.dataset.theme === "dark" ? "light" : "dark");
});

// Dynamic year
document.querySelector("#year").textContent = new Date().getFullYear();

// Mobile navigation closes after selection
document.querySelectorAll("#navMenu .nav-link").forEach(link => {
  link.addEventListener("click", () => {
    const menu = document.querySelector("#navMenu");
    if (menu.classList.contains("show")) {
      bootstrap.Collapse.getOrCreateInstance(menu).hide();
    }
  });
});

// Active navigation link
const navLinks = [...document.querySelectorAll("#mainNav .nav-link")];
const sections = navLinks.map(link => document.querySelector(link.getAttribute("href"))).filter(Boolean);

const updateActiveNav = () => {
  const y = window.scrollY + 120;
  let current = sections[0];
  sections.forEach(section => {
    if (section.offsetTop <= y) current = section;
  });
  navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current.id}`));
};
window.addEventListener("scroll", updateActiveNav, { passive: true });
updateActiveNav();

// Scroll reveal
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

// Animated counters
const counters = document.querySelectorAll("[data-counter]");
const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.counter);
    let current = 0;
    const step = Math.max(1, Math.ceil(target / 25));
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      el.textContent = current;
      if (current >= target) clearInterval(timer);
    }, 45);
    observer.unobserve(el);
  });
}, { threshold: 0.8 });
counters.forEach(counter => counterObserver.observe(counter));

// Project filters
const filterButtons = document.querySelectorAll(".filter-btn");
const projectItems = document.querySelectorAll(".project-item");
const noProjects = document.querySelector("#noProjects");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;
    let visibleCount = 0;

    projectItems.forEach(item => {
      const categories = item.dataset.category.split(" ");
      const show = filter === "all" || categories.includes(filter);
      item.classList.toggle("hidden", !show);
      if (show) visibleCount++;
    });

    noProjects.classList.toggle("d-none", visibleCount !== 0);
  });
});

// Project detail modal
const projectModal = document.querySelector("#projectModal");
const modalTitle = document.querySelector("#projectModalLabel");
const modalKicker = document.querySelector("#modalKicker");
const modalDescription = document.querySelector("#modalDescription");
const modalFocus = document.querySelector("#modalFocus");
const modalHighlight = document.querySelector("#modalHighlight");


projectModal.addEventListener("show.bs.modal", (event) => {
  const button = event.relatedTarget;
  const key = button.dataset.project;
  const project = projectData[key];
  if (!project) return;

  modalTitle.textContent = project.title;
  modalKicker.textContent = project.kicker;
  modalDescription.textContent = project.description;
  modalFocus.textContent = project.focus;
  modalHighlight.textContent = project.highlight;

});

projectModal.addEventListener("hidden.bs.modal", () => {

});

// Client-side contact validation + mailto
const contactForm = document.querySelector("#contactForm");
const formAlert = document.querySelector("#formAlert");

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!contactForm.checkValidity()) {
    contactForm.classList.add("was-validated");
    formAlert.className = "alert alert-danger mt-4";
    formAlert.textContent = "Please check the highlighted fields and try again.";
    return;
  }

  const data = new FormData(contactForm);
  const name = data.get("name").trim();
  const email = data.get("email").trim();
  const subject = data.get("subject").trim();
  const message = data.get("message").trim();

  const body = `Hi Laveena,

Name: ${name}
Email: ${email}

${message}`;

  formAlert.className = "alert alert-success mt-4";
  formAlert.textContent = "Validation passed. Opening your email app…";

  const mailto = `mailto:laveenap152@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  window.location.href = mailto;
});

// Prevent accidental broken-image icon from leaving awkward layout.
document.querySelectorAll(".project-media img").forEach(img => {
  img.addEventListener("error", () => {
    img.style.display = "none";
  });
});
