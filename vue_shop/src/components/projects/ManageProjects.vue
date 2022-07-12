<template>
  <div id="class">
    <!--  面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">我的项目</el-breadcrumb-item>
      <el-breadcrumb-item>我管理的项目</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <div>
      <div class="manage">
        <!-- <a style="color: #3b3d45"></a> -->

        <el-input
          placeholder="请输入项目名"
          v-model="search"
          @focus="recoveryTasklist()"
          clearable
          @clear="recoveryTasklist()"
          class="inputt"
        >
        </el-input>

        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button>

        <!-- @click="joinCourseVisible = true" -->
        <el-button
          class="add-course"
          type="primary"
          size="mini"
          @click="addProjectPage()"
          >＋&nbsp;创建项目</el-button
        >
      </div>

      <ul class="class-table">
        <li
          style="margin-right: 23px"

          v-for="(course, index) in courses"
          :key="index"
        >
          <div class="top" style=""
           @click="jumpToCourse(course, index)">
            <div class="course-name" v-if="course">
              {{ course.courseName }}
            </div>
            <div class="course-class">{{ course.courseClass }}</div>
            <div class="add_code">
              <label>项目号：{{ course.courseCode }}</label>
            </div>
            <span class="time">
              {{ course.courseYear }}<br />
              {{ course.courseTerm }}
            </span>
          </div>
          <div class="bottom">
            <ul>
              <el-avatar style="color: #a0a0a0">近期任务</el-avatar>
              <el-avatar 
               @click=" putItTop(course.coursrBeTop,index)"
                style="margin-right: 0px; margin-left: 125px"
                >{{course.coursrBeTop}}</el-avatar
              >

              <ul class="assignment-box" v-if="course.assignmentList == null">
                <div style="display: flex; justify-content: space-between">
                  <!-- v-for="assignment in assignmentList"
                  :key="assignment.aid" -->

                  <div
                    class="assignment-name"
                    style="margin-top: 8px; font-size: 20px"
                  >
                    {{ course.courseRecentTask }}
                  </div>
                </div>
              </ul>
              <div style="margin-top: 8px; font-size: 20px" v-else>
                无近期项目
              </div>
            </ul>
            <div class="foot">
              <el-avatar> 负责人：</el-avatar>
              <el-avatar> {{ course.courseLeader }}</el-avatar>
              <label style="float: left; padding-top: 0px; font-size: 20px">{{
                course.name
              }}</label>
              <label style="font-size: 12px; float: right; margin-top: 0px">
                <!-- <a
                  @click="beTop(course.cid)"
                  style="margin-right: 10px; color: #a0a0a0"
                  >置顶</a
                > -->
                <el-dropdown trigger="click" @command="more">
                  <a style="color: #2c58ab" @click="saveIndex(index)"
                    >更多<i class="el-icon-s-operation"
                  /></a>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item :command="composeValue(course, 1)"
                      ><a>修改项目</a></el-dropdown-item
                    >
                    <el-dropdown-item
                      :command="composeValue(course, 2)"
                     
                      >删除项目</el-dropdown-item
                    >
                  </el-dropdown-menu>
                </el-dropdown>
              </label>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 删除项目提示 -->
    <el-dialog
      :visible.sync="dropCourseVisible"
      style="text-align: left; margin-top: 100px"
      width="50%"
      :before-close="handleClose"
    >
      <div>
        <div
          style="
            padding-left: 26px;
            padding-right: 26px;
            padding-top: 10px;
            line-height: 52px;
            color: #a9a9a9;
            font-size: 18px;
          "
          v-if="this.currentCourse"
        >
          确定要删除“{{ this.currentCourse.courseName }}”吗？
        </div>
        <div style="padding: 5px 26px 10px">
          <p style="line-height: 32px; color: #2d2d2d; font-size: 14px">
            该项目将被永久删除<br />
            <span style="color: red">警告：此操作无法撤消</span>
          </p>
        </div>
      </div>
      <span slot="footer">
        <el-button @click="dropCourseCancle()" style="margin-right: 10px"
          >取 消</el-button
        >
        <el-button type="primary" @click="dropCourse(in_dex)">退 课</el-button>
      </span>
    </el-dialog>

    <!-- 归档提示 -->
    <el-dialog
      :visible.sync="editCourseVisible"
      style="text-align: left; margin-top: -70px"
      width="70%"
      :before-close="handleClose"
    >
      <!-- 内容主体区域-->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <!-- <el-form-item label="项目名称" prop="courseName">
          <el-input v-model="editForm.courseName"></el-input>
        </el-form-item>
        <el-form-item label="项目团队" prop="courseClass">
          <el-input v-model="editForm.courseClass"></el-input>
        </el-form-item>
        <el-form-item label="项目编号" prop="courseCode">
          <el-input v-model="editForm.courseCode"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="courseYear">
          <el-input v-model="editForm.courseYear"></el-input>
        </el-form-item>
        <el-form-item label="结束时间" prop="courseTerm">
          <el-input v-model="editForm.courseTerm"></el-input>
        </el-form-item>
        <el-form-item label="近期任务" prop="courseRecentTask">
          <el-input v-model="editForm.courseRecentTask"></el-input>
        </el-form-item>
        <el-form-item label="项目负责人" prop="courseLeader">
          <el-input v-model="editForm.courseLeader"></el-input>
        </el-form-item>
      </el-form> -->











      <el-form-item label="项目名称" prop="courseName">
              <el-input v-model="editForm.courseName"></el-input>
            </el-form-item>
            <el-form-item label="项目编号" prop="courseCode">
              <el-input v-model="editForm.courseCode"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" prop="courseYear">
              <div class="block">
                <el-date-picker
                  v-model="editForm.courseYear"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd "
                >
                </el-date-picker>
              </div>

              <!-- <el-input v-model="addForm.courseYear"></el-input> -->
            </el-form-item>
            <el-form-item label="结束时间" prop="courseTerm">
              <div class="block">
                <el-date-picker
                  v-model="editForm.courseTerm"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd "
                >
                </el-date-picker>
              </div>

              <!-- <el-input v-model="addForm.courseTerm"></el-input> -->
            </el-form-item>


              <el-form-item label="项目团队" prop="courseClass" >


              <el-select
                v-model="editForm.courseClass"
                
                collapse-tags
                
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>


              <!-- <el-input v-model="addForm.courseClass"></el-input> -->
            </el-form-item>
            <el-form-item label="项目负责人" prop="courseLeader">


              
              <el-select
                v-model="editForm.courseLeader"
             
                collapse-tags
                
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>

              <!-- <el-input v-model="addForm.courseLeader"></el-input> -->
            </el-form-item>
            <el-form-item label="近期任务" prop="courseRecentTask" >
              <el-input v-model="editForm.courseRecentTask" style="width:500px;"></el-input>
            </el-form-item>

      </el-form>





















      <span slot="footer">
        <el-button @click="cancelEdit" style="margin-right: 10px"
          >取 消</el-button
        >
        <el-button type="primary" @click="editUserInfo()"
          >确定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
//import { getClassInfo, joinCourseByCode, getClassAndAssignment, dropClass, updateStudentTop, updateStudentNoTop, getStudentCourseTop, getStudentOtherCourseTop } from '../../api/require'

export default {
  data() {
    return {
      beTop:'置顶',



      in_dex: 0,
      search: '',
      tempList: [],
      // 编辑用户的表单数据

      editForm: {
        courseName: '',
        courseClass: '',
        courseCode: '',
        courseYear: '',
        courseTerm: '',
        courseRecentTask: '',
        courseLeader: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
        courseName: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12个字符',
            trigger: 'blur',
          },
        ],

        courseCode: [
          { required: true, message: '请输入项目编号', trigger: 'blur' },
          {
            min: 6,
            max: 6,
            message: '长度为6个字符',
            trigger: 'blur',
          },
        ],
        courseYear: [
          { required: true, message: '请输入项目开始时间', trigger: 'blur' },
        ],
        courseTerm: [
          { required: true, message: '请输入项目结束时间', trigger: 'blur' },
        ],
      },




       pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            },
          },
          {
            text: '明天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24)

              picker.$emit('pick', date)
            },
          },
          {
            text: '一周后',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            },
          },
        ],
      },
      
       options1: [
         {
          value: '软工1901',
          label: '软工1901'
        }, {
          value: '软工1902',
          label: '软工1902'
        }, {
          value: '软工1903',
          label: '软工1903'
        },
        ],
        options2: [
         {
          value: '张三',
          label: '张三'
        }, {
          value: '李四',
          label: '李四'
        }, {
          value: '王五',
          label: '王五'
        },
        ],


        
  











      sid: '',
      userName: '',
      student: {},
      currentCourse: {},
      courses: [
     
        {
          cid: '0',
          courseName: '社区志愿项目1',
          courseClass: '软工1901',
          courseCode: 'W11111',
          courseYear: '2021-12-10',
          courseTerm: '2021-12-25',
          courseRecentTask: '清理社区1',
          courseLeader: '张吉鑫1',
          coursrBeTop:'置顶',
          projectDescript:'这是社区志愿项目1',
        },
        {
          cid: '1',
          courseName: '社区志愿项目2',
          courseClass: '软工1902',
          courseCode: 'W22222',
          courseYear: '2021-11-10',
          courseTerm: '2021-11-15',
          courseRecentTask: '清理社区2',
          courseLeader: '张吉鑫2',
          coursrBeTop:'置顶',
          projectDescript:'这是社区志愿项目2',
        },
        {
          cid: '2',
          courseName: '社区志愿项目3',
          courseClass: '软工1903',
          courseCode: 'W33333',
          courseYear: '2021-11-29',
          courseTerm: '2021-11-30',
          courseRecentTask: '清理社区3',
          courseLeader: '张吉鑫3',
          coursrBeTop:'置顶',
          projectDescript:'这是社区志愿项目3',
        },
       
      ],
    
     
      archivedCourses: [],
      otherTeachers: [],
      topedTeachers: [],
      archivedTeachers: [],
      havaNoTop: true,
      dropCourseVisible: false,
      archiveVisible: false,
      joinCourseVisible: false,

      editCourseVisible: false,

      // assignmentList: []
    }
  },
  created() {
    // const obj1 =sessionStorage.getItem('courseProject',obj)
    var id = this.$route.query.id;
    // console.log(id);
    // alert(id)
    if(id!=null)
    {
    this.courses.push(id)}
    this.tempList = this.courses

    
  },
  methods: {
    // showEditDialog( userindex) {
       
    //   this.editCourseVisible = true
    //   // console.log(userindex)
    //   this.editForm.courseName= this.courses[1].courseName
    //   this.editForm.courseClass = this.courses[userindex].courseClass
    //   this.editForm.courseCode = this.courses[userindex].courseCode
    //   this.editForm.courseYear = this.courses[userindex].courseYear
    //   this.editForm.courseTerm = this.courses[userindex].courseTerm
    //   this.editForm.courseRecentTask = this.courses[userindex].courseRecentTask
    //   this.editForm.courseLeader = this.courses[userindex].courseLeader
    
    // },



    handleSearch() {
      this.searchList = []
      for (var i = 0; i < this.courses.length; i++) {
        if (this.courses[i].courseName.includes(this.search)) {
          this.searchList.push(this.courses[i])
        }
      }
      // this.tempList = this.courses
      this.courses = this.searchList
    },
    recoveryTasklist() {
      this.courses = this.tempList
    },

    joinCourse() {
      this.$refs.addFormRef.validate((valid) => {
        //console.log(valid)

        //验证
        if (!valid) return
        //console.log(this.addForm.username)
        //进行真正的用户添加
        const obj = {
          courseName: this.addForm.courseName,
          courseClass: this.addForm.courseClass,
          courseCode: this.addForm.courseCode,
          courseYear: this.addForm.courseYear,
          courseTerm: this.addForm.courseTerm,
          courseRecentTask: this.addForm.courseRecentTask,
          courseLeader: this.addForm.courseLeader,
        }
        this.courses.push(obj)
        console.log(this.courses.length)
        //this.total = this.courses.length
        this.joinCourseVisible = false
        this.$message.success('添加项目成功')
      })
    },

   
    // beTop(id) {
    //   this.$confirm('你确定要置顶吗？').then((res) => {
    //     this.$message.success('置顶成功！')
    //   })
    // },
    // cancelTop(id) {
    //   this.$confirm('你确定要取消置顶吗？').then((res) => {
    //     this.$message.success('取消置顶成功！')
    //   })
    // },


    putItTop(x1,x2){
      // alert(x2)
      if(x1=='置顶'){
      this.$confirm('你确定要置顶吗？').then((res) => {
        this.$message.success('置顶成功！')
      })
      this.courses[x2].coursrBeTop='取消'
      }else{
          this.$confirm('你确定要取消置顶吗？').then((res) => {
        this.$message.success('取消置顶成功！')
        this.courses[x2].coursrBeTop='置顶'
      })
      }

    },

    cancelEdit(id) {
      this.editCourseVisible = false

      this.$message.info('已取消')
    },

    saveIndex(index) {
      this.in_dex = index
      console.log(this.in_dex)
    },

    dropCourse(in_dex) {
      console.log('退课课程号', this.in_dex)
      //dropClass(this.sid, id)
      this.dropCourseVisible = false

      this.courses.splice(in_dex, 1)
      // this.total=this.courses.length
      this.$message({
        type: 'success',
        message: '删除成功!',
      })
    },

    dropCourseCancle() {
      this.dropCourseVisible = false
      this.$message({
        type: 'info',
        message: '已取消删除',
      })
    },

    composeValue(course, row) {
      return {
        course: course,
        row: row,
      }
    },
    more(command) {
      console.log(command.row)
      console.log(command.row === 2)
      if (command.row === 2) {
        this.dropCourseVisible = true
        this.currentCourse = command.course
      } else {
        this.editCourseVisible = true


         this.editForm.courseName= this.courses[this.in_dex].courseName
      this.editForm.courseClass = this.courses[this.in_dex].courseClass
      this.editForm.courseCode = this.courses[this.in_dex].courseCode
      this.editForm.courseYear = this.courses[this.in_dex].courseYear
      this.editForm.courseTerm = this.courses[this.in_dex].courseTerm
      this.editForm.courseRecentTask = this.courses[this.in_dex].courseRecentTask
      this.editForm.courseLeader = this.courses[this.in_dex].courseLeader
    
        





        this.currentCourse = command.course
      }
    },
    // operation(command) {
    //   if (command.row === 1) {
    //     this.archiveTipVisible = true
    //     this.currentCourse = command.course
    //   } else {
    //     this.dropCourseVisible = true
    //     this.currentCourse = command.course
    //   }
    // },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 进入ProjectHome
    jumpToCourse(course,index) {
      // console.log(index)
      // console.log(course)
      // alert(index)
      // alert(course)

      this.$router.push({
        path: '/projectHome',
        query: { id: course },
        
      })

     

      
    },

    addProjectPage() {
      this.$router.push('addProject')
    },




     // 监听修改用户对话框的关闭事件，关闭对话框，里面的红字校验结果重置，不会保留
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo() {
     
      this.$refs.editFormRef.validate((valid) => {
        console.log(valid)

        //验证
        if (!valid) return
        console.log(this.editForm.username)
        //进行真正的用户修改
       this.courses[this.in_dex].courseName = this.editForm.courseName
        this.courses[this.in_dex].courseClass = this.editForm.courseClass
        this.courses[this.in_dex].courseCode = this.editForm.courseCode 
        this.courses[this.in_dex].courseYear= this.editForm.courseYear
        this.courses[this.in_dex].courseTerm = this.editForm.courseTerm
        this.courses[this.in_dex].courseRecentTask =this.editForm.courseRecentTask 
          
        this.courses[this.in_dex].courseLeader = this.editForm.courseLeader
       
        this.editCourseVisible= false
        this.$message({
        type: 'success',
        message: '修改成功!',
      })
      })
    },











  },
}
</script>
<style scoped>
* {
  font-size: 14px;
}
a {
  text-decoration: none;
}
#mainBody {
  height: 100%;
  width: 100%;
}
.non-stick,
.stick {
  height: 100%;
  padding: 0 0 0;
}
.manage {
  position: relative;
  box-shadow: 0 1px 0 0 rgba(226, 230, 237, 1);
  line-height: 40px;
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: left;
  clear: left;
}

.inputt {
  width: 200px;
}
.manage a {
  color: #78787a;
}
.manage div {
  float: left;
}

.manage div a {
  margin-left: 20px;
}
.class-table {
  flex-wrap: wrap;
  justify-content: space-between;
}
.class-table li {
  width: 220px;
  list-style: none;
  background: #fff;
  position: relative;
  border: 1px solid #e2e6ed;
  border-radius: 8px;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  float: left;
}
.course-name {
  color: #fff;
  padding: 0px 0;
  font-size: 18px;
  line-height: 10px 0;
  /*float: left;*/
  margin-left: 15px;
}
.course-class {
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  /*color: rgb(74, 144, 255);*/
  color: #fff;
  /*  display: flex;*/
  /*justify-content: left;*/
  line-height: 28px;
  margin-left: 14px;
  margin-top: 10px;
  /*overflow: hidden;*/
}
.top {
  clear: both;
  height: 110px;
  padding-top: 18px;
  padding-bottom: 14px;
  border-radius: 10px;
  /* background: rgb(135, 148, 150); */
  background: url('../../assets/bkg.jpg') no-repeat;
  opacity: 80%;
  background-size: cover;
}
.add_code {
  width: 128px;
  height: 22px;
  background: rgba(31, 43, 150, 0.2);
  border-radius: 2px;
  font-size: 12px;
  font-family: PingFang-SC-Medium;
  font-weight: 500;
  /*color: rgb(57, 31, 255);*/
  color: #fff;
  float: left;
  line-height: 22px;
  text-align: center;
  margin-left: 10px;
  padding-left: 2px;
  padding-right: 4px;
  margin-top: 20px;
}
.add_code label {
  float: left;
  cursor: pointer;
}
.time {
  float: right;
  text-align: left;
  font-size: 2px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  /*color: rgb(105, 132, 46);*/
  color: #fff;
  padding-right: 4px;
  height: 30px;
  margin-top: 10px;
}
.bottom {
  background: #fff;
  clear: both;
  height: 80px;
  border-radius: 0 0 8px 8px;
}
.bottom ul {
  margin-top: 0px;
  padding: 0;
  height: 0px;
}
.bottom ul .assignment-box {
  width: 100%;
  margin-left: 12px;
  border: none;

  /*display: flex;*/

  /*justify-content: space-between;*/
}
.bottom .foot {
  position: absolute;
  bottom: 5px;
  left: 8px;
  right: 10px;
}

.add-course {
  width: 100px;
  height: 36px;
  float: right;
  background-color: #32baf0;
}
.add-course p {
  font-size: 14px;
  color: rgba(255, 255, 255, 1);
  line-height: 18px;
  margin-left: -5px;
}
</style>