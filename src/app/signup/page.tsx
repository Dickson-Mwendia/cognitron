import { SignupForm } from './signup-form'

export const metadata = {
  title: 'Create Account',
  description: 'Create your Cognitron account and start learning',
}

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-navy flex items-center justify-center p-4 py-12">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2">
            <span className="text-gold text-2xl">⬡</span>
            <span className="font-heading text-3xl text-white font-bold">Cognitron</span>
          </div>
          <p className="text-slate-light mt-2">Premium learning, reimagined</p>
        </div>

        <SignupForm />
      </div>
    </div>
  )
}
