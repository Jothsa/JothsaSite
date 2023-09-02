/*
 * inputs from headers: current page (is there a way to paginate with fewer requests? maybe streaming), filters, search query
 * outputs: total pages, array of results obj
 * results obj has url, image, title, description/excerpt, date?
 * this should probably be in a script file not the +server file
 */

import { string, number, object, optional, array } from 'valibot';

export type searchRequestHeaders = {
  query: string;
  currentPage?: number;
  totalPages?: number;
  filters?: searchFilters;
};

const searchRequestSchema = object({
  query: string(),
  currentPage: optional(number()),
  totalPages: optional(number()),
});

const searchResponseSchema = object({
  results: array(object({})),
});

export type searchFilters = {};
