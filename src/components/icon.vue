<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const { name, color } = defineProps<{ name: string, color?: string | undefined }>()

const AsyncComponent = defineAsyncComponent(async () => import(`./icons/${name}.vue`))
</script>

<template>
  <template v-if="AsyncComponent">
    <!-- <AsyncComponent class="icon" :style="{ backgroundColor: color + '33' }" /> -->
    <AsyncComponent class="icon" />
  </template>
</template>

<style scoped>
.icon {
  display: flex;
  flex-shrink: 0;
  width: 1.25rem;
  height: 1.25rem;
  padding: 3px;
  border-radius: 4px;
  background-color: #2424241c;
  color: #747270;
}
</style>