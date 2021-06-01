<template>
  <article class="flex flex-col items-center">
    <h1 class="font-bold text-2xl py-4">Register</h1>
    <auth-form name />
  </article>
</template>

<script>
import AuthForm from '~/components/AuthForm';

export default {
  components: { AuthForm },
};
</script>
