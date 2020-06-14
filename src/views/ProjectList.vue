<template>
  <div class="container">

    <div class="header">
      **系统
    </div>
    <div ref="contentRef" class="content">
      <div>
        <el-row :gutter="20">
          <el-col :span="4">
            <div class="incontent">
              <div class="title">基本信息</div>
              <el-scrollbar :style="contentStyleObj">
                <el-form :style="contentStyleObj" ref="indexFormRef" :model="indexForm" :rules="indexFormRules" label-width="120px">
                  <el-form-item label="数据库名称" prop="dbname" size="mini">
                    <el-input v-model="indexForm.dbname" title="数据库名称在项目一段为领域名称，在项目二段为项目名称"></el-input>
                  </el-form-item>
                  <el-form-item label="项目groupId" prop="groupId" size="mini">
                    <el-input v-model="indexForm.groupId"></el-input>
                  </el-form-item>
                  <el-form-item label="项目artifactId" prop="artifactId" size="mini">
                    <el-input v-model="indexForm.artifactId"></el-input>
                  </el-form-item>
                  <el-form-item label="数据库Ip" prop="dbIp" size="mini">
                    <el-input v-model="indexForm.dbIp"></el-input>
                  </el-form-item>
                  <el-form-item label="数据库Port" prop="databasePort" size="mini">
                    <el-input v-model="indexForm.databasePort"></el-input>
                  </el-form-item>
                  <el-form-item label="数据库Version" prop="databaseVersion" size="mini">
                    <el-input v-model="indexForm.databaseVersion"></el-input>
                  </el-form-item>
                  <el-form-item label="数据库名" prop="databaseUserName" size="mini">
                    <el-input v-model="indexForm.databaseUserName"></el-input>
                  </el-form-item>
                  <el-form-item label="数据库密码" prop="databasePassword" size="mini">
                    <el-input v-model="indexForm.databasePassword"></el-input>
                  </el-form-item>
                  <el-form-item label="代码作者" prop="author" size="mini">
                    <el-input v-model="indexForm.author"></el-input>
                  </el-form-item>
                  <el-form-item label="项目Port" prop="projectPort" size="mini">
                    <el-input v-model="indexForm.projectPort"></el-input>
                  </el-form-item>
                  <el-form-item label="雪花id序号" prop="projectDatacenterId" size="mini">
                    <el-input v-model="indexForm.projectDatacenterId"></el-input>
                  </el-form-item>
                </el-form>
              </el-scrollbar>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="incontent">
              <div class="title">配置文件信息</div>
              <el-scrollbar :style="contentStyleObj">
                <el-form :style="contentStyleObj" ref="indexFormRef" :model="indexForm" :rules="indexFormRules" label-width="120px">
                  <el-form-item label="开发环境IP" prop="dbname" size="mini">
                    <el-input v-model="indexForm.dbname"></el-input>
                  </el-form-item>
                  <el-form-item label="开发环境PORT" prop="groupId" size="mini">
                    <el-input v-model="indexForm.groupId"></el-input>
                  </el-form-item>
                  <el-form-item label="测试环境IP" prop="dbname" size="mini">
                    <el-input v-model="indexForm.dbname"></el-input>
                  </el-form-item>
                  <el-form-item label="测试环境PORT" prop="groupId" size="mini">
                    <el-input v-model="indexForm.groupId"></el-input>
                  </el-form-item>
                  <el-form-item label="生产环境IP" prop="dbname" size="mini">
                    <el-input v-model="indexForm.dbname"></el-input>
                  </el-form-item>
                  <el-form-item label="生产环境PORT" prop="groupId" size="mini">
                    <el-input v-model="indexForm.groupId"></el-input>
                  </el-form-item>
                  <div class="title">领域表信息</div>
                  <el-form-item label="领域名称" prop="dbname" size="mini">
                    <el-input v-model="indexForm.dbname"></el-input>
                  </el-form-item>
                  <el-form-item label="表名" prop="groupId" size="mini">
                    <el-input v-model="indexForm.groupId"></el-input>
                  </el-form-item>
                </el-form>

              </el-scrollbar>
            </div>
          </el-col>
          <el-col :span="12" class="showGenInfo">
            <div class="grid-content bg-purple">自动生成信息</div>
          </el-col>
        </el-row>
      </div>
      <div class="btnClass">
        <el-button type="primary" @click="setHeight">生成</el-button>
        <el-button type="info" @click="saveProjectInfo">保存信息</el-button>
      </div>
    </div>
    <div class="footer">
      审
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    const that = this
    that.setHeight()
    window.onresize = () => {
      return (() => {
        that.setHeight()
      })()
    }
  },
  data() {
    return {
      contentStyleObj: {
        height: ''
      },
      indexForm: {
        dbname: '',
        groupId: '',
        artifactId: '',
        dbIp: '',
        databasePort: '',
        databaseVersion: '',
        databaseUserName: '',
        databasePassword: '',
        author: '',
        projectPort: '',
        projectDatacenterId: ''
      },
      indexFormRules: {
        dbname: [{ required: true, message: '请输入正确的信息', trigger: 'blur' }],

        password: [{ required: true, message: '请输入正确的信息', trigger: 'blur' }]
      }
    }
  },
  methods: {

    setHeight() {
      const height = this.$refs.contentRef.offsetHeight
      console.log(height)
      this.contentStyleObj.height = height - 100 + 'px'
    },
    resetLoginForm() {
      this.$refs.indexFormRef.resetFields()
    },
    genCode() {
      this.$refs.indexFormRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('api/jyUser/usercheck', this.loginForm)
        console.log(res)
        if (res.code !== 200) return this.$message.error(res.message)
        this.$message({ showClose: true, message: '生成成功', type: 'success', duration: 1500 })
      })
    },
    saveProjectInfo() {

    }
  }
}
</script>

<style lang="less" scope>
.el-form-item__label {
  color: snow !important;
}
.container {
  background-color: #2b4b6b;
  height: 100%;
  .header {
    background-color: sandybrown;
    width: 100%;
    height: 30px;
    line-height: 30px; /*注意line-height值要与footer容器height值相同*/
    text-align: center;
    font-size: 20px;

    position: absolute;
  }
  .content {
    width: 100%;
    height: auto; /*中间容器的height值设置为auto*/
    text-align: center;
    font-size: 20px;

    position: absolute;
    top: 30px;
    bottom: 30px;
    .el-row {
      height: 100%;
      margin: 0 !important;
      .el-col {
        height: 100%;
        .title {
          height: 30px;
          line-height: 30px;
        }
        .incontent {
          height: 100%;
        }
      }
    }
  }
  .footer {
    background-color: rosybrown;
    width: 100%;
    height: 30px;
    line-height: 30px; /*注意line-height值要与footer容器height值相同*/
    text-align: center;
    font-size: 20px;

    position: absolute;
    bottom: 0;
  }
}
</style>
