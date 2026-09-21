/* projects.js — 项目案例数据（后续新增案例只需在数组中追加一条） */

const PROJECTS = [
  {
    id: "course-oracle",
    title: "课语通",
    tag: "AI 应用",
    category: "AI 应用",
    date: "2026.07",
    stack: ["Python", "FastAPI", "RAG", "向量检索", "大语言模型 API", "Streamlit"],
    desc: "基于大语言模型的课程问答助手。用户上传课程资料后，系统建立知识索引，根据课程内容回答问题，并提供引用出处和知识点小测，帮助学生快速复习和整理课程重点。",
    image: "assets/images/course-oracle.svg"
  },
  {
    id: "city-pulse",
    title: "城市脉搏",
    tag: "数据可视化",
    category: "数据可视化",
    date: "2026.03",
    stack: ["TypeScript", "HTML/CSS", "Canvas", "SVG", "ECharts"],
    desc: "城市实时交通与天气数据可视化大屏，集中展示交通、天气和城市运行信息。通过多数据源轮询聚合数据，并结合 SVG 图表、Canvas 粒子地图和响应式布局实现大屏可视化展示。",
    image: "assets/images/city-pulse.svg"
  },
  {
    id: "shine-market",
    title: "拾光集市",
    tag: "Web 应用",
    category: "全栈应用",
    date: "2025.09",
    stack: ["Java", "Spring Boot", "MySQL", "TypeScript", "Vue"],
    desc: "面向校园场景的二手交易平台，提供商品发布、关键词检索、站内私信和信用评分等功能。从需求梳理、界面设计到主要接口开发均独立完成，上线测试后累计注册用户超过 300 人。",
    image: "assets/images/shine-market.svg"
  },
  {
    id: "light-bookkeeping",
    title: "轻记账",
    tag: "移动应用",
    category: "小程序",
    date: "2025.04",
    stack: ["TypeScript", "微信小程序", "微信云开发", "ECharts"],
    desc: "面向日常生活场景的极简记账微信小程序，重点解决快速记录和查看个人收支的问题。支持语音快捷记账、月度收支统计和预算提醒，并使用微信云开发完成数据存储与后端能力。",
    image: "assets/images/light-bookkeeping.svg"
  }
];

/* 全部一级分类（用于筛选） */
const PROJECT_CATEGORIES = (() => {
  const set = new Set(PROJECTS.map((p) => p.category));
  return ["全部", ...set];
})();