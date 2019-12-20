<template>
  <v-flex class="pa-4" lg3 md6 s6 xs12>
    <v-card @click.stop="dialog =true" v-ripple min-height="170px">
      <v-card-title  :class="`mx-auto ${(solvedFlag) ? 'blue' : 'green'} darken-2`">
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

        <div class="challenge-info">
          <div>solved {{solvesCount}} times</div>
        </div>
      </v-card-text>
    </v-card>

    <v-dialog dark max-width="750px" v-model="dialog">
      <v-card>
        <v-card-title class="green darken-2">{{title}}</v-card-title>

        <v-card-text id="card-text">
          <v-container>
            <v-layout wrap>
              <ChallengeColumn name="score" :value="score"/>

              <ChallengeColumn name="category" :value="category"/>

              <ChallengeColumn name="difficulty" :value="difficulty"/>

              <ChallengeColumn name="submissions" :value="submissionCount"/>

              <ChallengeColumn name="solved" :value="solvesCount"/>
            </v-layout>

            <v-layout wrap column>
              <div class="content-title">Info:</div>

              <v-container class="content-container grey darken-2 elevation-1" v-html="content">
              </v-container>
            </v-layout>

            <v-layout class="pa-2" wrap column>
                  
              <v-form ref="form" 
                @submit.prevent="handleSubmit"
                v-model="valid">
                <v-text-field
                  v-model="flag"
                  name="flag"
                  label="Flag"
                  type="text"
                  color="green"
                  :rules="flagRules"
                  required
                ></v-text-field>
              </v-form>

              <v-btn dark color="green" :disabled="!valid" @click.stop="handleSubmit">Submit</v-btn>

            </v-layout>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
     <v-snackbar left :color="color" v-model="snackbar">
                {{ message }}
      </v-snackbar>
  </v-flex>
</template>

<script>
import ChallengeColumn from "./ChallengeColumn";
import axios from "axios";
import auth from "../auth.js";

axios.defaults.baseURL =
axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: "ChallengeCard",

  props: [
    "id",
    "title",
    "solved",
    "category",
    "score",
    "submission",
    "difficulty",
    "content",
    "solves"
  ],

  components: { ChallengeColumn },

  data: () => {
    return {
      dialog: false,
      valid: false,
      color:'',
      message: "some text",
      snackbar: false,
      flag: "",
      solvesCount:'',
      submissionCount:'',
      flagRules: [v => !!v || "flag is required"],
      solvedFlag:false
    };
  },

  methods: {
    handleSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      this.message = "";
      axios
        .post(
          "/api/challenges/" + this.id,
          { flag: this.flag },
          { headers: { Authorization: `Bearer ${auth.token()}` } }
        )
        .then(resp => {
          let msg = resp.data.message;
          this.snackbar= true;
          this.submissionCount = resp.data.submissions;
          this.solvesCount = resp.data.solves;

          if(msg === 'Wrong Flag'){
            this.color = 'red';
          }else if(msg === "The flag is correct!"){
            this.color= 'green';
            this.solvedFlag = true;
          }else{
            this.color = 'yellow darken-3';
          }

          this.message = msg
        })
        .catch(error => {
          console.log(error)
           this.snackbar= true;
           this.color = 'red';
          this.message = "An error occured, Please try again in a moment";
        });
    }
  },

  mounted(){
    this.solvesCount = this.solves;
    this.submissionCount = this.submission;
    this.solvedFlag = this.solved;
  }
};
</script>

<style>
#card-text {
  margin-top: 20px;
}
.challenge-info {
  display: block;
  background: #5b5b5b;
  padding: 10px;
  margin-bottom: 10px;
  text-align: center;
  border-radius: 0px;
}

.content-title {
  font-size: 20px;
  margin-top: 15px;
  margin-bottom: 10px;
}

.content-container {
  height: 200px;
  color: white;
  font-size: 16px;
  overflow: auto;
}
</style>
