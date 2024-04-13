<template>
    <div>
        <h1>Component zone</h1>
        <h1>My name is {{ name }}</h1>
        <h1>My message is {{ msg }}</h1>
        <v-btn color="warning" @click="callMain()">Call Main</v-btn>
    </div>
</template>

<script>
import { EventBus } from '@/EvenBus';
export default {
    props:['name','msg'],
    methods:{
        callMain(){
            // this.$emit('display');
            EventBus.$emit('kor_rong');
        }
    }
}
</script>

<style></style>