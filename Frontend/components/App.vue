<template>
  <div class="content">
    <app-header />
    <router-view />
  </div>
</template>

<script>
import Header from "./Header.vue"

export default {
  components: {
    "app-header": Header
  }
}
</script>

<style scoped>
div.content {
  width: 640px;
  margin-left: auto;
  margin-right: auto;
}
</style>
