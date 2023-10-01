import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

const store = createStore({
  state() {
    return {
      scores: [],
      words: [],
      wordHide: false,
    };
  },
  getters: {
    getScoreList(state) {
      return state.scores.sort(
        (a, b) => a.score - b.score || a.min - b.min || a.sec - b.sec,
      );
    },
    getWordList(state) {
      return state.words;
    },
    getWordHideOption(state) {
      return state.wordHide;
    },
  },
  mutations: {
    setWordHideOption(state, value) {
      state.wordHide = value;
    },
    addScore(state, data) {
      state.scores.push({
        name: data.name,
        score: data.score,
        min: data.min,
        sec: data.sec,
      });
    },
    clearScore(state) {
      state.scores = [];
    },
    addWord(state, newWord) {
      state.words.push(newWord);
    },
    chageWordList(state, wordList) {
      state.words = [];
      console.log(wordList);
    },
    clearWords(state) {
      state.words = [];
    },
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage,
    }),
  ],
});

export default store;
