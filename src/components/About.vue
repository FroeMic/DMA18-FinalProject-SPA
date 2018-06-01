<template>
  <div class="about" >


  <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs10 offset-xs1>

            <h2>About</h2>

            <h3> Welcome to our California Home Loan Visualization and Prediction</h3>
            <div>
              <p>
                We built this tool as part of our final project for 
                <a href="https://www.ischool.berkeley.edu/courses/info/190/dma"  target="_blank">Info 254: Data Mining and Analytics</a> 
                course at UC Berkeley.
                Our goal is to make the data published through the Home Mortgage Disclosure Act 
                (short <a href="https://www.consumerfinance.gov/data-research/hmda/learn-more" target="_blank">HMDA</a>)
                more accessible and provide an straight forward visualization for people that cannot deep dive into the raw data themselves.
              </p>
              <p>
                Additionally, we built a machine learning model trained on the historic data published through the HMDA that generates personalized predictions on what size of loan you can expect to receive.
                (Note that, the generated predictions are exactly that - predictions - and do not replace more extensive research if you want to apply for a loan.)
              </p>
            </div>

            <h3>Team</h3>
            <div>
              <ul class="team">
                <li id="michael"><div class="left"><img src="/static/mf.jpg" class="profile"></div>
                <div class="desc"><h4>Michael</h4>
                <a target="_blank" href="https://www.linkedin.com/in/m-froehlich/" class="icon"><img src="/static/linkedin.svg" alt="LinkedIn"></a>
                <a target="_blank" href="https://github.com/FroeMic" class="icon"><img src="/static/github.svg" alt="Github"></a>
                <p>A computer scientist by training, Michael is an Austrian, full-fledged, full-stacked developer loving to create sleek interfaces with a purpose.</p>
                </div>
                </li>
                <li id="ashish"><div class="left"><img src="/static/ashish.jpg" class="profile"></div>
                <div class="desc"><h4>Ashish</h4>
                <a target="_blank" href="https://www.linkedin.com/in/ashishsur/" class="icon"><img src="/static/linkedin.svg" alt="LinkedIn"></a>
                <a target="_blank" href="https://github.com/surashish" class="icon"><img src="/static/github.svg" alt="Github"></a>
                <p>Being an experienced Data Analytics Consultant, focussed on data science and product management, Ashish pursues a Masters in Information Management and Systems.</p>
                </div>
                <li id="avi"><div class="left"><img src="/static/avi.jpg" class="profile"></div>
                <div class="desc"><h4>Avi</h4>
                <a target="_blank" href="https://www.linkedin.com/in/avidixit/" class="icon"><img src="/static/linkedin.svg" alt="LinkedIn"></a>
                <a target="_blank" href="https://github.com/addt" class="icon"><img src="/static/github.svg" alt="Github"></a>
                <p>Focussing on Software Engineering and Artificial Intelligence, Avi is an experienced data scientist with a strong drive.</p>
                </div>
                </li>
                <li id="kar"><div class="left"><img src="/static/kar.jpg" class="profile"></div>
                <div class="desc"><h4>Rohan</h4>
                <a target="_blank" href="https://www.linkedin.com/in/rohan-kar/" class="icon"><img src="/static/linkedin.svg" alt="LinkedIn"></a>
                <a target="_blank" href="https://github.com/rohankar" class="icon"><img src="/static/github.svg" alt="Github"></a>
                <p>Looking at the intersection of Product Development, UX Research and Applied ML, Rohan has experience in Applied Research and as a Full-Stack Engineer.</p>
                </div>
                </li>
                <li id="rohan"><div class="left"><img src="/static/rohan.jpg" class="profile"></div>
                <div class="desc"><h4>Rohan</h4>
                <a target="_blank" href="https://www.linkedin.com/in/rohankapuria/" class="icon"><img src="/static/linkedin.svg" alt="LinkedIn"></a>
                <a target="_blank" href="https://github.com/rohan-kapuria" class="icon"><img src="/static/github.svg" alt="Github"></a>
                <p>Rohan is a experienced and highly motivated Product/Program Manager who has worked on a wide range of consulting and agile/scrum software development projects.</p>
                </div>
                </li>
                <li id="max"><div class="left"><img src="/static/max.jpg" class="profile"></div>
                <div class="desc"><h4>Maximilian</h4>
                <a target="_blank" href="https://www.linkedin.com/in/maximilian-wuehr/" class="icon"><img src="/static/linkedin.svg" alt="LinkedIn"></a>
                <a target="_blank" href="https://github.com/mwuehr" class="icon"><img src="/static/github.svg" alt="Github"></a>
                <p>With a background in economics and finance Maximilian shines in statistical analysis tasks. His never ending curiosity now drives him towards data science.</p>
                </div>
                </li>
              </ul>
            </div>

            <h3>Source</h3>
            <div>
              <div>
                <h5>Report</h5>
                <div>A report describing how we used the data provided by the HMDA to build the predictive models for this project.</div>
                <a href="/static/DMA_Final_Report.pdf" target="_blank" disabled>Download Report</a>
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
.onboarding {
  max-width:500px;
  width:100%;
}
ul.team {
  list-style: none;

}
ul.team li {
  margin: 20px 0;
  clear:both;
  display:block;
  min-height: 65px; 
}

ul.team li h4 {
  display: inline-block;
}

.profile {
  height: 65px;
  width: auto;
  border-radius: 33px;
}

.icon {
  height: 21px;
  width: 21px;
  margin: 0px 0 2px 5px;
  display: inline-block;
}

.desc {
  float:left;
  margin: 0 0 0 10px;
  width: 85%
}

h3 {
  margin-top: 40px;
}

h5 {
  margin-top: 10px;
}

</style>
