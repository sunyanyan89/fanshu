<template>
    <div class="container" v-if="current_user">
        <h3>{{ current_user.get('username') }}</h3>
        <hr>
        <div class="operator" v-if="user">
            <button v-if="user.id != current_user.id" @click="toggleFollow">
                {{followed?'取消关注':'关注'}}该用户
            </button>
            <ul>
                <li></li>
            </ul>
        </div>
    </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "",
  data() {
    const id = this.$route.params.id;
    return {
      current_user: null,
      articles: null,
      followed: false,
      id
    };
  },
  computed: mapState(["user"]),
  created() {
    this.getCurrentUser;
  },
  methods: {
    getCurrentUser() {
      const id = this.id;
      let q = new this.$api.SDK.Query("_User");
      q
        .get(id)
        .then(user => {
          this.current_user = user;
          return user;
        })
        .then(user => {
          this.getArticles(user);
          this.checkFollowed();
        })
        .catch(console.error);
    },
    getArticles(user) {
      let q = new this.$api.SDK.Query("Article");
      q.equalTo("author", user);
      q.ascending("createdAt");
      q
        .find()
        .then(articles => {
          this.articles = articles;
        })
        .catch(console.error);
    },
    toggleFollow() {
      const id = this.id;
      if (this.followed) {
        // 取消关注
      } else {
        // 关注
      }
    }
  }
};
</script>
