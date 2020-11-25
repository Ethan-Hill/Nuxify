<template>
  <div>
    <div class="absolute top-0 left-0 h-screen">
      <button class="text-white text-2xl p-2 font-bold" @click="toggle()">
        &#9776;
      </button>
    </div>
    <nav
      :class="open ? 'navbar-open' : 'navbar-close'"
      class="flex flex-col navbar w-64 absolute top-0 h-screen"
      style="background-color: #040404"
    >
      <div class="flex pr-2 justify-end">
        <button class="p-2 text-white text-xl font-bold" @click="toggle()">
          &#9747;
        </button>
      </div>
      <Login v-if="!this.$auth.loggedIn" :login="{ name: 'Login' }" />
      <User v-else />
      <h1
        class="text-3xl text-center mt-10 font-bold pt-2"
        style="color: #1ed760"
      >
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
}
</style>
