<template>
  <div id="defeat">
    <nav-bar/>
    <home-button/>
    <zone-essai/>
    <p>Le mot à trouver était {{ get_answer }}.</p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import HomeButton from "./buttons/HomeButton.vue";
import ZoneEssai from "./ZoneEssai.vue";
import NavBar from "./NavBar.vue";


export default {
	name: "Defaite",
	components: {
		NavBar: NavBar,
		ZoneEssai: ZoneEssai,
		HomeButton: HomeButton,
	},
	computed: {
		...mapGetters(["get_answer"]),
	},
}
</script>