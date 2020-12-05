<template>
  <table class="min-w-full divide-y divide-gray-200">
    <thead>
      <tr>
        <th
          scope="col"
          class="px-6 py-3 bg-playerbg text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
        >
          Title
        </th>
        <th
          scope="col"
          class="px-6 py-3 bg-playerbg text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
        >
          Album
        </th>
        <th
          scope="col"
          class="px-6 py-3 bg-playerbg text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
        >
          Duration
        </th>
        <th
          scope="col"
          class="px-6 py-3 bg-playerbg text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
        >
          Options
        </th>
      </tr>
    </thead>
    <tbody class="bg-playerbg divide-y divide-gray-200">
      <Track
        v-for="track in tracks"
        :key="track.id"
        :track="track"
        :playlists="playlists.items"
      />
    </tbody>
  </table>
</template>

<script>
import Track from './TableComponents/Track'
export default {
  components: {
    Track,
  },
  // eslint-disable-next-line vue/require-prop-types
  props: ['playlists', 'tracks'],

  methods: {
    millisToMinutesAndSeconds(millis) {
      const minutes = Math.floor(millis / 60000)
      const seconds = ((millis % 60000) / 1000).toFixed(0)
      return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
    },
    async play(uri) {
      const auth = this.$auth.strategy.token.get()
      const data = {
        uris: [uri],
      }
      await fetch('https://api.spotify.com/v1/me/player/play', {
        method: 'PUT',
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(data),
      }).then(async (resp) => {
        if (resp.ok) {
          this.$toast.success('Successfully added')
          await this.$store.dispatch('loadPlayer')
        } else {
          this.$toast.error('Failed to add', { duration: 2500 })
        }
      })
    },
    async addToQueue(uri) {
      const auth = this.$auth.strategy.token.get()
      await fetch(`https://api.spotify.com/v1/me/player/queue?uri=${uri}`, {
        method: 'POST',
        headers: {
          Authorization: auth,
        },
      }).then(async (resp) => {
        if (resp.ok) {
          this.$toast.success('Successfully added')
          await this.$store.dispatch('loadPlaylists')
        } else {
          this.$toast.error('Failed to add', { duration: 2500 })
        }
      })
    },
    async addToPlaylist(playlist, track) {
      const auth = this.$auth.strategy.token.get()

      const data = {
        uris: [track],
      }
      await fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
        method: 'POST',
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(data),
      }).then(async (resp) => {
        if (resp.ok) {
          this.$toast.success('Successfully added')
          await this.$store.dispatch('loadPlaylists')
        } else {
          this.$toast.error('Failed to add', { duration: 2500 })
        }
      })
    },
    async deleteFromPlaylist(track) {
      const auth = this.$auth.strategy.token.get()
      const playlist = this.$route.params.playlist
      const data = {
        uris: [track],
      }
      await fetch(`https://api.spotify.com/v1/playlists/${playlist}/tracks`, {
        method: 'DELETE',
        headers: {
          Authorization: auth,
        },
        body: JSON.stringify(data),
      }).then(async (resp) => {
        if (resp.ok) {
          this.$toast.success('Successfully deleted')
          await this.$store.dispatch('loadPlaylists')
        } else {
          this.$toast.error('Failed to delete', { duration: 2500 })
        }
      })
    },
  },
}
</script>
<style scoped>
/* since nested groupes are not supported we have to use
     regular css for the nested dropdowns
  */
li > ul {
  transform: translatex(100%) scale(0);
}
li:hover > ul {
  transform: translatex(101%) scale(1);
}
li > button svg {
  transform: rotate(-90deg);
}
li:hover > button svg {
  transform: rotate(-270deg);
}

/* Below styles fake what can be achieved with the tailwind config
     you need to add the group-hover variant to scale and define your custom
     min width style.
  	 See https://codesandbox.io/s/tailwindcss-multilevel-dropdown-y91j7?file=/index.html
  	 for implementation with config file
  */
.group:hover .group-hover\:scale-100 {
  transform: scale(1);
  z-index: 999;
}
.group:hover .group-hover\:-rotate-180 {
  transform: rotate(180deg);
}
.scale-0 {
  transform: scale(0);
}
.min-w-32 {
  min-width: 8rem;
}

/* width */
::-webkit-scrollbar {
  width: 16px;
  height: 16px;
}

/* Track */
::-webkit-scrollbar-track {
  border-radius: 100vh;
  background: #3f3f3f;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #272727;
  border-radius: 100vh;
  border: 3px solid #3f3f3f;
}
</style>
