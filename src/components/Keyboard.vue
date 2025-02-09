<template>
    <div>
        <div  class="keyboard-container">
            <button 
                v-for="key in keys" 
                :key="key" 
                :id="'keyboard-' + key"
                :disabled="is_checking" 
                class="key" 
                @click="add_key(key)"
                :style="{ backgroundColor: get_keyboard_colors[key] }"
            >
                {{ key }}
            </button>
            <input id="enter" :disabled="is_checking" type="button" @click="check_word" value="Entrée" />
            <button :id="'keyboard-backspace'" :disabled="is_checking" class="key" @click="pop_key">⌫</button>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

export default {
    name: "Keyboard",
    data: function () {
        return {
            keys: "AZERTYUIOPQSDFGHJKLMWXCVBN",
            is_checking : false,
        };
    },
    
    computed: {
        ...mapGetters(["get_keyboard_colors"]),
    },

    methods : {
        ...mapMutations(['add_key']),
        ...mapMutations(['pop_key']),
        ...mapActions(['check_word']),

        async handle_key_press(event) {
            const key = event.key.toUpperCase();
            if (this.keys.includes(key)) {
                this.add_key(key);
            } else if (key === "ENTER" && !this.is_checking) {
                this.is_checking = true;
                await this.check_word();
                this.is_checking = false;
            } else if (key === "BACKSPACE" && !this.is_checking) {
                this.pop_key();
            }
        },
    },

    mounted() {
        window.addEventListener("keydown", this.handle_key_press);
    },
    beforeUnmount() {
        window.removeEventListener("keydown", this.handle_key_press);
    },
};
</script>