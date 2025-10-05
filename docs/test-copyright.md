---
title: 版权组件测试
copyright: true
---

# 版权组件测试页面

这是一个测试版权组件的页面。

## 测试内容

版权信息应该显示在页面底部，包含：

- 作者信息
- 文章链接
- 版权声明

如果你在 frontmatter 中设置 `copyright: false`，版权信息将不会显示。

## 测试禁用版权

如果你想测试禁用版权，可以在 frontmatter 中添加：

```yaml
---
title: 测试页面
copyright: false
---
```

这样版权信息就不会显示了。
