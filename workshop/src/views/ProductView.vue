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
                        <v-rating v-model="rating" background-color="orange lighten-3" color="orange" small></v-rating>
                        <v-card-actions>
                            <v-btn color="primary" @click="editItem(item)">Edit</v-btn>
                            <v-btn color="error" @click="saveDeldata(item)">Delete</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>
        <v-dialog v-model="dialogedit" max-width="500px">
            <v-card>
                <v-card-title primary-title>
                    {{ savemode }}
                </v-card-title>
                <v-card-text>
                    <v-row>
                        <v-col cols="6">
                            <v-text-field name="name" label="Product Name" id="Name" v-model="postdata.p_name">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field name="Price" label="Price" id="Price" v-model="postdata.p_price">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-text-field name="Stock" label="Stock" id="Stock" v-model="postdata.p_stock">
                            </v-text-field>
                        </v-col>
                        <v-col cols="6">
                            <v-file-input v-model="postdata.p_image" label="Product Image" @change="onFileSelected" accept="image/*">
                            </v-file-input>
                        </v-col>
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="error" @click="dialogedit = false">Cancel</v-btn>
                    <v-btn text color="info" @click="saveSelect(postdata)">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
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
            selectedFile: null,
            rating: 3.5,
            id: '',
            dialogedit: false,
            apidata: [],
            postdata: {
                p_name: '',
                p_price: '',
                p_stock: '',
                p_image: ''
            },
            postdefault: {
                p_name: '',
                p_price: '',
                p_stock: '',
                p_image: ''
            }
        }
    },
    computed: {
        savemode() {
            return this.id == '' ? 'NewItem' : 'EditItem'
        }
    },
    created() {
        this.getData()
    },
    methods: {
        onFileSelected(event) {
            this.selectedFile = event;
        },
        newItem() {
            this.id = ''
            this.postdata = { ...this.postdefault }
            this.dialogedit = true
        },
        editItem(item) {
            this.id = item._id
            this.postdata = { ...item }
            this.dialogedit = true
        },
        closeItem() {
            this.id = ''
            this.postdata = { ...this.postdefault }
            this.dialogedit = false
        },
        saveSelect(postdata) {
            if (this.id == '') {
                this.savePostData(postdata)
            } else {
                this.savePutData()
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
        async savePostData(item) {
            // let formData = new FormData();
            this.postdata = { ...item };
            console.log(this.postdata);
            // formData.append('p_name', this.postdata.p_name);
            // formData.append('p_price', this.postdata.p_price);
            // formData.append('p_stock', this.postdata.p_stock);
            // formData.append('p_image', this.selectedFile);
            try {
                const { data } = await this.axios.post('http://localhost:3000/api/v1/products', this.postdata, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log(data);
                alert('Save complete');
                this.getData();
                this.closeItem();
            } catch (error) {
                console.log(error);
                alert('error !');
            }
        },
        async savePutData() {
            try {
                const { data } = await this.axios.put(`http://localhost:3000/api/v1/products/` + this.id, this.postdata)
                console.log(data);
                alert('Update complete')
                this.getData()
                this.closeItem()
            } catch (error) {
                console.log(error);
                alert('error !')
            }
        },
        async saveDeldata(item) {
            try {
                const { data } = await this.axios.delete(`http://localhost:3000/api/v1/products/` + item._id)
                console.log(data);
                alert('Delete complete')
                this.getData()
                this.closeItem()
            } catch (error) {
                console.log(error);
                alert('error !')
            }
        }
    }
}
</script>

<style></style>