<template>
  <ul class="flex flex-col justify-center text-center text-white list-none">
    <li
      class="py-4 mx-4 mt-4 transition duration-100 ease-in-out rounded cursor-pointer"
      onMouseOver="this.style.background='#282828'"
      onMouseOut="this.style.background='#040404'"
      @click="loginSpotify"
    >
      <h1>{{ login.name }}</h1>
    </li>
  </ul>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['login'],

  methods: {
    loginSpotify() {
      this.$router.push('/login')
    },
  },
}
</script>
