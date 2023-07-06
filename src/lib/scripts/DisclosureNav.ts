interface IDictionary {
  [id: string]: {
    closedLabel: string;
    openedLabel: string;
  };
}

export default class DisclosureNav {
  #links: NodeListOf<HTMLAnchorElement>;
  #rootNav: HTMLElement;
  // mainNavList: MainNavList;
  mainNavList: DisclosureNavDropdown;
  #dropdowns: DisclosureNavDropdown[] = [];

  constructor(nav: HTMLElement, messages?: IDictionary) {
    this.#rootNav = nav;
    this.#links = nav.querySelectorAll('a');
    const buttons = nav.querySelectorAll('button');
    // ! hopefully should be first child
    const mainList = nav.querySelector('ul:first-of-type') as HTMLUListElement;
    const subLists = nav.querySelectorAll(
      'ul ul',
    ) as NodeListOf<HTMLUListElement>;
    const mainNavButton = DisclosureNav.getButtonByID(mainList.id, buttons);

    if (mainNavButton != undefined) {
      this.mainNavList = new MainNavList(
        mainNavButton,
        mainList,
        'close the navigation menu',
        'open the navigation menu',
      );
    } else {
      throw new Error('mainNavButton not found');
    }
    window.addEventListener('load', () => {
      this.#links.forEach((a) => {
        DisclosureNav.setLinkAriaCurrent(
          a,
          window.location.pathname.toLowerCase().replace('/', ''),
        );
      });
    });

    subLists.forEach((l) => {
      const b = DisclosureNav.getButtonByID(l.id, buttons);
      if (b) {
        if (
          messages?.[l.id] &&
          messages?.[l.id]?.openedLabel &&
          messages?.[l.id]?.closedLabel
        ) {
          this.#dropdowns.push(
            new DisclosureNavDropdown(
              b,
              l,
              messages[l.id].openedLabel,
              messages[l.id].closedLabel,
            ),
          );
        } else {
          this.#dropdowns.push(new DisclosureNavDropdown(b, l));
        }
      }
    });

    // pretty sure this is built in to the browser
    // this.#links.forEach((l) => {
    //   l.addEventListener('keydown', (e) => {
    //     if (e.key === 'Space' || e.key === 'Enter') {
    //       e.preventDefault();
    //       console.log('link clicked');
    //       l.click();
    //     }
    //   });
    // });

    const isTouchScreen = 'ontouchstart' in document.documentElement;

    if (isTouchScreen) {
      document.addEventListener('touchstart', (e: TouchEvent) => {
        const t = (e as TouchEvent).targetTouches[0];
        this.#dropdowns.forEach((d) => {
          if (!d.contains(t.target as Node | null)) {
            this.closeDropdowns();
          }
        });
      });
    } else {
      this.#rootNav.addEventListener('focusout', () => {
        this.onFocusOut();
      });
    }
  }

  closeDropdowns() {
    this.#dropdowns.forEach((d) => {
      d.toggle(false);
    });
  }

  onFocusOut() {
    // ? does this work for touch events? (prob ig)
    // ? do we need the timeout ???
    setTimeout(() => {
      if (!this.#rootNav.matches(':focus-within, :focus')) {
        this.closeDropdowns();
      }
    }, 300);
  }

  static getButtonByID(
    id: string,
    buttons: HTMLButtonElement[] | NodeListOf<HTMLButtonElement>,
  ) {
    let button: HTMLButtonElement | undefined;
    buttons.forEach((b) => {
      b.getAttribute('aria-controls');
      if (b.getAttribute('aria-controls') === id) {
        button = b;
      }
    });
    return button;
  }

  static getListByButton(
    b: HTMLButtonElement,
    lists: HTMLUListElement[] | NodeListOf<HTMLUListElement>,
  ) {
    const id = b.getAttribute('aria-controls');
    lists.forEach((l) => {
      if (id === l.id) {
        return l;
      }
    });
    return undefined;
  }

  static setLinkAriaCurrent(a: HTMLAnchorElement, path: string) {
    // let path = window.location.pathname.toLowerCase().replace('/', '');
    const href = a?.getAttribute('href')?.toLowerCase()?.replace('/', '');
    if (path === href) {
      a.ariaCurrent = 'page';
    } else {
      a.ariaCurrent = '';
    }
  }

  static onLinkKeypress(e: KeyboardEvent, a: HTMLAnchorElement) {
    if (e.key === 'Space' || e.key === 'Enter') {
      a.click();
    }
  }
}

class DisclosureNavDropdown {
  #button: HTMLButtonElement;
  #list: HTMLUListElement;
  #isExpanded = false;
  name = '';
  openedLabel = `close the ${this.name} dropdown`;
  closedLabel = `open the ${this.name} dropdown`;
  constructor(
    button: HTMLButtonElement,
    list: HTMLUListElement,
    openedLabel?: string,
    closedLabel?: string,
  ) {
    this.#button = button;
    this.#list = list;
    if (button.getAttribute('aria-expanded') === 'true') {
      this.#isExpanded = false;
    }
    if (openedLabel && closedLabel) {
      this.openedLabel = openedLabel;
      this.closedLabel = closedLabel;
    } else {
      const n = button.getAttribute('aria-controls');
      if (n) {
        this.name = n;
      }
    }

    this.#button.addEventListener('click', () => {
      this.onButtonClick();
    });
    this.#button.addEventListener('keydown', (e) => {
      this.onButtonKeydown(e);
    });
    this.#list.addEventListener('keydown', (e) => {
      this.onListKeydown(e);
    });
    this.#list.addEventListener('focusout', () => {
      setTimeout(() => {
        if (!this.#list.matches(':focus-within')) {
          this.toggle(false);
        }
      }, 300);
    });
  }

  get button() {
    return this.#button;
  }

  get list() {
    return this.#list;
  }

  get isExpanded() {
    return this.#isExpanded;
  }

  contains(e: HTMLElement | Node | null) {
    if (this.#button.contains(e) || this.#list.contains(e)) {
      return true;
    } else return false;
  }

  toggle(target?: boolean) {
    let ex = 'false';
    if (this.#isExpanded) {
      ex = 'true';
    }
    if (target === undefined) {
      this.#list.classList.toggle('expanded');
      if (ex === 'true') {
        ex = 'false';
        this.#button.ariaLabel = this.openedLabel;
      } else {
        ex = 'true';
      }
    } else if (target === true) {
      this.#list.classList.add('expanded');
      ex = 'true';
    } else if (target === false) {
      this.#list.classList.remove('expanded');
      ex = 'false';
    }

    if (ex === 'true') {
      this.#isExpanded = true;
      this.#button.ariaLabel = this.openedLabel;
    } else {
      this.#isExpanded = false;
      this.#button.ariaLabel = this.closedLabel;
    }

    this.#button.ariaExpanded = ex;
  }

  onButtonClick() {
    this.toggle();
  }

  onButtonKeydown(e: KeyboardEvent) {
    if (e.key === 'Space' || e.key === 'Enter') {
      this.#button.click();
    } else if (e.key === 'Escape') {
      this.toggle(false);
    }
  }

  onListKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      this.toggle(false);
    }
  }
}

class MainNavList extends DisclosureNavDropdown {
  // constructor(...args) {
  //   super(...args);
  // }
}
