<template>
  <v-layout justify-center align-center>
    <div class="cont">
      <h1 class="display-1">Add Challenge</h1>
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
	
      <v-btn color="green" @click="addChallenge" block style="margin-top:35px">Add Challenge</v-btn>
    </div>
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
  name: 'AddChallenge',
  data:()=>{
    return{
      title:'',
      score:'',
      details:'',
      category: '',
      difficulty: '',
      flag: '',
      live:false,
      archive:false,
      active:false,

      fileName:'',
      challengeFile:'',
      editorOptions:{
        placeholder:'Challenge Content...'
      },
      categories:['Misc','Web Security','Exploitation','Reverse Engineering','Cryptography','Malware Analysis','Mobile Security','Forensics','General Information'],
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
    addChallenge(){
      console.log(auth.user().id)
      axios.post("/api/challenges", {
        title: this.title,
        category: this.category,
        difficulty: this.difficulty,
        details: this.details,
        score: this.score,
        flag: this.flag,
        author: auth.user().id,
        live:this.live,
        active:this.active,
        archived:this.archive
      }, {
        headers: {
          "Authorization" : `Bearer ${auth.token()}`
        }
      }).then(resp => {
        this.$router.push("/challenges")
      }).catch(err => {
        console.log(err);
      })
    }
  }
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
