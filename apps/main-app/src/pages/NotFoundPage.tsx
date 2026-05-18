import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3">
      <h1 className="text-4xl font-bold">404</h1>
      <p className="text-neutral-500">页面不存在</p>
      <Link to="/" className="text-brand-600 hover:underline">
        回到首页
      </Link>
    </div>
  );
}
