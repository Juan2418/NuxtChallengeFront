<template>
  <section>
    <p class="font-bold text-lg">
      Re enter password for {{ $auth.user.email }}
    </p>
    <form>
      <section class="grid grid-cols-2 w-full">
        <label for="password" class="self-start w-full">Password:</label>
        <input
          id="password"
          v-model="password"
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
        <p
          v-if="credentialsError !== ''"
          class="text-sm text-red-700 pb-2 truncate"
        >
          {{ credentialsError }}
        </p>
        <button class="btn btn-form my-2" @click.prevent="login()">
          Login
        </button>
      </section>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      password: '',
      passwordError: '',
      credentialsError: '',
    };
  },
  methods: {
    getResponseErrors(error) {
      return error.response.data.errors;
    },
    logErrors(errors) {
      const { password } = errors;
      this.passwordError = password !== undefined ? password[0] : '';
    },
    login() {
      this.$auth
        .loginWith('local', {
          data: {
            email: this.$auth.user.email,
            password: this.password,
          },
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

<style></style>
