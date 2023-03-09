// import { pb } from '$lib/pocketbase';
// import {
//   Collections,
//   type AuthorsResponse,
//   type QuotesResponse,
//   type SourcesResponse,
//   type UniversesResponse,
// } from '$lib/pocketbase/pocketbase-types';
// import type { PageServerLoad } from './$types';

// type Texpand = {
//   author: AuthorsResponse;
//   source: SourcesResponse;
//   universes: UniversesResponse;
// };

// export const load = (async () => {
// const response = await pb
//   .collection(Collections.Quotes)
//   .getList<QuotesResponse<Texpand>>(1, 50, {
//     sort: '',
//     expand: 'author, source, author.universe',
//   });
//   const response = await pb
//     .collection(Collections.Quotes)
//     .getFullList<QuotesResponse<Texpand>>({
//       sort: '',
//       expand: 'author, source, author.universe',
//     });
//   console.log(response);
//   const quotesList = JSON.parse(response.toString());
//   return {
//     title: 'Quotes',
//     quotesList,
//   };
// }) satisfies PageServerLoad;
