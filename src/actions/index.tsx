"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from "next/navigation";
import { db } from "@/db";

export async function editSnippet(id: number, code: string) {
  await db.snippet.update({
    where: { id },
    data: { code },
  });
  revalidatePath(`/snippet/${id}`)
  redirect(`/snippet/${id}`);
}

export async function deleteSnippet(id: number) {
  await db.snippet.delete({
    where: { id },
  });
  revalidatePath('/snippet')
  redirect("/snippet");
}

export async function createSnippet(
  formState: { message: string },
  formData: FormData
) {
  try {
    /*
  return {
    message: "Title must be longer.",
  };
  */
    // Check the user's inputs and make sure they're valid
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be longer.",
      };
    }

    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be longer.",
      };
    }

    // Create a new record in the database
    const snippet = await db.snippet.create({
      data: {
        title: title,
        code: code,
      },
    });
    console.log(snippet);
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        message: err.message,
      };
    } else {
      return {
        message: "Something went wrong.",
      };
    }
  }

  revalidatePath('/snippet');
  // Redirect the user back to the root route
  redirect("/snippet");
}
