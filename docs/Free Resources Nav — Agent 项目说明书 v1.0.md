# Free Resources Nav — Agent 项目说明书（v1.0）

## 项目目标

打造一个 **全球高质量免费资源导航门户**。

特点：

- 永久免费访问。
- 内容每天自动更新。
- 界面简洁、美观、速度快。
- 部署在 GitHub Pages（零服务器成本）。
- 所有内容、文档、运营全部由 Agent 负责。

Agent 的职责不是写一个网站，而是长期运营一个产品。

---

# Agent 总职责

Agent 负责四件事：

| 模块 | 职责 |
|------|------|
| Product | 网站设计、信息架构、用户体验、SEO。 |
| Engineering | 开发、部署、自动更新、修复 Bug、维护代码。 |
| Content | 每天收集、筛选、整理、去重免费资源。 |
| Growth | 广告、SEO、流量增长、盈利分析、数据监控。 |

任何修改必须同步更新对应文档。

---

# 产品定位

一句话定位：

> **The Internet's Best Curated Free Resources.**

不是资源堆砌网站，而是 **精选 + 分类 + 搜索 + 推荐**。

目标用户：

- 学生
- 程序员
- AI 使用者
- 设计师
- 创作者
- 创业者
- 普通互联网用户
- 各行各业的用户，可以增加针对不同行业和领域的细分页面，不必一次完成，在找资源的时候如果发现了，或者 review 我们的网站时想到了某个领域有免费资源，就做一个细分子页面。

核心原则：

- 免费优先。
- 官方资源优先。
- 长期可用优先。
- 不收录垃圾、盗版、失效内容。

---

# 网站功能

## 首页

首页必须极简。

包含：

- Hero（搜索框）
- 今日推荐资源
- 热门分类
- 最新新增资源
- Trending（最近热门）
- Newsletter（未来可选）
- Footer

目标：首页 3 秒内找到资源。

## 分类页

一级分类示例：

- AI
- 开发
- 学习
- 设计
- 图片
- 图标
- 视频
- 字体
- 音乐
- 办公
- PDF
- 数据集
- API
- 浏览器工具
- 效率工具
- 免费软件
- 免费课程
- 开源项目
- 模板素材

支持无限扩展。

## 搜索

必须支持：

- 全站搜索。
- 拼音/英文关键词。
- 标签搜索。
- 模糊搜索。
- 分类过滤。
- 免费程度过滤。

静态搜索即可（JSON Index）。

## 每个资源页面

字段统一。

```yaml
title:
description:
url:
official:
category:
tags:
pricing:
language:
platform:
screenshot:
added_at:
updated_at:
verified_at:
rating:
featured:
```

页面展示：

- Logo
- 截图
- 简介
- 标签
- 是否官方
- 免费说明
- 使用场景
- Similar Resources

---

# UI / Design 规范

设计目标：

Apple + Linear + Notion 风格。

关键词：

- 极简。
- 留白。
- 卡片统一。
- 圆角一致。
- 图标统一。
- 深色模式。
- 响应式。

设计系统：

## Color

- Primary
- Surface
- Background
- Border
- Success
- Warning

禁止颜色混乱。

## Typography

统一字体。

层级：

- H1
- H2
- H3
- Body
- Caption

统一字号系统。

## Components

建立统一组件库：

- Navbar
- SearchBar
- ResourceCard
- CategoryCard
- Tag
- Button
- Footer
- Pagination
- Empty State
- Loading Skeleton

禁止重复 UI。

---

# 技术架构

平台：

- GitHub Pages
- HTML/CSS/TypeScript（或 Astro）
- 无服务器。
- CDN。
- 图片压缩。

目录规范：

```text
docs/
src/
content/
assets/
scripts/
public/
.github/workflows/
```

所有自动生成内容放 content。

资源数据放 JSON/YAML。

禁止手写 HTML 数据。

---

# 自动化（核心）

GitHub Actions 每天运行。

每天执行 Pipeline：

## Step 1

收集资源。

来源：

- GitHub Trending
- Product Hunt（免费）
- Hacker News
- Reddit
- 官方博客
- Awesome Lists
- AI 工具目录
- 开源社区
- 免费课程网站
- 免费素材网站

## Step 2

AI 判断：

- 是否免费。
- 是否官方。
- 是否收录过。
- 分类。
- 标签。
- 简介生成。

## Step 3

去重。

根据：

- URL
- 名称
- 相似度

## Step 4

生成数据。

更新：

- resources.json
- sitemap
- RSS
- search index

## Step 5

自动 Commit。

发布 GitHub Pages。

无需人工。

---

# 内容审核规则

Agent 必须过滤。

禁止收录：

- 破解。
- 盗版。
- 镜像盗链。
- 赌博。
- 成人内容。
- 恶意软件下载。
- 已失效网站。

优先：

- 官方。
- GitHub。
- MIT/Apache。
- 免费套餐长期可用。

所有资源必须有：

- 官网链接。
- 简介。
- 分类。
- 标签。

---

# 内容质量标准

每条资源必须回答：

1. 它是什么？
2. 免费到什么程度？
3. 谁适合？
4. 为什么值得推荐？

简介限制：

40–120 字。

标签 3–8 个。

不生成废话。

---

# SEO 策略

每页必须自动生成：

- Title
- Description
- Keywords
- OG Image
- Twitter Card
- JSON-LD

自动生成：

- sitemap.xml
- robots.txt
- RSS Feed

URL：

```text
/category/ai
/category/design

/resource/chatgpt
/resource/photopea
```

禁止动态参数 URL。

---

# 性能要求

目标：

| 指标 | 要求 |
|------|------|
| Lighthouse | ≥95 |
| 首屏加载 | ＜2 秒 |
| JS | 尽量少 |
| 图片 | WebP / AVIF |
| CLS | 接近 0 |
| SEO | 100 |

所有资源截图懒加载。

搜索索引压缩。

---

# 文档规范

Agent 必须维护 docs。

文档列表：

```text
docs/
    README.md
    Architecture.md
    DesignSystem.md
    ContentGuide.md
    Automation.md
    Deployment.md
    SEO.md
    Monetization.md
    Changelog.md
```

要求：

- 每份文档控制在必要长度。
- 图优于文字。
- 有目录。
- 更新同步修改 Changelog。

---

# Git 规范

Branch：

```text
main
develop
feature/*
fix/*
content/*
```

Commit：

```text
feat:
fix:
content:
docs:
style:
refactor:
chore:
```

Agent 自动保持 Commit 清晰。

---

# 盈利目标（必须长期规划）

网站不能影响体验。

原则：

**内容优先，广告克制。**

---

## 第一阶段：Google AdSense

位置：

- 首页资源流之间。
- 分类页列表中。
- 资源详情页底部。
- Sidebar（桌面）。

禁止：

- Hero 放广告。
- 弹窗广告。
- 自动播放广告。

预估模型（示例）：

| 日 PV | RPM | 月收入 |
|-------|------|---------|
| 1,000 | \$2 | \$60 |
| 10,000 | \$3 | \$900 |
| 50,000 | \$4 | \$6,000 |
| 100,000 | \$5 | \$15,000 |

Agent 每月更新真实 RPM 数据。

---

## 第二阶段：Affiliate

推荐免费产品。

例如：

- AI 工具升级版。
- VPS。
- 域名。
- Notion 模板。
- Canva Pro。
- Cursor。
- GitHub Copilot。
- Cloudflare。
- DigitalOcean。

要求：

- 免费资源页才出现升级入口。
- 标明 Affiliate。

数据模型：

CTR × 注册率 × CPA。

示例：

| PV | CTR | 注册率 | CPA | 收益 |
|----|------|---------|-----|------|
| 50,000 | 2% | 15% | \$15 | \$225 |

多个合作可累计。

---

## 第三阶段：Sponsor

出售精选推荐位。

形式：

- Featured Tool。
- Weekly Sponsor。
- Category Sponsor。

规则：

- 明确 Sponsor 标识。
- 不影响排序。

报价模型：

| 月 PV | Banner/月 |
|--------|-----------|
| 10k | \$80–150 |
| 50k | \$300–600 |
| 100k | \$800–1500 |

---

## 第四阶段：Newsletter

收集邮箱。

发送：

- Weekly Free Resources。
- AI Free Tools。
- Open Source Weekly。

后续：

- Sponsor Newsletter。
- Affiliate Newsletter。

---

## 第五阶段：Premium（可选）

保持网站免费。

提供：

- 收藏同步。
- 每周精选合集。
- API。
- 无广告。

仅作为附加收入。

---

# 广告实施计划

Agent 必须完成：

## AdSense

- 创建 Google AdSense。
- 验证 GitHub Pages 域名。
- 插入 Auto Ads（谨慎）。
- 改为手动广告位。
- 监控 Core Web Vitals。

## Microsoft Clarity

接入热图。

分析：

- 点击。
- 滚动。
- 搜索行为。

## Google Analytics 4

监控：

- PV
- UV
- Search
- Category
- Outbound Click

事件必须统一。

---

# 数据分析 Dashboard

自动生成运营数据。

每日统计：

| 指标 |
|------|
| 新增资源 |
| 删除资源 |
| 总资源数 |
| 分类数量 |
| 热门资源 |
| 热门搜索 |
| PV |
| CTR |
| Ad RPM |

生成 Markdown 报告。

保存在 docs/reports。

---

# Agent 日常运营流程

每天：

- 搜集资源。
- AI 分类。
- 去重。
- 更新 JSON。
- 更新 Sitemap。
- 发布 Pages。
- 更新日报。

每周：

- 检查失效链接。
- 删除失效资源。
- 更新热门资源。
- 更新 Trending。

每月：

- SEO 检查。
- Lighthouse 检查。
- 广告收益分析。
- Affiliate 收益分析。
- 内容质量抽检。

---

# Bug / Maintenance

Agent 必须持续检查：

- 死链。
- 重复资源。
- 图片失效。
- Logo 缺失。
- 搜索异常。
- 分类错误。
- 深色模式问题。
- 移动端布局问题。

发现自动修复。

---

# 内容规模目标

| 阶段 | 目标资源数 |
|------|------------|
| MVP | 300 |
| V1 | 800 |
| V2 | 2,000 |
| 长期 | 10,000+ |

不是追求数量，而是精选。

---

# 成功指标（KPI）

产品 KPI：

- Lighthouse ≥95
- 无明显 UI Bug
- 移动端体验优秀
- 搜索命中率高

内容 KPI：

- 每天新增资源。
- 死链率持续降低。
- 分类覆盖持续增加。

增长 KPI：

- Google 收录增长。
- Organic Traffic 增长。
- Returning Users 增长。

商业 KPI：

- RPM。
- Affiliate CTR。
- Sponsor 收入。
- Newsletter 订阅数。

---

# Agent 工作原则（必须遵守）

1. 用户体验优先于广告收益。
2. 所有资源必须经过筛选，不做资源堆砌。
3. 自动化优先，避免人工维护。
4. 文档始终保持最新、简洁、结构清晰。
5. 所有设计保持统一 Design System。
6. 所有运营决策必须有数据支持，并记录在文档中。
7. 网站始终保持免费、快速、美观、可信。
