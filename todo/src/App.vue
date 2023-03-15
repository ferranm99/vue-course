<template>
  <Navbar />

  <main class="container">
    <EditTodoForm :show="editTodoForm.show" @close="editTodoForm.show = false" @submit="updateTodo"
      v-model="editTodoForm.todo.title" />

    <Alert :message="alert.message" :show="alert.show" :variant="alert.variant" @close="alert.show = false" />

    <section>
      <AddTodoForm :isLoading="isPostingTodo" @submit="addTodo" />
    </section>

    <section>
      <Spinner class="spinner" v-if="isLoading" />
      <div v-else>
        <Todo v-for="todo in todos" :key="todo.id" :title="todo.title" @remove="removeTodo(todo.id)"
          @edit="showEditTodoForm(todo)" />
      </div>
    </section>
  </main>
</template>

<script setup>
//with keyword setup we dont need to create setup(){} with all the components and return...
//react hooks = vue composables
//vue lifecycle hooks = lifecycle methods
//https://vueuse.org many pre-made composables

import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import AddTodoForm from "./components/AddTodoForm.vue";
import Todo from "./components/Todo.vue";
import Spinner from "./components/Spinner.vue";
import axios from "axios";
import EditTodoForm from "./components/EditTodoForm.vue";
import { ref, reactive } from "vue";
import { useFetch } from "./composables/fetch";
import { useAlert } from "./composables/alert";


const { alert, showAlert } = useAlert();

const isPostingTodo = ref(false)
const editTodoForm = reactive({
  show: false,
  todo: {
    id: 0,
    title: ""
  }
})

/*async function fetchTodos() {
  //const res = await fetch('http://localhost:8080/todos')
  isLoading.value = true;
  try {
    const res = await axios.get('/api/todos')
    todos.value = res.data
  } catch (e) {
    showAlert("Request failed")
  }
  isLoading.value = false;
}*/

const { data: todos, isLoading } = useFetch("/api/todos", {
  onError: (e) => showAlert('Failed loading todos')
})

async function addTodo(title) {
  if (title.trim() === "") {
    showAlert("Todo title required")
    return;
  } else {
    alert.show = false;
  }
  isPostingTodo.value = true;
  const res = await axios.post('/api/todos', { title })
  isPostingTodo.value = false;
  todos.value.push(res.data);
}

async function removeTodo(id) {
  await axios.delete(`/api/todos/${id}`);
  todos.value = todos.value.filter((todo) => todo.id !== id);
}

function showEditTodoForm(todo) {
  editTodoForm.show = true
  editTodoForm.todo = { ...todo } //copies the data of object instead of reference
}

async function updateTodo() {
  isLoading.value = true;
  try {
    await axios.put('/api/todos/' + editTodoForm.todo.id, editTodoForm.todo)
    const todo = todos.value.find(todo => todo.id === editTodoForm.todo.id)
    todo.title = editTodoForm.todo.title
  } catch (e) {
    showAlert("Edit failed")
  }
  isLoading.value = false;
  editTodoForm.show = false
}

</script>

<style scoped>
.spinner {
  margin: auto;
  margin-top: 30px;
}
</style>