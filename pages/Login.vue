<template>
  <div>
    <Nav />
    <div class="h-screen flex flex-col justify-center items-center bg-bg">
      <h1 class="text-3xl mb-6 text-white">Spotify Login</h1>
      <a
        class="text-spotify transition-all ease-in-out bg-transparent border border-solid border-green-800 hover:bg-green-700 hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 cursor-pointer"
        type="button"
        @click="login"
      >
        Login
      </a>
    </div>
  </div>
</template>

<script>
import Nav from '../components/Drawer/Nav'
export default {
  components: {
    Nav,
  },
  methods: {
    login() {
      this.$auth.loginWith('spotify')
    },
  },
}
</script>
