import ru from '../locales/ru.json';
import en from '../locales/en.json';
import kz from '../locales/kz.json';

export const state = () => ({
  loggedIn: process.client ? localStorage.getItem('loggedIn') : false,
  user: process.client ? JSON.parse(localStorage.getItem('user')) : {},
  calendarEvent: null,
  selectedTypeOfApplication: null,
  selectedLanguage: localStorage.getItem('selectedLanguage') || 'ru', // язык по умолчанию
  translations: {},
})

export const getters = {
  GET_LOGGEDIN: state => state.loggedIn,
  GET_USER: state => state.user
}

export const actions = {
  SET_EVENT({ commit }, obj) {
    commit('SET_EVENT', obj);
  },
  SET_TYPE({ commit }, str) {
    commit('SET_TYPE', str);
  },
  async loadTranslations({ commit, state }) {
    let translations = {};
    try {
      switch (state.selectedLanguage) {
        case 'ru':
          translations = ru;
          break;
        case 'en':
          translations = en;
          break;
        case 'kz':
          translations = kz;
          break;
        default:
          translations = ru; // язык по умолчанию
      }

      commit('SET_TRANSLATIONS', translations);
    } catch (error) {
      console.error('Failed to load translations', error);
    }
  },
}

export const mutations = {
  SET_SELECTED_LANGUAGE(state, language) {
    state.selectedLanguage = language;
    localStorage.setItem('selectedLanguage', language);
  },
  SET_TRANSLATIONS(state, translations) {
    state.translations = translations;
  },
  SET_LOGGEDIN(state, payload) {
    state.loggedIn = payload
  },
  SET_USER(state, payload) {
    state.user = payload
  },
  SET_EVENT(state, obj) {
    state.calendarEvent = obj;
  },
  SET_TYPE(state, str) {
    state.selectedTypeOfApplication = str;
  }
}
