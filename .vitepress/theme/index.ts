// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import './style.css'
import SignInOutMenuLinkComponent from "../components/menuLinks/SignInOutMenuLinkComponent.vue";
import AppsMenuLinkComponent from "../components/menuLinks/AppsMenuLinkComponent.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    })
  },
  enhanceApp({ app, router, siteData }) {
    app.component('SignInOutMenuLinkComponent', SignInOutMenuLinkComponent);
    app.component('AppsMenuLinkComponent', AppsMenuLinkComponent)
    // ...
  }
} satisfies Theme
