import Vue from 'vue'
import Vuex from 'vuex'
import Axios from "axios"

let url = "http://appversion.wisdomcloud.net/v1/app";
let url2 = "http://appversion.wisdomcloud.net/v1/appName"

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    lists: [],
    uploadList: [],
    dropdown: [],
    appName: '',
    env: '',
    listsLength: 20,
  },
  mutations: {

    getDropDown(state, res) {
      state.dropdown = res || [];
    },

    fetchList(state, { data, length }) {
      state.lists = data || [];
      state.uploadList = data || [];
      state.listsLength = length || 20;
    },

    deleteFile(state, index) {
      state.foods.splice(index, 1);
    },

    backToHome(state) {
      window.location.href = '/'
    },

    reloadPage(state) {
      location.reload();
    },

    setVariable(state, { appName, env }) {
      state.appName = appName;
      state.env = env;
    },

    filterList(state, { os, name, env }) {
      // console.log(os);
      // console.log(name);
      // console.log(env);
      if (os === "all" && name === "all" && env === "all") {
        state.uploadList = state.lists;
      } else {
        state.uploadList = state.lists;
        if (os && os !== 'all') {
          state.uploadList = state.lists.filter(val => val.Os === os);
        }

        if (name && name !== 'all') {
          state.uploadList = state.uploadList.filter(val => val.ApplicationName.Name === name);
        }

        if (env && env !== 'all') {
          console.log('in3')
          state.uploadList = state.uploadList.filter(val => val.Env === env);
        }
      }
    }

  },
  actions: {

    async getDropDown({ commit }, formData) {
      await Axios.get(url2 + '/dropdown')
        .then(res => commit("getDropDown", res.data.responseObject.data))
        .catch(err => alert(err));
    },


    async fetchList({ commit }, formData) {
      await Axios.post(url + '/list', formData)
        .then(res => commit("fetchList", { data: res.data.responseObject.data, length: res.data.responseObject.count }))
        .catch(err => alert(err));
    },

    async addFile({ commit }, formData) {
      await Axios.post(url + '/create', formData)
        .then(res => {
          commit("backToHome")
        })
        .catch(err => alert(err));
    },

    async deleteFile({ commit }, formData) {
      await Axios.post(url + '/delete', formData)
        .then(res => {
          commit("reloadPage");
        })
        .catch(err => alert(err));
    },

    async updateFile({ commit }, formData) {
      await Axios.post(url + '/update', formData)
        .then(res => {
          commit("reloadPage");
        })
        .catch(err => alert(err));
    },

    filterList({ commit }, value) {
      commit("filterList", value);
    },

    setVariable({ commit }, value) {
      commit("setVariable", value);
    },

    async sendTopList({ commit }, formData) {
      await Axios.post(url + '/order/top', formData)
        .then(res => {
          commit("reloadPage");
        })
        .catch(err => alert(err));
    }

  },
  getters: {
    lists: state => state.lists,
    dropdown: state => state.dropdown,
    uploadList: state => state.uploadList,
    appName: state => state.appName,
    env: state => state.env,
    listsLength: state => state.listsLength
  }
})
