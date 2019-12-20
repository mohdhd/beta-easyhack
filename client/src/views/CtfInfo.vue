<template>
<v-container class="pa-2">
    <v-form>

        <v-text-field 
        v-model="version" 
        label="Version" 
        color="green"
        required
        ></v-text-field>

        <div>
        <p class="date-title" color="green">Pick Starting Date:</p>
        <datetime input-class="datePicker" type="datetime" v-model="startDate"></datetime>
    </div>

    <div>
        <p class="date-title" color="green">Pick Finishing Date:</p>
        <datetime input-class="datePicker" type="datetime" v-model="finishDate"></datetime>
    </div>

    <v-textarea
      label="About text"
      v-model="about"
      color="green"
    ></v-textarea>

    <div class="pa-4">
        <v-btn dark block color="green" @click.stop="handleSubmit">
            Update
    </v-btn>
    </div>

    </v-form>

    <v-snackbar left :color="color" v-model="snackbar">
              {{ message }}
      </v-snackbar>

</v-container>
</template>

<script>
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css'

import axios from "axios"
import auth from "../auth.js"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: "Ctf",
  data: () => {
    return {
      version:'',
      startDate: '',
      finishDate:'',
      about:'',

      message: "",
      id: "",
      color:'',
      snackbar:false
    };
  },
  components: {
    datetime:Datetime
  },

  mounted(){
    axios.get("/api/ctf").then(resp => {

      let ctf = resp.data.ctfs[0]

      this.id = ctf._id;
      this.version = ctf.version;
      this.startDate = ctf.startDate;
      this.finishDate = ctf.finishDate;
      this.about = ctf.about;
    }).catch(err => {
      console.log(err);
    })
  },
  methods:{
    handleSubmit(){
      axios.put("/api/ctf/" + this.id,
        {
          version: this.version,
          startDate: this.startDate,
          finishDate: this.finishDate,
          about: this.about
        }, {
          headers: {
            "Authorization" : `Bearer ${auth.token()}`}
          }
        )
        .then(resp => {
          
          this.message = resp.data.message;
          this.color = "success";
          this.snackbar = true
        }).catch(err => {
          console.log(err);
          this.color = "error";
          this.snackbar = true;
          this.message = "failed to update"
        })
    }
  }
};
</script>

<style>

.datePicker{
    border-bottom:rgb(195, 195, 195) 1px solid;

    width:100%;
    margin-bottom: 20px;
}

.date-title{
    color:rgb(187, 184, 184);
}


</style>
