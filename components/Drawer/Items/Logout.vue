<template>
  <div
    class="flex justify-evenly items-center text-white text-center transition mt-4 mx-4 my-4 rounded duration-100 ease-in-out cursor-pointer"
    onMouseOver="this.style.background='#282828'"
    onMouseOut="this.style.background='#040404'"
    @click="logout"
  >
    <h1 class="text-3xl text-center font-bold" style="color: #1ed760">
      Logout
    </h1>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>
