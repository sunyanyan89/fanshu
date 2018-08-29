<template>
    <div class="container">
        <template v-if="article">
            <h2>{{ article.get('title') }}</h2>
            <div class="push-right" v-if="uid === article.get('author').id">
                <el-button type="primary" size="small">修改</el-button>
                <el-button type="danger" size="small" @click="destory">删除</el-button>
            </div>
            <div class="content" v-html="article.get('content')"></div>
        </template>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "ArticleDetail",
  data() {
    return {
      article: null
    };
  },
  created() {
    const id = this.$route.params.id;
    this.getArticle(id);
  },
  computed: {
    ...mapGetters(["uid"])
  },
  methods: {
    getArticle(id) {
      const q = new this.$api.SDK.Query("Article");
      q.include("author");
      q.include("category");
      q
        .get(id)
        .then(article => {
          this.article = article;
          this.$Progress.finish();
        })
        .catch(console.error);
    },
    destory() {
      this.article.destroy().then(() => {
        this.$message.success("删除成功");
        this.$router.replace({ path: "/article?type=all" });
      });
    }
  }
};
</script>

