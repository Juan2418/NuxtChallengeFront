<template>
  <form class="px-16 py-4 flex flex-col bg-gray-200 max-w-lg items-center">
    <section v-if="name" class="grid grid-cols-2">
      <label for="name">Name:</label>
      <input
        id="name"
        v-model="userInfo.name"
        type="text"
        class="border-2"
        required
      />
    </section>

    <section class="grid grid-cols-2">
      <label for="email" class="self-start w-full">Email: </label>
      <input
        id="email"
        v-model="userInfo.email"
        type="email"
        class="border-2"
        required
      />
    </section>

    <section class="grid grid-cols-2">
      <label for="password" class="self-start w-full">Password:</label>
      <input
        id="password"
        v-model="userInfo.password"
        name="password"
        type="password"
        class="border-2"
        required
      />
    </section>

    <button
      class="btn btn-form my-2"
      @click.prevent="name ? register() : login()"
    >
      {{ name ? 'Register' : 'Login' }}
    </button>
  </form>
</template>
<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'AuthForm',
  props: {
    name: Boolean,
  },
  data: () => {
    return {
      userInfo: {
        name: '',
        email: '',
        password: '',
      },
      nameError: '',
      emailError: '',
      passwordError: '',
    };
  },
  computed: {
    validName() {
      return this.name ? this.userInfo.name.length > 0 : true;
    },
    valid() {
      return (
        this.userInfo.password.length > 5 &&
        this.userInfo.email.length > 0 &&
        this.validName()
      );
    },
  },
  methods: {
    register() {
      axios
        .post('http://127.0.0.1:8000/api/auth/register', this.userInfo)
        .then(({ errors }) => {
          if (errors.name) this.nameError = errors.name;
        });
    },
    login() {
      this.$auth
        .loginWith('local', {
          data: this.userInfo,
        })
        .then(({ data }) => {
          this.setArticles(data.user.articles);
        });
    },
    ...mapActions('articles', ['setArticles']),
  },
};
</script>
