<script setup lang="ts">
const { border } = defineProps<{ border?: boolean }>()
</script>

<template>
  <h3 :style="{ borderBottomWidth: border ? '1px' : '0px' }">
    <slot />
  </h3>
</template>
<style scoped>
h3 {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: "Amstir";
  font-size: 3rem;
  line-height: 2.75rem;
  padding: 0.5rem 0;
  color: var(--color-secondary);
  text-transform: capitalize;
  width: 100%;
  border-bottom: 1px solid var(--color-discrete-dim);
}
</style>