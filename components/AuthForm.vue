<template>
  <form class="px-16 py-4 flex flex-col bg-gray-200 max-w-lg items-center">
    <section v-if="name" class="grid grid-cols-2 w-full">
      <label for="name">Name:</label>
      <input
        id="name"
        v-model="userInfo.name"
        type="text"
        class="border-2 w-full"
        required
        @click="nameError = ''"
      />
      <div></div>
      <p v-if="nameError !== ''" class="text-sm text-red-700 pb-2">
        *{{ nameError }}
      </p>
    </section>

    <section class="grid grid-cols-2 w-full">
      <label for="email" class="self-start w-full">Email: </label>
      <input
        id="email"
        v-model="userInfo.email"
        type="email"
        class="border-2 w-full"
        required
        @click="emailError = ''"
      />
      <div></div>
      <p v-if="emailError !== ''" class="text-sm text-red-700 pb-2">
        *{{ emailError }}
      </p>
    </section>

    <section class="grid grid-cols-2 w-full">
      <label for="password" class="self-start w-full">Password:</label>
      <input
        id="password"
        v-model="userInfo.password"
        name="password"
        type="password"
        class="border-2 w-full"
        required
        @click="passwordError = ''"
      />
      <div></div>
      <p v-if="passwordError !== ''" class="text-sm text-red-700 pb-2">
        *{{ passwordError }}
      </p>
    </section>
    <p
      v-if="credentialsError !== ''"
      class="text-sm text-red-700 pb-2 truncate"
    >
      {{ credentialsError }}
    </p>
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
      credentialsError: '',
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
    getResponseErrors(error) {
      return error.response.data.errors;
    },
    logErrors(errors) {
      const name = errors.name || [];
      const { email, password } = errors;
      this.nameError = name.length > 0 ? name[0] : '';
      this.emailError = email !== undefined ? email[0] : '';
      this.passwordError = password !== undefined ? password[0] : '';
    },
    register() {
      axios
        .post('http://127.0.0.1:8000/api/auth/register', this.userInfo)
        .catch((err) => {
          const serverErrors = this.getResponseErrors(err);
          this.logErrors(serverErrors);
        });
    },
    login() {
      this.$auth
        .loginWith('local', {
          data: this.userInfo,
        })
        .then(({ data }) => {
          this.setArticles(data.user.articles);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            this.credentialsError = err.response.data;
            return;
          }
          const serverErrors = this.getResponseErrors(err);
          this.logErrors(serverErrors);
        });
    },
    ...mapActions('articles', ['setArticles']),
  },
};
</script>
