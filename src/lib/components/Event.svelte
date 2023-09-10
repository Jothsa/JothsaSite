<script lang="ts">
  // import { date } from "valibot";
  // import { Temporal, Intl, toTemporalInstant } from '@js-temporal/polyfill';
  import type { Temporal } from '@js-temporal/polyfill';

  type Event = {
    name: string;
    description: string;
    date: Temporal.ZonedDateTime;
    time: string;
    location: string;
    image: string;
    link: string;
  };
  export let event: Event;
</script>

<div class="event-container">
  <div class="calender-date">
    <span class="day-number">{event.date.day}</span><span class="month"
      >{event.date.month.toLocaleString(undefined, {
        compactDisplay: 'long',
      })}</span>
  </div>
</div>

<style>
  .event-container {
    container: event / inline-size;
  }

  .calendar-date {
    display: flex;
    flex-flow: column nowrap;

    & .day-number {
      flex-grow: 2;
      font-size: 5ch;
      font-weight: 700;
    }

    /* 
    & .month {

    } */
  }
</style>
