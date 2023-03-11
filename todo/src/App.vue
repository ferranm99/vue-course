<template>
  <Navbar />

  <main class="container">
    <EditTodoForm
      :show="editTodoForm.show"
      @close="editTodoForm.show = false"
      @submit="updateTodo"
      v-model="editTodoForm.todo.title"
    />

    <Alert 
      :message="alert.message" 
      :show="alert.show" 
      :variant="alert.variant" 
      @close="alert.show = false" 
      />

    <section>
      <AddTodoForm :isLoading="isPostingTodo" @submit="addTodo" />
    </section>

    <section>
      <Spinner class="spinner" v-if="isLoading" />
      <div v-else>
        <Todo 
          v-for="todo in todos" 
          :key="todo.id" 
          :title="todo.title" 
          @remove="removeTodo(todo.id)"
          @edit="showEditTodoForm(todo)" />
      </div>
    </section>
  </main>
</template>

<script>
import Alert from "./components/Alert.vue";
import Navbar from "./components/Navbar.vue";
import AddTodoForm from "./components/AddTodoForm.vue";
import Todo from "./components/Todo.vue";
import Modal from "./components/Modal.vue";
import Btn from "./components/Btn.vue";
import Spinner from "./components/Spinner.vue";
import axios from "axios";
import EditTodoForm from "./components/EditTodoForm.vue";

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn,
    Spinner,
    EditTodoForm
},

  data() {
    return {
      todoTitle: "",
      todos: [],
      alert: {
        message: "",
        show: false,
        variant: "danger"
      },
      isLoading: false,
      isPostingTodo: false,
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          title: ""
        }
      }
    };
  },
  created() {
    this.fetchTodos()
  },

  methods: {
    async fetchTodos() {
      //const res = await fetch('http://localhost:8080/todos')
      this.isLoading = true;
      try {
        const res = await axios.get('/api/todos')
        this.todos = res.data
      } catch (e) {
        this.showAlert("Request failed")
      }
      this.isLoading = false;
    },
    async addTodo(title) {
      if (title.trim() === "") {
        this.showAlert("Todo title required")
        return;
      } else {
        this.alert.show = false;
      }
      this.isPostingTodo = true;
      const res = await axios.post('/api/todos', { title })
      this.isPostingTodo = false;
      this.todos.push(res.data);
    },
    showAlert(m, variant = "danger") {
      this.alert.message = m
      this.alert.show = true;
      this.alert.variant = variant
    },
    async removeTodo(id) {
      await axios.delete('/api/todos/' + id)
      //this.todos = this.todos.filter((todo) => todo.id !== id);
      this.fetchTodos()
    },
    showEditTodoForm(todo) {
      this.editTodoForm.show = true
      this.editTodoForm.todo = { ...todo } //copies the data of object instead of reference
    },
    async updateTodo() {
      this.isLoading = true;
      try {
        await axios.put('/api/todos/' + this.editTodoForm.todo.id, this.editTodoForm.todo)
        const todo = this.todos.find(todo => todo.id === this.editTodoForm.todo.id)
        todo.title = this.editTodoForm.todo.title
      } catch (e) {
        this.showAlert("Edit failed")
      }
      this.isLoading = false;
      this.editTodoForm.show = false
    }
  },
};
</script>

<style scoped>
.spinner {
  margin: auto;
  margin-top: 30px;
}
</style>