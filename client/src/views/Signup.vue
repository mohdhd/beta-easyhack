<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12" style="margin: 0 20px 0 20px">
        <v-toolbar dark color="green">
          <v-toolbar-title>SignUp Form</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form @submit.prevent="handleSubmit" ref="form" v-model="valid">
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
              v-model="email"
              name="email"
              label="Email"
              id="email"
              type="email"
              color="green"
              :rules="emailRules"
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

            <v-text-field
              v-model="confirm"
              name="confirm-password"
              label="Confirm Password"
              id="confirm-password"
              type="password"
              color="green"
              :rules="passwordRules.concat([ confirmRule ])"
              required
            ></v-text-field>

            <v-alert v-if="activateMsg" class="ma-2" border="left" type="success">
            An activation link has been sent to your email please verify your account. click <span @click.stop="handleResend" style="text-decoration:underline;cursor:pointer">here</span> to resend the link if you didn't get it.
          </v-alert>
            <v-card-actions>
          
          <v-spacer></v-spacer>


           <div v-if="loading" class="d-flex justify-center">
              <v-progress-circular
            :indeterminate="true"
            size="40"
            color="light-green"
          ></v-progress-circular>
            </div>

        <v-btn dark v-else type="submit" color="green" :disabled="!valid || loading">
            Sign Up
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
          </v-form>
          <p class="error--text" v-if="color=='error'">{{message}}</p>
        </v-card-text>

        
      </v-card>
    </v-flex>

    <v-snackbar left :color="color" v-model="snackbar">
              {{ message }}
      </v-snackbar>
  </v-layout>
</template>


<script>
// @ is an alias to /src
import auth from "../auth"
import axios from 'axios';

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: 'login',

  data: ()=> ({
    valid: false,

    message: "",

    loading:false,

    username: "",
    email:"",
    usernameRules: [
      v => !!v || 'username is required',
      v => (v && v.length >= 5 && v.length < 26) || 'username must be between 5 and 20 characters',
    ],

    emailRules: [
      v => !!v || 'username is required',
    ],

    password: "",
    passwordRules: [
      v => !!v || 'password is required',
      v => (v && v.length >= 8) || 'password must be at least 8 characters',
    ],
    snackbar : false,

    confirm: "",
    color:"",
    activateMsg:false,
    activateEmail:''
  }),

  methods: {
    handleSubmit() {
      if(!this.$refs.form.validate()){
        return;
      }

      this.loading = true;
      this.message = "";
      this.activateEmail = this.email;

      auth.signup(this.username, this.password,this.email, (status, message) => {
        if(status){
          this.message = message;
          this.snackbar = true;
          this.color = 'success';
          this.activateMsg = true;
        }else{
          this.message = message;
          this.snackbar = true;
          this.color = 'error';
        }

        this.loading = false;
      });
    },
    confirmRule(val){
      if(val != this.password){
        return "the two passwords must be identical";
      }else{
        return true;
      }
    },

    handleResend(){
      
      this.loading = true;
      axios.post("/api/users/resend_activation",{
        email:this.activateEmail
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

      title: 'EasyHack ctf - Sign Up',

    }
}
</script>

<style scoped>
</style>
