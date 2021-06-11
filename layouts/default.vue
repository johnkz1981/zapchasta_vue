<template>
  <div>
    <header-component/>
    <nuxt/>
    <footer-component/>
  </div>
</template>
<script>
  import HeaderComponent from '~/components/Header'
  import FooterComponent from '~/components/Footer'

  export default {
    components: {
      HeaderComponent,
      FooterComponent
    }
  }
</script>
<style>
  html, body, #__nuxt {
    height: 100vh
  }
  .content {
    flex: 1 0 auto;
  }
  #__layout > div {
    display: flex;
    flex-direction: column;
  }
  #footer{
    flex-shrink: 0;
  }
  #__layout, #__layout > div {
    height: 100%;
  }
</style>


