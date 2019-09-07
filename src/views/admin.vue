<template>
    <div>
      <header></header>
      <div class="content">
        <div class="staffWrap">
          <ul>
            <li v-for="item1 in dataList" v-on:click="renderData(item1)">{{item1.name}}</li>
          </ul>
        </div>
        <div class="workTime">
          <div class="operate" v-if="operateShow">
            <span v-show="!confirmed">未确认</span>
            <span v-show="confirmed">已确认</span>
            <a href="javascript:;" class="btn-confirmDate btn btn-primary btn-sm" v-show="!confirmed" v-on:click="confirmDate">确认</a>
          </div>
          <div v-for="item2 in currentStaff.workTime" class="staffTimeWrap">
            <div class="workDay">{{item2.date}}</div>
            <div class="theTime">
              <span>工作时间</span>
              <span class="startTime time">{{item2.startTime}}</span>
              <span>-</span>
              <span class="endTime time">{{item2.endTime}}</span>
              <span>休息时间</span>
              <span class="startTime time">{{item2.restTime}}小时</span>
            </div>
            <div class="confirmIn"><span>出勤</span><span class="confirmInTime time">9:05</span></div>
            <div class="confirmOut"><span>退勤</span><span class="confirmInTime time">12:05</span></div>
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
  /*content*/
  .content {
    width: 1100px;
    background: #fff;
    margin: auto;
  }
  .staffWrap{
    height: 500px;
    float: left;
    width: 180px;
    border-radius: 5px;
    box-shadow: 0px 5px 20px #888888;
    padding-bottom: 10px;
    padding-top: 10px;
    overflow: auto;
  }
  .staffWrap li:not(:last-child){
    border-bottom: 2px white solid;
  }
  .staffWrap li{
    height: 30px;
    text-align: center;
    line-height: 30px;
  }
  /*workTime*/
  .workTime{
    min-height: 500px;
    width: 910px;
    float: left;
    margin-left: 10px;
    background: white;
    padding: 20px;
    border-radius: 5px;
    box-shadow: 0px 5px 20px #888888;
  }
  /*operate*/
  .operate{
    display: block!important;
    background: #f4f4f4;
    border-radius: 5px;
    padding: 5px 10px;
  }
  .btn-confirmDate{
    height: 20px;
    font-size: 14px;
    line-height: 14px;
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
</style>
<script>
  import '@/assets/base.css'
  import axios from 'axios'
  export default {
      data(){
        return{
          dataList:[],
          currentStaff:{},
          confirmed:false,
          operateShow:false
        }
      },
      components:{
      },
      mounted:function () {
        this.getData();

      },
      methods:{
        getData(){
          axios.get("/staffs").then((result)=>{
            var res = result.data.result.list;
            this.dataList = res;
            this.removeAdmin();
          });
        },
        // 去除datalist中的admin
        removeAdmin(){
          var index;
          for (let i = 0; i < this.dataList.length; i++) {
            if (this.dataList[i].staffId == "admin" ){
              index=i;
            }
          }
          this.dataList.splice(index);
        },
        renderData(item){
          console.log("databaseConfirmed="+item.confirmed);

          this.currentStaff=item;
          this.operateShow=true;
          // this.confirmed=this.currentStaff.confirmed;
          if(!this.currentStaff.confirmed||this.currentStaff.confirmed=="false"){
            this.confirmed=false;
          }else{
            this.confirmed=true;
          }
          console.log(typeof (this.confirmed));
          console.log("this.confimed:"+this.confirmed);
        },
        confirmDate(){
            axios.post("/staffs/confirmDate",{staffId:this.currentStaff.staffId}).then((result)=>{
              this.confirmed=!this.confirmed;
            });
          },
      }
  }

</script>

<style scoped>

</style>
