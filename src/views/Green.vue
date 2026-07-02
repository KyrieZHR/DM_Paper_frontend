<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getGreen } from '@/api/content'

const processes = ref([
  { icon: '💧', title: '废水处理', desc: '采用生化+物化处理工艺，出水COD稳定在50mg/L以下' },
  { icon: '♻️', title: '废纸回收', desc: '年回收利用废纸40万吨，废纸纤维利用率达98%' },
  { icon: '🌫️', title: '废气治理', desc: '配备高效湿法静电除尘器，颗粒物排放浓度≤10mg/Nm³' },
  { icon: '🔊', title: '噪声控制', desc: '厂区采用隔音屏障+低噪设备，厂界噪声达标率100%' },
])
const certs = ref([
  { name: 'ISO14001', desc: '环境管理体系认证' },
  { name: 'FSC', desc: '森林管理委员会认证' },
  { name: '绿色工厂', desc: '省级绿色工厂称号' },
  { name: '清洁生产', desc: '清洁生产审核认证企业' },
])
const envStats = ref([
  { label: '废水回用率', value: '98%' },
  { label: 'COD排放', value: '50 mg/L' },
  { label: '废纸年用量', value: '40万吨' },
  { label: '节能比例', value: '30%' },
])

onMounted(async () => {
  try {
    const res = await getGreen() as any
    if (res?.data) {
      if (res.data.processes) processes.value = res.data.processes
      if (res.data.certs) certs.value = res.data.certs
      if (res.data.stats) envStats.value = res.data.stats
    }
  } catch {}
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>绿色环保</h1>
        <p>绿水青山就是金山银山</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <SectionTitle title="环保理念" subtitle="将绿色融入每一个生产环节" />
        <div class="process-grid">
          <div v-for="p in processes" :key="p.title" class="process-card scroll-reveal">
            <span class="icon">{{ p.icon }}</span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-wood">
      <div class="container-narrow">
        <SectionTitle title="环保认证" subtitle="国际认可的绿色承诺" />
        <div class="certs-grid">
          <div v-for="c in certs" :key="c.name" class="cert-card scroll-reveal">
            <h3>{{ c.name }}</h3>
            <p>{{ c.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <SectionTitle title="环境数据" subtitle="可量化，可追溯" light />
        <div class="env-grid">
          <div v-for="s in envStats" :key="s.label" class="env-item">
            <span class="env-value"><span class="gradient-text">{{ s.value }}</span></span>
            <span class="env-label">{{ s.label }}</span>
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

.process-grid {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg;
  @media (min-width: (@bp-mobile + 1)) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: repeat(4, 1fr); }
}

.process-card {
  text-align: center; padding: @spacing-xl; background: @color-white;
  border-radius: @radius-lg; box-shadow: @shadow-sm;
  transition: @transition-base;
  &:hover { transform: translateY(-4px); box-shadow: @shadow-md; }
  .icon { font-size: 48px; display: block; margin-bottom: @spacing-md; }
  h3 { color: @color-primary; margin-bottom: @spacing-sm; }
  p { font-size: @font-size-sm; color: @color-text-secondary; line-height: 1.6; }
}

.container-narrow {
  max-width: @container-narrow; margin: 0 auto; padding: 0 @spacing-lg;
}

.certs-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: @spacing-lg; max-width: 600px; margin: 0 auto;
  .cert-card {
    background: @color-white; padding: @spacing-lg; border-radius: @radius-lg;
    text-align: center; box-shadow: @shadow-sm;
    h3 { color: @color-primary; margin-bottom: @spacing-xs; }
    p { font-size: @font-size-sm; color: @color-text-secondary; }
  }
}

.env-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: @spacing-xl; text-align: center;
  .desktop({ grid-template-columns: repeat(4, 1fr); });
  .env-item {
    .env-value { display: block; font-size: @font-size-3xl; font-weight: 800; margin-bottom: @spacing-xs; letter-spacing: -0.02em; }
    .env-label { font-size: @font-size-sm; color: fade(@color-white, 60%); }
  }
}
</style>
