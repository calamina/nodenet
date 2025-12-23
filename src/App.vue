<script setup lang="ts">
import HeaderBase from "./components/HeaderBase.vue";
import Icon from "./components/icon.vue";
import notes from "./components/notes.vue";
import youtubeFeed from "./components/youtubeFeed.vue";

import { useData } from "./utils/useData.ts";

const { links, rss } = useData();
</script>

<template>
  <div class="grid">
    <div class="categories">
      <div class="category" v-for="category in links" :key="category.title">
        <HeaderBase>{{ category.title }}</HeaderBase>
        <div class="entries">
          <a v-for="entry in category.content" :key="entry.title" :href="entry.url">
            <icon :name="entry.icon" :color="entry.color" />
            {{ entry.title }}
            <!-- <span v-if="entry.description" class="description">{{ entry.description }}</span> -->
          </a>
        </div>
      </div>
    </div>
    <youtube-feed class="youtube" />
    <notes class="notes" />
  </div>
</template>

<style scoped>
.grid {
  width: 100%;
  height: 100dvh;
  display: grid;
  grid-template-columns: auto 18rem;
  grid-template-rows: auto 18rem;
  grid-template-areas:
    "main youtube"
    "main notes";
  place-items: center;
}

.categories {
  display: flex;
  gap: 4rem;
  grid-area: main;
}

.category {
  display: flex;
  flex-flow: column;
  gap: .75rem;
}

.youtube {
  grid-area: youtube;
}

.notes {
  grid-area: notes;
}

.entries {
  display: flex;
  flex-flow: column;
  gap: .4rem;
}

a {
  display: flex;
  align-items: center;
  gap: .4rem;
  color: #242424;
  font-weight: 500;
  text-decoration: none;
  text-transform: capitalize;

  &:hover {
    text-decoration: underline;
  }
}

/* 
.description {
  opacity: 0.3;
  text-transform: lowercase;
  font-style: italic;
  font-size: 16px;
  font-weight: 800;
} */
</style>
