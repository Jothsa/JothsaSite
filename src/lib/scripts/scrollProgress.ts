// @link https://dev.to/robole/pimp-your-blog-by-adding-a-reading-progress-bar-573i

export class ScrollProgress {
  post: HTMLElement;
  scrollProgress: HTMLProgressElement;
  observer: IntersectionObserver;
  progressHeight = 0;
  inViewport = false;
  timeout: number | undefined;
  direction: 'top' | 'bottom' = 'top';

  /**
   * Creates an instance of scrollProgress.
   * @param post should be parent of `scrollProgress`
   * @param direction should the progress be at 100% based on the top or the bottom
   */

  constructor(
    post: HTMLElement,
    scrollProgress: HTMLProgressElement,
    direction?: 'top' | 'bottom',
  ) {
    this.post = post;
    this.scrollProgress = scrollProgress;
    this.observer = new IntersectionObserver((entries) => {
      this.handler(entries);
    });
    this.observer.observe(post);
    this.progressHeight = this.scrollProgress.getBoundingClientRect().height;
    this.timeout = undefined;
    if (direction) this.direction = direction;

    if (window) {
      window.addEventListener('scroll', () => {
        if (this.timeout) {
          window.cancelAnimationFrame(this.timeout);
        }
        this.timeout = window.requestAnimationFrame(() => {
          this.showReadingProgress();
        });
      });
    }

    if (this.scrollProgress) {
      this.progressHeight = this.scrollProgress.getBoundingClientRect().height;
    }
  }

  showReadingProgress(): void {
    console.log('showing progress');
    if (this.post && this.scrollProgress) {
      this.scrollProgress.setAttribute(
        'value',
        this.getScrollProgress(this.post).toString(),
      );
    }
  }

  getScrollProgress(el: HTMLElement): number {
    const coords: DOMRect = el.getBoundingClientRect();
    const height: number = coords.height;
    let progressPercentage = 0;
    console.log('getting progress');
    console.log('spiv', this.inViewport);
    console.log('c.top', coords.top);
    console.log('h', height);
    if (this.inViewport && coords.top < 0) {
      console.log('calc');
      if (this.direction === 'top') {
        progressPercentage =
          (Math.abs(coords.top) / (height - this.progressHeight)) * 100;
      } else {
        progressPercentage =
          (Math.abs(coords.top) /
            (height - this.progressHeight - window.innerHeight)) *
          100;
      }

      progressPercentage > 100 && (progressPercentage = 100);
      progressPercentage < 0 && (progressPercentage = 0);
    }
    console.log('p%', progressPercentage);

    return progressPercentage;
  }

  handler(
    entries: IntersectionObserverEntry[],
    // observer: IntersectionObserver,
  ) {
    console.log('handling');
    for (const entry of entries) {
      if (entry.isIntersecting) {
        console.log('iv: true');
        this.inViewport = true;
      } else {
        console.log('iv: false');

        this.inViewport = false;
      }
    }
    console.log('this.inViewport:', this.inViewport);
  }
}
