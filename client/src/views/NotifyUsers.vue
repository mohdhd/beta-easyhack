<template>
    <v-container class="pa-4">
        <v-text-field
        name="event"
        label="event"
        v-model="event"
        />

        <v-textarea 
        label="message"
        v-model="message"
        ></v-textarea>

        <p class="date-title" color="green">Remove At</p>
        <datetime input-class="datePicker" type="datetime" v-model="removeAt"></datetime>


        <v-btn style="margin-top:20px" @click.stop="sendNotification" block color="green">Notfiy</v-btn>

         <v-snackbar left :color="color" v-model="snackbar">
              {{ snackMsg }}
      </v-snackbar>

    </v-container>
</template>


<script>

import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'

import axios from "axios"
import auth from "../auth.js"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://backend.easyhackctf.com"

export default{
    name:'NotifyUsers',
    data:()=>{
        return{
            event:'',
            message:'',
            removeAt:'',
            color:'',
            snackMsg:''

        }
    },
    methods:{
        sendNotification(){
             axios.post("/api/users/notify",
        {
          event: this.event,
          message: this.message,
          removeAt: this.removeAt
        }, {
          headers: {
            "Authorization" : `Bearer ${auth.token()}`}
          }
        )
        .then(resp => {

          this.snackMsg = resp.data.message;
          this.color = "success";
          this.snackbar = true

          this.event = '';
          this.message = '';
          this.removeAt = '';

        }).catch(err => {
          console.log(err);
          this.color = "error";
          this.snackbar = true;
          this.snackMsg = "An error occured please try again"
        })
    }
    },
    components:{Datetime}
}

</script>