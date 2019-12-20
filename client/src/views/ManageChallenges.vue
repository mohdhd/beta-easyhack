<template>
    <v-container>

       <div>

        <v-btn to="/addchallenge" color="green darken-2">
            <v-icon>add</v-icon>
            Add Challenge
        </v-btn>

        <v-text-field 
        v-model="search"
        placeholder="Search..."
        class="pa-4"
        @input="handleSearch"
        />

       </div>

        <v-layout wrap>
            <AdminChallengeCard
            v-for="ch in tmpChallenges"
            v-bind:key="ch._id"
            :id="ch._id"
            :title="ch.title"
            :difficulty="ch.difficulty"
            :solved="ch.solves"
            :category="ch.category"
            :score="ch.score"
            @deleted="handleDelete"
            />
        </v-layout>
    </v-container>
</template>


<script>
import AdminChallengeCard from '../components/AdminChallengeCard';

import axios from "axios"
import auth from "../auth.js"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
    name:'ManageChallenges',
    components:{AdminChallengeCard},
    data:()=>{
        return {
            search:'',

            challenges: [],
            tmpChallenges:[]
        }
    },
    
    mounted() {
        axios.get("/api/challenges",{
          headers: {
            "Authorization" : `Bearer ${auth.token()}`}
          })
        .then(resp => {
            this.challenges = resp.data.challenges;
            this.tmpChallenges = resp.data.challenges;
        }).catch(err => {
            console.log(err)
        })
    },

    methods: {
        handleDelete(_id){
            this.challenges = this.challenges.filter(ch => ch._id != _id)
        },
        handleSearch(){
            this.tmpChallenges = this.challenges.filter(item=> item.title.indexOf(this.search) !== -1)
        }
    },
}

</script>