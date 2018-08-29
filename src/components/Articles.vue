<template>
  <section class="articlesBox">
    <article v-for="(article, index) in articles" :key="article.id">
      <router-link :to="{name: 'ArticleDetail', params: { id: article.id}}">{{index+1}} . {{article.get('title')}}</router-link>
      <router-link class="author" :to="{name: 'User', params: { id: article.get('author').id}}">作者：{{ article.get('author').getUsername() }}</router-link>
    </article>
  </section>
</template>

<script>
export default {
  props: ["articles"]
};
</script>

<style scoped>
.articlesBox {
  padding: 30px;
}
article > a {
  text-decoration: none;
  color: #313030;
  line-height: 40px;
}
.author {
  font-size: 14px;
  color: #6e92fd;
  padding-left: 15px;
}
</style>

