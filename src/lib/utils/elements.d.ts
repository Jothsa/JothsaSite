declare namespace svelteHTML {
  // enhance elements
  // interface IntrinsicElements {
  //   'my-custom-element': {
  //     someattribute: string;
  //     'on:event': (e: CustomEvent<any>) => void;
  //   };
  // }
  // enhance attributes
  interface HTMLAttributes<T> {
    // If you want to use on:beforeinstallprompt
    // 'on:beforeinstallprompt'?: (event: any) => any;
    // If you want to use myCustomAttribute={..} (note: all lowercase)
    anchor?: string
    popover?: boolean | 'auto' | 'manual'; // You can replace any with something more specific if you like
    popovertarget?: string;
    popovertargetaction?: 'show' | 'hide' | 'toggle'
  }
}
