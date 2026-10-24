<script setup lang="ts">
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import DeviceFrame from "./DeviceFrame.vue";
import HomeHeading from "./HomeHeading.vue";
import {
  homeCopy,
  platforms,
  screenSrcset,
  useLocale,
  type PlatformId,
  type Screen,
} from "../screens";

const locale = useLocale();
const copy = computed(() => homeCopy[locale.value]);

const platformId = ref<PlatformId>("tablet");
const platform = computed(() => platforms.find((p) => p.id === platformId.value)!);

// Each device keeps its own position, so switching back returns to the same screen.
const indices = reactive(
  Object.fromEntries(platforms.map((p) => [p.id, 0])) as Record<PlatformId, number>,
);
const index = computed(() => indices[platformId.value]);

// One frame per device and orientation: the phone has a portrait and a landscape frame.
// Every frame stays mounted and only ever shows its own screenshots, so switching
// devices or turning the phone sideways is a plain crossfade between frames.
function frameKey(id: PlatformId, screen: Screen) {
  return screen.landscape ? `${id}-landscape` : id;
}

const frameDefs = platforms.flatMap((p) => {
  const groups = new Map<string, number[]>();
  p.screens.forEach((screen, i) => {
    const key = frameKey(p.id, screen);
    groups.set(key, [...(groups.get(key) ?? []), i]);
  });
  return [...groups].map(([key, indexes]) => ({
    key,
    platform: p.id,
    landscape: key.endsWith("-landscape"),
    indexes,
  }));
});

// `shown` is the screen a frame displays, kept while the frame fades out; `previous`
// stays underneath until a new screen has loaded; screens in `seen` stay mounted so
// revisiting them crossfades without a reload.
const frameState = reactive(
  Object.fromEntries(
    frameDefs.map((f) => [f.key, { shown: f.indexes[0], previous: -1, seen: new Set([f.indexes[0]]) }]),
  ) as Record<string, { shown: number; previous: number; seen: Set<number> }>,
);

const frames = computed(() =>
  frameDefs.map((f) => {
    const p = platforms.find((x) => x.id === f.platform)!;
    return {
      ...f,
      sizes:
        f.platform === "phone" && !f.landscape
          ? "(min-width: 960px) 240px, 260px"
          : "(min-width: 960px) 680px, 92vw",
      screens: f.indexes.map((i) => ({
        i,
        ...p.screens[i],
        ...screenSrcset(p, p.screens[i], locale.value),
      })),
    };
  }),
);

const screens = computed(() =>
  platform.value.screens.map((screen) => ({
    ...screen,
    ...screenSrcset(platform.value, screen, locale.value),
  })),
);
const current = computed(() => screens.value[index.value]);
const activeFrame = computed(() =>
  frameKey(platformId.value, platform.value.screens[index.value]),
);

const devicesEl = ref<HTMLElement>();

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// When the active frame changes, animate the stage between frame heights
// instead of letting the page jump.
async function animateStage(change: () => void) {
  const el = devicesEl.value;
  const from = el?.getBoundingClientRect().height;
  const before = activeFrame.value;
  change();
  if (activeFrame.value === before) return;
  await nextTick();
  if (!el || from === undefined || prefersReducedMotion()) return;
  el.style.transition = "";
  el.style.height = "";
  const to = el.getBoundingClientRect().height;
  if (Math.abs(to - from) < 1) return;
  el.style.height = `${from}px`;
  void el.offsetHeight;
  el.style.transition = "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
  el.style.height = `${to}px`;
  el.addEventListener("transitionend", function onEnd(event) {
    if (event.target !== el || event.propertyName !== "height") return;
    el.removeEventListener("transitionend", onEnd);
    el.style.transition = "";
    el.style.height = "";
  });
}

function selectPlatform(id: PlatformId) {
  if (id === platformId.value) return;
  animateStage(() => (platformId.value = id));
}

function show(i: number) {
  const count = platform.value.screens.length;
  const next = (i + count) % count;
  if (next === index.value) return;
  animateStage(() => {
    indices[platformId.value] = next;
    const state = frameState[activeFrame.value];
    if (state.shown === next) return;
    state.previous = state.shown;
    state.shown = next;
    state.seen.add(next);
  });
}

function shouldRender(key: string, i: number) {
  return (
    frameState[key].seen.has(i) || (key === activeFrame.value && Math.abs(i - index.value) <= 1)
  );
}

const tabEls = ref<HTMLButtonElement[]>([]);

function onTabKey(event: KeyboardEvent, i: number) {
  const step = event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
  if (!step) return;
  event.preventDefault();
  const next = (i + step + platforms.length) % platforms.length;
  selectPlatform(platforms[next].id);
  tabEls.value[next]?.focus();
}

let touchX = 0;
let touchY = 0;

function onTouchStart(event: TouchEvent) {
  touchX = event.touches[0].clientX;
  touchY = event.touches[0].clientY;
}

function onTouchEnd(event: TouchEvent) {
  const dx = event.changedTouches[0].clientX - touchX;
  const dy = event.changedTouches[0].clientY - touchY;
  if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) show(index.value + (dx < 0 ? 1 : -1));
}

// When the thumbnail strip scrolls (narrow screens), keep the active thumbnail in view.
const thumbsEl = ref<HTMLElement>();

watch([index, platformId], async () => {
  await nextTick();
  const strip = thumbsEl.value;
  const thumb = strip?.children[index.value] as HTMLElement | undefined;
  if (!strip || !thumb || strip.scrollWidth <= strip.clientWidth) return;
  strip.scrollTo({
    left: thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2,
    behavior: "smooth",
  });
});

// Warm the cache so the other devices' thumbnails appear at once when switching.
function preloadThumbs() {
  for (const f of frames.value) for (const s of f.screens) new Image().src = s.thumb;
}

onMounted(() => {
  preloadThumbs();
  watch(locale, preloadThumbs);
});
</script>

<template>
  <section class="platform-gallery">
    <HomeHeading
      :eyebrow="copy.previewEyebrow"
      :title="copy.previewTitle"
      :details="copy.previewDetails"
    />

    <div class="tabs" role="tablist" :aria-label="copy.devices">
      <button
        v-for="(p, i) in platforms"
        :id="`platform-tab-${p.id}`"
        :key="p.id"
        :ref="(el) => (tabEls[i] = el as HTMLButtonElement)"
        class="tab"
        :class="{ active: p.id === platformId }"
        type="button"
        role="tab"
        :aria-selected="p.id === platformId"
        aria-controls="platform-panel"
        :tabindex="p.id === platformId ? 0 : -1"
        @click="selectPlatform(p.id)"
        @keydown="onTabKey($event, i)"
      >
        <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
          <template v-if="p.id === 'phone'">
            <rect x="6.5" y="2.5" width="11" height="19" rx="2.5" />
            <path d="M10.5 18.5h3" />
          </template>
          <template v-else-if="p.id === 'tablet'">
            <rect x="2.5" y="4.5" width="19" height="15" rx="2.5" />
            <path d="M10.5 16.5h3" />
          </template>
          <template v-else>
            <rect x="2" y="3.5" width="20" height="13" rx="2" />
            <path d="M8 20.5h8" />
          </template>
        </svg>
        <span>{{ p.label[locale] }}</span>
      </button>
    </div>

    <div
      id="platform-panel"
      class="panel"
      role="tabpanel"
      :aria-labelledby="`platform-tab-${platformId}`"
    >
      <!-- Each state reads like one App Store preview image: eyebrow, headline, device. -->
      <div class="stage">
        <div
          :key="`${platformId}-${index}`"
          class="caption"
          :class="`tone--${current.tone}`"
          aria-live="polite"
        >
          <p class="caption-eyebrow">{{ current.eyebrow[locale] }}</p>
          <h3 class="caption-title">{{ current.title[locale] }}</h3>
          <p class="caption-details">{{ current.details[locale] }}</p>
        </div>

        <div class="device-row">
          <button class="arrow" type="button" :aria-label="copy.previous" @click="show(index - 1)">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M14.5 6l-6 6 6 6" />
            </svg>
          </button>

          <div
            ref="devicesEl"
            class="devices"
            @touchstart.passive="onTouchStart"
            @touchend="onTouchEnd"
          >
            <!-- Sideways phone screenshots are full-bleed, so that frame leaves out the island. -->
            <DeviceFrame
              v-for="f in frames"
              :key="f.key"
              :kind="f.platform"
              :landscape="f.landscape"
              :island="!f.landscape"
              class="device"
              :class="[`device-${f.key}`, { active: f.key === activeFrame }]"
              :aria-hidden="f.key === activeFrame ? undefined : 'true'"
            >
              <template v-for="s in f.screens" :key="s.id">
                <img
                  v-if="shouldRender(f.key, s.i)"
                  :src="s.src"
                  :srcset="s.srcset"
                  :sizes="f.sizes"
                  :alt="
                    f.key === activeFrame && s.i === index
                      ? `${s.eyebrow[locale]}: ${s.title[locale]}`
                      : ''
                  "
                  :class="{
                    active: s.i === frameState[f.key].shown,
                    previous: s.i === frameState[f.key].previous,
                  }"
                  loading="lazy"
                  decoding="async"
                />
              </template>
            </DeviceFrame>
          </div>

          <button class="arrow" type="button" :aria-label="copy.next" @click="show(index + 1)">
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path d="M9.5 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>

      <div :key="platformId" ref="thumbsEl" class="thumbs" :class="`thumbs-${platformId}`">
        <button
          v-for="(s, i) in screens"
          :key="s.id"
          class="thumb"
          :class="[`tone--${s.tone}`, { active: i === index, 'thumb--landscape': s.landscape }]"
          type="button"
          :aria-current="i === index ? 'true' : undefined"
          @click="show(i)"
        >
          <span class="thumb-img">
            <img :src="s.thumb" alt="" decoding="async" />
          </span>
          <span class="thumb-label">{{ s.eyebrow[locale] }}</span>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.platform-gallery {
  --tone-green: #15803d;
  --tone-teal: #0e7490;
  --tone-blue: #1d4ed8;
  --tone-magenta: #be185d;
  --tone-purple: #6d28d9;
  --tone-red: #c2410c;
  --tone-amber: #b45309;
  --tone-cyan: #0369a1;
  --gutter: 24px;
  margin: 0 auto;
  padding: 80px var(--gutter) 0;
  max-width: calc(1152px + var(--gutter) * 2);
}

.dark .platform-gallery {
  --tone-green: #4ade80;
  --tone-teal: #2dd4bf;
  --tone-blue: #60a5fa;
  --tone-magenta: #f472b6;
  --tone-purple: #a78bfa;
  --tone-red: #fb923c;
  --tone-amber: #fbbf24;
  --tone-cyan: #38bdf8;
}

@media (min-width: 640px) {
  .platform-gallery {
    --gutter: 48px;
    padding-top: 128px;
  }
}

@media (min-width: 960px) {
  .platform-gallery {
    --gutter: 64px;
  }
}

.tone--green { --tone: var(--tone-green); }
.tone--teal { --tone: var(--tone-teal); }
.tone--blue { --tone: var(--tone-blue); }
.tone--magenta { --tone: var(--tone-magenta); }
.tone--purple { --tone: var(--tone-purple); }
.tone--red { --tone: var(--tone-red); }
.tone--amber { --tone: var(--tone-amber); }
.tone--cyan { --tone: var(--tone-cyan); }

svg {
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

/* Platform switch */
.tabs {
  display: flex;
  gap: 4px;
  margin: 32px auto 0;
  padding: 5px;
  width: fit-content;
  border-radius: 999px;
  background: var(--vp-c-default-soft);
}

.tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 9px 20px;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  line-height: 22px;
  color: var(--vp-c-text-2);
  transition: color 0.2s, background-color 0.2s, box-shadow 0.2s;
}

.tab:hover {
  color: var(--vp-c-text-1);
}

.tab.active {
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.dark .tab.active {
  background: var(--vp-c-bg-elv);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}

/* Stage */
.panel {
  margin-top: 28px;
}

.stage {
  overflow: hidden;
  margin: 0 calc(var(--gutter) * -1 + 16px);
  padding: 32px 16px 40px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 24px;
  background: var(--home-stage-bg);
}

.caption {
  margin: 0 auto;
  max-width: 720px;
  text-align: center;
  animation: caption-in 0.35s ease;
}

@keyframes caption-in {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
}

.caption-eyebrow {
  margin: 0;
  font-size: 12px;
  font-weight: 700;
  line-height: 18px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--tone);
}

.caption-title {
  margin: 8px 0 0;
  font-size: 24px;
  font-weight: 800;
  line-height: 1.25;
  letter-spacing: -0.025em;
  color: var(--vp-c-text-1);
  word-break: keep-all;
  text-wrap: balance;
}

.caption-details {
  margin: 8px 0 0;
  font-size: 15px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  word-break: keep-all;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.device-row {
  display: flex;
  justify-content: center;
  margin-top: 28px;
}

/* The active device sets the height; the others sit on top of it, faded out. */
.devices {
  position: relative;
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  align-items: flex-start;
  min-width: 0;
}

.device {
  width: 100%;
  max-width: 720px;
  transition: opacity 0.35s ease, transform 0.35s ease;
}

.device:not(.active) {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  margin: 0 auto;
  opacity: 0;
  transform: scale(0.96);
  pointer-events: none;
}

.device-phone {
  width: 220px;
}

.device img {
  z-index: 0;
  opacity: 0;
  transition: opacity 0.45s ease;
}

.device img.previous {
  z-index: 1;
  opacity: 1;
}

.device img.active {
  z-index: 2;
  opacity: 1;
}

/* Swipe or tap thumbnails on narrow screens; arrows appear on wide ones. */
.arrow {
  display: none;
}

/* Thumbnails */
.thumbs {
  display: flex;
  gap: 8px;
  margin: 20px calc(var(--gutter) * -1) 0;
  padding: 4px var(--gutter);
  overflow-x: auto;
  scrollbar-width: none;
  animation: thumbs-in 0.35s ease;
}

@keyframes thumbs-in {
  from {
    opacity: 0;
  }
}

.thumbs::-webkit-scrollbar {
  display: none;
}

/* Centers the strip when it fits and keeps both ends reachable when it scrolls. */
.thumbs > :first-child {
  margin-left: auto;
}

.thumbs > :last-child {
  margin-right: auto;
}

.thumb {
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  padding: 6px 4px;
  width: 104px;
  border-radius: 14px;
}

.thumbs-phone .thumb {
  width: 88px;
}

.thumb-img {
  position: relative;
  display: block;
  overflow: hidden;
  width: 96px;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background: #1a1c1e;
  box-shadow: 0 0 0 1px var(--vp-c-divider);
  transition: transform 0.2s, box-shadow 0.2s;
}

.thumbs-tablet .thumb-img {
  aspect-ratio: 2388 / 1668;
}

.thumbs-phone .thumb-img {
  width: 48px;
  aspect-ratio: 1206 / 2622;
}

.thumbs-phone .thumb--landscape {
  width: 104px;
}

.thumbs-phone .thumb--landscape .thumb-img {
  width: 96px;
  aspect-ratio: 2622 / 1206;
}

.thumb-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumb:hover .thumb-img {
  transform: translateY(-2px);
}

.thumb.active .thumb-img {
  box-shadow: 0 0 0 2px var(--vp-c-bg), 0 0 0 4px var(--tone);
}

.thumb-label {
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-align: center;
  color: var(--vp-c-text-2);
  transition: color 0.2s;
}

.thumb.active .thumb-label {
  font-weight: 600;
  color: var(--vp-c-text-1);
}

@media (min-width: 640px) {
  .stage {
    margin: 0;
    padding: 48px 32px 56px;
    border-radius: 32px;
  }

  .caption-title {
    font-size: 34px;
  }

  .caption-details {
    font-size: 17px;
  }

  .device-phone {
    width: 260px;
  }
}

@media (min-width: 960px) {
  .stage {
    padding: 48px 40px 56px;
  }

  .caption-eyebrow {
    font-size: 13px;
  }

  .caption-title {
    font-size: 38px;
  }

  .caption-details {
    font-size: 19px;
  }

  .device-row {
    align-items: center;
    gap: 48px;
    margin-top: 32px;
  }

  /* Sized so the caption, device, and thumbnails fit in one desktop screen. */
  .device-tablet {
    max-width: 600px;
  }

  .device-tv {
    max-width: 680px;
  }

  .device-phone {
    width: 240px;
  }

  .arrow {
    display: grid;
    flex-shrink: 0;
    place-items: center;
    width: 48px;
    height: 48px;
    border: 1px solid var(--vp-c-divider);
    border-radius: 50%;
    background: var(--vp-c-bg);
    color: var(--vp-c-text-1);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
    transition: border-color 0.2s, transform 0.2s;
  }

  .arrow:hover {
    border-color: var(--vp-c-text-3);
    transform: scale(1.05);
  }

  .dark .arrow {
    background: var(--vp-c-bg-elv);
  }

  .thumbs {
    gap: 12px;
    margin-top: 24px;
  }

  .thumb {
    width: 128px;
  }

  .thumb-img {
    width: 120px;
  }

  .thumbs-phone .thumb {
    width: 112px;
  }

  .thumbs-phone .thumb-img {
    width: 56px;
  }

  .thumbs-phone .thumb--landscape {
    width: 128px;
  }

  .thumbs-phone .thumb--landscape .thumb-img {
    width: 120px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .caption,
  .thumbs {
    animation: none;
  }

  .thumb-img,
  .device,
  .device img {
    transition: none;
  }
}
</style>
