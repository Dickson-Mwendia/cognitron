'use client';

interface RoleGuardProps {
  allowedRoles: Array<'student' | 'parent' | 'coach' | 'admin'>;
  userRole: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

function DefaultFallback() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
      <div className="w-16 h-16 rounded-full bg-navy-light flex items-center justify-center mb-4">
        <span className="text-2xl">🔒</span>
      </div>
      <h2 className="text-lg font-heading font-bold text-white mb-2">
        Access Denied
      </h2>
      <p className="text-sm text-slate-light max-w-sm">
        You don&apos;t have permission to view this page. If you believe this is
        an error, please contact support.
      </p>
    </div>
  );
}

export function RoleGuard({
  allowedRoles,
  userRole,
  children,
  fallback,
}: RoleGuardProps) {
  if (allowedRoles.includes(userRole as 'student' | 'parent' | 'coach' | 'admin')) {
    return <>{children}</>;
  }

  return <>{fallback ?? <DefaultFallback />}</>;
}
