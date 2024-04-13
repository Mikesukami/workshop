<template>
  <div>
    <v-app-bar
      app
      color=#EE4C29
      dark
      style="max-height: 100px;"
    >
      <div class="d-flex align-center">
        <v-img
          src="../assets/shopee-white.png"
          class="app-bar-logo"
        />
        
      </div>

      <v-spacer></v-spacer>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        
      ></v-text-field>

      <v-spacer></v-spacer>

      <v-btn
        href=""
        target="_blank"
        text
      >
        <span class="mr-2">Contact us</span>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.app-bar-logo {
    max-height: 40px;
    max-width: 120px;
}
</style>