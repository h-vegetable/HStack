# HStack 看房日志需求设计文档

> 版本：v1.0 | 更新日期：2026-05-29 | 状态：已确认

---

## 1. 产品定位

看房日志是 HStack 个人技术平台的生活记录类子应用，解决看房过程中信息零散、通勤对比困难的痛点。核心能力是**多通勤位置时间可视化对比**，帮助看房者快速判断房源的通勤便利性。

### 核心价值

- **看房记录** — 小区、户型、价格、面积、位置、朝向等结构化信息 + 照片组
- **通勤分析** — 地图可视化多通勤点路线，支持驾车/公交/步行/骑行，一目了然
- **星级评分** — 采光、噪音等主观维度 1-5 星评价
- **通勤模板** — 保存常用通勤点组，新建记录一键套用
- **记录状态** — 感兴趣 / 待定 / 已淘汰，列表页快速筛选
- **横向对比** — 多房源通勤时间矩阵，辅助决策

---

## 2. 架构决策

### 2.1 地图技术方案（已确认）

- **地图渲染**：Mapbox GL JS（自定义样式能力强）
- **路线规划**：高德路线规划 API（国内路线数据准确）
- **调用方式**：前端直调高德 API（方案 A）
  - API Key 存前端环境变量（VITE_AMAP_KEY）
  - 高德 Web JS API 本身设计为前端使用，Key 暴露是预期行为
  - 配合高德 Referer 防盗链机制，安全可控
  - 省去后端代理层，减少延迟和复杂度

### 2.2 详情页布局（已确认）

地图全宽 + 浮动通勤面板（方案 B）：
- Mapbox 地图占满页面宽度，中心点为房源位置
- 通勤面板浮在地图左上角，半透明毛玻璃效果
- 地图下方为房源详细信息区域

### 2.3 记录创建交互（已确认）

右侧抽屉 + 内部分步向导（方案 B+C）：
- 不离开列表页，从右侧滑出抽屉
- 抽屉内分步填写，降低表单复杂度

### 2.4 通勤点管理（已确认）

全局通勤模板（方案 A）：
- 通勤点组是全局配置（如"工作日通勤"、"周末通勤"），所有记录共享
- 新建记录时选择模板，自动填充通勤点
- 填充后仍可单独增删改

### 2.5 评分机制（已确认）

星级评分 1-5 星（方案 A）：
- 采光、噪音、通风、小区环境四个固定维度
- 直观快捷，一眼可比较

---

## 3. 功能范围

### 3.1 看房记录管理

| 功能 | 说明 |
|------|------|
| 创建记录 | 右侧抽屉分步向导（基本信息 → 照片 → 评分标签 → 通勤） |
| 记录列表 | 卡片流展示，封面照片 + 关键信息 + 状态标签 |
| 记录详情 | 地图通勤 + 房源信息完整展示 |
| 编辑记录 | 同创建，右侧抽屉分步向导 |
| 删除记录 | 确认后删除 |
| 状态切换 | 感兴趣 / 待定 / 已淘汰，详情页和列表页均可操作 |

### 3.2 地图通勤

| 功能 | 说明 |
|------|------|
| 通勤点添加 | 在地图上搜索/点击添加通勤目的地 |
| 多交通方式 | 每个通勤点可选：驾车 / 公交+地铁 / 步行 / 骑行 |
| 路线可视化 | 不同颜色路线标注各通勤点，浮动面板显示耗时+距离 |
| 路线高亮 | 点击通勤点切换高亮路线 |
| 实时规划 | 调用高德路线规划 API，实时返回耗时和距离 |

### 3.3 通勤模板

| 功能 | 说明 |
|------|------|
| 创建模板 | 名称 + 多个通勤点（名称 + 坐标 + 默认交通方式） |
| 模板列表 | 查看所有模板，设为默认 |
| 应用模板 | 新建记录时选择模板，自动填充通勤点 |
| 编辑/删除模板 | 修改模板内容 |

### 3.4 评分标签

| 功能 | 说明 |
|------|------|
| 星级评分 | 采光 / 噪音 / 通风 / 小区环境，1-5 星 |
| 自定义标签 | 如"近地铁"、"暗厅"、"临街"、"精装"，自由输入 |

### 3.5 通勤对比

| 功能 | 说明 |
|------|------|
| 横向对比表 | 勾选 2-5 条记录，展示房源 × 通勤点矩阵 |
| 排序 | 按单列排序，快速找出某通勤点耗时最短的房源 |

---

## 4. 数据模型

### 4.1 实体关系

```
CommuteTemplate ──1:N── CommuteTemplatePoint（全局通勤模板）
HouseRecord ──1:N── RecordCommutePoint（记录关联通勤点）
HouseRecord ──1:N── Photo（照片组）
```

### 4.2 实体定义

**HouseRecord（看房记录）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| title | VARCHAR(100) | 标题，如"翠苑一区 · 3室1厅" |
| community | VARCHAR(100) | 小区名称 |
| address | TEXT | 详细地址（文字） |
| lng | DECIMAL(10,6) | 经度 |
| lat | DECIMAL(10,6) | 纬度 |
| layout | VARCHAR(20) | 户型，如"3室1厅1卫" |
| area | DECIMAL(8,2) | 面积（㎡） |
| totalPrice | DECIMAL(12,2) | 总价（万元） |
| unitPrice | DECIMAL(10,2) | 单价（元/㎡），后端自动计算 |
| orientation | VARCHAR(10) | 朝向：南/南北/东/西/东南/西南 |
| floorInfo | VARCHAR(20) | 楼层，如"12/18" |
| decoration | VARCHAR(20) | 装修：毛坯/简装/精装/豪装 |
| status | ENUM(interested,pending,eliminated) | 状态：感兴趣/待定/已淘汰 |
| ratingLighting | SMALLINT | 采光评分 1-5 |
| ratingNoise | SMALLINT | 噪音评分 1-5 |
| ratingVentilation | SMALLINT | 通风评分 1-5 |
| ratingEnvironment | SMALLINT | 小区环境评分 1-5 |
| tags | JSONB | 自定义标签，如["近地铁","暗厅","临街"] |
| notes | TEXT | 备注 |
| visitedAt | TIMESTAMP | 看房时间 |
| coverPhotoId | UUID FK | 封面照片（可为 null） |
| createdAt | TIMESTAMP | 创建时间 |
| updatedAt | TIMESTAMP | 更新时间 |

**Photo（照片）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| recordId | UUID FK | 所属记录 |
| url | VARCHAR(500) | 图片 URL |
| caption | VARCHAR(100) | 图片说明（可选） |
| sort | INTEGER | 排序 |
| createdAt | TIMESTAMP | 创建时间 |

**RecordCommutePoint（记录通勤点）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| recordId | UUID FK | 所属记录 |
| name | VARCHAR(50) | 通勤点名称，如"公司" |
| lng | DECIMAL(10,6) | 经度 |
| lat | DECIMAL(10,6) | 纬度 |
| transportMode | ENUM(driving,transit,walking,cycling) | 交通方式 |
| duration | INTEGER | 耗时（分钟），高德 API 实时返回 |
| distance | INTEGER | 距离（米），高德 API 实时返回 |
| sort | INTEGER | 排序 |

**CommuteTemplate（全局通勤模板）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name | VARCHAR(50) | 模板名称，如"工作日通勤" |
| isDefault | BOOLEAN | 是否为默认模板 |
| createdAt | TIMESTAMP | 创建时间 |

**CommuteTemplatePoint（模板通勤点）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| templateId | UUID FK | 所属模板 |
| name | VARCHAR(50) | 通勤点名称 |
| lng | DECIMAL(10,6) | 经度 |
| lat | DECIMAL(10,6) | 纬度 |
| transportMode | ENUM(driving,transit,walking,cycling) | 默认交通方式 |
| sort | INTEGER | 排序 |

### 4.3 设计要点

- `duration` 和 `distance` 存在记录通勤点里，因为同一路线不同时间查询结果可能不同，看房时记录的是那一刻的通勤数据
- `tags` 用 JSONB，灵活支持自定义标签，无需单独建表
- `unitPrice` 后端自动计算（totalPrice / area），前端只填总价和面积
- 路线颜色由前端根据通勤点索引动态分配预设色板，不存数据库（避免排序变更后颜色错位）
- 照片存储：后端接收 multipart 上传，存本地 `uploads/` 目录，返回相对 URL；生产环境可切换为 OSS
- 领域类型不进 shared-types，由 `@hstack/api-client` 统一封装导出

---

## 5. 后端 API 设计

### 5.1 看房记录

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/house/records` | 创建记录 |
| GET | `/api/house/records` | 记录列表（支持 status 筛选 + 排序 + 分页） |
| GET | `/api/house/records/:id` | 记录详情（含通勤点 + 照片） |
| PATCH | `/api/house/records/:id` | 更新记录 |
| DELETE | `/api/house/records/:id` | 删除记录 |
| PATCH | `/api/house/records/:id/status` | 更新状态 |

### 5.2 照片

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/house/records/:id/photos` | 上传照片（multipart） |
| PATCH | `/api/house/records/:id/photos/sort` | 调整照片排序 |
| DELETE | `/api/house/records/:id/photos/:photoId` | 删除照片 |

### 5.3 通勤点

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/house/records/:id/commute-points` | 添加通勤点 |
| PATCH | `/api/house/records/:id/commute-points/:pointId` | 更新通勤点 |
| DELETE | `/api/house/records/:id/commute-points/:pointId` | 删除通勤点 |

### 5.4 通勤模板

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/house/commute-templates` | 创建模板 |
| GET | `/api/house/commute-templates` | 模板列表 |
| PATCH | `/api/house/commute-templates/:id` | 更新模板 |
| DELETE | `/api/house/commute-templates/:id` | 删除模板 |

### 5.5 通勤对比

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/house/compare` | 批量查询通勤数据（传入多个 recordId） |

---

## 6. 前端页面设计

### 6.1 路由结构

| 路由 | 页面 | 说明 |
|------|------|------|
| `/house` | 记录列表 | 卡片流 + 状态筛选 |
| `/house/:id` | 记录详情 | 地图通勤 + 房源信息 |
| `/house/compare` | 通勤对比 | 多房源横向对比表 |

- 新建/编辑 → 右侧抽屉（Drawer），不占独立路由
- 通勤模板管理 → 设置入口内的子页面或抽屉

### 6.2 层级 1：记录列表

- 顶部：标题 + 筛选栏（状态：全部/感兴趣/待定/已淘汰）+ 排序（看房时间/价格/面积）+ "新建记录"按钮
- 主体：卡片网格（响应式 2-3 列）
- 每张卡片：封面照片 + 小区名 + 户型 + 价格 + 状态标签 + 看房日期
- 空状态：引导新建第一条记录

### 6.3 层级 2：记录详情（核心页面）

**上半区 — 通勤地图：**

- Mapbox 全宽地图，中心点为房源位置
- 左上角浮动通勤面板：通勤点列表，每条显示名称 + 耗时 + 距离 + 交通方式图标
- 地图上用不同颜色路线标注各通勤点
- 通勤面板底部"+ 添加通勤点"按钮
- 点击通勤点可切换高亮路线

**下半区 — 房源信息：**

- 照片组（横向滚动或网格，支持点击放大查看）
- 信息网格：位置、户型、面积、总价+单价、朝向、楼层、装修
- 评分行：采光 / 噪音 / 通风 / 小区环境星级
- 标签：自定义标签 chip 展示
- 备注：自由文本

**顶部操作栏：** 返回列表 + 编辑按钮 + 状态切换 + 删除

### 6.4 层级 3：通勤对比

- 左侧固定列：通勤点名称
- 顶部行：选择的房源（勾选 2-5 条记录参与对比）
- 交叉单元格：耗时 + 距离 + 交通方式
- 支持按单列排序，快速找出某通勤点耗时最短的房源

### 6.5 新建/编辑抽屉

右侧抽屉内分步向导：

| 步骤 | 内容 |
|------|------|
| 1. 基本信息 | 小区、地址（地图选点）、户型、面积、价格、朝向、楼层、装修 |
| 2. 照片上传 | 拖拽上传多张照片，选择封面 |
| 3. 评分标签 | 采光/噪音/通风/环境星级 + 自定义标签 |
| 4. 通勤分析 | 选择通勤模板或手动添加通勤点，实时调用高德 API 计算路线 |

---

## 7. 前端目录结构

```
apps/house-hunting/src/
├── bootstrap.tsx                  # micro-app 子应用引导
├── App.tsx                        # 路由配置
├── pages/
│   ├── log-list/                  # 看房记录列表
│   │   ├── LogListPage.tsx
│   │   ├── RecordCard.tsx
│   │   └── StatusFilter.tsx
│   ├── log-detail/                # 看房详情 / 评分
│   │   ├── LogDetailPage.tsx
│   │   ├── CommuteMap.tsx         # Mapbox 地图 + 浮动通勤面板
│   │   ├── CommutePanel.tsx       # 浮动通勤面板
│   │   ├── HouseInfo.tsx          # 房源信息区
│   │   ├── PhotoGallery.tsx       # 照片组
│   │   └── RatingDisplay.tsx      # 星级评分展示
│   └── statistics/                # 看房统计 / 对比
│       ├── ComparePage.tsx
│       └── CompareTable.tsx
├── components/
│   ├── RecordDrawer.tsx           # 新建/编辑抽屉
│   ├── RecordFormSteps/
│   │   ├── BasicInfoStep.tsx      # 步骤1：基本信息
│   │   ├── PhotoStep.tsx          # 步骤2：照片上传
│   │   ├── RatingStep.tsx         # 步骤3：评分标签
│   │   └── CommuteStep.tsx        # 步骤4：通勤分析
│   ├── CommuteTemplateManager.tsx # 通勤模板管理
│   ├── StarRating.tsx             # 星级评分组件
│   ├── TagInput.tsx               # 标签输入组件
│   └── MapPicker.tsx              # 地图选点组件
├── stores/
│   ├── record-store.ts            # 记录状态
│   └── commute-store.ts           # 通勤模板 + 地图状态
└── types/
    └── house.types.ts             # 前端类型定义
```

---

## 8. NestJS 模块结构

```
apps/api/src/modules/house-hunting/
├── house-hunting.module.ts        # 模块定义
├── house-hunting.controller.ts    # 管理 API Controller
├── house-hunting.service.ts       # 业务逻辑 Service
├── dto/
│   ├── create-record.dto.ts
│   ├── update-record.dto.ts
│   ├── update-status.dto.ts
│   ├── create-commute-point.dto.ts
│   ├── update-commute-point.dto.ts
│   ├── create-template.dto.ts
│   ├── update-template.dto.ts
│   └── compare-query.dto.ts       # 对比查询参数
├── entities/
│   ├── house-record.entity.ts
│   ├── photo.entity.ts
│   ├── record-commute-point.entity.ts
│   ├── commute-template.entity.ts
│   └── commute-template-point.entity.ts
└── services/
    └── price-calculator.service.ts # 单价自动计算
```

---

## 9. MVP 范围与分期

### v0.1 — 骨架可跑

- 记录 CRUD（基本信息 + 照片上传）
- 记录列表卡片流 + 状态筛选
- 记录详情页基础布局（无地图，信息展示）
- 后端 API + 数据库 Entity

### v0.2 — 通勤核心

- Mapbox 地图接入
- 高德路线规划 API 对接
- 通勤点添加/删除 + 地图路线渲染
- 浮动通勤面板
- 通勤模板 CRUD

### v0.3 — 评分对比

- 星级评分
- 自定义标签
- 通勤横向对比表
- 新建记录分步抽屉

### v0.4 — 增强打磨

- 照片放大查看 / 轮播
- 记录搜索
- 数据导出
- 地图样式自定义

---

## 10. 设计决策记录

| 决策 | 选项 | 结论 | 理由 |
|------|------|------|------|
| 地图方案 | A 高德全栈 / B Mapbox渲染+高德路线 / C 纯Mapbox | B | 高德路线数据准确 + Mapbox样式能力强，各取所长 |
| API 调用链路 | A 前端直调 / B 后端代理 | A | 高德 Web JS API 设计为前端使用，Referer 防盗链已够，省去代理层延迟 |
| 详情页布局 | A 上下分区 / B 地图全宽+浮动面板 | B | 地图视野更大，路线展示更清晰 |
| 列表页形态 | A 数据表格 / B 卡片流 | B | 看房记录量不大（几十条），卡片+封面照更直观 |
| 创建交互 | A 独立页面 / B 右侧抽屉 / C 分步向导 | B+C | 不离开列表页 + 分步降低表单复杂度 |
| 通勤点管理 | A 全局模板 / B 从记录复制 | A | 模板可复用，新建时一键套用更高效 |
| 评分机制 | A 星级 / B 好中差 / C 滑块 / D 混合 | A | 1-5 星直观快捷，适合看房快速评价场景 |
