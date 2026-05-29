# HStack 组件库需求文档

## 1. 概述

HStack 组件库采用**三层架构**设计，为项目提供从原子组件到页面级组合的完整 UI 解决方案：

```
┌─────────────────────────────────────────────┐
│  Layer 3 · Component Hub（组件展示与文档）    │
├─────────────────────────────────────────────┤
│  Layer 2 · Composite（组合组件）             │
├─────────────────────────────────────────────┤
│  Layer 1 · Common（通用组件）                │
└─────────────────────────────────────────────┘
```

- **通用组件**：基于 HeroUI 二次封装的原子级 UI 组件
- **组合组件**：将通用组件编排为业务无关的页面级片段，内置交互流程
- **Component Hub**：自建的组件展示平台，提供实时预览、示例代码、API 文档

---

## 2. 通用组件（Layer 1 · Common）

### 2.1 设计原则

| 原则 | 说明 |
|------|------|
| 薄封装 | 基于 HeroUI 做主题对齐与默认值统一，不重新造轮子 |
| 类型完备 | 每个 Props 完整导出 TypeScript 类型，支持泛型 |
| Token 驱动 | 颜色、间距、圆角等统一走 `shared-styles/tokens` |
| 受控优先 | 同时支持受控/非受控模式，优先受控 |

### 2.2 组件清单

#### 2.2.1 Table

基于 `@heroui/table` 封装的数据表格组件。

| 能力 | 说明 |
|------|------|
| 列配置 | 支持通过 `columns` 配置项声明列定义，包含 key、label、width、align、render 等 |
| 数据绑定 | 支持 `dataSource` 传入数据数组，支持泛型 `<T>` |
| 分页 | 内置分页器，支持前端分页和远程分页（传入 `total` + `onPageChange`） |
| 排序 | 支持单列排序，`onSortChange` 回调 |
| 加载态 | `loading` prop 控制骨架屏/Spinner |
| 空状态 | `emptyContent` 可自定义空数据提示 |
| 行选择 | 可选的行选择能力（单选/多选），`selectedKeys` + `onSelectionChange` |
| 行操作 | 支持行尾操作列（编辑/删除等），通过 column 配置 `type: 'action'` |
| 自适应 | 内容区自适应填满父容器高度，表头固定、内容滚动 |

```tsx
// 基础用法
<Table<User>
  columns={[
    { key: 'name', label: '姓名' },
    { key: 'email', label: '邮箱' },
    { key: 'actions', label: '操作', type: 'action', render: (row) => <EditButton /> },
  ]}
  dataSource={users}
  loading={loading}
  pagination={{ page: 1, total: 100, pageSize: 10, onChange: setPage }}
/>
```

#### 2.2.2 Dialog

基于 `@heroui/modal` 封装的模态对话框。

| 能力 | 说明 |
|------|------|
| 尺寸 | 预设 `sm / md / lg / xl / full` 五档，默认 `md` |
| 头部 | `title` + 可选 `subtitle`，自动渲染关闭按钮 |
| 底部 | 支持 `footer` 插槽，提供 `DialogFooter` 辅助组件 |
| 滚动 | 内容区超长时自动滚动，头部/底部固定 |
| 动画 | 使用 framer-motion 入场/退场，遵循 `tokens.transition` |
| 关闭行为 | `closeOnOverlayClick` + `closable` 控制 |

```tsx
<Dialog isOpen={open} title="编辑用户" onClose={() => setOpen(false)} size="lg">
  <EditForm />
  <Dialog.Footer>
    <Button variant="light" onPress={onCancel}>取消</Button>
    <Button onPress={onConfirm}>确认</Button>
  </Dialog.Footer>
</Dialog>
```

#### 2.2.3 Confirm

命令式确认弹窗，基于 Dialog 二次封装。

| 能力 | 说明 |
|------|------|
| 命令式调用 | `confirm({ title, content, ... }) => Promise<boolean>` |
| 类型 | `info / warning / danger` 三种预设风格 |
| 自定义 | 支持自定义 icon、按钮文案 |
| 异步确认 | `onConfirm` 返回 Promise 时自动 loading |

```tsx
const ok = await confirm({
  title: '删除确认',
  content: '此操作不可撤销，确定删除吗？',
  type: 'danger',
  confirmText: '确认删除',
});
```

#### 2.2.4 Card

基于 `@heroui/card` 封装的卡片容器。

| 能力 | 说明 |
|------|------|
| 变体 | `elevated / outlined / ghost` 三种风格 |
| 交互态 | `hoverable` 启用悬浮效果（微抬升 + 边框高亮） |
| 头部/底部 | `header` / `footer` 插槽 |
| 自适应 | 内容区 flex-grow 填满，配合组合组件使用 |

```tsx
<Card variant="outlined" hoverable>
  <Card.Header>标题</Card.Header>
  <Card.Body>内容</Card.Body>
  <Card.Footer>操作</Card.Footer>
</Card>
```

### 2.3 Category 分类

```ts
type ComponentCategory =
  | 'inputs'       // 输入类：Button, Input, Select, ...
  | 'feedback'     // 反馈类：Dialog, Confirm, Toast, ...
  | 'layout'       // 布局类：Card, Divider, ...
  | 'navigation'   // 导航类：Tabs, Breadcrumb, ...
  | 'data-display' // 数据展示：Table, Tag, ...
```

现有组件归属：

| 组件 | Category |
|------|----------|
| Button | inputs |
| Table | data-display |
| Dialog | feedback |
| Confirm | feedback |
| Card | layout |

---

## 3. 组合组件（Layer 2 · Composite）

### 3.1 设计原则

| 原则 | 说明 |
|------|------|
| 流程内置 | 组合组件不是简单拼装，而是内置完整的交互流程（搜索→加载→展示→分页） |
| 业务无关 | 不耦合任何业务逻辑，通过 props/config 注入数据和回调 |
| 扩展点 | 通过 render props / slots 暴露扩展点，允许自定义局部渲染 |
| 自适应 | 布局自适应容器尺寸，筛选区折叠/展开、表格列自适应 |
| 单一职责 | 每个组合组件解决一类页面模式 |

### 3.2 组件清单

#### 3.2.1 TablePage — 列表页全套

将筛选、表格、分页器组合为一整套列表页方案，是最核心的组合组件。

**布局结构**：

```
┌──────────────────────────────────────┐
│  Header（标题 + 操作按钮区）          │
├──────────────────────────────────────┤
│  FilterBar（筛选条件区）              │
│  · 支持折叠/展开                     │
│  · 支持自定义筛选表单                │
├──────────────────────────────────────┤
│  Table（数据表格区）                  │
│  · 自适应填满剩余高度                │
│  · 表头固定、内容滚动                │
├──────────────────────────────────────┤
│  Pagination（分页器）                 │
└──────────────────────────────────────┘
```

**核心能力**：

| 能力 | 说明 |
|------|------|
| 筛选区 | 支持声明式 `filters` 配置自动生成筛选表单；支持 `filterRender` 自定义筛选区 |
| 筛选折叠 | 筛选项超过 N 个时自动折叠，点击「更多」展开 |
| 自动请求 | `onSearch` 回调在筛选/分页变化时自动触发，传入当前筛选条件 + 分页参数 |
| 加载态 | 自动管理 loading 状态，表格 + 筛选区统一 |
| 分页 | 内置前端分页或远程分页，与 Table 分页联动 |
| 自适应 | 整体 flex 布局填满父容器；筛选区折叠时表格自动扩展 |
| 批量操作 | 可选的选中行批量操作栏（出现在表格上方） |
| 空状态 | 统一空数据展示 |

```tsx
<TablePage<User>
  title="用户管理"
  columns={columns}
  dataSource={users}
  loading={loading}
  filters={[
    { key: 'name', label: '姓名', type: 'input' },
    { key: 'status', label: '状态', type: 'select', options: statusOptions },
    { key: 'dateRange', label: '创建时间', type: 'dateRange' },
  ]}
  onSearch={async (filter, pagination) => {
    const { data } = await fetchUsers({ ...filter, ...pagination });
    return { list: data.list, total: data.total };
  }}
  actions={<Button>新增用户</Button>}
  batchActions={[
    { key: 'delete', label: '批量删除', onPress: handleBatchDelete },
  ]}
/>
```

#### 3.2.2 FormDialog — 表单弹窗

Dialog + 表单的组合，统一新增/编辑弹窗模式。

| 能力 | 说明 |
|------|------|
| 模式 | `create / edit` 两种模式，自动切换标题和按钮文案 |
| 表单配置 | 支持声明式 `fields` 配置自动生成表单 |
| 校验 | 内置表单校验，提交前自动 validate |
| 异步提交 | `onSubmit` 返回 Promise 时按钮自动 loading |
| 重置 | 关闭时自动重置表单 |

```tsx
<FormDialog<User>
  isOpen={open}
  mode="edit"
  title="编辑用户"
  values={currentUser}
  fields={[
    { key: 'name', label: '姓名', type: 'input', required: true },
    { key: 'email', label: '邮箱', type: 'input', rules: [{ type: 'email' }] },
  ]}
  onSubmit={async (values) => { await updateUser(values); }}
  onClose={() => setOpen(false)}
/>
```

#### 3.2.3 DetailCard — 详情卡片

Card + 描述列表的组合，展示详情信息。

| 能力 | 说明 |
|------|------|
| 描述列表 | 支持声明式 `items` 配置自动生成键值对展示 |
| 分组 | 支持多个分组，每组有标题 |
| 自定义渲染 | 单个 item 支持 `render` 自定义渲染逻辑 |
| 操作区 | 可选的头部操作按钮 |

```tsx
<DetailCard
  title="用户详情"
  groups={[
    {
      title: '基本信息',
      items: [
        { label: '姓名', value: user.name },
        { label: '邮箱', value: user.email },
        { label: '头像', value: user.avatar, render: (v) => <Avatar src={v} /> },
      ],
    },
  ]}
  actions={<Button size="sm">编辑</Button>}
/>
```

### 3.3 组合组件归属

组合组件放在 `@hstack/shared-ui` 包内，通过子路径导出：

```ts
// 导出路径规划
export * from './composite/TablePage';
export * from './composite/FormDialog';
export * from './composite/DetailCard';
```

**理由**：
- 组合组件依赖通用组件，同包可以零成本直接 import
- 包体量可控，组件数量有限（预计 5~8 个），无需拆包
- 通过 tree-shaking 不会增加未使用组件的打包体积

---

## 4. Component Hub（Layer 3 · 组件展示与文档）

### 4.1 定位

自建的组件展示平台，作为 HStack monorepo 内的一个 app（`apps/component-hub`），消费 `@hstack/shared-ui` 的组件和元数据。

### 4.2 核心功能

#### 4.2.1 组件目录

- 从 `shared-ui/metadata` 的 `componentCatalog` 自动生成目录列表
- 按分类（inputs / feedback / layout / navigation / data-display）分组展示
- 卡片形式展示组件名、描述、缩略预览
- 支持搜索过滤

#### 4.2.2 实时预览

- 点击组件进入详情页，顶部为**可交互的实时预览区**
- 预览区支持调整尺寸（desktop / tablet / mobile）
- 预览区基于 iframe 或 CSS containment 隔离样式
- 预览区内容来自组件的 demo 文件

#### 4.2.3 用法示例

- 每个组件提供 1~N 个示例（基础用法、高级用法、特殊场景）
- 示例代码高亮展示，支持一键复制
- 示例代码与预览联动，修改代码可实时刷新预览（可选，v2 考虑）
- 示例以独立 `.demo.tsx` 文件存放，按需懒加载

```
shared-ui/src/components/
  Button.tsx
  Button.demo.tsx    ← 示例文件
```

#### 4.2.4 API 文档

从 TypeScript 类型定义自动提取，生成结构化文档：

| 文档类型 | 提取来源 | 展示形式 |
|----------|----------|----------|
| Props | 组件 `XXXProps` 类型 | 表格：属性名 / 类型 / 默认值 / 说明 |
| Events | Props 中的 `on*` 回调 | 表格：事件名 / 参数类型 / 说明 |
| Methods | `useImperativeHandle` 暴露的方法 | 表格：方法名 / 参数 / 返回值 / 说明 |
| Slots | Props 中的 `children` / `render*` | 表格：插槽名 / 类型 / 说明 |

**提取策略**：
- 使用 `react-docgen-typescript` 或自定义 AST 解析提取类型信息
- 支持 JSDoc `@default` / `@description` 标注
- 提取结果作为构建产物输出到 metadata，Component Hub 消费

### 4.3 路由结构

```
/                        → 首页（组件概览）
/components              → 组件列表（按分类）
/components/:name        → 组件详情（预览 + 示例 + API）
/components/:name/:demo  → 特定示例（可选）
```

### 4.4 技术方案

| 项 | 选型 | 说明 |
|----|------|------|
| 框架 | React 18 + Vite 5 | 与主项目一致 |
| 路由 | react-router 6 | 与主项目一致 |
| 样式 | TailwindCSS 3 | 与主项目一致 |
| 代码高亮 | Prism.js / Shiki | 示例代码语法高亮 |
| 类型提取 | react-docgen-typescript | 从 .tsx 自动提取 Props |
| 构建 | Vite | HMR 开发体验好 |
| 部署 | 与主项目一起或独立部署 | 后续决定 |

### 4.5 数据流

```
shared-ui/src/
  components/Button.tsx          ← 组件源码
  components/Button.demo.tsx     ← 示例代码
  metadata.ts                    ← 组件目录 + 元数据
       │
       ▼ (构建时提取)
component-hub/
  读取 metadata → 渲染目录
  读取 demo 文件 → 渲染预览
  解析 Props 类型 → 渲染 API 表格
```

---

## 5. 目录结构规划

```
packages/shared-ui/src/
  components/                    ← Layer 1 通用组件
    Button.tsx
    Button.demo.tsx
    Table.tsx
    Table.demo.tsx
    Dialog.tsx
    Dialog.demo.tsx
    Confirm.tsx
    Confirm.demo.tsx
    Card.tsx
    Card.demo.tsx
  composite/                     ← Layer 2 组合组件
    TablePage.tsx
    TablePage.demo.tsx
    FormDialog.tsx
    FormDialog.demo.tsx
    DetailCard.tsx
    DetailCard.demo.tsx
  index.ts                       ← 统一导出
  metadata.ts                    ← 组件目录元数据

apps/component-hub/              ← Layer 3 展示平台
  src/
    pages/
      HomePage.tsx
      ComponentListPage.tsx
      ComponentDetailPage.tsx
    components/
      ComponentCard.tsx
      DemoPreview.tsx
      CodeBlock.tsx
      PropsTable.tsx
    router.tsx
    App.tsx
```

---

## 6. 优先级与里程碑

### P0 — 先跑通链路

1. 通用组件：Table / Dialog / Confirm / Card
2. metadata 体系完善：category 扩展、demoPath 落地
3. Component Hub 骨架：目录页 + 详情页 + 实时预览

### P1 — 补全核心体验

4. 组合组件：TablePage（最优先，使用频率最高）
5. API 文档自动提取
6. 示例代码高亮 + 一键复制

### P2 — 完善与增强

7. 组合组件：FormDialog / DetailCard
8. 预览区响应式切换（desktop / tablet / mobile）
9. 更多通用组件按需添加
