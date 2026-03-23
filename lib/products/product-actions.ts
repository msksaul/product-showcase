'use server'

import { db } from '@/db'
import { products } from '@/db/schema'
import { FormState } from '@/types'
import { auth, currentUser } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import z from 'zod'
import { productSchema } from './product-validations'

export const addProductAction = async (_prevState: FormState, formData: FormData) => {
  try {
    const { userId, orgId } = await auth()

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: undefined,
      };
    }

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous";

    const rawFormData = Object.fromEntries(formData.entries())

    const validatedData = productSchema.safeParse(rawFormData)

    if(!validatedData.success) {
      console.log(validatedData.error.flatten().fieldErrors);
      return {
        success: false,
        errors: validatedData.error.flatten().fieldErrors,
        message: "Invalid data",
      };
    }

    const { name, slug, tagline, description, websiteUrl, tags } = validatedData.data

    const tagsArray = tags ? tags.filter((tag => typeof tag === 'string')) : []

    await db.insert(products).values({
      name,
      slug,
      tagline,
      description,
      websiteUrl,
      tags: tagsArray,
      status: 'pending',
      submittedBy: userEmail,
      organizationId: orgId,
      userId
    })

    return {
      success: true,
      message: 'Product submitted successfully!, It will be reviewed shortly.',
      errors: undefined
    }
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
        message: "Validation failed. Please check the form.",
      };
    }

    return {
      success: false,
      errors: undefined,
      message: 'Failed to submit product'
    }
  }
}

export const upvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth()

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: undefined,
      };
    }

    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))

    const product = result[0]

    if(!product) return

    const votes = product.votes ?? []

    if(votes.includes(userId)) return

    await db.update(products).set({
      votes: [...votes, userId]
    })
    .where(eq(products.id, productId))

    revalidatePath('/')

    return {
      success: true,
      message: 'Product upvoted successfully'
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Failed to upvote product',
      voteCount: 0
    }
  }
}

export const downvoteProductAction = async (productId: number) => {
  try {
    const { userId, orgId } = await auth()

    if (!userId) {
      return {
        success: false,
        message: "You must be signed in to submit a product",
        errors: undefined,
      };
    }

    if (!orgId) {
      return {
        success: false,
        message: "You must be a member of an organization to submit a product",
        errors: undefined,
      };
    }

    const result = await db
      .select()
      .from(products)
      .where(eq(products.id, productId))

    const product = result[0]
    
    if(!product) return

    const votes = (product.votes ?? []).filter(id => id !== userId)

    await db
      .update(products)
      .set({ votes })
      .where(eq(products.id, productId))

    revalidatePath('/')

    return {
      success: true,
      message: 'Product downvoted successfully'
    }
  } catch (error) {
    console.error(error)

    return {
      success: false,
      message: 'Failed to downvote product',
      voteCount: 0
    }
  }
}