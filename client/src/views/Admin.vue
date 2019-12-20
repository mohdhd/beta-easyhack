<template>

<v-container>

  <v-layout wrap>
    
    <v-flex class="pa-2" xs12 md2 s2 lg3>
      <v-navigation-drawer
      permanent
      floating
      width="100%"
      height="300px"
    >

    <v-list nav>

      <v-list-item color="white" to="/admin/ctf">

      <div>
            <v-icon size="20" >info</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Ctf Info</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

      <v-list-item color="white" to="/admin/challenges">

      <div>
            <v-icon size="20" >view_day</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Manage challenges</v-list-item-title>
          </v-list-item-content>

      </v-list-item>

      <v-list-item color="white" to="/admin/users">

      <div>
            <v-icon size="20" >person</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Manage Users</v-list-item-title>
          </v-list-item-content>

      </v-list-item>


      <v-list-item color="white" to="/admin/notify">

      <div>
            <v-icon size="20" >notifications</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Notify Users</v-list-item-title>
          </v-list-item-content>

      </v-list-item>


      <v-list-item color="white" to="/admin/writeups">

      <div>
            <v-icon size="20" >edit</v-icon>
          </div>

          <v-list-item-content>
            <v-list-item-title class="navbar-title">Manage WriteUps</v-list-item-title>
          </v-list-item-content>

      </v-list-item>


    

    </v-list>

    </v-navigation-drawer>
    </v-flex>

    <v-flex>
      <router-view></router-view>
    </v-flex>

</v-layout>

</v-container>
    
</template>


<script>

export default {
    name:'Admin'
}

</script>


<style>

</style>