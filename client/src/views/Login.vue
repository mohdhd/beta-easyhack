<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12" style="margin: 0 20px 0 20px">
        <v-toolbar dark color="green">
          <v-toolbar-title>Login Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="handleSubmit" v-model="valid">
            <v-text-field
              v-model="username"
              name="username"
              label="Username"
              id="username"
              type="text"
              color="green"
              :rules="usernameRules"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              name="password"
              label="Password"
              id="password"
              type="password"
              color="green"
              :rules="passwordRules"
              required
            ></v-text-field>

            
            <v-alert v-if="activateMsg" class="ma-2" border="left" type="warning">
           please activate your account first if you didn't get your activation link click <span @click.stop="handleResend" style="text-decoration:underline;cursor:pointer">here</span>
            </v-alert>

            <router-link v-if="showRecover" to="/recoverpassword" class="light-blue--text" style="cursor:pointer;text-decoration:none">forgot your password? </router-link>

            <v-spacer></v-spacer>
          
            <v-spacer></v-spacer>


            <div v-if="loading" class="d-flex justify-center">
              <v-progress-circular
            :indeterminate="true"
            size="40"
            color="light-green"
          ></v-progress-circular>
            </div>

            <v-btn class="ma-2" v-else type="submit" dark color="green" :disabled="!valid || loading" @click="handleSubmit">
            Login
          </v-btn>
          </v-form>
        </v-card-text>

        <v-card-actions>
          
          
        </v-card-actions>
      </v-card>
    </v-flex>
    <v-snackbar left :color="color" v-model="snackbar">
              {{ message }}
    </v-snackbar>

  </v-layout>
</template>


<script>
// @ is an alias to /src

import auth from '../auth'
import axios from 'axios';

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: 'login',

  data: ()=> ({
    valid: false,

    message: '',

    loading:false,
    showRecover:false,

    username: "",
    usernameRules: [
      v => !!v || 'username is required',
      v => (v && v.length > 2 && v.length < 26) || 'username must be between 2 and 25 characters',
    ],

    password: "",
    passwordRules: [
      v => !!v || 'password is required',
      v => (v && v.length >= 8) || 'password must be at least 8 characters',
    ],
    snackbar:false,
    activateMsg:false,
    color:''
  }),

  methods: {
    handleSubmit() {
      if(!this.$refs.form.validate()){
        return;
      }
      this.message = "";
      this.loading = true;
      this.activateUsername = this.username;

      auth.login(this.username, this.password, (loggedIn, message) => {
        if(loggedIn){
          this.$emit("authChange");
          this.$router.push("/")
        }else{
          this.message = message;
          this.snackbar = true;

          if(message == 'please verify your email first'){
            this.color = 'warning'
            this.activateMsg = true 
          }else{
            this.color = 'error'
            this.showRecover = true;
          }
        }
        this.loading = false;
      });
    },

    handleResend(){
      this.loading = true;
      axios.post("/api/users/resend_username",{
        username:this.username
      }).then(resp => {
      this.loading =false;
      if(!resp.data.error){
        this.color = 'success';
        this.message = resp.data.message;
        this.snackbar = true;
      }else{
        this.color = 'error';
        this.message = 'An error occured please try again';
        this.snackbar = true;
      }
    }).catch(err => {
      console.log(err);
      this.loading = false;
    })
    }
  },

  metaInfo: {

      title: 'EasyHack ctf - Sign In',

    }
}
</script>

<style scoped>
</style>
