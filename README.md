# HStack

> 个人技术作品集 · pnpm + Turborepo monorepo · React 微前端

## 技术栈

- **包管理**：pnpm 10 + Turborepo 2
- **前端**：React 18 · Vite 5 · TypeScript 5 · TailwindCSS 3 · HeroUI · Zustand · react-router 6 · i18next
- **微前端**：@micro-zoe/micro-app
- **后端**（待建）：NestJS + TypeORM + PostgreSQL
- **工程化**：ESLint 9 (Flat) · Prettier · Husky · lint-staged · commitlint · Changesets
- **监控**（待接）：Sentry

## 目录速览

```
HStack/
├── apps/
│   └── main-app/              # 基座壳（已就绪 ✅）
│       ├── src/
│       │   ├── main.tsx       # 入口 + micro-app.start
│       │   ├── App.tsx        # I18n + HeroUI + Auth + Router
│       │   ├── router.tsx
│       │   ├── layout/        # Header / Sidebar / MainLayout
│       │   ├── pages/         # Home / Login / 404
│       │   ├── micro-app/     # registry + Container
│       │   ├── stores/        # Zustand 全局态
│       │   └── styles/
│       └── tailwind.config.ts
│
├── packages/
│   ├── shared-config/         # Vite / Tailwind 配置工厂
│   ├── shared-styles/         # 设计 Token + CSS + HeroUI 主题
│   ├── shared-types/          # 横切类型（AuthUser / ApiResponse 等）
│   ├── shared-utils/          # format / storage / isInMicroApp
│   ├── shared-i18n/           # i18next 工厂 + zh-CN / en-US
│   ├── shared-auth/           # Zustand 鉴权（embedded / standalone 双模式）
│   └── shared-ui/             # HeroUI 薄封装 + metadata
│
├── .agent/documents/
│   ├── outline.html           # 架构设计文档（rev.2）
│   └── outline.md             # 原始需求
│
├── .changeset/                # 版本管理
├── .husky/                    # pre-commit + commit-msg
├── tsconfig.base.json
├── turbo.json
├── eslint.config.js
├── pnpm-workspace.yaml
└── package.json
```

## 快速上手

```bash
# 安装
pnpm install

# 启动 main-app（默认 5173）
pnpm dev

# 类型检查（全包）
pnpm typecheck

# Lint
pnpm lint

# 格式化
pnpm format
```

打开 <http://localhost:5173/> 应看到：顶栏 + 侧栏 Layout、首页四张子应用卡片、`/portal` `/mock` `/house-hunting` `/component-hub` 四条占位路由（micro-app 容器尚未连接到真实子应用）。

## 关键架构决策（已确认）

| 主题       | 决策                                                                                                          | 原因                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------- |
| 状态管理   | **Zustand**                                                                                                   | 无 Provider，规避 React Context 不穿透 Shadow DOM |
| 数据库     | **PostgreSQL**                                                                                                | JSONB 字段适配 Mock / 看房动态结构                |
| 鉴权       | 共享包 + 基座注入 + 子应用消费                                                                                | `useAuth()` 自动检测 embedded / standalone        |
| 类型分层   | shared-types 仅放横切；DTO 就近放 `apps/api/src/modules/{domain}/dto`（保持纯 type，校验拆 `*.validator.ts`） | 避免一动全重建，避免装饰器污染前端 bundle         |
| 微前端通信 | micro-app `data` 桥（基座下发 + 子应用 dispatch 上行）                                                        | 事件命名 `领域:动作`                              |
| 样式       | shared-styles（零依赖 Token + CSS）← shared-ui                                                                | 子应用可单独消费样式                              |

详见 [outline.html](./.agent/documents/outline.html)。

## 当前进度

- [x] 根级工程化（pnpm/turbo/ts/eslint/prettier/husky/changeset）
- [x] packages/\* 6 个共享包骨架
- [x] apps/main-app 完整可跑骨架
- [ ] apps/portal（管控中心）
- [ ] apps/mock（Mock 平台）
- [ ] apps/house-hunting（看房助手）
- [ ] apps/component-hub（组件中心）
- [ ] apps/api（NestJS 后端）
- [ ] CI（GitHub Actions）
- [ ] Sentry 实际接入
- [ ] infra/（Docker / k8s）

## 已知 TODO / 待决

- **HeroUI peer 警告**：当前依赖解析到 `@heroui/theme@2.4.26`（要求 Tailwind 4），项目锁 Tailwind 3。三选一：
  1. 不动（警告不影响运行）
  2. 降级 HeroUI 到 `2.4.8`
  3. 升级到 Tailwind 4（架构重写一轮）
- micro-app 是否启用 `shadowDOM`：当前注释关闭，待第一个真实子应用接入时再决定
- AuthProvider 的 bootstrap 函数：当前为空，等 apps/api 出来后接 `/me` 接口

## 提交规范

约定式提交（Conventional Commits），由 commitlint 把关：

```
feat:      新功能
fix:       Bug 修复
docs:      文档
style:     格式
refactor:  重构
perf:      性能
test:      测试
build:     构建
ci:        CI
chore:     杂项
```

例：`feat(main-app): add sidebar collapse state`

## License

Private · personal portfolio.
