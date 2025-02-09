<template>
    <div>
        <h1>Archives</h1>
        <button id="stats_button" @click="show_stats">Consulter les parties précédentes</button>
    </div>
</template>

<script>
export default {
    name: "OldGamesButton",
    methods: {
        show_stats() {
            this.$router.push("/stats");
        }
    }
}
</script>

<style scoped>
div{
  border-width: medium;
  border-color: black;
  display: block;
  align-content: center;
}
</style>