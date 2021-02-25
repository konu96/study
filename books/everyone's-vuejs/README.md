# [みんなのVue.js](https://www.amazon.co.jp/dp/4297119021)
気になった部分のメモ

## props か slot か
`props` で全ての情報を渡そうとすると、props の数が膨大になる。一方、数を絞れば想定していないデザインになりにくいメリットにもなる。
`slot` のメリデメは `props` の逆になる。

```vue
<!-- props -->
<template>
  <BaseButton
    icon="star"
    text="star"
    type="primary"
    position="left"
  />
</template>>

<!-- slot -->
<template>
  <BaseButton>
    <i class="star"></i>     
    <span class="primary">star</span>
  </BaseButton>
</template>>
```

## sfc-style-variables

```vue
<template>
  <div class="text">hello</div>
</template>

<script>
export default {
  data() {
    return {
      color: 'red'
    }
  }
}
</script>

<style vars="{ color }">
.text {
  color: var(--color);
}
</style>
```

https://github.com/vuejs/rfcs/blob/sfc-improvements/active-rfcs/0000-sfc-style-variables.md

## deep セレクタ
親コンポーネントから子コンポーネントにスタイルを当てるために使う。基本的には使わない方がコンポーネント設計として良いが、以下の場合は使うしかない。

- `v-html` によって生成された DOM にスタイルを当てる
- Vue.js 製 UI ライブラリを使う場合

## Test Pyramid & Testing Trophy

- [Testing Trophy](https://testingjavascript.com/)
- [Test Pyramid](https://kentcdodds.com/blog/write-tests)

## 「実装のテスト」と「振る舞いのテスト」の違い

```javascript
it('振る舞いを検証しているテストケース', () => {
    const wrapper = shallowMount(SampleComponent)
    wrapper.find('button').trigger('click')
    
    expect(wrapper.find('.counter').text()).toMatch('1')
})

it('実装を検証しているテストケース', () => {
    const wrapper = shallowMount(SampleComponent)
    wrapper.vm.increment()

    expect(wrapper.vm.count).toBe(1)
})
```

## 単体テストと結合のテスト
明確な境界はない。テスト対象が依存する物をスタブ/モックしていない場合は、結合テストに分類できる。
ただ、全ての依存を結合せずテストしたい内容によって、スタブ/モックをしても良い。