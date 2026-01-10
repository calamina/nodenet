<script setup lang="ts">
import { computedAsync } from '@vueuse/core';
import { ref, type Ref } from 'vue';
import type { Username } from '../model/username';
import { useDateFormat } from '../utils/useDateFormat';
import { getfeed } from '../utils/useFeed';
import HeaderBase from './HeaderBase.vue';

const evaluating = ref(false)
const selected: Ref<Username> = ref("justine")

const results = computedAsync(
  async () => await getfeed(selected.value),
  null,
  evaluating,
)

const update = async (username: Username) => selected.value = username;
</script>

<template>
  <div class="feed">
    <div class="header">
      <HeaderBase>youtube</HeaderBase>
      <div class="tabs">
        <button :class="{ 'button-tab-active': selected === 'gregoire' }" class="button-tab"
          @click="update('gregoire')">
          greggu
        </button>
        <button :class="{ 'button-tab-active': selected === 'justine' }" class="button-tab" @click="update('justine')">
          tomatine
        </button>
      </div>
    </div>
    <div v-if="evaluating" class="loading">
      Loading <span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span>
    </div>
    <div class="results" v-else>
      <div class="entry" v-for="result in results">
        <a :href="'https://www.youtube.com/watch?v=' + result.id">
          <img width="100" :src="`http://img.youtube.com/vi/${result.id}/sddefault.jpg`" alt="">
          {{ result.title }}
        </a>
        <p class="info">{{ useDateFormat(result.published) }} — {{ result.author.name }}</p>
        <p></p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.feed {
  display: flex;
  flex-flow: column;
  height: 100%;
  flex: 1;
  gap: 0.25rem;
  width: 100%;
  overflow-y: scroll;
  /* background-color: #e9d8c7; */
  background-color: var(--bg-alt);
  scrollbar-width: thin;
  /* scrollbar-color: #92877b transparent; */
  scrollbar-color: var(--color-secondary-dim) transparent;
}

.results {
  display: flex;
  flex-flow: column;
  padding: 0 2rem 1.5rem;
  gap: 0.75rem;
}

.entry {
  display: flex;
  flex-flow: column;
}

a {
  /* color: #242424; */
  font-weight: 500;
  text-decoration: none;
  line-height: 20px;
  /* font-size: 16px; */
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-primary);
}

img {
  border-radius: 4px;
  margin-bottom: .2rem;
}

.header {
  z-index: 2;
  padding: 0.75rem 2rem;
  /* background-color: #e9d8c7; */
  background-color: var(--bg-alt);
  display: flex;
  flex-flow: column;
  position: sticky;
  top: 0;
  align-items: baseline;
  gap: 0;
  /* gap: 1rem; */
  padding-bottom: .75rem;
}

.button-tab {
  font-variant: small-caps;
  font-size: 20px;
  font-size: 1.3rem;
  line-height: 18px;
  font-weight: 500;
  opacity: 0.4;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  /* &:first-of-type {
    margin-left: auto;
  } */

  &.button-tab-active {
    text-decoration: underline;
    opacity: 1;
  }
}

.info {
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--color-secondary-dim);
}

.loading {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  font-size: 16px;
  background-color: var(--bg);
  padding: 1rem;
  margin: 0.5rem .5rem 0.5rem 1rem;
  border-radius: 4px;
}

.dot1,
.dot2,
.dot3 {
  display: inline-flex;
  animation: updown ease-in-out .5s infinite;
}

.dot2 {
  animation-delay: .1s;
}

.dot3 {
  animation-delay: .2s;
}

@keyframes updown {
  0% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(0.25rem);
  }

  100% {
    transform: translateY(0);
  }
}
</style>