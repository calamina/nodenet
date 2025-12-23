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
      <button :class="{ 'button-tab-active': selected === 'gregoire' }" class="button-tab"
        @click="update('gregoire')">greggu</button>
      <button :class="{ 'button-tab-active': selected === 'justine' }" class="button-tab"
        @click="update('justine')">tomatine</button>
    </div>
    <div v-if="evaluating" class="loading">
      Loading <span class="dot1">.</span><span class="dot2">.</span><span class="dot3">.</span>
    </div>
    <div class="results" v-else>
      <div class="entry" v-for="result in results">
        <a :href="result.link">
          <img width="100" :src="`http://img.youtube.com/vi/${result.id}/sddefault.jpg`" alt="">
          {{ result.title }}
        </a>
        <p class="info">{{ useDateFormat(result.isoDate) }} — {{ result.author }}</p>
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
  width: 18rem;
  overflow: scroll;
  /* padding: 1rem; */
  /* background-color: #24242411; */
  background-color: #e9d8c7;
}

.results {
  padding: 0 1rem 0.5rem;
}

.entry {
  display: flex;
  flex-flow: column;
}

a {
  color: #242424;
  font-weight: 500;
  text-decoration: none;
  line-height: 20px;
  font-size: 16px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

img {
  border-radius: 4px;
  margin-bottom: .2rem;
}

.header {
  z-index: 2;
  padding: 0.5rem 1rem;
  background-color: #e9d8c7;
  display: flex;
  position: sticky;
  top: 0;
  align-items: baseline;
  gap: .25rem;
  padding-bottom: .5rem;
}

.button-tab {
  font-variant: small-caps;
  font-size: 20px;
  line-height: 18px;
  font-weight: 500;
  opacity: 0.4;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;

  &:first-of-type {
    margin-left: auto;
  }

  &.button-tab-active {
    text-decoration: underline;
    opacity: 1;
  }
}

.info {
  opacity: 0.4;
  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.loading {
  display: flex;
  font-weight: 500;
  font-size: 16px;
  background-color: #2424241c;
  padding: .15rem .5rem;
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