<template>
  <v-container>
      <div class="d-flex justify-center">
            <v-btn to="/livectf" depressed tile height="70" active-class="pager"  ><v-icon class="pa-4">fas fa-layer-group</v-icon></v-btn>
            <v-btn color="grey darken-3" to="/liveboard" active-class="pager" depressed tile height="70" ><v-icon class="pa-4">fas fa-list-ol</v-icon></v-btn>
    </div>
    <v-layout wrap class="lay">

        <ChallengeCard
        v-for="ch in challenges"
        v-bind:key="ch._id"
        :id="ch._id"
        :title="ch.title"
        :difficulty="ch.difficulty"
        :submission="ch.submissions"
        :solves="ch.solves"
        :category="ch.category"
        :score="ch.score"
        :content="ch.details"
        :solved="(solved.indexOf(ch._id) !== -1)"
        />

        <div v-if="challenges.length == 0" style="font-size:20px" class="d-flex mx-auto grey--text ma-4">There are no challenges yet</div>
    </v-layout>
  </v-container>
</template>

<script>

import ChallengeCard from '../components/ChallengeCard';
// @ is an alias to /src

import axios from "axios"
import auth from '../auth';

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://backend.easyhackctf.com"

export default {
  name: 'LiveCtf',
  components:{ChallengeCard},

  data: ()=> ({
    challenges: [],
    solved:[]
  }),

  mounted() {
    axios.get("/api/challenges/available",{
          headers: {
            "Authorization" : `Bearer ${auth.token()}`}
          })
    .then(resp => {
      this.challenges = resp.data.challenges.reverse();
    }).catch(err => {
      console.log(err);
    })

    axios.get("/api/users/solved/" + auth.user().id)
    .then(resp => {
      this.solved = resp.data.solvedChallenges;
    }).catch(err => {
      console.log(err);
    })
  },
}
</script>


<style>

.pager{
    background:rgb(27, 165, 27) !important;
}

</style>