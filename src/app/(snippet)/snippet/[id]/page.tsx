import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { Suspense } from "react";
import SnippetShowLoadingPage from "./loading";

interface SnippetShowPageProps {
  params: {
    id: string;
  };
}

export default async function SnippetShowPage(props: SnippetShowPageProps) {
  console.log(props);
  const snippet = await db.snippet.findFirst({
    where: { id: parseInt(props.params.id) },
  });

  await new Promise((r) => setTimeout(r, 2000));
  if (!snippet) {
    console.log("Not Found");
    notFound();
    //redirect('not-found')
  }
  return <Suspense fallback={<SnippetShowLoadingPage />}><div>{snippet.title}</div></Suspense>;
}
