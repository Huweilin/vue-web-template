<template>
  <div class="header">
    <div class="header-switch">
      <span :class="{'el-icon-s-fold':!flag,'el-icon-s-unfold':flag}" @click="navSwitch"></span>
    </div>
    <div class="header-time-box">
      <i class="el-icon-time"></i>
      {{time}}
    </div>
    <div class="header-user">
      <i>{{username.substring(0,1)}}</i>
      <el-popover
         placement="bottom"
         width="80"
         trigger="hover"
       >
         <div class="tooltip-menu">
           <div class="menu-items" @click="logOut">
             退出登录
             <i class="menu-items-left"></i>
             <i class="menu-items-right"></i>
           </div>
           <!-- <div class="menu-items" @click="openPasswordDialog">
              修改密码
              <i class="menu-items-left"></i>
              <i class="menu-items-right"></i>
            </div> -->
         </div>
         <div class="nav-items" slot="reference">
           {{username}}
         </div>
       </el-popover>
    </div>
    <!-- <el-dialog :visible.sync="passwordDialogShow" center  :show-close="false" width="400px">
      <div class="header-box" slot="title">
        <span>修改密码</span>
        <i class="el-icon-close" @click="closePasswordDialog"></i>
      </div>
      <div>
        <el-form ref="form" :model="form" :rules="rules" :label-position="'right'">
          <el-form-item label="用户名">
            <el-input v-model="username" size="small" disabled autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="原密码" prop="oldPassword">
            <el-input v-model="form.oldPassword" size="small" show-password autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="form.newPassword" size="small" show-password autocomplete="new-password"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="newPassword2">
            <MyTipBox :msg="testPassword">
                <el-input  slot="form" v-model="form.newPassword2" size="small" show-password autocomplete="new-password"></el-input>
            </MyTipBox>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleConfirm" :loading="btnLoading"  size="small">确 定</el-button>
          <el-button @click="closePasswordDialog" size="small">取 消</el-button>
        </span>
    </el-dialog> -->
  </div>
</template>
<script>
  import { mapGetters, mapActions } from 'vuex'
  export default {
    name: "Header",
    data() {
      return {
        flag: false,
        text: '收起',
        time: '',
        btnLoading: false,
        passwordDialogShow:false,
        form:{  //修改密码表单
          oldPassword:"",
          newPassword:"",
          newPassword2:""
        },
        rules: {
          oldPassword: {required: true, message: '请输入原密码！'},
          newPassword: {required: true, message: '请输入新密码！'},
        }
      }
    },
    computed:{
      ...mapGetters(['username', 'userId']),
      testPassword(){
        if (!this.form.newPassword2) {
          return ''
        }
        if (this.form.newPassword!=this.form.newPassword2){
          return '两次输入的密码不一致！'
        }
        return  ''
      }
    },
    methods: {
      navSwitch() {
        this.flag = !this.flag;
        this.text = this.flag ? '展开' : '收起';
        this.$emit('navSwitch', this.flag)
      },
      clock() {
        let date = new Date();
        let YY = date.getFullYear();
        let MM = date.getMonth() + 1;
        let dd = date.getDate();
        let HH = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
        let mm = date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes();
        //let ss = date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds();
        this.time = `${YY}.${MM}.${dd} ${HH}:${mm}`
      },
      // 退出登录清空数据
      logOut() {
        this.asyncLogout();
      },
      // 修改密码
      openPasswordDialog(){
        this.passwordDialogShow = true;
      },
      // 关闭密码弹框
      closePasswordDialog(){
        this.passwordDialogShow = false;
      },
      // 确认修改密码
      handleConfirm(){
        this.btnLoading = true;
        let form = {
          newPassword: this.form.newPassword,
          oldPassword: this.form.oldPassword,
        };
        this.$Serve.editUserPassword(this.userId, form).then(res=>{
          this.$Tools.message(res.message);
          this.passwordDialogShow = false;
          this.logOut();
        }).finally(()=>{
          this.btnLoading = false;
        })
      },
      ...mapActions(['asyncLogout'])
    },
    mounted() {
      this.clock();
      setInterval(() => {
        this.clock()
      }, 3000)
    }
  }
</script>
<style scoped lang="less">
  @deep: ~'>>>';
  .header {
    min-height: 72px; // 不使用min- 会出现跟logo高度不一致问题
    width: 100%;
    background-color: #FFF;
    display: flex;
    align-items: center;
    .header-switch {
      padding-left: 5px;
      border-color: #FFFFFF;
      span {
        display: inline-block;
        cursor: pointer;
        /* width: 40px;
         height: 25px;
         line-height: 25px;
         text-align: center;*/
        padding: 3px 8px;
        font-size: 26px;
        color: rgba(23, 62, 103, 0.4);
      }
    }
    .header-select {
      margin-left: 40px;
    }
    .header-time-box {
      margin-left: auto;
      //padding: 0 25px;
      font-size: 14px;
      font-family: Arial;
      //background-image: linear-gradient(135deg, #73e2ff, #eb7dff);
      -webkit-background-clip: text;
      color: rgba(23, 62, 103, 0.4);
      width: auto;
      text-align: center;
    }
    .header-user {
      height: 50px;
      display: flex;
      align-items: center;
      margin-left: 65px;
      margin-right: 10px;
      color: #333;
      i {
        height: 40px;
        width: 40px;
        border-radius: 50%;
        font-size: 20px;
        display: flex;
        justify-content: center;
        line-height: 40px;
        background: linear-gradient(to left, rgb(255, 153, 102), rgb(255, 94, 98));
        font-style: unset;
        color: #FFFFFF;
      }
      .nav-items {
        font-size: 16px;
        cursor: pointer;
        margin: 0 10px;
      }
    }
    .header-img-box {
      display: flex;
      align-items: center;
      padding: 0 40px 0 0;
      cursor: pointer;
      img {
        height: 45px;
        width: 45px;
        display: flex;
        background-color: #ffa15e;
        border-radius: 50%;
      }
      span {
        margin-left: 10px;
      }
    }
    .border {
      @BorderColor: #FFF;
      box-sizing: border-box;
      background: linear-gradient(to left, @BorderColor, @BorderColor) left top no-repeat,
      linear-gradient(to bottom, @BorderColor, @BorderColor) left top no-repeat,
      linear-gradient(to left, @BorderColor, @BorderColor) right top no-repeat,
      linear-gradient(to bottom, @BorderColor, @BorderColor) right top no-repeat,
      linear-gradient(to left, @BorderColor, @BorderColor) left bottom no-repeat,
      linear-gradient(to bottom, @BorderColor, @BorderColor) left bottom no-repeat,
      linear-gradient(to left, @BorderColor, @BorderColor) right bottom no-repeat,
      linear-gradient(to left, @BorderColor, @BorderColor) right bottom no-repeat;
      background-size: 1px 6px, 6px 1px, 1px 6px, 6px 1px;
    }
    .dialog-container {
      width: 100%;
      list-style: none;
      li:nth-child(1) {
        margin-top: 0;
      }
      li {
        display: flex;
        width: 100%;
        height: 90px;
        align-items: center;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 0 6px rgba(0, 0, 0, .1);
        padding: 5px 20px;
        box-sizing: border-box;
        border-radius: 5px;
        margin-top: 20px;
        img {
          display: inline-block;
          height: 60px;
          width: 60px;
          background-color: #3399ff;
          border-radius: 50%;
          margin-right: 25px;
        }
        div:nth-child(2) {
          p {
            height: 30px;
            line-height: 30px;
            font-size: 16px;
          }
        }
        div:nth-child(3) {
          margin-left: auto;
        }
      }
      > div {
        margin-top: 20px;
        text-align: center;
      }
    }
    @{deep}.el-dialog{
      .el-dialog__header {
        padding: 0;
        .header-box {
          display: flex;
          justify-content: center;
          padding-top: 20px;
          position: relative;
          align-items: center;
          span {
            font-size: 20px;
          }
          i {
            position: absolute;
            right: 25px;
            font-size: 20px;
            color: #999;
            cursor: pointer;
            transition:all ease .6s;
          }
          i:hover {
            transform: rotate(360deg);
          }
        }
      }
      .el-dialog__body{
        padding: 50px 60px 10px 35px;
        @{deep}.el-form-item{
          >label{
            width: 80px;
          }
        }
        .tip-box{
          width: 100%;
        }
      }
    }
  }
</style>