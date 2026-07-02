<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getQuality } from '@/api/content'

const steps = ref([
  { title: '原料检验', desc: '废纸/木浆分级检测，杜绝劣质原料进厂' },
  { title: '过程控制', desc: 'QCS在线检测+人工抽检，实时监控20+质量参数' },
  { title: '成品检测', desc: '环压/耐破/吸水性/定量等全项检测' },
  { title: '出库复核', desc: '每批次留样封存，实现质量可追溯' },
])
const certs = ref([
  { name: 'ISO9001', full: '质量管理体系认证' },
  { name: 'ISO14001', full: '环境管理体系认证' },
  { name: 'OHSAS18001', full: '职业健康安全管理体系认证' },
])

onMounted(async () => {
  try {
    const res = await getQuality() as any
    if (res?.data) {
      if (res.data.steps) steps.value = res.data.steps
      if (res.data.certs) certs.value = res.data.certs
    }
  } catch {}
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>品质保障</h1>
        <p>每一张纸，都值得信赖</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <SectionTitle title="质量认证" subtitle="国际标准，权威认证" />
        <div class="certs-row">
          <div v-for="c in certs" :key="c.name" class="cert-card scroll-reveal">
            <h3>{{ c.name }}</h3>
            <p>{{ c.full }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-wood">
      <div class="container">
        <SectionTitle title="质检流程" subtitle="四重把关，层层保障" />
        <div class="steps-grid">
          <div v-for="(s, i) in steps" :key="s.title" class="step-card scroll-reveal">
            <div class="step-num">{{ i + 1 }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container-narrow">
        <SectionTitle title="我们的承诺" subtitle="品质是企业的生命" light />
        <div class="promise scroll-reveal">
          <p>我们承诺每一批次产品均经过严格检测，提供完整的质量检测报告。如出现质量问题，无条件退换。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="less">
.sub-banner {
  position: relative; height: 300px; display: flex;
  align-items: center; justify-content: center;
  background: linear-gradient(135deg, @color-primary, darken(@color-primary, 5%));
  .overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.2); }
  .content { position: relative; z-index: 1; text-align: center; color: @color-white;
    h1 { font-size: @font-size-2xl; margin-bottom: @spacing-sm; }
    p { font-size: @font-size-lg; opacity: 0.9; }
  }
}

.certs-row {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg; max-width: 700px; margin: 0 auto;
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: repeat(3, 1fr); }
  .cert-card {
    text-align: center; padding: @spacing-xl; background: @color-white;
    border-radius: @radius-lg; box-shadow: @shadow-sm;
    h3 { color: @color-primary; font-size: @font-size-xl; margin-bottom: @spacing-sm; }
    p { font-size: @font-size-sm; color: @color-text-secondary; }
  }
}

.steps-grid {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg;
  @media (min-width: (@bp-mobile + 1)) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: repeat(4, 1fr); }
}

.step-card {
  text-align: center; padding: @spacing-xl; background: @color-white;
  border-radius: @radius-lg; box-shadow: @shadow-sm; position: relative;
  .step-num {
    width: 40px; height: 40px; border-radius: @radius-full;
    background: @color-primary; color: @color-white; display: flex;
    align-items: center; justify-content: center;
    margin: 0 auto @spacing-md; font-weight: bold; font-size: @font-size-lg;
  }
  h3 { margin-bottom: @spacing-sm; color: @color-primary; }
  p { font-size: @font-size-sm; color: @color-text-secondary; line-height: 1.6; }
}

.container-narrow { max-width: @container-narrow; margin: 0 auto; padding: 0 @spacing-lg; }

.promise {
  text-align: center; max-width: 600px; margin: 0 auto;
  p { line-height: 2; font-size: @font-size-base; opacity: 0.9; }
}
</style>
