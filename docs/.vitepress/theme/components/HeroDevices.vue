<script setup lang="ts">
import { computed } from "vue";
import DeviceFrame from "./DeviceFrame.vue";
import {
  homeCopy,
  imageSrcset,
  platforms,
  screenSrcset,
  useLocale,
  type PlatformId,
} from "../screens";

const locale = useLocale();

function screen(id: PlatformId, screenId: string) {
  const platform = platforms.find((p) => p.id === id)!;
  return screenSrcset(platform, platform.screens.find((s) => s.id === screenId)!, locale.value);
}

// One photo-filled screen per device, arranged like the App Store previews.
// The phone lies on its side, the way it sits on a stand as a photo frame.
const devices = computed(() => [
  {
    id: "tv" as const,
    landscape: false,
    sizes: "(min-width: 960px) 710px, 72vw",
    ...screen("tv", "slide"),
  },
  {
    id: "tablet" as const,
    landscape: false,
    sizes: "(min-width: 960px) 350px, 36vw",
    ...imageSrcset("hero-tablet-framewall", [800, 1600]),
  },
  {
    id: "phone" as const,
    landscape: true,
    sizes: "(min-width: 960px) 310px, 32vw",
    ...imageSrcset("hero-phone-bento", [640, 1280]),
  },
]);
</script>

<template>
  <div class="hero-devices">
    <div class="stage">
      <div class="glow" aria-hidden="true" />
      <DeviceFrame
        v-for="device in devices"
        :key="device.id"
        :kind="device.id"
        :landscape="device.landscape"
        :class="`slot--${device.id}`"
      >
        <img
          :src="device.src"
          :srcset="device.srcset"
          :sizes="device.sizes"
          :alt="homeCopy[locale].heroAlt[device.id]"
          :fetchpriority="device.id === 'tv' ? 'high' : 'auto'"
          decoding="async"
        />
      </DeviceFrame>
    </div>
  </div>
</template>

<style scoped>
.hero-devices {
  padding: 0 24px;
}

@media (min-width: 640px) {
  .hero-devices {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .hero-devices {
    padding: 0 64px;
  }
}

.stage {
  position: relative;
  margin: 0 auto;
  max-width: 980px;
  aspect-ratio: 100 / 52;
}

.glow {
  position: absolute;
  inset: 8% -6% -10%;
  border-radius: 50%;
  background: radial-gradient(closest-side, rgba(139, 108, 255, 0.26), transparent);
  filter: blur(24px);
}

.dark .glow {
  background: radial-gradient(closest-side, rgba(124, 100, 255, 0.24), transparent);
}

.slot--tv,
.slot--tablet,
.slot--phone {
  position: absolute;
}

.slot--tv {
  top: 0;
  left: 14%;
  width: 72%;
}

.slot--tablet {
  bottom: 0;
  left: 0;
  width: 36%;
}

.slot--phone {
  right: 0;
  bottom: 0;
  width: 32%;
}
</style>
