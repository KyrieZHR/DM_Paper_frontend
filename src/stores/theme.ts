import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isMenuOpen = ref(false)

  function toggleMenu() { isMenuOpen.value = !isMenuOpen.value }
  function closeMenu() { isMenuOpen.value = false }

  return { isMenuOpen, toggleMenu, closeMenu }
})
