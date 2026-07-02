<script setup lang="ts">
import { useThemeStore } from '@/stores/theme'
import { useRouter, useRoute } from 'vue-router'

const theme = useThemeStore()
const route = useRoute()
const router = useRouter()

const navItems = [
  { path: '/', label: '首页' },
  { path: '/about', label: '关于我们' },
  { path: '/team', label: '管理团队' },
  { path: '/products', label: '产品中心' },
  { path: '/production', label: '生产实力' },
  { path: '/green', label: '绿色环保' },
  { path: '/technology', label: '技术创新' },
  { path: '/quality', label: '品质保障' },
  { path: '/news', label: '新闻资讯' },
  { path: '/join', label: '加入我们' },
  { path: '/contact', label: '联系我们' },
]

function navigate(path: string) {
  router.push(path)
  theme.closeMenu()
}
</script>

<template>
  <header class="header">
    <div class="header-inner">
      <div class="logo" @click="navigate('/')">
        <span class="logo-icon">
          <svg viewBox="0 0 32 32" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
            <rect x="2" y="10" width="28" height="18" rx="2" fill="white" opacity="0.9"/>
            <rect x="6" y="14" width="20" height="3" rx="1" fill="#2E7D32" opacity="0.6"/>
            <rect x="6" y="20" width="14" height="3" rx="1" fill="#2E7D32" opacity="0.4"/>
            <path d="M4 10 L16 2 L28 10" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="16" cy="19" r="2" fill="#FFD700" opacity="0.7"/>
          </svg>
        </span>
        <div class="logo-text">
          <h1>东淼纸业</h1>
          <small>品质包装 · 绿色未来</small>
        </div>
      </div>
      <nav class="nav-desktop">
        <a
          v-for="item in navItems"
          :key="item.path"
          :class="{ active: route.path === item.path }"
          @click="navigate(item.path)"
        >{{ item.label }}</a>
      </nav>
      <button class="menu-btn" :class="{ open: theme.isMenuOpen }" @click="theme.toggleMenu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <Transition name="slide">
      <nav v-if="theme.isMenuOpen" class="nav-mobile">
        <a
          v-for="item in navItems"
          :key="item.path"
          :class="{ active: route.path === item.path }"
          @click="navigate(item.path)"
        >{{ item.label }}</a>
      </nav>
    </Transition>
  </header>
</template>

<style scoped lang="less">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: fade(@color-white, 90%);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid fade(@color-border, 60%);
  transition: @transition-base;

  .header-inner {
    max-width: @container-max;
    margin: 0 auto;
    padding: 0 @spacing-lg;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 72px;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: @spacing-sm;
    cursor: pointer;

    .logo-icon svg {
      width: 32px; height: 32px;
    }

    .logo-text {
      h1 { font-size: @font-size-lg; font-weight: 700; color: @color-primary; letter-spacing: -0.02em; }
      small { font-size: @font-size-xs; color: @color-text-secondary; letter-spacing: 0.05em; }
    }
  }

  .nav-desktop {
    display: none;
    gap: 2px;

    @media (min-width: (@bp-tablet + 1)) {
      display: flex;
    }

    a {
      padding: 8px 14px;
      font-size: @font-size-sm;
      font-weight: 500;
      color: @color-text-secondary;
      border-radius: @radius-md;
      transition: @transition-base;
      cursor: pointer;

      &:hover {
        color: @color-primary;
        background: fade(@color-primary, 6%);
      }

      &.active {
        color: @color-primary;
        background: fade(@color-primary, 10%);
        font-weight: 600;
      }
    }
  }

  .menu-btn {
    display: flex;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: @spacing-sm;

    @media (min-width: (@bp-tablet + 1)) {
      display: none;
    }

    span {
      display: block;
      width: 24px;
      height: 2px;
      background: @color-text;
      border-radius: 1px;
      transition: @transition-base;
    }

    &.open span:nth-child(1) { transform: rotate(45deg) translate(5px, 5px); }
    &.open span:nth-child(2) { opacity: 0; }
    &.open span:nth-child(3) { transform: rotate(-45deg) translate(5px, -5px); }
  }

  .nav-mobile {
    position: absolute;
    top: 72px;
    left: 0;
    right: 0;
    background: fade(@color-white, 98%);
    backdrop-filter: blur(16px);
    border-bottom: 1px solid @color-border;
    padding: @spacing-md 0;

    a {
      display: block;
      padding: @spacing-sm @spacing-lg;
      font-size: @font-size-sm;
      font-weight: 500;
      transition: @transition-base;
      cursor: pointer;
      color: @color-text-secondary;
      &:hover { color: @color-primary; background: fade(@color-primary, 5%); }
      &.active { color: @color-primary; background: fade(@color-primary, 8%); font-weight: 600; }
    }
  }
}

.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease, opacity 0.3s ease; }
.slide-enter-from, .slide-leave-to { transform: translateY(-10px); opacity: 0; }
</style>
