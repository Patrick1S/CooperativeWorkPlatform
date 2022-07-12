<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div>
        <img src="../assets/协同工作中心.png" alt="" />
        <span>协同工作平台</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollaspe ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollaspe"><></div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#fff"
          text-color="#545c64"
          active-text-color="#0088F4"
          :unique-opened="true"
          :collapse="isCollaspe"
          :collapse-transition="false"
          :router="true"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu index="project">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-location"></i>
              <!-- 文本 -->
              <span>我的项目</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item
              index="manageProjects"
              @click="saveNavState('manageProjects')"
            >
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>我管理的项目</span>
            </el-menu-item>
            <!-- 二级菜单 -->
            <el-menu-item
              index="participateProjects"
              @click="saveNavState('participateProjects')"
            >
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>我参与的项目</span>

              
            </el-menu-item>
          </el-submenu>
          <el-menu-item index="recentTasks" @click="saveNavState('recentTasks')">
            <i class="el-icon-document"></i>
            <span slot="title">近期任务</span>
          </el-menu-item>
          <!-- <el-menu-item index="projectHome" @click="saveNavState('projectHome')">
            <i class="el-icon-setting"></i>
            <span slot="title">任务统计</span>
          </el-menu-item>
          <el-menu-item index="test">
            <i class="iconfont icon-user" @click="saveNavState('test')"></i>
            <span slot="title">导航五</span>
          </el-menu-item> -->
          <!-- <el-menu-item index="userInformation">
            <i class="iconfont icon-user" @click="saveNavState('userInformation')"></i>
            <span slot="title">个人信息</span>
          </el-menu-item> -->

          <el-menu-item index="userInfo">
            <i class="iconfont icon-user" @click="saveNavState('userInfo')"></i>
            <span slot="title">用户信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
export default {
  data() {
    return {
      //是否折叠
      isCollaspe: false,
      //被激活的链接地址
      activePath: '',
    }
  },
  created() {
    this.activePath = sessionStorage.getItem('activePath')
  },

  methods: {
    logout() {
      sessionStorage.clear()
      this.$router.push('/login')
    },
    //点击按钮，切换菜单的折叠与展开
    toggleCollaspe() {
      this.isCollaspe = !this.isCollaspe
    },
    //保存链接的激活状态
    saveNavState(activePath) {
      sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    },
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #0088f4;
  display: flex;
  justify-content: space-between;
  padding-left: 5px;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 10px;
    }
  }
  img {
    height: 50px;
    padding-top: 3px;
  }
}

.el-aside {
  background-color: #fff;
  border-right: solid 1px #e6e6e6;
  .el-menu {
    border-right: none;
    // border-bottom: solid 1px #e6e6e6;
  }
}

.el-main {
  background-color: #fff;
  height: 100%;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  color: #545c64;
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>