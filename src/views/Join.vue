<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getJobs } from '@/api/content'

const positions = ref([
  { title: '造纸车间主任', dept: '生产部', location: '漳州厂区', type: '全职', desc: '负责造纸车间日常生产管理，确保产线高效运转。' },
  { title: '品质主管', dept: '品质部', location: '漳州厂区', type: '全职', desc: '负责来料检验、过程控制及成品检测的全流程质量管理。' },
  { title: '设备工程师', dept: '设备部', location: '漳州厂区', type: '全职', desc: '负责造纸设备维护保养及技术改造。' },
  { title: '销售经理', dept: '销售部', location: '厦门办事处', type: '全职', desc: '负责区域市场开拓及客户维护。' },
])

onMounted(async () => {
  try {
    const res = await getJobs() as any
    if (res?.data) positions.value = res.data
  } catch {}
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>加入我们</h1>
        <p>与我们一起，共创未来</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <SectionTitle title="人才理念" subtitle="以人为本，共同成长" />
        <div class="philosophy scroll-reveal">
          <p>人才是企业的第一资源。我们为每一位员工提供广阔的发展平台和完善的培养体系，让每个人在东淼纸业都能实现自我价值。</p>
        </div>
      </div>
    </section>

    <section class="section section-wood">
      <div class="container">
        <SectionTitle title="热招岗位" subtitle="期待你的加入" />
        <div class="position-list">
          <div v-for="p in positions" :key="p.title" class="position-card scroll-reveal">
            <div class="header">
              <h3>{{ p.title }}</h3>
              <span class="type">{{ p.type }}</span>
            </div>
            <div class="info">
              <span>部门：{{ p.dept }}</span>
              <span>地点：{{ p.location }}</span>
            </div>
            <p>{{ p.desc }}</p>
            <a class="apply-btn">立即申请</a>
          </div>
        </div>
        <div class="cta scroll-reveal">
          <p>更多岗位信息，请登录内部管理系统查看</p>
          <button class="btn-primary" @click="$router.push('/contact')">联系我们</button>
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

.philosophy {
  max-width: 700px; margin: 0 auto; text-align: center;
  p { line-height: 2; color: @color-text-secondary; }
}

.position-list {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg;
  @media (min-width: (@bp-mobile + 1)) { grid-template-columns: repeat(2, 1fr); }
}

.position-card {
  background: @color-white; padding: @spacing-lg; border-radius: @radius-lg;
  box-shadow: @shadow-sm; transition: @transition-base;
  &:hover { transform: translateY(-4px); box-shadow: @shadow-md; }
  .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: @spacing-sm;
    h3 { color: @color-primary; font-size: @font-size-base; }
    .type { font-size: @font-size-sm; color: @color-white; background: @color-accent; padding: 0 10px; border-radius: @radius-sm; }
  }
  .info { display: flex; gap: @spacing-lg; margin-bottom: @spacing-sm; font-size: @font-size-sm; color: @color-text-secondary; }
  p { font-size: @font-size-sm; color: @color-text-secondary; margin-bottom: @spacing-md; line-height: 1.6; }
  .apply-btn { font-size: @font-size-sm; color: @color-primary; cursor: pointer; font-weight: bold;
    &:hover { text-decoration: underline; }
  }
}

.cta { text-align: center; margin-top: @spacing-2xl;
  p { color: @color-text-secondary; margin-bottom: @spacing-md; }
}
</style>
