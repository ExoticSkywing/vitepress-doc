// docs/.vitepress/config.mts
import { defineConfig } from "file:///root/data/repo/vitepress-doc/node_modules/.pnpm/vitepress@1.6.4_@algolia+client-search@5.29.0_@types+node@24.7.1_less@4.4.2_sass@1.93.2_searc_xfivddp3srwi6nj5twuah75shu/node_modules/vitepress/dist/node/index.js";

// package.json
var devDependencies = {
  "@mdit-vue/shared": "^3.0.2",
  "@types/dom-view-transitions": "^1.0.6",
  "@types/node": "^24.7.1",
  "busuanzi.pure.js": "^1.0.3",
  "canvas-confetti": "^1.9.3",
  "fast-glob": "^3.3.3",
  "gray-matter": "^4.0.3",
  less: "^4.4.2",
  "markdown-it-task-checkbox": "^1.0.6",
  "medium-zoom": "^1.1.0",
  mermaid: "^11.12.0",
  "nprogress-v2": "^1.1.10",
  sass: "^1.93.2",
  vitepress: "^1.6.4",
  "vitepress-plugin-comment-with-giscus": "^1.1.15",
  "vitepress-plugin-group-icons": "^1.6.3",
  "vitepress-plugin-mermaid": "^2.0.17",
  "vitepress-sidebar": "^1.33.0",
  vue: "^3.5.22",
  xgplayer: "^3.0.23"
};

// docs/.vitepress/config.mts
import markdownItTaskCheckbox from "file:///root/data/repo/vitepress-doc/node_modules/.pnpm/markdown-it-task-checkbox@1.0.6/node_modules/markdown-it-task-checkbox/index.js";
import { groupIconMdPlugin, groupIconVitePlugin, localIconLoader } from "file:///root/data/repo/vitepress-doc/node_modules/.pnpm/vitepress-plugin-group-icons@1.6.3_markdown-it@14.1.0_vite@7.1.12/node_modules/vitepress-plugin-group-icons/dist/index.js";
import { MermaidMarkdown, MermaidPlugin } from "file:///root/data/repo/vitepress-doc/node_modules/.pnpm/vitepress-plugin-mermaid@2.0.17_mermaid@11.12.0_vitepress@1.6.4/node_modules/vitepress-plugin-mermaid/dist/vitepress-plugin-mermaid.es.mjs";
import { vitepressPluginLegend } from "file:///root/data/repo/vitepress-doc/node_modules/.pnpm/vitepress-plugin-legend@1.1.0_@types+node@24.7.1_less@4.4.2_markmap-common@0.18.9_typescript@5.9.3/node_modules/vitepress-plugin-legend/dist/index.js";
import { generateSidebar } from "file:///root/data/repo/vitepress-doc/node_modules/.pnpm/vitepress-sidebar@1.33.0/node_modules/vitepress-sidebar/dist/index.js";

// docs/.vitepress/theme/untils/permalink.ts
import matter from "file:///root/data/repo/vitepress-doc/node_modules/.pnpm/gray-matter@4.0.3/node_modules/gray-matter/index.js";
import fg from "file:///root/data/repo/vitepress-doc/node_modules/.pnpm/fast-glob@3.3.3/node_modules/fast-glob/out/index.js";
import fs from "fs/promises";
import path from "path";
var generateString = (length) => {
  const charset = "0123456789abcdef";
  let randomCode = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    randomCode += charset[randomIndex];
  }
  return randomCode;
};
var extractTitleFromContent = (content) => {
  const h1Regex = /^\s*#\s+(.+?)\s*$/m;
  const match = content.match(h1Regex);
  return match ? match[1].trim() : "";
};
var usePosts = async ({
  srcDir = "permalink",
  // 默认源目录为'permalink'
  baseDir = "docs"
  // 默认基础目录为'docs'
} = {}) => {
  const rewrites2 = {};
  try {
    const paths = (await fg(`${baseDir}/${srcDir}/**/*.md`, {
      ignore: ["**/index.md"]
      // 忽略所有index.md文件
    })).sort();
    const postsMap = {};
    await Promise.all(
      paths.map(async (postPath) => {
        const { data, content } = matter.read(postPath);
        if (!data.title) {
          const extractedTitle = extractTitleFromContent(content);
          if (extractedTitle) {
            data.title = extractedTitle;
          }
        }
        if (!data.permalink) {
          data.permalink = `/${srcDir}/${generateString(6)}`;
        }
        postsMap[postPath] = {
          permalink: data.permalink,
          title: data.title || path.basename(postPath, ".md")
        };
      })
    );
    await Promise.all(
      paths.map(async (postPath, index) => {
        const { data, content } = matter.read(postPath);
        const prevPost = index > 0 ? postsMap[paths[index - 1]] : null;
        const nextPost = index < paths.length - 1 ? postsMap[paths[index + 1]] : null;
        if (prevPost && !data.prev) {
          data.prev = {
            text: prevPost.title,
            link: prevPost.permalink
          };
        }
        if (nextPost && !data.next) {
          data.next = {
            text: nextPost.title,
            link: nextPost.permalink
          };
        }
        await fs.writeFile(
          postPath,
          matter.stringify(content, data),
          "utf8"
        );
        const relativePath = postPath.replace(`${baseDir}/`, "");
        rewrites2[relativePath.replace(/[+()]/g, "\\$&")] = `${data.permalink}.md`.slice(1).replace(/[+()]/g, "\\$&");
      })
    );
    return { rewrites: rewrites2 };
  } catch (e) {
    console.error(e);
    return { rewrites: rewrites2 };
  }
};

// docs/.vitepress/config.mts
var __vite_injected_original_import_meta_url = "file:///root/data/repo/vitepress-doc/docs/.vitepress/config.mts";
var { rewrites } = await usePosts();
var config_default = defineConfig({
  lang: "zh-CN",
  title: "\u6F2B\u6570\u82B1\u56ED",
  description: "\u8BB0\u5F55\u6570\u5B57\u4E16\u754C",
  rewrites,
  //网站地图
  sitemap: {
    hostname: "https://wiki.manyuzo.com"
  },
  // #region fav
  head: [
    ["link", { rel: "icon", href: "https://api.minio.1yo.cc/nebuluxe/halosparkpix/1759645609217.webp" }],
    ["script", { src: "//at.alicdn.com/t/c/font_5034970_orj705e6j3.js" }]
  ],
  // #endregion fav
  base: "/",
  //网站部署到github的vitepress这个仓库里
  // cleanUrls:true, //开启纯净链接无html
  //启用深色模式
  appearance: "dark",
  //多语言
  locales: {
    root: {
      label: "\u7B80\u4F53\u4E2D\u6587",
      lang: "Zh_CN"
    },
    en: {
      label: "English",
      lang: "en",
      link: "/en/"
    },
    fr: {
      label: "French",
      lang: "fr",
      link: "/fr/"
    }
  },
  //markdown配置
  markdown: {
    //行号显示
    lineNumbers: true,
    // toc显示一级标题
    toc: { level: [1, 2, 3, 4, 5, 6] },
    // 使用 `!!code` 防止转换
    codeTransformers: [
      {
        postprocess(code) {
          return code.replace(/\[\!\!code/g, "[!code");
        }
      }
    ],
    // 开启图片懒加载
    image: {
      lazyLoading: true
    },
    config: (md) => {
      md.renderer.rules.heading_close = (tokens, idx, options, env, slf) => {
        let htmlResult = slf.renderToken(tokens, idx, options);
        if (tokens[idx].tag === "h1") htmlResult += `<ArticleMetadata />`;
        return htmlResult;
      }, // 代码组中添加图片
      md.use((md2) => {
        const defaultRender = md2.render;
        md2.render = (...args) => {
          const [content, env] = args;
          const currentLang = env?.localeIndex || "root";
          const isHomePage = env?.path === "/" || env?.relativePath === "index.md";
          if (isHomePage) {
            return defaultRender.apply(md2, args);
          }
          let defaultContent = defaultRender.apply(md2, args);
          if (currentLang === "root") {
            defaultContent = defaultContent.replace(/NOTE/g, "\u63D0\u9192").replace(/TIP/g, "\u5EFA\u8BAE").replace(/IMPORTANT/g, "\u91CD\u8981").replace(/WARNING/g, "\u8B66\u544A").replace(/CAUTION/g, "\u6CE8\u610F");
          } else if (currentLang === "ko") {
            defaultContent = defaultContent.replace(/NOTE/g, "\uC54C\uB9BC").replace(/TIP/g, "\uD301").replace(/IMPORTANT/g, "\uC911\uC694").replace(/WARNING/g, "\uACBD\uACE0").replace(/CAUTION/g, "\uC8FC\uC758");
          }
          return defaultContent;
        };
        const defaultFence = md2.renderer.rules.fence?.bind(md2.renderer.rules) ?? ((...args) => args[0][args[1]].content);
        md2.renderer.rules.fence = (tokens, idx, options, env, self) => {
          const token = tokens[idx];
          const info = token.info.trim();
          if (info.includes("md:img")) {
            return `<div class="rendered-md">${md2.render(token.content)}</div>`;
          }
          return defaultFence(tokens, idx, options, env, self);
        };
      });
      vitepressPluginLegend(md, {
        markmap: { showToolbar: true },
        // 显示脑图工具栏
        mermaid: {}
        // 启用 Mermaid（使用默认配置）
      });
      md.use(groupIconMdPlugin);
      md.use(markdownItTaskCheckbox);
      md.use(MermaidMarkdown);
    }
  },
  vite: {
    plugins: [
      groupIconVitePlugin({
        customIcon: {
          ts: localIconLoader(__vite_injected_original_import_meta_url, "../public/svg/typescript.svg"),
          //本地ts图标导入
          md: localIconLoader(__vite_injected_original_import_meta_url, "../public/svg/md.svg"),
          //markdown图标
          css: localIconLoader(__vite_injected_original_import_meta_url, "../public/svg/css.svg"),
          //css图标
          js: "logos:javascript"
          //js图标
        }
      }),
      [MermaidPlugin()]
    ],
    optimizeDeps: {
      include: ["mermaid"]
    },
    ssr: {
      noExternal: ["mermaid"]
    }
  },
  lastUpdated: true,
  //此配置不会立即生效，需git提交后爬取时间戳，没有安装git本地报错可以先注释
  //主题配置
  themeConfig: {
    //左上角logo
    logo: "https://api.minio.1yo.cc/nebuluxe/halosparkpix/1759645609217.webp",
    //logo: 'https://vitejs.cn/vite3-cn/logo-with-shadow.png', //远程引用
    //siteTitle: false, //标题隐藏
    //设置站点标题 会覆盖title
    //siteTitle: 'Hello World',
    //编辑本页
    editLink: {
      pattern: "https://github.com/Yiov/vitepress-doc/edit/main/docs/:path",
      // 改成自己的仓库
      text: "\u5728GitHub\u7F16\u8F91\u672C\u9875"
    },
    //上次更新时间
    lastUpdated: {
      text: "\u4E0A\u6B21\u66F4\u65B0\u65F6\u95F4",
      formatOptions: {
        dateStyle: "short",
        // 可选值full、long、medium、short
        timeStyle: "medium"
        // 可选值full、long、medium、short
      }
    },
    //导航栏
    nav: [
      { text: "\u9996\u9875", link: "/" },
      {
        text: "\u{1F527} \u7EAF\u5F00\u53D1\u5411",
        items: [
          { text: "\u{1F4BE} \u540E\u7AEF", link: "/backend/" },
          { text: "\u{1F680} \u8FD0\u7EF4", link: "/devops/" },
          { text: "\u{1F3A8} \u524D\u7AEF", link: "/frontend/" }
        ]
      },
      {
        text: "\u{1F4D6} \u5173\u4E8E\u672C\u7AD9",
        items: [
          {
            // 分组标题1
            text: "\u{1F4DA} \u6307\u5357",
            items: [
              { text: "\u524D\u8A00", link: "/preface" }
            ]
          },
          {
            // 分组标题2
            text: "\u57FA\u7840\u8BBE\u7F6E",
            items: [
              { text: "\u5FEB\u901F\u4E0A\u624B", link: "/getting-started" },
              { text: "\u914D\u7F6E", link: "/configuration" },
              { text: "\u9875\u9762", link: "/page" },
              { text: "Frontmatter", link: "/frontmatter" }
            ]
          },
          {
            // 分组标题3
            text: "\u8FDB\u9636\u73A9\u6CD5",
            items: [
              { text: "Markdown", link: "/markdown" },
              { text: "\u56E2\u961F", link: "/team" },
              { text: "\u591A\u8BED\u8A00", link: "/multi-language" },
              { text: "DocSearch", link: "/docsearch" },
              { text: "\u9759\u6001\u90E8\u7F72", link: "/assets" },
              { text: "\u6837\u5F0F\u7F8E\u5316", link: "/style" },
              { text: "\u7EC4\u4EF6", link: "/components" },
              { text: "\u5E03\u5C40\u63D2\u69FD", link: "/layout" },
              { text: "\u63D2\u4EF6", link: "/plugin" },
              { text: "\u66F4\u65B0\u53CA\u5378\u8F7D", link: "/update" },
              { text: "\u642D\u5EFA\u5BFC\u822A", link: "/nav/" },
              { text: "\u6C38\u4E45\u94FE\u63A5", link: "/permalink/" }
            ]
          }
        ]
      },
      { text: `VitePress ${devDependencies.vitepress.replace("^", "")}`, link: "https://vitepress.dev/zh/" },
      { text: "\u66F4\u65B0\u65E5\u5FD7", link: "/changelog" }
    ],
    //侧边栏 - 自动生成配置
    sidebar: generateSidebar([
      {
        documentRootPath: "/docs",
        scanStartPath: "backend",
        resolvePath: "/backend/",
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀（如 01.cpp → cpp）
        removePrefixAfterOrdering: true,
        prefixSeparator: "."
      },
      {
        documentRootPath: "/docs",
        scanStartPath: "devops",
        resolvePath: "/devops/",
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀
        removePrefixAfterOrdering: true,
        prefixSeparator: "."
      },
      {
        documentRootPath: "/docs",
        scanStartPath: "frontend",
        resolvePath: "/frontend/",
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀
        removePrefixAfterOrdering: true,
        prefixSeparator: "."
      },
      {
        // 默认侧边栏（指南等页面）
        documentRootPath: "/docs",
        scanStartPath: null,
        resolvePath: "/",
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        hyphenToSpace: true,
        underscoreToSpace: true,
        collapsed: true,
        collapseDepth: 2,
        excludeFolders: ["backend", "devops", "frontend", "public", "node_modules", ".vitepress"],
        sortMenusByFrontmatterOrder: true,
        // 去除数字前缀
        removePrefixAfterOrdering: true,
        prefixSeparator: "."
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
      provider: "algolia",
      options: {
        appId: "QVKQI62L15",
        apiKey: "bef8783dde57293ce082c531aa7c7e0c",
        indexName: "doc",
        locales: {
          root: {
            placeholder: "\u641C\u7D22\u6587\u6863",
            translations: {
              button: {
                buttonText: "\u641C\u7D22\u6587\u6863",
                buttonAriaLabel: "\u641C\u7D22\u6587\u6863"
              },
              modal: {
                searchBox: {
                  resetButtonTitle: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  resetButtonAriaLabel: "\u6E05\u9664\u67E5\u8BE2\u6761\u4EF6",
                  cancelButtonText: "\u53D6\u6D88",
                  cancelButtonAriaLabel: "\u53D6\u6D88"
                },
                startScreen: {
                  recentSearchesTitle: "\u641C\u7D22\u5386\u53F2",
                  noRecentSearchesText: "\u6CA1\u6709\u641C\u7D22\u5386\u53F2",
                  saveRecentSearchButtonTitle: "\u4FDD\u5B58\u81F3\u641C\u7D22\u5386\u53F2",
                  removeRecentSearchButtonTitle: "\u4ECE\u641C\u7D22\u5386\u53F2\u4E2D\u79FB\u9664",
                  favoriteSearchesTitle: "\u6536\u85CF",
                  removeFavoriteSearchButtonTitle: "\u4ECE\u6536\u85CF\u4E2D\u79FB\u9664"
                },
                errorScreen: {
                  titleText: "\u65E0\u6CD5\u83B7\u53D6\u7ED3\u679C",
                  helpText: "\u4F60\u53EF\u80FD\u9700\u8981\u68C0\u67E5\u4F60\u7684\u7F51\u7EDC\u8FDE\u63A5"
                },
                footer: {
                  selectText: "\u9009\u62E9",
                  navigateText: "\u5207\u6362",
                  closeText: "\u5173\u95ED",
                  searchByText: "\u641C\u7D22\u63D0\u4F9B\u8005"
                },
                noResultsScreen: {
                  noResultsText: "\u65E0\u6CD5\u627E\u5230\u76F8\u5173\u7ED3\u679C",
                  suggestedQueryText: "\u4F60\u53EF\u4EE5\u5C1D\u8BD5\u67E5\u8BE2",
                  reportMissingResultsText: "\u4F60\u8BA4\u4E3A\u8BE5\u67E5\u8BE2\u5E94\u8BE5\u6709\u7ED3\u679C\uFF1F",
                  reportMissingResultsLinkText: "\u70B9\u51FB\u53CD\u9988"
                }
              }
            }
          }
        }
      }
    },
    //社交链接
    socialLinks: [
      { icon: "github", link: "https://github.com/Yiov/vitepress-doc" },
      { icon: "twitter", link: "https://twitter.com/" },
      { icon: "discord", link: "https://chat.vitejs.dev/" },
      {
        icon: {
          svg: '<svg t="1703483542872" class="icon" viewBox="0 0 1309 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6274" width="200" height="200"><path d="M1147.26896 912.681417l34.90165 111.318583-127.165111-66.823891a604.787313 604.787313 0 0 1-139.082747 22.263717c-220.607239 0-394.296969-144.615936-394.296969-322.758409s173.526026-322.889372 394.296969-322.889372C1124.219465 333.661082 1309.630388 478.669907 1309.630388 656.550454c0 100.284947-69.344929 189.143369-162.361428 256.130963zM788.070086 511.869037a49.11114 49.11114 0 0 0-46.360916 44.494692 48.783732 48.783732 0 0 0 46.360916 44.494693 52.090549 52.090549 0 0 0 57.983885-44.494693 52.385216 52.385216 0 0 0-57.983885-44.494692z m254.985036 0a48.881954 48.881954 0 0 0-46.09899 44.494692 48.620028 48.620028 0 0 0 46.09899 44.494693 52.385216 52.385216 0 0 0 57.983886-44.494693 52.58166 52.58166 0 0 0-57.951145-44.494692z m-550.568615 150.018161a318.567592 318.567592 0 0 0 14.307712 93.212943c-14.307712 1.080445-28.746387 1.768001-43.283284 1.768001a827.293516 827.293516 0 0 1-162.394168-22.296458l-162.001279 77.955749 46.328175-133.811485C69.410411 600.858422 0 500.507993 0 378.38496 0 166.683208 208.689602 0 463.510935 0c227.908428 0 427.594322 133.18941 467.701752 312.379588a427.463358 427.463358 0 0 0-44.625655-2.619261c-220.24709 0-394.100524 157.74498-394.100525 352.126871zM312.90344 189.143369a64.270111 64.270111 0 0 0-69.803299 55.659291 64.532037 64.532037 0 0 0 69.803299 55.659292 53.694846 53.694846 0 0 0 57.852923-55.659292 53.465661 53.465661 0 0 0-57.852923-55.659291z m324.428188 0a64.040926 64.040926 0 0 0-69.574114 55.659291 64.302852 64.302852 0 0 0 69.574114 55.659292 53.694846 53.694846 0 0 0 57.951145-55.659292 53.465661 53.465661 0 0 0-57.951145-55.659291z" p-id="6275"></path></svg>'
        },
        link: "https://weixin.qq.com/",
        // You can include a custom label for accessibility too (optional but recommended):
        ariaLabel: "wechat"
      }
    ],
    //手机端深浅模式文字修改
    darkModeSwitchLabel: "\u6DF1\u6D45\u6A21\u5F0F",
    //页脚
    footer: {
      message: "\u6D6A\u6F2B\u5B87\u5B99\u65D7\u4E0B\u77E5\u8BC6\u5E93\u5206\u4EAB\u7AD9",
      copyright: `Copyright \xA9 2022-${(/* @__PURE__ */ new Date()).getFullYear()} | Powered by <a href="https://1yo.cc" target="_blank">\u6D6A\u6F2B\u5B87\u5B99</a> `
    },
    //侧边栏文字更改(移动端)
    sidebarMenuLabel: "\u67E5\u770B\u5206\u7C7B",
    //返回顶部文字修改(移动端)
    returnToTopLabel: "\u8FD4\u56DE\u9876\u90E8",
    //大纲显示2-3级标题
    outline: {
      level: [2, 3],
      label: "\u672C\u9875\u5BFC\u822A"
    },
    //自定义上下页名
    docFooter: {
      prev: "\u4E0A\u4E00\u9875",
      next: "\u4E0B\u4E00\u9875"
    }
  }
});
export {
  config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udml0ZXByZXNzL2NvbmZpZy5tdHMiLCAicGFja2FnZS5qc29uIiwgImRvY3MvLnZpdGVwcmVzcy90aGVtZS91bnRpbHMvcGVybWFsaW5rLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvZGF0YS9yZXBvL3ZpdGVwcmVzcy1kb2MvZG9jcy8udml0ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvcm9vdC9kYXRhL3JlcG8vdml0ZXByZXNzLWRvYy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vcm9vdC9kYXRhL3JlcG8vdml0ZXByZXNzLWRvYy9kb2NzLy52aXRlcHJlc3MvY29uZmlnLm10c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVwcmVzcydcblxuaW1wb3J0IHsgZGV2RGVwZW5kZW5jaWVzIH0gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJ1xuaW1wb3J0IG1hcmtkb3duSXRUYXNrQ2hlY2tib3ggZnJvbSAnbWFya2Rvd24taXQtdGFzay1jaGVja2JveCdcbmltcG9ydCB7IGdyb3VwSWNvbk1kUGx1Z2luLCBncm91cEljb25WaXRlUGx1Z2luLCBsb2NhbEljb25Mb2FkZXIgfSBmcm9tICd2aXRlcHJlc3MtcGx1Z2luLWdyb3VwLWljb25zJ1xuaW1wb3J0IHsgTWVybWFpZE1hcmtkb3duLCBNZXJtYWlkUGx1Z2luIH0gZnJvbSAndml0ZXByZXNzLXBsdWdpbi1tZXJtYWlkJztcbmltcG9ydCB7IHZpdGVwcmVzc1BsdWdpbkxlZ2VuZCAgfSBmcm9tICd2aXRlcHJlc3MtcGx1Z2luLWxlZ2VuZCc7XG5pbXBvcnQgeyBnZW5lcmF0ZVNpZGViYXIgfSBmcm9tICd2aXRlcHJlc3Mtc2lkZWJhcic7XG5pbXBvcnQgeyB1c2VQb3N0cyB9IGZyb20gJy4vdGhlbWUvdW50aWxzL3Blcm1hbGluayc7XG5jb25zdCB7IHJld3JpdGVzIH0gPSBhd2FpdCB1c2VQb3N0cygpO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBsYW5nOiAnemgtQ04nLFxuICB0aXRsZTogXCJcdTZGMkJcdTY1NzBcdTgyQjFcdTU2RURcIixcbiAgZGVzY3JpcHRpb246IFwiXHU4QkIwXHU1RjU1XHU2NTcwXHU1QjU3XHU0RTE2XHU3NTRDXCIsXG4gIHJld3JpdGVzLFxuXG4gIC8vXHU3RjUxXHU3QUQ5XHU1NzMwXHU1NkZFXG4gIHNpdGVtYXA6IHtcbiAgICBob3N0bmFtZTogJ2h0dHBzOi8vd2lraS5tYW55dXpvLmNvbScsXG4gIH0sXG5cbiAgLy8gI3JlZ2lvbiBmYXZcbiAgaGVhZDogW1xuICAgIFsnbGluaycsIHsgcmVsOiAnaWNvbicsIGhyZWY6ICdodHRwczovL2FwaS5taW5pby4xeW8uY2MvbmVidWx1eGUvaGFsb3NwYXJrcGl4LzE3NTk2NDU2MDkyMTcud2VicCcgfV0sXG4gICAgWydzY3JpcHQnLCB7IHNyYzogJy8vYXQuYWxpY2RuLmNvbS90L2MvZm9udF81MDM0OTcwX29yajcwNWU2ajMuanMnIH1dXG4gIF0sXG4gIC8vICNlbmRyZWdpb24gZmF2XG5cbiAgYmFzZTogJy8nLCAvL1x1N0Y1MVx1N0FEOVx1OTBFOFx1N0Y3Mlx1NTIzMGdpdGh1Ylx1NzY4NHZpdGVwcmVzc1x1OEZEOVx1NEUyQVx1NEVEM1x1NUU5M1x1OTFDQ1xuXG4gIC8vIGNsZWFuVXJsczp0cnVlLCAvL1x1NUYwMFx1NTQyRlx1N0VBRlx1NTFDMFx1OTRGRVx1NjNBNVx1NjVFMGh0bWxcblxuICAvL1x1NTQyRlx1NzUyOFx1NkRGMVx1ODI3Mlx1NkEyMVx1NUYwRlxuICBhcHBlYXJhbmNlOiAnZGFyaycsXG5cbiAgLy9cdTU5MUFcdThCRURcdThBMDBcbiAgbG9jYWxlczoge1xuICAgIHJvb3Q6IHtcbiAgICAgIGxhYmVsOiAnXHU3QjgwXHU0RjUzXHU0RTJEXHU2NTg3JyxcbiAgICAgIGxhbmc6ICdaaF9DTicsXG4gICAgfSxcbiAgICBlbjoge1xuICAgICAgbGFiZWw6ICdFbmdsaXNoJyxcbiAgICAgIGxhbmc6ICdlbicsXG4gICAgICBsaW5rOiAnL2VuLycsXG4gICAgfSxcbiAgICBmcjoge1xuICAgICAgbGFiZWw6ICdGcmVuY2gnLFxuICAgICAgbGFuZzogJ2ZyJyxcbiAgICAgIGxpbms6ICcvZnIvJyxcbiAgICB9XG4gIH0sXG5cbiAgLy9tYXJrZG93blx1OTE0RFx1N0Y2RVxuICBtYXJrZG93bjoge1xuICAgIC8vXHU4ODRDXHU1M0Y3XHU2NjNFXHU3OTNBXG4gICAgbGluZU51bWJlcnM6IHRydWUsXG5cbiAgICAvLyB0b2NcdTY2M0VcdTc5M0FcdTRFMDBcdTdFQTdcdTY4MDdcdTk4OThcbiAgICB0b2M6IHtsZXZlbDogWzEsMiwzLDQsNSw2XX0sXG5cbiAgICAvLyBcdTRGN0ZcdTc1MjggYCEhY29kZWAgXHU5NjMyXHU2QjYyXHU4RjZDXHU2MzYyXG4gICAgY29kZVRyYW5zZm9ybWVyczogW1xuICAgICAge1xuICAgICAgICBwb3N0cHJvY2Vzcyhjb2RlKSB7XG4gICAgICAgICAgcmV0dXJuIGNvZGUucmVwbGFjZSgvXFxbXFwhXFwhY29kZS9nLCAnWyFjb2RlJylcbiAgICAgICAgfVxuICAgICAgfVxuICAgIF0sXG5cbiAgICAvLyBcdTVGMDBcdTU0MkZcdTU2RkVcdTcyNDdcdTYxRDJcdTUyQTBcdThGN0RcbiAgICBpbWFnZToge1xuICAgICAgbGF6eUxvYWRpbmc6IHRydWVcbiAgICB9LFxuXG4gICAgY29uZmlnOiAobWQpID0+IHtcbiAgICAgIC8vIFx1N0VDNFx1NEVGNlx1NjNEMlx1NTE2NWgxXHU2ODA3XHU5ODk4XHU0RTBCXG4gICAgICBtZC5yZW5kZXJlci5ydWxlcy5oZWFkaW5nX2Nsb3NlID0gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNsZikgPT4ge1xuICAgICAgICBsZXQgaHRtbFJlc3VsdCA9IHNsZi5yZW5kZXJUb2tlbih0b2tlbnMsIGlkeCwgb3B0aW9ucylcbiAgICAgICAgaWYgKHRva2Vuc1tpZHhdLnRhZyA9PT0gJ2gxJykgaHRtbFJlc3VsdCArPSBgPEFydGljbGVNZXRhZGF0YSAvPmBcbiAgICAgICAgcmV0dXJuIGh0bWxSZXN1bHRcbiAgICAgIH0sXG5cbiAgICAgIC8vIFx1NEVFM1x1NzgwMVx1N0VDNFx1NEUyRFx1NkRGQlx1NTJBMFx1NTZGRVx1NzI0N1xuICAgICAgbWQudXNlKChtZCkgPT4ge1xuICAgICAgICBjb25zdCBkZWZhdWx0UmVuZGVyID0gbWQucmVuZGVyXG4gICAgICAgIG1kLnJlbmRlciA9ICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgY29uc3QgW2NvbnRlbnQsIGVudl0gPSBhcmdzXG4gICAgICAgICAgY29uc3QgY3VycmVudExhbmcgPSBlbnY/LmxvY2FsZUluZGV4IHx8ICdyb290J1xuICAgICAgICAgIGNvbnN0IGlzSG9tZVBhZ2UgPSBlbnY/LnBhdGggPT09ICcvJyB8fCBlbnY/LnJlbGF0aXZlUGF0aCA9PT0gJ2luZGV4Lm1kJyAgLy8gXHU1MjI0XHU2NUFEXHU2NjJGXHU1NDI2XHU2NjJGXHU5OTk2XHU5ODc1XG5cbiAgICAgICAgICBpZiAoaXNIb21lUGFnZSkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRSZW5kZXIuYXBwbHkobWQsIGFyZ3MpIC8vIFx1NTk4Mlx1Njc5Q1x1NjYyRlx1OTk5Nlx1OTg3NVx1RkYwQ1x1NzZGNFx1NjNBNVx1NkUzMlx1NjdEM1x1NTE4NVx1NUJCOVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBcdThDMDNcdTc1MjhcdTUzOUZcdTU5Q0JcdTZFMzJcdTY3RDNcbiAgICAgICAgICBsZXQgZGVmYXVsdENvbnRlbnQgPSBkZWZhdWx0UmVuZGVyLmFwcGx5KG1kLCBhcmdzKVxuICAgICAgICAgIC8vIFx1NjZGRlx1NjM2Mlx1NTE4NVx1NUJCOVxuICAgICAgICAgIGlmIChjdXJyZW50TGFuZyA9PT0gJ3Jvb3QnKSB7XG4gICAgICAgICAgICBkZWZhdWx0Q29udGVudCA9IGRlZmF1bHRDb250ZW50LnJlcGxhY2UoL05PVEUvZywgJ1x1NjNEMFx1OTE5MicpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9USVAvZywgJ1x1NUVGQVx1OEJBRScpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9JTVBPUlRBTlQvZywgJ1x1OTFDRFx1ODk4MScpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9XQVJOSU5HL2csICdcdThCNjZcdTU0NEEnKVxuICAgICAgICAgICAgICAucmVwbGFjZSgvQ0FVVElPTi9nLCAnXHU2Q0U4XHU2MTBGJylcbiAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRMYW5nID09PSAna28nKSB7XG4gICAgICAgICAgICAvLyBcdTk3RTlcdTY1ODdcdTY2RkZcdTYzNjJcbiAgICAgICAgICAgIGRlZmF1bHRDb250ZW50ID0gZGVmYXVsdENvbnRlbnQucmVwbGFjZSgvTk9URS9nLCAnXHVDNTRDXHVCOUJDJylcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1RJUC9nLCAnXHVEMzAxJylcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL0lNUE9SVEFOVC9nLCAnXHVDOTExXHVDNjk0JylcbiAgICAgICAgICAgICAgLnJlcGxhY2UoL1dBUk5JTkcvZywgJ1x1QUNCRFx1QUNFMCcpXG4gICAgICAgICAgICAgIC5yZXBsYWNlKC9DQVVUSU9OL2csICdcdUM4RkNcdUM3NTgnKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBcdThGRDRcdTU2REVcdTZFMzJcdTY3RDNcdTc2ODRcdTUxODVcdTVCQjlcbiAgICAgICAgICByZXR1cm4gZGVmYXVsdENvbnRlbnRcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1ODNCN1x1NTNENlx1NTM5Rlx1NTlDQlx1NzY4NCBmZW5jZSBcdTZFMzJcdTY3RDNcdTg5QzRcdTUyMTlcbiAgICAgICAgY29uc3QgZGVmYXVsdEZlbmNlID0gbWQucmVuZGVyZXIucnVsZXMuZmVuY2U/LmJpbmQobWQucmVuZGVyZXIucnVsZXMpID8/ICgoLi4uYXJncykgPT4gYXJnc1swXVthcmdzWzFdXS5jb250ZW50KTtcblxuICAgICAgICAvLyBcdTkxQ0RcdTUxOTkgZmVuY2UgXHU2RTMyXHU2N0QzXHU4OUM0XHU1MjE5XG4gICAgICAgIG1kLnJlbmRlcmVyLnJ1bGVzLmZlbmNlID0gKHRva2VucywgaWR4LCBvcHRpb25zLCBlbnYsIHNlbGYpID0+IHtcbiAgICAgICAgICBjb25zdCB0b2tlbiA9IHRva2Vuc1tpZHhdO1xuICAgICAgICAgIGNvbnN0IGluZm8gPSB0b2tlbi5pbmZvLnRyaW0oKTtcblxuICAgICAgICAgIC8vIFx1NTIyNFx1NjVBRFx1NjYyRlx1NTQyNlx1NEUzQSBtZDppbWcgXHU3QzdCXHU1NzhCXHU3Njg0XHU0RUUzXHU3ODAxXHU1NzU3XG4gICAgICAgICAgaWYgKGluZm8uaW5jbHVkZXMoJ21kOmltZycpKSB7XG4gICAgICAgICAgICAvLyBcdTUzRUFcdTZFMzJcdTY3RDNcdTU2RkVcdTcyNDdcdUZGMENcdTRFMERcdTUxOERcdTZFMzJcdTY3RDNcdTRFM0FcdTRFRTNcdTc4MDFcdTU3NTdcbiAgICAgICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cInJlbmRlcmVkLW1kXCI+JHttZC5yZW5kZXIodG9rZW4uY29udGVudCl9PC9kaXY+YDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBcdTUxNzZcdTRFRDZcdTRFRTNcdTc4MDFcdTU3NTdcdTYzMDlcdTlFRDhcdThCQTRcdTg5QzRcdTUyMTlcdTZFMzJcdTY3RDNcdUZGMDhcdTU5ODIgamF2YSwganMgXHU3QjQ5XHVGRjA5XG4gICAgICAgICAgcmV0dXJuIGRlZmF1bHRGZW5jZSh0b2tlbnMsIGlkeCwgb3B0aW9ucywgZW52LCBzZWxmKTtcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgICBcbiAgICAgIHZpdGVwcmVzc1BsdWdpbkxlZ2VuZChtZCwge1xuICAgICAgICBtYXJrbWFwOiB7IHNob3dUb29sYmFyOiB0cnVlIH0sIC8vIFx1NjYzRVx1NzkzQVx1ODExMVx1NTZGRVx1NURFNVx1NTE3N1x1NjgwRlxuICAgICAgICBtZXJtYWlkOiB7fSAvLyBcdTU0MkZcdTc1MjggTWVybWFpZFx1RkYwOFx1NEY3Rlx1NzUyOFx1OUVEOFx1OEJBNFx1OTE0RFx1N0Y2RVx1RkYwOVxuICAgICAgfSk7XG5cbiAgICAgIG1kLnVzZShncm91cEljb25NZFBsdWdpbikgLy9cdTRFRTNcdTc4MDFcdTdFQzRcdTU2RkVcdTY4MDdcbiAgICAgIG1kLnVzZShtYXJrZG93bkl0VGFza0NoZWNrYm94KSAvL3RvZG9cbiAgICAgIG1kLnVzZShNZXJtYWlkTWFya2Rvd24pOyBcblxuICAgIH1cblxuICB9LFxuXG4gIHZpdGU6IHtcbiAgICBwbHVnaW5zOiBbXG4gICAgICBncm91cEljb25WaXRlUGx1Z2luKHtcbiAgICAgICAgY3VzdG9tSWNvbjoge1xuICAgICAgICAgIHRzOiBsb2NhbEljb25Mb2FkZXIoaW1wb3J0Lm1ldGEudXJsLCAnLi4vcHVibGljL3N2Zy90eXBlc2NyaXB0LnN2ZycpLCAvL1x1NjcyQ1x1NTczMHRzXHU1NkZFXHU2ODA3XHU1QkZDXHU1MTY1XG4gICAgICAgICAgbWQ6IGxvY2FsSWNvbkxvYWRlcihpbXBvcnQubWV0YS51cmwsICcuLi9wdWJsaWMvc3ZnL21kLnN2ZycpLCAvL21hcmtkb3duXHU1NkZFXHU2ODA3XG4gICAgICAgICAgY3NzOiBsb2NhbEljb25Mb2FkZXIoaW1wb3J0Lm1ldGEudXJsLCAnLi4vcHVibGljL3N2Zy9jc3Muc3ZnJyksIC8vY3NzXHU1NkZFXHU2ODA3XG4gICAgICAgICAganM6ICdsb2dvczpqYXZhc2NyaXB0JywgLy9qc1x1NTZGRVx1NjgwN1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgICBbTWVybWFpZFBsdWdpbigpXVxuICAgIF1hcyBhbnksXG4gICAgb3B0aW1pemVEZXBzOiB7XG4gICAgICBpbmNsdWRlOiBbJ21lcm1haWQnXSxcbiAgICB9LFxuICAgIHNzcjoge1xuICAgICAgbm9FeHRlcm5hbDogWydtZXJtYWlkJ10sXG4gICAgfSxcbiAgfSxcblxuICBsYXN0VXBkYXRlZDogdHJ1ZSwgLy9cdTZCNjRcdTkxNERcdTdGNkVcdTRFMERcdTRGMUFcdTdBQ0JcdTUzNzNcdTc1MUZcdTY1NDhcdUZGMENcdTk3MDBnaXRcdTYzRDBcdTRFQTRcdTU0MEVcdTcyMkNcdTUzRDZcdTY1RjZcdTk1RjRcdTYyMzNcdUZGMENcdTZDQTFcdTY3MDlcdTVCODlcdTg4QzVnaXRcdTY3MkNcdTU3MzBcdTYyQTVcdTk1MTlcdTUzRUZcdTRFRTVcdTUxNDhcdTZDRThcdTkxQ0FcblxuICAvL1x1NEUzQlx1OTg5OFx1OTE0RFx1N0Y2RVxuICB0aGVtZUNvbmZpZzoge1xuICAgIC8vXHU1REU2XHU0RTBBXHU4OUQybG9nb1xuICAgIGxvZ286ICdodHRwczovL2FwaS5taW5pby4xeW8uY2MvbmVidWx1eGUvaGFsb3NwYXJrcGl4LzE3NTk2NDU2MDkyMTcud2VicCcsXG4gICAgLy9sb2dvOiAnaHR0cHM6Ly92aXRlanMuY24vdml0ZTMtY24vbG9nby13aXRoLXNoYWRvdy5wbmcnLCAvL1x1OEZEQ1x1N0EwQlx1NUYxNVx1NzUyOFxuICAgIC8vc2l0ZVRpdGxlOiBmYWxzZSwgLy9cdTY4MDdcdTk4OThcdTk2OTBcdTg1Q0ZcblxuICAgIC8vXHU4QkJFXHU3RjZFXHU3QUQ5XHU3MEI5XHU2ODA3XHU5ODk4IFx1NEYxQVx1ODk4Nlx1NzZENnRpdGxlXG4gICAgLy9zaXRlVGl0bGU6ICdIZWxsbyBXb3JsZCcsXG5cbiAgICAvL1x1N0YxNlx1OEY5MVx1NjcyQ1x1OTg3NVxuICAgIGVkaXRMaW5rOiB7XG4gICAgICBwYXR0ZXJuOiAnaHR0cHM6Ly9naXRodWIuY29tL1lpb3Yvdml0ZXByZXNzLWRvYy9lZGl0L21haW4vZG9jcy86cGF0aCcsIC8vIFx1NjUzOVx1NjIxMFx1ODFFQVx1NURGMVx1NzY4NFx1NEVEM1x1NUU5M1xuICAgICAgdGV4dDogJ1x1NTcyOEdpdEh1Ylx1N0YxNlx1OEY5MVx1NjcyQ1x1OTg3NSdcbiAgICB9LFxuXG4gICAgLy9cdTRFMEFcdTZCMjFcdTY2RjRcdTY1QjBcdTY1RjZcdTk1RjRcbiAgICBsYXN0VXBkYXRlZDoge1xuICAgICAgdGV4dDogJ1x1NEUwQVx1NkIyMVx1NjZGNFx1NjVCMFx1NjVGNlx1OTVGNCcsXG4gICAgICBmb3JtYXRPcHRpb25zOiB7XG4gICAgICAgIGRhdGVTdHlsZTogJ3Nob3J0JywgLy8gXHU1M0VGXHU5MDA5XHU1MDNDZnVsbFx1MzAwMWxvbmdcdTMwMDFtZWRpdW1cdTMwMDFzaG9ydFxuICAgICAgICB0aW1lU3R5bGU6ICdtZWRpdW0nIC8vIFx1NTNFRlx1OTAwOVx1NTAzQ2Z1bGxcdTMwMDFsb25nXHUzMDAxbWVkaXVtXHUzMDAxc2hvcnRcbiAgICAgIH0sXG4gICAgfSxcblxuICAgIC8vXHU1QkZDXHU4MjJBXHU2ODBGXG4gICAgbmF2OiBbXG4gICAgICB7IHRleHQ6ICdcdTk5OTZcdTk4NzUnLCBsaW5rOiAnLycgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1x1RDgzRFx1REQyNyBcdTdFQUZcdTVGMDBcdTUzRDFcdTU0MTEnLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1RENCRSBcdTU0MEVcdTdBRUYnLCBsaW5rOiAnL2JhY2tlbmQvJyB9LFxuICAgICAgICAgIHsgdGV4dDogJ1x1RDgzRFx1REU4MCBcdThGRDBcdTdFRjQnLCBsaW5rOiAnL2Rldm9wcy8nIH0sXG4gICAgICAgICAgeyB0ZXh0OiAnXHVEODNDXHVERkE4IFx1NTI0RFx1N0FFRicsIGxpbms6ICcvZnJvbnRlbmQvJyB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGV4dDogJ1x1RDgzRFx1RENENiBcdTUxNzNcdTRFOEVcdTY3MkNcdTdBRDknLFxuICAgICAgICBpdGVtczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIFx1NTIwNlx1N0VDNFx1NjgwN1x1OTg5ODFcbiAgICAgICAgICAgIHRleHQ6ICdcdUQ4M0RcdURDREEgXHU2MzA3XHU1MzU3JyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTI0RFx1OEEwMCcsIGxpbms6ICcvcHJlZmFjZScgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAvLyBcdTUyMDZcdTdFQzRcdTY4MDdcdTk4OTgyXG4gICAgICAgICAgICB0ZXh0OiAnXHU1N0ZBXHU3ODQwXHU4QkJFXHU3RjZFJyxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NUZFQlx1OTAxRlx1NEUwQVx1NjI0QicsIGxpbms6ICcvZ2V0dGluZy1zdGFydGVkJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTkxNERcdTdGNkUnLCBsaW5rOiAnL2NvbmZpZ3VyYXRpb24nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1OTg3NVx1OTc2MicsIGxpbms6ICcvcGFnZScgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnRnJvbnRtYXR0ZXInLCBsaW5rOiAnL2Zyb250bWF0dGVyJyB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC8vIFx1NTIwNlx1N0VDNFx1NjgwN1x1OTg5ODNcbiAgICAgICAgICAgIHRleHQ6ICdcdThGREJcdTk2MzZcdTczQTlcdTZDRDUnLFxuICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnTWFya2Rvd24nLCBsaW5rOiAnL21hcmtkb3duJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTU2RTJcdTk2MUYnLCBsaW5rOiAnL3RlYW0nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTkxQVx1OEJFRFx1OEEwMCcsIGxpbms6ICcvbXVsdGktbGFuZ3VhZ2UnIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ0RvY1NlYXJjaCcsIGxpbms6ICcvZG9jc2VhcmNoJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTk3NTlcdTYwMDFcdTkwRThcdTdGNzInLCBsaW5rOiAnL2Fzc2V0cycgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2ODM3XHU1RjBGXHU3RjhFXHU1MzE2JywgbGluazogJy9zdHlsZScgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU3RUM0XHU0RUY2JywgbGluazogJy9jb21wb25lbnRzJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTVFMDNcdTVDNDBcdTYzRDJcdTY5RkQnLCBsaW5rOiAnL2xheW91dCcgfSxcbiAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2M0QyXHU0RUY2JywgbGluazogJy9wbHVnaW4nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NjZGNFx1NjVCMFx1NTNDQVx1NTM3OFx1OEY3RCcsIGxpbms6ICcvdXBkYXRlJyB9LFxuICAgICAgICAgICAgICB7IHRleHQ6ICdcdTY0MkRcdTVFRkFcdTVCRkNcdTgyMkEnLCBsaW5rOiAnL25hdi8nIH0sXG4gICAgICAgICAgICAgIHsgdGV4dDogJ1x1NkMzOFx1NEU0NVx1OTRGRVx1NjNBNScsIGxpbms6ICcvcGVybWFsaW5rLycgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICB7IHRleHQ6IGBWaXRlUHJlc3MgJHtkZXZEZXBlbmRlbmNpZXMudml0ZXByZXNzLnJlcGxhY2UoJ14nLCAnJyl9YCwgbGluazogJ2h0dHBzOi8vdml0ZXByZXNzLmRldi96aC8nIH0sXG4gICAgICB7IHRleHQ6ICdcdTY2RjRcdTY1QjBcdTY1RTVcdTVGRDcnLCBsaW5rOiAnL2NoYW5nZWxvZycgfSxcbiAgICBdLFxuXG5cbiAgICAvL1x1NEZBN1x1OEZCOVx1NjgwRiAtIFx1ODFFQVx1NTJBOFx1NzUxRlx1NjIxMFx1OTE0RFx1N0Y2RVxuICAgIHNpZGViYXI6IGdlbmVyYXRlU2lkZWJhcihbXG4gICAgICB7XG4gICAgICAgIGRvY3VtZW50Um9vdFBhdGg6ICcvZG9jcycsXG4gICAgICAgIHNjYW5TdGFydFBhdGg6ICdiYWNrZW5kJyxcbiAgICAgICAgcmVzb2x2ZVBhdGg6ICcvYmFja2VuZC8nLFxuICAgICAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICAgICAgdXNlVGl0bGVGcm9tRnJvbnRtYXR0ZXI6IHRydWUsXG4gICAgICAgIGh5cGhlblRvU3BhY2U6IHRydWUsXG4gICAgICAgIHVuZGVyc2NvcmVUb1NwYWNlOiB0cnVlLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGNvbGxhcHNlRGVwdGg6IDIsXG4gICAgICAgIHNvcnRNZW51c0J5RnJvbnRtYXR0ZXJPcmRlcjogdHJ1ZSxcbiAgICAgICAgLy8gXHU1M0JCXHU5NjY0XHU2NTcwXHU1QjU3XHU1MjREXHU3RjAwXHVGRjA4XHU1OTgyIDAxLmNwcCBcdTIxOTIgY3BwXHVGRjA5XG4gICAgICAgIHJlbW92ZVByZWZpeEFmdGVyT3JkZXJpbmc6IHRydWUsXG4gICAgICAgIHByZWZpeFNlcGFyYXRvcjogJy4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZG9jdW1lbnRSb290UGF0aDogJy9kb2NzJyxcbiAgICAgICAgc2NhblN0YXJ0UGF0aDogJ2Rldm9wcycsXG4gICAgICAgIHJlc29sdmVQYXRoOiAnL2Rldm9wcy8nLFxuICAgICAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICAgICAgdXNlVGl0bGVGcm9tRnJvbnRtYXR0ZXI6IHRydWUsXG4gICAgICAgIGh5cGhlblRvU3BhY2U6IHRydWUsXG4gICAgICAgIHVuZGVyc2NvcmVUb1NwYWNlOiB0cnVlLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGNvbGxhcHNlRGVwdGg6IDIsXG4gICAgICAgIHNvcnRNZW51c0J5RnJvbnRtYXR0ZXJPcmRlcjogdHJ1ZSxcbiAgICAgICAgLy8gXHU1M0JCXHU5NjY0XHU2NTcwXHU1QjU3XHU1MjREXHU3RjAwXG4gICAgICAgIHJlbW92ZVByZWZpeEFmdGVyT3JkZXJpbmc6IHRydWUsXG4gICAgICAgIHByZWZpeFNlcGFyYXRvcjogJy4nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgZG9jdW1lbnRSb290UGF0aDogJy9kb2NzJyxcbiAgICAgICAgc2NhblN0YXJ0UGF0aDogJ2Zyb250ZW5kJyxcbiAgICAgICAgcmVzb2x2ZVBhdGg6ICcvZnJvbnRlbmQvJyxcbiAgICAgICAgdXNlVGl0bGVGcm9tRmlsZUhlYWRpbmc6IHRydWUsXG4gICAgICAgIHVzZVRpdGxlRnJvbUZyb250bWF0dGVyOiB0cnVlLFxuICAgICAgICBoeXBoZW5Ub1NwYWNlOiB0cnVlLFxuICAgICAgICB1bmRlcnNjb3JlVG9TcGFjZTogdHJ1ZSxcbiAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICBjb2xsYXBzZURlcHRoOiAyLFxuICAgICAgICBzb3J0TWVudXNCeUZyb250bWF0dGVyT3JkZXI6IHRydWUsXG4gICAgICAgIC8vIFx1NTNCQlx1OTY2NFx1NjU3MFx1NUI1N1x1NTI0RFx1N0YwMFxuICAgICAgICByZW1vdmVQcmVmaXhBZnRlck9yZGVyaW5nOiB0cnVlLFxuICAgICAgICBwcmVmaXhTZXBhcmF0b3I6ICcuJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC8vIFx1OUVEOFx1OEJBNFx1NEZBN1x1OEZCOVx1NjgwRlx1RkYwOFx1NjMwN1x1NTM1N1x1N0I0OVx1OTg3NVx1OTc2Mlx1RkYwOVxuICAgICAgICBkb2N1bWVudFJvb3RQYXRoOiAnL2RvY3MnLFxuICAgICAgICBzY2FuU3RhcnRQYXRoOiBudWxsLFxuICAgICAgICByZXNvbHZlUGF0aDogJy8nLFxuICAgICAgICB1c2VUaXRsZUZyb21GaWxlSGVhZGluZzogdHJ1ZSxcbiAgICAgICAgdXNlVGl0bGVGcm9tRnJvbnRtYXR0ZXI6IHRydWUsXG4gICAgICAgIGh5cGhlblRvU3BhY2U6IHRydWUsXG4gICAgICAgIHVuZGVyc2NvcmVUb1NwYWNlOiB0cnVlLFxuICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgIGNvbGxhcHNlRGVwdGg6IDIsXG4gICAgICAgIGV4Y2x1ZGVGb2xkZXJzOiBbJ2JhY2tlbmQnLCAnZGV2b3BzJywgJ2Zyb250ZW5kJywgJ3B1YmxpYycsICdub2RlX21vZHVsZXMnLCAnLnZpdGVwcmVzcyddLFxuICAgICAgICBzb3J0TWVudXNCeUZyb250bWF0dGVyT3JkZXI6IHRydWUsXG4gICAgICAgIC8vIFx1NTNCQlx1OTY2NFx1NjU3MFx1NUI1N1x1NTI0RFx1N0YwMFxuICAgICAgICByZW1vdmVQcmVmaXhBZnRlck9yZGVyaW5nOiB0cnVlLFxuICAgICAgICBwcmVmaXhTZXBhcmF0b3I6ICcuJyxcbiAgICAgIH1cbiAgICBdKSxcbiAgICBcbiAgICAvKiBcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XG4gICAgXHU2NUU3XHU3Njg0XHU2MjRCXHU1MkE4XHU5MTREXHU3RjZFXHU1REYyXHU4OEFCXHU4MUVBXHU1MkE4XHU3NTFGXHU2MjEwXHU2NkZGXHU0RUUzXHVGRjBDXHU0RkREXHU3NTU5XHU1OTA3XHU0RUZEXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxuICAgIHNpZGViYXJfbWFudWFsOiB7XG4gICAgICAvLyBcdTU0MEVcdTdBRUZcdTVGMDBcdTUzRDFcdTRGQTdcdThGQjlcdTY4MEZcbiAgICAgICcvYmFja2VuZC8nOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHVEODNEXHVEQ0JFIFx1NTQwRVx1N0FFRlx1NUYwMFx1NTNEMScsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1Njk4Mlx1OEZGMCcsIGxpbms6ICcvYmFja2VuZC8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDKysnLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnQysrIFx1N0I4MFx1NEVDQicsIGxpbms6ICcvYmFja2VuZC9jcHAvaW50cm8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdQeXRob24nLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnUHl0aG9uIFx1N0I4MFx1NEVDQicsIGxpbms6ICcvYmFja2VuZC9weXRob24vaW50cm8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdKYXZhJyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ0phdmEgXHU1N0ZBXHU3ODQwJywgbGluazogJy9iYWNrZW5kL2phdmEvaW50cm8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdHbycsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdHbyBcdTUxNjVcdTk1RTgnLCBsaW5rOiAnL2JhY2tlbmQvZ28vaW50cm8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG5cbiAgICAgIC8vIFx1OEZEMFx1N0VGNFx1NEZBN1x1OEZCOVx1NjgwRlxuICAgICAgJy9kZXZvcHMvJzogW1xuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1RDgzRFx1REU4MCBcdThGRDBcdTdFRjQnLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTY5ODJcdThGRjAnLCBsaW5rOiAnL2Rldm9wcy8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTY1NzBcdTYzNkVcdTVFOTMnLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnXHU2NTcwXHU2MzZFXHU1RTkzXHU2OTgyXHU4RkYwJywgbGluazogJy9kZXZvcHMvZGF0YWJhc2UvJyB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnTXlTUUwnLFxuICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnTXlTUUwgXHU2OTgyXHU4RkYwJywgbGluazogJy9kZXZvcHMvZGF0YWJhc2UvbXlzcWwvJyB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTVCODlcdTg4QzVcdTkwRThcdTdGNzInLFxuICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnV2luZG93cyBcdTVCODlcdTg4QzUnLCBsaW5rOiAnL2Rldm9wcy9kYXRhYmFzZS9teXNxbC9pbnN0YWxsL3dpbmRvd3MnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0xpbnV4IFx1NUI4OVx1ODhDNScsIGxpbms6ICcvZGV2b3BzL2RhdGFiYXNlL215c3FsL2luc3RhbGwvbGludXgnIH0sXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ0RvY2tlciBcdTVCODlcdTg4QzUnLCBsaW5rOiAnL2Rldm9wcy9kYXRhYmFzZS9teXNxbC9pbnN0YWxsL2RvY2tlcicgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU5MTREXHU3RjZFXHU3QkExXHU3NDA2JyxcbiAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1NTdGQVx1Nzg0MFx1OTE0RFx1N0Y2RScsIGxpbms6ICcvZGV2b3BzL2RhdGFiYXNlL215c3FsL2NvbmZpZy9iYXNpYycgfSxcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU2MDI3XHU4MEZEXHU5MTREXHU3RjZFJywgbGluazogJy9kZXZvcHMvZGF0YWJhc2UvbXlzcWwvY29uZmlnL3BlcmZvcm1hbmNlJyB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHRleHQ6ICdcdTRGN0ZcdTc1MjhcdTY1NTlcdTdBMEInLFxuICAgICAgICAgICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICAgICAgeyB0ZXh0OiAnXHU1N0ZBXHU3ODQwIFNRTCcsIGxpbms6ICcvZGV2b3BzL2RhdGFiYXNlL215c3FsL3VzYWdlL2Jhc2ljLXNxbCcgfSxcbiAgICAgICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICB0ZXh0OiAnXHU2MDI3XHU4MEZEXHU0RjE4XHU1MzE2JyxcbiAgICAgICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgICAgIHsgdGV4dDogJ1x1N0QyMlx1NUYxNVx1NEYxOFx1NTMxNicsIGxpbms6ICcvZGV2b3BzL2RhdGFiYXNlL215c3FsL29wdGltaXplL2luZGV4LW9wdGltaXplJyB9LFxuICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGV4dDogJ09yYWNsZScsXG4gICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdPcmFjbGUgXHU1Qjg5XHU4OEM1JywgbGluazogJy9kZXZvcHMvZGF0YWJhc2Uvb3JhY2xlL2luc3RhbGwnIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnTW9uZ29EQicsXG4gICAgICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgICAgICB7IHRleHQ6ICdNb25nb0RCIFx1NTE2NVx1OTVFOCcsIGxpbms6ICcvZGV2b3BzL2RhdGFiYXNlL21vbmdvZGIvaW50cm8nIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0ZXh0OiAnUmVkaXMnLFxuICAgICAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgICAgeyB0ZXh0OiAnUmVkaXMgXHU1MTY1XHU5NUU4JywgbGluazogJy9kZXZvcHMvZGF0YWJhc2UvcmVkaXMvaW50cm8nIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTGludXgnLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnTGludXggXHU3QjgwXHU0RUNCJywgbGluazogJy9kZXZvcHMvbGludXgvaW50cm8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdEb2NrZXInLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnRG9ja2VyIFx1NTE2NVx1OTVFOCcsIGxpbms6ICcvZGV2b3BzL2RvY2tlci9pbnRybycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ0t1YmVybmV0ZXMnLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnSzhzIFx1NTE2NVx1OTVFOCcsIGxpbms6ICcvZGV2b3BzL2t1YmVybmV0ZXMvaW50cm8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG5cbiAgICAgIC8vIFx1NTI0RFx1N0FFRlx1NUYwMFx1NTNEMVx1NEZBN1x1OEZCOVx1NjgwRlxuICAgICAgJy9mcm9udGVuZC8nOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHVEODNDXHVERkE4IFx1NTI0RFx1N0FFRlx1NUYwMFx1NTNEMScsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1Njk4Mlx1OEZGMCcsIGxpbms6ICcvZnJvbnRlbmQvJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnVnVlJyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ1Z1ZSBcdTU3RkFcdTc4NDAnLCBsaW5rOiAnL2Zyb250ZW5kL3Z1ZS9pbnRybycgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1JlYWN0JyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ1JlYWN0IFx1NTdGQVx1Nzg0MCcsIGxpbms6ICcvZnJvbnRlbmQvcmVhY3QvaW50cm8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdDU1MnLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnQ1NTIFx1NTdGQVx1Nzg0MCcsIGxpbms6ICcvZnJvbnRlbmQvY3NzL2ludHJvJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnSmF2YVNjcmlwdCcsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdKUyBcdTU3RkFcdTc4NDAnLCBsaW5rOiAnL2Zyb250ZW5kL2phdmFzY3JpcHQvaW50cm8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG5cbiAgICAgIC8vIFx1OUVEOFx1OEJBNFx1NEZBN1x1OEZCOVx1NjgwRlx1RkYwOFx1NzUyOFx1NEU4RVx1NjMwN1x1NTM1N1x1N0I0OVx1OTg3NVx1OTc2Mlx1RkYwOVxuICAgICAgJy8nOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnXHU0RUNCXHU3RUNEJyxcbiAgICAgICAgICBjb2xsYXBzZWQ6IHRydWUsXG4gICAgICAgICAgaXRlbXM6IFtcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1NTI0RFx1OEEwMCcsIGxpbms6ICcvcHJlZmFjZScgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1NTdGQVx1Nzg0MFx1OTE0RFx1N0Y2RScsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTVGRUJcdTkwMUZcdTRFMEFcdTYyNEInLCBsaW5rOiAnL2dldHRpbmctc3RhcnRlZCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1OTE0RFx1N0Y2RScsIGxpbms6ICcvY29uZmlndXJhdGlvbicgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1OTg3NVx1OTc2MicsIGxpbms6ICcvcGFnZScgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ0Zyb250bWF0dGVyJywgbGluazogJy9mcm9udG1hdHRlcicgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJ1x1OEZEQlx1OTYzNlx1NzNBOVx1NkNENScsXG4gICAgICAgICAgY29sbGFwc2VkOiB0cnVlLFxuICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICB7IHRleHQ6ICdNYXJrZG93bicsIGxpbms6ICcvbWFya2Rvd24nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTU2RTJcdTk2MUYnLCBsaW5rOiAnL3RlYW0nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTU5MUFcdThCRURcdThBMDAnLCBsaW5rOiAnL211bHRpLWxhbmd1YWdlJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnRG9jU2VhcmNoJywgbGluazogJy9kb2NzZWFyY2gnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTk3NTlcdTYwMDFcdTkwRThcdTdGNzInLCBsaW5rOiAnL2Fzc2V0cycgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1NjgzN1x1NUYwRlx1N0Y4RVx1NTMxNicsIGxpbms6ICcvc3R5bGUnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTdFQzRcdTRFRjYnLCBsaW5rOiAnL2NvbXBvbmVudHMnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTVFMDNcdTVDNDBcdTYzRDJcdTY5RkQnLCBsaW5rOiAnL2xheW91dCcgfSxcbiAgICAgICAgICAgIHsgdGV4dDogJ1x1NjNEMlx1NEVGNicsIGxpbms6ICcvcGx1Z2luJyB9LFxuICAgICAgICAgICAgeyB0ZXh0OiAnXHU2NkY0XHU2NUIwXHU1M0NBXHU1Mzc4XHU4RjdEJywgbGluazogJy91cGRhdGUnIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTY0MkRcdTVFRkFcdTVCRkNcdTgyMkEnLCBsaW5rOiAnL25hdi8nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTZDMzhcdTRFNDVcdTk0RkVcdTYzQTUnLCBsaW5rOiAnL3Blcm1hbGluay8nIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdcdTUxNzZcdTRFRDZcdTdBRDlcdTcwQjknLFxuICAgICAgICAgIGNvbGxhcHNlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtczogW1xuICAgICAgICAgICAgeyB0ZXh0OiAnVnVlUHJlc3MnLCBsaW5rOiAnaHR0cHM6Ly92dWVwcmVzcy55aW92LnRvcC8nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTUyOURcdTVCNjZcdTVGNTVcdTY1NTlcdTdBMEInLCBsaW5rOiAnaHR0cHM6Ly95aW92LnRvcC8nIH0sXG4gICAgICAgICAgICB7IHRleHQ6ICdcdTRFMkFcdTRFQkFcdTRFM0JcdTk4NzUnLCBsaW5rOiAnaHR0cHM6Ly95aW5neWF5aS5jb20vJyB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH0sXG4gICAgKi9cblxuXG5cbiAgICAvL0FsZ29saWFcdTY0MUNcdTdEMjJcbiAgICBzZWFyY2g6IHtcbiAgICAgIHByb3ZpZGVyOiAnYWxnb2xpYScsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIGFwcElkOiAnUVZLUUk2MkwxNScsXG4gICAgICAgIGFwaUtleTogJ2JlZjg3ODNkZGU1NzI5M2NlMDgyYzUzMWFhN2M3ZTBjJyxcbiAgICAgICAgaW5kZXhOYW1lOiAnZG9jJyxcbiAgICAgICAgbG9jYWxlczoge1xuICAgICAgICAgIHJvb3Q6IHtcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgIHRyYW5zbGF0aW9uczoge1xuICAgICAgICAgICAgICBidXR0b246IHtcbiAgICAgICAgICAgICAgICBidXR0b25UZXh0OiAnXHU2NDFDXHU3RDIyXHU2NTg3XHU2ODYzJyxcbiAgICAgICAgICAgICAgICBidXR0b25BcmlhTGFiZWw6ICdcdTY0MUNcdTdEMjJcdTY1ODdcdTY4NjMnXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG1vZGFsOiB7XG4gICAgICAgICAgICAgICAgc2VhcmNoQm94OiB7XG4gICAgICAgICAgICAgICAgICByZXNldEJ1dHRvblRpdGxlOiAnXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2JyxcbiAgICAgICAgICAgICAgICAgIHJlc2V0QnV0dG9uQXJpYUxhYmVsOiAnXHU2RTA1XHU5NjY0XHU2N0U1XHU4QkUyXHU2NzYxXHU0RUY2JyxcbiAgICAgICAgICAgICAgICAgIGNhbmNlbEJ1dHRvblRleHQ6ICdcdTUzRDZcdTZEODgnLFxuICAgICAgICAgICAgICAgICAgY2FuY2VsQnV0dG9uQXJpYUxhYmVsOiAnXHU1M0Q2XHU2RDg4J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgc3RhcnRTY3JlZW46IHtcbiAgICAgICAgICAgICAgICAgIHJlY2VudFNlYXJjaGVzVGl0bGU6ICdcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICAgICAgICAgICAgbm9SZWNlbnRTZWFyY2hlc1RleHQ6ICdcdTZDQTFcdTY3MDlcdTY0MUNcdTdEMjJcdTUzODZcdTUzRjInLFxuICAgICAgICAgICAgICAgICAgc2F2ZVJlY2VudFNlYXJjaEJ1dHRvblRpdGxlOiAnXHU0RkREXHU1QjU4XHU4MUYzXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyJyxcbiAgICAgICAgICAgICAgICAgIHJlbW92ZVJlY2VudFNlYXJjaEJ1dHRvblRpdGxlOiAnXHU0RUNFXHU2NDFDXHU3RDIyXHU1Mzg2XHU1M0YyXHU0RTJEXHU3OUZCXHU5NjY0JyxcbiAgICAgICAgICAgICAgICAgIGZhdm9yaXRlU2VhcmNoZXNUaXRsZTogJ1x1NjUzNlx1ODVDRicsXG4gICAgICAgICAgICAgICAgICByZW1vdmVGYXZvcml0ZVNlYXJjaEJ1dHRvblRpdGxlOiAnXHU0RUNFXHU2NTM2XHU4NUNGXHU0RTJEXHU3OUZCXHU5NjY0J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZXJyb3JTY3JlZW46IHtcbiAgICAgICAgICAgICAgICAgIHRpdGxlVGV4dDogJ1x1NjVFMFx1NkNENVx1ODNCN1x1NTNENlx1N0VEM1x1Njc5QycsXG4gICAgICAgICAgICAgICAgICBoZWxwVGV4dDogJ1x1NEY2MFx1NTNFRlx1ODBGRFx1OTcwMFx1ODk4MVx1NjhDMFx1NjdFNVx1NEY2MFx1NzY4NFx1N0Y1MVx1N0VEQ1x1OEZERVx1NjNBNSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgc2VsZWN0VGV4dDogJ1x1OTAwOVx1NjJFOScsXG4gICAgICAgICAgICAgICAgICBuYXZpZ2F0ZVRleHQ6ICdcdTUyMDdcdTYzNjInLFxuICAgICAgICAgICAgICAgICAgY2xvc2VUZXh0OiAnXHU1MTczXHU5NUVEJyxcbiAgICAgICAgICAgICAgICAgIHNlYXJjaEJ5VGV4dDogJ1x1NjQxQ1x1N0QyMlx1NjNEMFx1NEY5Qlx1ODAwNSdcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG5vUmVzdWx0c1NjcmVlbjoge1xuICAgICAgICAgICAgICAgICAgbm9SZXN1bHRzVGV4dDogJ1x1NjVFMFx1NkNENVx1NjI3RVx1NTIzMFx1NzZGOFx1NTE3M1x1N0VEM1x1Njc5QycsXG4gICAgICAgICAgICAgICAgICBzdWdnZXN0ZWRRdWVyeVRleHQ6ICdcdTRGNjBcdTUzRUZcdTRFRTVcdTVDMURcdThCRDVcdTY3RTVcdThCRTInLFxuICAgICAgICAgICAgICAgICAgcmVwb3J0TWlzc2luZ1Jlc3VsdHNUZXh0OiAnXHU0RjYwXHU4QkE0XHU0RTNBXHU4QkU1XHU2N0U1XHU4QkUyXHU1RTk0XHU4QkU1XHU2NzA5XHU3RUQzXHU2NzlDXHVGRjFGJyxcbiAgICAgICAgICAgICAgICAgIHJlcG9ydE1pc3NpbmdSZXN1bHRzTGlua1RleHQ6ICdcdTcwQjlcdTUxRkJcdTUzQ0RcdTk5ODgnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcblxuXG5cbiAgICAvL1x1NzkzRVx1NEVBNFx1OTRGRVx1NjNBNVxuICAgIHNvY2lhbExpbmtzOiBbXG4gICAgICB7IGljb246ICdnaXRodWInLCBsaW5rOiAnaHR0cHM6Ly9naXRodWIuY29tL1lpb3Yvdml0ZXByZXNzLWRvYycgfSxcbiAgICAgIHsgaWNvbjogJ3R3aXR0ZXInLCBsaW5rOiAnaHR0cHM6Ly90d2l0dGVyLmNvbS8nIH0sXG4gICAgICB7IGljb246ICdkaXNjb3JkJywgbGluazogJ2h0dHBzOi8vY2hhdC52aXRlanMuZGV2LycgfSxcbiAgICAgIHtcbiAgICAgICAgaWNvbjoge1xuICAgICAgICAgIHN2ZzogJzxzdmcgdD1cIjE3MDM0ODM1NDI4NzJcIiBjbGFzcz1cImljb25cIiB2aWV3Qm94PVwiMCAwIDEzMDkgMTAyNFwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgcC1pZD1cIjYyNzRcIiB3aWR0aD1cIjIwMFwiIGhlaWdodD1cIjIwMFwiPjxwYXRoIGQ9XCJNMTE0Ny4yNjg5NiA5MTIuNjgxNDE3bDM0LjkwMTY1IDExMS4zMTg1ODMtMTI3LjE2NTExMS02Ni44MjM4OTFhNjA0Ljc4NzMxMyA2MDQuNzg3MzEzIDAgMCAxLTEzOS4wODI3NDcgMjIuMjYzNzE3Yy0yMjAuNjA3MjM5IDAtMzk0LjI5Njk2OS0xNDQuNjE1OTM2LTM5NC4yOTY5NjktMzIyLjc1ODQwOXMxNzMuNTI2MDI2LTMyMi44ODkzNzIgMzk0LjI5Njk2OS0zMjIuODg5MzcyQzExMjQuMjE5NDY1IDMzMy42NjEwODIgMTMwOS42MzAzODggNDc4LjY2OTkwNyAxMzA5LjYzMDM4OCA2NTYuNTUwNDU0YzAgMTAwLjI4NDk0Ny02OS4zNDQ5MjkgMTg5LjE0MzM2OS0xNjIuMzYxNDI4IDI1Ni4xMzA5NjN6TTc4OC4wNzAwODYgNTExLjg2OTAzN2E0OS4xMTExNCA0OS4xMTExNCAwIDAgMC00Ni4zNjA5MTYgNDQuNDk0NjkyIDQ4Ljc4MzczMiA0OC43ODM3MzIgMCAwIDAgNDYuMzYwOTE2IDQ0LjQ5NDY5MyA1Mi4wOTA1NDkgNTIuMDkwNTQ5IDAgMCAwIDU3Ljk4Mzg4NS00NC40OTQ2OTMgNTIuMzg1MjE2IDUyLjM4NTIxNiAwIDAgMC01Ny45ODM4ODUtNDQuNDk0NjkyeiBtMjU0Ljk4NTAzNiAwYTQ4Ljg4MTk1NCA0OC44ODE5NTQgMCAwIDAtNDYuMDk4OTkgNDQuNDk0NjkyIDQ4LjYyMDAyOCA0OC42MjAwMjggMCAwIDAgNDYuMDk4OTkgNDQuNDk0NjkzIDUyLjM4NTIxNiA1Mi4zODUyMTYgMCAwIDAgNTcuOTgzODg2LTQ0LjQ5NDY5MyA1Mi41ODE2NiA1Mi41ODE2NiAwIDAgMC01Ny45NTExNDUtNDQuNDk0NjkyeiBtLTU1MC41Njg2MTUgMTUwLjAxODE2MWEzMTguNTY3NTkyIDMxOC41Njc1OTIgMCAwIDAgMTQuMzA3NzEyIDkzLjIxMjk0M2MtMTQuMzA3NzEyIDEuMDgwNDQ1LTI4Ljc0NjM4NyAxLjc2ODAwMS00My4yODMyODQgMS43NjgwMDFhODI3LjI5MzUxNiA4MjcuMjkzNTE2IDAgMCAxLTE2Mi4zOTQxNjgtMjIuMjk2NDU4bC0xNjIuMDAxMjc5IDc3Ljk1NTc0OSA0Ni4zMjgxNzUtMTMzLjgxMTQ4NUM2OS40MTA0MTEgNjAwLjg1ODQyMiAwIDUwMC41MDc5OTMgMCAzNzguMzg0OTYgMCAxNjYuNjgzMjA4IDIwOC42ODk2MDIgMCA0NjMuNTEwOTM1IDBjMjI3LjkwODQyOCAwIDQyNy41OTQzMjIgMTMzLjE4OTQxIDQ2Ny43MDE3NTIgMzEyLjM3OTU4OGE0MjcuNDYzMzU4IDQyNy40NjMzNTggMCAwIDAtNDQuNjI1NjU1LTIuNjE5MjYxYy0yMjAuMjQ3MDkgMC0zOTQuMTAwNTI0IDE1Ny43NDQ5OC0zOTQuMTAwNTI1IDM1Mi4xMjY4NzF6TTMxMi45MDM0NCAxODkuMTQzMzY5YTY0LjI3MDExMSA2NC4yNzAxMTEgMCAwIDAtNjkuODAzMjk5IDU1LjY1OTI5MSA2NC41MzIwMzcgNjQuNTMyMDM3IDAgMCAwIDY5LjgwMzI5OSA1NS42NTkyOTIgNTMuNjk0ODQ2IDUzLjY5NDg0NiAwIDAgMCA1Ny44NTI5MjMtNTUuNjU5MjkyIDUzLjQ2NTY2MSA1My40NjU2NjEgMCAwIDAtNTcuODUyOTIzLTU1LjY1OTI5MXogbTMyNC40MjgxODggMGE2NC4wNDA5MjYgNjQuMDQwOTI2IDAgMCAwLTY5LjU3NDExNCA1NS42NTkyOTEgNjQuMzAyODUyIDY0LjMwMjg1MiAwIDAgMCA2OS41NzQxMTQgNTUuNjU5MjkyIDUzLjY5NDg0NiA1My42OTQ4NDYgMCAwIDAgNTcuOTUxMTQ1LTU1LjY1OTI5MiA1My40NjU2NjEgNTMuNDY1NjYxIDAgMCAwLTU3Ljk1MTE0NS01NS42NTkyOTF6XCIgcC1pZD1cIjYyNzVcIj48L3BhdGg+PC9zdmc+J1xuICAgICAgICB9LFxuICAgICAgICBsaW5rOiAnaHR0cHM6Ly93ZWl4aW4ucXEuY29tLycsXG4gICAgICAgIC8vIFlvdSBjYW4gaW5jbHVkZSBhIGN1c3RvbSBsYWJlbCBmb3IgYWNjZXNzaWJpbGl0eSB0b28gKG9wdGlvbmFsIGJ1dCByZWNvbW1lbmRlZCk6XG4gICAgICAgIGFyaWFMYWJlbDogJ3dlY2hhdCdcbiAgICAgIH1cbiAgICBdLFxuXG4gICAgLy9cdTYyNEJcdTY3M0FcdTdBRUZcdTZERjFcdTZENDVcdTZBMjFcdTVGMEZcdTY1ODdcdTVCNTdcdTRGRUVcdTY1MzlcbiAgICBkYXJrTW9kZVN3aXRjaExhYmVsOiAnXHU2REYxXHU2RDQ1XHU2QTIxXHU1RjBGJyxcblxuXG5cblxuICAgIC8vXHU5ODc1XHU4MTFBXG4gICAgZm9vdGVyOiB7XG4gICAgICBtZXNzYWdlOiAnXHU2RDZBXHU2RjJCXHU1Qjg3XHU1Qjk5XHU2NUQ3XHU0RTBCXHU3N0U1XHU4QkM2XHU1RTkzXHU1MjA2XHU0RUFCXHU3QUQ5JyxcbiAgICAgIGNvcHlyaWdodDogYENvcHlyaWdodCBcdTAwQTkgMjAyMi0ke25ldyBEYXRlKCkuZ2V0RnVsbFllYXIoKX0gfCBQb3dlcmVkIGJ5IDxhIGhyZWY9XCJodHRwczovLzF5by5jY1wiIHRhcmdldD1cIl9ibGFua1wiPlx1NkQ2QVx1NkYyQlx1NUI4N1x1NUI5OTwvYT4gYCxcbiAgICB9LFxuXG5cbiAgICAvL1x1NEZBN1x1OEZCOVx1NjgwRlx1NjU4N1x1NUI1N1x1NjZGNFx1NjUzOShcdTc5RkJcdTUyQThcdTdBRUYpXG4gICAgc2lkZWJhck1lbnVMYWJlbDogJ1x1NjdFNVx1NzcwQlx1NTIwNlx1N0M3QicsXG5cbiAgICAvL1x1OEZENFx1NTZERVx1OTg3Nlx1OTBFOFx1NjU4N1x1NUI1N1x1NEZFRVx1NjUzOShcdTc5RkJcdTUyQThcdTdBRUYpXG4gICAgcmV0dXJuVG9Ub3BMYWJlbDogJ1x1OEZENFx1NTZERVx1OTg3Nlx1OTBFOCcsXG5cblxuICAgIC8vXHU1OTI3XHU3RUIyXHU2NjNFXHU3OTNBMi0zXHU3RUE3XHU2ODA3XHU5ODk4XG4gICAgb3V0bGluZToge1xuICAgICAgbGV2ZWw6IFsyLCAzXSxcbiAgICAgIGxhYmVsOiAnXHU2NzJDXHU5ODc1XHU1QkZDXHU4MjJBJ1xuICAgIH0sXG5cblxuICAgIC8vXHU4MUVBXHU1QjlBXHU0RTQ5XHU0RTBBXHU0RTBCXHU5ODc1XHU1NDBEXG4gICAgZG9jRm9vdGVyOiB7XG4gICAgICBwcmV2OiAnXHU0RTBBXHU0RTAwXHU5ODc1JyxcbiAgICAgIG5leHQ6ICdcdTRFMEJcdTRFMDBcdTk4NzUnLFxuICAgIH0sXG5cbiAgfSxcblxuXG5cbn0pIiwgIntcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQG1kaXQtdnVlL3NoYXJlZFwiOiBcIl4zLjAuMlwiLFxuICAgIFwiQHR5cGVzL2RvbS12aWV3LXRyYW5zaXRpb25zXCI6IFwiXjEuMC42XCIsXG4gICAgXCJAdHlwZXMvbm9kZVwiOiBcIl4yNC43LjFcIixcbiAgICBcImJ1c3VhbnppLnB1cmUuanNcIjogXCJeMS4wLjNcIixcbiAgICBcImNhbnZhcy1jb25mZXR0aVwiOiBcIl4xLjkuM1wiLFxuICAgIFwiZmFzdC1nbG9iXCI6IFwiXjMuMy4zXCIsXG4gICAgXCJncmF5LW1hdHRlclwiOiBcIl40LjAuM1wiLFxuICAgIFwibGVzc1wiOiBcIl40LjQuMlwiLFxuICAgIFwibWFya2Rvd24taXQtdGFzay1jaGVja2JveFwiOiBcIl4xLjAuNlwiLFxuICAgIFwibWVkaXVtLXpvb21cIjogXCJeMS4xLjBcIixcbiAgICBcIm1lcm1haWRcIjogXCJeMTEuMTIuMFwiLFxuICAgIFwibnByb2dyZXNzLXYyXCI6IFwiXjEuMS4xMFwiLFxuICAgIFwic2Fzc1wiOiBcIl4xLjkzLjJcIixcbiAgICBcInZpdGVwcmVzc1wiOiBcIl4xLjYuNFwiLFxuICAgIFwidml0ZXByZXNzLXBsdWdpbi1jb21tZW50LXdpdGgtZ2lzY3VzXCI6IFwiXjEuMS4xNVwiLFxuICAgIFwidml0ZXByZXNzLXBsdWdpbi1ncm91cC1pY29uc1wiOiBcIl4xLjYuM1wiLFxuICAgIFwidml0ZXByZXNzLXBsdWdpbi1tZXJtYWlkXCI6IFwiXjIuMC4xN1wiLFxuICAgIFwidml0ZXByZXNzLXNpZGViYXJcIjogXCJeMS4zMy4wXCIsXG4gICAgXCJ2dWVcIjogXCJeMy41LjIyXCIsXG4gICAgXCJ4Z3BsYXllclwiOiBcIl4zLjAuMjNcIlxuICB9LFxuICBcInBhY2thZ2VNYW5hZ2VyXCI6IFwicG5wbUA4LjYuMTArc2hhMS45OGZlMjc1NTA2MTAyNjc5OWJmYTMwZTdkYzhkNmQ0OGU5YzNlZGYwXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwiZG9jczpkZXZcIjogXCJ2aXRlcHJlc3MgZGV2IGRvY3NcIixcbiAgICBcImRvY3M6YnVpbGRcIjogXCJ2aXRlcHJlc3MgYnVpbGQgZG9jc1wiLFxuICAgIFwiZG9jczpwcmV2aWV3XCI6IFwidml0ZXByZXNzIHByZXZpZXcgZG9jc1wiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInZpdGVwcmVzcy1wbHVnaW4tbGVnZW5kXCI6IFwiXjEuMS4wXCJcbiAgfVxufSIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL3Jvb3QvZGF0YS9yZXBvL3ZpdGVwcmVzcy1kb2MvZG9jcy8udml0ZXByZXNzL3RoZW1lL3VudGlsc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Jvb3QvZGF0YS9yZXBvL3ZpdGVwcmVzcy1kb2MvZG9jcy8udml0ZXByZXNzL3RoZW1lL3VudGlscy9wZXJtYWxpbmsudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Jvb3QvZGF0YS9yZXBvL3ZpdGVwcmVzcy1kb2MvZG9jcy8udml0ZXByZXNzL3RoZW1lL3VudGlscy9wZXJtYWxpbmsudHNcIjsvLyBcdTVCRkNcdTUxNjVcdTVGQzVcdTg5ODFcdTc2ODRcdTVFOTNcbmltcG9ydCBtYXR0ZXIgZnJvbSAnZ3JheS1tYXR0ZXInOyAvLyBcdTc1MjhcdTRFOEVcdTg5RTNcdTY3OTBcdTU0OENcdTY0Q0RcdTRGNUNNYXJrZG93blx1NjU4N1x1NEVGNlx1NzY4NGZyb250bWF0dGVyXG5pbXBvcnQgZmcgZnJvbSAnZmFzdC1nbG9iJzsgICAgICAvLyBcdTVGRUJcdTkwMUZcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREZcdTUzMzlcdTkxNERcdTVFOTNcbmltcG9ydCBmcyBmcm9tICdmcy9wcm9taXNlcyc7ICAgIC8vIE5vZGUuanNcdTY1ODdcdTRFRjZcdTdDRkJcdTdFREZQcm9taXNlIEFQSVxuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7ICAgICAgICAgLy8gXHU4REVGXHU1Rjg0XHU1OTA0XHU3NDA2XHU1RTkzXG5cbi8qKlxuICogXHU3NTFGXHU2MjEwXHU2MzA3XHU1QjlBXHU5NTdGXHU1RUE2XHU3Njg0XHU5NjhGXHU2NzNBXHU1QjU3XHU3QjI2XHU0RTMyXG4gKiBAcGFyYW0ge251bWJlcn0gbGVuZ3RoIC0gXHU5NzAwXHU4OTgxXHU3NTFGXHU2MjEwXHU3Njg0XHU1QjU3XHU3QjI2XHU0RTMyXHU5NTdGXHU1RUE2XG4gKiBAcmV0dXJucyB7c3RyaW5nfSBcdTc1MzEwLTlcdTU0OENhLWZcdTdFQzRcdTYyMTBcdTc2ODRcdTk2OEZcdTY3M0FcdTVCNTdcdTdCMjZcdTRFMzJcbiAqL1xuZXhwb3J0IGNvbnN0IGdlbmVyYXRlU3RyaW5nID0gKGxlbmd0aDogbnVtYmVyKSA9PiB7XG4gIGNvbnN0IGNoYXJzZXQgPSAnMDEyMzQ1Njc4OWFiY2RlZic7IC8vIFx1NTNFRlx1NzUyOFx1NzY4NFx1NUI1N1x1N0IyNlx1OTZDNlxuICBsZXQgcmFuZG9tQ29kZSA9ICcnOyAvLyBcdTUyMURcdTU5Q0JcdTUzMTZcdTdFRDNcdTY3OUNcdTVCNTdcdTdCMjZcdTRFMzJcblxuICAvLyBcdTVGQUFcdTczQUZcdTc1MUZcdTYyMTBcdTYzMDdcdTVCOUFcdTk1N0ZcdTVFQTZcdTc2ODRcdTk2OEZcdTY3M0FcdTVCNTdcdTdCMjZcdTRFMzJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHJhbmRvbUluZGV4ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogY2hhcnNldC5sZW5ndGgpOyAvLyBcdTk2OEZcdTY3M0FcdTkwMDlcdTUzRDZcdTVCNTdcdTdCMjZcdTdEMjJcdTVGMTVcbiAgICByYW5kb21Db2RlICs9IGNoYXJzZXRbcmFuZG9tSW5kZXhdOyAvLyBcdTVDMDZcdTk2OEZcdTY3M0FcdTVCNTdcdTdCMjZcdTZERkJcdTUyQTBcdTUyMzBcdTdFRDNcdTY3OUNcdTRFMkRcbiAgfVxuXG4gIHJldHVybiByYW5kb21Db2RlO1xufTtcblxuLyoqXG4gKiBcdTRFQ0VNYXJrZG93blx1NTE4NVx1NUJCOVx1NEUyRFx1NjNEMFx1NTNENlx1NEUwMFx1N0VBN1x1NjgwN1x1OTg5OFxuICogQHBhcmFtIHtzdHJpbmd9IGNvbnRlbnQgLSBNYXJrZG93blx1NTE4NVx1NUJCOVxuICogQHJldHVybnMge3N0cmluZ30gXHU2M0QwXHU1M0Q2XHU3Njg0XHU2ODA3XHU5ODk4XHVGRjBDXHU1OTgyXHU2NzlDXHU2Q0ExXHU2NzA5XHU2MjdFXHU1MjMwXHU1MjE5XHU4RkQ0XHU1NkRFXHU3QTdBXHU1QjU3XHU3QjI2XHU0RTMyXG4gKi9cbmNvbnN0IGV4dHJhY3RUaXRsZUZyb21Db250ZW50ID0gKGNvbnRlbnQ6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gIC8vIFx1NTMzOVx1OTE0RFx1NEUwMFx1N0VBN1x1NjgwN1x1OTg5OFx1NzY4NFx1NkI2M1x1NTIxOVx1ODg2OFx1OEZCRVx1NUYwRiAoXHU2NTJGXHU2MzAxI1x1NTI0RFx1NTQwRVx1NTNFRlx1ODBGRFx1NjcwOVx1N0E3QVx1NjgzQ1x1NzY4NFx1NjBDNVx1NTFCNSlcbiAgY29uc3QgaDFSZWdleCA9IC9eXFxzKiNcXHMrKC4rPylcXHMqJC9tO1xuICBjb25zdCBtYXRjaCA9IGNvbnRlbnQubWF0Y2goaDFSZWdleCk7XG4gIHJldHVybiBtYXRjaCA/IG1hdGNoWzFdLnRyaW0oKSA6ICcnO1xufTtcblxuLyoqXG4gKiBcdTU5MDRcdTc0MDZcdTY1ODdcdTdBRTBNYXJrZG93blx1NjU4N1x1NEVGNlx1RkYwQ1x1NzUxRlx1NjIxMFx1NkMzOFx1NEU0NVx1OTRGRVx1NjNBNVx1NTQ4Q1x1OTFDRFx1NTE5OVx1ODlDNFx1NTIxOVxuICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBcdTkxNERcdTdGNkVcdTkwMDlcdTk4NzlcbiAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnNyY0RpciAtIFx1NkU5MFx1NzZFRVx1NUY1NVx1RkYwQ1x1OUVEOFx1OEJBNFx1NEUzQSdwZXJtYWxpbmsnXG4gKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5iYXNlRGlyIC0gXHU1N0ZBXHU3ODQwXHU3NkVFXHU1RjU1XHVGRjBDXHU5RUQ4XHU4QkE0XHU0RTNBJ2RvY3MnXG4gKiBAcmV0dXJucyB7UHJvbWlzZTxPYmplY3Q+fSBcdTUzMDVcdTU0MkJcdTkxQ0RcdTUxOTlcdTg5QzRcdTUyMTlcdTc2ODRcdTVCRjlcdThDNjFcbiAqL1xuZXhwb3J0IGNvbnN0IHVzZVBvc3RzID0gYXN5bmMgKHtcbiAgc3JjRGlyID0gJ3Blcm1hbGluaycsICAvLyBcdTlFRDhcdThCQTRcdTZFOTBcdTc2RUVcdTVGNTVcdTRFM0EncGVybWFsaW5rJ1xuICBiYXNlRGlyID0gJ2RvY3MnICAgLy8gXHU5RUQ4XHU4QkE0XHU1N0ZBXHU3ODQwXHU3NkVFXHU1RjU1XHU0RTNBJ2RvY3MnXG59ID0ge30pID0+IHtcbiAgY29uc3QgcmV3cml0ZXMgPSB7fTsgLy8gXHU1MjFEXHU1OUNCXHU1MzE2XHU5MUNEXHU1MTk5XHU4OUM0XHU1MjE5XHU1QkY5XHU4QzYxXG5cbiAgdHJ5IHtcbiAgICAvLyBcdTRGN0ZcdTc1MjhmYXN0LWdsb2JcdTY3RTVcdTYyN0VcdTYyNDBcdTY3MDlcdTUzMzlcdTkxNERcdTc2ODRNYXJrZG93blx1NjU4N1x1NEVGNlx1RkYwQ1x1NEY0Nlx1NUZGRFx1NzU2NWluZGV4Lm1kXHU2NTg3XHU0RUY2XG4gICAgY29uc3QgcGF0aHMgPSAoYXdhaXQgZmcoYCR7YmFzZURpcn0vJHtzcmNEaXJ9LyoqLyoubWRgLCB7XG4gICAgICBpZ25vcmU6IFsnKiovaW5kZXgubWQnXSAgLy8gXHU1RkZEXHU3NTY1XHU2MjQwXHU2NzA5aW5kZXgubWRcdTY1ODdcdTRFRjZcbiAgICB9KSkuc29ydCgpOyAvLyBcdTYzMDlcdTVCNTdcdTZCQ0RcdTk4N0FcdTVFOEZcdTYzOTJcdTVFOEZcblxuICAgIC8vIFx1NTIxQlx1NUVGQVx1NEUwMFx1NEUyQVx1NjYyMFx1NUMwNFx1RkYwQ1x1NUI1OFx1NTBBOFx1NjI0MFx1NjcwOVx1NjU4N1x1NEVGNlx1NzY4NHBlcm1hbGlua1x1NTQ4Q3RpdGxlXG4gICAgY29uc3QgcG9zdHNNYXA6IFJlY29yZDxzdHJpbmcsIHsgcGVybWFsaW5rOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT4gPSB7fTtcblxuICAgIC8vIFx1N0IyQ1x1NEUwMFx1OTA0RFx1RkYxQVx1NjUzNlx1OTZDNlx1NjI0MFx1NjcwOVx1NjU4N1x1NEVGNlx1NzY4NFx1NTdGQVx1NjcyQ1x1NEZFMVx1NjA2RlxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgcGF0aHMubWFwKGFzeW5jIChwb3N0UGF0aCkgPT4ge1xuICAgICAgICBjb25zdCB7IGRhdGEsIGNvbnRlbnQgfSA9IG1hdHRlci5yZWFkKHBvc3RQYXRoKTtcbiAgICAgICAgXG4gICAgICAgIC8vIFx1NjNEMFx1NTNENlx1NjIxNlx1OEJCRVx1N0Y2RXRpdGxlXG4gICAgICAgIGlmICghZGF0YS50aXRsZSkge1xuICAgICAgICAgIGNvbnN0IGV4dHJhY3RlZFRpdGxlID0gZXh0cmFjdFRpdGxlRnJvbUNvbnRlbnQoY29udGVudCk7XG4gICAgICAgICAgaWYgKGV4dHJhY3RlZFRpdGxlKSB7XG4gICAgICAgICAgICBkYXRhLnRpdGxlID0gZXh0cmFjdGVkVGl0bGU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gXHU3NTFGXHU2MjEwXHU2MjE2XHU0RjdGXHU3NTI4XHU3M0IwXHU2NzA5XHU3Njg0cGVybWFsaW5rXG4gICAgICAgIGlmICghZGF0YS5wZXJtYWxpbmspIHtcbiAgICAgICAgICBkYXRhLnBlcm1hbGluayA9IGAvJHtzcmNEaXJ9LyR7Z2VuZXJhdGVTdHJpbmcoNil9YDtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1NUI1OFx1NTBBOFx1NTIzMFx1NjYyMFx1NUMwNFx1NEUyRFxuICAgICAgICBwb3N0c01hcFtwb3N0UGF0aF0gPSB7XG4gICAgICAgICAgcGVybWFsaW5rOiBkYXRhLnBlcm1hbGluayxcbiAgICAgICAgICB0aXRsZTogZGF0YS50aXRsZSB8fCBwYXRoLmJhc2VuYW1lKHBvc3RQYXRoLCAnLm1kJylcbiAgICAgICAgfTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIFx1N0IyQ1x1NEU4Q1x1OTA0RFx1RkYxQVx1OEJCRVx1N0Y2RXByZXYvbmV4dFx1NUJGQ1x1ODIyQVxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgcGF0aHMubWFwKGFzeW5jIChwb3N0UGF0aCwgaW5kZXgpID0+IHtcbiAgICAgICAgY29uc3QgeyBkYXRhLCBjb250ZW50IH0gPSBtYXR0ZXIucmVhZChwb3N0UGF0aCk7XG4gICAgICAgIGNvbnN0IHByZXZQb3N0ID0gaW5kZXggPiAwID8gcG9zdHNNYXBbcGF0aHNbaW5kZXggLSAxXV0gOiBudWxsO1xuICAgICAgICBjb25zdCBuZXh0UG9zdCA9IGluZGV4IDwgcGF0aHMubGVuZ3RoIC0gMSA/IHBvc3RzTWFwW3BhdGhzW2luZGV4ICsgMV1dIDogbnVsbDtcblxuICAgICAgICAvLyBcdThCQkVcdTdGNkVwcmV2XHU1QkZDXHU4MjJBXG4gICAgICAgIGlmIChwcmV2UG9zdCAmJiAhZGF0YS5wcmV2KSB7XG4gICAgICAgICAgZGF0YS5wcmV2ID0ge1xuICAgICAgICAgICAgdGV4dDogcHJldlBvc3QudGl0bGUsXG4gICAgICAgICAgICBsaW5rOiBwcmV2UG9zdC5wZXJtYWxpbmtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gXHU4QkJFXHU3RjZFbmV4dFx1NUJGQ1x1ODIyQVxuICAgICAgICBpZiAobmV4dFBvc3QgJiYgIWRhdGEubmV4dCkge1xuICAgICAgICAgIGRhdGEubmV4dCA9IHtcbiAgICAgICAgICAgIHRleHQ6IG5leHRQb3N0LnRpdGxlLFxuICAgICAgICAgICAgbGluazogbmV4dFBvc3QucGVybWFsaW5rXG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFx1NUMwNlx1NjZGNFx1NjVCMFx1NTQwRVx1NzY4NGZyb250bWF0dGVyXHU1MTk5XHU1NkRFXHU2NTg3XHU0RUY2XG4gICAgICAgIGF3YWl0IGZzLndyaXRlRmlsZShcbiAgICAgICAgICBwb3N0UGF0aCxcbiAgICAgICAgICBtYXR0ZXIuc3RyaW5naWZ5KGNvbnRlbnQsIGRhdGEpLFxuICAgICAgICAgICd1dGY4J1xuICAgICAgICApO1xuXG4gICAgICAgIC8vIFx1OEJBMVx1N0I5N1x1NzZGOFx1NUJGOVx1OERFRlx1NUY4NFx1NUU3Nlx1NkRGQlx1NTJBMFx1NTIzMFx1OTFDRFx1NTE5OVx1ODlDNFx1NTIxOVxuICAgICAgICBjb25zdCByZWxhdGl2ZVBhdGggPSBwb3N0UGF0aC5yZXBsYWNlKGAke2Jhc2VEaXJ9L2AsICcnKTtcbiAgICAgICAgcmV3cml0ZXNbcmVsYXRpdmVQYXRoLnJlcGxhY2UoL1srKCldL2csICdcXFxcJCYnKV0gPVxuICAgICAgICAgIGAke2RhdGEucGVybWFsaW5rfS5tZGAuc2xpY2UoMSkucmVwbGFjZSgvWysoKV0vZywgJ1xcXFwkJicpO1xuICAgICAgfSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHsgcmV3cml0ZXMgfTsgLy8gXHU4RkQ0XHU1NkRFXHU3NTFGXHU2MjEwXHU3Njg0XHU5MUNEXHU1MTk5XHU4OUM0XHU1MjE5XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGUpOyAvLyBcdTYzNTVcdTgzQjdcdTVFNzZcdTYyNTNcdTUzNzBcdTk1MTlcdThCRUZcbiAgICByZXR1cm4geyByZXdyaXRlcyB9OyAvLyBcdTUzNzNcdTRGN0ZcdTUxRkFcdTk1MTlcdTRFNUZcdThGRDRcdTU2REVcdTUzRUZcdTgwRkRcdTkwRThcdTUyMDZcdTVCOENcdTYyMTBcdTc2ODRcdTkxQ0RcdTUxOTlcdTg5QzRcdTUyMTlcbiAgfVxufTsiXSwKICAibWFwcGluZ3MiOiAiO0FBQWlULFNBQVMsb0JBQW9COzs7QUNDNVUsc0JBQW1CO0FBQUEsRUFDakIsb0JBQW9CO0FBQUEsRUFDcEIsK0JBQStCO0FBQUEsRUFDL0IsZUFBZTtBQUFBLEVBQ2Ysb0JBQW9CO0FBQUEsRUFDcEIsbUJBQW1CO0FBQUEsRUFDbkIsYUFBYTtBQUFBLEVBQ2IsZUFBZTtBQUFBLEVBQ2YsTUFBUTtBQUFBLEVBQ1IsNkJBQTZCO0FBQUEsRUFDN0IsZUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLEVBQ1gsZ0JBQWdCO0FBQUEsRUFDaEIsTUFBUTtBQUFBLEVBQ1IsV0FBYTtBQUFBLEVBQ2Isd0NBQXdDO0FBQUEsRUFDeEMsZ0NBQWdDO0FBQUEsRUFDaEMsNEJBQTRCO0FBQUEsRUFDNUIscUJBQXFCO0FBQUEsRUFDckIsS0FBTztBQUFBLEVBQ1AsVUFBWTtBQUNkOzs7QURuQkYsT0FBTyw0QkFBNEI7QUFDbkMsU0FBUyxtQkFBbUIscUJBQXFCLHVCQUF1QjtBQUN4RSxTQUFTLGlCQUFpQixxQkFBcUI7QUFDL0MsU0FBUyw2QkFBOEI7QUFDdkMsU0FBUyx1QkFBdUI7OztBRU5oQyxPQUFPLFlBQVk7QUFDbkIsT0FBTyxRQUFRO0FBQ2YsT0FBTyxRQUFRO0FBQ2YsT0FBTyxVQUFVO0FBT1YsSUFBTSxpQkFBaUIsQ0FBQyxXQUFtQjtBQUNoRCxRQUFNLFVBQVU7QUFDaEIsTUFBSSxhQUFhO0FBR2pCLFdBQVMsSUFBSSxHQUFHLElBQUksUUFBUSxLQUFLO0FBQy9CLFVBQU0sY0FBYyxLQUFLLE1BQU0sS0FBSyxPQUFPLElBQUksUUFBUSxNQUFNO0FBQzdELGtCQUFjLFFBQVEsV0FBVztBQUFBLEVBQ25DO0FBRUEsU0FBTztBQUNUO0FBT0EsSUFBTSwwQkFBMEIsQ0FBQyxZQUE0QjtBQUUzRCxRQUFNLFVBQVU7QUFDaEIsUUFBTSxRQUFRLFFBQVEsTUFBTSxPQUFP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
