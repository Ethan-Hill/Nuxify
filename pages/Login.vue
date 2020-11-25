<template>
  <div>
    <Nav />
    <div
      class="h-screen flex flex-col justify-center items-center"
      style="background-color: #121212 !important"
    >
      <h1 class="text-3xl mb-6 text-white">Spotify Login</h1>
      <a
        class="text-green-500 bg-transparent border border-solid border-green-800 hover:bg-green-700 hover:text-white active:bg-pink-600 font-bold uppercase px-8 py-3 rounded outline-none focus:outline-none mr-1 mb-1 cursor-pointer"
        type="button"
        style="transition: all 0.15s ease"
        @click="login"
      >
        Login
      </a>
    </div>
  </div>
</template>

<script>
import Nav from '../components/Nav'
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
