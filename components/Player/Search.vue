<template>
  <div class="w-6/12 pt-2 text-gray-600">
    <label>
      <input
        id="search"
        v-model="search"
        class="w-full h-10 text-sm text-center bg-white border-2 border-gray-300 rounded-lg focus:outline-none"
        type="search"
        name="search"
        placeholder="Search..."
        @keypress.enter="searchTrack"
    /></label>
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
