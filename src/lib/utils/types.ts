export const TagsList = [
  'personal',
  'programming',
  'star-wars',
  'catholicism',
  'reading',
] as const;
export type TagsType = (typeof TagsList)[number];
export function isTags(cats: string[] | undefined | null): cats is TagsType[] {
  if (
    cats?.every((c) => {
      if (TagsList.includes(c as TagsType)) {
        return true;
      } else return false;
    })
  ) {
    return true;
  } else return false;
}
export function isTag(cat: string | undefined | null): cat is TagsType {
  // ! not sure if this is the best way or that it won't break if I give a number or something
  if (cat && TagsList.includes(cat as TagsType)) {
    return true;
  } else return false;
}
export type Post = {
  title: string;
  slug: string;
  description: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  ogImage?: string; // should be base64 of image to use for social cards
  date: string;
  tags: TagsType[];
  published: boolean;
};
