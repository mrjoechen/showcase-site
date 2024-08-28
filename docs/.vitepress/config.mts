import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ShowcaseApp",
  description: "Showcase Site",
  base: "/showcase-site/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      // { text: "Examples", link: "/markdown-examples" },
      { text: "Download", link: "/download" },
      {
        text: "Changelog",
        items: [
          {
            text: "v1.0.26",
            link: "https://github.com/mrjoechen/ShowcaseApp/releases/tag/v1.0.26",
          },
          {
            text: "v1.0.28",
            link: "https://github.com/mrjoechen/ShowcaseApp/releases/tag/v1.0.28",
          },
        ],
      },
      {
        text: "Help",
        items: [
          {
            text: "常见问题",
            link: "https://github.com/mrjoechen/ShowcaseApp/wiki",
          },
          {
            text: "功能请求",
            link: "https://github.com/mrjoechen/ShowcaseApp/issues",
          },
          {
            text: "问题反馈",
            link: "https://github.com/mrjoechen/ShowcaseApp/issues",
          },
          {
            text: "隐私政策",
            link: "privacypolicy",
          },
          {
            text: "用户条款",
            link: "/termsconditions",
          },
        ],
      },
    ],

    sidebar: [
      {
        text: "Docs",
        items: [
          // { text: "Markdown Examples", link: "/markdown-examples" },
          // { text: "Runtime API Examples", link: "/api-examples" },
          // { text: "Star", link: "/api-examples" },
          { text: "privacy and policy", link: "/privacypolicy" },
          { text: "terms and conditions", link: "/termsconditions" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/mrjoechen/ShowcaseApp" },
    ],
  },
});
