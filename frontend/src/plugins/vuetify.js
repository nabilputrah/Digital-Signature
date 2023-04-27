import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

const vuetify = new Vuetify({
    theme: {
      themes: {
        light: {
          primary: '#1a5f7a',
          text_main:'#1a5f7a',
          secondary: '#b0bec5',
          accent: '#8c9eff',
          error: '#b71c1c',
          gagal:'#577a1a',
          background:'#FFFFFF'
        },
        dark: {
          primary: '#2196F3',
          secondary: '#607D8B',
          accent: '#FF4081',
          error: '#FF5252',
        },
      },
    },
  })
  
export default new Vuetify({
    vuetify,
});
