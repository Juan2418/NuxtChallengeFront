<template>
  <div>
    <vue-header />
    <Nuxt />
  </div>
</template>

<script>
import VueHeader from '~/components/vueHeader';
export default {
  components: { VueHeader },
};
</script>

<style lang="postcss">
.btn {
  @apply font-bold py-2 px-4 rounded bg-green-400 scale-on-hover;
}

.btn-form {
  @apply text-white;
}

.btn:hover {
  @apply bg-green-500;
}

.scale-on-hover {
  @apply transform transition duration-500 hover:scale-110;
}
</style>
