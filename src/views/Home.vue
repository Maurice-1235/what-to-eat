<template>
  <div class="container">
    <div class="title">
      <h1>今天吃什么</h1>
    </div>
    <div class="prompt">
      <span> 请在下方输入密码后 </span>
      <br />
      <span> 点击后台管理按钮进入 </span>
    </div>
    <div class="d-flex align-center justify-center login">
      <v-sheet width="400" class="mx-auto">
        <v-form>
          <v-text-field
            v-model="password"
            variant="outlined"
            :append-inner-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            :rules="[rules.required]"
            :type="show2 ? 'text' : 'password'"
            label="Visible"
            hint="At least 8 characters"
            @click:append-inner="show2 = !show2"
          ></v-text-field>
          <v-btn
            @click="validate"
            type="submit"
            color="warning"
            block
            class="mt-2"
            rounded="pill"
            >后台管理</v-btn
          >
        </v-form>
      </v-sheet>
    </div>
  </div>
</template>

<script>
import { useToast } from "vue-toastification";
import { useRouter } from "vue-router";
export default {
  data() {
    return {
      show1: false,
      show2: true,
      password: "",
      router: useRouter(),
      toast: useToast(),
      rules: {
        required: (value) => !!value || "Required.",
      },
    };
  },
  methods: {
    async validate(e) {
      e.preventDefault();
      // this.$root.vtoast.show();
      // console.log(111)
      // const baseUrl = localhost:3000;
      // const checkLogin = await fetch("https://www.qsc.zju.edu.cn/passport/v4/login?success=url",);
      console.log(this.password);
      this.toast.info("I'm an info toast!");
      // if (this.password === "QscJtcsm") {
      //   // message.success('Logged In!')

      //   window.$message.success("Logged In");
      const response = await fetch(
        "https://www.qsc.zju.edu.cn/passport/v4/qsc/login",
        {
          headers: {
            "Content-Type": "application/json",
            "cess-Control-Allow-Origin": "*",
          },
        }
      );
      console.log(response);
      // this.router.push("/about");
      // } else {
      //   window.$message.error("Wrong Password!");
      //   // message.error('Wrong Password!')
      // }
    },
  },
};
</script>
<style>
h1 {
  font-weight: 700;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}
.container h1 {
  text-align: center;
  margin-top: 15%;
}
.container {
  text-align: center;
}
.input {
  margin-top: 50px;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  background-color: #d1d1d1;
}
.login {
  margin-top: 50px;
}
.prompt {
  margin-top: 50px;
}
</style>
