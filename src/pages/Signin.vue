<template>
    <div class="container">
        <h1>登录</h1>
        <div class="form-panel">
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demo-userForm">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userForm')">登录</el-button>
                    <el-button @click="resetForm('userForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {
        name: "",
        password: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  mounted() {
    this.$Progress.finish();
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$api.SDK.User.logIn(this.userForm.name, this.userForm.password)
            .then(loggedInUser => {
              this.$store.dispatch("login", loggedInUser); // 保存到 vuex 中
              this.$router.push({ path: "/" }); // 去主页
              this.$message.success("登录成功！");
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.message);
            });
        } else {
          this.$message.error("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
  font-weight: 100;
}
.form-panel {
  width: 50%;
  margin: 0 auto;
}
</style>
