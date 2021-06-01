<template>
  <Main>
    <article class="container mx-auto flex flex-col py-4">
      <h1 class="text-4xl font-bold underline">
        {{ article.title }}
      </h1>
      <section class="py-16">
        {{ article.content }}
      </section>
      <footer class="self-end text-gray-400">
        Created by
        <span class="font-bold"> {{ $auth.user.email }} </span>
        at
        <span class="font-bold">
          {{ createdDate }}
        </span>
      </footer>
    </article>
    <footer class="container mx-auto w-50 h-22 flex flex-row">
      <card :items="articles" />
    </footer>
  </Main>
</template>

<script>
import { mapGetters, mapState, mapActions } from 'vuex';
import Card from '~/components/card.vue';

export default {
  components: { Card },
  data() {
    return {
      id: this.$route.params.id,
      article: {},
    };
  },
  computed: {
    createdDate() {
      return this.article.created_at?.split('T')[0];
    },
    ...mapState({
      articles: (state) => state.articles.all,
    }),
  },
  mounted() {
    this.loadUserArticles();
    const articleInStore = this.getArticle(this.id);
    if (articleInStore !== undefined) {
      this.article = articleInStore;
      return;
    }
    this.$axios
      .$get(`/articles/${this.id}`)
      .then((response) => (this.article = response))
      .catch((err) => {
        if (this.userDoesNotHavePermision(err)) {
          this.$router.push('/unauthorized');
        }
      });
  },
  methods: {
    ...mapGetters('articles', ['getArticle']),
    userDoesNotHavePermision(err) {
      return err.response.status === 503;
    },
    loadUserArticles() {
      this.$axios
        .$get('http://127.0.0.1:8000/api/articles')
        .then((response) => this.setArticles(response));
    },
    ...mapActions('articles', ['setArticles']),
  },
};
</script>

<style></style>
