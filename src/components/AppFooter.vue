<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<template>
  <footer class="footer">
    <div class="footer-bg"></div>
    <div class="footer-inner">
      <div class="col brand">
        <div class="footer-logo">
          <svg viewBox="0 0 32 32" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="10" width="28" height="18" rx="2" fill="#059669" opacity="0.9"/>
            <path d="M4 10 L16 2 L28 10" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
          <span>东淼纸业</span>
        </div>
        <p class="brand-desc">专注包装用纸生产20年，以技术创新驱动可持续发展，为全球客户提供高品质纸品解决方案。</p>
      </div>
      <div class="col">
        <h4>快速链接</h4>
        <a @click="router.push('/about')">关于我们</a>
        <a @click="router.push('/products')">产品中心</a>
        <a @click="router.push('/production')">生产实力</a>
        <a @click="router.push('/contact')">联系我们</a>
      </div>
      <div class="col">
        <h4>联系方式</h4>
        <div class="contact-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          <span>河南省新密市大隗镇黄湾寨开发区</span>
        </div>
        <div class="contact-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
          <span>400-888-6789</span>
        </div>
        <div class="contact-item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94A3B8" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
          <span>info@dongmiaopaper.com</span>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <div class="footer-bottom-inner">
        <span>&copy; {{ new Date().getFullYear() }} 东淼纸业（集团）有限公司</span>
        <span class="footer-extra">品质包装 · 绿色未来</span>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="less">
.footer {
  position: relative;
  background: @color-dark;
  color: @color-muted;
  padding: @spacing-4xl 0 0;
  overflow: hidden;

  .footer-bg {
    position: absolute; inset: 0;
    background-image:
      linear-gradient(fade(#334155, 6%) 1px, transparent 1px),
      linear-gradient(90deg, fade(#334155, 6%) 1px, transparent 1px);
    background-size: 40px 40px;
    pointer-events: none;
  }

  .footer-inner {
    position: relative;
    max-width: @container-max;
    margin: 0 auto;
    padding: 0 @spacing-lg;
    display: grid;
    grid-template-columns: 1fr;
    gap: @spacing-2xl;
    .tablet({ grid-template-columns: 2fr 1fr 1fr; });
    .desktop({ grid-template-columns: 2fr 1fr 1.5fr; });
  }

  .col {
    h4 { color: @color-white; font-size: @font-size-sm; font-weight: 600; margin-bottom: @spacing-lg; letter-spacing: 0.05em; }
    a {
      display: block; margin-bottom: @spacing-sm; cursor: pointer;
      transition: @transition-base; font-size: @font-size-sm; color: @color-muted;
      &:hover { color: @color-primary-light; padding-left: 2px; }
    }
  }

  .brand {
    .footer-logo {
      display: flex; align-items: center; gap: @spacing-sm; margin-bottom: @spacing-md;
      svg { flex-shrink: 0; }
      span { font-size: @font-size-xl; font-weight: 700; color: @color-white; letter-spacing: -0.02em; }
    }
    .brand-desc { line-height: 1.8; font-size: @font-size-sm; max-width: 360px; }
  }

  .contact-item {
    display: flex; align-items: flex-start; gap: @spacing-sm;
    margin-bottom: @spacing-md; font-size: @font-size-sm; line-height: 1.5;
    svg { flex-shrink: 0; margin-top: 3px; }
  }

  .footer-bottom {
    position: relative;
    margin-top: @spacing-3xl;
    border-top: 1px solid fade(#334155, 50%);
    padding: @spacing-lg 0;
    .footer-bottom-inner {
      max-width: @container-max; margin: 0 auto; padding: 0 @spacing-lg;
      display: flex; justify-content: space-between; align-items: center;
      font-size: @font-size-xs;
      .footer-extra { color: fade(@color-muted, 50%); letter-spacing: 0.05em; }
    }
  }
}
</style>
