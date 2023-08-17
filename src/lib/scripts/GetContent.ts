import type { Post, TagsType } from '$utils/types';
import { paginate } from '$utils/utils';

export type PostSlug = string;
const PostSlug = await getPostsSlugs();

function sortPosts(
  posts: Post[],
  method: 'date' | 'random',
  order?: 'ascending' | 'descending',
) {}

function sortByDate(posts: Post[], order?: 'ascending' | 'descending') {
  const sortedPosts = posts.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );
  if (order === 'ascending') {
    return sortedPosts;
  } else return sortedPosts.reverse();
}

export async function getPosts() {
  let posts: Post[] = [];

  const paths = import.meta.glob('/src/posts/*.md', { eager: true });

  for (const path in paths) {
    const file = paths[path];
    const slug = path.split('/').at(-1)?.replace('.md', '');

    if (file && typeof file === 'object' && 'metadata' in file && slug) {
      const metadata = file.metadata as Omit<Post, 'slug'>;
      const post = { ...metadata, slug } satisfies Post;
      post.published && posts.push(post);
    }
  }

  posts = posts.sort(
    (first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime(),
  );

  return posts;
}

/**
 * @param pageSize the number of posts per page
 */
export async function getPaginatedPosts(
  pageSize = 10,
  currentPage = 1,
): Promise<{ posts: Post[]; totalPages: number }> {
  const posts: Post[] = await getPosts();
  const { items, totalPages } = paginate(posts, currentPage, pageSize);
  return { posts: items, totalPages: totalPages };
}

export async function getPostsByTag(
  tags: TagsType[],
  pageSize?: number,
  currentPage?: number,
) {
  const posts: Post[] = await getPosts();
  const sortedPosts: Post[] = [];
  posts.forEach((post) => {
    tags.forEach((t) => {
      if (post.tags.includes(t)) {
        sortedPosts.push(post);
        // only need the post included one time
        return;
      }
    });
  });
  if (pageSize && currentPage) {
    const { items, totalPages } = paginate(sortedPosts, currentPage, pageSize);
    return { posts: items, totalPages };
  } else {
    return sortedPosts;
  }
}

// TODO Add search
// export async function getPostsByQuery(query?: string, Tag?: Tags) {
// pageSize = number of posts per page
// const posts: Post[] = await getPosts();
// return posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// }

export async function getPostsSlugs() {
  const posts = await getPosts();
  const slugs: string[] = [];
  posts.forEach((p) => {
    slugs.push(p.slug);
  });
  return slugs;
}

export function isPostSlug(s: string | undefined | null): s is PostSlug {
  if (s && PostSlug.includes(s)) {
    return true;
  } else return false;
}
