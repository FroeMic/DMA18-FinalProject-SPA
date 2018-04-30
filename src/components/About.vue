<template>
  <div class="about" >


  <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>

            <h2>About</h2>
            <div>
              Enter the following information to get a personalized predicion on how much money you can expect when applying for a home loan.
            </div>

            <h3>Team</h3>
            <div>

            </div>

            <h3>Source</h3>
            <div>
              <div>
                <h5>Report</h5>
                <div>A report describing how we used the data provided by the HMDA to build the predictive models for this project.</div>
                <a href="#" target="_blank" disabled>Download Report</a>
              </div>
              <div>
                <h5>Webserver Repository</h5>
                <div>The source code for the webserver serving data for this application</div>
                <a href="https://github.com/FroeMic/DMA18-FinalProject-Server" target="_blank">Github</a>
              </div>
              <div>
                <h5>Website Repository</h5>
                <div>The source code for this website.</div>
                <a href="https://github.com/FroeMic/DMA18-FinalProject-SPA/" target="_blank">Github</a>
              </div>
              <div>
                <h5>HMDA API</h5>
                <div>The API of the HMDA allowing you to download the datasets for all US states.</div>
                <a href="http://cfpb.github.io/api/hmda/index.html" target="_blank">HMDA Homepage</a>
              </div>
            </div>

        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({

  })
</script>

<style scoped>

</style>
