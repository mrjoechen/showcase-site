import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import DonateLink from "./components/DonateLink.vue";
import FeaturesHeading from "./components/FeaturesHeading.vue";
import HeroDevices from "./components/HeroDevices.vue";
import HomeHeading from "./components/HomeHeading.vue";
import PlatformGallery from "./components/PlatformGallery.vue";
import StyleReel from "./components/StyleReel.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("HomeHeading", HomeHeading);
    app.component("StyleReel", StyleReel);
  },
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-after": () => h(DonateLink),
      "home-hero-after": () => h(HeroDevices),
      "home-features-before": () => [h(PlatformGallery), h(FeaturesHeading)],
    });
  },
} satisfies Theme;
