import { pb } from '$lib/pocketbase';
import {
  Collections,
  type AuthorsResponse,
  type QuotesResponse,
  type SourcesResponse,
  type UniversesResponse,
} from '$lib/pocketbase-types';
import type { PageServerLoad } from './$types';

type Texpand = {
  author: AuthorsResponse;
  source: SourcesResponse;
  universes: UniversesResponse;
};

export const load = (async () => {
  return {
    quotesList: await pb
      .collection(Collections.Quotes)
      .getList<QuotesResponse<Texpand>>(1, 50, {
        // sort: '',
        expand: 'author, source, author.universe',
      }),
  };
}) satisfies PageServerLoad;
