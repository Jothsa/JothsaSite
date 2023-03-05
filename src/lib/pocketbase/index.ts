// import { browser } from '$app/environment';
import { PUBLIC_PB_URL } from '$env/static/public';
import PocketBase, { ListResult } from 'pocketbase';
import {
  readable,
  writable,
  type Readable,
  type Subscriber,
} from 'svelte/store';
import type { BaseSystemFields } from './pocketbase-types';

export const client = new PocketBase(PUBLIC_PB_URL);
