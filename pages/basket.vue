<template>
  <div v-if="total.count" class="container content">
    <b-table striped hover :items="items" :fields="fields">
      <template v-slot:cell(detail)="row">
        <b-button @click="row.toggleDetails">
          {{ row.detailsShowing ? 'скрыть' : 'показать'}}
        </b-button>
      </template>
      <template v-slot:row-details="row">
        <b-card v-for="item in Object.keys(row.item.properties)" :key="item">
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>{{properties[item]}}:</b></b-col>
            <b-col>{{row.item.properties[item]}}</b-col>
          </b-row>
        </b-card>
      </template>
      <template v-slot:cell(delete)="row">
        <b-button @click="deleteRow(row)">
          X
        </b-button>
      </template>
      <template v-slot:foot(name)="data">
        <span class="text-danger">{{ data.label }}</span>
      </template>
      <template v-slot:foot()="data">
        <i>{{ data.label }}</i>
      </template>
    </b-table>
    <div class="footer_basket">
      <nuxt-link  to="order" class="btn btn-primary">Оформить заказ</nuxt-link>
      <div class="total" v-show="total.count">
        Всего: &nbsp;<b class="text-danger">{{ total.count }}</b>&nbsp; X &nbsp;<b class="text-danger"> {{ total.sum }}&#8381;</b>
      </div>
    </div>
  </div>
  <div v-else class="container content">
    <h2><b class="text-danger">В корзине отсутствуют товары</b></h2>
  </div>
</template>
<script>

  export default {
    data() {
      return {
        fields: [
          {
            key: 'detail',
            sortable: false,
            label: 'Детали',
          },
          {
            key: 'name',
            sortable: false,
            label: 'Наименование',
            class: 'name_table'
          },
          {
            key: 'quantity',
            sortable: false,
            label: 'Кол.',
          },
          {
            key: 'price',
            sortable: false,
            label: 'Цена',
          },
          {
            key: 'finalPrice',
            sortable: false,
            label: 'Сумма',
          },
          {
            key: 'Delete',
            sortable: false,
            label: 'Удалить',
          },
        ],
        properties: {
          CML2_ARTICLE: 'Артикул',
          PROIZVODITEL_PRAIS: 'Бренд',
          IDENTIFIKATOR: 'Идентификатор поставщика',
          POSTAVCHIK: 'Поставщик',
          SROK_POSTAVKI: 'Срок поставки',
          productId: 'ID продукта',
          id: 'ID корзины'
        }
      }
    },
    methods: {
      async deleteRow(row) {
        const {result} = await this.$axios.$post('/api2/Basket/delete', this.$qs.stringify({id: row.item.id}));
        this.$store.dispatch('cart/getItems');
        this.$store.dispatch('cart/getTotal');
        console.log(result);
      },
    },
    computed: {
      items() {
        const items = this.$store.getters['cart/items'];
        const basket = [];

        for (const item in items) {
          basket.push({id: item, total: items[item], ...items[item], _showDetails: false})
        }
        return basket;
      },
      total() {
        return this.$store.getters['cart/total'];
      },
    },
    mounted() {
      this.$store.dispatch('cart/getItems');
    }
  }
</script>
<style scoped>
  .container {
    margin-top: 10rem;
    margin-bottom: 4rem;
  }
  .footer_basket {
    display: flex;
    justify-content: space-between;
    margin-bottom: 4rem;
    margin-top: 2rem;
  }
  /*.total b {
    color: red;
  }*/
</style>