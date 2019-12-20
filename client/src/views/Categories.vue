<template>
  <v-container>
    <v-layout wrap class="lay">

        <v-flex v-for="cat in categories" :key="cat" lg3 md6 s6 xs12 class="pa-4">
            <v-card :to="'/challenges/'+ cat.split(' ').join('-')" min-height="150px" v-ripple class="green">
                <v-card-text style="font-size:23px" class="white--text d-flex" >
                    <div style="margin-top:5px;margin-right:10px">{{cat}}</div>
                </v-card-text>

                <v-card-text class="d-flex justify-end">
                <v-icon size="37" class="ma-1">{{renderIcon(cat)}}</v-icon>
                </v-card-text>
            </v-card>

            
        </v-flex>
       
    </v-layout>
  </v-container>
</template>

<script>


// @ is an alias to /src

import axios from "axios"
import auth from '../auth';

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: 'Categories',

  data: ()=> ({
    categories:['Misc','Web Security','Exploitation','Reverse Engineering','Cryptography','Malware Analysis','Mobile Security','Forenscis','General Information'],
    
  }),

  methods:{
      renderIcon(name){
            if(name == 'Web Security'){
                return 'fas fa-passport'
            }else if(name == 'Exploitation'){
                return 'fas fa-bug'
            }else if(name == 'Reverse Engineering'){
                return 'fas fa-random'
            }else if(name == 'Misc'){
                return 'fas fa-asterisk'
            }else if(name == 'Cryptography'){
                return 'fas fa-lock'
            }else if(name == 'Malware Analysis'){
                return 'fas fa-puzzle-piece'
            }else if (name == 'Mobile Security'){
                return 'fas fa-mobile-alt'
            }else if (name == 'Forenscis'){
                return 'fas fa-search';
            }else if(name == 'General Information'){
                return 'fas fa-globe';
            }
      }
  }

  
}
</script>
