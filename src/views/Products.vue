<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getProducts } from '@/api/content'
import { img } from '@/utils/placeholder'

const categories = ref(['瓦楞纸', '箱板纸', '纸板'])
const products = ref<any>({
  '瓦楞纸': [
    { name: '高强瓦楞纸', spec: '110-180g/m²', feature: '环压强度高，抗水性好', use: '纸箱中间夹层', image: img(400,280,'高强瓦楞纸','059669') },
    { name: '普通瓦楞纸', spec: '80-150g/m²', feature: '性价比高，印刷适应性好', use: '普通包装纸箱', image: img(400,280,'普通瓦楞纸','059669') },
  ],
  '箱板纸': [
    { name: '牛卡纸', spec: '125-300g/m²', feature: '面层纤维强韧，耐破度高', use: '重型包装纸箱面层', image: img(400,280,'牛卡纸','0D9488') },
    { name: '再生箱板纸', spec: '110-250g/m²', feature: '环保再生，成本优势明显', use: '普通纸箱面层', image: img(400,280,'再生箱板纸','0D9488') },
    { name: '白面牛卡', spec: '150-300g/m²', feature: '白度好，印刷效果佳', use: '精品包装', image: img(400,280,'白面牛卡','0D9488') },
  ],
  '纸板': [
    { name: '三层纸板', spec: '按需定制', feature: '轻便，适合小件包装', use: '电商快递箱', image: img(400,280,'三层纸板','1E3A5F') },
    { name: '五层纸板', spec: '按需定制', feature: '强度高，保护性好', use: '家电/食品包装', image: img(400,280,'五层纸板','1E3A5F') },
    { name: '七层纸板', spec: '按需定制', feature: '超高强度，抗压性强', use: '重型工业包装', image: img(400,280,'七层纸板','1E3A5F') },
  ],
})
const activeCategory = ref('瓦楞纸')

onMounted(async () => {
  try {
    const res = await getProducts() as any
    if (res?.data) {
      categories.value = res.data.categories
      products.value = res.data.products
    }
  } catch {}
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>产品中心</h1>
        <p>全系列包装用纸，满足多元需求</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <SectionTitle title="产品分类" subtitle="以品质赢信赖" />

        <div class="tabs">
          <button
            v-for="cat in categories" :key="cat"
            :class="{ active: activeCategory === cat }"
            @click="activeCategory = cat"
          >{{ cat }}</button>
        </div>

        <Transition name="fade" mode="out-in">
          <div :key="activeCategory" class="product-grid">
            <div v-for="p in (products[activeCategory] || [])" :key="p.name" class="product-card scroll-reveal">
              <div class="card-img"><img :src="p.image" :alt="p.name" loading="lazy" /></div>
              <div class="card-header">
                <h3>{{ p.name }}</h3>
              </div>
              <div class="card-body">
                <div class="row"><span class="label">规格</span><span>{{ p.spec }}</span></div>
                <div class="row"><span class="label">特点</span><span>{{ p.feature }}</span></div>
                <div class="row"><span class="label">应用</span><span>{{ p.use }}</span></div>
              </div>
            </div>
          </div>
        </Transition>

        <div class="contact-cta scroll-reveal">
          <p>以上为部分产品，更多规格请联系我们获取详细产品手册</p>
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

.tabs {
  display: flex; justify-content: center; gap: @spacing-md; margin-bottom: @spacing-2xl;
  button {
    padding: @spacing-sm @spacing-xl; border: 2px solid @color-primary;
    background: transparent; color: @color-primary; border-radius: @radius-md;
    font-size: @font-size-base; cursor: pointer; transition: @transition-base;
    &:hover, &.active { background: @color-primary; color: @color-white; }
  }
}

.product-grid {
  display: grid; grid-template-columns: 1fr; gap: @spacing-lg;
  @media (min-width: (@bp-mobile + 1)) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: (@bp-tablet + 1)) { grid-template-columns: repeat(3, 1fr); }
}

.product-card {
  background: @color-white; border-radius: @radius-lg; overflow: hidden;
  box-shadow: @shadow-sm; transition: @transition-base;
  &:hover { transform: translateY(-4px); box-shadow: @shadow-lg; }
  .card-img {
    width: 100%; height: 180px; overflow: hidden;
    img { width: 100%; height: 100%; object-fit: cover; display: block; transition: transform 0.4s ease; }
    &:hover img { transform: scale(1.05); }
  }
  .card-header {
    background: linear-gradient(135deg, @color-primary, darken(@color-primary, 5%));
    padding: @spacing-md @spacing-lg;
    h3 { color: @color-white; font-size: @font-size-lg; }
  }
  .card-body { padding: @spacing-lg;
    .row {
      display: flex; gap: @spacing-sm; margin-bottom: @spacing-sm;
      font-size: @font-size-sm;
      .label { color: @color-primary; font-weight: bold; white-space: nowrap; min-width: 40px; }
    }
  }
}

.contact-cta {
  text-align: center; margin-top: @spacing-2xl;
  p { color: @color-text-secondary; margin-bottom: @spacing-md; }
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
