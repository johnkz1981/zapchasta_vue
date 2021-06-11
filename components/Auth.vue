<template>
  <div>
    <b-modal
            id="modal-auth"
            title="Войти или зарегестрироваться"
            hide-footer
            no-close-on-backdrop
    >
      <b-tabs content-class="mt-3">
        <b-tab title="Вход">
          <AuthSubForm title="login"></AuthSubForm>
        </b-tab>
        <b-tab title="Регистрация">
          <AuthSubForm title="register"></AuthSubForm>
        </b-tab>
      </b-tabs>
      <!--div class="card">
        <div class="card-header">
          <h3>Вход</h3>
          <i class="fa fa-close" @click="close"></i>
        </div>
        <div class="card-body">
          <form>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-user"></i></span>
              </div>
              <input type="text" class="form-control" placeholder="Введите ИНН организации">

            </div>
            <div class="input-group form-group">
              <div class="input-group-prepend">
                <span class="input-group-text"><i class="fa fa-key"></i></span>
              </div>
              <input type="password" class="form-control" placeholder="Введите Ваш пароль">
            </div>
            <div class="row align-items-center remember">
              <input type="checkbox">Запомнить меня
            </div>
            <div class="form-group">
              <input type="submit" value="Войти" class="btn float-right login_btn">
            </div>
          </form>
        </div-->
      <!--div class="card-footer">
        <div class="d-flex justify-content-center links">
          Don't have an account?<a href="#">Sign Up</a>
        </div>
        <div class="d-flex justify-content-center">
          <a href="#">Forgot your password?</a>
        </div>
      </div-->
      <!--/div-->
    </b-modal>
  </div>
</template>
<script>
  import AuthSubForm from '@/components/AuthSubForm'
  export default {
    components: {
      AuthSubForm
    }
  }
</script>

<!--style>
  @import url('https://fonts.googleapis.com/css?family=Numans');

  /*.modal-body {
    padding: 2px;
  }*/
  .modal-dialog {
    width: 400px;
  }

  html, body {
    height: 100%;
    font-family: 'Numans', sans-serif;
  }

  .card {
    /*height: 370px;*/
    margin-top: auto;
    margin-bottom: auto;
    /*width: 400px;*/
    /*background-color: rgba(0,0,0,0.5) !important;*/
    background-color: rgba(16, 21, 34, 0.92);
  }

  .social_icon span {
    font-size: 60px;
    margin-left: 10px;
    color: #FFC312;
  }

  .social_icon span:hover {
    color: white;
    cursor: pointer;
  }

  .card-header {
    display: flex;
    justify-content: space-between;
  }

  .card-header h3, .card-header .fa {
    color: white;
  }

  .card-header .fa {
    cursor: pointer;
  }

  .social_icon {
    position: absolute;
    right: 20px;
    top: -45px;
  }

  .input-group-prepend span {
    width: 50px;
    background-color: #FFC312;
    color: black;
    border: 0 !important;
  }

  input:focus {
    outline: 0 0 0 0 !important;
    box-shadow: 0 0 0 0 !important;

  }

  .remember {
    color: white;
  }

  .remember input {
    width: 20px;
    height: 20px;
    margin-left: 15px;
    margin-right: 5px;
  }

  .login_btn {
    color: black;
    background-color: #FFC312;
    width: 100px;
  }

  .login_btn:hover {
    color: black;
    background-color: white;
  }

  .links {
    color: white;
  }

  .links a {
    margin-left: 4px;
  }

</style-->