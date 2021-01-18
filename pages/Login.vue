<template>
  <div>
    <Nav />
    <div class="flex flex-col items-center justify-center h-screen bg-bg">
      <h1 class="mb-6 text-3xl text-white">Spotify Login</h1>
      <button
        class="px-8 py-3 mb-1 mr-1 font-bold uppercase transition-all ease-in-out bg-transparent border border-green-800 border-solid rounded outline-none cursor-pointer text-spotify hover:bg-green-700 hover:text-white active:bg-pink-600 focus:outline-none"
        type="button"
        @click="login"
      >
        Login
      </button>
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
