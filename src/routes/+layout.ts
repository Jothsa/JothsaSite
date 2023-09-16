export const load = async ({ url: { pathname } }) => {
  return { pathname };
};

export const trailingSlash = 'always';