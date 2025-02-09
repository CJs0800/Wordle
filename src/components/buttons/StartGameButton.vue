<template>
	<div>
		<h1>Nouvelle Partie</h1>
		<button id="new_game_button" @click="start_game">Commencer une partie</button>
	</div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: "StartGameMain",
	methods: {
		...mapMutations(["reset_game"]),
		start_game() {
			this.reset_game();
			this.$router.push("/game");
		}
	}
}
</script>

<style scoped>
div {
	border-width: medium;
	border-color: black;
	display: block;
	align-content: center;
}
</style>