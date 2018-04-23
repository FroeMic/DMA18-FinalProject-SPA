<template>
  <div class="popup-content" >
    <div>
      <strong> {{ label }}:</strong>
    </div>
    <div>
      Loan Size:  {{ loansize }}
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      label: {},
      loansize: {}
    }
  })
</script>

<style scoped>
  .popup-content {
    margin: 2px;
    font-size: 10pt;
  }
</style>
