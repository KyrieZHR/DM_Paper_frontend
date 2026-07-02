import { ref, onMounted, onUnmounted } from 'vue'

export function useScrollAnimation() {
  const containerRef = ref<HTMLElement | null>(null)

  function observe() {
    if (!containerRef.value) return
    const els = containerRef.value.querySelectorAll('.scroll-reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    els.forEach(el => observer.observe(el))
    return observer
  }

  let observer: IntersectionObserver | null = null

  onMounted(() => { observer = observe() })
  onUnmounted(() => { observer?.disconnect() })

  return { containerRef }
}
