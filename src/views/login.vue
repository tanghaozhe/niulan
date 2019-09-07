<template>
  <div>
    <header>
      <div class="headerContent">
        <a href="#"><img src="../assets/logo.png" height="35" width="150"/></a>
      </div>
    </header>

    <div class="login">
      <form action="">
        <div class="error-wrap">
          <span class="error" v-show="errorTip">用户名或者密码错误！</span>
        </div>
        <div>
          <div class="form-group">
            <label for="inputId">ID</label>
            <input type="text" class="form-control" id="inputId" placeholder="" v-model="staffId">
          </div>
        </div>
        <div>
          <div class="form-group">
            <label for="inputPWD">密码</label>
            <input type="password" class="form-control" id="inputPWD" placeholder="" v-model="password">
          </div>
        </div>
        <div class="loginFooter">
          <a href="javascript:;" class="btn-adminLogin btn btn-primary" v-on:click="adminLogin">管理员</a>
          <a href="javascript:;" class="btn-login btn btn-primary" v-on:click="login">登录</a>
        </div>
      </form>
    </div>


  </div>
</template>

<style scoped>
  header{
    height: 80px;
    background: #fff;
  }
  header img{
    display: inline-block;
    margin-top: 20px;
    margin-left: 20px;
  }
  .login{
    width: 400px;
    /*height: 300px;*/
    /*border: 1px solid #666;*/
    margin: 200px auto auto auto;
    padding: 80px;
    position: absolute;
    top: 0;
    transform: translateX(-50%) translateY(-50%);
    margin-left: 50%;
    margin-top: 390px;
    border-radius: 5px;
    box-shadow: 0px 5px 20px #888888;
  }
  .btn-login{
    float: right;
  }
  .btn-adminLogin{
    float: left;
  }
  .loginFooter{
    margin-top: 40px;
    height: 32px;
  }
  .error{
    color: red;
  }


</style>
<script>
  import axios from 'axios'
  import $ from '../../node_modules/jquery/dist/jquery'
  import '../../node_modules/bootstrap/dist/js/bootstrap'
  import '../../node_modules/bootstrap/dist/css/bootstrap.css'
  export default {
      data(){
        return{
          staffId:"",
          password:"",
          errorTip:false
        }
      },
    methods:{
        login(){
          axios.post("/staffs/login",{
            staffId:this.staffId,
            password:this.password
          }).then((response)=>{
            let res = response.data;
            if(res.status=="0"){
              this.errorTip=false;
              // 得到staffId
              this.$router.push({name:"staff",params:{currentStaff:res.result.staffId}});
            }else{
              this.errorTip=true;
            }
          });
        },
      adminLogin(){
        if(this.staffId!="admin"){
          this.errorTip=true;
          return;
        }
        axios.post("/staffs/adminLogin",{
          staffId:this.staffId,
          password:this.password
        }).then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            this.errorTip=false;
            // 得到staffId
            this.$router.push({name:"admin",params:{currentStaff:res.result.staffId}});
          }else{
            this.errorTip=true;
          }
        });
      }
    }

  }
  $(function(){
    $('#myModal').modal({show:true,backdrop: false});
  })

</script>

<style scoped>

</style>
