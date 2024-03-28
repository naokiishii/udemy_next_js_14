import Link from 'next/link';
import { db } from '@/db';

export default async function SnippetPage() {
  const snippets = await db.snippet.findMany();
  const renderSnippets = snippets.map((snippet) => {
    return (
      <Link
        key={snippet.id}
        href={`/snippet/${snippet.id}`}
        className="flex justify-between items-center p-2 border rounded"
      >
        <div>{snippet.title}</div>
        <div>View</div>
      </Link>
    );
  });
  return (
    <div className="">
      <div className="flex m-2 justify-between items-center">
        <h1 className="text-xl font-bold">Snippets</h1>
        <Link href="/snippet/new" className="border p-2 rounded">
          New
        </Link>
      </div>
      <div className="flex flex-col gap-2">{renderSnippets}</div>
    </div>
  );
}
