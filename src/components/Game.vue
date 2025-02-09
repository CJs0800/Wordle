<template>
	<div id="game">
		<nav-bar />
		<chrono/>
		<div v-show="get_win">
			<home-button/>
		</div>
		<div>
			<forfeit-button/>
		</div>
		
		<div id="info_invalid_word" v-show="!get_is_word">Le mot n'est pas dans la liste.</div>
		<div id="info_victory" v-show="get_win">Victoire!</div>
		<zone-essai />
		<keyboard />
	</div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

import NavBar from "./NavBar.vue";
import Chrono from './Chrono.vue';
import ZoneEssai from "./ZoneEssai.vue";
import Keyboard from './Keyboard.vue';
import HomeButton from "./buttons/HomeButton.vue";
import ForfeitButton from "./buttons/ForfeitButton.vue";

export default {
	name: "Game",
	components: {
		ForfeitButton: ForfeitButton,
		HomeButton: HomeButton,
		NavBar: NavBar,
		Chrono: Chrono,
		ZoneEssai: ZoneEssai,
		Keyboard: Keyboard,
	},
	computed: {
		...mapGetters(["get_win", "get_is_word"]),
	},
	methods: {
		...mapActions(['get_random_word']),
	},
	mounted() {
		this.get_random_word();
	}
}
</script>

<style>
	#game {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}
	#info_invalid_word {
		color: red;
	}
	#info_victory {
		color: green;
	}
</style>