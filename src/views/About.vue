<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getCompanyInfo, getMilestones, getValues } from '@/api/content'
import { img } from '@/utils/placeholder'

const company = ref<any>(null)
const milestones = ref([
  { year: '2006', event: '公司成立，首条造纸生产线投产', image: img(200,120,'2006') },
  { year: '2010', event: '通过ISO9001质量管理体系认证', image: img(200,120,'2010') },
  { year: '2014', event: '引进德国BHS瓦楞纸生产线，产能翻番', image: img(200,120,'2014') },
  { year: '2018', event: '建成废水处理系统，获评"绿色工厂"', image: img(200,120,'2018') },
  { year: '2021', event: '年产能突破50万吨，客户超500家', image: img(200,120,'2021') },
  { year: '2024', event: '启动智能制造升级，建设数字化产线', image: img(200,120,'2024') },
])
const values = ref([
  { title: '品质为本', desc: '每一张纸都经得起检验', icon: '✅' },
  { title: '绿色为魂', desc: '环保是企业的生命线', icon: '🌿' },
  { title: '创新为源', desc: '技术驱动持续进步', icon: '💡' },
  { title: '客户为先', desc: '以客户需求为导向', icon: '🤝' },
])

onMounted(async () => {
  try {
    const [cr, mr, vr] = await Promise.all([getCompanyInfo(), getMilestones(), getValues()]) as any[]
    console.log('[About] API responses:', { company: cr, milestones: mr, values: vr })
    if (cr?.data) company.value = cr.data
    if (mr?.data) milestones.value = mr.data
    if (vr?.data) values.value = vr.data
  } catch (e) { console.error('[About] fetch error:', e) }
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>关于我们</h1>
        <p>二十载匠心，只为一张好纸</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container-narrow">
        <SectionTitle title="公司简介" subtitle="专业包装用纸生产商" />
        <img :src="company?.cover || img(800,400,'东淼纸业')" alt="公司全景" class="about-cover" loading="lazy" />
        <div class="intro-text scroll-reveal">
          <p v-for="(p, i) in (company?.about || ['东淼纸业成立于2006年，坐落于福建省漳州市，占地面积12万平方米。公司累计投资8亿元，引进国际先进造纸生产线，专业生产瓦楞纸、箱板纸等包装用纸产品。'])" :key="i">{{ p }}</p>
        </div>
      </div>
    </section>

    <section class="section section-wood">
      <div class="container-narrow">
        <SectionTitle title="发展历程" subtitle="每一步都脚踏实地" />
        <div class="timeline">
          <div v-for="(m, i) in milestones" :key="m.year" class="timeline-item scroll-reveal" :style="{ transitionDelay: `${i * 0.1}s` }">
            <div class="dot"></div>
            <div class="card">
              <span class="year">{{ m.year }}</span>
              <p>{{ m.event }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <SectionTitle title="企业文化" subtitle="价值观驱动发展" />
        <div class="values-grid">
          <div v-for="v in values" :key="v.title" class="value-card scroll-reveal">
            <span class="icon">{{ v.icon }}</span>
            <h3>{{ v.title }}</h3>
            <p>{{ v.desc }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.sub-banner {
  position: relative; height: 300px; display: flex;
  align-items: center; justify-content: center;
  background: @color-dark; overflow: hidden;
  &::before {
    content: ''; position: absolute; inset: 0;
    background-image:
      linear-gradient(fade(#334155, 10%) 1px, transparent 1px),
      linear-gradient(90deg, fade(#334155, 10%) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .overlay { position: absolute; inset: 0; background: radial-gradient(ellipse at center, fade(@color-primary, 8%) 0%, transparent 70%); }
  .content { position: relative; z-index: 1; text-align: center;
    h1 { font-size: @font-size-3xl; font-weight: 800; letter-spacing: -0.02em; color: @color-white; margin-bottom: @spacing-sm; }
    p { font-size: @font-size-lg; color: @color-muted; }
  }
}

.container-narrow {
  max-width: @container-narrow; margin: 0 auto; padding: 0 @spacing-lg;
}

.about-cover {
  width: 100%; border-radius: @radius-lg; margin-bottom: @spacing-xl; display: block; box-shadow: @shadow-lg;
}
.intro-text {
  p { line-height: 2; margin-bottom: @spacing-md; color: @color-text-secondary; font-size: @font-size-base; }
}

.timeline {
  position: relative; padding-left: 30px;
  &::before {
    content: ''; position: absolute; left: 8px; top: 0; bottom: 0;
    width: 2px; background: @color-primary; opacity: 0.3;
  }
  .timeline-item {
    position: relative; margin-bottom: @spacing-xl;
    .dot {
      position: absolute; left: -26px; top: 4px;
      width: 14px; height: 14px; border-radius: @radius-full;
      background: @color-primary; border: 3px solid @color-surface-light;
    }
    .card {
      background: @color-white; padding: @spacing-md @spacing-lg;
      border-radius: @radius-md; box-shadow: @shadow-sm;
      .year { font-weight: bold; color: @color-primary; font-size: @font-size-lg; display: block; margin-bottom: @spacing-xs; }
      p { color: @color-text-secondary; font-size: @font-size-sm; }
    }
  }
}

.values-grid {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg;
  @media (min-width: (@bp-mobile + 1)) { grid-template-columns: repeat(2, 1fr); }
  .value-card {
    text-align: center; padding: @spacing-xl; background: @color-white;
    border-radius: @radius-lg; box-shadow: @shadow-sm;
    transition: @transition-base;
    &:hover { transform: translateY(-4px); box-shadow: @shadow-md; }
    .icon { font-size: 40px; display: block; margin-bottom: @spacing-sm; }
    h3 { color: @color-primary; margin-bottom: @spacing-sm; }
    p { color: @color-text-secondary; font-size: @font-size-sm; }
  }
}
</style>
