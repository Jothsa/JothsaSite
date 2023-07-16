export const CategoriesList = ['personal', 'programming', 'star wars'] as const;
export type Categories = (typeof CategoriesList)[number];
export function isCategories(
  cats: string[] | undefined | null,
): cats is Categories[] {
  if (
    cats?.every((c) => {
      if (CategoriesList.includes(c as Categories)) {
        return true;
      } else return false;
    })
  ) {
    return true;
  } else return false;
}
export function isCategory(cat: string | undefined | null): cat is Categories {
  // ! not sure if this is the best way or that it won't break if I give a number or something
  if (cat && CategoriesList.includes(cat as Categories)) {
    return true;
  } else return false;
}
export type Post = {
  title: string;
  slug: string;
  description: string;
  date: string;
  categories: Categories[];
  published: boolean;
};
