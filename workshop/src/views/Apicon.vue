<template>
    <div>

        <v-row>
            <v-col cols="12">
                <h1>Action page</h1>
                <v-btn color="success" @click="newItem()">New Item</v-btn>
            </v-col>
            <v-col cols="12" md="3" sm="6" xs="1" v-for="(item, index) in apidata" :key="index">
                <v-card width="300">
                    <v-img src="../assets/cat1.jpg" height="300" />
                    <v-card-title primary-title>
                        <div>{{ item.p_name }}</div>
                    </v-card-title>
                    <v-card-text>
                        <div>Price: {{ item.p_price }}</div>
                    </v-card-text>
                    <v-rating 
                        v-model="rating"
                        background-color="orange lighten-3"
                        color="orange"
                    ></v-rating>
                    <v-card-actions>
                        <v-btn color="primary" @click="editItem(item)">Edit</v-btn>
                        <v-btn color="error" @click="saveDeldata(item)">Delete</v-btn>
                    </v-card-actions>
                </v-card>
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
                    </v-row>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn text color="error" @click="dialogedit = false">Cancel</v-btn>
                    <v-btn text color="info" @click="saveSelect()">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rating: 3.5,
            id: '',
            dialogedit: false,
            apidata: [],
            postdata: {
                p_name: '',
                p_price: ''
            },
            postdefault: {
                p_name: '',
                p_price: ''
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
        saveSelect() {
            if (this.id == '') {
                this.savePostData()
            } else {
                this.savePutData()
            }
        },
        getData() {
            this.axios.get('http://localhost:3000/api/v1/products').then((response) => {
                console.log('data from api', response.data);
                this.apidata = response.data.data
            })
        },
        async savePostData() {
            try {
                const { data } = await this.axios.post('http://localhost:3000/api/v1/products', this.postdata)
                console.log(data);
                alert('Save complete')
                this.getData()
                this.closeItem()
            } catch (error) {
                console.log(error);
                alert('error !')
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