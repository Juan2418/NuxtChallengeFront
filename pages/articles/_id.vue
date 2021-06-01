<template>
  <article>
    {{ article }}
  </article>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      id: this.$route.params.id,
      article: {},
    };
  },
  mounted() {
    this.$axios
      .$get(`/articles/${this.id}`)
      .then((response) => (this.article = response));
  },
  methods: {
    ...mapGetters('articles', ['getArticle']),
  },
};
</script>

<style></style>
