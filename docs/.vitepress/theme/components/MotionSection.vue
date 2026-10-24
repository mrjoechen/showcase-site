<script setup lang="ts">
import { computed } from "vue";
import HomeHeading from "./HomeHeading.vue";
import StyleReel from "./StyleReel.vue";
import { homeCopy, useLocale } from "../screens";
import stylePicker from "../../../images/app/style-picker.mp4";
import stylePickerPoster from "../../../images/app/style-picker-poster.webp";
import playback from "../../../images/app/playback.mp4";
import playbackPoster from "../../../images/app/playback-poster.webp";

const locale = useLocale();
const copy = computed(() => homeCopy[locale.value]);

const videos = computed(() => [
  {
    src: stylePicker,
    poster: stylePickerPoster,
    width: 1280,
    height: 576,
    label: copy.value.stylePickerLabel,
    caption: copy.value.stylePickerCaption,
  },
  {
    src: playback,
    poster: playbackPoster,
    width: 1280,
    height: 590,
    label: copy.value.playbackLabel,
    caption: copy.value.playbackCaption,
  },
]);
</script>

<template>
  <section class="motion">
    <HomeHeading
      :eyebrow="copy.motionEyebrow"
      :title="copy.motionTitle"
      :details="copy.motionDetails"
    />

    <StyleReel />

    <div class="videos">
      <figure v-for="video in videos" :key="video.src">
        <video
          :src="video.src"
          :poster="video.poster"
          :width="video.width"
          :height="video.height"
          :aria-label="video.label"
          controls
          muted
          loop
          playsinline
          preload="none"
        />
        <figcaption>{{ video.caption }}</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.motion {
  margin: 0 auto;
  padding: 112px 24px 0;
  max-width: calc(1152px + 48px);
}

@media (min-width: 640px) {
  .motion {
    padding: 144px 48px 0;
    max-width: calc(1152px + 96px);
  }
}

@media (min-width: 960px) {
  .motion {
    padding: 144px 64px 0;
    max-width: calc(1152px + 128px);
  }
}

.videos {
  display: grid;
  gap: 24px;
  margin-top: 48px;
}

figure {
  margin: 0;
}

video {
  display: block;
  width: 100%;
  height: auto;
  border: 1px solid var(--vp-c-divider);
  border-radius: 16px;
  background: #1a1d1e;
}

figcaption {
  margin-top: 10px;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: var(--vp-c-text-2);
}

@media (min-width: 768px) {
  .videos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
