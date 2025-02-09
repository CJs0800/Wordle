<template>
    <div class="zoneEssai">
        <Word v-for="(word, i) in get_previous_words" :key="'prev-' + i" class="mot" :word="word" :is_past="true" :general_id="i" />
        
        <!-- Most disgusting and inefficient way of doing this :) -->

        <div v-show="get_max_tries - get_previous_words.length > 0">
            <Word :word="get_input" :is_past="false" />
        </div>
        
        <Word v-for="(i) in Math.max(get_max_tries - get_previous_words.length - 1, 0)" :key="'placeholder-' + i"
            class="mot" :is_past="false" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import Word from "./Word.vue";

export default {
    name: "ZoneEssai",
    components: {
        Word,
    },
    computed: {
        ...mapGetters(["get_previous_words", "get_max_tries", "get_input"]),
    },
};
</script>
