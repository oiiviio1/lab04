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
})();