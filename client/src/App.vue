<template>
  <v-app dark>

    <NavBar :g_loggedIn="g_loggedIn" :g_isAdmin="g_isAdmin" @authChange="handleAuth"/>

    <v-content>
      <router-view @authChange="handleAuth"></router-view>
    </v-content>

    <Footer/>
  </v-app>
</template>

<script>
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import auth from "./auth"

export default {
  name: "App",
  components: {NavBar, Footer},

  data: () => ({
    g_loggedIn: false,
    g_isAdmin: false
  }),

  mounted() {
    this.handleAuth();
  },

  methods: {
    handleAuth(){
      this.g_loggedIn = auth.authenticated();
      this.g_isAdmin = auth.user().isAdmin;
    }
  },
};
</script>

<style>
.container {
    width:100%;
    padding: 12px!important;
    margin-right: auto!important;
    margin-left: auto!important;
}

@media (min-width: 768px) {
  .container {
    width: 750px;
  }
}
@media (min-width: 992px) {
  .container {
    width: 970px;
  }
}
@media (min-width: 1200px) {
  .container {
    width: 1300px;
  }
}

.flex .container{
  width: 100%;
}

.v-card .container{
  width:100%;
}



</style>