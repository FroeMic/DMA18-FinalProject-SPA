<template>
    <mapbox
    access-token="pk.eyJ1IjoiZnJvZWhsaWNoIiwiYSI6ImNqZzdhd3ljaTE1MHEyd3JuazY1MjZmZXAifQ.EqRkQ0rJGnHYmnlHb-dayg"
    :map-options="{
      //style: 'mapbox://styles/froehlich/cjg8kc1770d782rppe9b9cu1q',
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
</template>
<script>
  import { mapGetters } from 'vuex'
  import PopupContent from './PopupContent.vue'
  import generateIdForInstance from '../utils/generateIdForInstance'

  // Seems hacky, but works: Setting saving the map
  // object in this map would cause the map to not load.
  // This should approach avoids Vue's reactivty.
  let _map = null

  export default {
    data () {
      return {
        layers: [],
        sources: []
      }
    },
    components: {
      PopupContent
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'mapData'
      ]),
      map () {
        return _map
      }
    },
    watch: {
      mapData: function () {
        this.redrawMap()
      }
    },
    methods: {
      mapLoaded (map) {
        _map = map
      },
      addTileLayer (map, instance, style) {
        const id = generateIdForInstance(instance)

        console.log(instance)
        let label = ''
        if (instance.type === 'state') {
          label = instance.state
        } else if (instance.type === 'county') {
          label = instance.county
        } else if (instance.type === 'census') {
          label = 'Census Tract ' + instance.census
        }

        map.addSource(id, {
          'type': 'geojson',
          'data': {
            'type': 'Feature',
            'properties': {
              'label': label,
              'type': instance.type,
              'state': instance.state,
              'state_code': instance.state_code,
              'county': instance.county,
              'county_code': instance.county_code,
              'census_tract': instance.census_tract,
              'census_tract_number': instance.census_tract_number,
              'value': instance.value
            },
            'geometry': instance.geojson.geometry
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
        // eof function
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
              loansize: feature.properties.value
            }
          })
        vuePopup.$mount('#vue-popup-content')
      },
      redrawMap () {
        this.resetMap()

        if (!this.mapData || !this.mapData.instances || this.mapData.instances.length === 0) {
          return
        }

        const colorMapper = this.generateColorMap(this.mapData.instances.map((i) => i.value))

        for (let instance of this.mapData.instances) {
          this.addTileLayer(this.map, instance, colorMapper(instance.value))
        }
      },
      resetMap () {
        for (let layerID of this.layers) {
          this.map.removeLayer(layerID)
        }
        this.layers = []
        for (let sourceID of this.sources) {
          this.map.removeSource(sourceID)
        }
        this.sources = []
      },
      generateColorMap (values) {
        return function (value) {
          return {
            'fill-color': '#088',
            'fill-opacity': 0.4,
            'fill-outline-color': '#0CC'
          }
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#map {
  width: 100%;
  height: calc(100vh - 56px);
}

#map .mapboxgl-popup-close-button {
  right: 4px;
}
</style>