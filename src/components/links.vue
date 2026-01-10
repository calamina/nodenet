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
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  padding: 0 4rem 4rem;
  gap: 4rem;
  grid-area: main;
  max-height: 100%;
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
  text-decoration: none;
  text-transform: capitalize;
  font-family: "IBM Plex Mono";

  &:hover {
    text-decoration: underline;
  }
}

@media (max-width: 1600px) {
  .categories {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    padding: 0 2rem 2rem;
    gap: 2rem 1rem;
  }
}
</style>