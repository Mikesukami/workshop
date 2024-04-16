<template>
    <div>
        <v-row>
            <v-col cols="12">
                <v-btn class="mt-6" color="success" @click="newItem()">New Item</v-btn>
            </v-col>
            <v-col cols="12" md="2" sm="4" xs="2" v-for="(item, index) in apidata" :key="index">
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="mx-auto" width="200">
                        <v-img :src="`http://localhost:3000/images/${item.p_image}`" height="300" />
                        <v-card-title primary-title>
                            <div>{{ item.p_name }}</div>
                        </v-card-title>
                        <v-card-text>
                            <div style="color:#EE4C29">฿{{ item.p_price | formatPrice }}</div>
                        </v-card-text>
                        <v-card-text>
                            <div>Stock : {{ item.p_stock }}</div>
                        </v-card-text>
                        <v-rating v-model="rating" background-color="orange lighten-3" color="orange" small></v-rating>
                        <v-card-actions>
                            <div>
                                <v-btn icon @click="decrementQty(index)">
                                    <v-icon>mdi-minus</v-icon>
                                </v-btn>
                                <span>{{ quantities[index] || 0 }}</span>
                                <v-btn icon @click="incrementQty(index)">
                                    <v-icon>mdi-plus</v-icon>
                                </v-btn>
                            </div>
                            <v-btn color="success" @click="addCart(item, index)">ADD CART</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Cookie from 'js-cookie';
export default {
    filters: {
        formatPrice(value) {
            if (!value) return ''
            return parseFloat(value).toLocaleString();
        }
    },
    data() {
        return {
            token: Cookie.get('token'),
            rating: 3.5,
            id: '',
            apidata: [],
            quantities: []
        }
    },
    created() {
        this.getData()
    },
    methods: {
        incrementQty(index) {
            this.$set(this.quantities, index, (this.quantities[index] || 0) + 1);
        },
        decrementQty(index) {
            if (this.quantities[index] && this.quantities[index] > 1) {
                this.$set(this.quantities, index, this.quantities[index] - 1);
            }
        },
        getData() {
            console.log(this.token);
            this.axios.get('http://localhost:3000/api/v1/products',
                {
                    headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                }
            ).then((response) => {
                console.log('data from api', response.data);
                this.apidata = response.data.data
            })
        },
        async addCart(item, index) {
            const qty = parseInt(this.quantities[index]);
            console.log(item._id);
            console.log(qty);
            try {
                const response = await this.axios.post('http://localhost:3000/api/v1/products/addcart', {
                    product_id: item._id,
                    qty: qty
                }, {
                    headers: {
                        'content-type': 'application/json',
                        Authorization: `Bearer ${this.token}`
                    }
                }
                );

                console.log('response', response.data);
                this.getData();
                this.$set(this.quantities, index, 0);

            } catch (error) {
                console.log('Error to add product' + error);
            }
        }
    }
}
</script>

<style></style>