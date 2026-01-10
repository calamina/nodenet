<script setup lang="ts">
import links from "./components/links.vue";
import notes from "./components/notes.vue";
import youtubeFeed from "./components/youtubeFeed.vue";
</script>

<template>
  <div class="grid">
    <marquee class="header" scrollamount="8">
      /!\ ALERT :: <span>mimis</span> have been seen in the wild /!\
      Beware, the <span>mimis</span> are
      particularly cute and should be apprehended ASAP !!!
    </marquee>
    <links class="links" />
    <youtube-feed class="youtube" />
    <notes class="notes" />
  </div>
</template>

<style scoped>
.grid {
  width: 100%;
  height: 100dvh;
  display: grid;
  grid-template-columns: auto 24rem;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header youtube"
    "links youtube"
    "links notes";
  place-items: center;
}

.header {
  width: 100%;
  grid-area: header;
  padding: 2rem 1rem;
  width: 100%;
  color: var(--color-discrete);

  span {
    color: #48a8af;
  }
}

.links {
  grid-area: links;
}

.youtube {
  grid-area: youtube;
}

.notes {
  grid-area: notes;
}
</style>
