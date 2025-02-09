import {createStore} from 'vuex'
import axios from 'axios';

import router from './router';

const _word_max_length = 5;
const _max_tries = 6;

const grey = "#f0f0f0";
const green = "#538D4E";
const orange = "#B59F3B";

export const store = createStore({
    state() {
        return {
            elapsed_time: 0,
            is_running: false,
            interval : null,
            previous_words : [],
            current_word : "",
            answer : "",
            win : false,
            is_word : true,
            max_tries : _max_tries,
            word_max_length : _word_max_length,
            keyboard_colors : {},
            current_game_finished : false,
            previous_games : [],
        }
    },
    getters: {
        get_win: (state) => state.win,
        get_answer: (state) => state.answer,
        get_remaining_time: (state) => state.elapsed_time,
        get_input: (state) => state.current_word,
        get_previous_words: (state) => state.previous_words,
        get_previous_games: (state) => state.previous_games,
        get_word_max_length: (state) => state.word_max_length,
        get_max_tries: (state) => state.max_tries,
        get_is_word : (state) => state.is_word,
        get_keyboard_colors: (state) => state.keyboard_colors,
        get_current_game_finished: (state) => state.current_game_finished,
        get_average_time: (state) => {
            if (state.previous_games.length === 0){
                return 0;
            }
            return state.previous_games.reduce((sum, game) => sum + game.elapsed_time, 0) / state.previous_games.length;
        },
        get_average_tries: (state) => {
            if (state.previous_games.length === 0){
                return 0;
            }
            const res = state.previous_games.reduce((sum, game) => sum + game.nbTries, 0) / state.previous_games.length;
            return parseFloat(res.toFixed(3));
        },
        get_win_rate: (state) => {
            if (state.previous_games.length === 0){
                return 0;
            }
            return Math.round(state.previous_games.reduce((sum, game) => {
                if (game.win) { 
                    return sum + 1 
                } else { 
                    return sum } 
                }, 0) * 100 / state.previous_games.length);
        },

        get_feedback: (state) => (word, is_past) => {
            const secretLetterCount = {};
            const feedback = Array(state.word_max_length).fill(grey);
            
            if(!is_past) return feedback;

            // Étape 1 : Identifier les lettres bien placées (vertes)
            for (let i = 0; i < word.length; i++) {
                if (word[i] === state.answer[i]) {
                    feedback[i] = green;
                } else {
                    secretLetterCount[state.answer[i]] =
                        (secretLetterCount[state.answer[i]] || 0) + 1;
                }
            }
        
            // Étape 2 : Identifier les lettres mal placées (oranges)
            for (let i = 0; i < word.length; i++) {
                if (
                    feedback[i] === grey &&
                    secretLetterCount[word[i]] > 0
                ) {
                    feedback[i] = orange;
                    secretLetterCount[word[i]]--;
                }
            }

            for(let i = 0; i < word.length; i++){
                if((feedback[i] === orange && state.keyboard_colors[word[i]] !== green) 
                 || feedback[i] === green){
                    state.keyboard_colors[word[i]] = feedback[i];
                }
            }
        
            return feedback;
        }
        
    },
    mutations: {
        // ------------------ CHRONO ------------------------ //
        start(state) {
            if (!state.is_running) {
                state.is_running = true;
                const start_time = Date.now() - state.elapsed_time;
                state.interval = setInterval(() => {
                    state.elapsed_time = Date.now() - start_time;
                }, 1000);
            }
        },

        pause(state) {
            if (state.is_running) {
                state.is_running = false;
                clearInterval(state.interval);
            }
        },

        reset(state) {
            state.is_running = false;
            clearInterval(state.interval);
            state.elapsed_time = 0;
        },

        // -------------- END CHRONO ------------------------ //

        // ------------------ GAME ------------------------ //

        stop_game(state) {
            if(state.current_game_finished) return;

            state.current_game_finished = true;
            state.previous_games.push({
                date: new Date().toLocaleDateString(),
                answer: state.answer,
                win: state.win,
                nbTries: Math.min(state.previous_words.length + 1, state.max_tries),
                elapsed_time: state.elapsed_time
            });
            
            if(!state.win){
                router.push("/defeat");
            }

        },

        reset_game(state) {
            state.current_game_finished = false;
            state.previous_words = [];
            state.current_word = "";
            state.win = false;
            state.is_word = true;
            state.keyboard_colors = {};
        },

        // -------------- END GAME ------------------------ //

        // ------------------ KEYBOARD ------------------------ //
        add_key (state, key) {
            if(!state.current_game_finished) {
                if (state.current_word.length < state.word_max_length) {
                    state.current_word += key
                }
            }
        },

        pop_key (state) {
            if(!state.current_game_finished) {
                state.current_word = state.current_word.slice(0, state.current_word.length - 1);
            }
        },

        // -------------- END KEYBOARD ------------------------ //
       

    },
    actions : {
        start({commit}) {
            commit("start");
        },
        pause({commit}){
            commit("pause");
        },
        reset({commit}){
            commit("reset");
        },

        async check_word({ state, commit }) {
            if (state.current_word.length !== state.word_max_length) {
                return;
            }

            if(state.current_word === state.answer){
                state.win = true;
                commit("stop_game");
                commit("pause");
            }

            try {
                const response = await axios.post(
                    "https://vue-project-backend-eta.vercel.app/api/check-word",
                    {word: state.current_word.toLowerCase()}
                );

                state.is_word = response.data["isWord"];
                if (state.is_word) {

                    state.previous_words.push(state.current_word);
                    state.current_word = "";
                }
            } catch (error) {
                console.log(error);
            }

            if(state.previous_words.length >= state.max_tries){
                commit("stop_game");
                commit("pause");
            }
        },

        async get_random_word({state}) {
			try {
				const response = await axios.get("https://vue-project-backend-eta.vercel.app/api/new-game");
				let data_output = response.data;
				console.log(data_output); //A ENLEVER APRES !!!!
				state.answer = response.data['word'].toUpperCase();
			} catch (error) {
				console.log(error);
			}
		},      
    }
})
