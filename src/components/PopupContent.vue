<template>
  <div class="popup-content" >
    <div>
      <strong> {{ label }}:</strong>
    </div>
    <div v-if="predictedLoanSize">
      Predicted Loan Size:  {{ 
        formatCurrency(predictedLoanSize)
       }}
    </div>
    <div v-if="avgLoanSize">
      Average Loan Size:  {{ 
        formatCurrency(avgLoanSize)
      }}
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapGetters } from 'vuex'
  import currencyFormatter from 'currency-formatter'

  export default Vue.extend({
    props: {
      label: {},
      avgLoanSize: {},
      predictedLoanSize: {}
    },
    computed: {
      // mix the getters into computed with object spread operator
      ...mapGetters([
        'mapMode'
      ])
    },
    methods: {
      formatCurrency (value) {
        return currencyFormatter.format(value, { code: 'USD' })
      }
    }
  })
</script>

<style scoped>
  .popup-content {
    margin: 2px;
    font-size: 10pt;
  }
</style>
