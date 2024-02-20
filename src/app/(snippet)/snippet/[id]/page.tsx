import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { db } from "@/db";
import { Suspense } from "react";
import SnippetShowLoadingPage from "./loading";
import * as actions from "@/actions";

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

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id)

  return (
    <Suspense fallback={<SnippetShowLoadingPage />}>
      <div>
        <div className="flex m-4 justify-between items-center">
          <h1 className="text-xl font-bold">{snippet.title}</h1>
          <div className="flex gap-4">
            <Link
              href={`/snippet/${snippet.id}/edit`}
              className="p-2 border rounded"
            >
              Edit
            </Link>
            <form action={deleteSnippetAction}>
              <button className="p-2 border rounded">Delete</button>
            </form>
          </div>
        </div>
        <pre className="p-3 border rounded bg-gray-200 border-gray-200">
          <code>{snippet.code}</code>
        </pre>
      </div>
    </Suspense>
  );
}
