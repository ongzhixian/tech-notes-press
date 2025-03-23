import path from 'path';
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Tech Notes Press",
  description: "Generating useful tech notes for everyday use",
  head: [
    [ 'link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' } ],
    [ 'link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' } ],
    [ 'link', { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap' } ],
    // [
    //   'script',
    //   { id: 'register-sw' },
    //   `;(() => {
    //     if ('serviceWorker' in navigator) {
    //       navigator.serviceWorker.register('/sw.js')
    //     }
    //   })()`
    // ]
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      // { text: 'Home', link: '/journal/' },
      { text: 'Roadmap', link: '/roadmap' },
      { text: 'Journal', link: '/journal/' },
      // { text: 'Apps', link: '/apps/' },
      // { text: 'Examples', link: '/markdown-examples' },
      // { text: 'AppUser', link: '/app-user/' },
      { component: 'SignInOutMenuLinkComponent' },
      { component: 'AppsMenuLinkComponent' },
    ],

    sidebar: {

      '/': {
        text: 'Examples',
        items: [
          {text: 'Markdown Examples', link: '/markdown-examples'},
          {text: 'Runtime API Examples', link: '/api-examples'}
        ]
      },

      '/apps/': {
        text: 'Examples',
        items: [
          {text: 'Register', link: '/app-user/register'},
          {text: 'Dev Chat', link: '/app-user/chat'},
          {text: 'Trading', link: '/apps/trading/'},
          {
            text: 'Research',
            items: [
              {text: 'Machine Learning', link: '/markdown-examples'},
            ]
          }

        ]
      },

      '/apps/trading/': {
        items: [
          {text: 'Trading Home', link: '/apps/trading/'},
          {text: 'Accounts', link: '/apps/trading/accounts'},
          {text: 'Instruments', link: '/apps/trading/tradable-instruments'},
          {
            text: 'Trading',
            items: [
              {text: 'Order', link: '/markdown-examples'},
              {text: 'Positions', link: '/markdown-examples'},
              {text: 'Trades', link: '/markdown-examples'},
              {text: 'Analysis', link: '/api-examples'}
            ]
          },
          {
            text: 'History',
            items: [
              {text: 'Trades', link: '/markdown-examples'},
              // {text: 'Runtime API Examples', link: '/api-examples'}
            ]
          },
          {
            text: 'Research',
            items: [
              {text: 'Algo Trading', link: '/markdown-examples'},
              // {text: 'Runtime API Examples', link: '/api-examples'}
            ]
          }

        ]
      },

      '/app-user/': {
        text: 'Examples',
        items: [
          {text: 'Register', link: '/app-user/register'},
          {text: 'Dev Chat', link: '/app-user/chat'},
          {
            text: 'Examples',
            items: [
              {text: 'Markdown Examples', link: '/markdown-examples'},
              {text: 'Runtime API Examples', link: '/api-examples'}
            ]
          }

        ]
      },

      '/authentication/': {
        items: []
      },

      '/journal/': {
        items: [
          {text: 'Notes', link: '/journal/notes'},
          {text: 'Reminders', link: '/journal/reminders'},
          {text: 'Calendars', link: '/journal/calendars'},
          {text: 'Curriculum Vitae', link: '/journal/curriculum-vitae'},

          {
            text: 'Blogs',
            items: [
              {text: 'Personal', link: '/journal/blogs/personal-blog'},
              {text: 'Tech', link: '/journal/blogs/tech-blog'}
            ]
          },

          {
            text: 'Cloud',
            items: [
              {text: 'Providers', link: '/journal/cloud/cloud-providers', collapsed: true,
                items: [
                  {text: 'Note 1', link: '/app-user/register'},
                  {text: 'Note 2', link: '/app-user/register'},
                  {text: 'Note 3', link: '/app-user/register'},
                  {text: 'Note 4', link: '/app-user/register'},
                ]
              },
              {text: 'Resources', link: '/journal/cloud/cloud-resources'}
            ]
          },

          {
            text: 'Finance',
            items: [
              {text: 'Accounts', link: '/markdown-examples'},
              {text: 'Assets', link: '/api-examples'}
            ]
          },

          {
            text: 'Games',
            items: [
              {text: 'Tic Tac Toe', link: '/markdown-examples'},
              {text: 'Lottery', link: '/api-examples'},
              {text: 'Planning Poker', link: '/api-examples'},
              {text: 'Knowledge Discovery', link: '/api-examples'},
            ]
          },

        ]
      },
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  outDir: './artifacts',
})
