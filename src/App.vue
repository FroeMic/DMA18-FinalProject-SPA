<template>
  <v-app>
    <loading :active="loading"  :can-cancel="false" ></loading>
    <vue-progress-bar></vue-progress-bar>

    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="showDrawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <div style ="margin-top:56px; margin-left: 16px;">
          <strong>California</strong>
        </div>
        
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-content @click="switchMapType(item)" style="cursor: pointer;">
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>

    <v-content>

      <v-snackbar 
        v-if="showSnackBars" 
        v-for="error in globalErrors" 
        :key="error.message"

        :timeout="snackbarTimeout"
        v-model="showSnackBars"
        top
        multi-line
      >
        <strong>Error:</strong>  
        <span>{{error.message}}</span>
      </v-snackbar>
      <router-view/>
    </v-content>

  </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.min.css'

export default {
  data () {
    return {
      clipped: false,
      miniVariant: false,
      showDrawer: false,
      fixed: false,
      items: [
        {
          title: 'Average Loan Amount',
          event: 'showAverageMapRequested',
          mapMode: 'average'
        },
        {
          title: 'Personal Loan Prediction',
          event: 'showPersonalMapRequested',
          mapMode: 'predicted'
        },
        {
          title: 'Deviation of Personal Prediction',
          event: 'showPersonalDeviationMapRequested',
          mapMode: 'deviation'
        },
        {
          title: 'About',
          event: 'showAboutPage'
        }
      ],
      snackbarTimeout: 80000,
      showSnackBars: false
    }
  },
  mounted () {
    this.switchMapType(this.items[0])
  },
  components: {
    Loading
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'debug',
      'loading',
      'errors',
      'mapMode',
      'mapDetailLevel',
      'loanPredictions'
    ]),
    globalErrors () {
      this.showSnackBars = true
      return this.errors.filter((err) => this.debug && err.field == null)
    },
    title () {
      let title = 'HMDA Loans 2016'
      if (this.mapMode === 'average') {
        title = 'Average ' + title
      }
      if (this.mapMode === 'predicted') {
        title = 'Predicted HMDA Loans'
      }
      if (this.mapMode === 'deviation') {
        title = 'Average vs Predicted HMDA Loans'
      }
      return title
    }
  },
  watch: {
    'loading': function (isLoading) {
      if (isLoading) {
        this.$Progress.start()
      } else {
        this.$Progress.finish()
      }
    }
  },
  methods: {
    switchMapType (item) {
      this.$emit(item.event)
      this.$store.commit('setMapMode', item.mapMode)

      if (this.mapMode === 'average') {
        this.$store.dispatch('loadMapData', {
          'detail_level': this.mapDetailLevel,
          'map_type': this.mapMode,
          'state_code': '06'
        })
      }
      if (this.mapMode === 'predicted') {
        this.$store.dispatch('loadMapData', {
          'detail_level': this.mapDetailLevel,
          'map_type': this.mapMode,
          'state_code': '06'
        })
        this.$router.push('form')
      }
      if (this.mapMode === 'deviation') {
        this.$store.dispatch('loadMapData', {
          'detail_level': this.mapDetailLevel,
          'map_type': this.mapMode,
          'state_code': '06'
        })
        this.$router.push('form')
      }
      if (item.title === 'About') {
        this.$router.push('about')
      }

      this.showDrawer = false
    }
  },
  name: 'App'
}
</script>
