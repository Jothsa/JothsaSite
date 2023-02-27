import PocketBase from 'PocketBase';
// ! should PB_URL be public?
export const pb = new PocketBase(import.meta.env.VITE_PB_URL);
