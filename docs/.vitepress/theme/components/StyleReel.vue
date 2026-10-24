<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from "vue";
import DeviceFrame from "./DeviceFrame.vue";
import { homeCopy, styleClips, useLocale } from "../screens";

const locale = useLocale();
const copy = computed(() => homeCopy[locale.value]);

const active = ref(0);
const clip = computed(() => styleClips[active.value]);

const stageEl = ref<HTMLElement>();
const videoEl = ref<HTMLVideoElement>();
// Recordings play only while on screen, and never after the viewer pauses them.
const visible = ref(false);
const paused = ref(false);

async function sync() {
  await nextTick();
  const video = videoEl.value;
  if (!video) return;
  if (visible.value && !paused.value) video.play().catch(() => {});
  else video.pause();
}

function select(i: number) {
  active.value = (i + styleClips.length) % styleClips.length;
}

function toggle() {
  paused.value = !paused.value;
}

const tabEls = ref<HTMLButtonElement[]>([]);

function onTabKey(event: KeyboardEvent, i: number) {
  const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
  if (!step) return;
  event.preventDefault();
  select(i + step);
  tabEls.value[active.value]?.focus();
}

// Keep the active pill in view when the row scrolls on narrow screens.
const pillsEl = ref<HTMLElement>();

watch(active, async (i) => {
  await nextTick();
  const row = pillsEl.value;
  const pill = row?.children[i] as HTMLElement | undefined;
  if (!row || !pill || row.scrollWidth <= row.clientWidth) return;
  row.scrollTo({ left: pill.offsetLeft - (row.clientWidth - pill.offsetWidth) / 2, behavior: "smooth" });
});

watch([active, visible, paused], sync);

let observer: IntersectionObserver | undefined;

onMounted(() => {
  paused.value = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  observer = new IntersectionObserver(([entry]) => (visible.value = entry.isIntersecting), {
    threshold: 0.35,
  });
  if (stageEl.value) observer.observe(stageEl.value);
});

// Once the stage is on screen, load every poster so switching styles shows a frame at once.
const stopPreload = watch(visible, (isVisible) => {
  if (!isVisible) return;
  for (const c of styleClips) new Image().src = c.poster;
  stopPreload();
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <div class="style-reel">
    <div ref="pillsEl" class="pills" role="tablist" :aria-label="copy.styles">
      <button
        v-for="(c, i) in styleClips"
        :id="`style-tab-${c.id}`"
        :key="c.id"
        :ref="(el) => (tabEls[i] = el as HTMLButtonElement)"
        class="pill"
        :class="{ active: i === active }"
        type="button"
        role="tab"
        :aria-selected="i === active"
        aria-controls="style-panel"
        :tabindex="i === active ? 0 : -1"
        @click="select(i)"
        @keydown="onTabKey($event, i)"
      >
        {{ c.label[locale] }}
      </button>
    </div>

    <div
      id="style-panel"
      ref="stageEl"
      class="stage"
      role="tabpanel"
      :aria-labelledby="`style-tab-${clip.id}`"
    >
      <DeviceFrame kind="phone" landscape :island="false" class="device">
        <video
          ref="videoEl"
          :key="clip.id"
          :src="clip.video"
          :poster="clip.poster"
          :aria-label="clip.label[locale]"
          muted
          loop
          playsinline
          preload="none"
          disablepictureinpicture
        />
      </DeviceFrame>

      <p :key="clip.id" class="caption">
        <strong>{{ clip.label[locale] }}</strong>
        <span>{{ clip.details[locale] }}</span>
      </p>

      <button
        class="toggle"
        type="button"
        :aria-label="paused ? copy.play : copy.pause"
        :title="paused ? copy.play : copy.pause"
        @click="toggle"
      >
        <svg v-if="paused" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M8 5.5v13l10.5-6.5z" />
        </svg>
        <svg v-else viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
          <path d="M7.5 5.5h3v13h-3zM13.5 5.5h3v13h-3z" />
        </svg>
      </button>
    </div>
  </div>
</template>

<style scoped>
.style-reel {
  margin-top: 36px;
}

/* Style pills: one centered row, scrolling sideways when it does not fit */
.pills {
  display: flex;
  gap: 8px;
  margin: 0 -24px;
  padding: 2px 24px;
  overflow-x: auto;
  scrollbar-width: none;
}

.pills::-webkit-scrollbar {
  display: none;
}

.pills > :first-child {
  margin-left: auto;
}

.pills > :last-child {
  margin-right: auto;
}

.pill {
  flex-shrink: 0;
  padding: 8px 16px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 999px;
  font-size: 14px;
  font-weight: 600;
  line-height: 20px;
  white-space: nowrap;
  color: var(--vp-c-text-2);
  transition: color 0.2s, background-color 0.2s, border-color 0.2s;
}

.pill:hover {
  border-color: var(--vp-c-text-3);
  color: var(--vp-c-text-1);
}

.pill.active {
  border-color: transparent;
  background: var(--vp-c-text-1);
  color: var(--vp-c-bg);
}

/* Stage */
.stage {
  position: relative;
  margin: 20px -8px 0;
  padding: 28px 16px 24px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
  background: var(--home-stage-bg);
}

.device {
  margin: 0 auto;
  max-width: 860px;
}

/* Show the recording whole and unscaled in ratio; the phone shell covers its corners.
   The extra .stage outranks DeviceFrame's own slotted styles. */
.stage .device video {
  object-fit: contain;
}

.caption {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin: 24px auto 0;
  max-width: 560px;
  text-align: center;
  animation: caption-in 0.35s ease;
}

@keyframes caption-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

.caption strong {
  font-size: 18px;
  font-weight: 700;
  line-height: 26px;
  color: var(--vp-c-text-1);
}

.caption span {
  font-size: 15px;
  line-height: 24px;
  color: var(--vp-c-text-2);
  word-break: keep-all;
  overflow-wrap: anywhere;
}

/* Sits under the caption on narrow screens, in the stage's corner on wider ones. */
.toggle {
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border: 1px solid var(--vp-c-divider);
  margin: 14px auto 0;
  border-radius: 50%;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  transition: border-color 0.2s;
}

.toggle:hover {
  border-color: var(--vp-c-text-3);
}

.toggle svg {
  fill: currentColor;
}

@media (min-width: 640px) {
  .pills {
    margin: 0 -48px;
    padding: 2px 48px;
  }

  .stage {
    margin: 20px 0 0;
    padding: 48px 40px 36px;
    border-radius: 32px;
  }

  .toggle {
    position: absolute;
    right: 20px;
    bottom: 20px;
    margin: 0;
  }
}

@media (min-width: 960px) {
  .pills {
    margin: 0;
    padding: 2px 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .caption {
    animation: none;
  }
}
</style>
