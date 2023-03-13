<template>
    <button class="btn" :style="{ backgroundColor }" :class="{ circle: applyCircleClass }" v-bind="$attrs">
        <slot />
    </button>
</template>
  
<script setup>
import { computed } from "vue";

const props = defineProps({
    circle: {
        default: false,
        type: Boolean,
    },
    variant: {
        default: "success",
        type: String
    }
})

const backgroundColor = computed(() => {
    const options = {
        danger: "var(--danger-color)",
        info: "var(--info-color)",
        warning: "var(--warning-color)",
        success: "var(--accent-color)",
        secondary: "var(--secondary-color)",
    };

    return options[props.variant];
});

const applyCircleClass = computed(() => {
    return props.circle;
})

</script>
  
<style scoped>
.btn {
    color: var(--text-color);
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.btn:disabled {
    opacity: 80%;
}

.circle {
    border-radius: 50%;
}
</style>