<template>
	<nav-bar />
  <home-button/>
	<div id="stats">
		<div id="averageStats">
			<div>
				<p>Temps moyen de jeu :<br>{{ formattedTime(get_average_time) }}</p>
			</div>
			<div>
				<p>Nombre de tentatives moyennes :<br>{{ get_average_tries }}</p>
			</div>
			<div>
				<p>Pourcentage de victoire :<br>{{ get_win_rate }}%</p>
			</div>
		</div>
		<div class="oldGames">
			<div v-for="game in get_previous_games" class="statGame">
				<p class="gameTitle"><u>Partie du {{ game.date }}</u></p>
				<ul>
					<li>Mot à deviner : <u><b>{{ game.answer }}</b></u></li>
					<li>Victoire : {{ game.win ? "✅" : "❌" }}</li>
					<li>Nombre de tentatives : {{ game.nbTries }}</li>
					<li>Temps de jeu : {{ formattedTime(game.elapsed_time) }}</li>
				</ul>
			</div>
		</div>
	</div>

</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "./NavBar";
import HomeButton from "./buttons/HomeButton.vue"

export default {
	name: 'Stats',
	components: {
    HomeButton: HomeButton,
		NavBar: NavBar,
	},
	computed: {
		...mapGetters(["get_previous_games", "get_win_rate", "get_average_time", "get_average_tries"]),
	},
	methods: {
		formattedTime(time) {
			const minutes = Math.floor(time / 60000);
			const seconds = Math.floor((time % 60000) / 1000);
			return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
		}
	}
}
</script>

<style scoped>
#averageStats {
	display: flex;
	gap: 15px;
	justify-content: space-evenly;
	border: solid;
	border-color: black;
	padding: 10px;
	margin-bottom: 1%;
}

#averageStats p {
	margin-bottom: 0%;
}

.oldGames {
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(400px, 0.75fr));
	justify-content: center;
	border: solid;
	border-color: black;
	padding: 10px;
	gap: 10px;
	
}

.statGame {
	min-width: 400px;
	border: solid;
	border-color: black;
	padding: 10px;
	box-sizing: border-box;
}

.statGame:hover {
	box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.gameTitle {
	align-content: center;
	font-size: 200%;
}

ul {
	text-align: left;
	list-style-type: none;
	padding: 0;
	margin: 0;
	
}

ul li {
	margin-bottom: 5px;
	padding: 5px;
	border-radius: 5px;
	
}

ul li:hover {
	background-color: #f1f1f1;
}
</style>