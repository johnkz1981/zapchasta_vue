<template>
  <header id="header">
    <div class="container">

      <div id="logo" class="pull-left">
        <!-- Uncomment below if you prefer to use a text logo -->
        <h1><nuxt-link to="/">Запчасть <span>А</span></nuxt-link></h1>
        <!--a href="#intro" class="scrollto"><img src="img/logo.png" alt="" title=""></a-->
      </div>

      <nav id="nav-menu-container">
        <ul class="nav-menu">
          <li><nuxt-link to="/">Главная</nuxt-link></li>
          <li ><nuxt-link to="/search">Поиск</nuxt-link></li>
          <li ><nuxt-link to="/basket">Корзина <b class="price" v-show="totalBasket.show">{{ totalBasket.total }}</b></nuxt-link></li>
          <li v-if="isAuth" ><nuxt-link to="/personal">ИНН: {{user['LOGIN']}} </nuxt-link></li>
          <li v-if="isAuth" ><a href="#" @click="logout">Выйти</a></li>
          <li v-else ><nuxt-link to="#" v-b-modal.modal-auth>Войти</nuxt-link></li>
        </ul>
      </nav><!-- #nav-menu-container -->
    </div>
    <Auth></Auth>
  </header><!-- #header -->
</template>
<script>
  import Auth from "@/components/Auth";
  export default {
    components: {Auth},
    data() {
      return {
        active: 'menu-active'
      }
    },
    methods: {
      async logout(){
        await this.$axios.$get('/api2/Auth/logout');
        location.reload();
      }
    },
    computed: {
      totalBasket() {
        const total = this.$store.getters['cart/total'];
        return {show: total.count, total: `${total.count} X ${total.sum}`};
      },
      isAuth() {
        return this.$store.getters['user/isAuth'];
      },
      user() {
        return this.$store.getters['user/info'];
      },
    },
    created() {
      this.$store.dispatch('cart/getTotal');
      this.$store.dispatch('cart/getItems');
      this.$store.dispatch('user/getIsAuth');
      this.$store.dispatch('user/getInfo');
    }
  }
</script>
<style scoped>
  .price {
    color: white;
  }
</style>

