<template>
	<div>
		<div>{{ formattedTime }}</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { mapMutations } from "vuex/dist/vuex.cjs.js";

export default {
	name: "Chrono",
	computed: {
		...mapState(["elapsed_time"]),
		formattedTime() {
			if (!this.elapsed_time) return "00:00";
			const minutes = Math.floor(this.elapsed_time / 60000);
			const seconds = Math.floor((this.elapsed_time % 60000) / 1000);

			const max_time = 10;

			if (minutes >= max_time) {
				this.stop_game();
				this.pause();
			}

			return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
		},
	},
	methods: {
		...mapActions(["start", "pause", "reset"]),
		...mapMutations(["stop_game"])
	},
	mounted() {
		this.start();
	},
	beforeUnmount() {
		this.stop_game();
		this.reset();
	}
};
</script>