<script setup lang="ts">
import type { PlatformId } from "../screens";

// `landscape` turns a phone on its side; tablets and TVs are always landscape.
// `island: false` drops the phone's Dynamic Island so nothing covers the screen.
withDefaults(defineProps<{ kind: PlatformId; landscape?: boolean; island?: boolean }>(), {
  island: true,
});
</script>

<template>
  <div class="device" :class="[`device--${kind}`, { 'device--landscape': landscape }]">
    <div class="device-body">
      <div class="device-screen">
        <slot />
      </div>
      <!-- The shell sits above the screen content, so square screenshots and recordings
           get the device's rounded screen corners without being resized. -->
      <span class="device-shell" aria-hidden="true" />
      <span v-if="kind === 'phone' && island" class="device-island" aria-hidden="true" />
      <span v-else-if="kind === 'tablet'" class="device-camera" aria-hidden="true" />
    </div>
  </div>
</template>

<style scoped>
/* Bezels are sized in cqw so a frame keeps its proportions at any width. */
.device {
  container-type: inline-size;
  --device-ring: #48484e;
  --device-glow: rgba(98, 72, 214, 0.28);
  --device-color: #050506;
}

.dark .device {
  --device-ring: #5c5c66;
  --device-glow: rgba(140, 118, 255, 0.24);
}

.device-body {
  position: relative;
  overflow: hidden;
  padding: var(--bezel);
  border-radius: var(--body-radius);
  background: var(--device-color);
  box-shadow:
    0 0 0 var(--device-ring-width) var(--device-ring),
    0 4cqw 9cqw -2cqw var(--device-glow);
}

/* `isolation` keeps any z-index inside the slot (e.g. crossfading screenshots)
   below the shell and island. */
.device-screen {
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #1a1c1e;
}

.device-screen :slotted(img),
.device-screen :slotted(video) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* A rounded window over the screen; its spread shadow paints the bezel on top of the
   content's square corners, and .device-body clips it to the outer shape. */
.device-shell {
  position: absolute;
  inset: var(--bezel);
  border-radius: var(--screen-radius);
  box-shadow: 0 0 0 40cqw var(--device-color);
  pointer-events: none;
}

.device--phone .device-body {
  --device-ring-width: 0.9cqw;
  --bezel: 3.4cqw;
  --body-radius: 15cqw;
  --screen-radius: 11.6cqw;
}

.device--phone .device-screen {
  aspect-ratio: 1206 / 2622;
}

.device-island {
  position: absolute;
  top: 5.8cqw;
  left: 50%;
  width: 27cqw;
  height: 7.6cqw;
  border-radius: 4cqw;
  background: #000;
  transform: translateX(-50%);
}

.device--landscape .device-body {
  --device-ring-width: 0.42cqw;
  --bezel: 1.56cqw;
  --body-radius: 6.9cqw;
  --screen-radius: 5.3cqw;
}

.device--landscape .device-screen {
  aspect-ratio: 2622 / 1206;
}

.device--landscape .device-island {
  top: 50%;
  left: 2.7cqw;
  width: 3.5cqw;
  height: 12.4cqw;
  border-radius: 1.9cqw;
  transform: translateY(-50%);
}

.device--tablet .device-body {
  --device-ring-width: 0.45cqw;
  --bezel: 2.4cqw;
  --body-radius: 4.4cqw;
  --screen-radius: 2cqw;
}

.device--tablet .device-screen {
  aspect-ratio: 2388 / 1668;
}

.device-camera {
  position: absolute;
  top: 0.9cqw;
  left: 50%;
  width: 0.7cqw;
  height: 0.7cqw;
  border-radius: 50%;
  background: #1e2230;
  transform: translateX(-50%);
}

.device--tv .device-body {
  --device-ring-width: 0.18cqw;
  --bezel: 0.9cqw;
  --body-radius: 1.2cqw;
  --screen-radius: 0.3cqw;
}

.device--tv .device-screen {
  aspect-ratio: 16 / 9;
}
</style>
