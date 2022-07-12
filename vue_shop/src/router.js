import Vue from 'vue'
import Router from 'vue-router'



import Login from './components/Login.vue'

import Home from './components/Home.vue'

import Welcome from './components/Welcome.vue'

import ManageProjects from './components/projects/ManageProjects.vue'

import ParticipateProjects from './components/projects/ParticipateProjects.vue'

import RecentTasks from './components/projects/RecentTasks.vue'

import AddProject from './components/projects/AddProject.vue'

import ProjectHome from './components/projects/project/ProjectHome.vue'


import ProjectDescript from './components/projects/project/ProjectDescript.vue'




import UserInfo from './components/projects/UserInfo.vue'


import Tasks from './components/projects/project/Tasks.vue'



import Users from './components/projects/project/Users.vue'



//导入字体图标
import './assets/fonts/iconfont.css'


//导入全局样式表

import './assets/css/global.css'

//配置请求的根路径
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios


Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      redirect: '/welcome',
      children: [
        { path: '/welcome', component: Welcome },
        { path: '/manageProjects', component: ManageProjects},
        { path: '/participateProjects', component:ParticipateProjects},
        { path: '/recentTasks', component:RecentTasks},
        { path: '/addProject', component: AddProject},
        { path: '/userInfo', component: UserInfo},



        
        


        
        { path: '/projectHome', 
        component: ProjectHome,
        redirect: '/projectDescript',
        children: [
          
          { path: '/projectDescript', component: ProjectDescript},

            { path: '/tasks', component: Tasks },

            { path: '/users', component: Users },

           

      //     // { path: '/manageProjects', component: ManageProjects},
      //     // { path: '/participateProjects', component:ParticipateProjects},
      //     // { path: '/rights', component: Rights},
      //     // { path: '/test', component: Test},
      //     // { path: '/projectHome', component: ProjectHome},
      //     // { path: '/test3', component: Test3},
      //     // { path: '/test4', component: Test4},
        ]
      },



        
      //   // { path: '/test3', component: Test3},
      //   // { path: '/addProject', component: AddProject},
      ]
    },

    

  ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
  //to 将要访问的路径
  //from 代表从哪个路径跳转而来
  //next 是一个函数，表示放行
  // next() 放行 next('/login') 强制跳转

  if (to.path == '/login') next()
  //获取token
  const tokenStr = sessionStorage.getItem('token')
  //console.log(tokenStr)
  if (!tokenStr) {
    return next('/login')
  }
  next()
  //if(to.path=='/home')  next('/login')


})

export default router

