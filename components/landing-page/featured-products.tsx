import { ArrowUpRightIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'
import SectionHeader from '../common/section-header'
import { Button } from '../ui/button'
import ProductCard from '../products/product-card'


const featuredProducts = [
  {
    id: 1,
    name: 'AwesomeApp',
    description: 'A toolkit for everything',
    tags: ['SaaS', 'Global'],
    votes: 524,
    isFeatured: true
  },
  {
    id: 2,
    name: 'AwesomeApp DD',
    description: 'A toolkit for everything',
    tags: ['SaaS', 'Global', 'Finances'],
    votes: 300,
    isFeatured: true
  }
]

const FeaturedProducts = () => {
  return (
    <section className='py-20 bg-muted/20'>
      <div className='wrapper'>
        <div className='flex items-center justify-between mb-8'>
          <SectionHeader
            title='Featured Today'
            icon={StarIcon}
            description='Top picks from our community this week'
          />
          <Button variant={'outline'} asChild className='hidden sm:flex'>
            <Link href={'/explore'}>
              View All <ArrowUpRightIcon className='size-4'/>
            </Link>
          </Button>
        </div>
        <div className='grid-wrapper'>
          {featuredProducts.map(product => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedProducts