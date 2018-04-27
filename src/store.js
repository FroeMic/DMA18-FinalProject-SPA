import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const HOST = 'http://localhost:8082'

export default new Vuex.Store({

  strict: true,
  state: {
    apiVersion: 0,
    debug: true,
    loading: true,
    mapData: [],
    loanForm: {
      title: 'Loan Application Form'
    },
    errors: []
  },
  getters: {
    apiVersion: state => state.apiVersion,
    debug: state => state.debug,
    loading: state => state.loading,
    loanForm: state => state.loanForm,
    errors: state => state.errors,
    mapData: state => state.mapData
  },
  actions: {
    loadApiVersion (context) {
      const endpoint = HOST + '/api/v1/version'
      axios.get(endpoint)
        .then((response) => {
          context.commit('setApiVersion', response.data.data.version)
        })
        .catch((error) => {
          console.log(error.response)
        })
    },
    loadMapData (context) {
      const endpoint = HOST + '/api/v1/mapdata'
      const headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      let data = JSON.stringify({
        'detail_level': 'county',
        'map_type': 'average',
        'state_code': '06'
      })

      context.commit('setLoading', true)
      axios.post(endpoint, data, headers)
        .then((response) => {
          context.commit('setLoading', false)
          context.commit('setMapData', response.data.data)
        })
        .catch((error) => {
          context.commit('setLoading', false)
          if (error.response &&
              error.response.data &&
              error.response.data.errors) {
            context.commit('setErrors', error.response.data.errors)
          }
        })
    }
  },
  mutations: {
    setApiVersion (state, version) {
      state.apiVersion = version
    },
    setLoading (state, isLoading) {
      state.loading = isLoading
    },
    setErrors (state, errors) {
      state.errors = errors
    },
    clearErrors (state) {
      state.errors = []
    },
    setMapData (state, data) {
      state.mapData = data
    }
  }
})
