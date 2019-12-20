<template>
    
    <v-flex class="pa-3" xs12 md6>
        <v-layout wrap>

        <v-flex xs5>

                <div class="d-flex field-name green pa-2 justify-center align-center">{{name}}</div>

        </v-flex>

        <v-flex xs7>

                <div class="grey darken-2 pa-2 text-center">{{value}}</div>

        </v-flex>

    </v-layout>
    </v-flex>

</template>

<script>

export default{
    name:'Challenge Column',
    props:['name','value']
}
</script>

<style>

.field-name{
    text-transform: capitalize;
    font-size:15px;
    height: 100%;
    
}

@media only screen and (max-width:480px){
    .field-name{
    text-transform: capitalize;
    font-size:13px;
}
}

</style>