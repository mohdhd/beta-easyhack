<template>
  <v-layout align-center justify-center fill-height>
    <v-card style="margin: 0 20px 0 20px">
      <v-card-title>
        ScoreBoard<v-icon class="mdi-server"></v-icon>
        <v-spacer></v-spacer>
        <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
        color="green"
        ></v-text-field>
      </v-card-title>
      <v-data-table
      :mobile-breakpoint="0"
      :headers="headers"
      :items="users"
      :search="search"
      :sort-by.sync="sort"
      :sort-desc.sync="desc"
      :items-per-page="20"
      ></v-data-table>
    </v-card>
  </v-layout>
</template>

<script>
// @ is an alias to /src

import axios from "axios"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: 'scoreboard',
  data () {
      return {
        search: '',
        sort:'rank',
        desc:false,
        headers: [
          {
            text: '#RANK', align: 'left', sortable: true, value: 'rank',},
          { text: 'USERNAME', value: 'username' },
          { text: 'SCORE', value: 'score' },
        ],
        users: [],
      }
    },

    mounted() {
      axios.get("/api/users")
      .then(resp => {
        this.users = resp.data.users
                    .filter((user) => user.score != 0)
                    .sort((a, b) => {
                      if(a.score === b.score){
                        if(a.flagSubmitTime < b.flagSubmitTime){
                          return -1;
                        }else{
                          return 1;
                        }
                      }else if(a.score > b.score){
                        return -1;
                      }else{
                        return 1;
                      }
                    })
        this.setRanks();
      }).catch(err => {
        console.log(err)
      })
    },

    methods: {
      setRanks(){
        
        let rank = 1;
        
        for(let i=0;i<this.users.length;i++){

            this.users[i].rank = rank;
            rank++;
      }
      }
    },

    metaInfo: {

      title: 'EasyHack ctf - Scoreboard',

    }
}
</script>
