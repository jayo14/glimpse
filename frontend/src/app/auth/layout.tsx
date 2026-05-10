import Link from 'next/link';
import { CameraRotate } from '@phosphor-icons/react/dist/ssr';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen gl-gradient-event">
      <div className="gl-container grid min-h-screen items-center py-10 lg:grid-cols-2">
        <div className="hidden pr-10 lg:block">
          <p className="gl-section-label mb-6">Authentication</p>
          <h1 className="gl-heading-display-lg mb-6 text-white">Welcome to Glimpse.</h1>
          <p className="gl-body-lg text-[#CBD5E1]">
            Deliver photos guests actually find — and remember you for.
          </p>
          <Link href="/" className="mt-8 inline-flex items-center gap-2 text-[#FFD54F]">
            <CameraRotate size={20} /> Back to landing page
          </Link>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
