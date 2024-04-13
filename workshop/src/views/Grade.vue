<!-- <template>
    <div>
        <h1>Grade page</h1>
        <v-row>
            <v-col cols="4">
                <v-text-field
                  name="score"
                  label="กรอกคะแนน"
                  id="id"
                  v-model="score"
                ></v-text-field>
            </v-col>
                <v-btn class="mt-4" color="success" small @click="calGrade(score)" >คำนวณเกรด</v-btn>
                
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            score: 0
        }
    },
    methods:{
        calGrade(score){
            if(score >= 80){
                alert("Grade: A");
            }else if(score >= 70){
                alert("Grade: B");
            }else if(score >= 60){
                alert("Grade: C");
            }else if(score >= 50){
                alert("Grade: D");
            }else if(score <= 49 && score >= 0){
                alert("Grade: F");
            }else{
                alert("คะแนนไม่ถูกต้อง กรุณากรอกใหม่");
            }
        },
        
    }
}
</script>

<style>

</style> -->


<template>
    <div>
        <h1>Grade page</h1>
        <v-row>
            <v-col cols="4">
                <v-text-field
                  name="score"
                  label="กรอกคะแนน"
                  id="id"
                  v-model="score"
                ></v-text-field>
            </v-col>
            <v-btn class="mt-4" color="success" small @click="calGrade(score)" >คำนวณเกรด</v-btn>
        </v-row>
        <v-row v-if="grade !== ''">
            <v-col cols="4">
                <p>Grade: {{ grade }}</p>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data(){
        return{
            score: 0,
            grade: ''
        }
    },
    methods:{
        calGrade(score){
            if(score >= 80){
                this.grade = 'A';
            }else if(score >= 70){
                this.grade = 'B';
            }else if(score >= 60){
                this.grade = 'C';
            }else if(score >= 50){
                this.grade = 'D';
            }else if(score <= 49 && score >= 0){
                this.grade = 'F';
            }else{
                this.grade = 'Invalid score';
            }
        },        
    }
}
</script>

<style>

</style>
