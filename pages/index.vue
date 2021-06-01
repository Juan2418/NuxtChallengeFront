<template>
  <div class="container">
    <div v-if="$auth.loggedIn">
      <card :items="articles" />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Card from '~/components/card.vue';

export default {
  components: { Card },
  middleware: 'auth',
  data() {
    return {
      email: '',
      password: '',
    };
  },
  computed: {
    ...mapState({
      articles: (state) => state.articles.all,
    }),
  },
  mounted() {
    if (this.isLoggedInButNoArticles()) {
      this.loadUserArticles();
    }
  },
  methods: {
    isLoggedInButNoArticles() {
      return this.$auth.loggedIn && this.articles.length === 0;
    },
    loadUserArticles() {
      this.$axios
        .$get('http://127.0.0.1:8000/api/articles')
        .then((response) => this.setArticles(response));
    },
    login() {
      this.$auth
        .loginWith('local', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then(({ data }) => {
          this.setArticles(data.user.articles);
        });
    },
    ...mapActions('articles', ['setArticles']),
  },
};
</script>

<style>
/* Sample `apply` at-rules with Tailwind CSS
.container {
@apply min-h-screen flex justify-center items-center text-center mx-auto;
}
*/
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
