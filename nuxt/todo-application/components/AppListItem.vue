<template>
  <li :class="{ is_do: isDo }" @click="done">
    {{ title }}
  </li>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'

@Component
export default class AppListItem extends Vue {
  @Prop({ required: true })
  isDo!: boolean

  @Prop({ required: true })
  title!: string

  done() {
    this.$emit('done', { title: this.title, status: !this.isDo })
  }
}
</script>

<style lang="scss" scoped>
li {
  cursor: pointer;
}
li.is-do {
  text-decoration: line-through;
}
</style>
