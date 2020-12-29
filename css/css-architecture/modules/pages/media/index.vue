<template>
  <div class="media">
    <figure class="media__img-wrapper">
      <img class="media__img" src="https://css-architecture-perfect.guide/assets/img/elements/persona.jpg" role="img" alt="手に持たれたスマホ写真">
    </figure>
    <div class="media__body">
      <h3 class="media__title">
        ユーザーを考えた設計で満足な体験を
      </h3>
      <p class="media__text">
        hogehogehogheohgoehogehoeogheogheohgoehgoehgoehogehogehogheohgoehogehoeogheogheohgoehgoehgoe
        hogehogehogheohgoehogehoeogheogheohgoehgoehgoehogehogehogheohgoehogehoeogheogheohgoehgoehgoe
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.media {
  display: flex;
  align-items: center;

  &__img-wrapper {
    flex: 0 1 27.58333%;
    margin-right: 3.333333%; /* body に margin-left 持たせても良さそう */
  }

  &__img {
    width: 100%;
  }

  &__body {
    flex: 1;

    & > *:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    margin-bottom: 10px;
    font-size: 1.125rem;
    font-weight: bold;
  }
}

@media screen and (max-width: 768px) {
  .media {
    display: block;

    &__img-wrapper {
      margin-right: 0;
      margin-bottom: 20px;
    }
  }
}
</style>