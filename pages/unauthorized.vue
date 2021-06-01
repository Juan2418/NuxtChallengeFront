<template>
  <article class="container flex flex-col mx-auto py-16">
    <header class="font-bold text-6xl py-16 text-red-700">Error 503</header>
    <section class="text-lg">You don't have access to this article</section>
    <footer class="self-center py-4 md:self-end">
      <button class="btn" @click="goHome()">Go back to your articles</button>
    </footer>
  </article>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push('/');
    },
  },
};
</script>
