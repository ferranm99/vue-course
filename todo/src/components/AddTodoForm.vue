<template>
    <form class="add-todo-form">
        <!-- v-on:input="(e) => todoTitle = e.target.value" is the same as below-->
        <input v-model="todoTitle" type="text" placeholder="Todo Title" />
        <div>
            <button @click.prevent="submit">Add Todo</button>
        </div>
    </form>
</template>

<script>
export default {
    data() {
        return {
            todoTitle: "",

        };

    },
    emits: ['submit'],
    methods:{
        submit(){
            this.$emit('submit', this.todoTitle);
            this.todoTitle = ""
        }
    },
}
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

.add-todo-form button {
    background: var(--accent-color);
    color: var(--text-color);
    border: none;
    height: 50px;
}
</style>