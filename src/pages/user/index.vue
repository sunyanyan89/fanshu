<template>
  <div class="container" v-if="current_user">
    <h3>{{ current_user.get('username') }}</h3>
    <div v-if="user">
      <div v-if="user.id !== current_user.id" class="mb20" >
        <el-button type="primary" size="small" @click="toggleFollow">
          {{followed?'取消关注':'关注'}}该用户
        </el-button>
        <el-button type="primary" size="small" @click="dialogFormVisible = true">发送私信</el-button>
        <el-dialog title="发送私信给该用户" :visible.sync="dialogFormVisible">
          <el-form :model="form" ref="form" label-width="100px" label-position="top" :rules="rules">
            <el-form-item label="私信内容" prop="msg">
              <el-input type="textarea" v-model="form.msg"/>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="sendMsg">确 定</el-button>
          </div>
        </el-dialog>
      </div>
      <hr>
      <Articles :articles="articles"/>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Articles from "@/components/Articles";

export default {
  name: "",
  components: { Articles },
  data() {
    const id = this.$route.params.id;
    return {
      current_user: null,
      articles: null,
      followed: false,
      id,
      dialogFormVisible: false,
      form: {
        msg: ""
      },
      rules: {
        msg: [{ required: true, message: "请输入私信内容", trigger: true }]
      }
    };
  },
  computed: mapState(["user"]),
  created() {
    this.getCurrentUser();
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
      q.include("author");
      q.equalTo("author", user);
      q.ascending("createdAt");
      q
        .find()
        .then(articles => {
          this.articles = articles;
          this.$Progress.finish();
        })
        .catch(console.error);
    },
    toggleFollow() {
      const id = this.id;
      if (this.followed) {
        // 取消关注
        this.user
          .unfollow(id)
          .then(() => {
            this.followed = false;
            this.$message.success("取消关注成功");
          })
          .catch(console.error);
      } else {
        // 关注
        this.user
          .follow(id)
          .then(() => {
            this.followed = true;
            this.$message.success("关注成功");
          })
          .catch(console.error);
      }
    },
    checkFollowed() {
      const id = this.id;
      const q = this.user.followeeQuery();
      q.include("followee");
      q
        .find()
        // followee 当前登录用户关注的人
        .then(followee => {
          if (followee.length) {
            if (followee.some(f => f.id === id)) {
              this.followed = true;
            }
            return;
          }
        })
        .catch(console.error);
    },
    sendMsg() {
      if (!this.form.msg) {
        this.$message.error("信息不能为空");
        return;
      }
      const Status = this.$api.SDK.Status;
      const status = new Status(null, this.form.msg);
      status.set("from", this.user);
      status.set("to", this.current_user);
      Status.sendPrivateStatus(status, this.current_user).then(
        status => {
          if (status) {
            this.dialogFormVisible = false;
            this.$message.success("私信发送成功");
          }
        },
        err => this.$message.error(err)
      );
    }
  }
};
</script>

<style>
</style>

