<template>
    <div class="container">
        <div>
            <h1>Cart</h1>
        </div>
        <v-row>
            <v-col v-for="(item, index) in apidata" :key="index" cols="12" sm="6" md="4">
                <v-card>
                    <v-hover>
                        <template v-slot:default="{ hover }">
                            <v-img v-bind:src="item.image" height="200px" contain>
                                <v-expand-transition>
                                    <v-overlay v-if="hover" absolute color="black">
                                        <v-btn color="primary" fab dark small @click="addCart(item, index)">
                                            <v-icon>mdi-cart</v-icon>
                                        </v-btn>
                                    </v-overlay>
                                </v-expand-transition>
                            </v-img>
                        </template>
                    </v-hover>
                    <v-card-title>
                        <div>
                            <h3>{{ item.name }}</h3>
                            <p>{{ item.description }}</p>
                            <p>{{ item.price | formatPrice }}</p>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-btn fab small color="primary" @click="decrementQty(index)">
                            <v-icon>mdi-minus</v-icon>
                        </v-btn>
                        <v-btn fab small color="primary" @click="incrementQty(index)">
                            <v-icon>mdi-plus</v-icon>
                        </v-btn>
                        <span>{{ quantities[index] || 0 }}</span>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </div>


</template>

<script>
import Cookies from 'js-cookie';
export default {

    data() {
        return {
            token: Cookies.get('token'),
            id: '',
            apidata: []
        }
    },
    methods: {
        getData() {
            this.axios.get('http://localhost:3000/api/products/carts',{
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            })
            .then(res => {
                this.apidata = res.data.data;
                console.log(this.apidata);
            })
            .catch(err => {
                console.log('Error fetching cart data', err);
            })
                
        }
    },
}

</script>

<style></style>