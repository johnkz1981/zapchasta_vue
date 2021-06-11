<template>
  <div class="container content">
    <h2>Личный кабинет</h2>
    <table class="table table-bordered table-hover">
      <tbody>
      <tr>
        <td colspan="2" align="center"><h5>Данные компании</h5></td>
      </tr>
      <tr>
        <td><b>ИНН:</b></td>
        <td>{{user['LOGIN']}}</td>
      </tr>
      <tr>
        <td><b>Наименование организации:</b></td>
        <td>{{user['NAME']}}</td>
      </tr>
      <tr>
        <td colspan="2" align="center"><h5>Контактное лицо</h5></td>
      </tr>
      <td>
        <b>Имя</b>
      </td>
      <td>
        {{user['LAST_NAME']}}
      </td>
      <tr>
        <td><b>e-mail</b></td>
        <td>{{user['WORK_MAILBOX']}}</td>
      </tr>
      <tr>
        <td><b>Телефон</b></td>
        <td>{{user['WORK_PHONE']}}</td>
      </tr>
      <tr>
        <td><b>Адрес</b></td>
        <td>{{user['WORK_STREET']}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    computed: {
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

  .table {
    max-width: 50%;
    margin-top: 1rem;
  }
</style>