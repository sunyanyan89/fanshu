<template>
  <div class="container">
    <h2>我的关注</h2>
    <ul v-if="followees.length">
        <li v-for="followee in followees">
            <router-link :to="{name:'User', params: {id: followee.id}}">{{ followee.get('username') }}</router-link>
        </li>
    </ul>
    <span v-else>你还没有关注任何人</span>
  </div>
</template>
<script>
import { mapState } from "vuex";

export default {
  // 我关注的人
  name: "Followee",
  data() {
    return {
      followees: []
    };
  },
  computed: mapState(["user"]),
  mounted() {
    this.getFollowee();
  },
  methods: {
    getFollowee() {
      const q = this.user.followeeQuery();
      q.include("followee");
      q
        .find()
        .then(followees => {
          this.followees = followees;
          this.$Progress.finish();
        })
        .catch(console.error);
    }
  }
};
</script>

