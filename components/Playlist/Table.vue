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
      <tr v-for="track in tracks" :key="track.id">
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center">
            <div class="flex items-center flex-shrink-0 h-10">
              <img
                class="h-10 w-10 rounded"
                :src="track.track.album.images[0].url"
                alt=""
              />
            </div>
            <div class="ml-4">
              <div class="text-sm font-medium">
                {{ track.track.name }}
              </div>
              <div class="flex">
                <div
                  v-for="artist in track.track.artists"
                  :key="artist.id"
                  class="text-xs mr-5 text-gray-400"
                >
                  {{ artist.name }}
                </div>
              </div>
            </div>
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm">
            {{ track.track.album.name }}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="text-sm">
            {{ millisToMinutesAndSeconds(track.track.duration_ms) }}
          </div>
        </td>
        <td class="px-6 py-4 whitespace-nowrap">
          <div class="flex items-center justify-center">
            <div class="group inline-block text-black cursor-pointer">
              <button
                class="outline-none focus:outline-none border px-3 py-1 bg-white rounded-sm flex items-center min-w-32"
              >
                <span class="pr-1 font-semibold flex-1">Options</span>
              </button>
              <ul
                class="bg-white border rounded-sm transform scale-0 group-hover:scale-100 absolute transition duration-150 ease-in-out origin-top min-w-32"
              >
                <li
                  class="rounded-sm px-3 py-1 hover:bg-gray-100"
                  @click="play(track.track.uri)"
                >
                  Play
                </li>
                <li
                  class="rounded-sm px-3 py-1 hover:bg-gray-100"
                  @click="addToQueue(track.track.uri)"
                >
                  Add to queue
                </li>
                <li class="rounded-sm relative px-3 py-1 hover:bg-gray-100">
                  <button
                    class="w-full text-left flex items-center outline-none focus:outline-none"
                  >
                    <span class="pr-1 flex-1">Add to playlist</span>
                    <span class="mr-auto">
                      <svg
                        class="fill-current h-4 w-4 transition duration-150 ease-in-out"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul
                    class="bg-white flex flex-col border rounded-sm absolute top-0 right-0 transition duration-150 ease-in-out origin-top-left"
                  >
                    <li
                      v-for="playlist in playlists"
                      :key="playlist.id"
                      class="px-3 py-1 hover:bg-gray-100"
                      @click="addToPlaylist(playlist.id, track.track.uri)"
                    >
                      {{ playlist.name }}
                    </li>
                  </ul>
                </li>
                <li
                  class="rounded-sm px-3 py-1 hover:bg-gray-100"
                  @click="deleteFromPlaylist(track.track.uri)"
                >
                  Delete
                </li>
              </ul>
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
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
          this.$toast.error('Failed to add', { duration: 5000 })
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
          this.$toast.error('Failed to add', { duration: 5000 })
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
          this.$toast.error('Failed to add', { duration: 5000 })
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
          this.$toast.error('Failed to delete', { duration: 5000 })
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
