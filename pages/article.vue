<template>
  <transition name="fade-out">
    <section id="speakers-details" class="wow fadeIn">
      <div class="container">
        <div class="row">
          <div class="col-md-12">
            <find/>
            <b-table :busy="isBusy" striped hover :items="items" :fields="fields">
              <template v-slot:table-busy>
                <div class="text-center text-danger my-2">
                  <b-spinner class="align-middle"></b-spinner>
                  <strong> Загрузка...</strong>
                </div>
              </template>
              <template v-slot:cell(get_price)="data">
                <!-- `data.value` is the value after formatted by the Formatter -->
                <a :href="`${data.value}`" @click.prevent="click(data.value)">Найти</a>
              </template>
            </b-table>
          </div>
        </div>
      </div>
    </section>
  </transition>
</template>

<script>
  const qs = require('qs');
  import Find from "../components/Find";

  export default {
    name: 'Article',
    components: {Find},
    props: {
      msg: String
    },
    data() {
      return {
        fields: [
          {
            key: 'brand',
            sortable: false,
            label: 'Бренд',
          },
          {
            key: 'title',
            sortable: false,
            label: 'Название',
          },
          {
            key: 'get_price',
            label: 'Цены и заменители',
            sortable: false,
            // Variant applies to the whole column, including the header and footer
            variant: 'find'
          }
        ],
        // items: []
      }
    },
    methods: {
      click(path) {

        const pathParse = qs.parse(path.replace('/detail/?', ''));
        this.$router.push({ path: '/detail/', query: pathParse });
      },
      makeToast(mess) {

        this.$bvToast.toast(mess, {
          title: 'Ошибка',
          variant: 'danger',
          solid: true,
          toaster: 'b-toaster-top-center',
        })
      }
    },
    computed: {
      items() {

        const q = this.$route.query.q;

        const items = [];
        const catalogs = this.$store.getters['find/dataArticle'];
        for (const brand in catalogs) {

          const {brand_title, title,  article} = catalogs[brand];
          items.push({brand: brand_title, title: title, get_price: `/detail/?q=${q}&brand=${brand_title}`});
        }
        return items;
      },
      isBusy() {
        return this.$store.getters['find/isBusy'];
      },
      error() {
        const mess = this.$store.getters['error/mess'];

        this.makeToast(mess);
        return mess;
      }
    },
    created() {
      this.$store.dispatch('find/getDataArticle', {
        q: this.$route.query.q
      });
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .fade-out-enter-active, .fade-out-leave-active {
    animation: slide-out-left 0.5s cubic-bezier(0.550, 0.085, 0.680, 0.530) both;
  }
  .fade-out-enter, .fade-out-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  @-webkit-keyframes slide-out-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
  }
  @keyframes slide-out-left {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(-1000px);
      transform: translateX(-1000px);
      opacity: 0;
    }
  }
  .container {
    margin-top: 8rem;
  }
</style>
