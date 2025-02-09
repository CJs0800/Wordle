<template>
	<div>
		<input type="button" id="forfeit_button" value="Abandonner" @click="forfeit" />
    <!--- Faire le lien avec les routes --->
	</div>
</template>

<script>
  export default {
    name: "ForfeitButton",
    methods: {
      forfeit() {
        this.$router.push("/defeat");
      }
    }
  }
</script>