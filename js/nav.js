/* nav.js — 滚动监听导航高亮 + 移动端菜单 */

(function () {
  "use strict";

  const sections = ["home", "projects", "about", "contact"];
  const navLinks = document.querySelectorAll(".nav-link");
  const navLinkMap = {};
  navLinks.forEach((l) => (navLinkMap[l.dataset.target] = l));

  /* ---------- 滚动监听：当前位置高亮 ---------- */
  function onScroll() {
    const scrollPos = window.scrollY + 140;
    let current = sections[0];

    for (const id of sections) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.offsetTop <= scrollPos) current = id;
    }

    navLinks.forEach((l) =>
      l.classList.toggle("is-active", l.dataset.target === current)
    );
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- 移动端菜单 ---------- */
  const toggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  const scrim = document.createElement("div");
  scrim.className = "scrim";
  document.body.appendChild(scrim);

  function setMenu(open) {
    sidebar.classList.toggle("is-open", open);
    toggle.classList.toggle("is-active", open);
    toggle.setAttribute("aria-expanded", String(open));
    scrim.classList.toggle("is-visible", open);
  }

  toggle.addEventListener("click", () => {
    setMenu(!sidebar.classList.contains("is-open"));
  });
  scrim.addEventListener("click", () => setMenu(false));
  sidebar.addEventListener("click", (e) => {
    if (e.target.classList.contains("nav-link")) setMenu(false);
  });

  /* ---------- 主题切换（浅色 / 深色，localStorage 记忆） ---------- */
  const THEME_KEY = "theme";
  const themeToggles = document.querySelectorAll(".theme-toggle");

  function applyTheme(theme) {
    document.documentElement.dataset.theme = theme;
    themeToggles.forEach((btn) =>
      btn.setAttribute(
        "aria-label",
        theme === "light" ? "切换到深色主题" : "切换到浅色主题"
      )
    );
  }

  // 初始化：读取上次选择，默认深色（与现有视觉风格一致）
  applyTheme(localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark");

  themeToggles.forEach((btn) =>
    btn.addEventListener("click", () => {
      const next =
        document.documentElement.dataset.theme === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    })
  );
})();