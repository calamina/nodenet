<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const { name, color, size, nobg } = defineProps<{ name: string, color?: string | undefined, size?: string, nobg?: boolean }>()

const AsyncComponent = defineAsyncComponent(async () => import(`./icons/${name}.vue`))

const style = {
  width: size ? size + 'rem' : '1.5rem',
  height: size ? size + 'rem' : '1.5rem',
  backgroundColor: nobg ? 'transparent' : 'var(--bg-alt)',
  // backgroundColor: color ? color + '33' : '#2424241c',
}
</script>

<template>
  <template v-if="AsyncComponent">
    <!-- <AsyncComponent class="icon" :style="{ backgroundColor: color + '33' }" /> -->
    <AsyncComponent class="icon" :style="style" />
  </template>
</template>

<style scoped>
.icon {
  display: flex;
  flex-shrink: 0;
  /* width: 1.25rem;
  height: 1.25rem; */
  width: 2rem;
  height: 2rem;
  padding: 3px;
  border-radius: 4px;
  /* background-color: #2424241c; */
  background-color: var(--color-discrete);
  color: var(--color-discrete);
  color: var(--color-primary);
}
</style>