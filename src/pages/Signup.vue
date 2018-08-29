<template>
    <div class="container">
        <h1>注册</h1>
        <div class="form-panel">
            <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px">
                <el-form-item label="用户名" prop="name">
                    <el-input v-model="userForm.name"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userForm.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="userForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repassword">
                    <el-input type="password" v-model="userForm.repassword" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('userForm')">注册</el-button>
                    <el-button @click="resetForm('userForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    const checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("年龄不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (value < 18) {
            callback(new Error("必须年满18周岁"));
          } else {
            callback();
          }
        }
      }, 1000);
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.userForm.checkPass !== "") {
          this.$refs.userForm.validateField("repassword");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.password) {
        callback(new Error("两次密码不一致"));
      } else {
        callback();
      }
    };
    return {
      userForm: {
        name: "",
        email: "",
        password: "",
        repassword: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          { type: "email", message: "必须是合法的邮箱格式", trigger: "blur" }
        ],
        password: [{ validator: validatePass, trigger: "blur" }],
        repassword: [{ validator: validatePass2, trigger: "blur" }]
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
          let user = new this.$api.SDK.User();
          user.setUsername(this.userForm.name);
          user.setEmail(this.userForm.email);
          user.setPassword(this.userForm.password);

          user
            .signUp()
            .then(loginUser => {
              this.$store.dispatch("login", loginUser); // 保存到 vuex 中
              this.$router.push({ path: "/" }); // 去首页
              this.$message.success("注册成功！");
            })
            .catch(err => {
              console.log(err);
              this.$message.error(err.message);
            });
        } else {
          console.log("error submit!!");
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
