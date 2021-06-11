module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Запчасть А',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/img/favicon.png' },
      //{ rel: 'stylesheet', href: '/lib/bootstrap/css/bootstrap.min.css' },
      { rel: 'stylesheet', href: '/css/style.css' },
      { rel: 'stylesheet', href: '/lib/font-awesome/css/font-awesome.min.css' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,700,700i|Raleway:300,400,500,700,800' },
    ]
  },
  build: {
    transpile: [
      "vee-validate/dist/rules",
    ],
  },
  plugins: [
    '~/plugins/bt-vue',
    '~/plugins/qs',
    '~/plugins/v-mask',
    '~/plugins/validate',
    '~/plugins/lazy',
  ],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api2/':
        {
          target: 'https://ugautodetal.ru/api2',
          pathRewrite: {'^/api2': ''}
        },
    '/auto/':
        {
          target: 'https://ugautodetal.ru/auto/api',
          pathRewrite: {'^/auto/api': ''}
        }
  },
  bootstrapVue: {
    bootstrapCSS: true, // Or `css: false`
    bootstrapVueCSS: true // Or `bvCSS: false`
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  /*build: {
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }*/
};

