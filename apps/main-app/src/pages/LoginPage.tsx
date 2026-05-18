import { Button } from '@heroui/react';
import { useAuthStore } from '@hstack/shared-auth';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const signIn = useAuthStore((s) => s.signIn);
  const navigate = useNavigate();

  function handleMockLogin() {
    signIn({
      user: {
        id: 'demo',
        username: 'demo-user',
        roles: ['user'],
      },
      token: 'demo-token',
    });
    navigate('/');
  }

  return (
    <div className="flex h-full items-center justify-center">
      <div className="w-80 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
        <h2 className="text-xl font-semibold">Sign in</h2>
        <p className="mt-1 text-sm text-neutral-500">骨架阶段使用 Mock 登录。</p>
        <Button color="primary" className="mt-6 w-full" onPress={handleMockLogin}>
          Mock Sign-in
        </Button>
      </div>
    </div>
  );
}
