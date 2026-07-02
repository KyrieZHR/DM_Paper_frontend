<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { useRouter } from 'vue-router'
import { getCompanyInfo } from '@/api/content'
import { img } from '@/utils/placeholder'

const router = useRouter()
const company = ref<any>(null)

const stats = ref([
  { value: 20, suffix: '年', label: '行业经验' },
  { value: 200, suffix: '+', label: '员工规模' },
  { value: 50, suffix: '万吨', label: '年产能' },
  { value: 500, suffix: '+', label: '合作客户' },
])

const advantages = ref([
  { icon: '♻️', title: '绿色生产', desc: '全流程废水处理，废纸回收利用率98%' },
  { icon: '⚙️', title: '智能制造', desc: '全自动化产线，AI质检系统' },
  { icon: '📦', title: '品质稳定', desc: 'ISO9001认证，批次可追溯' },
  { icon: '🚚', title: '准时交付', desc: '自有物流团队，48小时直达' },
])

onMounted(async () => {
  try {
    const res = await getCompanyInfo() as any
    console.log('[Home] getCompanyInfo response:', res)
    if (res && res.data) {
      company.value = res.data
      stats.value = res.data.stats || stats.value
      advantages.value = res.data.advantages || advantages.value
    }
  } catch (e) { console.error('[Home] fetch error:', e) }
})
</script>

<template>
  <div>
    <!-- Hero -->
    <section class="hero">
      <div class="hero-bg">
        <div class="hero-grid"></div>
        <div class="hero-glow"></div>
      </div>
      <div class="hero-content">
        <span class="hero-badge">专业包装用纸生产商</span>
        <h1 class="hero-title">品质包装 <span class="gradient-text">· 绿色未来</span></h1>
        <p class="hero-subtitle">专注包装用纸生产20年，以技术创新驱动可持续发展，为全球客户提供高品质瓦楞纸、箱板纸解决方案</p>
        <div class="hero-actions">
          <button class="btn-primary" @click="router.push('/products')">了解产品</button>
          <button class="btn-outline" @click="router.push('/about')">关于我们</button>
        </div>
      </div>
      <div class="hero-scroll">
        <span>向下滚动</span>
        <div class="scroll-arrow"></div>
      </div>
    </section>

    <!-- Stats -->
    <section class="stats-section section-dark">
      <ScrollReveal>
        <div class="stats-grid">
          <div v-for="s in stats" :key="s.label" class="stat-item">
            <span class="stat-value">{{ s.value }}</span>
            <span class="stat-suffix">{{ s.suffix }}</span>
            <span class="stat-label">{{ s.label }}</span>
          </div>
        </div>
      </ScrollReveal>
    </section>

    <!-- Advantages -->
    <section class="section section-light">
      <div class="container">
        <SectionTitle title="核心优势" subtitle="以品质立身，以创新致远" />
        <div class="advantages-grid">
          <div v-for="(a, i) in advantages" :key="a.title" class="advantage-card scroll-reveal" :style="{ transitionDelay: `${i * 0.08}s` }">
            <div class="advantage-icon">
              <span class="icon-emoji">{{ a.icon }}</span>
              <div class="icon-ring"></div>
            </div>
            <h3>{{ a.title }}</h3>
            <p>{{ a.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Preview -->
    <section class="section section-wood">
      <div class="container">
        <div class="about-preview scroll-reveal">
          <div class="about-text">
            <h2>关于 <span class="gradient-text">{{ company?.name || '东淼纸业' }}</span></h2>
            <p>{{ company?.description || '成立于2006年，位于福建省漳州市，占地12万平方米，引进国际先进造纸生产线，专业生产瓦楞纸、箱板纸等包装用纸产品。二十年来始终坚持"品质为本、绿色为魂"的经营理念。' }}</p>
            <div class="about-stats-mini">
              <div v-for="s in stats.slice(0, 2)" :key="s.label" class="mini-stat">
                <span class="mini-value">{{ s.value }}{{ s.suffix }}</span>
                <span class="mini-label">{{ s.label }}</span>
              </div>
            </div>
            <button class="btn-primary" @click="router.push('/about')">了解更多</button>
          </div>
          <div class="about-visual">
            <div class="visual-card">
              <img :src="company?.cover || img(400,300,'智能工厂')" alt="工厂实景" class="factory-img" loading="lazy" />
              <div class="visual-badge">
                <span class="dot"></span>
                智慧工厂
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
// == Hero ==
.hero {
  position: relative;
  height: 90vh;
  min-height: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: @color-dark;
  overflow: hidden;

  .hero-bg {
    position: absolute; inset: 0;
    .hero-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(fade(#334155, 12%) 1px, transparent 1px),
        linear-gradient(90deg, fade(#334155, 12%) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    .hero-glow {
      position: absolute;
      top: -30%;
      left: 50%;
      transform: translateX(-50%);
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, fade(@color-primary, 12%) 0%, transparent 70%);
      pointer-events: none;
    }
  }

  .hero-content {
    position: relative;
    z-index: 1;
    text-align: center;
    max-width: 800px;
    padding: 0 @spacing-lg;
  }

  .hero-badge {
    display: inline-block;
    padding: 6px 16px;
    font-size: @font-size-xs;
    font-weight: 500;
    letter-spacing: 0.1em;
    color: @color-primary-light;
    background: fade(@color-primary, 15%);
    border: 1px solid fade(@color-primary, 30%);
    border-radius: @radius-full;
    margin-bottom: @spacing-xl;
  }

  .hero-title {
    font-size: @font-size-4xl;
    font-weight: 800;
    line-height: 1.15;
    letter-spacing: -0.03em;
    color: @color-white;
    margin-bottom: @spacing-lg;
    .mobile-tablet({ font-size: @font-size-3xl; });
  }

  .hero-subtitle {
    font-size: @font-size-lg;
    line-height: 1.7;
    color: @color-muted;
    max-width: 640px;
    margin: 0 auto @spacing-xl;
  }

  .hero-actions {
    display: flex;
    gap: @spacing-md;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-scroll {
    position: absolute;
    bottom: @spacing-xl;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: @spacing-sm;
    color: @color-muted;
    font-size: @font-size-xs;
    letter-spacing: 0.1em;
    animation: float 2s ease-in-out infinite;

    .scroll-arrow {
      width: 1px; height: 24px;
      background: linear-gradient(to bottom, @color-muted, transparent);
    }
  }
}

@keyframes float {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}

// == Stats ==
.stats-grid {
  max-width: @container-max;
  margin: 0 auto;
  padding: @spacing-3xl @spacing-lg;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: @spacing-xl;
  .desktop({ grid-template-columns: repeat(4, 1fr); });
}

.stat-item {
  text-align: center;
  padding: @spacing-xl;
  .stat-value {
    display: inline;
    font-size: @font-size-4xl;
    font-weight: 800;
    letter-spacing: -0.03em;
    background: linear-gradient(135deg, @color-primary-light, @color-white);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    .mobile-tablet({ font-size: @font-size-3xl; });
  }
  .stat-suffix {
    font-size: @font-size-2xl;
    font-weight: 700;
    color: fade(@color-primary-light, 70%);
    margin-left: 2px;
  }
  .stat-label {
    display: block;
    font-size: @font-size-sm;
    color: fade(@color-white, 60%);
    margin-top: @spacing-sm;
    letter-spacing: 0.05em;
  }
}

// == Advantages ==
.advantages-grid {
  max-width: @container-max;
  margin: 0 auto;
  padding: 0 @spacing-lg;
  display: grid;
  grid-template-columns: 1fr;
  gap: @spacing-lg;
  .tablet({ grid-template-columns: repeat(2, 1fr); });
  .desktop({ grid-template-columns: repeat(4, 1fr); });
}

.advantage-card {
  text-align: center;
  padding: @spacing-2xl @spacing-xl;
  background: @color-white;
  border: 1px solid @color-border;
  border-radius: @radius-lg;
  transition: @transition-base;
  &:hover {
    transform: translateY(-4px);
    box-shadow: @shadow-lg;
    border-color: fade(@color-primary, 20%);
    .icon-ring { transform: scale(1.15); border-color: @color-primary-light; }
  }

  .advantage-icon {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: @spacing-lg;
    .icon-emoji { font-size: 36px; position: relative; z-index: 1; }
    .icon-ring {
      position: absolute;
      width: 64px; height: 64px;
      border: 1.5px solid fade(@color-primary, 20%);
      border-radius: @radius-full;
      transition: @transition-base;
    }
  }

  h3 {
    font-size: @font-size-lg;
    font-weight: 700;
    color: @color-text;
    margin-bottom: @spacing-sm;
  }
  p {
    font-size: @font-size-sm;
    color: @color-text-secondary;
    line-height: 1.7;
  }
}

// == About Preview ==
.about-preview {
  max-width: @container-max;
  margin: 0 auto;
  padding: 0 @spacing-lg;
  display: grid;
  gap: @spacing-2xl;
  align-items: center;
  .desktop({ grid-template-columns: 1fr 1fr; });
}

.about-text {
  h2 {
    font-size: @font-size-3xl;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: @spacing-lg;
    .mobile-tablet({ font-size: @font-size-2xl; });
  }
  p {
    line-height: 1.8;
    color: @color-text-secondary;
    font-size: @font-size-base;
    margin-bottom: @spacing-xl;
  }
}

.about-stats-mini {
  display: flex;
  gap: @spacing-xl;
  margin-bottom: @spacing-xl;
  .mini-stat {
    .mini-value { display: block; font-size: @font-size-xl; font-weight: 700; color: @color-primary; }
    .mini-label { font-size: @font-size-xs; color: @color-text-secondary; }
  }
}

.about-visual {
  .visual-card {
    position: relative;
    .factory-img { width: 100%; height: auto; border-radius: @radius-lg; display: block; box-shadow: @shadow-lg; }
    .visual-badge {
      position: absolute;
      bottom: @spacing-md;
      right: @spacing-md;
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      background: fade(@color-dark, 80%);
      backdrop-filter: blur(8px);
      border: 1px solid fade(@color-primary, 30%);
      border-radius: @radius-full;
      font-size: @font-size-xs;
      color: @color-primary-light;
      .dot {
        width: 6px; height: 6px;
        background: @color-primary-light;
        border-radius: @radius-full;
        animation: pulse-dot 2s ease-in-out infinite;
      }
    }
  }
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.3; }
}
</style>
