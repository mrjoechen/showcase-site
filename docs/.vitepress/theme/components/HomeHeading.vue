<script setup lang="ts">
defineProps<{ eyebrow: string; title: string; details?: string }>();
</script>

<template>
  <div class="home-heading">
    <p class="eyebrow">{{ eyebrow }}</p>
    <h2 class="title">{{ title }}</h2>
    <p v-if="details" class="details">{{ details }}</p>
  </div>
</template>

<style scoped>
.home-heading {
  margin: 0 auto;
  max-width: 720px;
  text-align: center;
}

.eyebrow {
  margin: 0;
  font-size: 13px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
}

/* Scoped selectors outrank .vp-doc h2 and p when this is used inside Markdown. */
.title {
  margin: 10px 0 0;
  padding: 0;
  border: 0;
  font-size: 30px;
  font-weight: 800;
  line-height: 1.15;
  letter-spacing: -0.025em;
  color: var(--vp-c-text-1);
  word-break: keep-all;
  text-wrap: balance;
}

.details {
  margin: 14px 0 0;
  font-size: 17px;
  line-height: 1.6;
  color: var(--vp-c-text-2);
  word-break: keep-all;
  overflow-wrap: anywhere;
  text-wrap: pretty;
}

@media (min-width: 640px) {
  .title {
    font-size: 40px;
  }

  .details {
    font-size: 19px;
  }
}
</style>
