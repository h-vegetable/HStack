# HStack 作品集门户 · 轻科幻活力光感设计规范

> 本规范由 `portal-design.html` 设计稿提炼，供大模型理解并还原实现。所有色值、尺寸、动效参数均为已验证的最终值。

---

## 1. 设计哲学

- **风格定位**：轻科幻 · 活力光感
- **关键词**：全息科技 · 玻璃拟态 · 微光动效 · 流线光轨 · 圆润友好 · 通透轻快
- **核心禁令**：禁止工业数据平台的暗沉、厚重、冷静风格；禁止硬黑影、厚重投影
- **生命感原则**：所有动效和装饰应呈现"有生命的科技感"——流线轻盈流动、光点柔和呼吸、界面仿佛被注入能量

---

## 2. 主题切换机制

```html
<html data-theme="light">
  <!-- 或 "dark" -->
</html>
```

- 通过 `<html>` 元素的 `data-theme` 属性切换
- 所有视觉属性由 CSS 自定义属性驱动，切换即全局生效
- 切换过渡：背景 `0.6s ease`，文字 `0.4s ease`

---

## 3. 色彩 Token

### 3.1 浅色主题 `[data-theme="light"]`

| Token              | 值                                                               | 用途                      |
| ------------------ | ---------------------------------------------------------------- | ------------------------- |
| `--bg-start`       | `#F5F3FF`                                                        | 渐变背景起点（微紫暖白）  |
| `--bg-end`         | `#EDF2FF`                                                        | 渐变背景终点（极淡冰蓝）  |
| `--card-bg`        | `rgba(255,255,255,0.55)`                                         | 卡片/面板背景（半透明白） |
| `--card-border`    | `rgba(93,95,239,0.12)`                                           | 卡片边框                  |
| `--card-shadow`    | `0 8px 32px rgba(93,95,239,0.10), 0 0 60px rgba(93,95,239,0.05)` | 卡片阴影（弥散蓝紫光）    |
| `--primary`        | `#5D5FEF`                                                        | 主色（电光紫蓝）          |
| `--primary-glow`   | `rgba(93,95,239,0.35)`                                           | 主色发光/光晕             |
| `--secondary`      | `#00D2FF`                                                        | 辅色（明亮青绿）          |
| `--accent`         | `#FF7A9E`                                                        | 强调色（活力珊瑚粉）      |
| `--text`           | `#1E1E2F`                                                        | 主文字（深灰蓝）          |
| `--text-secondary` | `#4A4A6A`                                                        | 次要文字（中灰）          |
| `--text-muted`     | `#8E8EA0`                                                        | 占位符/辅助文字           |
| `--input-bg`       | `rgba(255,255,255,0.5)`                                          | 输入框背景                |
| `--input-border`   | `rgba(93,95,239,0.25)`                                           | 输入框边框                |
| `--nav-bg`         | `rgba(245,243,255,0.72)`                                         | 导航栏背景                |
| `--scan-color`     | `rgba(93,95,239,0.5)`                                            | 扫描光边颜色              |
| `--scan-glow`      | `rgba(93,95,239,0.15)`                                           | 扫描光晕/内发光           |
| `--table-hover`    | `rgba(93,95,239,0.06)`                                           | 表格行悬停                |
| `--table-selected` | `rgba(93,95,239,0.12)`                                           | 表格选中行                |
| `--overlay`        | `rgba(237,242,255,0.6)`                                          | 遮罩层（淡蓝灰模糊）      |
| `--badge-bg`       | `rgba(93,95,239,0.08)`                                           | 标签/徽章背景             |

### 3.2 深色主题 `[data-theme="dark"]`

| Token              | 值                                                                  | 用途                          |
| ------------------ | ------------------------------------------------------------------- | ----------------------------- |
| `--bg-start`       | `#0F0A1E`                                                           | 渐变背景起点（深蓝紫）        |
| `--bg-end`         | `#1A1035`                                                           | 渐变背景终点                  |
| `--card-bg`        | `rgba(30,22,60,0.6)`                                                | 卡片/面板背景（半透明深紫灰） |
| `--card-border`    | `rgba(133,130,255,0.18)`                                            | 卡片边框                      |
| `--card-shadow`    | `0 8px 32px rgba(133,130,255,0.12), 0 0 60px rgba(58,224,217,0.06)` | 卡片阴影（弥散光+青蓝微光）   |
| `--primary`        | `#8582FF`                                                           | 主色（电光蓝紫）              |
| `--primary-glow`   | `rgba(133,130,255,0.4)`                                             | 主色发光/光晕                 |
| `--secondary`      | `#3AE0D9`                                                           | 辅色（亮青）                  |
| `--accent`         | `#FF6B8B`                                                           | 强调色（暖粉橙）              |
| `--text`           | `#EDE9FF`                                                           | 主文字（近白淡紫）            |
| `--text-secondary` | `#B8B0D4`                                                           | 次要文字（淡灰紫）            |
| `--text-muted`     | `#7A7294`                                                           | 辅助文字                      |
| `--input-bg`       | `rgba(30,22,60,0.4)`                                                | 输入框背景                    |
| `--input-border`   | `rgba(133,130,255,0.3)`                                             | 输入框边框                    |
| `--nav-bg`         | `rgba(15,10,30,0.78)`                                               | 导航栏背景                    |
| `--scan-color`     | `rgba(133,130,255,0.7)`                                             | 扫描光边（更亮更明显）        |
| `--scan-glow`      | `rgba(58,224,217,0.2)`                                              | 扫描光晕（青蓝调）            |
| `--table-hover`    | `rgba(58,224,217,0.06)`                                             | 表格行悬停（淡青）            |
| `--table-selected` | `rgba(133,130,255,0.15)`                                            | 表格选中行                    |
| `--overlay`        | `rgba(15,10,30,0.7)`                                                | 遮罩层（暗色半透明）          |
| `--badge-bg`       | `rgba(133,130,255,0.12)`                                            | 标签/徽章背景                 |

---

## 4. 字体

| 用途       | 字体族      | 备选                      | 特征                                             |
| ---------- | ----------- | ------------------------- | ------------------------------------------------ |
| 标题 h1-h4 | `Rajdhani`  | `Quicksand`, `sans-serif` | 几何科技感，700 weight，`letter-spacing: 0.02em` |
| 正文 / UI  | `Quicksand` | `system-ui`, `sans-serif` | 圆润友好，300-700 weight                         |

### 字号规范

| 元素         | 尺寸                     | 备注                |
| ------------ | ------------------------ | ------------------- |
| Hero h1      | `clamp(36px, 5vw, 56px)` | 响应式渐变文字      |
| Section 标题 | `28px`                   | 渐变文字效果        |
| 卡片 h3      | `20px`                   | —                   |
| 对话框 h3    | `20px`                   | —                   |
| 正文         | `14-18px`                | 根据语境            |
| 标签/辅助    | `12-13px`                | 使用 `--text-muted` |
| 占位符       | `13px` / `weight: 300`   | 比正文更轻更小      |

### 渐变文字效果（标题复用）

```css
background: linear-gradient(135deg, var(--primary), var(--secondary));
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
background-clip: text;
```

---

## 5. 布局规范

| 区域     | 最大宽度 | 水平内边距              |
| -------- | -------- | ----------------------- |
| 导航栏   | `1280px` | `32px`（移动端 `16px`） |
| 内容区   | `1280px` | `32px`（移动端 `16px`） |
| Hero     | `960px`  | `32px`                  |
| 卡片网格 | —        | 由 `.section` 控制      |

### 栅格

- **应用卡片**：`grid-template-columns: repeat(auto-fit, minmax(300px, 1fr))`，间距 `24px`
- **组件演示**：`grid-template-columns: 1fr 1fr`，间距 `32px`，768px 以下单列
- **响应式断点**：`640px`（移动端字号/间距调整）

---

## 6. 组件规范

### 6.1 按钮 `.btn`

| 属性      | 值                                                   |
| --------- | ---------------------------------------------------- |
| 内边距    | `12px 28px`                                          |
| 圆角      | `14px`                                               |
| 字号/字重 | `15px / 600`                                         |
| 过渡      | `all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)`（弹性） |
| 点击      | `transform: scale(0.96)`                             |

**主按钮 `.btn-primary`**

```css
background: linear-gradient(
  135deg,
  var(--primary),
  color-mix(in srgb, var(--primary), var(--secondary) 30%)
);
color: #fff;
box-shadow: 0 4px 20px var(--primary-glow);
```

- 悬停：`translateY(-2px)` + `box-shadow: 0 8px 32px var(--primary-glow)`
- 光泽斜划：`::before` 伪元素，`skewX(-20deg)` 白色半透明渐变条，悬停时从左滑到右

**幽灵按钮 `.btn-ghost`**

```css
background: transparent;
border: 1.5px solid var(--input-border);
color: var(--primary);
backdrop-filter: blur(8px);
```

- 悬停：填充 `--badge-bg`，边框变 `--primary`，`box-shadow: 0 0 16px var(--primary-glow)`

**危险按钮 `.btn-danger`**

```css
background: linear-gradient(135deg, var(--accent), color-mix(in srgb, var(--accent), #ff4060 30%));
color: #fff;
box-shadow: 0 4px 16px rgba(255, 122, 158, 0.25);
```

- 悬停：`translateY(-2px)` + 阴影增强

### 6.2 输入框 `.hstack-input`

| 属性      | 值                                               |
| --------- | ------------------------------------------------ |
| 内边距    | `12px 16px`                                      |
| 圆角      | `12px`                                           |
| 边框      | `1.5px solid var(--input-border)`                |
| 背景      | `var(--input-bg)` + `backdrop-filter: blur(8px)` |
| 字号/字重 | `14px / Quicksand`                               |

- **占位符**：`color: var(--text-muted)`，`font-size: 13px`，`font-weight: 300`
- **聚焦态**：
  ```css
  border-image: linear-gradient(135deg, var(--primary), var(--secondary)) 1;
  border-image-slice: 1;
  box-shadow:
    0 0 16px var(--primary-glow),
    inset 0 0 8px var(--scan-glow);
  ```

### 6.3 卡片 `.app-card`

| 属性   | 值                                                             |
| ------ | -------------------------------------------------------------- |
| 背景   | `var(--card-bg)` + `backdrop-filter: blur(16px) saturate(1.2)` |
| 边框   | `1px solid var(--card-border)`                                 |
| 圆角   | `20px`                                                         |
| 内边距 | `32px`                                                         |
| 阴影   | `var(--card-shadow)`                                           |
| 过渡   | `all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)`                   |
| 悬停   | `translateY(-6px)` + 增强阴影                                  |

**扫描光边 `.scan-edge`**（卡片内绝对定位子元素）：

```css
position: absolute;
inset: 0;
border-radius: 20px;
pointer-events: none;
background: conic-gradient(
  from var(--scan-angle, 0deg),
  transparent 0%,
  var(--scan-color) 8%,
  transparent 16%
);
-webkit-mask:
  linear-gradient(#fff 0 0) content-box,
  linear-gradient(#fff 0 0);
mask:
  linear-gradient(#fff 0 0) content-box,
  linear-gradient(#fff 0 0);
-webkit-mask-composite: xor;
mask-composite: exclude;
padding: 1.5px;
animation: scanEdge 5s linear infinite;
```

**图标容器 `.icon-wrap`**：`56×56px`，圆角 `16px`，背景 `linear-gradient(135deg, var(--primary-glow), var(--scan-glow))`

**标签 `.card-tag`**：内边距 `4px 12px`，圆角 `8px`，背景 `--badge-bg`，字号 `12px`

### 6.4 表格 `.hstack-table`

| 属性   | 值                                                                             |
| ------ | ------------------------------------------------------------------------------ |
| 字号   | `14px`                                                                         |
| 表头   | `--badge-bg` 背景 + `--primary` 文字 + `backdrop-filter: blur(8px)` + 底部边框 |
| 行悬停 | `background: var(--table-hover)`                                               |
| 选中行 | `background: var(--table-selected)`                                            |

**选中行左侧发光色带**（`::before` 伪元素）：

```css
position: absolute;
left: 0;
top: 4px;
bottom: 4px;
width: 3px;
background: linear-gradient(180deg, var(--primary), var(--secondary));
border-radius: 2px;
box-shadow: 0 0 8px var(--primary-glow);
animation: breathe 2s ease-in-out infinite;
```

### 6.5 对话框

**遮罩层 `.dialog-overlay`**：

```css
position: fixed;
inset: 0;
z-index: 200;
background: var(--overlay);
backdrop-filter: blur(12px);
display: flex;
align-items: center;
justify-content: center;
/* 显隐通过 opacity + pointer-events 控制 */
```

**对话框本体 `.dialog-box`**：

```css
background: var(--card-bg);
backdrop-filter: blur(24px);
border: 1px solid var(--card-border);
border-radius: 20px;
max-width: 480px;
width: 90%;
box-shadow:
  0 24px 64px rgba(0, 0, 0, 0.2),
  0 0 80px var(--primary-glow);
/* 入场：scale(0.9) translateY(20px) → scale(1) translateY(0) */
transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
```

**顶部渐变分割线 `.dialog-header-line`**：

```css
height: 3px;
background: linear-gradient(90deg, var(--primary), var(--secondary), var(--accent));
```

**操作按钮**：居右 `justify-content: flex-end`

### 6.6 抽屉

**面板 `.drawer-panel`**：

```css
position: fixed;
top: 0;
right: 0;
bottom: 0;
width: 380px;
max-width: 90vw;
z-index: 201;
background: var(--card-bg);
backdrop-filter: blur(24px);
border-left: 1px solid var(--card-border);
box-shadow:
  -16px 0 48px rgba(0, 0, 0, 0.15),
  0 0 60px var(--primary-glow);
/* 入场：translateX(100%) → translateX(0) */
transition: transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1);
```

**左侧流动光带 `.drawer-light-bar`**：

```css
position: absolute;
top: 0;
left: 0;
bottom: 0;
width: 3px;
background: linear-gradient(180deg, var(--primary), var(--secondary), var(--accent));
animation: lightDescend 2s ease-in-out infinite;
```

**装饰发光点 `.glow-dot`**：`8×8px` 圆形，`background: var(--primary)`，`box-shadow: 0 0 10px var(--primary-glow)`，呼吸动画

**关闭按钮 `.drawer-close`**：`32×32px` 圆形，`1.5px` 幽灵边框，悬停旋转 `90°` + 光晕

**列表项 `.drawer-item`**：

- 悬停：`background: var(--table-hover)`
- 左侧光线：`::before` 伪元素，`width: 2px`，高度从 `0` 过渡到 `100%`（悬停时），渐变 `var(--primary) → var(--secondary)`

### 6.7 导航栏 `.nav`

```css
position: fixed;
top: 0;
z-index: 100;
background: var(--nav-bg);
backdrop-filter: blur(20px) saturate(1.4);
border-bottom: 1px solid var(--card-border);
height: 64px;
```

**全息高光线 `.nav-hologram-line`**：

```css
position: absolute;
bottom: 0;
left: 0;
right: 0;
height: 1px;
background: linear-gradient(
  90deg,
  transparent 0%,
  var(--primary) 30%,
  var(--secondary) 70%,
  transparent 100%
);
opacity: 0.5;
animation: holoLine 4s ease-in-out infinite;
```

### 6.8 主题切换开关 `.theme-toggle`

```css
width: 56px;
height: 30px;
border-radius: 15px;
border: 1.5px solid var(--input-border);
background: var(--input-bg);
backdrop-filter: blur(8px);
/* 旋钮 .knob: 22×22px 圆形，渐变背景，深色模式 translateX(26px) */
/* 过渡: cubic-bezier(0.68, -0.55, 0.27, 1.55) 弹性效果 */
```

---

## 7. 动效规范

### 7.1 关键帧动画

| 动画名         | 周期                      | 缓动          | 用途                                          |
| -------------- | ------------------------- | ------------- | --------------------------------------------- |
| `breathe`      | `2s`                      | `ease-in-out` | 呼吸光效：opacity 0.6→1→0.6，scale 1→1.15→1   |
| `scanEdge`     | `5s` (卡片) / `6s` (面板) | `linear`      | 扫描光边：`--scan-angle` 从 0° 到 360°        |
| `holoLine`     | `4s`                      | `ease-in-out` | 全息线：opacity 0.3→0.7→0.3，scaleX 0.8→1→0.8 |
| `lightDescend` | `2s`                      | `ease-in-out` | 抽屉光带：opacity 0.3→1→0.3，top 偏移         |
| `fadeInUp`     | `0.6s`                    | `ease`        | 元素入场：opacity 0→1，translateY 24px→0      |

### 7.2 扫描光边实现原理

使用 CSS `@property` 注册自定义属性实现 `conic-gradient` 动画：

```css
@property --scan-angle {
  syntax: '<angle>';
  initial-value: 0deg;
  inherits: false;
}
@keyframes scanEdge {
  to {
    --scan-angle: 360deg;
  }
}
```

通过 `mask-composite: exclude` 技术将渐变限制在 1.5px 边框区域内，形成光线沿边框巡游的效果。

### 7.3 粒子系统参数

| 参数         | 值                                               |
| ------------ | ------------------------------------------------ |
| 粒子数量     | `60`                                             |
| 粒子尺寸     | `1.5-4px`（随机）                                |
| 移动速度     | `±0.3px/帧`                                      |
| 透明度       | `0.2-0.7`（呼吸调制）                            |
| 色相分布     | `250`（紫）50% / `190`（青）25% / `340`（粉）25% |
| 呼吸速度     | `0.01-0.03 rad/帧`                               |
| 鼠标排斥范围 | `150px`，力度 `0.003`                            |
| 深色模式增强 | 透明度 ×2，额外 `size×3` 光晕层                  |

### 7.4 流动光线参数

| 参数         | 值                              |
| ------------ | ------------------------------- |
| 线条数量     | `5`                             |
| 线宽         | `1-3px`（随机）                 |
| 路径控制点   | `6-9` 个（随机）                |
| 光点移动速度 | `0.0003-0.0008/帧`              |
| 路径透明度   | 浅色 `0.04`，深色 `0.08`        |
| 光点半径     | `20px`（径向渐变）              |
| 光点透明度   | 浅色 `0.25`，深色 `0.5`         |
| 色相         | `250`（紫）60% / `190`（青）40% |

---

## 8. 过渡曲线速查

| 名称 | 值                                      | 用途                                |
| ---- | --------------------------------------- | ----------------------------------- |
| 弹性 | `cubic-bezier(0.34, 1.56, 0.64, 1)`     | 按钮/卡片悬停、对话框入场、抽屉滑入 |
| 回弹 | `cubic-bezier(0.68, -0.55, 0.27, 1.55)` | 主题开关旋钮                        |
| 平滑 | `ease`                                  | fadeInUp、主题背景切换              |
| 渐入 | `0.25-0.35s ease`                       | 表格行、抽屉列表项悬停              |

---

## 9. z-index 层级

| 层级     | 值    | 元素                                 |
| -------- | ----- | ------------------------------------ |
| 背景画布 | `0`   | `#particle-canvas`, `#flow-canvas`   |
| 内容区   | `1`   | `.hero`, `.section`, `.footer`       |
| 导航栏   | `100` | `.nav`                               |
| 遮罩层   | `200` | `.dialog-overlay`, `.drawer-overlay` |
| 抽屉面板 | `201` | `.drawer-panel`                      |

---

## 10. 文件关系

```
.agent/designs/
├── promots.md              ← 原始设计意图（人类可读提示词）
├── portal-design.html      ← 可视化设计稿（浏览器预览）
└── design-spec.md          ← 本文件（大模型可读规范，由设计稿提炼）
```

**使用方式**：大模型在实现 HStack 门户 UI 时，应以本规范为参考，使用 CSS 变量体系确保主题一致性，按照组件规范精确还原视觉和交互细节。
