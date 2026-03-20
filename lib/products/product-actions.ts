'use server'

import { FormState } from '@/types'
import { auth } from '@clerk/nextjs/server'

export const addProductAction = async (prevState: FormState, formData: FormData) => {
  try {
    const { userId } = await auth()

    if(!userId) {
      return {
        success: false,
        message:'You must be signed in to submit a product'
      }
    }

    const rawFormData = Object.fromEntries(formData.entries())
  } catch (error) {
    console.error(error)

    return {
      success: false,
      errors: error,
      message: 'Failed to submit product'
    }
  }
}