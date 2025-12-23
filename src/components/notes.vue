<script setup lang="ts">
import { ref, type Ref } from 'vue';
import HeaderBase from './HeaderBase.vue';
interface Note {
  id: symbol,
  text: string,
  status: "done" | "todo",
}

const newnote = ref(null)
const notes: Ref<Note[]> = ref([])

const addNote = () => {
  if (!newnote.value) return

  notes.value.push({
    id: Symbol(),
    text: newnote.value ?? "",
    status: "todo"
  })

  newnote.value = null;
  // todo: persist in localstorage !
  // updateStorage()
}

const deleteNote = (id: symbol) => {
  notes.value = notes.value.filter(note => note.id !== id)
  // updatestorage()
}

const toggleStatus = (note: Note) => {
  note.status = note.status === 'done' ? 'todo' : 'done'
}

</script>

<template>
  <div class="notes">
    <HeaderBase>notes</HeaderBase>
    <div v-for="note in notes" class="note">
      <button @click="toggleStatus(note)">[{{ note.status === 'todo' ? " " : "x" }}]</button>
      <p :style="{ textDecoration: note.status === 'done' ? 'line-through' : 'none' }">{{ note.text }}</p>
      <button @click="deleteNote(note.id)">dont :(</button>
    </div>
    <form @submit.prevent="addNote">
      <input type="text" name="note" id="note" placeholder="do the stuff" v-model="newnote">
      <button type="submit">do!</button>
    </form>
  </div>
</template>

<style scoped>
.notes {
  display: flex;
  flex-flow: column;
  gap: .5rem;
  height: 100%;
  width: 18rem;
  overflow: scroll;
  padding: 1rem;
  background-color: #c5b4a4;
}

.note {
  display: flex;
  gap: .5rem;

  button:last-of-type {
    margin-left: auto;
  }
}

button {
  background-color: transparent;
  border: none;
  outline: none;
}

form {
  margin-top: auto;
  width: 100%;
  display: flex;

  input {
    width: 100%;
    background-color: transparent;
    border: none;
    outline: none;
    border-bottom: 1px solid #24242433;
  }
}
</style>