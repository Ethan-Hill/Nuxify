<template>
  <ul class="flex flex-col justify-center list-none text-white text-center">
    <li
      class="transition mt-4 mx-4 py-4 rounded duration-100 ease-in-out cursor-pointer"
      onMouseOver="this.style.background='#282828'"
      onMouseOut="this.style.background='#040404'"
      @click="move"
    >
      <a :href="menuItem.href || '/'">{{ menuItem.name }}</a>
    </li>
  </ul>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['menuItem'],
  methods: {
    move() {
      this.$router.push(this.menuItem.href)
    },
  },
}
</script>
