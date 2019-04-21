declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vuetify/lib'

declare module 'highlight.js/lib/highlight' {
  import hljs from 'highlight.js';
  export default hljs;
}

declare module 'highlight.js/lib/languages/*';
