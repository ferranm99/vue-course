<template>
  <Navbar />
  <main class="container">
    <Alert :show="showAlert" text="You need to type something first!" type="warning" @close="showAlert = false" />
    <section>
      <AddTodoForm @submit="passTodo" />
    </section>
    <TodosList ref="todos" />
    <section>

    </section>
  </main>
</template>

<script>
import AddTodoForm from './components/AddTodoForm.vue';
import Alert from './components/Alert.vue';
import Navbar from './components/Navbar.vue';
import TodosList from './components/TodosList.vue';
export default {
  components: {
    Alert,
    Navbar,
    AddTodoForm,
    TodosList
  },
  data() {
    return {
      showAlert: false
    }
  },
  methods: {
    passTodo(title) {
      if (title != "") {
        this.$refs.todos.addTodo(title)
        this.showAlert = false;
      } else {
        this.showAlert = true;
      }

    }
  }
};
</script>

<style scoped></style>