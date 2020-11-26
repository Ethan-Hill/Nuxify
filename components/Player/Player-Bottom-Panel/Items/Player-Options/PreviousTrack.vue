<template>
  <div
    class="transition py-2 px-2 rounded duration-100 ease-in-out cursor-pointer"
    onMouseOver="this.style.background='#9a9a9a'"
    onMouseOut="this.style.background='#282828'"
    @click="previous"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="24"
      height="24"
      viewBox="0 0 172 172"
      style="fill: #000000"
    >
      <g
        fill="none"
        fill-rule="nonzero"
        stroke="none"
        stroke-width="1"
        stroke-linecap="butt"
        stroke-linejoin="miter"
        stroke-miterlimit="10"
        stroke-dasharray=""
        stroke-dashoffset="0"
        font-family="none"
        font-weight="none"
        font-size="none"
        text-anchor="none"
        style="mix-blend-mode: normal"
      >
        <path d="M0,172v-172h172v172z" fill="none"></path>
        <g fill="#ffffff">
          <path
            d="M7.16667,35.83333v100.33333h14.33333v-40.76042l64.5,37.17708v-42.32812l71.66667,42.32813v-93.16667l-71.66667,42.32813v-42.32812l-64.5,37.17708v-40.76042z"
          ></path>
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['player'],
  methods: {
    async previous() {
      const auth = this.$auth.strategy.token.get()
      await fetch('https://api.spotify.com/v1/me/player/previous', {
        method: 'POST',
        headers: {
          Authorization: auth,
        },
      }).then(async () => {
        await this.$store.dispatch('loadPlayer')
      })
    },
  },
}
</script>
