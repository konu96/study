<template>
  <h1 class="level1-heading">
    <span class="level1-heading__inner">
      ページタイトル
    </span>
  </h1>
</template>

<style scoped lang="scss">
.level1-heading {
  padding: 30px 10px;
  background-color: #e25c00;
  color: #fff;
  font-size: 1.75rem;
  text-align: center;

  &__inner {
    position: relative;
    display: inline-block;
    transform: translateY(-20%);

    &::after {
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      width: 80px;
      height: 1px;
      background-color: currentColor;
      transform: translateX(-50%);
    }
  }
}
</style>
