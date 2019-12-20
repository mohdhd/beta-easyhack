<template>
  <v-container>
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

        <div v-if="challenges.length == 0" style="font-size:20px" class="d-flex mx-auto grey--text">There are no challenges yet</div>
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
  name: 'Challenges',
  components:{ChallengeCard},

  data: ()=> ({
    challenges: [],
    solved:[]
  }),

  mounted() {
    axios.get("/api/challenges/category/" + this.$route.params.cat.split('-').join(' '),{
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
