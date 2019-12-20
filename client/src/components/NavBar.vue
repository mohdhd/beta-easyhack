<template>
  <v-container  >
    
    <v-toolbar style="padding:5px" >

      <router-link to="/"><img class="logo" src="/logo.png"/></router-link>

      <v-spacer></v-spacer>


      <div class="hidden-md-and-up" v-if="!g_loggedIn">
        <v-btn text @click.stop="drawer = !drawer"><v-icon size="30">menu</v-icon></v-btn>
      </div>

      

        <v-toolbar-items v-if="!g_loggedIn" class="hidden-sm-and-down">
      

        <v-btn text to="/">home</v-btn>
        <!-- <v-btn text to="/challenges" v-if="g_loggedIn">challenges</v-btn> -->
        <v-btn text to="/scoreboard">scoreboard</v-btn>
        <v-btn text to="/signup" v-if="!g_loggedIn">sign up</v-btn>
        <v-btn text to="/login" v-if="!g_loggedIn">sign in</v-btn>
        <!-- <v-btn text to="/admin/ctf" v-if="g_isAdmin && g_loggedIn">Admin Panel</v-btn>
        <v-btn text @click="logout" v-if="g_loggedIn">logout</v-btn> -->

        
      </v-toolbar-items>

      <v-toolbar-items v-else>
      

      <v-menu
      nudge-bottom="75"
      nudge-width="200"
      nudge-left="130"
      max-width="280"

      >
      <template v-slot:activator="{on}">
            <div :style="(unread) ? 'dipslay:block' : 'display:none' " class="notification-indicator"></div>
            <v-btn
              style="z-index:3;"
              v-on="on"
              depressed 
              tile
              @click.stop="setRead"
              color="transparent"
            ><v-icon>fas fa-bell</v-icon></v-btn>
      </template>

      <v-list>
        <v-list-item v-for="item in notifications" :key="item.id" ripple three-line class="d-flex flex-column align-start justify-start">
          <div style="font-size:17px">{{item.event}}</div>
          <div class="ma-1" style="font-size:14px">{{item.message}} </div>
          <div style="font-size:13px" class="grey--text align-self-end">{{renderDate(item.createdAt) }}</div>
          
        </v-list-item>
        
        <v-list-item v-if="notifications.length == 0" class="pa-0 d-flex align-center justify-center">
          <div style="font-size:16px" class="grey--text">There's no notification</div>
           
          
        </v-list-item>
        
      </v-list>
    </v-menu>

        <v-btn text @click.stop="drawer = !drawer"><v-icon size="30">menu</v-icon></v-btn>
        
      </v-toolbar-items>
    </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      temporary
      app
      hide-overlay
      right
      width = "300"
      id = "drawer"
      value="false"
    >

    <v-list nav>

      <v-list-item color="white" to="/">

       <div>
            <v-icon size="20" >home</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Home</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

       <v-list-item v-if="g_loggedIn" color="white" to="/livectf">

       <div>
            <v-icon size="17" >fas fa-flag</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Live Ctf</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

      <v-list-item color="white" v-if="g_loggedIn" to="/categories">

       <div>
            <v-icon size="20" >view_day</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Archived Challenges</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

      <v-list-item color="white" to="/scoreboard">

       <div>
            <v-icon size="20" >format_list_bulleted</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Scoreboard</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

      
      <v-list-item color="white" to="/signup" v-if="!g_loggedIn">

       <div>
            <v-icon size="20" >person_add</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Signup</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

      <v-list-item color="white" to="/login" v-if="!g_loggedIn">

       <div>
            <v-icon size="20" >person</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Login</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

      <v-list-item color="white" to="/admin/ctf" v-if="g_isAdmin && g_loggedIn">

       <div>
            <v-icon size="20" >settings</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Admin Panel</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

      <v-list-item color="white" @click="logout" v-if="g_loggedIn">

       <div>
            <v-icon size="20" >logout</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Logout</v-list-item-title>
          </v-list-item-content>

      </v-list-item>


    </v-list>

    </v-navigation-drawer>

  </v-container>
  
</template>

<script>
import auth from "../auth"
import axios from 'axios';
import  moment from 'moment';

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://betabackend.easyhackctf.com"

export default {
  name: "navbar",
  props: ["g_loggedIn", "g_isAdmin"],
  data: () => ({
    drawer: false,
    notifications:[],
    unread:false
  }),
  methods: {
    logout(){
      auth.logout();
      this.$emit("authChange");
      this.$router.push("/login");
    },
    setRead(){
      axios.get("/api/users/read/notification",{
        headers: {
            "Authorization" : `Bearer ${auth.token()}`
            }
          })
    .then(resp => {
      if(!resp.data.error){
        this.unread = false;
      }
    }).catch(err => {
      console.log(err);
    })
    },
    renderDate(date){

      return moment(date).format('DD-MM-YYYY hh:MM a')
      
    }
  },
  mounted(){
    if(auth.user()){
      axios.get("/api/users/notifications/" + auth.user().id,{
        headers: {
            "Authorization" : `Bearer ${auth.token()}`
            }
          })
    .then(resp => {
      this.notifications = resp.data.notifications;
      this.unread = resp.data.unread;
    }).catch(err => {
      console.log(err);
    })
    }
  }
};
</script>

<style>

.logo{
  height: 50px;
}

.navbar-title{
  
  padding-left: 5px;
  
}

.v-menu__content{
  box-shadow: none!important;
}

.notification-indicator{
  background: #10BE01;
  height: 15px;
  width:15px;
  border-radius: 25px;
  position: relative;
  left:50px;
  top:12px;
  z-index: 5;
}



@media only screen and (max-width: 680px ){
  .logo{
    height:30px;
  }
}

</style>