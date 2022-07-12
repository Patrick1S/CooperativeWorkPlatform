<template>
  <div>
   
    <!-- 卡片视图区域 -->
    <el-card class="box-card">
      <!-- 搜索与添加区域 -->
      <el-row gutter="20">
        <el-col span="7">
          <el-input
            placeholder="请输入内容"
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
            添加用户
          </el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区 -->
      <el-table
        :data="
          userList.slice(
            (queryInfo.pagenum - 1) * queryInfo.pagesize,
            queryInfo.pagenum * queryInfo.pagesize
          )
        "
        border
        stripe
      >
        <el-table-column type="index"> </el-table-column>
        <el-table-column label="姓名" prop="name"> </el-table-column>
        <el-table-column label="电话" prop="mobile"> </el-table-column>
        <el-table-column label="邮箱" prop="email" width="150px">
        </el-table-column>
        <el-table-column label="角色" prop="role_name" width="100px">
          <template slot="header" @click="Participants">
            <el-dropdown>
              <span class="task_Finish_Dropdown">
                角色<i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  @click.native="selectManager"
                  style="font-size: 10px"
                  >管理员</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="selectPartner"
                  style="font-size: 10px"
                  >参与者</el-dropdown-item
                >
                <el-dropdown-item
                  @click.native="recoveryUserlist"
                  style="font-size: 10px"
                  divided
                  >重置</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>

            <!-- <span @click="Participants">任务完成度</span> -->
          </template>
          <template slot-scope="scope">
            <el-tag
              :type="getBindText(scope.row.role_name) | getBindStatus"
              close-transition
              >{{ scope.row.role_name }}</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="加入时间" prop="date"> </el-table-column>

        <el-table-column label="状态" prop="mg_state" width="100px">
          <template slot-scope="scope">
            <el-tag
              :type="getBindText1(scope.row.mg_state) | getBindStatus1"
              close-transition
              >{{ scope.row.mg_state }}</el-tag
            >
          </template>
        </el-table-column>

        <!-- <template slot-scope="scope">
           // @change="userStateChanged(scope.row)"
            <el-switch
              v-model="scope.row.mg_state"
              @change="userStateChanged(scope.row, scope.$index)"
              active-color="#0088f4"
            >
            </el-switch>
          </template> -->

        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <!-- 修改按钮 -->
            <el-button
              @click="showEditDialog(scope.$index)"
              type="primary"
              icon="el-icon-edit"
              size="small"
            ></el-button>
            <!-- 删除按钮 -->
            <el-button
              @click="deleteUser(scope.$index)"
              type="danger"
              icon="el-icon-delete"
              size="small"
            ></el-button>
            <!-- 分配角色按钮 -->
            <!-- <el-tooltip
              effect="dark"
              content="分配角色"
              placement="top"
              :enterable="false"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
              ></el-button>
            </el-tooltip> -->
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

    <el-dialog
      style="margin-top: -65px"
      title="添加用户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区域-->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_name">
          <el-select v-model="addForm.role_name" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <!-- <el-input v-model="addForm.role_name"></el-input> -->
        </el-form-item>
        <el-form-item label="加入时间" prop="date">
          <el-date-picker
            v-model="addForm.date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd "
          >
          </el-date-picker>
          <!-- <el-input v-model="addForm.date"></el-input> -->
        </el-form-item>
        <el-form-item label="状态" prop="mg_state">
          <el-switch
            active-value="在线"
            inactive-value="离线"
            v-model="addForm.mg_state"
            active-color="#0088f4"
          >
          </el-switch>
          <!-- <el-input v-model="addForm.mg_state"></el-input> -->
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户对话框 -->
    <el-dialog
      style="margin-top: -65px"
      title="修改用户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <!-- 内容主体区域-->
      <el-form
        :model="editForm"
        :rules="addFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="姓名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>

        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_name">
          <el-select v-model="editForm.role_name" placeholder="请选择">
            <el-option
              v-for="item in options1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>

          <!-- <el-input v-model="editForm.role_name"></el-input> -->
        </el-form-item>
        <el-form-item label="加入时间" prop="date">
          <el-date-picker
            v-model="editForm.date"
            align="right"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions"
            value-format="yyyy-MM-dd "
          >
          </el-date-picker>
          <!-- <el-input v-model="editForm.date"></el-input> -->
        </el-form-item>
        <el-form-item label="状态" prop="mg_state">
          <el-switch
            active-value="在线"
            inactive-value="离线"
            v-model="editForm.mg_state"
            active-color="#0088f4"
          >
          </el-switch>
          <!-- <el-input v-model="editForm.mg_state"></el-input> -->
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
// var vm=new Vue({
//   data:{

//   }
//       })
import Vue from 'vue'

export default {
  data() {
    // 验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      // 邮箱验证正则表达式
      const regEmail =
        /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/
      if (regEmail.test(value)) {
        // 合法邮箱
        return cb()
      }

      cb(new Error('请输入合法的邮箱'))
    }
    // 验证手机号规则
    var checkMobile = (rule, value, cb) => {
      // 手机号验证正则表达式
      const regMobil =
        /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
      if (regMobil.test(value)) {
        // 合法手机号
        return cb()
      }

      cb(new Error('请输入合法的手机号'))
    }

    return {
      //获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        //当前每页显示多少条数据
        pagesize: 2,
      },
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
      total: 'userList.length',
      searchList: [], //用于存储搜索结果的数组
      tempList: [], //用于存储userList,以便在搜索完成后，视图恢复为搜索前，userList也恢复到搜索之前
      tempList1: [],
      //控制添加用户对话框的显示与隐藏
      addDialogVisible: false,

      // 添加用户的表单数据
      addForm: {
        username: '',
        password: '',
        mobile: '',
        email: '',
        role_name: '',
        date: '',
        mg_state: '',
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],

        password: [
          { required: true, message: '请输入登录密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: checkMobile, trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
      },

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

      options1: [
        {
          value: '管理员',
          label: '管理员',
        },
        {
          value: '参与者',
          label: '参与者',
        },
      ],

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
    }
  },

  created() {
    // this.getUserList()
    this.total = this.userList.length
    this.tempList = this.userList
    this.tempList1 = this.userList

    var id = this.$route.query.id
    var user = this.$route.query.user
    
    // console.log(id);
    // alert(id)
    if (id != null) {
      this.course = id
    }

    this.userList=user
    //console.log(this.total)
    // this.$router.push({
    //     path: '/projectHome',
    //     query: { id: this.userList},
        
    //   })

  },

  destroyed:function(){
    alert(this.userList[4].name)
    // sessionStorage.setItem('activePath', activePath)
    //   this.activePath = activePath
    //   this.$router.push({
    //     path: activePath,
    //    // path: '/tasks',
    //     path: '/projectHome',
    //     query: {finishUser:this.userList},
        
    //   }) 
    // alert('离开')
    sessionStorage.setItem('finishEditUser', this.userList)
    
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
    userStateChanged(userinfo, userindex) {
      console.log(userindex)
      this.userList[userindex].mg_state = userinfo.mg_state
      console.log(this.userList[userindex].mg_state)
      this.$message.success('更新用户状态成功')
    },
    handleSearch() {
      this.searchList = []
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].name.includes(this.queryInfo.query)) {
          this.searchList.push(this.userList[i])
        }
      }
      // this.tempList = this.userList
      this.userList = this.searchList
      this.total = this.searchList.length
      
    },
    recoveryUserlist() {
      this.userList = this.tempList
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
          name: this.addForm.username,
          mobile: this.addForm.mobile,
          email: this.addForm.email,
          role_name: this.addForm.role_name,
          date: this.addForm.date,
          mg_state: this.addForm.mg_state,
        }
        this.userList.push(obj)
        console.log(this.userList.length)
        this.total = this.userList.length
        this.addDialogVisible = false
        this.$message.success('添加用户成功')
      })
    },

    showEditDialog(userindex) {
      this.user_index = userindex
      this.editDialogVisible = true
      // console.log(userindex)
      this.editForm.username = this.userList[userindex].name
      this.editForm.mobile = this.userList[userindex].mobile
      this.editForm.email = this.userList[userindex].email
      this.editForm.role_name = this.userList[userindex].role_name
      this.editForm.date = this.userList[userindex].date
      this.editForm.mg_state = this.userList[userindex].mg_state
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
        this.userList[user_index].name = this.editForm.username

        this.userList[user_index].mobile = this.editForm.mobile
        this.userList[user_index].email = this.editForm.email
        this.userList[user_index].role_name = this.editForm.role_name
        this.userList[user_index].date = this.editForm.date
        this.userList[user_index].mg_state = this.editForm.mg_state
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
          this.userList.splice(userindex, 1)
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

    getBindText(role_name) {
      if (role_name == '参与者') {
        return '0'
      }
      if (role_name == '管理员') {
        return '1'
      }
    },

    getBindText1(mg_state) {
      if (mg_state == '在线') {
        return '1'
      }

      return '0'
    },

    selectManager() {
      this.searchList = []
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].role_name == '管理员') {
          this.searchList.push(this.userList[i])
        }
      }

      this.tempList = this.userList
      this.userList = this.searchList
      this.total = this.searchList.length
    },

    selectPartner() {
      this.searchList = []
      for (var i = 0; i < this.userList.length; i++) {
        if (this.userList[i].role_name == '参与者') {
          this.searchList.push(this.userList[i])
        }
      }

      // this.tempList = this.userList
      this.userList = this.searchList
      this.total = this.searchList.length
    },

    recoveryUserlist() {
      this.userList = this.tempList1
      this.total = this.tempList1.length
    },
  },

  filters: {
    //tag类型
    getBindStatus(role_name) {
      const bindColor = {
        0: '',
        1: 'success',
      }
      return bindColor[role_name]
    },

    getBindStatus1(mg_state) {
      const bindColor = {
        0: 'info',
        1: 'success',
      }
      return bindColor[mg_state]
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
</style>