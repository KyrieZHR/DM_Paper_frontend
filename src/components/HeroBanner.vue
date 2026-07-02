<script setup lang="ts">
import { ref, onMounted } from 'vue'

defineProps<{
  title: string
  subtitle: string
  height?: string
  bgImage?: string
}>()

const isVisible = ref(false)
onMounted(() => { setTimeout(() => { isVisible.value = true }, 200) })
</script>

<template>
  <section
    class="hero-banner"
    :style="{ height: height || '80vh', backgroundImage: bgImage ? `url(${bgImage})` : undefined }"
  >
    <div class="overlay"></div>
    <div class="content" :class="{ visible: isVisible }">
      <h1>{{ title }}</h1>
      <p>{{ subtitle }}</p>
      <slot name="actions" />
    </div>
  </section>
</template>

<style scoped lang="less">
.hero-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  .overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.4));
  }

  .content {
    position: relative;
    z-index: 1;
    text-align: center;
    color: @color-white;
    padding: 0 @spacing-lg;
    max-width: 800px;
    opacity: 0;
    transform: translateY(30px);
    transition: all 1s ease 0.3s;

    &.visible {
      opacity: 1;
      transform: translateY(0);
    }

    h1 {
      font-size: @font-size-3xl;
      margin-bottom: @spacing-lg;
      @media (max-width: @bp-mobile) { font-size: @font-size-2xl; }
    }

    p {
      font-size: @font-size-lg;
      opacity: 0.9;
      line-height: 1.8;
      @media (max-width: @bp-mobile) { font-size: @font-size-base; }
    }
  }
}
</style>
