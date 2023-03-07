import { pb } from '$lib/pocketbase';
import {
  Collections,
  type AuthorsResponse,
  type QuotesResponse,
  type SourcesResponse,
  type UniversesResponse,
} from '$lib/pocketbase/pocketbase-types';
import type { PageServerLoad } from './$types';

type Texpand = {
  author: AuthorsResponse;
  source: SourcesResponse;
  universes: UniversesResponse;
};

export const load = (async () => {
  // const quotesList = pb
  //   .collection(Collections.Quotes)
  //   .getList<QuotesResponse<Texpand>>(1, 50, {
  //     // sort: '',
  //     expand: 'author, source, author.universe',
  //   });
  return {
    title: 'Quotes',
    quotesList: await pb
      .collection(Collections.Quotes)
      .getList<QuotesResponse<Texpand>>(1, 50, {
        // sort: '',
        expand: 'author, source, author.universe',
      }),
  };
}) satisfies PageServerLoad;
