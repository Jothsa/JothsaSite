import { paginate } from '$utils/utils';
import {
  string,
  number,
  object,
  optional,
  array,
  type Output,
  union,
  record,
  withDefault,
  parse,
} from 'valibot';

// TODO type filters better

interface Pagefind {
  search: (
    query: string,
    options?: { filters: { [key: string]: string | string[] } },
  ) => Promise<PagefindResponse>;
}

interface PagefindResponse {
  results: PagefindResult[];
}

interface PagefindResult {
  id: string;
  data: () => Promise<PagefindDocument>;
}

interface PagefindDocument {
  url: string;
  excerpt: string;
  filters: {
    author: string;
  };
  meta: {
    title: string;
    image: string;
  };
  content: string;
  word_count: number;
}

export const searchRequestSchema = object({
  query: string(),
  currentPage: optional(withDefault(number(), 1)),
  totalPages: optional(withDefault(number(), 1)),
  filters: optional(record(union([string(), array(string())]))),
});

export const searchResponseSchema = object({
  results: array(object({})),
});

type searchRequest = Output<typeof searchRequestSchema>;

export async function searchPosts(request: searchRequest) {
  let pagefind: Pagefind;
  try {
    pagefind = await loadPagefind();
    parse(searchRequestSchema, request);
  } catch (e) {
    console.log(e);
    return;
  }

  const { query, currentPage, totalPages, filters } = request;

  let pagefindSearchResponse: PagefindResponse;
  if (filters) {
    pagefindSearchResponse = await pagefind.search(query, { filters: filters });
  } else {
    pagefindSearchResponse = await pagefind.search(query);
  }

  const resultsRaw = pagefindSearchResponse.results;

  // ? is this efficient?
  const results: PagefindDocument[] = [];
  resultsRaw.forEach(async (result) => {
    results.push(await result.data());
  });

  if (totalPages > 1) {
    const { items, totalPages } = paginate(results, currentPage, totalPages);
    return { items: items, totalPages: totalPages };
  } else {
    return { items: results, totalPages: 1 };
  }
}

export async function loadPagefind(): Promise<Pagefind> {
  const pf = '/_pagefind/pagefind.js';
  return await import(/* @vite-ignore */ pf);
}
