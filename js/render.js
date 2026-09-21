/* render.js — 技能清单 / 项目案例 / 筛选的渲染与交互 */

(function () {
  "use strict";

  /* ---------- 技能清单 ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    const skillList = document.getElementById("skillList");
    const skills = ["Python", "Java", "TypeScript", "HTML/CSS", "数据可视化", "AI 应用构建"];
    skillList.innerHTML = skills
      .map((s) => `<li class="skill-tag">${s}</li>`)
      .join("");
  });

  /* ---------- 项目案例渲染 ---------- */
  function projectHTML(project, index) {
    return `
      <article class="project" data-category="${project.category}">
        <div class="project-media">
          <img src="${project.image}" alt="${project.title}" loading="lazy" />
          <span class="media-badge">${project.category}</span>
        </div>
        <div class="project-info">
          <span class="project-index">${String(index + 1).padStart(2, "0")}</span>
          <h3 class="project-title">${project.title}<span class="project-type-tag">${project.tag || ""}</span></h3>
          <div class="project-meta">
            <span class="project-cat">${project.category}</span>
            <span class="project-date">${project.date}</span>
          </div>
          <p class="project-desc">${project.desc}</p>
          <div class="project-stack">
            ${project.stack.map((t) => `<span class="stack-tag">${t}</span>`).join("")}
          </div>
        </div>
      </article>
    `;
  }

  const projectList = document.getElementById("projectList");
  const filterBar = document.getElementById("projectFilters");

  // 渲染筛选按钮
  filterBar.innerHTML = PROJECT_CATEGORIES.map(
    (c, i) =>
      `<button class="filter-btn ${i === 0 ? "is-active" : ""}" data-filter="${c}">${c}</button>`
  ).join("");

  // 渲染全部案例
  function renderProjects(category) {
    const filtered =
      category === "全部"
        ? PROJECTS
        : PROJECTS.filter((p) => p.category === category);

    projectList.innerHTML = filtered.length
      ? filtered.map(projectHTML).join("")
      : `<p class="empty-tip">该分类下暂无案例，敬请期待。</p>`;

    // 每项案例皆可见（无副作用，供 reveal 使用）
    bindReveal();
  }

  // 筛选交互
  filterBar.addEventListener("click", (e) => {
    const btn = e.target.closest(".filter-btn");
    if (!btn) return;
    filterBar
      .querySelectorAll(".filter-btn")
      .forEach((b) => b.classList.toggle("is-active", b === btn));
    renderProjects(btn.dataset.filter);
  });

  renderProjects("全部");

  /* ---------- 滚动浮现 ---------- */
  let observer;
  function bindReveal() {
    if (observer) observer.disconnect();
    const items = projectList.querySelectorAll(".project");
    items.forEach((el) => el.classList.add("reveal"));
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    items.forEach((el) => observer.observe(el));
  }

  /* ---------- 留言表单校验 ---------- */
  const form = document.getElementById("contactForm");
  const status = document.getElementById("formStatus");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.elements.name;
      const email = form.elements.email;
      const message = form.elements.message;
      let invalid = false;

      [name, email, message].forEach((f) => f.classList.remove("is-invalid"));

      if (!name.value.trim()) {
        invalid = true;
        name.classList.add("is-invalid");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
        invalid = true;
        email.classList.add("is-invalid");
      }
      if (!message.value.trim()) {
        invalid = true;
        message.classList.add("is-invalid");
      }

      if (invalid) {
        status.textContent = "请填写必填项并确保邮箱格式正确。";
        status.className = "form-status is-error";
        return;
      }

      status.textContent = "感谢留言！已提交（前端演示，未发送到服务器）。";
      status.className = "form-status is-ok";
      form.reset();
    });
  }

  // 暴露给 nav.js 使用（若有需要）
  window.__renderProjects = renderProjects;
})();