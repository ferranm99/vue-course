<template>
    <div v-if="show" class="alert" :style=" {backgroundColor}">
      <div>{{ text }}</div>
      <div @click="$emit('close')" class="close-alert">&times;</div>
    </div>
</template>

<script>
  export default {
    //props: ['show', 'text', 'type'],
    props:{
        text:{
            required: true,
            type: String,
        },
        show:{
            required: true,
            type: Boolean,
        },
        type: {
            default: "danger",
            validator(value){
                return ["danger", "warning", "info"].includes(value)
            }
        }
    },

    emits: ['close'],

    computed: {
        backgroundColor() {
        const options = {
            danger: "var(--danger-color)",
            info: "var(--info-color)",
            warning: "var(--warning-color)",
        }
        return options[this.type];
        }
    }
  };
</script>

<style scoped>
.alert {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding: 0 20px 0 20px;
  border-radius: 10px;
  height: 50px;
}
.close-alert{
  font-size: 50px;
  cursor: pointer;
}

</style>