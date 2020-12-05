import axios from 'axios'

export const state = () => ({
  player: null,
  searchedTracks: null,
  playlists: null,
  playlist: null,
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
  setPlaylist(state, payload) {
    state.playlist = payload
  },
  setUser(state, payload) {
    state.user = payload
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
  async GetUser({ commit }) {
    const auth = this.$auth.strategy.token.get()
    await axios
      .get('https://api.spotify.com/v1/me', {
        headers: {
          Authorization: auth,
        },
      })
      .then(async (resp) => {
        await commit('setUser', resp.data)
      })
  },
  async GetPlaylist({ commit }, id) {
    const auth = this.$auth.strategy.token.get()
    await axios
      .get(`https://api.spotify.com/v1/playlists/${id}`, {
        headers: {
          Authorization: auth,
        },
      })
      .then(async (resp) => {
        await commit('setPlaylist', resp.data)
      })
  },
}

export const getters = {
  player: (state) => state.player,
  user: (state) => state.user,
  playlist: (state) => state.playlist,
  playlists: (state) => state.playlists,
  searchedTracks: (state) => state.searchedTracks,
}
