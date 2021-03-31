import Vue from 'vue';
import Vuex from 'vuex';
import Menu from './modules/menu'
import Dict from './modules/dict'
import ChainSdk from './modules/chainSdk'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    Menu,
    Dict,
    ChainSdk
  },
});
