<template>
  <div>
    <div class="absolute top-0 left-0 h-screen">
      <button class="p-2 text-2xl font-bold text-white" @click="toggle()">
        &#9776;
      </button>
    </div>
    <nav
      :class="open ? 'navbar-open' : 'navbar-close'"
      class="absolute top-0 flex flex-col w-64 h-screen navbar bg-navbg"
    >
      <div class="flex justify-end pr-2">
        <button class="p-2 text-xl font-bold text-white" @click="toggle()">
          &#9747;
        </button>
      </div>
      <Login v-if="!this.$auth.loggedIn" :login="{ name: 'Login' }" />
      <User v-else />
      <h1 class="pt-2 mt-10 text-3xl font-bold text-center text-spotify">
        Menu
      </h1>
      <NavItem :menu-item="{ name: 'Home', href: '/' }" />
      <NavItem :menu-item="{ name: 'Player', href: '/player' }" />
      <Logout v-if="this.$auth.loggedIn" class="mt-auto mb-48" />
    </nav>
  </div>
</template>

<script>
import NavItem from '../Drawer/Items/NavItem'
import Login from '../Drawer/Items/LoginButton'
import User from '../Drawer/Items/User'
import Logout from '../Drawer/Items/Logout'
export default {
  components: {
    NavItem,
    Login,
    User,
    Logout,
  },
  data() {
    return {
      open: false,
    }
  },

  methods: {
    toggle() {
      this.open = !this.open
    },
  },
}
</script>

<style>
.navbar {
  transition: all 330ms ease-out;
}

.navbar-open {
  transform: translateX(0%);
}
.navbar-close {
  transform: translateX(-100%);
}

div {
  font-family: GothamPro;
  font-display: swap;
}
</style>
