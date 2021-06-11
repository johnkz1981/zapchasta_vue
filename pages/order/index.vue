<template>
  <div class="container">
    <h2>Оформить заказ</h2>
    <form v-if="isAuth && cartTotal.count" @submit.prevent="addOrder" method="post" name="ORDERFORM_C0MRZ" id="ORDER_FORM_ID_NEW">
      <div id="order_form_id">

        <div class="silver-block-mini">
          <h5 class="silver-block-mini-head">Информация для оплаты и доставки заказа</h5>
          <table class="sale_order_full_table">
            <tbody>
            <tr>
              <td>

                <table class="sale_order_full_table_no_border table table-bordered">

                  <tbody>
                  <tr>
                    <td colspan="2">
                      <b>Данные компании</b>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" align="right">
                      Название компании:<span class="sof-req">*</span></td>
                    <td>
                      <input type="text" maxlength="250" size="40" :value="user['NAME']"
                             name="COMPANY" id="COMPANY">
                      <br>
                      <small>Краткое наименование компании</small>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" align="right">
                      ИНН:<span class="sof-req">*</span></td>
                    <td>
                      <input type="text" maxlength="250" size="" :value="user['LOGIN']" name="INN" id="ORDER_PROP_10">

                    </td>
                  </tr>
                  <tr>
                    <td valign="top" align="right">
                      КПП:
                    </td>
                    <td>
                      <input type="text" maxlength="250" size="" value="" name="KPP" id="ORDER_PROP_11">

                    </td>
                  </tr>
                  <tr>
                    <td valign="top" align="right">
                      Юридический адрес:
                    </td>
                    <td>
                      <textarea rows="4" cols="40" name="COMPANY_ADR" id="ORDER_PROP_9"
                                v-html="user['WORK_STREET']"></textarea>

                    </td>
                  </tr>
                  <tr>
                    <td colspan="2">
                      <b>Контактная информация</b>
                    </td>
                  </tr>
                  <tr>
                    <td valign="top" align="right">
                      Контактное лицо:<span class="sof-req">*</span></td>
                    <td>
                      <input type="text" maxlength="250" size="" :value="user['LAST_NAME']" name="CONTACT_PERSON"
                             id="ORDER_PROP_12">

                    </td>
                  </tr>
                  <tr>
                    <td valign="top" align="right">
                      E-Mail:<span class="sof-req">*</span></td>
                    <td>
                      <input type="text" maxlength="250" size="40" :value="user['WORK_MAILBOX']" name="EMAIL"
                             id="ORDER_PROP_13">

                    </td>
                  </tr>
                  <tr>
                    <td valign="top" align="right">
                      Телефон:<span class="sof-req">*</span></td>
                    <td>
                      <input type="text" maxlength="250" size="" :value="user['WORK_PHONE']" name="PHONE"
                             id="ORDER_PROP_14">
                    </td>
                  </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <div class="silver-block-mini">
          <h5 class="silver-block-mini-head">Платежная система</h5>
          <table class="sale_order_full_table table table-bordered">
            <tbody>
            <tr>
              <td width="0%" valign="top">
                <input type="radio" id="ID_PAY_SYSTEM_ID_8" name="PAY_SYSTEM_ID" value="8" v-model="pay">
              </td>
              <td width="100%" valign="top">
                <label for="ID_PAY_SYSTEM_ID_8">
                  <b>Банковский перевод</b><br>
                  <b class="text-danger">Продажа подзаказных позиций только по 100 % предоплате!</b>
                </label>

              </td>
            </tr>
            <tr>
              <td width="0%" valign="top">
                <input type="radio" id="ID_PAY_SYSTEM_ID_10" name="PAY_SYSTEM_ID" value="10" v-model="pay">
              </td>
              <td width="100%" valign="top">
                <label for="ID_PAY_SYSTEM_ID_10">
                  <b>Наличными при получении</b><br>
                  Наличными при получении товара. <br>
                  <b class="text-danger">Продажа подзаказных позиций только по 100 % предоплате!</b>
                </label>

              </td>
            </tr>
            </tbody>
          </table>
        </div>

        <h5 class="title-h2">Состав заказа</h5>

        <table class="sale_order_full data-table silver-table table table-bordered">
          <thead>
          <tr>
            <th>Название</th>
            <th>Свойства</th>
            <th>Тип цены</th>
            <th>Скидка</th>
            <th>Дост.</th>
            <th>Кол.</th>
            <th>Цена</th>
          </tr>
          </thead>
          <tbody>

          <tr v-for="item in cartItems" :key="item.id">
            <td>{{item['name']}}</td>
            <td class="properties_table">
              <ul v-for="propItem in Object.keys(item['properties'])" :key="propItem">
                <li v-if="propRus[propItem]">
                  {{`${propRus[propItem]}: ${item['properties'][propItem]}`}}
                </li>
              </ul>
            </td>
            <td>кат. 0</td>
            <td></td>
            <td>{{item['properties']['SROK_POSTAVKI']}}</td>
            <td>{{item['quantity']}}</td>
            <td align="right">{{item['finalPrice']}} &#8381;</td>
          </tr>
          <!--tr>
            <td align="right"><b>Общий вес:</b></td>
            <td colspan="6" align="right">0 кг</td>
          </tr>
          <tr>
            <td align="right"><b>Товаров на:</b></td>
            <td colspan="6" align="right">302.71 руб.</td>
          </tr-->
          <tr>
            <td align="right"><b>Итого:</b></td>
            <td colspan="6" align="right"><b>{{cartTotal.sum}} &#8381;</b>
            </td>
          </tr>
          </tbody>
        </table>


        <div align="right">
          <nuxt-link to="/basket">Изменить заказ</nuxt-link>
        </div>
        <input type="hidden" name="confirmorder" id="confirmorder" value="Y">
        <input type="hidden" name="profile_change" id="profile_change" value="N">
        <br>

        <h5 class="silver-block-mini-head">Дополнительная информация</h5>
        <hr>
        <table class="sale_order_full_table">
          <tbody>
          <tr>
            <td width="50%" valign="top" align="left"><b>Комментарии к заказу:</b></td>
          </tr>
          <tr>
            <td>
              <textarea rows="4" cols="40" name="ORDER_DESCRIPTION"></textarea>
            </td>
          </tr>
          </tbody>
        </table>

        <div align="right">
          <input type="submit" class="btn btn-info" name="submitbutton"
                 value="Оформить заказ">
        </div>
      </div>
    </form>
    <div v-else-if="!cartTotal.count" class="container content">
      <h2><b class="text-danger">Корзина пуста</b></h2>
    </div>
    <div v-else class="container content">
      <h2><b class="text-danger">Для оформления заказа необходимо авторизоваться!</b></h2>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        propRus: {CML2_ARTICLE: 'Артикул', PROIZVODITEL_PRAIS: 'Brend'},
        pay: 8
      }
    },
    methods: {
      async addOrder(evt) {
        const data = {};

        for (const item of evt.target) {
          if ('PAY_SYSTEM_ID' !== item.name) {
            Object.assign(data, {[item.name]: item.value})
          }
        }

        Object.assign(data, {PAY_SYSTEM_ID: this.pay});
        const {result} = await this.$axios.$post('/api2/Order/add', this.$qs.stringify(data));

        const mess = result.number ? `Новый заказ ${result.number} оформлен`: result;
        location.replace('/order/mess/?q=' + mess);
        //console.log('/order/mess/?q=' + mess);
      }
    },
    computed: {
      isAuth() {
        return this.$store.getters['user/isAuth'];
      },
      cartItems() {
        const items = [];
        const cartItems = this.$store.getters['cart/items'];

        for (const item in cartItems) {
          items.push({id: item, ...cartItems[item]})
        }
        console.log(items)
        return items;
      },
      cartTotal() {
        return this.$store.getters['cart/total']
      },
      user() {
        return this.$store.getters['user/info'];
      }
    }
  }
</script>
<style scoped>
  .container {
    margin-top: 10rem;
    margin-bottom: 4rem;
  }

  li {
    list-style-type: none;
  }

  .properties_table {
    padding: 0;
  }
</style>