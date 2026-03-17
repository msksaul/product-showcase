import { CalendarIcon, RocketIcon } from 'lucide-react'
import SectionHeader from '../common/section-header'
import ProductCard from '../products/product-card'
import EmptyState from '../common/empty-state'

const recentlyLaunchedProducts = [
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

const RecentlyLaunchedProducts = () => {
  return (
    <section className='py-20'>
      <div className='wrapper space-y-12'>
        <SectionHeader 
          title='Recently Launched'
          icon={RocketIcon}
          description='Discover the latest products from our community'
        />

        {recentlyLaunchedProducts.length > 0 ? (
          <div className='grid-wrapper'>
            {recentlyLaunchedProducts.map(product => (
              <ProductCard key={product.id} product={product}/>
            ))}
          </div>
        ): (
          <EmptyState
            message='No products launched in the last week. Check back soon for new launches.'
            icon={CalendarIcon}
          />
        )}
      </div>
    </section>
  )
}

export default RecentlyLaunchedProducts