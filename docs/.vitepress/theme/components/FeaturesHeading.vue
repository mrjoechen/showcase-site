<script setup lang="ts">
import { computed } from "vue";
import HomeHeading from "./HomeHeading.vue";
import { homeCopy, useLocale } from "../screens";

const locale = useLocale();
const copy = computed(() => homeCopy[locale.value]);
</script>

<template>
  <div class="features-heading">
    <HomeHeading :eyebrow="copy.featuresEyebrow" :title="copy.featuresTitle" />
  </div>
</template>

<style scoped>
.features-heading {
  padding: 112px 24px 40px;
}

@media (min-width: 640px) {
  .features-heading {
    padding: 144px 48px 48px;
  }
}
</style>
