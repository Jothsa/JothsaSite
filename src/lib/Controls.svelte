<script lang="ts">
  import { Button } from 'agnostic-svelte';
  import Icon from '@iconify/svelte';
  import doubleArrowRounded from '@iconify/icons-material-symbols/double-arrow-rounded';
  import cloudMoonDuotone from '@iconify/icons-ph/cloud-moon-duotone';
  import sunMoonStars from '@iconify/icons-mdi/sun-moon-stars';
  import sunBold from '@iconify/icons-ph/sun-bold';
  import motionPhotosPausedRounded from '@iconify/icons-material-symbols/motion-photos-paused-rounded';

  function toggleExpanded() {
    Array.from(document.getElementsByClassName('controls')).forEach(
      (control) => {
        control.classList.toggle('expanded');
        let x = control.getAttribute('aria-expanded');
        if (x == 'false') {
          control.setAttribute('aria-expanded', 'false');
        } else if (x == 'true') {
          control.setAttribute('aria-expanded', 'true');
        }
      }
    );
  }
</script>

<div class="controls" aria-expanded="false">
  <Button mode="secondary" isRounded
    ><Icon icon={motionPhotosPausedRounded} />
  </Button>
  <div class="themeToggle">
    <Button mode="secondary" isRounded><Icon icon={sunBold} /></Button>
    <Button mode="secondary" isRounded><Icon icon={sunMoonStars} /></Button>
    <Button mode="secondary" isRounded><Icon icon={cloudMoonDuotone} /></Button>
  </div>
  <Button mode="primary" is Rounded class="arrow" :onClick={toggleExpanded}
    >Icon icon={doubleArrowRounded} /></Button
  >
</div>

<style lang="postcss">
  .controls {
    position: fixed;
    transition: width 600ms ease;
    display: flex;
    align-items: center;
    bottom: 3rem;
    width: 2.5rem;
    & div {
      display: flex;
    }
    & Button {
      display: none;
      .arrow {
        display: inline-block;
      }
    }
    .expanded {
      width: 10rem;
      & Button {
        display: inline block;
        .arrow {
          rotate: 180deg z;
        }
      }
    }
  }
</style>
