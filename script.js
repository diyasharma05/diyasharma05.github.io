// Diya Sharma - portfolio behaviour. Small on purpose.

(function () {
  const root = document.documentElement;

  // ---- theme toggle (persisted; default follows system) ----
  const toggle = document.querySelector(".theme-toggle");
  const systemDark = window.matchMedia("(prefers-color-scheme: dark)");
  function currentTheme() {
    const saved = root.getAttribute("data-theme");
    if (saved === "dark" || saved === "light") return saved;
    return systemDark.matches ? "dark" : "light";
  }
  if (toggle) {
    toggle.addEventListener("click", function () {
      const next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
    });
  }

  // ---- mobile nav ----
  const navToggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  if (navToggle && menu) {
    navToggle.addEventListener("click", function () {
      const open = menu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        menu.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---- highlight the section in view ----
  const links = Array.from(document.querySelectorAll('.nav-menu a[href^="#"]'));
  const sections = links.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
      });
    }, { rootMargin: "-40% 0px -55% 0px" });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // ---- reveal on scroll ----
  const reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- footer year ----
  const y = document.getElementById("year");
  if (y) y.textContent = String(new Date().getFullYear());
})();
