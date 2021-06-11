<template>
  <div class="container content">
    <div>
      <h1> {{$route.query.q}} </h1>
      <nuxt-link to="/">Вернуться на главную</nuxt-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['error']
  }
</script>
<style scoped>
  .container {
    margin: 10rem auto 5rem auto;
    display: flex;
    justify-content: center;
  }
</style>