<template>
  <div class="flex min-h-screen text-white bg-bg">
    <Nav />
    <main class="flex flex-col items-center justify-around w-screen">
      <div class="flex flex-col text-center">
        <h1 class="text-5xl">Welcome to Nuxify</h1>
        <h2 class="text-4xl text-spotify">All in one Spotify</h2>
        <h1 class="text-lg">Currently a work in progress</h1>
      </div>
    </main>
  </div>
</template>

<script>
// import axios from 'axios'
import Nav from '../components/Drawer/Nav'

export default {
  components: {
    Nav,
  },
}
</script>
