<script setup lang="ts">
import { useData } from '../utils/useData';
import HeaderBase from './HeaderBase.vue';
import icon from './icon.vue';

const { links } = useData();
</script>

<template>
  <div class="categories">
    <div class="category" v-for="category in links" :key="category.title">
      <HeaderBase :border="true">{{ category.title }}</HeaderBase>
      <div class="entries">
        <a v-for="entry in category.content" :key="entry.title" :href="entry.url">
          <icon :name="entry.icon" :color="entry.color" />
          {{ entry.title }}
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.categories {
  /* display: flex; */
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  /* grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); */
  padding: 0 4rem 4rem;
  gap: 4rem;
  grid-area: main;
  max-height: 100%;
  /* place-items: center; */
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: var(--color-secondary-dim) transparent;
}

.category {
  display: flex;
  flex-flow: column;
  gap: .75rem;
}

.entries {
  display: flex;
  flex-flow: column;
  gap: .5rem;
}

a {
  display: flex;
  align-items: center;
  gap: .5rem;
  color: var(--color-secondary);
  /* font-weight: 500; */
  text-decoration: none;
  text-transform: capitalize;
  /* font-size: 1.2rem; */
  font-family: "IBM Plex Mono";

  &:hover {
    text-decoration: underline;
  }
}
</style>