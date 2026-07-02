<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getTeam } from '@/api/content'

const team = ref<any>(null)
const chairman = ref({ name: '陈建国', title: '董事长', gender: '男', description: '造纸行业资深专家，30年行业从业经验，带领公司从单一工厂发展为综合性纸业集团。' })
const executives = ref([
  { name: '张志强', title: '总经理', gender: '男', description: '负责公司整体运营管理，推行精益生产管理模式。' },
  { name: '李美华', title: '副总经理', gender: '女', description: '分管市场营销与客户服务，构建全国销售网络。' },
  { name: '王学峰', title: '总工程师', gender: '男', description: '主管技术研发与工艺改进，获多项国家专利。' },
  { name: '刘芳', title: '财务总监', gender: '女', description: '负责公司财务管理与资本运作，确保企业稳健发展。' },
  { name: '赵明德', title: '生产总监', gender: '男', description: '负责生产管理与安全环保，推动智能制造转型。' },
])

const gradients = [
  'linear-gradient(135deg, #667eea, #764ba2)',
  'linear-gradient(135deg, #f093fb, #f5576c)',
  'linear-gradient(135deg, #4facfe, #00f2fe)',
  'linear-gradient(135deg, #43e97b, #38f9d7)',
  'linear-gradient(135deg, #fa709a, #fee140)',
  'linear-gradient(135deg, #a18cd1, #fbc2eb)',
  'linear-gradient(135deg, #fccb90, #d57eeb)',
  'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
  'linear-gradient(135deg, #f5576c, #ff6f00)',
  'linear-gradient(135deg, #667eea, #43e97b)',
]
const avatarGrad = (str: string) => gradients[Math.abs(str.split('').reduce((a, c) => a + c.charCodeAt(0), 0)) % gradients.length]

const chairmanGrad = computed(() => avatarGrad(chairman.value.name))
const execGrad = (m: any) => avatarGrad(m.name)

onMounted(async () => {
  try {
    const res = await getTeam() as any
    if (res?.data) {
      team.value = res.data
      chairman.value = res.data.chairman
      executives.value = res.data.executives
    }
  } catch {}
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>管理团队</h1>
        <p>以专业团队，铸就品质包装</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container-narrow">
        <SectionTitle title="董事长致辞" subtitle="引领企业走向卓越" />
        <div class="chairman-card scroll-reveal">
          <div class="avatar">
            <div class="avatar-placeholder" :style="{ background: chairmanGrad }">{{ chairman.name.charAt(0) }}</div>
          </div>
          <div class="info">
            <h2>{{ chairman.name }}</h2>
            <span class="badge">{{ chairman.title }}</span>
            <p class="desc">{{ chairman.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-wood">
      <div class="container">
        <SectionTitle title="核心管理层" subtitle="经验丰富，各尽其责" />
        <div class="team-grid">
          <div v-for="member in executives" :key="member.name" class="team-card scroll-reveal">
             <div class="photo">
               <div class="photo-placeholder" :style="{ background: execGrad(member) }">{{ member.name.charAt(0) }}</div>
             </div>
            <div class="info">
              <h3>{{ member.name }}</h3>
              <span class="badge">{{ member.title }}</span>
              <p>{{ member.description }}</p>
            </div>
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

.container-narrow { max-width: @container-narrow; margin: 0 auto; padding: 0 @spacing-lg; }

.chairman-card {
  display: grid; gap: @spacing-xl; align-items: start;
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: 200px 1fr; }

  .avatar {
    .avatar-placeholder {
      width: 200px; height: 200px; border-radius: @radius-lg;
      background: linear-gradient(135deg, @color-primary, @color-accent);
      display: flex; align-items: center; justify-content: center;
      font-size: 64px; color: @color-white; font-weight: bold;
      box-shadow: @shadow-md;
    }
  }
  .info {
    h2 { font-size: @font-size-2xl; color: @color-text; margin-bottom: @spacing-sm; }
    .badge {
      display: inline-block; padding: 2px 12px; background: @color-primary;
      color: @color-white; border-radius: @radius-sm; font-size: @font-size-sm;
      margin-bottom: @spacing-md;
    }
    .desc { line-height: 1.8; color: @color-text-secondary; }
  }
}

.team-grid {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg;
  @media (min-width: (@bp-mobile + 1)) and (max-width: @bp-tablet) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: (@bp-tablet + 1)) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.team-card {
  background: @color-white; border-radius: @radius-lg; overflow: hidden;
  box-shadow: @shadow-sm; transition: @transition-base;
  &:hover { transform: translateY(-6px); box-shadow: @shadow-lg; }

  .photo .photo-placeholder {
    height: 200px; background: linear-gradient(135deg, @color-primary, #047857);
    display: flex; align-items: center; justify-content: center;
    font-size: 48px; color: @color-white; font-weight: bold;
  }

  .info { padding: @spacing-lg;
    h3 { font-size: @font-size-lg; margin-bottom: @spacing-xs; }
    .badge {
      display: inline-block; padding: 2px 10px; background: fade(@color-primary, 10%);
      color: @color-primary; border-radius: @radius-sm; font-size: @font-size-sm;
      margin-bottom: @spacing-sm;
    }
    p { font-size: @font-size-sm; color: @color-text-secondary; line-height: 1.6; }
  }
}
</style>
