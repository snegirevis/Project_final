export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Документооборот',
    htmlAttrs: {
      lang: 'ru'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  ssr: false,

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // "@/plugins/vClickOutside.js"
    { src: "~/plugins/vClickOutside", ssr: false },
    { src: "@/plugins/swiper.js", mode: "client", ssr: true },
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [
    {
      path: '~/components', // will get any components nested in let's say /components/test too
      pathPrefix: false,
    },
  ],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    "@nuxtjs/axios",
    '@nuxtjs/dayjs',
    '@nuxtjs/proxy',
  ],

  dayjs: {
    defaultLocale: 'ru',
    defaultTimeZone: 'Asia/Almaty',
    plugins: [
      'utc', // import 'dayjs/plugin/utc'
      'timezone' // import 'dayjs/plugin/timezone'
    ] // Your Day.js plugin
  },

  axios: {
    baseURL: 'https://iitudoc.herokuapp.com/',
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
