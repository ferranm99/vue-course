<template>
  <Navbar />

  <main class="container">
    <Modal :show="editTodoForm.show" @close="editTodoForm.show = false">
      <template v-slot:header>
        <h2>Edit Todo</h2>
      </template>
      <template v-slot:content>
        <form class="edit-todo-form">
          <div><label>Todo Title</label></div>
          <input type="text" v-model="editTodoForm.todo.title" />
        </form>
      </template>
      <template v-slot:footer>
        <div class="edit-todo-modal-footer">
          <Btn class="edit-todo-submit-btn" @click="updateTodo">Submit</Btn>
          <Btn variant="danger" @click="editTodoForm.show = false">Close</Btn>
        </div>
      </template>
    </Modal>

    <Alert :message="alert.message" :show="alert.show" :type="alert.type" @close="alert.show = false" />

    <section>
      <AddTodoForm @submit="addTodo" />
    </section>

    <section>
      <Todo v-for="todo in todos" :key="todo.id" :title="todo.title" @edit="showEditTodoForm(todo)"
        @remove="removeTodo(todo.id)" />
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
import axios from "axios";

export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    Todo,
    Modal,
    Btn
  },

  data() {
    return {
      todoTitle: "",
      todos: [],
      alert: {
        message: "",
        show: false,
        type: "danger"
      },
      editTodoForm: {
        show: false,
        todo: {
          id: 0,
          title: ""
        }
      }
    };
  },
  created(){
      this.fetchTodos()
    },

  methods: {
    async fetchTodos(){
      //const res = await fetch('http://localhost:8080/todos')
      try{
        const res = await axios.get('http://localhost:8080/todos')
        this.todos = res.data
      }catch(e){
        this.showAlert("Request failed")
      }
    },
    async addTodo(title) {
      if (title.trim() === "") {
        this.showAlert("Todo title required")
        return;
      } else {
        this.alert.show = false;
      }
      const res = await axios.post('http://localhost:8080/todos', {title})

      this.todos.push(res.data);
    },
    showAlert(m, type = "danger"){
      this.alert.message = m
      this.alert.show = true;
      this.alert.type = type
    },
    async removeTodo(id) {
      await axios.delete('http://localhost:8080/todos/' + id)
      //this.todos = this.todos.filter((todo) => todo.id !== id);
      this.fetchTodos()
    },
    showEditTodoForm(todo) {
      this.editTodoForm.show = true
      this.editTodoForm.todo = { ...todo } //copies the data of object instead of reference
    },
    updateTodo() {
      const todo = this.todos.find(todo => todo.id === this.editTodoForm.todo.id)
      todo.title = this.editTodoForm.todo.title
      this.editTodoForm.show = false
    }
  },
};
</script>

<style scoped>
.edit-todo-form>input {
  width: 100%;
  height: 30px;
  border: 1px solid var(--accent-color);
}

.edit-todo-modal-footer {
  display: flex;
  justify-content: end;
  padding: 10px;
}

.edit-todo-submit-btn {
  margin-right: 5px;
}
</style>