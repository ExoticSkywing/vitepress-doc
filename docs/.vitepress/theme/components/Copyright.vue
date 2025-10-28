<template>
  <div v-if="shouldShow" class="copyright-container">
    <div class="copyright-card">
      <!-- 公共图标 -->
      <span class="copyright-symbol copyright-icon copyright-icon-public"></span>

      <div class="copyright-content">
        <!-- 作者信息 -->
        <div class="copyright-item">
          <span class="copyright-meta">
            <span class="copyright-icon copyright-icon-user"></span>
            <span class="meta-text">作者</span>:
          </span>
          <span class="copyright-info">
            <a :href="config.authorUrl" target="_blank" rel="noopener">{{ config.authorName }}</a>
          </span>
        </div>

        <!-- 文章链接 -->
        <div class="copyright-item">
          <span class="copyright-meta">
            <span class="copyright-icon copyright-icon-link"></span>
            <span class="meta-text">链接</span>:
          </span>
          <span class="copyright-info">
            <a :href="currentUrl" target="_blank" rel="noopener">{{ currentUrl }}</a>
          </span>
        </div>

        <!-- 版权声明 -->
        <div class="copyright-item">
          <span class="copyright-meta">
            <span class="copyright-icon copyright-icon-cc"></span>
            <span class="meta-text">版权</span>:
          </span>
          <span class="copyright-info">
            本站文章除特别声明外，均采用
            <a :href="config.licenseUrl" target="_blank" rel="noopener">{{ config.licenseName }}</a>
            协议，转载请注明来自
            <a :href="config.siteUrl" target="_blank" rel="noopener">{{ config.siteName }}</a>！
          </span>
        </div>

        <!-- 群聊信息 - 突出显示 -->
        <div class="copyright-item copyright-item-highlight">
          <div class="highlight-content">
            <span class="copyright-icon copyright-icon-group"></span>
            <span class="highlight-text">
              若遇问题，加入聊天室一起探讨：
              <a :href="config.groupUrl" target="_blank" rel="noopener" class="group-link-highlight">
                {{ config.groupName }}<span class="link-badge">🔥</span>
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useData, useRoute } from 'vitepress'

// 统一配置区 - 根据你的站点信息修改
const config = {
  authorName: '漫数花园',
  authorUrl: 'https://1yo.cc',
  siteName: '漫数花园',
  // 根据环境自动切换域名
  siteUrl: typeof window !== 'undefined' 
    ? `${window.location.protocol}//${window.location.host}`
    : 'https://wiki.manyuzuo.com',
  licenseName: 'CC BY-NC-SA 4.0',
  licenseUrl: 'https://creativecommons.org/licenses/by-nc-sa/4.0/deed.zh',
  groupName: '云上聊天室',
  groupUrl: 'https://chat.1yo.cc' // 替换为你的群聊链接
}

// 获取 frontmatter 和路由
const { frontmatter } = useData()
const route = useRoute()

// 是否显示版权组件
const shouldShow = computed(() => frontmatter.value.copyright !== false)

// 当前页面完整 URL
const currentUrl = computed(() => {
  const baseUrl = config.siteUrl
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`
  const path = route.path === '/' ? '' : route.path.replace(/^\//, '')
  return `${normalizedBaseUrl}${path}`
})
</script>

<style scoped>
.copyright-container {
  margin: 2rem 0;
}

.copyright-card {
  position: relative;
  padding: clamp(12px, 4vw, 16px) clamp(16px, 6vw, 20px);
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  background-color: var(--vp-c-bg-alt);
  background: linear-gradient(to bottom, var(--vp-c-bg-alt), var(--vp-c-bg));
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-size: clamp(14px, 4vw, 15px);
  line-height: 1.7;
  overflow: hidden;
}

.copyright-card:hover {
  border-color: var(--vp-c-brand);
  transform: translateY(-2px);
  box-shadow: 
    0 4px 12px rgba(33, 122, 244, 0.12),
    0 0 0 1px var(--vp-c-brand);
}

/* 公共信号图标装饰 */
.copyright-symbol {
  position: absolute;
  top: 12px;
  right: 16px;
  color: var(--vp-c-text-3);
  font-size: 20px;
  opacity: 0.7;
  transition: all 0.3s ease;
  pointer-events: none;
}

.copyright-card:hover .copyright-symbol {
  color: var(--vp-c-brand);
  opacity: 1;
  transform: scale(1.1);
}

/* 内容区布局 */
.copyright-content {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.copyright-item {
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 6px 8px;
}

.copyright-meta {
  display: inline-flex;
  align-items: center;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  font-weight: 500;
}

.copyright-meta .copyright-icon {
  margin-right: 4px;
  font-size: 1em;
}

.meta-text {
  font-variant: small-caps; /* 小型大写字母，提升设计感 */
}

.copyright-info {
  color: var(--vp-c-text-1);
  word-break: break-all;
}

.copyright-info a {
  color: var(--vp-c-brand-1);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.copyright-info a:hover {
  color: var(--vp-c-brand-dark);
  text-decoration: underline;
}

/* 图标使用 Emoji（更现代且无需字体） */
.copyright-icon::before {
  transform: none !important;
  display: inline-block;
}

.copyright-icon-user::before { content: '👤'; }
.copyright-icon-link::before  { content: '🔗'; }
.copyright-icon-cc::before    { content: '🌐'; }
.copyright-icon-public::before { content: '📡'; }
.copyright-icon-group::before { content: '💬'; }

/* ==================== 交流项高亮样式 ==================== */

/* 突出显示的交流项 */
.copyright-item-highlight {
  margin-top: 6px;
  padding: 12px 14px;
  background: linear-gradient(
    135deg,
    rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.08),
    rgba(var(--vp-c-brand-2-rgb, 52, 168, 83), 0.05)
  );
  border-left: 3px solid var(--vp-c-brand-1);
  border-radius: 8px;
  position: relative;
  overflow: hidden;
  animation: pulse-border 2s ease-in-out infinite;
}

/* 脉动边框动画 */
@keyframes pulse-border {
  0%, 100% {
    border-left-color: var(--vp-c-brand-1);
    box-shadow: 0 0 0 0 rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.4);
  }
  50% {
    border-left-color: var(--vp-c-brand-2);
    box-shadow: 0 0 0 4px rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0);
  }
}

/* 高亮内容布局 */
.highlight-content {
  display: flex;
  align-items: center;
  gap: 8px;
  line-height: 1.6;
}

.highlight-text {
  display: inline;
  line-height: 1.6;
}

/* 交流链接特殊样式 */
.group-link-highlight {
  display: inline-flex;
  align-items: center;
  gap: 2px;
  padding: 2px 10px;
  margin-left: 4px;
  background: var(--vp-c-brand-1);
  color: white !important;
  border-radius: 4px;
  font-weight: 600;
  transition: all 0.25s ease;
  box-shadow: 0 2px 6px rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.25);
  vertical-align: baseline;
  white-space: nowrap;
}

.group-link-highlight:hover {
  background: var(--vp-c-brand-2);
  color: white !important;
  transform: translateY(-1px);
  box-shadow: 0 3px 10px rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.4);
  text-decoration: none !important;
}

/* 链接徽章（火焰图标）动画 */
.link-badge {
  display: inline-block;
  animation: bounce 1.5s ease-in-out infinite;
  margin-left: 2px;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-2px) scale(1.05);
  }
}

/* 暗色主题适配 */
.dark .copyright-item-highlight {
  background: linear-gradient(
    135deg,
    rgba(var(--vp-c-brand-1-rgb, 66, 184, 131), 0.15),
    rgba(var(--vp-c-brand-2-rgb, 52, 168, 83), 0.08)
  );
}

/* 移动端适配 */
@media (max-width: 768px) {
  .copyright-card {
    padding: 12px 14px;
    font-size: 14px;
    border-radius: 10px;
  }

  .copyright-symbol {
    top: 10px;
    right: 12px;
    font-size: 18px;
  }

  .copyright-item {
    gap: 4px 8px;
  }

  .meta-text {
    font-size: 0.95em;
  }

  .copyright-item-highlight {
    padding: 10px 12px;
  }

  .highlight-content {
    gap: 6px;
  }

  .group-link-highlight {
    padding: 2px 8px;
    font-size: 0.95em;
    margin-left: 2px;
  }
}

@media (min-width: 1024px) {
  .copyright-card {
    padding: 16px 20px;
  }
}
</style>
