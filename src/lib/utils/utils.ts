type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(
  date: string,
  dateStyle: DateStyle = 'medium',
  locales = 'en',
) {
  const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return formatter.format(new Date(date));
}

/**
 * @param pageSize the number of posts per page
 * @returns the `items` on the `currentPage` and the total number of pages
 */

export function paginate<T>(
  items: T[],
  currentPage: number,
  pageSize: number,
): {items: T[], pages: number} {
  return{ items: items.slice((currentPage - 1) * pageSize, currentPage * pageSize), pages: Math.ceil(items.length / pageSize)}

}
