<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
</script>

<template>
  <div class="busuanzi-container">
    <div class="busuanzi-stats">
      <!-- 访客数统计 -->
      <div class="stat-item">
        <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
          <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
        </svg>
        <span class="stat-label">访客数</span>
        <span class="stat-value" id="busuanzi_value_site_uv">--</span>
      </div>

      <!-- 分隔符 -->
      <div class="stat-divider">|</div>

      <!-- 访问量统计 -->
      <div class="stat-item">
        <svg class="stat-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
        <span class="stat-label">访问量</span>
        <span class="stat-value" id="busuanzi_value_site_pv">--</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.busuanzi-container {
  padding: 10px 0;
  text-align: center;
  border-top: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
}

.busuanzi-stats {
  display: inline-flex;
  align-items: center;
  gap: 20px;
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.stat-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  transition: all 0.3s ease;
}

.stat-item:hover {
  color: var(--vp-c-brand-1);
  transform: translateY(-2px);
}

.stat-icon {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.stat-item:hover .stat-icon {
  opacity: 1;
}

.stat-label {
  font-weight: 500;
  white-space: nowrap;
}

.stat-value {
  font-weight: 700;
  color: var(--vp-c-brand-1);
  font-family: 'Monaco', 'Consolas', monospace;
  font-size: 16px;
  min-width: 30px;
  text-align: center;
}

.stat-divider {
  color: var(--vp-c-divider);
  font-weight: 300;
  opacity: 0.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .busuanzi-container {
    padding: 12px 16px;
  }

  .busuanzi-stats {
    flex-direction: column;
    gap: 12px;
  }

  .stat-divider {
    display: none;
  }

  .stat-item {
    font-size: 13px;
  }

  .stat-icon {
    width: 16px;
    height: 16px;
  }

  .stat-value {
    font-size: 15px;
  }
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.busuanzi-container {
  animation: fadeIn 0.5s ease-out;
}
</style>