"use server";

import * as auth from "@/auth";

export async function signIn() {
  console.log('sign in')
  return auth.signIn("github");
}

