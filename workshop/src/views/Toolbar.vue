<template>
  <div>
    <v-app-bar
      app
      color=#EE4C29
      dark
      style="max-height: 100px;"
    >
      <div class="d-flex align-center" @click="home()" >
        
        <v-img
          src="../assets/shopee-white.png"
          class="app-bar-logo"
        />
      </div>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search product or shop here..."
        single-line
        hide-details
        variant="solo"
      ></v-text-field>

      

      <v-btn text @click="cart()">
        <v-icon >mdi-cart</v-icon>

      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        href=""
        target="_blank"
        text
      >
        <span class="mr-2" @click="logout">Logout</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>
import Cookie from 'js-cookie';
export default {
  data() {
    return {
      search: '',
    }
  },
  methods: {
    logout() {
      Cookie.remove('token')
      this.$router.push('/')
    },
    cart() {
      this.$router.push('/allcart')
    },
    home(){
        this.$router.push('product-emp')
    }
  }
}
</script>

<style>
.app-bar-logo {
    max-height: 40px;
    max-width: 120px;
}
</style>