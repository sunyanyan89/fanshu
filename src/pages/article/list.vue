<template>
  <div class="container">
    <header>
      <h2>{{title}}</h2>
    </header>
    <Articles :articles="articles"/>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Articles from "@/components/Articles";

export default {
  name: "ArticleList",
  components: { Articles },
  data() {
    return {
      title: "",
      articles: []
    };
  },
  created() {
    this.match();
  },
  watch: {
    ["$route.query"]() {
      this.articles = [];
      this.match();
    }
  },
  computed: mapState(["user"]),
  methods: {
    match() {
      let flag = this.$route.query.type || this.$route.query.cid;
      this.$Progress.start();
      switch (flag) {
        case "me":
          this.getMyArticles();
          break;
        case "all":
          this.getAllArticles();
          break;
        default:
          this.getCategoryArticles(flag);
      }
    },
    query() {
      let q = new this.$api.SDK.Query("Article");
      q.include("category");
      q.include("author");
      q.descending("createdAt"); // 新创建的在前面
      return q;
    },
    getCategoryObj(id) {
      return this.$api.SDK.Object.createWithoutData("Category", id);
    },
    setArticles(q) {
      q
        .find()
        .then(articles => {
          this.articles = articles;
          this.$Progress.finish();
        })
        .catch(this.fail);
    },
    fail(error) {
      this.$message.error(error);
      this.$Progress.fail();
    },
    getAllArticles() {
      this.title = "所有文章";
      const q = this.query();
      this.setArticles(q);
    },
    getMyArticles() {
      this.title = "我的文章";
      const q = this.query();
      q.equalTo("author", this.user);
      this.setArticles(q);
    },
    getCategoryArticles(cid) {
      let cateObj = this.getCategoryObj(cid);
      const q = this.query();
      q.equalTo("category", cateObj);
      this.setArticles(q);
    }
  }
};
</script>

<style lang="css" scoped>
h2 {
  text-align: center;
}
header {
  border-bottom: 1px solid #f2f2f2;
  margin-bottom: 5px;
  padding: 20px;
}
</style>
