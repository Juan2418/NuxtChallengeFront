<template>
  <header class="w-full flex flex-row justify-between px-4 py-4 bg-green-200">
    <section>A Logo</section>
    <section v-if="$auth.loggedIn">
      {{ $auth.user.email }}
      <button class="btn" @click="logout">Logout</button>
    </section>
    <section v-else>
      <nuxt-link to="/login">Login</nuxt-link>
      <nuxt-link to="/register">Register</nuxt-link>
    </section>
  </header>
</template>

<script>
export default {
  name: 'vue-header',
  methods: {
    logout() {
      this.$auth.logout();
    },
  },
};
</script>
