import type { Post, Categories } from '$utils/types';
import { paginate } from '$utils/utils';

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

export async function getPaginatedPosts(pageSize = 10, currentPage = 1) {
  // pageSize = number of posts per page
  const posts: Post[] = await getPosts();
  return paginate(posts, currentPage, pageSize);
}

export async function getPostsByCategory(
  category: Categories[],
  pageSize?: number,
  currentPage?: number,
) {
  const posts: Post[] = await getPosts();
  const sortedPosts: Post[] = [];
  posts.forEach((post) => {
    category.forEach((c) => {
      if (post.categories.includes(c)) {
        sortedPosts.push(post);
        // only need the post included one time
        return;
      }
    });
  });
  if (pageSize && currentPage) {
    return paginate(sortedPosts, currentPage, pageSize);
  } else {
    return sortedPosts;
  }
}

// TODO Add search
// export async function getPostsByQuery(query?: string, category?: Categories) {
// pageSize = number of posts per page
// const posts: Post[] = await getPosts();
// return posts.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// }