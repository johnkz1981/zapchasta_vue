<template>
  <div class="container" v-lazy-container="{ selector: 'img' }" ref="observer">
    <div v-for="item in items" :key="item.ID">
      <h3 align="center">
        <a :href="item.PROPERTY_URL_VALUE" target="_blank">{{item.NAME}}</a>
      </h3>
      <div class="detail-item">
        <a :href="item.PROPERTY_URL_VALUE">
          <img :data-src="item.PREVIEW_PICTURE">
        </a>
        <p class="preview-text lazy-load">
          {{item.PREVIEW_TEXT}}
        </p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    async asyncData({$axios}) {
      const {result} = await $axios.$get('/api2/Other/getPartners');
      return {items: result};
    },
  }
</script>
<style scoped>
  .container {
    margin-top: 8rem;
    margin-bottom: 3rem;
  }

  h3 {
    margin-top: 2rem;
  }

  .preview-text {
    text-indent: 2rem;
  }

  .detail-item {
    display: flex;
    align-items: center;
  }

  .detail-item a {
    margin-right: 3rem;
  }

  img {
    width: 200px;
  }

</style>