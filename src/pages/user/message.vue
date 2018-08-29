<template>
  <div class="container">
    <h2>我的消息</h2>
    <ul v-if="messages.length">
      <li v-for="(message, index) in messages"> 
        <router-link :to="{ name: 'User', params: { id: message.get('from').id } }">
          {{ message.get('from').get('username') }}
        </router-link> 给你发了一条信息
        <p>
          <el-button size="small" type="primary" @click="send(message.get('from'))">回复</el-button>
          <el-button size="small" type="danger" @click="destroy(index)">删除</el-button>
        </p>
        <p>{{ message.get('message') }}</p>
      </li>
    </ul>
    <span v-else>没有消息</span>

    <el-dialog title="发送私信给该用户" :visible.sync="dialogFormVisible">
      <el-form :model="form" ref="form" label-width="80px" label-position="top" :rules="rules">
        <el-form-item label="私信内容" prop="msg">
          <el-input type="textarea" v-model="form.msg"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary"  @click="sendMsg()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Message",
  data() {
    return {
      messages: [],
      sendTo: null,
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
    this.getMessages();
  },
  methods: {
    getMessages() {
      const q = new this.$api.SDK.Query("_Status");
      q.include("from");
      q.equalTo("to", this.user);
      q.equalTo("inboxType", "private");
      q
        .find()
        .then(messages => {
          this.messages = messages;
          this.$Progress.finish();
        })
        .catch(err => this.$message.error(err));
    },
    sendMsg() {
      if (!this.form.msg) {
        this.$message.error("信息不能为空");
        return;
      }
      const Status = this.$api.SDK.Status;
      const status = new Status(null, this.form.msg);
      status.set("from", this.user);
      status.set("to", this.sendTo);
      Status.sendPrivateStatus(status, this.sendTo).then(
        status => {
          if (status) {
            this.dialogFormVisible = false;
            this.$message.success("私信发送成功");
          }
        },
        err => this.$message.error(err)
      );
    },
    send(to) {
      this.sendTo = to;
      this.dialogFormVisible = true;
    },
    destroy(index) {
      console.log("要删除的 :", index);
      this.messages[index]
        .destroy()
        .then(status => {
          if (status) {
            this.messages.splice(index, 1);
            this.$message.success("删除成功");
          }
        })
        .catch(err => console.log("object :", err));
    }
  }
};
</script>

