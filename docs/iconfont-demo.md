# Iconfont Symbol 图标演示

## 使用 Symbol 方式展示图标

本页面演示如何使用 iconfont.cn 的 Symbol 在线引用方式。

## 使用方法

### 基础用法

使用在线 Symbol 引用，支持彩色图标且自动更新：

```html
<!-- 在 HTML 或 Markdown 中 -->
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-telegram"></use>
</svg>
```

### 在 Vue 组件中使用

```vue
<template>
  <div>
    <svg class="icon" aria-hidden="true">
      <use xlink:href="#icon-telegram"></use>
    </svg>
    <span>Telegram</span>
  </div>
</template>
```

### 自定义大小和颜色

```html
<!-- 自定义样式 -->
<svg class="icon" style="width: 32px; height: 32px; fill: #0088cc;">
  <use xlink:href="#icon-telegram"></use>
</svg>
```

## Symbol 方式的优势

✅ **彩色图标** - 支持多色 SVG，无需额外配置  
✅ **自动更新** - 在 iconfont.cn 添加图标后自动同步  
✅ **CDN 加速** - 阿里云 CDN，加载速度快  
✅ **易管理** - 在 iconfont.cn 统一管理所有图标  
✅ **兼容性好** - 支持所有现代浏览器  
✅ **无需维护** - 不用手动下载和更新本地文件

---

## 🎯 完整测试 Demo

### Symbol 图标展示

下面是使用 Symbol 方式展示的图标（支持彩色）：

<div style="display: flex; gap: 20px; flex-wrap: wrap; margin: 20px 0; padding: 20px; background: var(--vp-c-bg-soft); border-radius: 8px;">
  <div style="text-align: center;">
    <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
      <use xlink:href="#icon-telegram"></use>
    </svg>
    <p style="font-size: 12px; margin-top: 8px;">Telegram</p>
  </div>
  <div style="text-align: center;">
    <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
      <use xlink:href="#icon-twitter"></use>
    </svg>
    <p style="font-size: 12px; margin-top: 8px;">Twitter</p>
  </div>
  <div style="text-align: center;">
    <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
      <use xlink:href="#icon-douyin"></use>
    </svg>
    <p style="font-size: 12px; margin-top: 8px;">抖音</p>
  </div>
  <div style="text-align: center;">
    <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
      <use xlink:href="#icon-chrome"></use>
    </svg>
    <p style="font-size: 12px; margin-top: 8px;">Chrome</p>
  </div>
  <div style="text-align: center;">
    <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
      <use xlink:href="#icon-docker"></use>
    </svg>
    <p style="font-size: 12px; margin-top: 8px;">Docker</p>
  </div>
  <div style="text-align: center;">
    <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
      <use xlink:href="#icon-zhifubao"></use>
    </svg>
    <p style="font-size: 12px; margin-top: 8px;">支付宝</p>
  </div>
</div>

### 代码示例

上面的图标是这样实现的：

```html
<div style="display: flex; gap: 20px; flex-wrap: wrap;">
  <!-- Telegram 图标 -->
  <div style="text-align: center;">
    <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
      <use xlink:href="#icon-telegram"></use>
    </svg>
    <p>Telegram</p>
  </div>
  
  <!-- Twitter 图标 -->
  <div style="text-align: center;">
    <svg class="icon" aria-hidden="true" style="width: 32px; height: 32px;">
      <use xlink:href="#icon-twitter"></use>
    </svg>
    <p>Twitter</p>
  </div>
</div>
```

### 在线按钮示例

<div style="margin: 20px 0;">
  <a href="https://telegram.org/" style="display: inline-flex; align-items: center; padding: 10px 20px; background: #0088cc; color: white; border-radius: 5px; text-decoration: none; gap: 8px;">
    <svg class="icon" aria-hidden="true" style="width: 20px; height: 20px; fill: white;">
      <use xlink:href="#icon-telegram"></use>
    </svg>
    <span>加入 Telegram</span>
  </a>
  
  <a href="https://twitter.com/" style="display: inline-flex; align-items: center; padding: 10px 20px; background: #1DA1F2; color: white; border-radius: 5px; text-decoration: none; gap: 8px; margin-left: 10px;">
    <svg class="icon" aria-hidden="true" style="width: 20px; height: 20px; fill: white;">
      <use xlink:href="#icon-twitter"></use>
    </svg>
    <span>关注 Twitter</span>
  </a>
</div>

::: tip 提示
- 图标名称格式：`#icon-图标名`（如 `#icon-telegram`）
- 可以通过 style 属性自定义图标大小和颜色
- Symbol 方式支持多色 SVG，无需额外配置
:::

::: warning 注意
如果图标无法显示，请检查：
1. ✅ `config.mts` 中是否已添加 Symbol JS 链接
2. ✅ `symbol.css` 是否已在 `index.css` 中引入
3. ✅ 图标名称是否正确（可在 iconfont.cn 项目中查看）
:::

---

## 📦 标准样式模板

### 基础模板（使用 CSS 类）⭐

**推荐使用预定义的 CSS 类，无需写内联样式！**

```html
<!-- ✅ 推荐：使用 CSS 类（简洁） -->
<svg class="icon icon-md">
  <use xlink:href="#icon-图标名称"></use>
</svg>

<!-- ❌ 不推荐：内联样式（冗长） -->
<svg class="icon" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; position: relative; top: -1px; margin-right: 4px;">
  <use xlink:href="#icon-图标名称"></use>
</svg>
```

**可用的尺寸类**：
- `icon-sm` - 小号 (16px)
- `icon-md` 或 `icon-standard` - 中号 (20px，标准)
- `icon-lg` - 大号 (24px)
- `icon-xl` - 超大号 (32px)

### 实际效果演示

#### 1️⃣ 纯文字 + 图标

<div style="margin: 15px 0;">
    <svg class="icon icon-md">
      <use xlink:href="#icon-telegram"></use>
    </svg>
    <span>访问 Telegram</span>
    
    <svg class="icon icon-md">
      <use xlink:href="#icon-xunzhang"></use>
    </svg>
    <span>访问 icon-xunzhang</span>
</div>

**代码**：
```html
<svg class="icon icon-md">
  <use xlink:href="#icon-telegram"></use>
</svg>
<span>访问 Telegram</span>
```

#### 2️⃣ 链接 + 图标（Flex 布局）

<div style="margin: 15px 0;">
  <a href="https://telegram.org/" target="_blank" style="display: inline-flex; align-items: center; gap: 5px; text-decoration: none; color: #0088cc;">
    <svg class="icon icon-flex">
      <use xlink:href="#icon-telegram"></use>
    </svg>
    <span>访问 Telegram</span>
  </a>
</div>

<div style="margin: 15px 0;">
  <a href="https://1yo.cc" target="_blank" style="display: inline-flex; align-items: center; gap: 5px; text-decoration: none; color: #666;">
    <svg class="icon icon-flex">
      <use xlink:href="#icon-biaoqing"></use>
    </svg>
    <span style="font-weight: bold; color: red;">重要链接</span>
  </a>
</div>

**代码**：
```html
<!-- Flex 布局中使用 icon-flex 类（自动居中） -->
<a href="链接" style="display: inline-flex; align-items: center; gap: 5px;">
  <svg class="icon icon-flex">
    <use xlink:href="#icon-telegram"></use>
  </svg>
  <span>文字</span>
</a>
```

#### 3️⃣ 列表项 + 图标

<ul style="list-style: none; padding: 0; margin: 15px 0;">
  <li style="padding: 6px 0;">
    <svg class="icon icon-list">
      <use xlink:href="#icon-chrome"></use>
    </svg>
    Chrome 浏览器
  </li>
  <li style="padding: 6px 0;">
    <svg class="icon icon-list">
      <use xlink:href="#icon-docker"></use>
    </svg>
    Docker 容器
  </li>
  <li style="padding: 6px 0;">
    <svg class="icon icon-list">
      <use xlink:href="#icon-zhifubao"></use>
    </svg>
    支付宝支付
  </li>
</ul>

**代码**：
```html
<li>
  <svg class="icon icon-list">
    <use xlink:href="#icon-chrome"></use>
  </svg>
  Chrome 浏览器
</li>
```

### 不同尺寸变体

#### 小号（16px）
<svg class="icon icon-sm">
  <use xlink:href="#icon-telegram"></use>
</svg>小图标示例

#### 中号（20px，标准）⭐
<svg class="icon icon-md">
  <use xlink:href="#icon-telegram"></use>
</svg>中图标示例

#### 大号（24px）
<svg class="icon icon-lg">
  <use xlink:href="#icon-telegram"></use>
</svg>大图标示例

#### 超大号（32px）
<svg class="icon icon-xl">
  <use xlink:href="#icon-telegram"></use>
</svg>超大图标示例

**代码示例**：
```html
<!-- 小号 -->
<svg class="icon icon-sm"><use xlink:href="#icon-telegram"></use></svg>

<!-- 中号（标准） -->
<svg class="icon icon-md"><use xlink:href="#icon-telegram"></use></svg>

<!-- 大号 -->
<svg class="icon icon-lg"><use xlink:href="#icon-telegram"></use></svg>

<!-- 超大号 -->
<svg class="icon icon-xl"><use xlink:href="#icon-telegram"></use></svg>
```

### 快速复制模板（推荐使用 CSS 类）⭐

```html
<!-- ========== 基础模板（内联文字） ========== -->
<svg class="icon icon-md">
  <use xlink:href="#icon-图标名称"></use>
</svg>文字内容

<!-- ========== 链接模板（flex 布局） ========== -->
<a href="链接地址" target="_blank" style="display: inline-flex; align-items: center; gap: 5px; text-decoration: none;">
  <svg class="icon icon-flex">
    <use xlink:href="#icon-图标名称"></use>
  </svg>
  <span>链接文字</span>
</a>

<!-- ========== 列表项模板 ========== -->
<li>
  <svg class="icon icon-list">
    <use xlink:href="#icon-图标名称"></use>
  </svg>
  列表内容
</li>

<!-- ========== 按钮模板 ========== -->
<button style="display: inline-flex; align-items: center; gap: 5px; padding: 8px 16px; border: none; border-radius: 4px; background: #0088cc; color: white; cursor: pointer;">
  <svg class="icon icon-btn">
    <use xlink:href="#icon-图标名称"></use>
  </svg>
  <span>按钮文字</span>
</button>
```

### 完整样式类列表

| CSS 类 | 尺寸 | 用途 | 示例 |
|--------|------|------|------|
| `icon-sm` | 16px | 小图标 | 侧边栏、标签 |
| `icon-md` | 20px | 标准图标 ⭐ | 正文、列表 |
| `icon-lg` | 24px | 大图标 | 标题、重点 |
| `icon-xl` | 32px | 超大图标 | Hero、封面 |
| `icon-flex` | 20px | Flex 布局 | 链接、按钮 |
| `icon-list` | 20px | 列表项 | 无序列表 |
| `icon-btn` | 18px | 按钮内 | 操作按钮 |
| `icon-nav` | 18px | 导航栏 | 菜单项 |
| `icon-inline` | 18px | 行内小图标 | 紧凑场景 |

::: tip 样式说明
- `width/height: 20px` - 图标尺寸
- `display: inline-block` - 行内块元素，可设置宽高
- `vertical-align: middle` - 垂直居中对齐文字
- `position: relative` - 相对定位（便于微调位置）
- **`top: -1px`** - ⭐ **向上微调 1px，修正图标偏下问题**
- `margin-right: 4px` - 图标右侧间距
:::

::: details 为什么图标会偏下？如何解决？

**问题原因**：
SVG 元素默认基线对齐方式会导致图标相对文字偏下。

**解决方案对比**：

1. **内联元素** - 使用 `top: -1px` 微调
   ```html
   <svg style="...; position: relative; top: -1px;">
   ```
   - ✅ 简单直接
   - ✅ 适合纯文本 + 图标
   - ⚠️ 不同字体/字号可能需要调整

2. **Flex 布局** - 使用 `align-items: center`（推荐）⭐
   ```html
   <a style="display: inline-flex; align-items: center;">
     <svg>...</svg>
     <span>文字</span>
   </a>
   ```
   - ✅ 完美居中，无需微调
   - ✅ 适配所有字体和尺寸
   - ✅ 最稳定的方案

**调整参考值**：
- 20px 图标：`top: -1px` 
- 24px 图标：`top: -2px`
- 32px 图标：`top: -2px`

:::