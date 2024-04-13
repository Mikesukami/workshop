<template>
    <div class="me">
        <v-container>
            <v-row>
                <v-col cols="12" >
                    <cardpic />
                </v-col>
            </v-row>
        </v-container>
        <!-- <pagefooter /> -->
    </div>
</template>

<script>
import cardpic from '../components/PictureCard.vue'
// import pagefooter from '../components/footer.vue'
export default {
    data() {
        return {

        }
    },
    components: {
        // pagefooter,
        cardpic
        
    }
}
</script>

<style></style>