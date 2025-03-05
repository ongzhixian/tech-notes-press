import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tech Notes Press",
  description: "Generating useful tech notes for everyday use",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' },
      { text: 'Page 1', link: '/page1' },
      { text: 'AppUser', link: '/app-user' },
      { component: 'SignInOutMenuLinkComponent' },
    ],

    sidebar: {

      '/': {
        text: 'Examples',
        items: [
          {text: 'Markdown Examples', link: '/markdown-examples'},
          {text: 'Runtime API Examples', link: '/api-examples'}
        ]
      },

      '/authentication/': {
        items: []
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  outDir: './artifacts'
})
