<template>
  <ul>
    <app-list-item
      v-for="(item, index) in items"
      :key="index"
      :is-do="item.isDo"
      :title="item.title"
      @done="onDone"
    />
  </ul>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import AppListItem from '~/components/AppListItem.vue'

type ItemInterface = {
  isDo: boolean
  title: string
}

@Component({
  components: {
    AppListItem
  }
})
export default class AppList extends Vue {
  @Prop({ default: () => [] })
  items!: ItemInterface[]

  onDone({ title: inputTitle, status }) {
    const targetItem = this.items.find(({ title }) => title === inputTitle)
    console.log(targetItem)
    targetItem.isDo = status
  }
}
</script>
