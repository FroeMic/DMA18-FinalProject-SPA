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
      title: 'HeatMap',
      clipped: false,
      miniVariant: false,
      showDrawer: false,
      fixed: false,
      items: [
        {
          title: 'Average Loan Amount',
          event: 'showAverageMapRequested'
        },
        {
          title: 'Personal Loan Prediction',
          event: 'showPersonalMapRequested'
        },
        {
          title: 'Deviation of Personal Prediction',
          event: 'showPersonalDeviationMapRequested'
        }
      ],
      snackbarTimeout: 80000,
      showSnackBars: false
    }
  },
  components: {
    Loading
  },
  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'debug',
      'loading',
      'errors'
    ]),
    globalErrors () {
      this.showSnackBars = true
      return this.errors.filter((err) => this.debug && err.field == null)
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
      this.$store.dispatch('loadMapData', {
        'detail_level': 'county',
        'map_type': 'average',
        'state_code': '06'
      })
      this.showDrawer = false
    }
  },
  name: 'App'
}
</script>
