<template>
  <div >
    <!-- 添加参数按钮 -->
       
        <el-button type="primary" size="mini" @click.stop="saveProjectInput"
          >保存</el-button
        >
         <el-button 
        type="primary" size="mini" @click.stop="editProjectInput"
          >编辑</el-button
        >
       
          <el-input
            type="textarea"
            :autosize="{ minRows: 12, maxRows: 20 }"
            placeholder="项目说明"
            v-model="input"
            :disabled="editProjectInfo"
          >
          </el-input>
  </div>
</template>

<script>
export default {
  
  data () {
    return {
      input: '',
      editProjectInfo: true,
      course:{},
    }
  
  },
  methods:{
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

  },
  created(){
     var id = this.$route.query.id;
    // console.log(id);
    // alert(id)
    if(id!=null)
    {
    this.course=id
    this.input=this.course.projectDescript
    }

   

  }

}
</script>

<style scoped>
.el-button{
  float:right;
  margin-top: 5px;
  margin-right: 20px;
  margin-bottom: 5px;
}
</style>