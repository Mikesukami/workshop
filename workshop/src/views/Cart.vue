<template>
    <div>
        <h1>Cart</h1>
        <v-row v-if="apidata.length === 0">
            <v-col cols="12" md="2" sm="4" xs="2">
                <v-card class="mx-auto" width="200">
                    <v-card-title primary-title>
                        <div>ไม่มีสินค้าในตะกร้า</div>
                    </v-card-title>
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if="apidata.length > 0">
            <v-col cols="12" md="2" sm="4" xs="2" v-for="(item, index) in apidata" :key="index">
                <v-hover v-slot="{ hover }">
                    <v-card :elevation="hover ? 16 : 2" :class="{ 'on-hover': hover }" class="mx-auto" width="200">
                        <v-img :src="`http://localhost:3000/images/${item.p_image}`" height="300" />
                        <v-card-title primary-title>
                            <div>{{ item.p_name }}</div>
                        </v-card-title>
                        <v-card-text>
                            <div>จำนวน : {{ item.Qty }} ชิ้น</div>
                            <div style="color:green">ราคาต่อชิ้น ฿ {{ item.p_price | formatPrice }}</div>
                            <div style="color:#EE4C29">ราคารวม : {{ item.p_total | formatPrice }}</div>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="red" @click="delProductCart(item)">DELETE</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
        <v-row v-if="apidata.length > 0">
            <v-col cols="12" md="2" sm="4" xs="2">
                <v-card class="mx-auto" width="200">
                    <v-card-title primary-title>
                        <div>ราคารวมทั้งหมด</div>
                    </v-card-title>
                    <v-card-text>
                        <div style="color:#EE4C29 ">฿ {{ getNet() | formatPrice }}</div>
                        <v-btn class="mt-5" color="success" @click="OrderConfirm()">Order Confirm</v-btn>
                    </v-card-text>
                </v-card>
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
        getData() {
            console.log(this.token);
            this.axios.get('http://localhost:3000/api/v1/products/emp/carts',
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
        async delProductCart(item) {
            console.log('delete item', item._id)
            try {
                const res = await this.axios.delete(`http://localhost:3000/api/v1/products/emp/carts/` + item._id,
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                alert('Delete success');
                console.log('Delete success', res.data);
                this.getData();
            } catch (error) {
                console.log('Delete error', error.response.data.message)
                alert('Delete error');
            }
        },
        getNet() {
        let total = 0;
        for (const item of this.apidata) {
            total += item.Qty * item.p_price;
        }
        return total;
        },
        async OrderConfirm() {
            try {
                const res = await this.axios.post('http://localhost:3000/api/v1/products/confirmorder',
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })
                alert('Order success');
                console.log('Order success', res.data);
                this.$router.push('/product-emp');
            } catch (error) {
                console.log('Order error', error.response.data.message)
                alert('Order error');
            }
        }
    }
}

</script>

<style></style>