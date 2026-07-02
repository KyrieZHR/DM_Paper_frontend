<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getTechnology } from '@/api/content'

const tech = ref<any>(null)
const highlights = ref([
  { title: 'DCS集散控制系统', desc: '实现全产线自动化控制，生产效率提升30%' },
  { title: 'AI智能质检', desc: '基于机器视觉的在线质量检测，缺陷识别率达99.5%' },
  { title: 'MES生产执行系统', desc: '生产过程数字化管理，实现批次全程追溯' },
  { title: '智能仓储物流', desc: 'AGV自动导引车+WMS仓储管理，物流效率提升40%' },
])
const patents = ref([
  '一种高强瓦楞纸生产方法', '造纸废水处理循环利用系统',
  '低克重高耐破箱板纸配方', '造纸烘干余热回收装置',
  '自动化纸卷打包设备', '一种环保型造纸助剂',
])
const partners = ref<string[]>([])

onMounted(async () => {
  try {
    const res = await getTechnology() as any
    if (res?.data) {
      tech.value = res.data
      highlights.value = res.data.highlights
      patents.value = res.data.patents
      partners.value = res.data.partners || []
    }
  } catch {}
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>技术创新</h1>
        <p>科技赋能，智造未来</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <SectionTitle title="智能制造" subtitle="打造数字化智慧工厂" />
        <div class="tech-grid">
          <div v-for="h in highlights" :key="h.title" class="tech-card scroll-reveal">
            <div class="icon-wrap">
              <span class="icon">&#9881;</span>
            </div>
            <h3>{{ h.title }}</h3>
            <p>{{ h.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-wood">
      <div class="container-narrow">
        <SectionTitle title="研发中心" subtitle="持续创新，驱动发展" />
        <div class="rd-content scroll-reveal">
          <p>公司设有省级企业技术中心，拥有专职研发人员30余人，其中高级工程师5人，硕士以上学历占比40%。研发中心配备先进检测仪器和试验设备，年研发投入占销售收入3%以上。</p>
          <p v-if="partners.length">公司与{{ partners.join('、') }}建立了长期产学研合作关系，在造纸工艺优化、废水处理技术、新型纸品开发等领域开展深度合作。</p>
          <p v-else>公司与华南理工大学制浆造纸工程国家重点实验室、福建省造纸工业研究院建立了长期产学研合作关系，在造纸工艺优化、废水处理技术、新型纸品开发等领域开展深度合作。</p>
        </div>
      </div>
    </section>

    <section class="section section-dark">
      <div class="container">
        <SectionTitle title="专利技术" subtitle="自主知识产权" light />
        <div class="patent-grid">
          <div v-for="p in patents" :key="p" class="patent-item scroll-reveal">
            <span class="num">&#10003;</span>
            <span>{{ p }}</span>
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

.tech-grid {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg;
  @media (min-width: (@bp-mobile + 1)) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: repeat(4, 1fr); }
}

.tech-card {
  text-align: center; padding: @spacing-xl; background: @color-white;
  border-radius: @radius-lg; box-shadow: @shadow-sm;
  transition: @transition-base;
  &:hover { transform: translateY(-4px); box-shadow: @shadow-md; }
  .icon-wrap {
    width: 60px; height: 60px; border-radius: @radius-full;
    background: fade(@color-accent, 10%); display: flex; align-items: center;
    justify-content: center; margin: 0 auto @spacing-md;
    .icon { font-size: 28px; color: @color-accent; }
  }
  h3 { color: @color-accent; margin-bottom: @spacing-sm; font-size: @font-size-base; }
  p { font-size: @font-size-sm; color: @color-text-secondary; line-height: 1.6; }
}

.container-narrow { max-width: @container-narrow; margin: 0 auto; padding: 0 @spacing-lg; }

.rd-content {
  max-width: 700px; margin: 0 auto;
  p { line-height: 2; margin-bottom: @spacing-md; color: @color-text-secondary; }
}

.patent-grid {
  display: grid; grid-template-columns: repeat(2, 1fr); gap: @spacing-md; max-width: 600px; margin: 0 auto;
  .patent-item {
    display: flex; align-items: center; gap: @spacing-sm;
    font-size: @font-size-sm;
    .num { color: @color-primary-light; font-weight: bold; }
  }
}
</style>
