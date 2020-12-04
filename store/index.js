import axios from 'axios'

export const state = () => ({
  player: null,
  searchedTracks: null,
  playlists: null,
})

export const mutations = {
  setPlayer(state, payload) {
    state.player = payload
  },

  setTracks(state, payload) {
    state.searchedTracks = payload
  },

  setPlaylists(state, payload) {
    state.playlists = payload
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
  async loadPlaylists({ commit }) {
    const auth = this.$auth.strategy.token.get()
    await axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: auth,
        },
      })
      .then(async (resp) => {
        await commit('setPlaylists', resp.data)
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
  playlists: (state) => state.playlists,
  searchedTracks: (state) => state.searchedTracks,
}
