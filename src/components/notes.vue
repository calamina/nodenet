<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import HeaderBase from './HeaderBase.vue';
import icon from './icon.vue';
import { v4 as uuidv4 } from 'uuid';
import type { Note } from '../model/note';

const storedNotes = localStorage.getItem('notes')
const newnote = ref(null)
const notes: Ref<Note[]> = ref(JSON.parse(storedNotes ?? "[]"))
console.debug(notes.value)

watch(notes, () => updateStorage(), { deep: true })

const addNote = () => {
  if (!newnote.value) return

  notes.value.push({
    id: uuidv4(),
    text: newnote.value ?? "",
    status: "todo"
  })

  newnote.value = null;
}

const deleteNote = (id: string) => {
  notes.value = notes.value.filter(note => note.id !== id);
}

const toggleStatus = (note: Note) => {
  note.status = note.status === 'done' ? 'todo' : 'done'
}

const updateStorage = () => {
  localStorage.setItem('notes', JSON.stringify(notes.value));
}
</script>

<template>
  <div class="container">
    <div class="list">
      <HeaderBase class="header">notes</HeaderBase>
      <div v-for="note in notes" class="notes">
        <button class="check" @click="toggleStatus(note)">
          <icon v-if="note.status === 'todo'" name="check-not" size="1.5" :nobg="true" />
          <icon v-else name="check" size="1.5" :nobg="true" />
        </button>
        <p class="text" :style="{ opacity: note.status === 'done' ? 0.4 : 1 }">{{ note.text }}</p>
        <button @click="deleteNote(note.id)">
          <icon name="close" size="1.3" :nobg="true" />
        </button>
      </div>
    </div>
    <form @submit.prevent="addNote">
      <input type="text" name="note" id="note" placeholder="Add note [enter]" v-model="newnote" autocomplete="off">
      <!-- <button class="add" type="submit">
        <icon name="plus" size="1.5" />
      </button> -->
    </form>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-flow: column;
  height: fit-content;
  max-height: 40dvh;
  width: 100%;
  overflow-y: scroll;
  scrollbar-width: thin;
  /* scrollbar-color: #92877b transparent; */
  scrollbar-color: var(--color-secondary-dim) transparent;
  /* background-color: #c5b4a4; */
  background-color: var(--bg-alter);
}

.list {
  display: flex;
  flex-flow: column;
  gap: .25rem;
  padding: 0.7rem 2rem 0.75rem;
}

.header {
  padding: 0.75rem 0rem 1rem;
}

.notes {
  width: 100%;
  display: flex;
  /* align-items: center; */
  justify-content: center;
  gap: .5rem;

  button:last-of-type {
    margin-left: auto;
  }
}

button {
  flex-shrink: 0;
  background-color: transparent;
  border: none;
  outline: none;
}

form {
  position: sticky;
  bottom: 0;
  margin-top: auto;
  width: 100%;
  display: flex;
  /* background-color: #c5b4a4; */
  background-color: var(--bg-alter);
  padding: 0 2rem 1.5rem;

  input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    font-size: 17px;
    padding: 0 0.25rem;
    border-bottom: 1px solid var(--color-secondary-dim);
    /* background-color: #24242433; */
  }
}

.check {
  width: 1.5rem;
  padding: 0;
  margin: 0;
}

.add {
  flex-shrink: 0;
}

.text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>