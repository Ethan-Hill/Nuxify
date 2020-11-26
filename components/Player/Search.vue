<template>
  <div class="pt-2 mx-auto text-gray-600">
    <input
      v-model="search"
      class="border-2 border-gray-300 bg-white h-10 rounded-lg text-sm focus:outline-none text-center"
      style="width: 500px"
      type="search"
      name="search"
      placeholder="Search..."
      @keypress.enter="searchTrack"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: null,
    }
  },
  methods: {
    async searchTrack() {
      await this.$store.dispatch('SearchTracks', this.search)
    },
  },
}
</script>
