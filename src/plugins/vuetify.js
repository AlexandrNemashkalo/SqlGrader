import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import ru from 'vuetify/es5/locale/ru'

Vue.use(Vuetify)

export default new Vuetify({
    theme: {
        dark: false,
        lang:{
            locales: { ru },
            current: 'ru'
        },
        themes: {
            light: {
                primary: '#652CD4'
            },
            dark: {
                primary: '#652CD4'
            }
        },
    },
})
