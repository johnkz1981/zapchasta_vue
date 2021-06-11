import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

// Vue.use(VueLazyload);

// or with options
Vue.use(VueLazyload, {
  // preLoad: 4,
  // error: 'dist/error.png',
  loading: 'https://i.pinimg.com/originals/b2/d4/b2/b2d4b2c0f0ff6c95b0d6021a430beda4.gif',
  // attempt: 1
  observer: true,

  // optional
  observerOptions: {
    rootMargin: '30px',
    threshold: 0.1
  }
});

