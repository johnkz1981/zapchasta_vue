<template>
  <ValidationObserver ref="observerAuth" v-slot="{ valid }">
    <b-form @submit="onSubmit" @reset="onReset">
      <b-form-group
              :id="'group-inn-' + title"
              label="ИНН:"
              :label-for="'inn-' + title"
      >
        <ValidationProvider
                name="ИНН"
                :rules="{ required: true, regex: /^\d{10}$/ }"
                v-slot="{ errors }"
        >
          <b-form-input
                  :id="'inn-' + title"
                  v-model="form.login"
                  type="text"
                  required
                  :state="!errors[0]"
                  placeholder="Введите ИНН организации"
                  v-mask="'##########'"
          ></b-form-input>
          <b-form-invalid-feedback :state="!errors[0]">
            {{ errors[0]}}
          </b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>

      <b-form-group
              :id="'group-name-' + title"
              label="Наименование организации:"
              :label-for="'name-' + title"
              v-if="'register' === title"
      >
        <b-form-input
                :id="'name-' + title"
                v-model="form.title"
                required
                placeholder="Наименование"
                type="text"
        ></b-form-input>
      </b-form-group>

      <b-form-group :id="'group-pass-' + title" label="Пароль:" :label-for="'pass-' + title">
        <ValidationProvider name="confirm" :rules="{required: true, regex_password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8}/}" v-slot="{ errors }">
          <b-form-input
                  :id="'pass-' + title"
                  v-model="form.pass"
                  required
                  placeholder="Пароль"
                  type="password"
          ></b-form-input>
          <b-form-invalid-feedback :state="false">
            {{ errors[0] || 'register' !== title ? error.mess: '' }}
          </b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>


      <b-form-group
              :id="'group-confirm-' + title"
              label="Повторите пароль:"
              :label-for="'confirm-' + title"
              v-if="'register' === title"
      >
        <ValidationProvider rules="required|password:@confirm" v-slot="{ errors }">
          <b-form-input
                  :id="'confirm-' + title"
                  v-model="form.confirm"
                  required
                  placeholder="Повторите пароль"
                  type="password"
          ></b-form-input>
          <b-form-invalid-feedback :state="false">
            {{ errors[0] || error.mess}}
          </b-form-invalid-feedback>
        </ValidationProvider>
      </b-form-group>

      <b-button type="submit" variant="primary">{{'register' === title ? 'Зарегестрироваться': 'Войти'}}</b-button>
      <b-button type="reset" variant="danger">Сбросить</b-button>
    </b-form>
    <p v-show="'register' === title">
      <br>
      Пароль должен быть не менее 8 символов длиной, содержать латинские символы верхнего регистра (A-Z), содержать латинские символы нижнего регистра (a-z), содержать цифры (0-9).
    </p>
  </ValidationObserver>
</template>
<script>
  import {ValidationProvider, ValidationObserver} from "vee-validate";

  export default {
    components: {
      ValidationProvider,
      ValidationObserver
    },
    props: ['title'],
    data() {
      return {
        form: {
          login: '',
          title: '',
          pass: '',
          confirm: '',
        },
        show: true,
        error: {state: true, mess: ''},
      }
    },
    methods: {
      async onSubmit(evt) {
        evt.preventDefault();
        // this.$bvModal.hide('modal-auth');
        const validate = await this.$refs.observerAuth.validate();
        if (!validate) {
          return;
        }

        let result = null;
        // alert(JSON.stringify(this.form))
        if(this.title === 'login'){
          result = await this.$axios.$post('/api2/Auth/login', this.$qs.stringify(this.form));
          if(result.result === true){
            location.reload();
          }
        }else {
          result = await this.$axios.$post('/api2/Auth/register', this.$qs.stringify(this.form));
        }

        console.log(result);
        if(result.result.MESSAGE === "Вы были успешно зарегистрированы."){
          location.reload();
        }
        this.error.mess = result.result.MESSAGE;
        this.error.state = !result.result.MESSAGE;
      },
      onReset(evt) {
        console.log(this.title)
        evt.preventDefault();
        // Reset our form values
        this.form.login = '';
        this.form.name = '';
        this.form.pass = '';
        this.form.confirm = '';
        // Trick to reset/clear native browser form validation state
        this.show = false;
        this.$nextTick(() => {
          this.show = true
        })
      },
      close() {
        this.$bvModal.hide('modal-auth');
      }
    },
  }
</script>