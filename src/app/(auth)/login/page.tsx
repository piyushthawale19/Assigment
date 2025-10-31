import { LoginForm } from '@/components/auth/login-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <Card className="w-full max-w-md shadow-2xl hover-glow card-interactive border-purple-200">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
          Login to RoleVault
        </CardTitle>
        <CardDescription>
          Enter your credentials to access your dashboard. <br />
          <span className="text-purple-600 font-medium">Experience the power of role-based management</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary underline-offset-4 hover:underline hover:text-violet-600 transition-colors">
            Sign up
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
