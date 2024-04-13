<template>
    <div>
        <h1>Simple page</h1>
        <h1 v-if="showdisplay">{{ name }}</h1>
        <v-btn @click="showdisplay = !showdisplay" color="primary">Toggle Name</v-btn>
        <v-btn @click="display()" color="primary">Click me</v-btn>
        <v-row>
            <v-col cols="4" v-for="(item, index) in imgstock" :key="index">
                <v-card width="300">
                    <v-img 
                    :src="item.img"
                    width="250"
                    height="300"/>
                    <v-card-title>{{ item.message }}</v-card-title>
                    <v-card-actions>
                        <v-btn color="primary" @click="displayAlertParam(item.message)">Call name</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
            <v-col cols="4">
                <v-text-field
                  name="message_alert"
                  label="กรอกข้อความ แจ้งเตือน"
                  id="id"
                  v-model="message_alert"
                ></v-text-field>
            </v-col>
            <v-col cols="2">
                <v-btn class="mt-4" color="success" small @click="displayAlertParam(message_alert)" >alert message</v-btn>
            </v-col>
            <v-col cols="12">
                <simChild @display="display" :name="name" :msg="message_alert" />
            </v-col>
        </v-row>
    </div>
</template>

<script>
import simChild from "../components/SimpleChild.vue";
import { EventBus } from "@/EvenBus";
export default {
    components :{simChild},
    data() {
        return {
            message_alert:'',
            name: "Patiparn Lekmard",
            showdisplay: false,
            imgstock: [{ message: 'Foo', img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5Ry4SSpRVSSGo8zqyJPpUK8ODel941Rp0Fubc56-Zjw&s' },
            { message: 'Bar', img: 'https://1417094351.rsc.cdn77.org/articles/12607/12606739/thumbnail/large.gif?1' },
            { message: 'Baz', img: require('../assets/cat1.jpg')} //from assets folder
            ]
        }
    },
    methods: {
        display() {
            alert("Hello world");
        },
        displayAlertParam(item) {
            console.log(item);
            alert("Name: " + item);
        }
    },
    mounted() {
        EventBus.$on('kor_rong', this.display);
    },
    beforeDestroy(){
        EventBus.$off('kor_rong', this.display);
    }
}
</script>

<style></style>