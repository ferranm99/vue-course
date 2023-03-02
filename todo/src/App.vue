<template>
  <nav class="navbar">
    <img src="./assets/logo.svg" width="50" />
    <div class="brand">Todo List App</div>
  </nav>

  <main class="container">
    <Alert :show="showAlert" text="You need to type something first!" type="warning" @close="showAlert = false"/>
    <section>
      <form class="add-todo-form">
        <!-- v-on:input="(e) => todoTitle = e.target.value" is the same as below-->
        <input v-model="todoTitle" type="text" placeholder="Todo Title" />
        <div>
          <button @click.prevent="addTodo">Add Todo</button>
        </div>
      </form>
    </section>

    <section>
      <div v-for="todo in todos" class="todo" v-bind:key="todo.id">
        <p>{{ todo.title }}</p>
        <div>
          <button @click.prevent="removeTodo(todo.title)" class="remove-todo-btn">&times;</button>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import Alert from './components/Alert.vue';
  export default {
    components:{
      Alert,
    },
    data(){
      return {
        todoTitle : "",
        todos: [],
        showAlert: false
      }
    },
    methods : {
      addTodo(){
        if(this.todoTitle != ""){
          this.todos.push({
            title: this.todoTitle,
            id: Math.floor(Math.random()*1000)
          })
          this.showAlert = false;
        }else{
          this.showAlert = true;
        }
        this.todoTitle = ""
      },
      removeTodo(title){
        this.todos = this.todos.filter(todo => todo.title !== title)
      }
    }
  };
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background: var(--navbar-color);
  padding: 20px;
  margin-bottom: 30px;
}

.brand {
  font-size: 2rem;
}

.add-todo-form {
  display: flex;
  justify-content: space-between;
}

.add-todo-form input {
  width: 80%;
  border: solid 2px var(--accent-color);
}

.add-todo-form button {
  background: var(--accent-color);
  color: var(--text-color);
  border: none;
  height: 50px;
}

.todo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--accent-color);
  margin-top: 30px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
}

.remove-todo-btn {
  border-radius: 50%;
  border: none;
  height: 40px;
  width: 40px;
  font-size: 30px;
  color: var(--text-color);
  background: var(--danger-color);
  cursor:pointer;
}
</style>