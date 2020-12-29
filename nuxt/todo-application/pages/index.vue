<template>
  <div class="container">
    <app-list :items="items" />
    <div>
      <input v-model="inputTitle" type="text" />
      <button @click="addItem">
        追加
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AppList from '@/components/AppList.vue'

type ItemInterface = {
  isDo: boolean
  title: string
}

const itemList: ItemInterface[] = [
  { isDo: false, title: 'タスク1' },
  { isDo: true, title: 'タスク2' },
  { isDo: false, title: 'タスク3' }
]

@Component({
  components: {
    AppList
  }
})
export default class extends Vue {
  items: ItemInterface[] = itemList
  inputTitle: string = ''

  addItem() {
    this.items.push({
      isDo: false,
      title: this.inputTitle
    })
    this.inputTitle = ''
  }
}
</script>
