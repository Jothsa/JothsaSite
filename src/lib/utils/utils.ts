type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

export function formatDate(
  date: string,
  dateStyle: DateStyle = 'medium',
  locales = 'en',
) {
  const formatter = new Intl.DateTimeFormat(locales, { dateStyle });
  return formatter.format(new Date(date));
}

export function paginate<T>(
  items: T[],
  currentPage: number,
  pageSize: number,
): T[] {
  // pageSize = number of posts per page
  return items.slice((currentPage - 1) * pageSize, currentPage * pageSize);
}
