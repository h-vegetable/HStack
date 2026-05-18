import { Button } from '@hstack/shared-ui';
import { Link } from 'react-router-dom';

export function HomePage() {
  return (
    <div className="mx-auto max-w-3xl p-8">
      <h1 className="text-3xl font-bold">HStack</h1>
      <p className="mt-2 text-neutral-600 dark:text-neutral-400">
        Personal tech portfolio · micro-frontend monorepo.
      </p>

      <section className="mt-8 grid gap-4 sm:grid-cols-2">
        <Card title="Portal" desc="管控中心：dashboard / changelog / stats" to="/portal" />
        <Card title="Mock" desc="Mock 平台：解析 Swagger 自动生成数据" to="/mock" />
        <Card title="House Hunting" desc="看房助手：清单/标签/对比" to="/house-hunting" />
        <Card title="Component Hub" desc="组件中心：分类/预览/下载" to="/component-hub" />
      </section>
    </div>
  );
}

function Card({ title, desc, to }: { title: string; desc: string; to: string }) {
  return (
    <Link
      to={to}
      className="block rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-neutral-800 dark:bg-neutral-950"
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">{desc}</p>
      <Button className="mt-4" size="sm" color="primary" variant="flat">
        进入 →
      </Button>
    </Link>
  );
}
