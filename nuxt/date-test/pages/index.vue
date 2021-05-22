<template>
  <div class="container">
    <ul v-for="dayjs in dayjsList">
      <li> {{ isToday(dayjs) }}</li>
    </ul>
    {{ $dayjs() }}
  </div>
</template>

<script lang="ts">
import {defineComponent, useContext} from '@nuxtjs/composition-api';
import { useDate } from '@/compositions/useDate';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

export default defineComponent({
  setup() {
    const { $dayjs } = useContext()
    $dayjs.extend(utc);
    $dayjs.extend(timezone);
    const { isToday } = useDate()

    const dayjsList = [
      $dayjs('Sat May 21 2021 23:39:32 GMT+0900').format(),
      $dayjs('Sat May 22 2021 23:39:32 GMT+0900').format(),
      $dayjs('Sat May 23 2021 23:39:32 GMT+0900').format(),
    ]

    return {
      dayjsList,
      isToday
    }
  }
})
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
