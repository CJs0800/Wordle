<template>
    <nav-bar />
    <div>
        <start-game-button />
        <old-games-button />
    </div>
</template>

<script>
import NavBar from "./NavBar.vue";
import StartGameButton from "./buttons/StartGameButton";
import OldGamesButton from "./buttons/OldGamesButton";

export default {
    name: "Home",
    components: {
        OldGamesButton: OldGamesButton,
        StartGameButton: StartGameButton,
        NavBar: NavBar,
    },

}
</script>