<script setup lang="ts">
import { useScrollAnimation } from '@/composables/useScrollAnimation'
const { containerRef } = useScrollAnimation()
</script>

<template>
  <div ref="containerRef" class="scroll-reveal-wrapper">
    <slot />
  </div>
</template>
