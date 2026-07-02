<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<template>
  <AppHeader />
  <main class="main">
    <router-view />
  </main>
  <AppFooter />
</template>

<style scoped lang="less">
.main {
  padding-top: 72px;
  min-height: 100vh;
}
</style>
