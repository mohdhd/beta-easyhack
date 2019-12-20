<template>
  <div>
  <v-container>
    <v-layout column align-center class="grey darken-4 elevation-5">
      <img src="/logo.png" class="main-logo ">
      
      <div class="version-text">{{version}}</div>

        <Timer 
         trans='{  
         "day":"Days",
         "hours":"Hours",
         "minutes":"Minutes",
         "seconds":"Seconds",

         "status": {
            "expired":"Has Finished",
            "running":"Will Finish In:",
            "upcoming":"Will Start In:"
           }}'
         />
      
    </v-layout>

  </v-container>

<v-container>
  <v-layout column class="elevation-4 grey darken-3 about-container">
    <h4 class="about-title green--text">About</h4>
    <p class="about-text">
      {{about}}
    </p>

    <h4 class="about-title green--text">Contact</h4>

    <div class="ma-1">
      <span style="font-size:17px"><v-icon size="20" >email</v-icon>  Email: support@easyhackctf.com </span>

    </div>

    <div class="ma-1">
      <span style="font-size:17px"><v-icon size="20" >phone</v-icon>  phone: +249923709875 </span>

    </div>


  </v-layout>
</v-container>




  </div>
</template>

<script>
// @ is an alias to /src

import Timer from '../components/Timer';

import axios from "axios"

axios.defaults.baseURL = (process.env.NODE_ENV == "development")?"http://localhost:8000":"https://backend.easyhackctf.com"

export default {
  name: "home",
  components: { Timer },

  data: () => ({
    about: "",
    version: "",

  }),
  mounted() {
    axios.get("/api/ctf")
    .then(resp => {
      let ctf = resp.data.ctfs[0];
      this.about = ctf.about;
      this.version = ctf.version;
      this.startDate = ctf.startDate;
      this.finishDate = ctf.finishDate;
    }).catch(err => {
      console.log(err);
    })
  },
  metaInfo: {

      title: 'EasyHack ctf - Home',
      meta: [{
    hid: 'description',
    name: 'description',
    content: 'A Platform for CTF and Security Challenges',
  },
  { name: 'keywords', content: 'CTF,security,platform,Security,cybersecurity,sudan,challenges,web challenges,cryptography,programming,Sudan,easy,hack,hackathon,mobile security,ctf'}
  ]

    }
};
</script>

<style>

.main-logo {
  height: 120px;
  margin-top:50px;
}

.version-text{
  font-size: 40px;
  margin-top:15px;
  margin-bottom: 20px;
  height: 25px;
}

.about-container{
  padding:25px;
}

.about-title{
  font-size:25px;

}

.about-text{
  font-size: 18px;
  
}

@media only screen and (max-width: 680px ){
  .main-logo {
  height: 50px;
  margin-top:50px;
}

.version-text{
  font-size: 30px;
  margin-top:15px;
}
}

</style>
