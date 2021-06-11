<template>
  <div class="container error_page content">
    <div>
      <h1 v-if="error.statusCode === 404">Страница не найдена</h1>
      <h1 v-else>Произошла ошибка</h1>
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
  .error_page {
    margin: 10rem auto 5rem auto;
    display: flex;
    justify-content: center;
  }
</style>