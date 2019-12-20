<template>
    <v-flex class="pa-4" lg4 md6 s6 xs12>
    <v-card min-height="170px">
      <v-card-title class="mx-auto green darken-2">
        <v-spacer></v-spacer>
        {{title}}
        <v-spacer></v-spacer>
      </v-card-title>

      <v-card-text id="card-text">
        <div class="challenge-info" id="category">
          <div>{{category}}</div>
        </div>

        <div class="challenge-info">
          <div>{{difficulty}}</div>
        </div>

        <div class="challenge-info">
          <div>{{score}} points</div>
        </div>

        <v-layout>
            <v-flex xs7 ><v-btn :to="'/editchallenge/' + id" color="green darken-2">edit</v-btn></v-flex>
             <v-flex ><v-btn @click.stop="dialog=true"  color="red darken-2">delete</v-btn></v-flex>
        </v-layout>
      </v-card-text>
    </v-card>

    <v-layout justify-center>
    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete Challenge</v-card-title>
        <v-card-text>Are you sure you want to delete this challenge?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteChallenge">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
    </v-flex>
</template>

<script>

import axios from "axios"
import auth from "../auth.js"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://backend.easyhackctf.com"

export default {
    name:'AdminChallengeCard',
    props:['id', 'title','category','difficulty','score','solved'],
    data:()=>{
      return {
        dialog:false,
      }
    },
    methods:{
      deleteChallenge(){
        this.dialog = false;
        axios.delete("/api/challenges/" + this.id, {
          headers: {
            "Authorization" : `Bearer ${auth.token()}`}
          }
        )
        .then(resp => {
          this.dialog = false;
          this.$emit("deleted", this.id);
        }).catch(err => {

        })
      }
    }
}

</script>
