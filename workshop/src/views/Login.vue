<template>
    <div>
        <v-app-bar app color="light">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-img src="../assets/Shopee.png" class="app-bar-logo"></v-img>
            <v-toolbar-title class="app-bar-title">เข้าสู่ระบบ</v-toolbar-title>
        </v-app-bar>
        <div class="login-background">
            <v-main>
                <v-container class="login-form">
                    <v-row>
                        <v-col cols="6" sm="6" >
                            <v-img src="https://mpics-cdn.mgronline.com/pics/Images/566000007055101.JPEG"></v-img>
                        </v-col>
                        <v-col cols="12" sm="6" xs="3">
                            <v-card>
                                <v-card-title>
                                    <span class="headline">เข้าสู่ระบบ</span>
                                </v-card-title>
                                <v-card-text>
                                    <v-form v-model="valid">
                                        <v-text-field v-model="Username" label="Username" prepend-icon="mdi-email"
                                            outlined type="username" :rules="usernameRules" required></v-text-field>
                                        <v-text-field v-model="password" label="Password" prepend-icon="mdi-lock"
                                            outlined :rules="passwordRules" type="password" required></v-text-field>
                                    </v-form>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn style="color: aliceblue;"  color=#EE4C29 size="large"
                                         block>
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
    </div>
</template>

<script>


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
        ]
    }),
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

.login-form {
    /* margin-left: 200px; */
}

.login-background {
    background-color: #EE4C29;
    margin-top: 150px;
}
</style>