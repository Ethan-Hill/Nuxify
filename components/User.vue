<template>
  <div
    class="flex justify-evenly items-center text-white text-center transition mt-4 mx-4 py-4 rounded duration-100 ease-in-out cursor-pointer"
    onMouseOver="this.style.background='#282828'"
    onMouseOut="this.style.background='#040404'"
    @click="account"
  >
    <div>
      <img
        :src="
          this.$auth.user.images[0] ||
          'https://assets.stickpng.com/images/585e4bf3cb11b227491c339a.png'
        "
        width="25px"
      />
    </div>
    <div>
      <h1>{{ this.$auth.user.display_name }}</h1>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    account() {
      location.href = `${this.$auth.user.external_urls.spotify}`
    },
  },
}
</script>
