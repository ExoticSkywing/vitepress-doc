import { defineConfig } from 'vitepress'

import { devDependencies } from '../../package.json'
import markdownItTaskCheckbox from 'markdown-it-task-checkbox'
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from 'vitepress-plugin-group-icons'
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';
import { vitepressPluginLegend  } from 'vitepress-plugin-legend';
import { generateSidebar } from 'vitepress-sidebar';
import { usePosts } from './theme/untils/permalink';
const { rewrites } = await usePosts();

export default defineConfig({
  lang: 'zh-CN',
  title: "漫数花园",
  description: "记录数字世界",
  rewrites,
  
  // 忽略死链接检查（开发阶段）
  ignoreDeadLinks: true,

  //网站地图
  sitemap: {
    hostname: 'https://wiki.manyuzo.com',
  },

  // #region fav
  head: [
    ['link', { rel: 'icon', href: 'https://api.minio.1yo.cc/nebuluxe/halosparkpix/1759645609217.webp' }],
    ['script', { src: '//at.alicdn.com/t/c/font_5034970_orj705e6j3.js' }]
  ],
  // #endregion fav

  base: '/', //网站部署到github的vitepress这个仓库里

  // cleanUrls:true, //开启纯净链接无html

  //启用深色模式
  appearance: 'dark',

  //多语言
  locales: {
    root: {
      label: '简体中文',
      lang: 'Zh_CN',
    },
    en: {
      label: 'English',
      lang: 'en',
      link: '/en/',
    },
    fr: {
      label: 'French',
      lang: 'fr',
      link: '/fr/',
    }
  },

  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: true,

    // toc显示一级标题
    toc: {level: [2,3,4,5,6]},

    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, '[!code')
        }
      }
    ],

    // 开启图片懒加载
    image: {
      lazyLoading: true
    },

    config: (md) => {
      // 组件插入h1标题下
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options)
        if (tokens[idx].tag === 'h1') htmlResult += `<ArticleMetadata />`
        return htmlResult
      },

      // 代码组中添加图片
      md.use((md) => {
        const defaultRender = md.render
        md.render = (...args) => {
          const [content, env] = args
          const currentLang = env?.localeIndex || 'root'
          const isHomePage = env?.path === '/' || env?.relativePath === 'index.md'  // 判断是否是首页

          if (isHomePage) {
            return defaultRender.apply(md, args) // 如果是首页，直接渲染内容
          }
          // 调用原始渲染
          let defaultContent = defaultRender.apply(md, args)
          // 替换内容
          if (currentLang === 'root') {
            defaultContent = defaultContent.replace(/NOTE/g, '提醒')
              .replace(/TIP/g, '建议')
              .replace(/IMPORTANT/g, '重要')
              .replace(/WARNING/g, '警告')
              .replace(/CAUTION/g, '注意')
          } else if (currentLang === 'ko') {
            // 韩文替换
            defaultContent = defaultContent.replace(/NOTE/g, '알림')
              .replace(/TIP/g, '팁')
              .replace(/IMPORTANT/g, '중요')
              .replace(/WARNING/g, '경고')
              .replace(/CAUTION/g, '주의')
          }
          // 返回渲染的内容
          return defaultContent
        }

        // 获取原始的 fence 渲染规则
        const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules) ?? ((...args) => args[0][args[1]].content);

        // 重写 fence 渲染规则
        md.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          const info = token.info.trim();

          // 判断是否为 md:img 类型的代码块
          if (info.includes('md:img')) {
            // 只渲染图片，不再渲染为代码块
            return `<div class="rendered-md">${md.render(token.content)}</div>`;
          }

          // 其他代码块按默认规则渲染（如 java, js 等）
          return defaultFence(tokens, idx, options, env, self);
        };
      })
      
      vitepressPluginLegend(md, {
        markmap: { showToolbar: true }, // 显示脑图工具栏
        mermaid: {} // 启用 Mermaid（使用默认配置）
      });

      md.use(groupIconMdPlugin) //代码组图标
      md.use(markdownItTaskCheckbox) //todo
      md.use(MermaidMarkdown); 

    }

  },

  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(import.meta.url, '../public/svg/typescript.svg'), //本地ts图标导入
          md: localIconLoader(import.meta.url, '../public/svg/md.svg'), //markdown图标
          css: localIconLoader(import.meta.url, '../public/svg/css.svg'), //css图标
          js: 'logos:javascript', //js图标
        },
      }),
      [MermaidPlugin()]
    ]as any,
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },

  lastUpdated: true, //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释

  //主题配置
  themeConfig: {
    //左上角logo
    logo: 'https://api.minio.1yo.cc/nebuluxe/halosparkpix/1759645609217.webp',
    //logo: 'https://vitejs.cn/vite3-cn/logo-with-shadow.png', //远程引用
    //siteTitle: false, //标题隐藏

    //设置站点标题 会覆盖title
    //siteTitle: 'Hello World',

    //编辑本页
    editLink: {
      pattern: 'https://github.com/Yiov/vitepress-doc/edit/main/docs/:path', // 改成自己的仓库
      text: '在GitHub编辑本页'
    },

    //上次更新时间
    lastUpdated: {
      text: '上次更新时间',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'medium' // 可选值full、long、medium、short
      },
    },

    //导航栏
    nav: [
      { text: '🏠 首页', link: '/' },
      {
        text: '🔧 纯开发向',
        items: [
          { text: '💾 后端', link: '/backend/' },
          { text: '🚀 运维', link: '/devops/' },
          { text: '🎨 前端', link: '/frontend/' },
        ],
      },
      {
        text: '📖 关于本站',
        items: [
          {
            // 分组标题1
            text: '开发者相关',
            items: [
              { text: '📚 搭建指南', link: '/deploy-guide' },
            ],
          },
          /*
          {
            // 分组标题2
            text: '基础设置',
            items: [
              { text: '快速上手', link: '/getting-started' },
              { text: '配置', link: '/configuration' },
              { text: '页面', link: '/page' },
              { text: 'Frontmatter', link: '/frontmatter' },
            ],
          },
          {
            // 分组标题3
            text: '进阶玩法',
            items: [
              { text: 'Markdown', link: '/markdown' },
              { text: '团队', link: '/team' },
              { text: '多语言', link: '/multi-language' },
              { text: 'DocSearch', link: '/docsearch' },
              { text: '静态部署', link: '/assets' },
              { text: '样式美化', link: '/style' },
              { text: '组件', link: '/components' },
              { text: '布局插槽', link: '/layout' },
              { text: '插件', link: '/plugin' },
              { text: '更新及卸载', link: '/update' },
              { text: '搭建导航', link: '/nav/' },
              { text: '永久链接', link: '/permalink/' },
            ],
          },
          */
        ],
      },
      { text: '更新日志', link: '/deploy-guide/changelog' },
    ],


    //侧边栏 - 自动生成配置
    sidebar: generateSidebar([
      {
        documentRootPath: '/docs',
        scanStartPath: 'backend',
        resolvePath: '/backend/',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀（如 01.cpp → cpp）
        removePrefixAfterOrdering: true,
        prefixSeparator: '.',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'devops',
        resolvePath: '/devops/',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀
        removePrefixAfterOrdering: true,
        prefixSeparator: '.',
      },
      {
        documentRootPath: '/docs',
        scanStartPath: 'frontend',
        resolvePath: '/frontend/',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀
        removePrefixAfterOrdering: true,
        prefixSeparator: '.',
      },
      {
        // 部署指南侧边栏
        documentRootPath: '/docs',
        scanStartPath: 'deploy-guide',
        resolvePath: '/deploy-guide/',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀
        removePrefixAfterOrdering: true,
        prefixSeparator: '.',
      },
      {
        // 默认侧边栏（指南等页面）
        documentRootPath: '/docs',
        scanStartPath: null,
        resolvePath: '/',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        excludeFolders: ['backend', 'devops', 'frontend', 'deploy-guide', 'public', 'node_modules', '.vitepress'],
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀
        removePrefixAfterOrdering: true,
        prefixSeparator: '.',
      }
    ]),
    
    /* 
    ========================================
    旧的手动配置已被自动生成替代，保留备份
    ========================================
    sidebar_manual: {
      // 后端开发侧边栏
      '/backend/': [
        {
          text: '💾 后端开发',
          items: [
            { text: '概述', link: '/backend/' },
          ],
        },
        {
          text: 'C++',
          collapsed: true,
          items: [
            { text: 'C++ 简介', link: '/backend/cpp/intro' },
          ],
        },
        {
          text: 'Python',
          collapsed: true,
          items: [
            { text: 'Python 简介', link: '/backend/python/intro' },
          ],
        },
        {
          text: 'Java',
          collapsed: true,
          items: [
            { text: 'Java 基础', link: '/backend/java/intro' },
          ],
        },
        {
          text: 'Go',
          collapsed: true,
          items: [
            { text: 'Go 入门', link: '/backend/go/intro' },
          ],
        },
      ],

      // 运维侧边栏
      '/devops/': [
        {
          text: '🚀 运维',
          items: [
            { text: '概述', link: '/devops/' },
          ],
        },
        {
          text: '数据库',
          collapsed: true,
          items: [
            { text: '数据库概述', link: '/devops/database/' },
            {
              text: 'MySQL',
              collapsed: true,
              items: [
                { text: 'MySQL 概述', link: '/devops/database/mysql/' },
                {
                  text: '安装部署',
                  collapsed: true,
                  items: [
                    { text: 'Windows 安装', link: '/devops/database/mysql/install/windows' },
                    { text: 'Linux 安装', link: '/devops/database/mysql/install/linux' },
                    { text: 'Docker 安装', link: '/devops/database/mysql/install/docker' },
                  ],
                },
                {
                  text: '配置管理',
                  collapsed: true,
                  items: [
                    { text: '基础配置', link: '/devops/database/mysql/config/basic' },
                    { text: '性能配置', link: '/devops/database/mysql/config/performance' },
                  ],
                },
                {
                  text: '使用教程',
                  collapsed: true,
                  items: [
                    { text: '基础 SQL', link: '/devops/database/mysql/usage/basic-sql' },
                  ],
                },
                {
                  text: '性能优化',
                  collapsed: true,
                  items: [
                    { text: '索引优化', link: '/devops/database/mysql/optimize/index-optimize' },
                  ],
                },
              ],
            },
            {
              text: 'Oracle',
              collapsed: true,
              items: [
                { text: 'Oracle 安装', link: '/devops/database/oracle/install' },
              ],
            },
            {
              text: 'MongoDB',
              collapsed: true,
              items: [
                { text: 'MongoDB 入门', link: '/devops/database/mongodb/intro' },
              ],
            },
            {
              text: 'Redis',
              collapsed: true,
              items: [
                { text: 'Redis 入门', link: '/devops/database/redis/intro' },
              ],
            },
          ],
        },
        {
          text: 'Linux',
          collapsed: true,
          items: [
            { text: 'Linux 简介', link: '/devops/linux/intro' },
          ],
        },
        {
          text: 'Docker',
          collapsed: true,
          items: [
            { text: 'Docker 入门', link: '/devops/docker/intro' },
          ],
        },
        {
          text: 'Kubernetes',
          collapsed: true,
          items: [
            { text: 'K8s 入门', link: '/devops/kubernetes/intro' },
          ],
        },
      ],

      // 前端开发侧边栏
      '/frontend/': [
        {
          text: '🎨 前端开发',
          items: [
            { text: '概述', link: '/frontend/' },
          ],
        },
        {
          text: 'Vue',
          collapsed: true,
          items: [
            { text: 'Vue 基础', link: '/frontend/vue/intro' },
          ],
        },
        {
          text: 'React',
          collapsed: true,
          items: [
            { text: 'React 基础', link: '/frontend/react/intro' },
          ],
        },
        {
          text: 'CSS',
          collapsed: true,
          items: [
            { text: 'CSS 基础', link: '/frontend/css/intro' },
          ],
        },
        {
          text: 'JavaScript',
          collapsed: true,
          items: [
            { text: 'JS 基础', link: '/frontend/javascript/intro' },
          ],
        },
      ],

      // 默认侧边栏（用于指南等页面）
      '/': [
        {
          text: '介绍',
          collapsed: true,
          items: [
            { text: '前言', link: '/preface' },
          ],
        },
        {
          text: '基础配置',
          collapsed: true,
          items: [
            { text: '快速上手', link: '/getting-started' },
            { text: '配置', link: '/configuration' },
            { text: '页面', link: '/page' },
            { text: 'Frontmatter', link: '/frontmatter' },
          ],
        },
        {
          text: '进阶玩法',
          collapsed: true,
          items: [
            { text: 'Markdown', link: '/markdown' },
            { text: '团队', link: '/team' },
            { text: '多语言', link: '/multi-language' },
            { text: 'DocSearch', link: '/docsearch' },
            { text: '静态部署', link: '/assets' },
            { text: '样式美化', link: '/style' },
            { text: '组件', link: '/components' },
            { text: '布局插槽', link: '/layout' },
            { text: '插件', link: '/plugin' },
            { text: '更新及卸载', link: '/update' },
            { text: '搭建导航', link: '/nav/' },
            { text: '永久链接', link: '/permalink/' },
          ],
        },
        {
          text: '其他站点',
          collapsed: true,
          items: [
            { text: 'VuePress', link: 'https://vuepress.yiov.top/' },
            { text: '劝学录教程', link: 'https://yiov.top/' },
            { text: '个人主页', link: 'https://yingyayi.com/' },
          ],
        },
      ],
    },
    */



    //Algolia搜索
    search: {
      provider: 'algolia',
      options: {
        appId: 'QVKQI62L15',
        apiKey: 'bef8783dde57293ce082c531aa7c7e0c',
        indexName: 'doc',
        locales: {
          root: {
            placeholder: '搜索文档',
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                searchBox: {
                  resetButtonTitle: '清除查询条件',
                  resetButtonAriaLabel: '清除查询条件',
                  cancelButtonText: '取消',
                  cancelButtonAriaLabel: '取消'
                },
                startScreen: {
                  recentSearchesTitle: '搜索历史',
                  noRecentSearchesText: '没有搜索历史',
                  saveRecentSearchButtonTitle: '保存至搜索历史',
                  removeRecentSearchButtonTitle: '从搜索历史中移除',
                  favoriteSearchesTitle: '收藏',
                  removeFavoriteSearchButtonTitle: '从收藏中移除'
                },
                errorScreen: {
                  titleText: '无法获取结果',
                  helpText: '你可能需要检查你的网络连接'
                },
                footer: {
                  selectText: '选择',
                  navigateText: '切换',
                  closeText: '关闭',
                  searchByText: '搜索提供者'
                },
                noResultsScreen: {
                  noResultsText: '无法找到相关结果',
                  suggestedQueryText: '你可以尝试查询',
                  reportMissingResultsText: '你认为该查询应该有结果？',
                  reportMissingResultsLinkText: '点击反馈'
                },
              },
            },
          },
        },
      },
    },



    //社交链接
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Yiov/vitepress-doc' },
      { icon: 'wechat', link: 'https://chat.1yo.cc', ariaLabel: '云上聊天室' },
      // { icon: 'twitter', link: 'https://twitter.com/' },
      // { icon: 'discord', link: 'https://chat.vitejs.dev/' },
      // {
      //   icon: {
      //     svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
      //   },
      //   link: 'https://weixin.qq.com/',
      //   // You can include a custom label for accessibility too (optional but recommended):
      //   ariaLabel: 'wechat'
      // }
    ],

    //手机端深浅模式文字修改
    darkModeSwitchLabel: '深浅模式',




    //页脚
    footer: {
      message: '浪漫宇宙旗下知识库分享站',
      copyright: `Copyright © 2022-${new Date().getFullYear()} | Powered by <a href="https://1yo.cc" target="_blank">浪漫宇宙</a> `,
    },


    //侧边栏文字更改(移动端)
    sidebarMenuLabel: '查看分类',

    //返回顶部文字修改(移动端)
    returnToTopLabel: '返回顶部',


    //大纲显示2-3级标题
    outline: {
      level: [2, 3, 4],
      label: '本页导航'
    },


    //自定义上下页名
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },

  },



})