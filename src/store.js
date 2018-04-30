import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

const HOST_POOL = [
  'https://dma18-final-project-server.herokuapp.com',
  'https://dma18-final-project-server1.herokuapp.com',
  'https://dma18-final-project-server2.herokuapp.com',
  'https://dma18-final-project-server3.herokuapp.com'
]
const HOST = HOST_POOL[Math.floor(Math.random() * HOST_POOL.length)]

export default new Vuex.Store({

  strict: true,
  state: {
    apiVersion: 0,
    debug: false,
    firstVisit: true,
    loading: false,
    mapDetailLevel: 'county',
    mapMode: 'average',
    mapData: [],
    mapDataCache: {},
    loanPredictions: {},
    loanForm: {},
    errors: []
  },
  getters: {
    apiVersion: state => state.apiVersion,
    debug: state => state.debug,
    firstVisit: state => state.firstVisit,
    loading: state => state.loading,
    loanForm: state => state.loanForm,
    errors: state => state.errors,
    mapData: state => state.mapData,
    mapMode: state => state.mapMode,
    mapDetailLevel: state => state.mapDetailLevel,
    loanPredictions: state => state.loanPredictions
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
    fetchMapData (context, config) {
      context.commit('setLoading', true)
      const headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      const endpoint = HOST + '/api/v1/mapdata'
      let data = JSON.stringify(config)
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
    },
    loadMapData (context, config) {
      const headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      }

      context.commit('setLoading', true)
      // first check whether this map is cached
      const cachedMap = context.state.mapDataCache[config['detail_level']]
      if (!cachedMap) {
        context.dispatch('fetchMapData', config)
      } else {
        // we have this map type chached
        const endpoint = HOST + '/api/v1/revision?detail_level=' + config['detail_level']
        axios.get(endpoint, headers)
          .then((response) => {
            if (response.data.data.revision === cachedMap.revision) {
              // if we have the current map data use it from the cache
              context.commit('setMapData', JSON.parse(JSON.stringify(cachedMap)))
              context.commit('setLoading', false)
            } else {
              // otherwise load them from the API
              context.dispatch('fetchMapData', config)
              context.commit('setLoading', false)
            }
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
    loadPredictionData (context) {
      const headers = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      context.commit('setLoading', true)
      const endpoint = HOST + '/api/v1/predict'
      const data = {
        'map_type': context.state.mapMode,
        'state_code': '06',
        'detail_level': context.state.mapDetailLevel,
        'loan_form': context.state.loanForm
      }
      return axios.post(endpoint, data, headers)
        .then((response) => {
          context.commit('setPredictionData', response.data.data)
          context.commit('setLoading', false)
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
    setVisited (state) {
      state.firstVisit = false
    },
    setMapMode (state, mapMode) {
      let _mapMode = 'average'

      if (mapMode === 'predicted') {
        _mapMode = 'predicted'
      }
      if (mapMode === 'deviation') {
        _mapMode = 'deviation'
      }

      state.mapMode = _mapMode
    },
    setMapDetailLevel (state, mapDetailLevel) {
      let _mapDetailLevel = 'county'

      if (mapDetailLevel === 'state') {
        _mapDetailLevel = 'state'
      }
      if (mapDetailLevel === 'census') {
        _mapDetailLevel = 'census'
      }

      state.mapDetailLevel = _mapDetailLevel
    },
    setMapData (state, mapData) {
      state.mapDataCache[mapData['detail_level']] = mapData
      state.mapData = mapData
    },
    setLoanFormField (state, field) {
      state.loanForm[field['name']] = field['value']
    },
    setPredictionData (state, loanPredictions) {
      state.loanPredictions = loanPredictions
    }
  }
})
