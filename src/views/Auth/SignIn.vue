<template>
  <div style="height: 100vh;" >

      <v-card
          style="opacity: .97"
    
          class="signinContainer"
          elevation="2"
      >

        <v-card
            elevation="0"
            class="formCard"
        >
          <v-card-title >Авторизация</v-card-title>
          
          <v-form
          
              ref="form"
              v-model="valid"
              lazy-validation
          >
            <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>

            <v-text-field
                v-model="password"
                :rules="passwordRules"
                label="Пароль"
                required
                :type="show1 ? 'text' : 'password'"
                :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="show1 = !show1"
            ></v-text-field>

            <v-btn
                :disabled="!valid"
                color="primary"
                class="mr-4 mt-4 mb-4 w-100"
                @click="validate"
            >Войти</v-btn>

            <v-btn
                color="primary"
                class="mr-4 mt-4 mb-4 w-100"
                href="http://awesomesql.ru/login"
            >Войти через миэм</v-btn>

          </v-form>
        </v-card>
      </v-card>
    <img class="d-md-block d-none" style="position: fixed;width:100%;height: 100vh;z-index: 0" src="@/assets/imgs/signin.jpg"  >
    <img class="d-md-none d-block" style="position: fixed;height: 100vh;z-index: 0" src="@/assets/imgs/signin.jpg"  >
  </div>
</template>

<script>
import Swal from "sweetalert2";

export default {
  name: "SignIn",
  data: () => ({
    show1: false,
    valid: true,
    password: '',
    passwordRules: [
      v => !!v || 'Пароль не указан',
      v => (/\d/.test(v) && /[a-zA-Z]/.test(v)) || 'Пароль должен содержать цифры и латинские буквы',
    ],
    email: '',
    emailRules: [
      v => !!v || 'E-mail не указан',
      v => /.+@.+\..+/.test(v) || 'Некорректный e-mail ',
    ],
    select: null,

    checkbox: false,
  }),

  created(){
    if(this.$store.state.jwt != null && this.$store.state.user != null  ){
      if(this.$store.state.user.isTeacher){
        this.$router.replace("teacher/")
      }
      else {
        this.$router.replace("student/")
      }
    }
  },


  methods: {
    async validate () {
      if(this.$refs.form.validate()){
          var result = await this.$store.dispatch("LoginUser",{password:this.password, email:this.email})
          if(result === false){
            this.$refs.form.reset()
             Swal.fire({
                    icon: 'error',
                    title: 'Неверный пароль или логин',
                })
          }
      }
    },
  },
}
</script>
