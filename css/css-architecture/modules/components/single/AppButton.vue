<template>
  <a class="button" :class=" modifier !== '' ? `button--${modifier}` : ''"> {{ displayedText }} </a>
</template>

<script>
export default {
  props: {
    modifier: {
      type: String,
      default: '',
    },
    displayedText: {
      type: String,
      default: '標準ボタン'
    }
  },
}
</script>

<style scoped lang="scss">
.button {
  display: inline-block;
  width: 300px;
  max-width: 100%;
  padding: 20px 10px;
  background-color: #e25c00;
  border: 2px solid transparent;
  box-shadow: 0 3px 6px rgba(0, 0, 0, .16);
  color: #fff;
  font-size: 1.125rem;
  text-align: center;
  text-decoration: none;
  transition: .25s;

  &--arrow-right {
    position: relative;
    padding-right: 2em;
    padding-left: 1.38em;

    &::after {
      content: '\f061';
      position: absolute;
      top: 50%;
      right: .83em;
      font-family: 'Font Awesome 5 Free';
      font-weight: 900;
      transform: translateY(-50%);
    }
  }

  &--large {
    width: 340px;
    padding: 25px 0;
    font-size: 1.375rem;
  }
}

.button:focus,
.button:hover {
  background-color: #fff;
  border-color: currentColor;
  color: #e25c00
}
</style>
