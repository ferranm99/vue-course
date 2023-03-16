<template>
    <Alert :message="alert.message" :show="alert.show" :variant="alert.variant" @close="alert.show = false" />

    <section>
        <AddTodoForm :isLoading="isPostingTodo" @submit="addTodo" />
    </section>

    <section>
        <Spinner class="spinner" v-if="isLoading" />
        <div v-else>
            <Todo v-for="todo in todos" :key="todo.id" :title="todo.title" @remove="removeTodo(todo.id)"
                @edit="$router.push(`/todos/${todo.id}/edit`)" />
        </div>
    </section>
</template>
  
<script setup>
//with keyword setup we dont need to create setup(){} with all the components and return...
//react hooks = vue composables
//vue lifecycle hooks = lifecycle methods
//https://vueuse.org many pre-made composables

import Alert from "@/components/Alert.vue";
import AddTodoForm from "@/components/AddTodoForm.vue";
import Todo from "@/components/Todo.vue";
import Spinner from "@/components/Spinner.vue";
import axios from "axios";
import { ref, reactive } from "vue";
import { useFetch } from "@/composables/fetch";
import { useAlert } from "@/composables/alert";


const { alert, showAlert } = useAlert();

const isPostingTodo = ref(false)

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

</script>
  
<style scoped>
.spinner {
    margin: auto;
    margin-top: 30px;
}
</style>