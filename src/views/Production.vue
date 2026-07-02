<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getProduction } from '@/api/content'
import { img } from '@/utils/placeholder'

const lines = ref([
  { name: '瓦楞纸生产线', spec: '幅宽5.5m，车速800m/min', capacity: '年产25万吨', feature: '德国BHS技术', image: img(500,300,'BHS瓦楞线') },
  { name: '箱板纸生产线', spec: '幅宽4.8m，车速650m/min', capacity: '年产15万吨', feature: '美国KBC技术', image: img(500,300,'Valmet造纸机') },
  { name: '纸板加工线', spec: '全自动联动线', capacity: '年产10万吨', feature: '意大利Fosber技术', image: img(500,300,'协旭加工线') },
])
const equipments = ref([
  { name: '全自动碎浆系统', image: img(200,150,'碎浆') },
  { name: '高频疏解机', image: img(200,150,'疏解') },
  { name: '四辊三压区压榨', image: img(200,150,'压榨') },
  { name: '热风干燥系统', image: img(200,150,'干燥') },
  { name: '自动卷纸机', image: img(200,150,'卷纸') },
  { name: 'DCS集散控制系统', image: img(200,150,'DCS') },
  { name: 'QCS质量控制系统', image: img(200,150,'QCS') },
  { name: '全自动打包线', image: img(200,150,'打包') },
] as any[])
const prodStats = ref([
  { value: '50万', label: '吨/年' },
  { value: '3', label: '条生产线' },
  { value: '800', label: 'm/min' },
  { value: '99.5%', label: '合格率' },
])

onMounted(async () => {
  try {
    const res = await getProduction() as any
    if (res?.data) {
      if (res.data.lines) lines.value = res.data.lines
      if (res.data.equipments) equipments.value = res.data.equipments
      if (res.data.stats) prodStats.value = res.data.stats
    }
  } catch {}
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>生产实力</h1>
        <p>先进设备，铸就卓越品质</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <SectionTitle title="生产线" subtitle="国际主流技术装备" />
        <div class="line-grid">
          <div v-for="line in lines" :key="line.name" class="line-card scroll-reveal">
            <img v-if="line.image" :src="line.image" :alt="line.name" class="line-img" loading="lazy" />
            <h3>{{ line.name }}</h3>
            <div class="params">
              <div class="param"><span class="label">规格</span><span>{{ line.spec }}</span></div>
              <div class="param"><span class="label">产能</span><span>{{ line.capacity }}</span></div>
              <div class="param"><span class="label">技术</span><span class="tag">{{ line.feature }}</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-wood">
      <div class="container">
        <SectionTitle title="核心设备" subtitle="关键设备均为国际一线品牌" />
        <div class="equip-grid">
          <div v-for="eq in equipments" :key="(typeof eq === 'string' ? eq : eq.name)" class="equip-item scroll-reveal">
            <img v-if="typeof eq !== 'string' && eq.image" :src="eq.image" alt="" class="equip-thumb" loading="lazy" />
            <span class="check">&#10003;</span>
            <span>{{ typeof eq === 'string' ? eq : eq.name }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <SectionTitle title="产能数据" subtitle="数字见证实力" light />
        <div class="data-grid">
          <div v-for="s in prodStats" :key="s.label" class="data-item">
            <span class="num">{{ s.value }}</span>
            <span class="label">{{ s.label }}</span>
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

.line-grid {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg;
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: repeat(3, 1fr); }
}

.line-card {
  background: @color-white; border-radius: @radius-lg; overflow: hidden;
  box-shadow: @shadow-sm; transition: @transition-base;
  &:hover { transform: translateY(-4px); box-shadow: @shadow-lg; }
  .line-img { width: 100%; height: 180px; object-fit: cover; display: block; }
  padding: 0 0 @spacing-lg 0;
  h3 { color: @color-primary; font-size: @font-size-lg; padding: @spacing-md @spacing-xl; margin: 0; }
  .params { padding: 0 @spacing-xl; .param { display: flex; gap: @spacing-sm; margin-bottom: @spacing-sm; font-size: @font-size-sm;
    .label { color: @color-text-secondary; min-width: 35px; }
    .tag { display: inline-block; padding: 1px 8px; background: fade(@color-primary, 10%); color: @color-primary; border-radius: @radius-sm; }
  }}
}

.equip-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: @spacing-md; max-width: 700px; margin: 0 auto;
  .equip-item {
    display: flex; align-items: center; gap: @spacing-sm;
    padding: @spacing-sm @spacing-md; background: @color-white;
    border-radius: @radius-md; font-size: @font-size-sm;
    .equip-thumb { width: 36px; height: 36px; border-radius: @radius-sm; object-fit: cover; flex-shrink: 0; }
    .check { color: @color-primary-light; font-weight: bold; }
  }
}

.data-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: @spacing-xl;
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: repeat(4, 1fr); }
  text-align: center;
  .data-item {
    .num { display: block; font-size: @font-size-2xl; font-weight: bold; }
    .label { font-size: @font-size-sm; opacity: 0.7; margin-top: @spacing-xs; display: block; }
  }
}
</style>
