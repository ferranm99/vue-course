<template>
  <div v-if="show" class="alert" :style="{ backgroundColor }">
    <div>{{ message }}</div>
    <Btn circle type="danger" class="btn" @click="$emit('close')">&times;</Btn>
  </div>
</template>

<script>
import Btn from './Btn.vue';
export default {
  components: { Btn },
  props: {
    message: {
      required: true,
      type: String,
    },
    show: {
      required: true,
      type: Boolean,
    },
    type: {
      required: false,
      default: "danger",
      validator(value) {
        return ["danger", "warning", "info"].includes(value);
      }
    }
  },

  computed: {
    backgroundColor() {
      const options = {
        danger: "var(--danger-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)",
      }

      return options[this.type];
    }
  },

  emits: ['close'],
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

.btn {
  height: 50px;
  width: 50px;
  font-size: 50px;
}
</style>