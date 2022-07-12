<template>
 <el-container>
  <el-header class="el-header">
  <div class="course">
    <div class="manage">
      <div class="more">
        <!-- <el-button class="add-course" type="primary" size="mini"
          >更多</el-button
        > -->
      
      <i  class="el-icon-more"></i>
      </div>
    </div>

    <div id="course-header" class="topbox cl">
      <div class="topm cl">
        <div class="h1">
          {{ course.courseName }}
        </div>
        <div class="h2">
          {{ course.courseYear }}-
          {{ course.courseTerm }}
        </div>
        <div class="h3">
          {{ course.courseClass }}
        </div>
        <div class="box-box">
          <div class="sele">
            <span class="codetext"
              >加课码：
              {{ course.courseCode }}
            </span>
          </div>
          <div class="sele">
            <span class="codetext">
              &nbsp;负责人：&nbsp;{{ course.courseLeader}}
            </span>
          </div>
        </div>
      </div>
    </div>
    </div>

    </el-header>
    



 <el-main   class="el-main">
      
    <!-- 项目任务区-->
    <!-- <el-tabs class="tabs" v-model="activeName" @tab-click="handleClick"> -->
      <!-- 添加动态参数的面板 -->
      <!-- 添加静态属性的面板 -->
    <el-menu 
    
     background-color="#fff"
          text-color="#545c64"
          active-text-color="#0088F4"
          :unique-opened="true"
          :collapse="isCollaspe"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
    
    class="el-menu-demo" mode="horizontal" @select="handleSelect">
  <el-menu-item 
  index="projectDescript"
              @click="saveNavState('projectDescript')"
  
  >
    项目说明
    
    </el-menu-item>
  
  <el-menu-item  index="tasks"     @click="saveNavState('tasks')">项目任务</el-menu-item>
  <el-menu-item index="users"     @click="saveNavState('users')">项目参与者</el-menu-item>
 </el-menu>
      

<!-- </el-tabs> -->
        <!-- 路由占位符 -->
        <router-view class="router-view "></router-view>
      </el-main>
</el-container>
</template>



<script>
import Vue from 'vue'

export default {
  data() {
   
    return {
      activePath: '',
      

      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,

      // 查询到的用户信息对象
      editForm: {
        username: '',
        password: '',
        mobile: '',
        email: '',
        role_name: '',
        date: '',
        mg_state: '',
      },

      //操作的行数（修改，删除）
      user_index: 0,

      input: '',
      editProjectInfo: true,
      activeName: 'first',
      course: {
        cid: 0,
        courseName: '母猪产后护理',
        courseClass: '软工1902',
        courseCode: 'WDRJCX',
        courseYear: '2001-1-1',
        courseTerm: '2002-10-23',
        fuzeren: 'zs',
      },

      tabPosition: 'left',

      userList: [
        {
          name: '王小1',
          mobile: '1654521675',
          email: '3492829503@qq.com',
          role_name: '管理员',
          date: '2016-05-02',
          mg_state: '离线',
        },
        {
          name: '王小2',
          mobile: '1654521675',
          email: '384985@qq.com',
          role_name: '参与者',
          date: '2016-05-04',
          mg_state: '在线',
        },
        {
          name: '王小3',
          mobile: '1654521675',
          email: '384985@qq.com',
          role_name: '管理员',
          date: '2016-05-04',
          mg_state: '离线',
        },
        {
          name: '王小4',
          mobile: '1654521675',
          email: '384985@qq.com',
          role_name: '管理员',
          date: '2016-05-04',
          mg_state: '在线',
        },
      ],
    }
  },

  created() {

     

    
    
  //  this.activePath = sessionStorage.getItem('activePath')
    var id = this.$route.query.id;
    // console.log(id);
    // alert(id)
    if(id!=null)
    {
    this.course=id
    }

    var list= sessionStorage.getItem('finishEditUser')
    
    if(list!=null){
      this.userList=list
    }

    //alert(list)

    



    

    //  this.$router.push({
    //     path: '/projectDescript',
    //     query: { id: this.course },
        
    //   })

     


       



  },



  methods: {
 
    handleClick(tab, event) {
      console.log(this.activeName)
    },
    editProjectInput() {
      // if(this.editProjectInfo){
      //     this.editProjectInfo=false
      // }else{
      // this.editProjectInfo=true
      // }
      this.editProjectInfo = false
    },
    saveProjectInput() {
      this.editProjectInfo = true
    },
     //保存链接的激活状态
    saveNavState(activePath) {
        
      sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
      this.$router.push({
        path: activePath,
        query: { id: this.course,
                user:this.userList},
        
      }) 
    },
  },
}
</script>




<style scoped>



.el-menu--horizontal>.el-menu-item {
    float: left;
    height: 60px;
    line-height: 30px;
    margin: 0;
    border-bottom: 2px solid transparent;
    color: #909399;
}
.el-menu-item{
  height: 30px !important;
  
  
}
.tabs {
  margin-top: 0px;
  border-top: 1px rgb(216, 195, 201) solid;
  
}

.course {
  border: solid 1px #cec1c1;
  width: 100%;
  
  background: url('../../../assets/bkg.jpg') no-repeat;
  opacity: 80%;
  background-size: cover;
}

.el-menu-demo{
  border: solid 1px #cec1c1;
}

.el-main{
  margin-top:105px;
  
}

.router-view {
  
  border: solid 1px #cec1c1;
}

.topbox {
  width: 100%;
  height: 165px;
  
}

.h1 {
  padding: 10px;
  font-size: 30px;
  padding-left: 50px;
  color: rgb(252, 249, 249);
}

.h2 {
  padding: 4px;
  font-size: 15px;
  padding-left: 50px;
  color: rgb(252, 249, 249);
}

.h3 {
  padding: 3px;
  font-size: 20px;
  padding-left: 50px;
  color: rgb(252, 249, 249);
}

.topm .box-box {
  padding-left: 50px;
}

.topm .sele {
  float: left;
  font-size: 15px;
  text-align: left;
  height: 24px;
  line-height: 24px;
  background-position: 100px 10px;
  background-size: 14px auto;
  cursor: pointer;
  user-select: none;
  background-color: rgba(242, 239, 248, 0);
  border-radius: 2px;
  color: rgb(252, 249, 249);

  margin-right: 20px;
}

.topm .sele .codetext {
  font-size: 12px;
}



.manage {
  position: relative;
  margin-bottom: 20px;
}

.manage div {
  float: right;
}

.more{
  margin-top: 5px;
  margin-right: 15px;
  color: rgb(255, 254, 254);
}


</style>