import { products } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { StarIcon } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '../ui/badge';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import VotingButtons from './voting-buttons';

type Product = InferSelectModel<typeof products>

const ProductCard = ({ product, userId }: { product: Product, userId: string | null }) => {

  const votes = product.votes ?? []

  const hasVoted = userId ? votes.includes(userId) : false
  console.log(hasVoted)

  const voteCount = votes.length

  return (
    <Link href={`/products/${product.slug}`}>
      <Card className='group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-50'>
        <CardHeader className='flex flex-1 flex-row justify-between'>
          <div className='flex flex-col items-start gap-4'>
            <div className='flex-1 min-w-0'>
              <div className='flex items-center gap-2'>
                <CardTitle className='text-lg group-hover:text-primary transition-colors'>
                  {product.name}
                </CardTitle>
                {voteCount > 10 &&
                  <Badge className='gap-1 bg-primary text-primary-foreground'>
                    <StarIcon className='size-3 fill-current'/> Featured
                  </Badge>
                }
              </div>
            </div>
            <CardDescription>{product.description}</CardDescription>
          </div>
          
          <VotingButtons 
            hasVoted={hasVoted}
            voteCount={voteCount}
            productId={product.id}
          />
        </CardHeader>
        <CardFooter>
          <div className='flex items-center gap-2'>
            {product.tags?.map(tag => (
              <Badge variant={'secondary'} key={tag}>{tag}</Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}

export default ProductCard