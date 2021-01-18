<template>
  <tr>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="flex items-center flex-shrink-0 h-10">
          <img
            class="w-10 h-10 rounded"
            :src="track.track.album.images[0].url"
            alt="TrackAlbumImage"
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
              class="mr-5 text-xs text-gray-400"
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
        <div class="inline-block text-black cursor-pointer group">
          <!-- <button
            class="flex items-center px-3 py-1 bg-white border rounded-sm outline-none focus:outline-none min-w-32"
          >
            <span class="flex-1 pr-1 font-semibold">Options</span>
          </button>
          <ul
            class="absolute transition duration-150 ease-in-out origin-top transform scale-0 bg-white border rounded-sm group-hover:scale-100 min-w-32"
          >
            <li
              class="px-3 py-1 rounded-sm hover:bg-gray-100"
              @click="play(track.track.uri)"
            >
              Play
            </li>
            <li
              class="px-3 py-1 rounded-sm hover:bg-gray-100"
              @click="addToQueue(track.track.uri)"
            >
              Add to queue
            </li>
            <li class="relative px-3 py-1 rounded-sm hover:bg-gray-100">
              <button
                class="flex items-center w-full text-left outline-none focus:outline-none"
              >
                <span class="flex-1 pr-1">Add to playlist</span>
                <span class="mr-auto">
                  <svg
                    class="w-4 h-4 transition duration-150 ease-in-out fill-current"
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
                class="absolute top-0 right-0 flex flex-col transition duration-150 ease-in-out origin-top-left bg-white border rounded-sm"
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
              class="px-3 py-1 rounded-sm hover:bg-gray-100"
              @click="deleteFromPlaylist(track.track.uri)"
            >
              Delete
            </li>
          </ul> -->

          <div class="relative">
            <button
              class="relative z-50 block p-2 bg-white rounded-md focus:outline-none"
              @click="dropdownOpen = !dropdownOpen"
            >
              <svg
                class="w-5 h-5 text-gray-800"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <div
              v-if="dropdownOpen"
              class="absolute right-0 z-20 w-48 py-2 mt-2 mb-0 bg-white rounded-md shadow-xl"
            >
              <button
                class="block px-4 py-2 mb-0 text-sm text-gray-700 capitalize cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="play(track.track.uri)"
              >
                Play
              </button>
              <button
                class="block px-4 py-2 mb-0 text-sm text-gray-700 capitalize cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="addToQueue(track.track.uri)"
              >
                Add to queue
              </button>
              <!-- <button
                class="block px-4 py-2 mb-0 text-sm text-gray-700 capitalize cursor-pointer hover:bg-blue-500 hover:text-white"
              >
                Add to playlist
              </button> -->
              <button
                class="block px-4 py-2 mb-0 text-sm text-gray-700 capitalize cursor-pointer hover:bg-blue-500 hover:text-white"
                @click="deleteFromPlaylist(track.track.uri)"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['playlists', 'track'],
  data() {
    return { dropdownOpen: false }
  },
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
          this.$toast.success('Successfully playing', { duration: 2500 })
          await this.$store.dispatch('loadPlayer')
          this.dropdownOpen = false
        } else {
          this.$toast.error('Failed to add', { duration: 2500 })
          this.dropdownOpen = false
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
          this.$toast.success('Successfully added', { duration: 2500 })
          await this.$store.dispatch('loadPlaylists')
          this.dropdownOpen = false
        } else {
          this.$toast.error('Failed to add', { duration: 2500 })
          this.dropdownOpen = false
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
          this.$toast.success('Successfully added', { duration: 2500 })
          await this.$store.dispatch('loadPlaylists')
          this.dropdownOpen = false
        } else {
          this.$toast.error('Failed to add', { duration: 2500 })
          this.dropdownOpen = false
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
          this.$toast.success('Successfully deleted', { duration: 2500 })
          await this.$store.dispatch('loadPlaylists')
          this.dropdownOpen = false
        } else {
          this.$toast.error('Failed to delete', { duration: 2500 })
          this.dropdownOpen = false
        }
      })
    },
  },
}
</script>

<style scoped></style>
