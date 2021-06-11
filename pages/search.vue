<template>
  <div class="container content">
    <div class="row">
      <div class="col-md-12">
        <find/>
      </div>
    </div>
  </div>
</template>
<script>
  import Find from "../components/Find";

  export default {
    components: {
      Find,
    }
  }
</script>
<style>
  .content {
    margin-top: 8rem;
  }
</style>