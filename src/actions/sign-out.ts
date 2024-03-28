'use server';

import * as auth from '@/auth';

export async function signOut() {
  console.log('sign out');
  return auth.signOut();
}
