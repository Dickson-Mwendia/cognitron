import { LoginForm } from './login-form'
import { Logo } from '@/components/Logo'

export const metadata = {
  title: 'Sign In',
  description: 'Sign in to your Cognitron account',
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-navy-dark to-navy flex items-center justify-center p-4 relative overflow-hidden">
      {/* Subtle gold accent glow */}
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-teal/5 rounded-full blur-3xl pointer-events-none" />
      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex justify-center">
            <Logo size="lg" on="dark" />
          </div>
          <p className="text-slate-light mt-3 text-sm">Premium learning, reimagined</p>
        </div>

        <LoginForm />
      </div>
    </div>
  )
}
