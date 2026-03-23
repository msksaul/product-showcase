import FeaturedProducts from '@/components/landing-page/featured-products';
import HeroSection from '@/components/landing-page/hero-section';
import RecentlyLaunchedProducts from '@/components/landing-page/recently-launched-products';
import ProductSkeleton from '@/components/products/product-skeleton';
import { auth } from '@clerk/nextjs/server';
import { Suspense } from 'react';

export default async function Home() {

  const { userId } = await auth()

  return (
    <div>
      <HeroSection />
      <FeaturedProducts userId={userId}/>
      <Suspense fallback={<ProductSkeleton />}>
        <RecentlyLaunchedProducts userId={userId}/>
      </Suspense>
    </div>
  );
}
