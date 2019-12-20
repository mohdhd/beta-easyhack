<template>
  <v-layout align-center justify-center>
    <div class="cont">
      <h1 class="display-1">Edit Challenge</h1>
        <v-text-field
        label="Title"
        color="green"
        name="title"
        v-model="title"
        />

        <v-text-field
        label="Score"
        color="green"
        name="score"
        v-model="score"
        />

        <v-select 
        label="Category"
        :items="categories"
        color="green"
        v-model="category"
        />

        <v-select 
        label="Difficulty"
        :items="difficulties"
        color="green"
        v-model="difficulty"
        />

        <v-text-field
        label="flag"
        color="green"
        name="flag"
        v-model="flag"
        />


        <quillEditor
        :content="details"
        v-model="details"
        :options="editorOptions"
        />

        <!-- <div class="grey--text">Challenge File:</div>

        <div class="file-selector" @click='pickFile'>
          <v-icon color="grey">attach_file</v-icon>
          {{fileName}}
        </div>

        <input
			type="file"
			style="display: none"
			ref="file"
			@change="onFilePicked"
        /> -->

    <div>
        <v-checkbox
      v-model="live"
      label="live"
      dense
      color="success"
      ></v-checkbox>
      <v-checkbox
      v-model="archive"
      label="archive"
      dense
      color="success"
      ></v-checkbox>
      <v-checkbox
      v-model="active"
      label="active"
      dense
      color="success"
      ></v-checkbox>
      </div>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Update Challenge</v-card-title>
        <v-card-text>Are you sure you want to update this challenge?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="updateChallenge">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

      
      <v-btn color="green" @click="dialog=true" block style="margin-top:35px">Update Challenge</v-btn>

    </div>

    <v-snackbar left color="success" v-model="snackbar">
              {{ message }}
      </v-snackbar>

  </v-layout>
</template>

<script>
// @ is an alias to /src
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

import { quillEditor } from 'vue-quill-editor'

import axios from "axios"
import auth from "../auth.js"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: 'EditChallenge',
  data:()=>{
    return{
      message: "",

      title:'',
      score:'',
      details:'',
      category: '',
      difficulty: '',
      flag:'',

      live:false,
      archive:false,
      active:false,
      snackbar:false,

      fileName:'',
      challengeFile:'',
      dialog:false,
      editorOptions:{
        placeholder:'Challenge Content...'
      },
      categories:['Misc','Web Security','Exploitation','Reverse Engineering','Cryptography','Malware Analysis','Mobile Security','Forenscis','General Information'],
      difficulties: ["Easy", "Medium", "Advanced"]
    }
  },
  components:{quillEditor},
  methods:{
    pickFile () {
            this.$refs.file.click ()
        },
    onFilePicked (e) {
			const files = e.target.files
			if(files[0] !== undefined) {

        this.fileName = files[0].name
        this.challengeFile = files[0];

			} else {
				this.fileName = ''
				this.challengeFile = ''
			}
    },
    updateChallenge(){
      this.message = "";
      axios.put("/api/challenges/" + this.$route.params.id,
      {title: this.title, score: this.score,
      details: this.details, category: this.category, difficulty: this.difficulty,
      live:this.live,archived:this.archive,active:this.active,flag:this.flag
      },
      {
        headers: {
          "Authorization" : `Bearer ${auth.token()}`}
        }
      ).then(resp => {
        this.message = resp.data.message;
        this.dialog = false;
        this.snackbar = true
      }).catch(err => {
        console.log(err)
      })
    },
  },
  mounted() {
    axios.get("/api/challenges/admin/" + this.$route.params.id,{
        headers: {
          "Authorization" : `Bearer ${auth.token()}`}
        })
      .then(resp => {
        console.log(resp)
        let ch = resp.data.challenge;
        this.title = ch.title;
        this.score = ch.score;
        this.details = ch.details;
        this.category = ch.category;
        this.difficulty = ch.difficulty;
        this.live = ch.live
        this.archive = ch.archived;
        this.active = ch.active;
        this.flag = ch.flag;
      }).catch(err => {
        console.log(err);
      })
    },
}
</script>

<style>

.quill-editor {
  background:whitesmoke;
  color:black;
  margin-top:15px;
  margin-bottom: 20px;
  font-size: 25px;
  
}

.file-selector{
  padding: 10px;
  border-bottom: gray 1px solid;
  color: grey;
}

.cont{
  max-width: 80%;
} 

@media screen and (min-width: 1280px) {
  .cont{
    max-width: 50%;
  } 
}
</style>
