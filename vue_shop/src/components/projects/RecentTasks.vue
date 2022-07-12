<template>
  <div>



    <!--  面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">我的项目</el-breadcrumb-item>
      <el-breadcrumb-item>近期任务</el-breadcrumb-item>
      <!-- <el-breadcrumb-item>活动列表</el-breadcrumb-item>
      <el-breadcrumb-item>活动详情</el-breadcrumb-item> -->
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->





      <el-row gutter="30"  style="margin-bottom:20px">
        <el-col span="8">
            
          <el-date-picker
         @change="recoveryUserlist()" clearable
           
              v-model="serchTime1"
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
        </el-col>
        <el-col span="5">
         <el-button
            type="primary"
              
              icon="el-icon-search"
              @click="timeSearch"
              
            ></el-button>
        </el-col>
      </el-row>















      <el-row gutter="20">
        <el-col span="7">
            
          <el-input
            placeholder="请输入项目名"
            v-model="queryInfo.query"
            @focus="recoveryUserlist()"
            clearable
            @clear="recoveryUserlist()"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="handleSearch"
            ></el-button>
          </el-input>
        </el-col>
        <el-col span="4">
          <el-button type="primary" @click="addDialogVisible = true">
            添加任务
          </el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table
        :data="
          taskList.slice(
            (queryInfo.pagenum - 1) * queryInfo.pagesize,
            queryInfo.pagenum * queryInfo.pagesize
          )
        "
        border
        stripe
      >
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="任务名称" prop="task_Name"> </el-table-column>
        <el-table-column label="任务编号" prop="task_Num"> </el-table-column>
        <el-table-column
          label="开始时间"
          prop="task_StartTime"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="结束时间"
          prop="task_EndTime"
          width="100px"
        ></el-table-column>
        <el-table-column label="参与人员" prop="task_Member">
          <!-- <template slot-scope="scope">
            <div @click="Participants(scope.row.task_Description)">
              {{ scope.row.task_Member}}
            </div>
          </template> -->
        </el-table-column>
        <!-- <el-table-column label="任务重要度" prop="task_Importance">
          <template slot-scope="scope">
          <el-tag>{{ scope.row.task_Importance}}</el-tag>

          <el-tag type="warning">{{ scope.row.task_Importance}}</el-tag>
          <el-tag type="danger">{{ scope.row.task_Importance}}</el-tag>
           </template> 

        
        </el-table-column> -->

        <el-table-column
          label="任务重要度"
          prop="task_Importance"
          width="95px"
          :filters="[
            { text: '一般', value: 0 },
            { text: '重要', value: 1 },
            { text: '紧迫', value: 2 },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template slot-scope="scope">
            <el-tag
              :type="getBindText(scope.row.task_Importance) | getBindStatus"
              close-transition
              >{{ scope.row.task_Importance }}</el-tag
            >
          </template>
        </el-table-column>

        <el-table-column label="任务完成度" prop="task_Finish" width="100px">
          <template slot="header" @click="Participants">
            <el-dropdown>
              <span class="task_Finish_Dropdown">
                任务完成度<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu  
              slot="dropdown" >
                <el-dropdown-item @click.native="selectFinishStart" style="font-size:10px">未开始</el-dropdown-item>
                <el-dropdown-item @click.native="selectFinishProcess" style="font-size:10px">进行中</el-dropdown-item>
                <el-dropdown-item @click.native="selectFinishEnd" style="font-size:10px">已完成</el-dropdown-item>
                <el-dropdown-item @click.native="recoveryUserlist" style="font-size:10px" divided>重置</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          

            <!-- <span @click="Participants">任务完成度</span> -->
          </template>

          <template slot-scope="scope">
            <el-progress
              :status="getBindText1(scope.row.task_Finish) | getBindStatus1"
              type="circle"
              :percentage="scope.row.task_Finish"
              stroke-width="3"
              :width="40"
              style="margin-left: 10px; margin-top: 12px"
            >
            </el-progress>
          </template>
        </el-table-column>

        <el-table-column label="任务说明" prop="task_Description">
          <template slot-scope="scope">
            <div
             @click="taskDescip(scope.row.task_Description,scope.$index)"
             >
              {{ scope.row.task_Description }}
            </div>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="228px">
           <template slot="header">
              <span class="task_Finish_Dropdown1">
                操作
                  </span>
             
            </template>

          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              @click="showEditDialog(scope.$index)"
              type="primary"
              icon="el-icon-edit"
              size="mini"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              @click="deleteUser(scope.$index)"
              type="danger"
              icon="el-icon-delete"
              size="mini"
            ></el-button>
            <!-- 用户管理 -->
            <el-tooltip
              effect="dark"
              content="用户管理"
              placement="top"
              :enterable="false"
            >

             
              <el-button
              @click="ManageUser(scope.row,scope.$index)"
                type="info"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>

            <!-- 完成按钮 -->
            <el-tooltip
              effect="dark"
              content="项目完成结束"
              placement="top"
              :enterable="false"
            >
              <el-button @click="taskFinished(scope.$index)"
                type="success"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 添加用户区域 -->
    <el-dialog
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="70%"
      @close="addDialogClosed"
      style="margin-top: -90px"
    >
      <!-- 内容主体区域-->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="100px"
      >
        <el-form-item label="任务名称" prop="task_Name" style="width: 320px">
          <el-input v-model="addForm.task_Name"></el-input>
        </el-form-item>
        <el-form-item label="任务编号" prop="task_Num" style="width: 320px">
          <el-input v-model="addForm.task_Num"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="task_StartTime">
          <div class="block">
            <el-date-picker
              v-model="addForm.task_StartTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd "
            >
            </el-date-picker>
          </div>
          <!-- <el-input v-model="addForm.task_StartTime"></el-input> -->
        </el-form-item>
        <el-form-item label="结束时间" prop="task_EndTime">
          <div class="block">
            <el-date-picker
              v-model="addForm.task_EndTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd "
            >
            </el-date-picker>
          </div>
          <!-- <el-input v-model="addForm.task_EndTime"></el-input> -->
        </el-form-item>
        <el-form-item label="参与人员" prop="task_Member">
          <el-select
            v-model="addForm.task_Member"
            multiple
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

          <!-- <el-input v-model="addForm.task_Member"></el-input> -->
        </el-form-item>
        <el-form-item label="任务重要度" prop="task_Importance">
          <el-select
            v-model="addForm.task_Importance"
            clearable
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

          <!-- <el-input v-model="addForm.task_Importance"></el-input> -->
        </el-form-item>
        <el-form-item label="任务完成度" prop="task_Finish">
          <el-slider v-model="addForm.task_Finish" show-input> </el-slider>

          <!-- <el-input v-model="addForm.task_Finish"></el-input> -->
        </el-form-item>

        <el-form-item label="任务说明" prop="task_Description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            placeholder="项目说明"
            v-model="addForm.task_Description"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer;">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
      title="添加用户"
      :visible.sync="editDialogVisible"
      width="70%"
      @close="editDialogClosed"
      style="margin-top: -90px"
    >
      <!-- 内容主体区域-->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="100px"
      >
        <el-form-item label="任务名称" prop="task_Name" style="width: 320px">
          <el-input v-model="editForm.task_Name"></el-input>
        </el-form-item>
        <el-form-item label="任务编号" prop="task_Num" style="width: 320px">
          <el-input v-model="editForm.task_Num"></el-input>
        </el-form-item>
        <el-form-item label="开始时间" prop="task_StartTime">
          <div class="block">
            <el-date-picker
              v-model="editForm.task_StartTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd "
            >
            </el-date-picker>
          </div>
          <!-- <el-input v-model="addForm.task_StartTime"></el-input> -->
        </el-form-item>
        <el-form-item label="结束时间" prop="task_EndTime">
          <div class="block">
            <el-date-picker
              v-model="editForm.task_EndTime"
              align="right"
              type="date"
              placeholder="选择日期"
              :picker-options="pickerOptions"
              value-format="yyyy-MM-dd "
            >
            </el-date-picker>
          </div>
          <!-- <el-input v-model="addForm.task_EndTime"></el-input> -->
        </el-form-item>
        <el-form-item label="参与人员" prop="task_Member">
          <el-select
            v-model="editForm.task_Member"
            multiple
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

          <!-- <el-input v-model="addForm.task_Member"></el-input> -->
        </el-form-item>
        <el-form-item label="任务重要度" prop="task_Importance">
          <el-select
            v-model="editForm.task_Importance"
            clearable
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

          <!-- <el-input v-model="addForm.task_Importance"></el-input> -->
        </el-form-item>
        <el-form-item label="任务完成度" prop="task_Finish">
          <el-slider v-model="editForm.task_Finish" show-input> </el-slider>

          <!-- <el-input v-model="addForm.task_Finish"></el-input> -->
        </el-form-item>

        <el-form-item label="任务说明" prop="task_Description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 5, maxRows: 5 }"
            placeholder="项目说明"
            v-model="editForm.task_Description"
          >
          </el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserInfo(user_index)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  data() {
    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 5,
      },
      taskList: [
        {
          task_Name: '社区服务1',
          task_Num: 'ZDF8XX',
          task_StartTime: '2020-12-31',
          task_EndTime: '2020-12-31',
          task_Member: 'zjx1',
          task_Importance: '一般',
          task_Finish: 0,
          task_Description: '666',
        },
        {
          task_Name: '社区服务2',
          task_Num: 'ZDF8XX',
          task_StartTime: '2020-12-31',
          task_EndTime: '',
          task_Member: 'zjx2',
          task_Importance: '紧迫',
          task_Finish: 10,
          task_Description: '888',
        },

        {
          task_Name: '社区服务3',
          task_Num: 'ZDF8XX',
          task_StartTime: '2020-12-31',
          task_EndTime: '',
          task_Member: 'zjx2',
          task_Importance: '紧迫',
          task_Finish: '100',
          task_Description: '888',
        },
      ],
      total: 'taskList.length',
      // total: 0,
      searchList: [], //用于存储搜索结果的数组
      tempList: [], //用于存储userList,以便在搜索完成后，视图恢复为搜索前，userList也恢复到搜索之前

      //控制添加用户对话框的显示与隐藏
      addDialogVisible: false,

      // 添加用户的表单数据
      addForm: {
        task_Name: '',
        task_Num: '',
        task_StartTime: '',
        task_EndTime: '',
        task_Member: '',
        task_Importance: '',
        task_Finish: '',
        task_Description: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
        task_Name: [
          { required: true, message: '请输入项目名称', trigger: 'blur' },
          {
            min: 3,
            max: 12,
            message: '长度在 3 到 12个字符',
            trigger: 'blur',
          },
        ],

        task_Num: [
          { required: true, message: '请输入项目编号', trigger: 'blur' },
          {
            min: 6,
            max: 6,
            message: '长度为6个字符',
            trigger: 'blur',
          },
        ],
        task_StartTime: [
          { required: true, message: '请输入项目开始时间', trigger: 'blur' },
        ],
        task_EndTime: [
          { required: true, message: '请输入项目结束时间', trigger: 'blur' },
        ],
      },

      // 控制修改用户对话框的显示与隐藏
      editDialogVisible: false,

      // 查询到的用户信息对象
      editForm: {
        task_Name: '',
        task_Num: '',
        task_StartTime: '',
        task_EndTime: '',
        task_Member: '',
        task_Importance: '',
        task_Finish: '',
        task_Description: '',
      },

      //操作的行数（修改，删除）
      user_index: 0,

      // pickerOptions: {
      //   disabledDate(time) {
      //     return time.getTime() < Date.now() - 3600 * 1000 * 24
      //   },
      //   shortcuts: [
      //     {
      //       text: '今天',
      //       onClick(picker) {
      //         picker.$emit('pick', new Date())
      //       },
      //     },
      //     {
      //       text: '明天',
      //       onClick(picker) {
      //         const date = new Date()
      //         date.setTime(date.getTime() + 3600 * 1000 * 24)

      //         picker.$emit('pick', date)
      //       },
      //     },
      //     {
      //       text: '一周后',
      //       onClick(picker) {
      //         const date = new Date()
      //         date.setTime(date.getTime() + 3600 * 1000 * 24 * 7)
      //         picker.$emit('pick', date)
      //       },
      //     },
      //   ],
      // },

      options1: [
        {
          value: '张三\n',
          label: '张三',
        },
        {
          value: '李四\n',
          label: '李四',
        },
        {
          value: '王五\n',
          label: '王五',
        },
      ],
      options2: [
        {
          value: '一般',
          label: '一般',
        },
        {
          value: '重要',
          label: '重要',
        },
        {
          value: '紧迫',
          label: '紧迫',
        },
      ],

      important1: 0,
      important2: 0,



      serchTime1:'',
     serchTime2:'',

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










    }
  },

  created() {
    // this.getUserList()
    this.total = this.taskList.length
    this.tempList = this.taskList
    // console.log(this.total)
  },

  methods: {
    //   async getUserList() {
    //     const { data: res } = await this.$http.get('users', {
    //       params: this.queryInfo,
    //     })
    //     console.log(res)
    //   },

    // 监听 pagesize 改变的事件
    handleSizeChange(newSize) {
      //console.log(newSize)
      this.queryInfo.pagesize = newSize
    },
    // 监听 页码值 改变的事件
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      //console.log(newPage)
    },
    // 监听 switch 开关状态的改变
    // userStateChanged(userinfo, userindex) {
    //   console.log(userindex)
    //   this.userList[userindex].mg_state = userinfo.mg_state
    //   console.log(this.userList[userindex].mg_state)
    //   this.$message.success('更新用户状态成功')
    // },
    handleSearch() {
      this.searchList = []
      for (var i = 0; i < this.taskList.length; i++) {
        if (this.taskList[i].task_Name.includes(this.queryInfo.query)) {
          this.searchList.push(this.taskList[i])
        }
      }
      this.tempList = this.taskList
      this.taskList = this.searchList
    },
    recoveryUserlist() {
      this.taskList = this.tempList
      this.total=this.tempList.length
    },
    // 监听添加用户对话框的关闭事件，关闭对话框，里面的红字校验结果重置，不会保留
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 点击按钮，添加新用户
    addUser() {
      this.$refs.addFormRef.validate((valid) => {
        //console.log(valid)

        //验证
        if (!valid) return
        //console.log(this.addForm.username)
        //进行真正的用户添加
        const obj = {
          task_Name: this.addForm.task_Name,
          task_Num: this.addForm.task_Num,
          task_StartTime: this.addForm.task_StartTime,
          task_EndTime: this.addForm.task_EndTime,
          task_Member: this.addForm.task_Member,
          task_Importance: this.addForm.task_Importance,
          task_Member: this.addForm.task_Member,
          task_Finish: this.addForm.task_Finish,
          task_Description: this.addForm.task_Description,
        }
        this.taskList.push(obj)
        console.log(this.taskList.length)
        this.total = this.taskList.length
        this.addDialogVisible = false
        this.$message.success('添加任务成功')
      })
    },

    showEditDialog(userindex) {
      this.user_index = userindex
      this.editDialogVisible = true
      // console.log(userindex)
      this.editForm.task_Name = this.taskList[userindex].task_Name
      this.editForm.task_Num = this.taskList[userindex].task_Num
      this.editForm.task_StartTime = this.taskList[userindex].task_StartTime
      this.editForm.task_EndTime = this.taskList[userindex].task_EndTime
      this.editForm.task_Member = this.taskList[userindex].task_Member
      this.editForm.task_Importance = this.taskList[userindex].task_Importance
      this.editForm.task_Finish = this.taskList[userindex].task_Finish
      this.editForm.task_Description = this.taskList[userindex].task_Description
    },

    // 监听修改用户对话框的关闭事件，关闭对话框，里面的红字校验结果重置，不会保留
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    editUserInfo(user_index) {
      console.log(user_index)
      this.$refs.editFormRef.validate((valid) => {
        console.log(valid)

        //验证
        if (!valid) return
        console.log(this.editForm.username)
        //进行真正的用户修改
        this.taskList[user_index].task_Name = this.editForm.task_Name
        this.taskList[user_index].task_Num = this.editForm.task_Num
        this.taskList[user_index].task_StartTime = this.editForm.task_StartTime
        this.taskList[user_index].task_EndTime = this.editForm.task_EndTime
        this.taskList[user_index].task_Member = this.editForm.task_Member
        this.taskList[user_index].task_Importance =
          this.editForm.task_Importance
        this.taskList[user_index].task_Finish = this.editForm.task_Finish
       this.taskList[user_index].task_Description = this.editForm.task_Description
       
        this.editDialogVisible = false
      })
    },

    deleteUser(userindex) {
      //this.user_index=userindex
      //弹框询问用户是否删除数据
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          this.taskList.splice(userindex, 1)
          this.total = this.taskList.length
          this.$message({
            type: 'success',
            message: '删除成功!',
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除',
          })
        })
    },

    //颜色名称
    getBindText(task_Importance) {
      if (task_Importance == '一般') {
        return '0'
      }
      if (task_Importance == '重要') {
        return '1'
      }
      if (task_Importance == '紧迫') {
        return '2'
      }
    },

    getBindText1(task_Finish) {
      if (task_Finish == 100) {
        return '1'
      }

      return '0'
    },

    // filterTag(value, row, column) {
    //   const property = column['property']
    //   consol.log(value)
    //   return row[property] === value
    // },

    filterTag(value, row) {
      var x = 0,
        y = 0,
        z = 0

      if (row.task_Importance === '一般') {
        row.tag = 0
      }
      if (row.task_Importance === '重要') {
        row.tag = 1
      }
      if (row.task_Importance === '紧迫') {
        row.tag = 2
      }

      if (row.tag === value) {
        this.important1 = this.important1 + 1
      }

      //  this.important2=this.important2+1

      //alert("this.important:" + this.important1+"--"+(this.important2)+ "--"+this.total)

      // if((this.important2)===9){

      //   this.total=this.important1;
      //   return false
      // }

      // alert(this.important)
      // alert("this.important:" + this.important1+this.important2)
      //  this.total=this.important
      // console.log("this.total:" + this.total)

      return row.tag === value
    },


    selectFinishStart(){
     
      this.searchList = []
      for(var i=0;i<this.taskList.length;i++){
        if(this.taskList[i].task_Finish==0){
          this.searchList.push(this.taskList[i])
        }
      }

      this.tempList = this.taskList
      this.taskList = this.searchList
      this.total=this.searchList.length

    },

    selectFinishProcess(){
      this.searchList = []
      for(var i=0;i<this.taskList.length;i++){
        if(this.taskList[i].task_Finish>0&&this.taskList[i].task_Finish<100){
          this.searchList.push(this.taskList[i])
        }
      }

      this.tempList = this.taskList
      this.taskList = this.searchList
      this.total=this.searchList.length


    },
    selectFinishEnd(){

       this.searchList = []
      for(var i=0;i<this.taskList.length;i++){
        if(this.taskList[i].task_Finish==100){
          this.searchList.push(this.taskList[i])
        }
      }

      this.tempList = this.taskList
      this.taskList = this.searchList
      this.total=this.searchList.length


    },


    taskFinished(userindex){
      this.taskList[userindex].task_Finish=100
    },


    ManageUser(x1,x2) {
      // alert(x1+"--"+x2)
      this.$router.push('taskUserList'+x2)

    },

      taskDescip(x1,x2){
        // alert(x1+"--"+x2)

     },

     timeSearch(){
        //  alert(this.serchTime1[0])
        //  alert(this.serchTime1[1])
         if(this.serchTime1[0]==null||this.serchTime1[1]==null){
             return
         }

          let workStartTimeRe = new Date(
                this.serchTime1[0]
              ).getTime()/1000;
              let workEndTimeRe = new Date(
                this.serchTime1[1]
              ).getTime()/1000;


          this.searchList = []


      for(var i=0;i<this.taskList.length;i++){
            let workStartTime = new Date(
                this.taskList[i].task_StartTime
                //  "1970/01/01 " + this.taskList[i].task_StartTime + ":00"
              ).getTime()/1000;

               let workEndTime = new Date(
                 this.taskList[i].task_EndTime
                //  "1970/01/01 " + this.taskList[i].task_EndTime + ":00"
              ).getTime()/1000;
             
        //  alert(workStartTime)
         
        //  alert(workEndTime)
        if(workStartTimeRe <=workStartTime&&workEndTime<=workEndTimeRe ){
          this.searchList.push(this.taskList[i])
        }
      }

      this.tempList = this.taskList
      this.taskList = this.searchList
      this.total=this.searchList.length

       


         
     }

     




  },

  filters: {
    //tag类型
    getBindStatus(task_Importance) {
      const bindColor = {
        0: '',
        1: 'success',
        2: 'danger',
      }
      return bindColor[task_Importance]
    },

    getBindStatus1(task_Finish) {
      const bindColor = {
        0: '',
        1: 'success',
      }
      return bindColor[task_Finish]
    },

    // //颜色名称
    // getBindText(task_Importance) {
    //   if (task_Importance == '一般') {
    //     return '0'
    //   }
    //   if (task_Importance == '重要') {
    //     return '1'
    //   }
    //   if (task_Importance == '紧迫') {
    //     return '2'
    //   }
    // },
  },
}
</script>

<style lang="less" scoped>
.el-table {
  margin-top: 15px;
  font-size: 12px;
}

.el-pagination {
  margin-top: 15px;
}

.task_Finish_Dropdown{
  font-size: 12px;
  color: #909399;
 
}

.task_Finish_Dropdown1{
  margin-left: 90px;
 
}


</style>