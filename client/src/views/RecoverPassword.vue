<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12" style="margin: 0 20px 0 20px">
        <v-toolbar dark color="green">
          <v-toolbar-title>Password Recovery</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" @submit.prevent="handleSubmit" v-model="valid">
            <v-text-field
              v-model="email"
              name="email"
              label="Enter Your Email"
              id="email"
              type="text"
              color="green"
              :rules="emailRules"
              required
            ></v-text-field>



            <v-spacer></v-spacer>
          
            <v-spacer></v-spacer>

            <v-alert v-if="activateMsg" class="ma-2" border="left" type="success">
                A link to recover your password has been sent to your account
            </v-alert>


            <div v-if="loading" class="d-flex justify-center">
              <v-progress-circular
            :indeterminate="true"
            size="40"
            color="light-green"
          ></v-progress-circular>
            </div>

            <v-btn class="ma-2" v-else type="submit" dark color="green" :disabled="!valid || loading" @click="handleSubmit">
            Send
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

const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;


export default {
  name: 'PasswordRecovery',
        
  data: ()=> ({
    valid: false,

    message: '',

    loading:false,

    email: "",
    emailRules: [
      v => !!v || 'email is required',
      v => re.test(String(email.value).toLowerCase()) || 'Enter a valid email',
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
      this.activateMsg = false;

      axios.post("/api/users/send_password_recovery",{
        email:this.email
      }).then(resp => {
      this.loading =false;

      if(!resp.data.error){
        this.color = 'success';
        this.message = resp.data.message;
        this.snackbar = true;
        this.activateMsg = true
      }else{
        this.color = 'error';
        this.message = resp.data.message;
        this.snackbar = true;
      }
    }).catch(err => {
      console.log(err);
      this.loading = false;
    })

    },

  },

  metaInfo: {

      title: 'EasyHack ctf - Password Recovery',

    }

}
</script>

<style scoped>
</style>
