import { h } from "vue";
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";
import DonateLink from "./components/DonateLink.vue";
import FeaturesHeading from "./components/FeaturesHeading.vue";
import HeroDevices from "./components/HeroDevices.vue";
import MotionSection from "./components/MotionSection.vue";
import PlatformGallery from "./components/PlatformGallery.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  Layout() {
    return h(DefaultTheme.Layout, null, {
      "nav-bar-content-after": () => h(DonateLink),
      "home-hero-after": () => h(HeroDevices),
      "home-features-before": () => [h(PlatformGallery), h(MotionSection), h(FeaturesHeading)],
    });
  },
} satisfies Theme;
