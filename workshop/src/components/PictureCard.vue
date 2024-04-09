<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12" md="12">
                    <v-card>
                        <v-img src="../assets/profile.jpeg" aspect-ratio="1" max-height="500"></v-img>
                        <v-card-title class="headline"><b>{{ profile.name }}</b></v-card-title>
                        <v-card-subtitle>{{ profile.nickname }}</v-card-subtitle>
                        <v-card-text>
                            <p><b>Graduation:</b> {{ profile.graduation }}</p>
                            <p><b>Education:</b> {{ profile.education }}</p>
                            <p><b>Hobby:</b> {{ profile.hobby }}</p>
                            <p><b>Strange:</b> {{ profile.strange }}</p>
                            <p><b>Weakness:</b> {{ profile.weakness }}</p>
                            <p v-show="showLikes">
                                <b>Likes:</b>
                            <ul>
                                <li v-for="like in profile.likes" :key="like">{{ like }}</li>
                            </ul>
                            </p>
                            <v-btn color="primary" elevation="3" small @click="toggleLikesVisibility">Click for {{ showLikes ?
                                'Hide' : 'Show' }} Likes</v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
export default {
    data() {
        return {
            profile: {
                name: "Patiparn Lekmard",
                nickname: "Roos",
                graduation: "Prince of Songkla University",
                education: "Bachelor's in Computer Science",
                hobby: "Playing guitar",
                strange: "I'm a leadership learning fast",
                weakness: "I want everything to be perfect",
                likes: ["Guitar", "Natural", "Music", "Programming"]

            },
            showLikes: false
        }
    },
    methods: {
        toggleLikesVisibility() {
            this.showLikes = !this.showLikes; // Toggle the visibility
        }
    }

}
</script>

<style></style>