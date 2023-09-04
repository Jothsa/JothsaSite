<div class="book-loader-container">
  <div class="spine"></div>
  <div class="page-wrapper" style="--page-num: 1">
    <div class="page"></div>
  </div>
  <div class="page-wrapper" style="--page-num: 2">
    <div class="page"></div>
  </div>
  <div class="page-wrapper" style="--page-num: 3">
    <div class="page"></div>
  </div>
  <div class="page-wrapper" style="--page-num: 4">
    <div class="page"></div>
  </div>
  <div class="page-wrapper-static right">
    <div class="page"></div>
  </div>
  <div class="page-wrapper-static left">
    <div class="page"></div>
  </div>
</div>

<style>
  /* based on https://codepen.io/aaroniker/pen/zYOewEP */

  /* TODO fix units for sizes (don't use ch w/o max) */

  .book-loader-container {
    --color: var(--accent);
    --line-width: 1ch;
    --_border-width: calc(var(--line-width) / 2);
    --duration: 2s;
    --spine-length: 5ch;
    --spine-height: calc(var(--spine-length) * 0.5);
    --page-length: 7ch;

    /* something is wacky w/ --cover-length */
    --cover-length: calc(var(--page-length) + 0ch);
    --page-offset-y: 0.4ch;
    --page-offset-x: 0.5ch;
    --page-anim-offset: calc(2s / 4);
    --_width: calc(
      2 * var(--cover-length) + var(--spine-length) + 2 * var(--line-width)
    );
    --_wrapper-width: calc(
      var(--cover-length) + var(--line-width) + var(--spine-length) / 2
    );
    --_height: calc(
      var(--_wrapper-width) + var(--spine-height) + var(--page-offset-y)
    );

    position: relative;
    width: var(--_width);
    height: var(--_height);

    & .spine {
      position: absolute;
      bottom: 0;
      left: 50%;
      width: var(--spine-length);
      height: var(--spine-height);
      border: var(--line-width) var(--color) solid;
      border-radius: 0 0 9px 9px;
      border-top: none;
      transform: translateX(-50%);

      &::after,
      &::before {
        --border-radius: 15px;
        position: absolute;
        top: 0;
        width: calc(var(--cover-length) + var(--line-width));
        border: solid var(--_border-width) var(--color);
        border-radius: 15px;
        content: '';
      }

      &::after {
        left: 0;
        border-radius: 0 var(--border-radius) var(--border-radius) 0;
        transform: translateX(calc(var(--spine-length) - var(--line-width)));
      }

      &::before {
        right: 0;
        border-radius: var(--border-radius) 0 0 var(--border-radius);
        transform: translateX(
          calc(-1 * var(--spine-length) + var(--line-width))
        );
      }
    }

    & .page-wrapper,
    & .page-wrapper-static {
      position: absolute;
      right: 0;
      bottom: calc(var(--spine-height) + var(--page-offset-y));
      width: var(--_wrapper-width);
      rotate: 0deg;
      transform-origin: left center;

      &:not(.page-wrapper-static) {
        animation: rotation var(--duration) linear infinite;
        animation-delay: calc((var(--page-num) - 1) * var(--page-anim-offset));
      }

      &.left {
        left: 0;
      }

      &.right {
        right: 0;
      }

      & .page {
        --_radius: calc(var(--page-length) + var(--line-length));
        width: var(--page-length);

        border: solid var(--_border-width) var(--color);
        border-radius: 15px;
      }

      &.left .page {
        transform: translateX(
          calc(
            1 * (var(--_wrapper-width) - var(--page-length)) -
              (var(--spine-length) / 2) + var(--line-width) -
              var(--page-offset-x)
          )
        );
      }

      &:not(.left) .page {
        transform: translateX(
          calc(
            var(--spine-length) / 2 - var(--line-width) + var(--page-offset-x)
          )
        );

        transform: translateX(
          calc(
            (var(--spine-length) / 2 - var(--line-width)) + var(--page-offset-x)
          )
        );
      }
    }
  }

  @keyframes rotation {
    to {
      rotate: -180deg;
    }
  }
</style>
