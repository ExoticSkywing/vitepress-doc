# Iconfont 图标目录（Symbol 在线引用模式）

此目录使用 iconfont.cn 的 Symbol 在线引用方式，无需本地字体文件。

## 目录结构

```
docs/.vitepress/theme/style/
├── iconfont/                  ← iconfont 专用目录
│   ├── README.md             ← 使用说明文档
│   └── symbol.css            ← Symbol 图标样式
├── var.css
├── link.css
├── linkcard.css
└── ... (其他样式文件)
```

## 文件说明

- `symbol.css` - Symbol 图标基础样式和 hover 效果

## 使用方法

### 1. Symbol 在线引用（最推荐）⭐

**优势**：
- ✅ 自动更新 - 在 iconfont.cn 添加图标后自动同步
- ✅ 彩色图标 - 支持多色 SVG
- ✅ CDN 加速 - 阿里云 CDN
- ✅ 无需下载 - 不用频繁更新本地文件
- ✅ 预设样式 - 统一的 CSS 类，无需写内联样式

### 2. 使用预定义的 CSS 类（推荐）⭐

**symbol.css** 中已包含常用样式类，直接使用即可：

```html
<!-- ✅ 推荐：使用 CSS 类（简洁） -->
<svg class="icon icon-md">
  <use xlink:href="#icon-telegram"></use>
</svg>文字内容

<!-- ❌ 不推荐：内联样式（冗长） -->
<svg class="icon" style="width: 20px; height: 20px; display: inline-block; ...">
  <use xlink:href="#icon-telegram"></use>
</svg>
```

### 3. 可用的样式类

#### 尺寸类

| CSS 类 | 尺寸 | 适用场景 |
|--------|------|----------|
| `icon-sm` | 16px | 小图标、标签 |
| `icon-md` / `icon-standard` | 20px | 标准尺寸 ⭐ |
| `icon-lg` | 24px | 大图标、标题 |
| `icon-xl` | 32px | 超大图标、Hero |

#### 场景类

| CSS 类 | 说明 | 适用场景 |
|--------|------|----------|
| `icon-flex` | Flex 布局专用 | 链接、按钮内 |
| `icon-list` | 列表项图标 | 无序列表 |
| `icon-btn` | 按钮内图标 | 操作按钮 |
| `icon-nav` | 导航栏图标 | 菜单项 |
| `icon-inline` | 紧凑型图标 | 行内小图标 |

#### 工具类

| CSS 类 | 说明 |
|--------|------|
| `icon-no-margin` | 移除右边距 |
| `icon-no-offset` | 移除垂直偏移 |
| `icon-ml` | 添加左边距 |

### 4. 快速示例

#### 纯文字 + 图标
```html
<svg class="icon icon-md">
  <use xlink:href="#icon-telegram"></use>
</svg>
访问 Telegram
```

#### 链接 + 图标
```html
<a href="#" style="display: inline-flex; align-items: center; gap: 5px;">
  <svg class="icon icon-flex">
    <use xlink:href="#icon-telegram"></use>
  </svg>
  <span>访问 Telegram</span>
</a>
```

#### 列表项 + 图标
```html
<li>
  <svg class="icon icon-list">
    <use xlink:href="#icon-chrome"></use>
  </svg>
  Chrome 浏览器
</li>
```

#### 按钮 + 图标
```html
<button style="display: inline-flex; align-items: center; gap: 5px;">
  <svg class="icon icon-btn">
    <use xlink:href="#icon-save"></use>
  </svg>
  <span>保存</span>
</button>
```

## 如何添加新图标

1. 在 [iconfont.cn](https://www.iconfont.cn/) 项目中添加新图标
2. 等待几分钟，CDN 自动更新
3. 直接使用新图标，无需其他操作！

### 使用示例

在 Markdown 或 Vue 组件中：

```html
<!-- 使用新添加的图标 -->
<svg class="icon" aria-hidden="true">
  <use xlink:href="#icon-新图标名称"></use>
</svg>
```

## 查看可用图标

在浏览器控制台（F12）运行以下代码：

```javascript
// 查看所有加载的 Symbol 图标
setTimeout(() => {
  const svg = document.querySelector('body > svg');
  if (svg) {
    const symbols = svg.querySelectorAll('symbol');
    console.log('可用图标数量:', symbols.length);
    symbols.forEach(s => console.log('图标ID:', s.id));
  }
}, 1000);
```

## 维护说明

- **项目来源**：[iconfont.cn](https://www.iconfont.cn/) 项目 ID: 5034970
- **Symbol 在线链接**：`//at.alicdn.com/t/c/font_5034970_orj705e6jj.js`
- **更新方式**：在 iconfont.cn 项目中添加/修改图标，等待 CDN 自动更新

### 注意事项

- ✅ Symbol 在线引用会自动更新，无需手动维护文件
- ✅ 支持彩色 SVG 图标
- ⚠️ 如果图标未更新，清除浏览器缓存或等待 CDN 刷新（通常 5-10 分钟）
- ⚠️ 需要网络连接才能加载图标

### 链接格式说明

```
//at.alicdn.com/t/c/font_项目ID_随机码.js
                        ↑        ↑
                    项目ID    版本码（自动更新）
```
