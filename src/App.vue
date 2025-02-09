<template>
    <div>
        <router-view />
    </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Word from "./components/Word.vue";
import Game from './components/Game.vue';
import Keyboard from './components/Keyboard.vue';
import Chrono from "./components/Chrono";
import Stats from "./components/Stats";
import Home from "./components/Home";

export default {
    name: 'App',
    components: {
        Stats,
        Keyboard,
        NavBar: NavBar,
        Word: Word,
        Game: Game,
        Home: Home,
    },
}
</script>