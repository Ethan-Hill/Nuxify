import axios from 'axios'

export const state = () => ({
  player: null,
})

export const mutations = {
  setPlayer(state, payload) {
    state.player = payload
  },
}

export const actions = {
  async load({ commit }) {
    const auth = this.$auth.strategy.token.get()
    await axios
      .get('https://api.spotify.com/v1/me/player', {
        headers: {
          Authorization: auth,
        },
      })
      .then((resp) => {
        commit('setPlayer', resp.data)
      })
  },
}

export const getters = {
  load(state) {
    return state.player
  },
}
