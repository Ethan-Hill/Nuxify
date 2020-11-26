import axios from 'axios'

export const state = () => ({
  player: null,
  searchedTracks: null,
})

export const mutations = {
  setPlayer(state, payload) {
    state.player = payload
  },

  setTracks(state, payload) {
    state.searchedTracks = payload
  },
}

export const actions = {
  async loadPlayer({ commit }) {
    const auth = this.$auth.strategy.token.get()
    await axios
      .get('https://api.spotify.com/v1/me/player', {
        headers: {
          Authorization: auth,
        },
      })
      .then(async (resp) => {
        await commit('setPlayer', resp.data)
      })
  },
  async SearchTracks({ commit }, search) {
    const auth = this.$auth.strategy.token.get()
    await axios
      .get('https://api.spotify.com/v1/search', {
        headers: {
          Authorization: auth,
        },
        params: {
          q: search,
          type: 'track',
          limit: 8,
        },
      })
      .then(async (resp) => {
        await commit('setTracks', resp.data.tracks.items)
      })
  },
}

export const getters = {
  player: (state) => state.player,
  searchedTracks: (state) => state.searchedTracks,
}
