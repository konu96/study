<template>
  <form class="form">
    <div class="input-container">
      <input id="Input-Name" class="input-container__input" name="Input-Name" type="text">
      <label for="Input-Name" class="input-container__label">お名前</label>
    </div>
    <div class="input-container">
      <input id="Input-Email" class="input-container__input" name="Input-Email" type="text">
      <label for="Input-Email" class="input-container__label">メールアドレス</label>
    </div>
    <div class="input-container">
      <input id="Input-Street" class="input-container__input" name="Input-Street" type="text">
      <label for="Input-Street" class="input-container__label">郵便番号</label>
    </div>
    <div class="input-container">
      <input id="Input-City" class="input-container__input" name="Input-City" type="text">
      <label for="Input-City" class="input-container__label">ご住所</label>
    </div>
  </form>
</template>

<script>
export default {};
</script>

<style lang="scss">
.form {
  background-color: white;
  padding: 20px;
  max-width: 400px;
  margin: 100px auto;
  overflow: hidden;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.25);
}

.input-container {
  margin: 0 0 5px 0;
  padding-top: 12px;
  position: relative;

  &__input {
    height: 24px;
    padding: 2px;
    border: none;
    border-bottom: 1px solid #ccc;
    font-size: 16px;
    line-height: 20px;
    color: #555;
    -webkit-font-smoothing: antialiased;
    outline: none;
    width: 100%;

    &:focus, &.filled {
      border-bottom: 1px solid #aaa;
    }

    &:focus + label, &.filled + label {
      font-size: 11px;
      line-height: 12px;
      top: 0;
      color: #777;
    }
  }

  &__label {
    position: absolute;
    top: 14px;
    left: 4px;
    color: #aaa;
    transition: all 0.2s;
    cursor: text;
    font-family: sans-serif;
    font-size: 16px;
    line-height: 24px;
  }
}
</style>
