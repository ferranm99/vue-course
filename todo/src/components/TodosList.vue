<template>
    <div v-for="todo in todos" class="todo" v-bind:key="todo.id">
        <p>{{ todo.title }}</p>
        <div>
            <button @click.prevent="removeTodo(todo.id)" class="remove-todo-btn">&times;</button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            todos: [],
        }
    },
    methods: {
        addTodo(title) {
            this.todos.push({
                title,
                id: Math.floor(Math.random() * 1000)
            })
        },
        removeTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id)
        }
    }

}
</script>

<style>
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
    cursor: pointer;
}
</style>