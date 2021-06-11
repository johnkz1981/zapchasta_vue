<template>
  <b-table striped hover :items="items" :fields="fields">
    <!--template v-slot:cell(delivery)="row">
      {{row.value / 24}}
    </template-->
    <template v-slot:cell(count)="data">
      <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      <b-form-input
              type="number"
              min="1"
              value="1"
              v-model="data.item.count"
      ></b-form-input>
    </template>
    <template v-slot:cell(basket)="row">
      <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
      <b-button @click="toBasket(row)">
        В корзину
      </b-button>
    </template>
    <template v-slot:table-busy>
      <div class="text-center text-danger my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong> Загрузка...</strong>
      </div>
    </template>
  </b-table>
</template>
<script>

  export default {
    name: 'TableDetail',
    props: {
      analogType: String
    },
    data() {
      return {
        fields: [
          {
            key: 'brand_title',
            sortable: false,
            label: 'Бренд',
          },
          {
            key: 'article',
            sortable: false,
            label: 'Арт.',
          },
          {
            key: 'title',
            sortable: false,
            label: 'Название',
          },
          {
            key: 'quantity',
            label: 'Нал.',
            sortable: false,
          },
          {
            key: 'delivery',
            label: 'Дост.',
            sortable: false,
          },
          {
            key: 'price_src',
            label: 'Цена',
            sortable: false,
          },
          {
            key: 'count',
            label: '',
            sortable: false,
          },
          {
            key: 'basket',
            label: 'Купить',
            sortable: false,
          },
        ],
      }
    },
    computed: {
      items() {
        const items = [];
        for(const item of this.$store.getters['find/dataDetail'][this.analogType]){

          items.push({...item, count: 1, delivery: item.delivery / 24})
        }
        return items
      },
    },
    methods: {
      async toBasket(row) {
        const item = this.$qs.stringify(row.item);

        await this.$axios.$post('/api2/Basket/add', item)
            .then((data) => {
              this.makeToast(data.status,'success', row.item);
            });
        this.$store.dispatch('cart/getTotal');
      },
      makeToast(status, variant = null, item) {

        let mess = '';
        if(status === 200){
          mess = 'Товар добавлен в корзину';
        }

        this.$bvToast.toast(`${item.article}: ${item.title} ${item.count} X ${item.price_src}`, {
          title: mess,
          variant: variant,
          solid: true,
          toaster: 'b-toaster-top-center',
        })
      }
    },
    created() {
      const options = {
        root: document.querySelector('#scrollArea'),
        rootMargin: '0px',
        threshold: 1.0
      };

      const callback = function(entries, observer) {
        /* Content excerpted, show below */
      };

      const observer = new IntersectionObserver(callback, options);
    }
  }
</script>
<style scoped>
  input {
    width: 4rem;
  }
</style>