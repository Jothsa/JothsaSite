/* eslint-disable */
/** @typedef {typeof __propDef.props}  MasonryProps */
/** @typedef {typeof __propDef.events}  MasonryEvents */
/** @typedef {typeof __propDef.slots}  MasonrySlots */
export default class Masonry extends SvelteComponentTyped<
  {
    stretchFirst?: boolean | undefined;
    gridGap?: string | undefined;
    colWidth?: string | undefined;
    items?: any[] | undefined;
    refreshLayout?: (() => Promise<void>) | undefined;
  },
  {
    [evt: string]: CustomEvent<any>;
  },
  {
    default: {};
  }
> {
  get refreshLayout(): () => Promise<void>;
}
export type MasonryProps = typeof __propDef.props;
export type MasonryEvents = typeof __propDef.events;
export type MasonrySlots = typeof __propDef.slots;
import { SvelteComponentTyped } from 'svelte';
declare const __propDef: {
  props: {
    stretchFirst?: boolean | undefined;
    gridGap?: string | undefined;
    colWidth?: string | undefined;
    items?: any[] | undefined;
    refreshLayout?: (() => Promise<void>) | undefined;
  };
  events: {
    [evt: string]: CustomEvent<any>;
  };
  slots: {
    default: {};
  };
};
export {};
