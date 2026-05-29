# HStack Mock 平台需求设计文档

> 版本：v1.0 | 更新日期：2026-05-29 | 状态：已确认

---

## 1. 产品定位

Mock 平台是 HStack 个人技术平台的核心子应用之一，提供接口文档导入、Mock 数据生成、在线 Mock 服务和离线导出能力。既满足日常开发中的接口模拟需求，也作为面试展示中"能玩"的亮点。

### 核心价值

- **一键导入**：从 Swagger/OpenAPI/HAR 文件自动生成完整 Mock 接口
- **在线服务**：激活后获得持久专属 URL，前端项目直接指向即可使用
- **离线导出**：导出为 JSON 规则文件或 Mock.js 格式，脱离平台可用
- **校验 + 测试**：内置参数校验和 Postman 式测试界面

---

## 2. 架构决策

### 2.1 后端驱动（已确认）

NestJS 后端驱动架构。Swagger/HAR 解析、Mock 接口动态路由注册、在线服务均在后端完成。前端负责展示和交互。

### 2.2 动态路由注册（已确认）

在 NestJS 主进程内动态注册 Mock 路由。用户激活项目后，后端在运行时创建 `/mock/{slug}/**` 路由处理器，直接在主 API 进程内响应 Mock 请求。

选择理由：
- 单进程部署，运维简单
- 与现有模块化单体架构一致
- 路由热注册/注销，响应快
- 个人项目流量不会成为瓶颈
- 符合"避免无限工程化"原则

### 2.3 在线 Mock 模式（已确认）

A+B 结合模式：
- 项目默认不启动 Mock 服务
- 用户点击"激活服务"后，项目获得持久专属 URL（如 `/mock/ecommerce/**`）
- 激活后长期可用，直到用户主动停用

---

## 3. 功能范围

### 3.1 项目管理

项目的核心作用是**隔离接口**。每个项目有独立的 Mock URL 前缀。

| 功能 | 说明 |
|------|------|
| 创建项目 | 名称 + Slug（URL 标识，自动生成可修改）+ 描述 + 图标 |
| 项目列表 | 卡片式展示，显示状态/分组数/接口数/Mock URL |
| 编辑项目 | 修改名称、描述、图标 |
| 删除项目 | 含旗下所有分组和接口 |
| 激活/停用 | 启动或停止 Mock 在线服务 |

### 3.2 接口管理

| 功能 | 说明 |
|------|------|
| 接口分组 | 单层目录，每个接口只属于一个分组 |
| 创建分组 | 左侧面板内联输入 |
| 编辑/删除分组 | ✏️ 图标触发编辑，删除时含旗下接口 |
| 创建接口 | Method + Path + 分组 + 描述 + 请求参数 Schema + Mock 响应 |
| 编辑接口 | 右侧面板表单 |
| 删除接口 | 确认后删除含 Mock 响应 |

### 3.3 导入功能

| 格式 | 优先级 | 说明 |
|------|--------|------|
| Swagger/OpenAPI JSON/YAML | P0 | 结构化最强、价值最大。自动提取路径/参数/响应 Schema，按 Tags 分组 |
| HAR | P1 | 解析简单，有真实请求/响应数据，但无 Schema 信息 |
| Markdown | P2 | 非结构化，不确定性高，后续考虑 AI 辅助或降级为手动录入辅助 |

Swagger 导入流程：
1. 用户上传 JSON/YAML 文件
2. 后端验证文档格式（OpenAPI 3.0/3.1）
3. 提取 Paths → 生成 Interface 列表
4. 提取参数/请求体 → 生成 requestSchema
5. 提取响应 Schema → 根据 Schema 类型 + Mock.js 生成 MockResponse.body
6. 按 Tags 分组 → 生成 InterfaceGroup
7. 返回预览，用户确认后批量写入

HAR 导入流程：
1. 用户上传 HAR 文件
2. 提取 entries 中的 request/response
3. URL 转为 path
4. 真实响应数据直接作为 MockResponse（非 Mock.js 生成）
5. 不生成 requestSchema

### 3.4 导出功能

多格式支持，用户导出时选择格式：

| 格式 | 说明 |
|------|------|
| JSON 规则文件 | 完整的 Mock 规则 JSON（含路径/方法/响应映射），配合 CLI 或 json-server 使用 |
| Mock.js 格式 | 含 Mock.js 占位符的 JS 文件，可在 webpack/vite 中通过 mock 插件直接拦截 |

首版先实现这两种，后续可扩展其他格式。

### 3.5 辅助功能

**参数校验（Mock 校验级）：**

当请求命中 Mock 接口时，后端根据 requestSchema 校验请求参数是否合法：
- 校验通过 → 正常返回 Mock 响应
- 校验失败 → 返回 400 + 校验错误详情（类似真实后端行为）

**返回 JSON 查看：**

接口详情中提供 JSON 预览/格式化 Tab，支持：
- 语法高亮
- 折叠/展开
- Mock.js 占位符实时渲染预览

**测试请求（内置 Postman）：**

接口详情"测试请求"Tab 中提供：
- 请求栏（Method + URL，自动填充当前接口的 Mock URL）
- 参数编辑（Params / Headers / Body）
- 发送按钮
- 响应展示（状态码 + 耗时 + 大小 + Body/Headers）

---

## 4. 数据模型

### 4.1 首版模型（Interface 1:1 MockResponse）

```
Project ──1:N── InterfaceGroup ──1:N── Interface ──1:1── MockResponse
```

### 4.2 实体定义

**Project（项目）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name | VARCHAR(100) | 项目名称 |
| slug | VARCHAR(50) UNIQUE | URL 标识，如 `ecommerce` |
| description | TEXT | 描述 |
| icon | VARCHAR(10) | 图标 emoji |
| isActive | BOOLEAN | Mock 服务是否激活 |
| createdAt | TIMESTAMP | 创建时间 |
| updatedAt | TIMESTAMP | 更新时间 |

**InterfaceGroup（接口分组）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| name | VARCHAR(100) | 分组名称 |
| projectId | UUID FK | 所属项目 |
| sort | INTEGER | 排序 |
| createdAt | TIMESTAMP | 创建时间 |

**Interface（接口）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| method | ENUM(GET,POST,PUT,PATCH,DELETE) | HTTP 方法 |
| path | VARCHAR(500) | 接口路径，如 `/users/:id` |
| groupId | UUID FK | 所属分组（可 null = 未分组） |
| projectId | UUID FK | 所属项目 |
| description | TEXT | 接口描述 |
| requestSchema | JSONB | 请求参数 Schema（OpenAPI 格式） |
| createdAt | TIMESTAMP | 创建时间 |
| updatedAt | TIMESTAMP | 更新时间 |

**MockResponse（Mock 响应）**

| 字段 | 类型 | 说明 |
|------|------|------|
| id | UUID | 主键 |
| interfaceId | UUID FK UNIQUE | 关联接口（1:1） |
| statusCode | INTEGER | HTTP 状态码，默认 200 |
| headers | JSONB | 响应头 |
| body | JSONB | 响应体（可含 Mock.js 占位符） |
| delay | INTEGER | 模拟延迟（ms），默认 0 |
| useMockJs | BOOLEAN | 是否启用 Mock.js 渲染 |
| updatedAt | TIMESTAMP | 更新时间 |

### 4.3 后续扩展预留

- MockRule（条件匹配规则）：一个接口多条规则，根据请求参数匹配不同响应
- MockResponse 属于 MockRule：每条规则可有多响应（模拟异常概率）
- 当前 1:1 模型是简化版，后续加 MockRule 时向上兼容

---

## 5. 后端 API 设计

### 5.1 管理接口

**项目管理**

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/mock/projects` | 创建项目 |
| GET | `/api/mock/projects` | 项目列表 |
| GET | `/api/mock/projects/:slug` | 项目详情 |
| PATCH | `/api/mock/projects/:slug` | 更新项目 |
| DELETE | `/api/mock/projects/:slug` | 删除项目 |
| POST | `/api/mock/projects/:slug/activate` | 激活 Mock 服务 |
| POST | `/api/mock/projects/:slug/deactivate` | 停用 Mock 服务 |

**分组管理**

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/mock/projects/:slug/groups` | 创建分组 |
| PATCH | `/api/mock/projects/:slug/groups/:id` | 更新分组 |
| DELETE | `/api/mock/projects/:slug/groups/:id` | 删除分组（含旗下接口） |

**接口管理**

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/mock/projects/:slug/interfaces` | 创建接口 |
| GET | `/api/mock/projects/:slug/interfaces` | 接口列表（支持 group 筛选） |
| PATCH | `/api/mock/projects/:slug/interfaces/:id` | 更新接口 |
| DELETE | `/api/mock/projects/:slug/interfaces/:id` | 删除接口 |

**Mock 响应**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/mock/projects/:slug/interfaces/:id/response` | 获取响应 |
| PUT | `/api/mock/projects/:slug/interfaces/:id/response` | 更新响应 |

**导入**

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/mock/projects/:slug/import/swagger` | 导入 Swagger/OpenAPI |
| POST | `/api/mock/projects/:slug/import/har` | 导入 HAR |

**导出**

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/mock/projects/:slug/export?format=json\|mockjs` | 导出 Mock 文件 |

**测试请求**

| 方法 | 路径 | 说明 |
|------|------|------|
| POST | `/api/mock/projects/:slug/test` | 发送测试请求 |

### 5.2 Mock 服务接口（动态注册）

| 路径 | 说明 |
|------|------|
| `{method} /mock/{slug}/{path}` | 动态路由，匹配项目内已注册接口 |

**Mock 请求处理流程：**

```
请求 → /mock/{slug}/{path}
  → 查找 Project（slug 匹配 + isActive=true）
  → 查找 Interface（method + path 匹配）
  → 校验请求参数 vs requestSchema
     → 不匹配：返回 400 + 校验错误详情
  → 获取 MockResponse
  → 如 useMockJs=true：用 Mock.js 渲染 body
  → 应用 delay（如有）
  → 返回响应（statusCode + headers + body）
```

---

## 6. Swagger 解析引擎

### 6.1 Schema → Mock 数据生成策略

| OpenAPI 类型 | Mock.js 占位符 | 示例输出 |
|-------------|---------------|---------|
| `string` + `format=date-time` | `@datetime` | `"2026-05-29 10:30:00"` |
| `string` + `format=email` | `@email` | `"user@example.com"` |
| `string` + `format=url` | `@url` | `"https://example.com"` |
| `string`（无 format） | `@cname` / `@cword` | `"张三"` / `"测试"` |
| `integer` | `@integer(min, max)` | `42` |
| `number` | `@float(min, max, d1, d2)` | `3.14` |
| `boolean` | `@boolean` | `true` |
| `array` + `items` | 递归生成 3-5 条 | `[{...}, {...}]` |
| `object` + `properties` | 递归展开 | `{ name: "张三", age: 25 }` |
| `$ref` 引用 | 解析后递归 | — |
| `enum` | `@pick([values])` | 随机取一个值 |

### 6.2 关键技术点

- **`$ref` 解析**：维护引用解析上下文，防止循环引用
- **YAML 支持**：使用 `js-yaml` 库先转为 JSON
- **Tags → 分组**：OpenAPI 的 tags 直接映射为 InterfaceGroup

---

## 7. 前端页面设计

### 7.1 路由结构

| 路由 | 页面 |
|------|------|
| `/mock` | 项目列表（卡片入口） |
| `/mock/:slug` | 接口管理（分组 + 接口列表 + 详情） |
| `/mock/:slug/settings` | 项目设置（基础信息/激活/删除） |

- 导入/导出 → 抽屉/对话框覆盖层，不占独立路由
- 测试请求 → 接口详情 Tab 内的一个面板

### 7.2 层级 1：项目列表

卡片式入口，与 Portal 首页应用卡片风格统一。每张卡片展示：
- 项目图标
- 项目名称
- 状态标签（运行中 / 未激活）
- 描述
- 统计（分组数 / 接口数 / Mock URL）
- 点击卡片进入接口管理

### 7.3 层级 2：接口管理

**布局**：左侧面板 + 右侧详情

**左侧面板**：
- 顶部：面包屑（← 项目列表 / 项目名 + 状态标签）+ 操作按钮（导入/导出/激活）
- 主体：分组折叠树
  - 每个分组可展开/折叠
  - 展开后显示该分组下所有接口（Method 标签 + Path）
  - 选中接口高亮
  - 分组名称旁有 ✏️ 编辑图标
  - 底部"+ 添加分组"内联输入

**右侧详情**：
- 接口标题（Method 标签 + Path + 描述）
- 四个 Tab：Mock 响应 / 请求参数 / JSON 预览 / 测试请求
- Mock 响应 Tab：状态码 + 延迟 + Mock.js 开关 + 代码编辑器
- 请求参数 Tab：Schema 展示（参数名/类型/必填/描述）
- JSON 预览 Tab：格式化 JSON + Mock.js 占位符实时渲染
- 测试请求 Tab：Postman 式界面

### 7.4 编辑交互

| 编辑对象 | 交互方式 | 说明 |
|---------|---------|------|
| 项目 | 对话框 | 名称 + Slug（自动生成）+ 描述 + 图标选择 |
| 分组 | 左侧面板内联 | ✏️ 进入编辑态，新建时直接内联输入框 |
| 接口 | 右侧面板表单 | Method + Path + 分组下拉 + 描述 + Schema + 响应 |
| Mock 响应 | Monaco Editor | 代码/可视化双模式、Mock.js 补全、实时预览、"从 Schema 生成" |

### 7.5 Mock 响应编辑器特性

- Monaco Editor 作为代码编辑器
- Mock.js 占位符自动补全面板
- 实时预览（编辑时下方实时渲染 Mock.js 输出）
- "从 Schema 生成"按钮（根据 requestSchema 自动生成 Mock 响应模板）
- 格式化/折叠/语法高亮

---

## 8. NestJS 模块结构

```
apps/api/src/modules/mock/
├── mock.module.ts              # 模块定义
├── mock.controller.ts          # 管理接口 Controller
├── mock.service.ts             # 业务逻辑 Service
├── mock-proxy.controller.ts    # 动态路由 Controller（处理 Mock 请求）
├── dto/
│   ├── create-project.dto.ts
│   ├── update-project.dto.ts
│   ├── create-group.dto.ts
│   ├── create-interface.dto.ts
│   ├── update-interface.dto.ts
│   ├── update-response.dto.ts
│   └── import-result.dto.ts    # 导入结果
├── entities/
│   ├── project.entity.ts
│   ├── interface-group.entity.ts
│   ├── interface.entity.ts
│   └── mock-response.entity.ts
├── parser/
│   ├── swagger.parser.ts       # OpenAPI 解析器
│   ├── har.parser.ts           # HAR 解析器
│   ├── schema-to-mock.ts      # Schema → Mock.js 生成器
│   └── parser.interface.ts    # 解析器接口定义
├── services/
│   ├── route-manager.service.ts # 动态路由注册/注销
│   ├── mock-renderer.service.ts # Mock.js 渲染服务
│   └── schema-validator.service.ts # 请求参数校验
└── export/
    ├── json-exporter.ts        # JSON 规则文件导出
    └── mockjs-exporter.ts      # Mock.js 格式导出
```

---

## 9. 前端目录结构

```
apps/mock-platform/src/
├── bootstrap.tsx               # micro-app 子应用引导
├── App.tsx                     # 路由配置
├── pages/
│   ├── project-list/           # 项目列表页
│   │   ├── ProjectListPage.tsx
│   │   ├── ProjectCard.tsx
│   │   └── CreateProjectDialog.tsx
│   ├── interface-management/   # 接口管理页
│   │   ├── InterfaceManagementPage.tsx
│   │   ├── GroupSidebar.tsx    # 左侧分组+接口面板
│   │   ├── InterfaceDetail.tsx # 右侧接口详情
│   │   ├── MockResponseEditor.tsx
│   │   ├── RequestSchemaView.tsx
│   │   ├── JsonPreview.tsx
│   │   └── TestRequest.tsx    # Postman 式测试
│   └── project-settings/       # 项目设置页
│       └── ProjectSettingsPage.tsx
├── components/
│   ├── ImportDrawer.tsx        # 导入抽屉
│   ├── ExportDrawer.tsx        # 导出抽屉
│   ├── MethodTag.tsx           # HTTP Method 标签
│   └── JsonEditor.tsx          # Monaco Editor 封装
├── stores/
│   └── mock-store.ts           # Zustand 局部状态
└── types/
    └── mock.types.ts           # 前端类型定义
```

---

## 10. MVP 范围与分期

### v0.1 — 骨架可跑

- 项目 CRUD
- 接口分组 + 接口 CRUD（手动创建）
- Mock 响应编辑（纯 JSON，无 Mock.js 渲染）
- 动态路由注册/注销（激活/停用）
- 基础页面布局

### v0.2 — 导入能力

- Swagger/OpenAPI 解析 + 导入
- Schema → Mock.js 自动生成
- HAR 解析 + 导入
- Mock.js 渲染（后端）

### v0.3 — 完善体验

- 参数校验（Mock 校验级）
- 测试请求面板（内置 Postman）
- 导出功能（JSON 规则 + Mock.js 格式）
- Monaco Editor + Mock.js 补全
- JSON 预览/格式化

### v0.4 — 增强打磨

- MockRule 条件匹配（1 接口多规则）
- Markdown 导入（AI 辅助？）
- 更多导出格式
- 请求日志/调用统计

---

## 11. 设计决策记录

| 决策 | 选项 | 结论 | 理由 |
|------|------|------|------|
| 架构路线 | A 后端驱动 / B 前端生成 | A | 与 NestJS 模块化单体契合，能力完整 |
| Mock 服务方式 | A 动态路由 / B 独立进程 | A | 简单、一致、避免过度工程 |
| 在线 Mock 模式 | A 持久 / B 按需 / C 离线 | A+B | 激活后持久可用，不激活不占资源 |
| 导入优先级 | Swagger / HAR / MD | Swagger > HAR > MD | 价值递减，MD 不确定性高 |
| 接口分组 | 扁平 Tag / 单层目录 / 树形 | 单层目录 | 清晰简单，避免过度设计 |
| 参数校验 | 展示级 / Mock 校验级 / 完整测试级 | B+C | 校验+测试，面试"能玩" |
| 导出格式 | 单一 / 多格式 | 多格式 | JSON 规则 + Mock.js 首版 |
| 数据模型 | 1:N 规则 / 1:1 简化 | 1:1 首版 | MVP 简化，后续加 MockRule 向上兼容 |
