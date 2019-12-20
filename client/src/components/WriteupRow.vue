<template>

<v-container dark class="elevation-3 ma-1 grey darken-3">
<v-layout wrap>

    <v-flex lg9 md8 sm7 xs3 >
         <div class="pa-4">
             {{name}}
         </div>
    </v-flex>

    <v-flex lg3 md4 sm5 xs9 >
        <v-btn  class="ma-2" color="green darken-2">Edit</v-btn>


        <v-btn  color="red darken-2" @click="dialog=true">Delete</v-btn>
    </v-flex>

    <v-dialog v-model="dialog" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Delete Writeup</v-card-title>
        <v-card-text>Are you sure you want to delete this Writeup?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">Cancel</v-btn>
          <v-btn color="red darken-1" text @click="deleteWriteup">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    
</v-layout>
</v-container>
    
</template>

<script>

export default {
    name:'WriteupRow',
    props:['name'],
    data:()=>{
        return {
            dialog:false,
        }
    },
    methods:{
        deleteWriteup(){
            this.dialog = false;
            alert('todo: delete writeup');
        },

    }
}

</script>
