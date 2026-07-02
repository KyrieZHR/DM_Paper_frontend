<script setup lang="ts">
defineProps<{
  title: string
  subtitle?: string
  light?: boolean
}>()
</script>

<template>
  <div class="section-title" :class="{ 'scroll-reveal': true, light }">
    <h2>{{ title }}</h2>
    <p v-if="subtitle">{{ subtitle }}</p>
    <div class="divider"></div>
  </div>
</template>

<style scoped lang="less">
.section-title {
  text-align: center;
  margin-bottom: @spacing-3xl;

  h2 {
    font-size: @font-size-3xl;
    font-weight: 700;
    letter-spacing: -0.02em;
    margin-bottom: @spacing-sm;
    .mobile-tablet({ font-size: @font-size-2xl; });
  }

  p {
    color: @color-text-secondary;
    font-size: @font-size-lg;
    max-width: 560px;
    margin: 0 auto @spacing-md;
    line-height: 1.6;
  }

  .divider {
    width: 48px;
    height: 4px;
    background: linear-gradient(90deg, @color-primary, @color-primary-light);
    margin: 0 auto;
    border-radius: 2px;
  }

  &.light {
    h2 { color: @color-white; }
    p { color: fade(@color-white, 70%); }
    .divider { background: linear-gradient(90deg, @color-primary-light, @color-accent); }
  }
}
</style>
