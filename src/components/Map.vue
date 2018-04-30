<template>
    <div>
      <loading :active="loading" :can-cancel="false" ></loading>
      <mapbox
      access-token="pk.eyJ1IjoiZnJvZWhsaWNoIiwiYSI6ImNqZzdhd3ljaTE1MHEyd3JuazY1MjZmZXAifQ.EqRkQ0rJGnHYmnlHb-dayg"
      :map-options="{
        style: 'mapbox://styles/mapbox/light-v9',
        center: [-122, 37],
        zoom: 5
      }"
      :geolocate-control="{
        show: true, 
        position: 'top-left'
      }"
      :scale-control="{
        show: true,
        position: 'top-left'
      }"
      :fullscreen-control="{
        show: true,
        position: 'top-left'
      }"
      @map-load="mapLoaded"
      @map-click="mapClicked"
      @map-mousemove="mapMouseMoved">
      </mapbox>
  </div>

</template>
<script>
  import { mapGetters } from 'vuex'
  import PopupContent from './PopupContent.vue'
  import Loading from 'vue-loading-overlay'
  import 'vue-loading-overlay/dist/vue-loading.min.css'
  import generateIdForInstance from '../utils/generateIdForInstance'
  import chroma from 'chroma-js'

  // Seems hacky, but works: Setting saving the map
  // object in this map would cause the map to not load.
  // This should approach avoids Vue's reactivty.
  let _map = null

  export default {
    data () {
      return {
        layers: [],
        sources: [],
        colorLookup: {},
        mapDidLoad: false
      }
    },
    components: {
      PopupContent,
      Loading
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'mapData',
        'displayPredicted',
        'mapMode',
        'loanPredictions',
        'loading'
      ]),
      map () {
        return _map
      },
      colorLookupKeys () {
        return Object.keys(this.colorLookup).sort((a, b) => a > b)
      }
    },
    watch: {
      mapData: function () {
        this.redrawMap()
      },
      mapDidLoad: function () {
        this.redrawMap()
      }
    },
    methods: {
      mapLoaded (map) {
        _map = map
        this.mapDidLoad = true
      },
      addTileLayer (map, instances, style) {
        const id = generateIdForInstance(instances[0])

        // for some reason the parsed census tracts have duplicate entries
        if (map && map.getSource(id)) {
          console.log('Duplicate ID :: ', id)
          return
        }

        let features = []
        for (let instance of instances) {
          // ignore instances without coordinates
          if (!instance.geojson.geometry.coordinates) {
            continue
          }

          let label = ''
          if (instance.type === 'state') {
            label = instance.state
          } else if (instance.type === 'county') {
            label = instance.county
          } else if (instance.type === 'census') {
            label = 'Census Tract ' + instance.census_tract_number
          }

          features.push({
            'type': 'Feature',
            'properties': {
              'label': label,
              '_id': instance._id,
              'avg_loan': instance.avg_loan,
              'type': instance.type,
              'state': instance.state,
              'state_code': instance.state_code,
              'county': instance.county,
              'county_code': instance.county_code,
              'census_tract': instance.census_tract,
              'census_tract_number': instance.census_tract_number
            },
            'geometry': instance.geojson.geometry
          })
        }

        map.addSource(id, {
          'type': 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': features
          }
        })
        this.sources.push(id)

        map.addLayer({
          'id': id,
          'type': 'fill',
          'source': id,
          'layout': {},
          'paint': style
        })
        this.layers.push(id)
      },
      mapClicked (map, e) {
        this.addPopUp(map, e)
      },
      mapMouseMoved (map, e) {
        // only show different cursor if the mouse is over a layer
        const features = map.queryRenderedFeatures(e.point, {
          layers: this.layers
        })
        map.getCanvas().style.cursor = (features.length) ? 'pointer' : ''
      },
      addPopUp (map, e) {
        // only show different popup if the mouse is over a layer
        const features = map.queryRenderedFeatures(e.point, {
          layers: this.layers
        })
        if (!features.length) {
          return
        }

        const feature = features[0]

        // Populate the popup and set its coordinates
        // eslint-disable-next-line
        const mapboxPopup = new mapboxgl.Popup()
        mapboxPopup.setLngLat(e.lngLat)
        mapboxPopup.setHTML('<div id="vue-popup-content"></div>')
        mapboxPopup.addTo(map)
        // make sure Vue controls the popup
        const vuePopup = new PopupContent(
          {
            propsData: {
              label: feature.properties.label,
              avgLoanSize: feature.properties.avg_loan,
              predictedLoanSize: this.loanPredictions[feature.properties._id]
            }
          })
        vuePopup.$mount('#vue-popup-content')
      },
      redrawMap () {
        let map = _map
        if (!map) {
          return
        }

        this.resetMap()

        if (!this.mapData || !this.mapData.instances || this.mapData.instances.length === 0) {
          return
        }

        let getColorProperty = (instance) => {
          return instance.avg_loan
        }
        if (this.mapMode === 'predicted') {
          getColorProperty = (instance) => {
            let predictedValue = this.loanPredictions[instance._id]
            return predictedValue
          }
        }
        if (this.mapMode === 'deviation') {
          getColorProperty = (instance) => {
            return this.loanPredictions[instance._id] - instance.avg_loan
          }
        }

        this.setColorMap(this.mapData.instances.map((i) => getColorProperty(i)))

        // group by color for improved map performance
        let grouping = {}
        for (let instance of this.mapData.instances) {
          let selectedKey = this.colorLookupKeys[this.colorLookupKeys.length - 1]
          for (let key of this.colorLookupKeys) {
            if (key > getColorProperty(instance)) {
              selectedKey = key
              break
            }
          }

          if (!grouping[selectedKey]) {
            grouping[selectedKey] = []
          }

          grouping[selectedKey].push(instance)
        }
        for (let key of Object.keys(grouping)) {
          let style = this.getStyleForValue(key)
          this.addTileLayer(map, grouping[key], style)
        }
      },
      resetMap () {
        let map = _map
        if (!map) {
          return
        }

        for (let layerID of this.layers) {
          map.removeLayer(layerID)
        }
        this.layers = []
        for (let sourceID of this.sources) {
          map.removeSource(sourceID)
        }
        this.sources = []
      },
      setColorMap (values) {
        let colorLookup = {}
        const sortedValues = values.sort((a, b) => a > b)

        let maxColors = 30
        let colorLimits = sortedValues
        if (sortedValues.length > maxColors) {
          colorLimits = chroma.limits(sortedValues, 'q', maxColors)
        }

        if (this.mapMode === 'deviation') {
          const smallerZero = colorLimits.filter((v) => v < 0)
          const biggerZero = colorLimits.filter((v) => v >= 0)

          let colors1 = chroma.brewer.OrRd.slice(2).reverse()
          let scale1 = chroma.scale(colors1).mode('lch').colors(smallerZero.length)

          for (let i in smallerZero) {
            colorLookup[smallerZero[i]] = scale1[i]
          }

          let colors2 = chroma.brewer.Greens.slice(2).reverse()
          let scale2 = chroma.scale(colors2).mode('lch').colors(biggerZero.length)

          for (let i in biggerZero) {
            colorLookup[biggerZero[i]] = scale2[i]
          }

          this.colorLookup = colorLookup
        } else {
          let colors = chroma.brewer.Greens.slice(1)
          const scale = chroma.scale(colors).mode('lch').colors(colorLimits.length)

          for (let i in colorLimits) {
            colorLookup[colorLimits[i]] = scale[i]
          }
          this.colorLookup = colorLookup
        }
      },
      getStyleForValue (value) {
        let color = this.colorLookup[value]

        // make sure this works, even with new keys
        if (!color) {
          for (let key of this.colorLookupKeys) {
            color = this.colorLookup[key]
            if (key > value) {
              break
            }
          }
        }

        return {
          'fill-color': chroma(color).darken(1).hex(),
          'fill-opacity': 0.75,
          'fill-outline-color': chroma(color).darken(3).hex()
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.loading-overlay {
  z-index: 100 !important;
}
  

#map {
  width: 100%;
  height: calc(100vh - 56px);
}

#map .mapboxgl-popup-close-button {
  right: 4px;
}
</style>
