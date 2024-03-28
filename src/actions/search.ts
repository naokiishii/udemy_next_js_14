'use server'

import { redirect } from 'next/navigation'

export async function search(formData: FormData) {
  const term = formData.get('term')
console.log(term)
  if(typeof term !== 'string' || !term) {
    redirect('/auth')
  }

  console.log(`/auth/search?term=${term}`)
  redirect(`/auth/search?term=${term}`)
}