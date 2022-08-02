<template>
  <div>
    <section class="login_message">
      <el-input
        maxlength="11"
        :label="condition.text"
        v-model="formData[condition.key]"
      />
      <el-button class="get_verification" @click.prevent="getCode">
        {{ computeTime > 0 ? `已发送(${computeTime}s)` : "获取验证码" }}
      </el-button>
    </section>
  </div>
</template>

<script>
export default {
  name: "VerificatioCode",
  data() {
    return {
      computeTime: 0, // 计时的时间
    };
  },
  props: {
    formData: {
      type: Object,
    },
    condition: {
      type: Object,
    },
  },
  methods: {
    // 异步获取短信验证码
    async getCode() {
      // 如果当前没有计时
      if (!this.computeTime) {
        // 启动倒计时
        this.computeTime = 30;
        this.intervalId = setInterval(() => {
          this.computeTime--;
          if (this.computeTime <= 0) {
            // 停止计时
            clearInterval(this.intervalId);
          }
        }, 1000);

        // 发送ajax请求(向指定手机号发送验证码短信)
        const result = { code: 0, msg: "发送成功" };
        if (result.code === 1) {
          // 显示提示
          this.$alert(result.msg, "提示");
          // 停止计时
          if (this.computeTime) {
            this.computeTime = 0;
            clearInterval(this.intervalId);
            this.intervalId = undefined;
          }
        }
      }
    },
  },
};
</script>

<style scoped>
.login_message {
  position: relative;
  font-size: 14px;
  background-color: #fff;
}
.get_verification {
  position: absolute;
  top: 50%;
  right: 1px;
  transform: translateY(-50%);
  border: 0;
  color: #ccc;
  font-size: 14px;
  background: transparent;
}
</style>
