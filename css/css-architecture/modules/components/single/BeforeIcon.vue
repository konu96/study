<template>
  <span class="before-icon" :class="`before-icon--${modifier}`">
    <a href="#">ファイル名.pdf </a>
  </span>
</template>

<script>
export default {
  props: {
    modifier: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.before-icon {
  display: inline-block;
  margin-right: .3em;
  color: #e25c00;
  font-family: 'Font Awesome 5 Free';
  font-weight: 400;

  &--pdf::before {
    content: '\f1c1';
  }

  /* なぜかうまく行かない */
  &--chevron-left::before {
    content: '';
    width: .375em;
    height: .375em;
    border-bottom: .125em solid #e25c00;
    border-left: .125em solid #e25c00;
    transform: rotate(45deg) translateY(-30%);
  }
}
</style>
