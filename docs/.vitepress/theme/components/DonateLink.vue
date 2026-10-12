<script setup lang="ts">
import { computed } from "vue";
import { useData, withBase } from "vitepress";

const { localeIndex } = useData();

const zh = computed(() => localeIndex.value === "zh");
const link = computed(() => withBase(zh.value ? "/zh/donate" : "/donate"));
const label = computed(() => (zh.value ? "捐赠" : "Support"));
</script>

<template>
  <a class="donate-link" :href="link" :aria-label="label" :title="label">
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        d="M12 21s-9-5.6-9-12.2A5.3 5.3 0 0 1 12 5.6a5.3 5.3 0 0 1 9 3.2C21 15.4 12 21 12 21Z"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linejoin="round"
      />
    </svg>
  </a>
</template>

<style scoped>
.donate-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: var(--vp-c-text-2);
  transition: color 0.5s;
}

/* The social links sit 8px into the right edge at this width; keep the same rhythm. */
@media (min-width: 1280px) {
  .donate-link {
    margin: 0 -8px 0 8px;
  }
}

.donate-link:hover {
  color: #ff5f5f;
  transition: color 0.25s;
}

.donate-link:hover path {
  fill: currentColor;
}
</style>
