<template>
  <div
    v-if="player.is_playing"
    class="transition py-2 px-2 rounded duration-100 ease-in-out cursor-pointer"
    onMouseOver="this.style.background='#9a9a9a'"
    onMouseOut="this.style.background='#282828'"
    @click="pause"
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
            d="M37.625,17.91667c-8.84188,0 -16.125,7.28312 -16.125,16.125v103.91667c0,8.84188 7.28312,16.125 16.125,16.125h17.91667c8.84188,0 16.125,-7.28312 16.125,-16.125v-103.91667c0,-8.84188 -7.28312,-16.125 -16.125,-16.125zM116.45833,17.91667c-8.84188,0 -16.125,7.28312 -16.125,16.125v103.91667c0,8.84188 7.28312,16.125 16.125,16.125h17.91667c8.84188,0 16.125,-7.28312 16.125,-16.125v-103.91667c0,-8.84188 -7.28312,-16.125 -16.125,-16.125zM37.625,28.66667h17.91667c3.03329,0 5.375,2.34171 5.375,5.375v103.91667c0,3.03329 -2.34171,5.375 -5.375,5.375h-17.91667c-3.03329,0 -5.375,-2.34171 -5.375,-5.375v-103.91667c0,-3.03329 2.34171,-5.375 5.375,-5.375zM116.45833,28.66667h17.91667c3.03329,0 5.375,2.34171 5.375,5.375v103.91667c0,3.03329 -2.34171,5.375 -5.375,5.375h-17.91667c-3.03329,0 -5.375,-2.34171 -5.375,-5.375v-103.91667c0,-3.03329 2.34171,-5.375 5.375,-5.375z"
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
    async pause() {
      const auth = this.$auth.strategy.token.get()
      await fetch('https://api.spotify.com/v1/me/player/pause', {
        method: 'PUT',
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
