<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <iframe style="width:100%;height:100%" src="./parallax.html" frameborder="no"/>
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">请输入CIS账号密码登录</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.$Loading.start()
      this.handleLogin({ userName, password }).then(res => {
        this.$Loading.finish()
        this.getUserInfo().then(res => {
          this.$router.push({
            name: this.$config.homeName
          })
        })
      }).catch(err => {
        this.$Loading.error()
        if (err) {
          this.$Message.error(err)
        }
      })
    }
  }
}
</script>

<style>

</style>
