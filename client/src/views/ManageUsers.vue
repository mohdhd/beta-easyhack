<template>
    
    <v-container>
        <div class="display-1">Manage Users</div>

         <v-text-field 
        v-model="search"
        placeholder="Search..."
        class="pa-4"
        @input="handleSearch"
        />

        <UserRow
            v-for="u in tmpUsers"
            :key="u.id"
            :name="u.username"
            :admin="u.isAdmin"
            :id="u._id"
            @deleted="handleDelete"
        />
    </v-container>
</template>

<script>
import UserRow from '../components/UserRow';

import axios from "axios"
import auth from "../auth.js"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://backend.easyhackctf.com"

export default {
    name:'ManageUsers',
    data:()=>{
        return{
            search:'',
            users: [],
            tmpUsers:[]
        }
    },
    components:{UserRow},

    mounted() {
        axios.get("/api/users")
        .then(resp => {
            this.users = resp.data.users;
            this.tmpUsers = resp.data.users;
        }).catch(err => {
            console.log(err);
        })
    },

    methods: {
        handleDelete(_id){
            this.users = this.users.filter(u => u._id != _id);
        },
        handleSearch(){
            this.tmpUsers = this.users.filter(item=> item.username.indexOf(this.search) !== -1)
        }
    },
}

</script>
