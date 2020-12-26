<template>
  <a class="before-icon-button before-icon-button--download" href="#">
    ダウンロード
  </a>
</template>

<style scoped lang="scss">
.before-icon-button {
  position: relative; /* これいるのかな? */
  display: inline-block;
  padding: .2em .3em;
  color: #e25c00;
  border: 1px solid currentColor;
  text-decoration: none;
  transition: .25s;

  &:focus,
  &:hover {
    color: #fff;
    background-color: #e25c00;
  }

  &::before {
    display: inline-block;
    margin-right: .5em;
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
  }

  &--download::before {
    content: '\f019';
  }
}
</style>
