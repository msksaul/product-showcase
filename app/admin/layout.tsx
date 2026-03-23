import { LoaderIcon } from 'lucide-react';
import { Suspense } from "react";

const LoadingUI = () => (
  <div className='wrapper min-h-screen flex items-center justify-center gap-2'>
    <LoaderIcon className='size-4 animate-spin'/> Loading Admin...
  </div>
)

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Suspense fallback={<LoadingUI />}>
        {children}
      </Suspense>
    </div>
  );
}