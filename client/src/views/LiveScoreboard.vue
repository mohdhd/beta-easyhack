<template>
    <v-container>
        <div class="d-flex justify-center">
            <v-btn color="grey darken-3" to="/livectf" depressed tile height="70"  ><v-icon class="pa-4">fas fa-layer-group</v-icon></v-btn>
            <v-btn to="/liveboard" active-class="pager" depressed tile height="70" ><v-icon class="pa-4">fas fa-list-ol</v-icon></v-btn>
    </div>
  <v-layout align-center justify-center fill-height>
    <v-card style="margin: 40px 20px 0 20px">
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
    </v-container>
</template>

<script>
// @ is an alias to /src

import axios from "axios"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: 'LiveScoreboard',
  data () {
      return {
        search: '',
        sort:'rank',
        desc:false,
        headers: [
          {
            text: '#RANK', align: 'left', sortable: true, value: 'rank',},
          { text: 'USERNAME', value: 'username' },
          { text: 'SCORE', value: 'liveScore' },
        ],
        users: [],
      }
    },

    mounted() {
      axios.get("/api/users")
      .then(resp => {
        console.log(resp)
        this.users = resp.data.users
                    .filter((user) => user.liveScore != 0)
                    .sort((a, b) => {
                      if(a === b){
                        return 0;
                      }else if(a > b){
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

        let score = this.users[0].liveScore;
        
        let rank = 1;
        this.users[0].rank = 1;
        
        for(let i=1;i<this.users.length;i++){
          rank +=1;
          if(this.users[i].liveScore != score){

            score = user.liveScore;
            this.users[i].rank = rank;
          }else{
            if(this.users[i].liveFlagSubmitTime < this.users[i-1].liveFlagSubmitTime){

              this.users[i].rank  = rank - 1;
              this.users[i-1].rank += 1;
            }else{

              this.users[i].rank = rank;
            }
          }
          score = this.users[i].liveScore;
      }
      }
    },
}
</script>
