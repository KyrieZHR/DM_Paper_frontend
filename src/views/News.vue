<script setup lang="ts">
import { ref, onMounted } from 'vue'
import SectionTitle from '@/components/SectionTitle.vue'
import ScrollReveal from '@/components/ScrollReveal.vue'
import { getNews } from '@/api/content'
import { img } from '@/utils/placeholder'

const news = ref([
  { date: '2026-05-15', category: '公司动态', title: '公司荣获"省级绿色工厂"称号', desc: '经省工业和信息化厅评审认定，我公司正式获评"省级绿色工厂"荣誉称号。', image: img(400,260,'绿色工厂') },
  { date: '2026-03-20', category: '公司动态', title: '年产50万吨瓦楞纸生产线技改完成', desc: '公司投资1.2亿元的年产50万吨瓦楞纸生产线技术改造项目顺利完成。', image: img(400,260,'技改完成') },
  { date: '2025-12-10', category: '行业资讯', title: '2026年包装纸行业发展趋势展望', desc: '随着环保政策趋严和电商物流持续增长，包装纸行业正加速转型。', image: img(400,260,'行业展望') },
  { date: '2025-10-08', category: '公司动态', title: '公司通过ISO14001环境管理体系复审', desc: '公司顺利通过ISO14001环境管理体系年度复审。', image: img(400,260,'ISO复审') },
  { date: '2025-08-22', category: '展会信息', title: '公司参加2025中国国际造纸科技展览会', desc: '公司携最新产品亮相2025中国国际造纸科技展览会。', image: img(400,260,'造纸展') },
])

onMounted(async () => {
  try {
    const res = await getNews() as any
    if (res?.data) news.value = res.data
  } catch {}
})
</script>

<template>
  <div>
    <section class="sub-banner">
      <div class="overlay"></div>
      <div class="content">
        <h1>新闻资讯</h1>
        <p>了解最新动态，洞察行业趋势</p>
      </div>
    </section>

    <section class="section section-light">
      <div class="container">
        <SectionTitle title="新闻动态" subtitle="传递公司声音" />
        <div class="news-list">
          <article v-for="item in news" :key="item.title" class="news-item scroll-reveal">
            <div class="news-thumb"><img v-if="item.image" :src="item.image" :alt="item.title" loading="lazy" /></div>
            <div class="date-box">
              <span class="day">{{ item.date.split('-')[2] }}</span>
              <span class="ym">{{ item.date.slice(0, 7) }}</span>
            </div>
            <div class="content">
              <div class="meta">
                <span class="tag">{{ item.category }}</span>
                <span class="date">{{ item.date }}</span>
              </div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
              <a class="read-more">阅读更多 →</a>
            </div>
          </article>
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

.news-list { max-width: 800px; margin: 0 auto; }

.news-item {
  display: grid; grid-template-columns: 120px 80px 1fr; gap: @spacing-lg;
  align-items: start;
  padding: @spacing-lg 0; border-bottom: 1px solid @color-border;
  &:first-child { padding-top: 0; }

  .news-thumb {
    img { width: 120px; height: 80px; object-fit: cover; border-radius: @radius-md; display: block; }
  }

  .date-box {
    text-align: center;
    .day { display: block; font-size: @font-size-2xl; font-weight: bold; color: @color-primary; line-height: 1; }
    .ym { font-size: @font-size-sm; color: @color-text-secondary; }
  }

  .content {
    .meta { display: flex; gap: @spacing-md; margin-bottom: @spacing-xs;
      .tag { font-size: @font-size-sm; color: @color-primary; background: fade(@color-primary, 10%); padding: 0 8px; border-radius: @radius-sm; }
      .date { font-size: @font-size-sm; color: @color-text-secondary; }
    }
    h3 { font-size: @font-size-lg; margin-bottom: @spacing-sm; cursor: pointer; transition: @transition-base;
      &:hover { color: @color-primary; }
    }
    p { font-size: @font-size-sm; color: @color-text-secondary; line-height: 1.6; margin-bottom: @spacing-sm; }
    .read-more { font-size: @font-size-sm; color: @color-primary; cursor: pointer;
      &:hover { text-decoration: underline; }
    }
  }
}
</style>
