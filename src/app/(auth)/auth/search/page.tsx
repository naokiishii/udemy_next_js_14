import { redirect } from 'next/navigation';
import PostList from '@/app/(auth)/components/posts/post-list';
import { fetchPostsBySearchTerm } from '@/db/queries/posts';

interface SearchPageProps {
  searchParams: {
    term: string;
  };
}

export default async function SearhPge({ searchParams }: SearchPageProps) {
  const { term } = searchParams;

  if (!term) {
    redirect('/auth/');
  }

  return (
    <div>
      <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
    </div>
  );
}
