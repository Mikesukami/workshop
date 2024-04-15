<template>
    <div>
        <v-app-bar app color="light">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-img src="../assets/Shopee.png" class="app-bar-logo"></v-img>
            <v-toolbar-title class="app-bar-title">เข้าสู่ระบบ</v-toolbar-title>
        </v-app-bar>
        <div class="login-background">
            <v-main>
                <v-container>
                    <v-row>
                        <v-col cols="6" sm="6">
                            <v-img src="https://mpics-cdn.mgronline.com/pics/Images/566000007055101.JPEG"></v-img>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">เข้าสู่ระบบ</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-form v-model="valid">
                                        <v-text-field v-model="username" label="Username" prepend-icon="mdi-email"
                                            outlined type="username" :rules="usernameRules" required></v-text-field>
                                        <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock"
                                            outlined :rules="passwordRules" type="password" required></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn style="color: aliceblue;" color=#EE4C29 size="large" @click="login()" block>
                                        เข้าสู่ระบบ
                                    </v-btn>

                                </v-card-actions>

                                <v-container>
                                    <v-row>
                                        <v-col cols="6" class="text-left">
                                            <v-btn text color="primary" href="/forgot-password">ลืมรหัสผ่าน</v-btn>
                                        </v-col>
                                        <v-col cols="6" class="text-right">
                                            <v-btn text color="primary">เข้าสู่ระบบด้วย SMS</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-main>
        </div>
        <!-- <v-dialog v-model="dialog" persistent width="300">
            <v-card>
                <v-card-title class="headline">Logging in...</v-card-title>
                <v-card-text class="text-center">
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                </v-card-text>
            </v-card>
        </v-dialog> -->

        <v-dialog v-model="dialog" persistent width="300">
            <v-card>
                <v-card-title class="text-center">{{ loginMessage }}</v-card-title>
                <v-card-text class="text-center">
                    <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
                    <v-icon v-else color="green">mdi-check-circle</v-icon>
                </v-card-text>
                <v-card-text class="text-center">
                    redirecting...
                </v-card-text>
            </v-card>
        </v-dialog>

        <v-snackbar
            v-model="snackbar.show"
            :color="snackbar.color"
            :timeout="snackbar.timeout"
            top
            right>
            {{ snackbar.text }}
        </v-snackbar>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {

    data: () => ({
        valid: false,
        username: '',
        usernameRules: [
            v => !!v || 'Username is required',
            v => (v && v.length >= 3) || 'Username must be more than 3 characters',
        ],
        password: '',
        passwordRules: [
            v => !!v || 'Password is required',
        ],
        snackbar: {
            show: false,
            text: '',
            color: '',
            timeout: 2000
        },
        dialog: false,
        loading: true,
        loginMessage: 'Logging in...'
    }),
    methods: {
        async login() {
            if (this.valid) {
                this.dialog = true;
                this.loading = true;
                this.loginMessage = 'Logging in...';

                try {
                    console.log(this.username, this.password)
                    const res = await this.axios.post('http://localhost:3000/api/v1/login', {
                        username: this.username,
                        password: this.password
                    });

                    if (res.data.status == 200) {
                        // this.snackbar.show = true;
                        // this.snackbar.text = 'Login successful!';
                        // this.snackbar.color = 'success';

                        Cookies.set('token', res.data.token, { expires: 1 });

                        this.loginMessage = 'Login successful!';
                        this.loading = false;

                        setTimeout(() => {
                            this.dialog = false; // Hide the dialog
                            this.$router.push('/product-view');
                        }, 1000);

                        // console.log(res.data);
                        // this.$router.push('/product-view');
                        // const token = res.data.token;
                        // console.log(token);
                        // // localStorage.setItem('token', token);
                        // Cookies.set('token', token);

                    } else {
                        this.dialog = false;
                        this.snackbar.show = true;
                        this.snackbar.text = 'Login failed: Username or Password is incorrect';
                        this.snackbar.color = 'error';
                    }
                } catch (error) { 
                    this.dialog = false;
                    this.snackbar.show = true;
                    this.snackbar.text = 'Login failed: Username or Password is incorrect';
                    this.snackbar.color = 'error';
                }

            }
        }
    }
}
</script>

<style>
.app-bar-logo {
    max-height: 40px;
    max-width: 120px;
}

.app-bar-title {
    margin-top: 10px;
    margin-left: 17px;
}


.login-background {
    background-color: #EE4C29;
    margin-top: 150px;
}
</style>