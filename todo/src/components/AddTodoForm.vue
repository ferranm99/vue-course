<template>
  <form class="add-todo-form">
    <input v-model="todoTitle" type="text" placeholder="Todo Title" />
    <div>
      <Btn :disabled="isLoading" type="submit" class="btn" @click.prevent="submit">
        <Spinner v-if="isLoading" />
        <span v-else>Add Todo</span>
      </Btn>
    </div>
  </form>
</template>

<script setup>
import Btn from "./Btn.vue";
import Spinner from "./Spinner.vue";
import { ref } from "vue";

const props = defineProps({
  isLoading: {
    default: false,
    type: Boolean
  }
})

const todoTitle = ref("")

function submit(){
  emit('submit', todoTitle.value)
  todoTitle.value = ""
}

const emit = defineEmits(["submit"])

</script>

<style scoped>
.add-todo-form {
  display: flex;
  justify-content: space-between;
}

.add-todo-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}

.btn {
  height: 50px;
}
</style>