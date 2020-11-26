<template>
  <div
    class="transition py-2 px-2 rounded duration-100 ease-in-out cursor-pointer"
    onMouseOver="this.style.background='#9a9a9a'"
    onMouseOut="this.style.background='#282828'"
    @click="next"
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
            d="M150.5,35.83333v40.76042l-64.5,-37.17708v42.32813l-71.66667,-42.32812v93.16667l71.66667,-42.32812v42.32813l64.5,-37.17708v40.76042h14.33333v-100.33333z"
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
    async next() {
      const auth = this.$auth.strategy.token.get()
      await fetch('https://api.spotify.com/v1/me/player/next', {
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
