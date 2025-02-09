<template>
    <div>
        <div 
            class="key" 
            v-for="(l, index) in padded_word" 
            :id="`${l}${index}${general_id}`"
            :key="index" 
            :style="{ backgroundColor: this.feedback[index] }"
        >
            {{ l }}
        </div>
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
    name: "Word",
    props: {
        word: {
            type: String,
            required: false
        },
        is_past:{
            type: Boolean,
            required: true
        },
        general_id:{
            type: Number,
            required: false,
            default : -1
        }
    },
    data() {
        return {
            feedback: []
        }
    },
    computed : {

        padded_word() {
            if(this.word === undefined) {
                return Array(5).fill('');
            }

            const max_length = 5;
            const letters = this.word.split('');
            
            return [...letters, ...Array(max_length - letters.length).fill('')].slice(0, max_length);
        }
    },
    mounted() {
        if(this.is_past){
            this.feedback = this.$store.getters.get_feedback(this.padded_word, this.is_past);
        }
    },
}
</script>