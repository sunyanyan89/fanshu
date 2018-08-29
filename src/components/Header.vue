<template>
    <div class="container">
        <el-menu :router="true" :default-active="activeIndex" class="el-menu" mode="horizontal" @select="handleSelect">
            <el-menu-item index="/" class="logo"> fanshu</el-menu-item>
            <el-menu-item index="/article?type=all"><icon name="file-alt"/> 文章</el-menu-item>
            
            <template v-if="user">
                <li class="el-menu-item right" @click="signout"><icon name="sign-out-alt"/> 注销</li>
                <el-submenu index='5' class="right">
                    <span slot="title">{{ user.getUsername() }}</span>
                    <el-menu-item index="/article/add">发布文章</el-menu-item>
                    <el-menu-item index="/article?type=me">我的文章</el-menu-item>
                    <el-menu-item index="6" :route="{name:'User', params: {id:user.id}}">我的主页</el-menu-item>
                    <el-menu-item index="6" :route="{name:'Followee', params: {id:user.id}}">我的关注</el-menu-item>
                    <el-menu-item index="6" :route="{name:'Follower', params: {id:user.id}}">我的粉丝</el-menu-item>
                    <el-menu-item index="6" route="/friend">我的朋友圈</el-menu-item>
                    <el-menu-item index="6" route="/message">我的消息</el-menu-item>
                </el-submenu>
            </template>
            <template v-else>
                <el-menu-item index="/signup" class="right"><icon name="user"/> 注册</el-menu-item>
                <el-menu-item index="/signin" class="right"><icon name="key"/> 登录</el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "Header",
  data() {
    return {
      activeIndex: "/"
    };
  },
  created() {
    // 解决编程式导航刷新不高亮问题
    this.activeIndex = this.$router.path;
    this.$router.afterEach((to, from) => {
      console.log(to);
      this.activeIndex = to.path;
    });
  },
  computed: mapState(["user"]),
  methods: {
    handleSelect(key, keyPath) {
      //   console.log(key, keyPath);
    },
    ...mapActions(["exit"]),
    signout() {
      this.exit();
      this.$api.SDK.User.logOut(); // SDK的退出， 清除缓存
      this.$message.success("注销成功");
      this.$router.replace("/");
    }
  }
};
</script>

<style scoped>
.right {
  float: right;
}
.logo {
  margin-left: 0;
  font-size: 25px;
  font-weight: 100;
  background: #20a0ff;
  color: #fff;
}
.logo:hover {
  background: #20a0ff;
}
</style>


