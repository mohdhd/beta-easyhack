<template>
  <v-layout align-center justify-center fill-height>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12" style="margin: 0 20px 0 20px">
        <v-toolbar dark color="green">
          <v-toolbar-title>Page not found</v-toolbar-title>
        </v-toolbar>
        <v-card-text style="font-size:17px;">
            
            <v-icon left size="35">fas fa-exclamation-circle</v-icon>
            sorry but the page you want doesn't exist
           
        </v-card-text>

      </v-card>
    </v-flex>

  </v-layout>
</template>


<script>
// @ is an alias to /src

export default {
  name: 'ErrorPage',

  metaInfo: {

      title: 'Page not Found',

    }
}
</script>

<style scoped>
</style>
