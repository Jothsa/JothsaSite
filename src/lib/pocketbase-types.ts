/**
 * This file was @generated using pocketbase-typegen
 */

export enum Collections {
  Authors = 'authors',
  Images = 'images',
  Quotes = 'quotes',
  Sources = 'sources',
  Universes = 'universes',
  Users = 'users',
}

// Alias types for improved usability
export type IsoDateString = string;
export type RecordIdString = string;
export type HTMLString = string;

// System fields
export type BaseSystemFields<T = never> = {
  id: RecordIdString;
  created: IsoDateString;
  updated: IsoDateString;
  collectionId: string;
  collectionName: Collections;
  expand?: T;
};

export type AuthSystemFields<T = never> = {
  email: string;
  emailVisibility: boolean;
  username: string;
  verified: boolean;
} & BaseSystemFields<T>;

// Record types for each collection

export type AuthorsRecord = {
  name: string;
  sources?: RecordIdString;
  universe: RecordIdString;
  headshot?: RecordIdString;
  images?: RecordIdString[];
};

export type ImagesRecord = {
  image: string;
  title: string;
  alt?: string;
};

export type QuotesRecord = {
  text: string;
  author?: RecordIdString;
  source?: RecordIdString;
};

export enum SourcesMediaOptions {
  'Book' = 'Book',
  'TV Show' = 'TV Show',
  'Movie' = 'Movie',
}
export type SourcesRecord = {
  title: string;
  author: string;
  media?: SourcesMediaOptions;
  universe: RecordIdString;
  image?: RecordIdString;
};

export type UniversesRecord = {
  name: string;
};

export type UsersRecord = {
  name?: string;
  avatar?: string;
};

// Response types include system fields and match responses from the PocketBase API
export type AuthorsResponse<Texpand = unknown> = AuthorsRecord &
  BaseSystemFields<Texpand>;
export type ImagesResponse = ImagesRecord & BaseSystemFields;
export type QuotesResponse<Texpand = unknown> = QuotesRecord &
  BaseSystemFields<Texpand>;
export type SourcesResponse<Texpand = unknown> = SourcesRecord &
  BaseSystemFields<Texpand>;
export type UniversesResponse = UniversesRecord & BaseSystemFields;
export type UsersResponse = UsersRecord & AuthSystemFields;

export type CollectionRecords = {
  authors: AuthorsRecord;
  images: ImagesRecord;
  quotes: QuotesRecord;
  sources: SourcesRecord;
  universes: UniversesRecord;
  users: UsersRecord;
};
