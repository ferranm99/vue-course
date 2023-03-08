<template>
    <div v-if="show" ref="modal" class="modal">
        <div class="modal-content">
            <div class="modal-header">
                <slot name="header" />
            </div>
            <div class="modal-body">
                <slot name="content" />
            </div>
            <div class="modal-footer">
                <slot name="footer" />
            </div>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        show: {
            default: false
        }
    },
    data() {
        return {
            clickListener: (e) => {
                if (e.target === this.$refs.modal)
                    this.$emit('close')
            },
            closeOnEscapeListener: (e) => {
                if (e.key === "Escape")
                    this.$emit('close')
            }
        }
    },
    emits: ['close'],    //hooks
    mounted() {
        console.log('listener added')
        window.addEventListener("click", this.clickListener)
        window.addEventListener("keydown", this.closeOnEscapeListener)
    },
    beforeUnmount(){
        console.log('listener removed')
        window.removeEventListener("click", this.clickListener)
        window.removeEventListener("keydown", this.closeOnEscapeListener)
    },
    beforeCreate() {
        console.log('before created')
    },
    created() {
        console.log('created')
    }
}
</script>

<style scoped>
.modal {
    position: fixed;
    z-index: 1;
    padding-top: 100px;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);
}

/* Modal Content */
.modal-content {
    position: relative;
    background-color: #fefefe;
    margin: auto;
    padding: 0;
    width: 80%;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    -webkit-animation-name: animatetop;
    -webkit-animation-duration: 0.4s;
    animation-name: animatetop;
    animation-duration: 0.4s
}

/* Add Animation */
@-webkit-keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

@keyframes animatetop {
    from {
        top: -300px;
        opacity: 0
    }

    to {
        top: 0;
        opacity: 1
    }
}

.modal-header {
    padding: 2px 16px;
    background-color: rgb(83, 83, 93);
    color: white;
}

.modal-body {
    padding: 2px 16px;
    background-color: var(--background-color);
    padding: 16px;
}

.modal-footer {
    padding: 2px 16px;
    background-color: rgb(83, 83, 93);
    color: white;
}
</style>