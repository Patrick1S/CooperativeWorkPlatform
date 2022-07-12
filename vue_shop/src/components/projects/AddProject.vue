<template>
  <div class="course">
    <!-- 卡片视图 -->
    <el-card>
      <!-- 提示区域 -->
      <el-alert title="项目创建" type="info" center show-icon :closable="false">
      </el-alert>
      <!-- 步骤条区域 -->
      <div class="stepOne">
        <el-steps
          :space="300"
          :active="activeIndex - 0"
          finish-status="success"
          align-center
        >
          <el-step title="基本信息"></el-step>
          <el-step title="项目人员"></el-step>
          <el-step title="项目说明"></el-step>
          <el-step title="项目背景图"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>

      <!-- 创建项目 -->
      <!-- <el-dialog
      :visible.sync="joinCourseVisible"
      style="text-align: left; margin-top: 0px"
      width="70%"
      :before-close="handleClose"
    > -->
      <!-- 内容主体区域-->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
        label-position="top"
      >
        <el-tabs
          v-model="activeIndex"
          :tab-position="'left'"
          style="height: 100%"
          :before-leave="beforeTabLeave"
        >
          <el-tab-pane label="基本信息" name="1">
            <el-form-item label="项目名称" prop="courseName">
              <el-input v-model="addForm.courseName"></el-input>
            </el-form-item>
            <el-form-item label="项目编号" prop="courseCode">
              <el-input v-model="addForm.courseCode"></el-input>
            </el-form-item>
            <!-- <el-form-item label="开始时间" prop="courseYear">
              
              
              <div class="block">
                <el-date-picker
                  v-model="addForm.courseYear"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd "
                >
                </el-date-picker>
              </div>

              <el-input v-model="addForm.courseYear"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="结束时间" prop="courseTerm">
              <div class="block">
                <el-date-picker
                  v-model="addForm.courseTerm"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                  value-format="yyyy-MM-dd "
                >
                </el-date-picker>
              </div>

              <el-input v-model="addForm.courseTerm"></el-input>
            </el-form-item> -->
            <el-form-item label="起止日期" prop="coursePeriod">
              <el-date-picker
                @change="recoveryUserlist()"
                clearable
                v-model="addForm.coursePeriod"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                value-format="yyyy-MM-dd "
              >
              </el-date-picker>
              <!-- <el-input v-model="addForm.courseYear"></el-input> -->
            </el-form-item>

            <!-- </el-form>
      <span slot="footer">
        <el-button @click="joinCourseVisible = false" style="margin-right: 50px"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="joinCourse()"
          style="margin-right: 60px"
          >添加</el-button
        >
      </span>
    </el-dialog>


 -->
          </el-tab-pane>
          <el-tab-pane label="项目人员" name="2">
            <el-form-item label="项目团队" prop="courseClass">
              <el-select
                v-model="addForm.courseClass"
                collapse-tags
                style="margin-left: 20px"
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
            <el-form-item label="项目负责人" >
              <!-- <el-select
                v-model="addForm.courseLeader"
                collapse-tags
                style="margin-left: 20px"
                placeholder="请选择"
              >
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select> -->

              <el-input v-model="addForm.courseLeader" disabled
               style="width: 220px; margin-left: 19px"></el-input>
            </el-form-item>
            <el-form-item label="近期任务" prop="courseRecentTask">
              <el-input
                v-model="addForm.courseRecentTask"
                style="width: 500px; margin-left: 19px"
              ></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="项目说明" name="3" style="height: 100%">
            <el-form-item label="项目说明" prop="projectDescript">
              <el-input
                type="textarea"
                :autosize="{ minRows: 15, maxRows: 15 }"
                placeholder="项目说明"
                v-model="addForm.projectDescript"
              >
              </el-input>
            </el-form-item>
          </el-tab-pane>

          <!-- border:1px solid -->
          <el-tab-pane label="项目背景图" name="4" style="height: 350px">
            <el-upload
              class="upload-demo"
              action="''"
              :http-request="upload"
              :before-upload="beforeAvatarUpload"
              :limit="1"
              :on-exceed="onExceed"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              :file-list="fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
        </el-tabs>
        <div style="margin-top: 20px">
          <el-button @click="cancleJoinCourse()" style="margin-left: 600px"
            >取 消</el-button
          >
          <el-button
            class="btt"
            type="primary"
            @click="joinCourse()"
            style="margin-left: 30px"
            >添加</el-button
          >
        </div>
      </el-form>
    </el-card>
  </div>
</template>



<script>
export default {
  data() {
    //接收当前时间
    const currentDate = this.getDate({
      format: true,
    })

    return {
      result: currentDate,
      input: '',
      fileList: [],

      activeIndex: '1',

      addForm: {
        coursePeriod:'',
        courseName: '',
        courseClass: '',
        courseCode: '',
        courseYear: '',
        courseTerm: '',
        courseRecentTask: '',
        courseLeader: "张吉鑫",
        projectDescript: '',
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

        coursePeriod: [
          { required: true, message: '请输入项目时期', trigger: 'blur' },
        ],
        // courseYear: [
        //   { required: true, message: '请输入项目开始时间', trigger: 'blur' },
        // ],
        // courseTerm: [
        //   { required: true, message: '请输入项目结束时间', trigger: 'blur' },
        // ],
        courseClass: [
          { required: true, message: '请指定项目团队', trigger: 'blur' },
        ],
        courseLeader: [
          { required: true, message: '请指定项目负责人', trigger: 'blur' },
        ],
        projectDescript: [
          { required: true, message: '请输入项目说明', trigger: 'blur' },
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
      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now() - 3600 * 1000 * 24
      //   },
        // shortcuts: [
        //   {
        //     text: '今天',
        //     onClick(picker) {
        //       picker.$emit('pick', new Date())
        //     },
        //   },
        //   {
        //     text: '明天',
        //     onClick(picker) {
        //       const date = new Date()
        //       date.setTime(date.getTime() + 3600 * 1000 * 24)

        //       picker.$emit('pick', date)
        //     },
        //   },
        //   {
        //     text: '一周后',
        //     onClick(picker) {
        //       const date = new Date()
        //       date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
        //       picker.$emit('pick', date)
        //     },
        //   },
        // ],
      // },

      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 3600 * 1000 * 24
        },
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },


      options1: [
        {
          value: '软工1901',
          label: '软工1901',
        },
        {
          value: '软工1902',
          label: '软工1902',
        },
        {
          value: '软工1903',
          label: '软工1903',
        },
      ],
      // options2: [
      //   {
      //     value: '张三',
      //     label: '张三',
      //   },
      //   {
      //     value: '李四',
      //     label: '李四',
      //   },
      //   {
      //     value: '王五',
      //     label: '王五',
      //   },
      // ],
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    addProjectPage() {
      this.$router.push('test4')
    },

    onExceed(file, fileList) {
      this.$message({
        type: 'warning',
        message: '最多上传1张',
      })
    },

    // 图片上传前验证
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isLt2M
    },
    // 上传图片到OSS 同时派发一个事件给父组件监听
    upload(item) {},

    beforeTabLeave(activeName, oldActiveName) {
      console.log(oldActiveName)
      console.log(activeName)
      if (
        oldActiveName === '1' &&
        (this.addForm.courseName.length < 3 ||
          this.addForm.courseName.length > 12 ||
          this.addForm.courseCode.length != 6 
          ||this.addForm.coursePeriod == '' 
          //||this.addForm.courseYear == '' ||
          //this.addForm.courseTerm == ''
          )
      ) {
        return false
      }

      if (
        oldActiveName === '1' &&
        this.addForm.courseYear > this.addForm.courseTerm
      ) {
        this.$message.error('请输入正确的时间范围')
        return false
      }

      if (
        oldActiveName === '2' &&
        (this.addForm.courseClass == ''
        // || this.addForm.courseLeader == ''
         )
      ) {
        return false
      }

      if (oldActiveName === '3' && this.addForm.projectDescript == '') {
        return false
      }

      return true
    },

    joinCourse() {
      
        
      this.addForm.courseYear=this.addForm.coursePeriod[0];
      this.addForm.courseTerm=this.addForm.coursePeriod[1];
     
      this.$refs.addFormRef.validate((valid) => {
        //console.log(valid)

        //验证
        if (!valid || this.activeIndex != '4') {
          this.$message.error('添加项目失败')
          return
        }

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
          projectDescript: this.addForm.projectDescript,
        }
        // this.courses.push(obj)
        // console.log(this.courses.length)
        //this.total = this.courses.length
        // sessionStorage.setItem('courseProject',obj)

        //console.log(obj)
        this.joinCourseVisible = false
        this.activeIndex = '5'

        this.$router.push({
          //添加需要传值到那个页面的路径
          path: '/manageProjects',
          //携带需要传递的参数
          query: { id: obj },
        })

        this.$message.success('添加项目成功')
      })
    },
    // 获取当前时间
    getDate() {
      const date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = month < 10 ? '0' + month : month //月小于10，加0
      day = day < 10 ? '0' + day : day //day小于10，加0
      return `${year}-${month}-${day}`
    },

    cancleJoinCourse() {
      this.$router.push('/manageProjects')
    },
  },
}
</script>


<style lang="less" scoped>
.stepOne {
  padding-top: 30px;

  .el-step__head.is-success {
    color: cornflowerblue;
    border-color: cornflowerblue;
  }

  /deep/.el-step {
    position: relative;
    .el-step__head.is-process {
      color: #c0c4cc;
      border-color: #c0c4cc;
    }
    .el-step__title.is-process {
      color: #c0c4cc;
      font-weight: unset;
    }

    .el-step__title {
      font-size: 12px;
    }

    .el-step__title.is-success {
      color: cornflowerblue;
    }

    .el-step__head.is-success {
      color: cornflowerblue;
      border-color: cornflowerblue;
    }
  }
}
</style>