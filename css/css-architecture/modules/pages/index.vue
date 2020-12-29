<template>
  <div>
    <app-heading1 />
    <app-heading2 />
    <div class="container">
      <div class="list">
        <app-button />
        <app-button displayed-text="矢印付きボタン" modifier="arrow-right" />
        <app-button displayed-text="大ボタン" modifier="large" />
        <before-icon-button />
        <before-icon modifier="pdf" />
        <before-icon modifier="chevron-left" />
        <app-label />
      </div>
    </div>
  </div>
</template>

<script>
import AppButton from '../components/single/AppButton.vue'
import BeforeIconButton  from '../components/single/BeforeIconButton.vue'
import BeforeIcon  from '../components/single/BeforeIcon.vue'
import AppLabel from '../components/single/AppLabel';
import AppHeading1 from '../components/single/AppHeading1.vue';
import AppHeading2 from '../components/single/AppHeading2.vue';

export default {
  components: {
    AppButton,
    BeforeIconButton,
    BeforeIcon,
    AppLabel,
    AppHeading1,
    AppHeading2
  }
}
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

</style>
