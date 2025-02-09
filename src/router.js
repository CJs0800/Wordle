import { createWebHistory, createRouter } from "vue-router";
import App from "@/App";
import Home from "@/components/Home";
import Game from "@/components/Game";
import Stats from "./components/Stats.vue";
import Defeat from "./components/Defeat.vue";

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home, /* <--- Change it */
    },
    {
        path: "/game",
        name: "Game",
        component: Game
    },
    {
        path: "/stats",
        name: "Stats",
        component: Stats
    },
    {
        path : "/defeat",
        name : "Defeat",
        component : Defeat
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;