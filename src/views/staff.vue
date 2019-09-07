<template>
    <div>
      <header>
        <div class="headerContent">
          <a href="#" class=""><img src="../assets/logo.png" height="35" width="150"/></a>
          <nav class="headNav">
            <a href="javascript:;" class="login" v-on:click="logOut">登出</a>
          </nav>
        </div>
      </header>
      <div class="content">
        <div class="theStaff">
          <div>员工：{{currentStaff.name}}</div>
          <button class="checkIn">出勤</button>
          <button class="checkOut">退勤</button>
        </div>
        <div class="workTime">
          <form action="" class="timeForm">
            <div class="dayTime">
              <input type="date" v-model="date">
              <!--<span class="alertInput" v-if="!inputDate">请选择</span>-->
              <span>开始时间：</span><input type="time" name="startTime" class="startTime" v-model="startTime">
              <span>结束时间：</span><input type="time" name="endTime" class="endTime" v-model="endTime">
              <span>休息时间：</span>
              <!--<input type="number" name="restTime" class="restTime" v-model="restTime">-->
              <select name="restTime" id="restTime" v-model="restTime" autocomplete="off">
                <option value="0">0小时</option>
                <option value="0.5">0.5小时</option>
                <option value="1">1小时</option>
              </select>
              <a href="javascript:;" v-on:click="insertWorkTime" class="insertWorkTime btn btn-info btn-sm">提交</a>
            </div>
          </form>
          <div class="record">
            <div v-for="item in currentStaff.workTime" class="staffTimeWrap">
              <div class="workDay">{{item.date}}</div>
              <div class="theTime">
                <span>工作时间</span>
                <span class="startTime time">{{item.startTime}}</span>
                <span>-</span>
                <span class="endTime time">{{item.endTime}}</span>
                <span>休息时间</span>
                <span class="restTime time">{{item.restTime}}</span>小时
              </div>
              <a href="javascript:;" v-on:click="deleteData(item.date)" class="deleteDate">删除</a>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>
<style scoped>
  /*header*/
  header{
    width: 1100px;
    height: 80px;
    background:#fff;
    margin: auto;
    margin-bottom: 10px;
    border-radius: 5px;
  }
  .headNav{
    width: 100px;
    height: 80px;
    line-height:80px;
    float: right;
  }
  header img{
    display: inline-block;
    margin-top: 20px;
    margin-left: 20px;
  }
  /*content left*/
  .content {
    width: 1100px;
    background: #fff;
    margin: auto;
  }
  .theStaff{
    background:#ccffff;
    float: left;
    width: 180px;
    border-radius: 5px;
    text-align: center;
    height: 500px;
  }
  .checkIn,
  .checkOut{
    width: 80%;
    height: 30px;
    margin-top: 30px;
  }
  /*content right*/

  .workTime{
    height: 500px;
    width: 910px;
    float: left;
    margin-left: 10px;
    background: white;
    padding: 20px;
    border-radius: 5px;
  }
  /*workTime*/
  .insertWorkTime{
    margin-left: 50px;
  }

  .staffTimeWrap div{
    display: inline-block;
  }
  .dayTime{
    padding-bottom: 5px;
    border-bottom: 2px solid #eee
  }
  .restTime{
    width: 40px;
    height: 25px;
  }
  .staffTimeWrap{
    height: 25px;
    line-height: 25px;
    border-bottom: #f4f4f4 4px solid;
    text-align: left;
  }
  .staffTimeWrap div{
    display: inline-block;
  }
  .workDay{
    color: brown;
    width: 100px;
    padding-left: 5px;
    margin-right: 20px;
  }
  .endTime{
    margin-right: 20px;
  }
  .theTime span{
    display: inline-block;
    text-align: center;
  }
  .workTime .time{
    display: inline-block;
    min-width: 50px;
    color: brown;
    text-align: center;
  }
  .deleteDate{
    display: inline-block;
    background: #d9534f;
    padding:0 5px 0 5px;
    color: #FFF;
    border-radius: 5px;
    font-size: 12px;
    line-height: 20px;
    height: 20px;
    float: right;
  }
</style>
<script>
  import axios from 'axios'
  import $ from '../../node_modules/jquery/dist/jquery'
  import '../../node_modules/bootstrap/dist/js/bootstrap'
  import '../../node_modules/bootstrap/dist/css/bootstrap.css'
  export default {
    name: "Staff",
    data(){
      return{
        dataList:[],
        currentStaff:{},
        date:"",
        startTime:"",
        endTime:"",
        restTime:"0"
      }
    },
    components:{
    },
    mounted:function () {
      this.getData();
    },
    methods:{
      // 用cookies的id来取得数据
      getData(){
        axios.post("/staffs/getData",{}).then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            // 如果返回0，取到当前staff
            this.currentStaff=res.result.currentStaff;
          }
        });
      },
      logOut(){
        axios.post("/staffs/logOut").then((response)=>{
          let res = response.data;
          if(res.status=="0"){
            alert("退出成功！");
          }
          this.$router.push({name:"login",params:{}});
        });
      },
      insertWorkTime(){
        axios.post("/staffs/insertWorkTime",{
          currentStaffId:this.currentStaff.staffId,
          date:this.date,
          startTime:this.startTime,
          endTime:this.endTime,
          restTime:this.restTime
        }).then((response)=>{
          this.getData();
          alert("添加成功！");
        })
      },
      // 删除一组数据
      deleteData(date){
        axios.post("/staffs/deleteData",{
          date:date
        }).then((response)=>{
          let res =response.data;
          if(res.status=="0"){
            this.getData();
          }
          alert("删除成功！");
        })
      }
    }
  }
</script>

<style scoped>

</style>
