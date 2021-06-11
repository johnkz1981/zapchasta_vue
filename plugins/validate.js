import { extend } from 'vee-validate';
import { required, regex } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'Поле не должно быть пустым'
});

extend('regex', {
  ...regex,
  message: 'В ИНН должно быть 10 цифр'
});

extend('regex_password', {
  ...regex,
  message: 'Пароль не содержит 8 символов A-Z a-z 0-9'
});

extend('password', {
  params: ['target'],
  validate(value, { target }) {
    return value === target;
  },
  message: 'Пароли не совпадают!'
});
