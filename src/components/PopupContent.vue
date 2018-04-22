<template>
  <div class="popup-content" >
    {{ label }}
  </div>
</template>

<script>
  import Vue from 'vue'

  export default Vue.extend({
    props: {
      label: {}
    }
  })
</script>

<style scoped>
  .popup-content {
    margin: 2px;
    font-size: 10pt;
  }
</style>
