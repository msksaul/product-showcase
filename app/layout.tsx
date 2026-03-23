import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Header from '@/components/common/header';
import Footer from '@/components/common/footer';
import { ClerkProvider } from '@clerk/nextjs';
import { Suspense } from 'react';
import { LoaderIcon } from 'lucide-react';

const outfit = Outfit({ subsets: ['latin'] })

const LoadingUI = () => (
  <div className='wrapper min-h-screen flex items-center justify-center gap-2'>
    <LoaderIcon className='size-4 animate-spin'/> Loading...
  </div>
)

export const metadata: Metadata = {
  title: "PShare",
  description: "Platform to share, give feedback and discover new products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${outfit.className} antialiased`}
        >
            <Header />
             <Suspense fallback={<LoadingUI />}>
              {children}
             </Suspense>
            <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
