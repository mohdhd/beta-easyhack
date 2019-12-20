<template>

<v-container dark class="elevation-3 ma-1 grey darken-3">
<v-layout wrap>

    <v-flex lg9 md8 sm7 xs3 >
         <div class="pa-4">
             {{name}}
         </div>
    </v-flex>

    <v-flex lg3 md4 sm5 xs9 >
        <v-btn v-if="!admin" class="ma-2" @click="promoteDialog=true" color="green darken-2">Promote</v-btn>

        <div v-if="admin" class="admin-text green--text">Admin</div>

        <v-btn  color="red darken-2" @click="deleteDialog=true">Delete</v-btn>
    </v-flex>

    <v-dialog v-model="deleteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete User</v-card-title>
        <v-card-text>Are you sure you want to delete this User?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="deleteDialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteUser">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="promoteDialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">promote User</v-card-title>
        <v-card-text>Are you sure you want to promote this User?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="promoteDialog = false">Cancel</v-btn>
          <v-btn color="green darken-1" text @click="promoteUser">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
</v-layout>
</v-container>
    
</template>

<script>
import axios from "axios"
import auth from "../auth.js"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
    name:'UserRow',
    props:['id', 'name','admin'],
    data:()=>{
        return {
            promoteDialog:false,
            deleteDialog:false
        }
    },
    methods:{
        deleteUser(){
            this.deleteDialog = false;
            axios.delete("/api/users/" + this.id, {headers: {"Authorization" : `Bearer ${auth.token()}`}})
            .then(resp => {
              this.$emit("deleted", this.id);
            }).catch(err => {
              console.log(err);
            })
        },
        promoteUser(){
            this.promoteDialog = false;
            axios.post("/api/users/" + this.id + "/promote",
                {}, {headers: {"Authorization" : `Bearer ${auth.token()}`}}
            ).then(resp => {
                this.admin = true;
            }).catch(err => {
                console.log(err);
            })
        }
    }
}

</script>

<style>

.admin-text{
    display: inline-block;
    font-size: 17px;
    width:105px;
    margin-left: 15px;
    margin-top:10px;
    text-align: center;
}

</style>
