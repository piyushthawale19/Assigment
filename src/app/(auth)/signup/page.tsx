import { SignupForm } from '@/components/auth/signup-form';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <Card className="w-full max-w-md shadow-2xl hover-glow card-interactive border-purple-200">
      <CardHeader className="text-center space-y-2">
        <CardTitle className="text-3xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
          Join RoleVault
        </CardTitle>
        <CardDescription>
          Create your account and start managing roles efficiently.
          <br />
          <span className="text-purple-600 font-medium">Your secure workspace awaits</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignupForm />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-semibold text-primary underline-offset-4 hover:underline hover:text-violet-600 transition-colors">
            Login
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
