<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>项目管理</el-breadcrumb-item>
      <el-breadcrumb-item>项目列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="2">
          <el-button type="primary" @click="addProjectDV = true">添加项目</el-button>
        </el-col>
      </el-row>
      <el-table :data="projectList" stripe border size="mini">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="项目名称" prop="projectName"></el-table-column>
        <el-table-column label="项目中文名" prop="projectCnName"></el-table-column>
        <!-- <el-table-column label="负责人" prop="charge"></el-table-column> -->
        <!-- <el-table-column label="开始日期" prop="createDate"></el-table-column> -->
        <!-- <el-table-column label="公司" prop="company"></el-table-column> -->
        <!-- <el-table-column label="数据库ip" prop="dbIp"></el-table-column>
        <el-table-column label="数据库port" prop="dbPort"></el-table-column>
        <el-table-column label="db用户名" prop="dbUser"></el-table-column>
        <el-table-column label="db密码" prop="dbPassword"></el-table-column> -->
        <!-- <el-table-column label="代码作者" prop="author"></el-table-column> -->
        <!-- <el-table-column label="项目groupId" prop="groupId"></el-table-column> -->
        <!-- <el-table-column label="项目artifactId" prop="artifactId"></el-table-column> -->
        <!-- <el-table-column label="项目port" prop="projectPort"></el-table-column> -->
        <!-- <el-table-column label="雪花id序号" prop="snowIdSeq"></el-table-column> -->
        <el-table-column label="开发环境ip" prop="devIp" width="150px"></el-table-column>
        <el-table-column label="测试环境ip" prop="testIp" width="150px"></el-table-column>
        <el-table-column label="UAT环境ip" prop="uatIp" width="150px"></el-table-column>
        <el-table-column label="生产环境ip" prop="prodIp" width="150px"></el-table-column>
        <!-- <el-table-column label="项目描述" prop="description"></el-table-column> -->
        <el-table-column label="项目路径" prop="path"></el-table-column>
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.useStatus" active-value="1" inactive-value="0" @change="projectStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editProjectDVShow(scope.row.id)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delProjectById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加项目" :visible.sync="addProjectDV" width="750px" :before-close="handleClose" @close="addProjectDVClose">
      <el-form inline :model="addProjectForm" :rules="addProjectFormRules" ref="addProjectFormRef" label-width="120px" size="small">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="addProjectForm.projectName" title="如果项目领域没有拆分为微服务，则项目名称为数据库名"></el-input>
        </el-form-item>
        <el-form-item label="项目中文名" prop="projectCnName">
          <el-input v-model="addProjectForm.projectCnName" title="显示在页面上的中文名称"></el-input>
        </el-form-item>
        <el-form-item label="数据库ip" prop="dbIp">
          <el-input v-model="addProjectForm.dbIp"></el-input>
        </el-form-item>
        <el-form-item label="数据库port" prop="dbPort">
          <el-input v-model="addProjectForm.dbPort"></el-input>
        </el-form-item>
        <el-form-item label="db用户名" prop="dbUser">
          <el-input v-model="addProjectForm.dbUser"></el-input>
        </el-form-item>
        <el-form-item label="db密码" prop="dbPassword">
          <el-input v-model="addProjectForm.dbPassword"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="charge">
          <el-input v-model="addProjectForm.charge"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="createDate">
          <el-input v-model="addProjectForm.createDate"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="addProjectForm.company"></el-input>
        </el-form-item>
        <el-form-item label="代码作者" prop="author">
          <el-input v-model="addProjectForm.author"></el-input>
        </el-form-item>
        <el-form-item label="项目groupId" prop="groupId">
          <el-input v-model="addProjectForm.groupId"></el-input>
        </el-form-item>
        <el-form-item label="项目artifactId" prop="artifactId">
          <el-input v-model="addProjectForm.artifactId"></el-input>
        </el-form-item>
        <el-form-item label="项目port" prop="projectPort">
          <el-input v-model="addProjectForm.projectPort"></el-input>
        </el-form-item>
        <el-form-item label="雪花id序号" prop="snowIdSeq">
          <el-input v-model="addProjectForm.snowIdSeq"></el-input>
        </el-form-item>
        <el-form-item label="开发环境ip" prop="devIp">
          <el-input v-model="addProjectForm.devIp"></el-input>
        </el-form-item>
        <el-form-item label="测试环境ip" prop="testIp">
          <el-input v-model="addProjectForm.testIp"></el-input>
        </el-form-item>
        <el-form-item label="UAT环境ip" prop="uatIp">
          <el-input v-model="addProjectForm.uatIp"></el-input>
        </el-form-item>
        <el-form-item label="生产环境ip" prop="prodIp">
          <el-input v-model="addProjectForm.prodIp"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="addProjectForm.description" style="width: 510px"></el-input>
        </el-form-item>
        <el-form-item label="后端路径" prop="behindPath" inline="false">
          <el-input v-model="addProjectForm.behindPath" style="width: 510px"></el-input>
        </el-form-item>
        <el-form-item label="前端路径" prop="frontPath" inline="false">
          <el-input v-model="addProjectForm.frontPath" style="width: 510px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addProjectDV = false">取 消</el-button>
        <el-button type="primary" @click="addProject">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑项目" :visible.sync="editProjectDV" width="750px" @close="editProjectDVClose">
      <el-form inline :model="editProjectForm" :rules="editProjectFormRules" ref="editProjectFormRef" label-width="100px" size="small">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="editProjectForm.projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目中文名" prop="projectCnName">
          <el-input v-model="editProjectForm.projectCnName" title="显示在页面上的中文名称"></el-input>
        </el-form-item>
        <el-form-item label="数据库ip" prop="dbIp">
          <el-input v-model="editProjectForm.dbIp"></el-input>
        </el-form-item>
        <el-form-item label="数据库port" prop="dbPort">
          <el-input v-model="editProjectForm.dbPort"></el-input>
        </el-form-item>
        <el-form-item label="db用户名" prop="dbUser">
          <el-input v-model="editProjectForm.dbUser"></el-input>
        </el-form-item>
        <el-form-item label="db密码" prop="dbPassword">
          <el-input v-model="editProjectForm.dbPassword"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="charge">
          <el-input v-model="editProjectForm.charge"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="createDate">
          <el-input v-model="editProjectForm.createDate"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="editProjectForm.company"></el-input>
        </el-form-item>
        <el-form-item label="代码作者" prop="author">
          <el-input v-model="editProjectForm.author"></el-input>
        </el-form-item>
        <el-form-item label="项目groupId" prop="groupId">
          <el-input v-model="editProjectForm.groupId"></el-input>
        </el-form-item>
        <el-form-item label="项目artifactId" prop="artifactId">
          <el-input v-model="editProjectForm.artifactId"></el-input>
        </el-form-item>
        <el-form-item label="项目port" prop="projectPort">
          <el-input v-model="editProjectForm.projectPort"></el-input>
        </el-form-item>
        <el-form-item label="雪花id序号" prop="snowIdSeq">
          <el-input v-model="editProjectForm.snowIdSeq"></el-input>
        </el-form-item>
        <el-form-item label="开发环境ip" prop="devIp">
          <el-input v-model="editProjectForm.devIp"></el-input>
        </el-form-item>
        <el-form-item label="测试环境ip" prop="testIp">
          <el-input v-model="editProjectForm.testIp"></el-input>
        </el-form-item>
        <el-form-item label="UAT环境ip" prop="uatIp">
          <el-input v-model="editProjectForm.uatIp"></el-input>
        </el-form-item>
        <el-form-item label="生产环境ip" prop="prodIp">
          <el-input v-model="editProjectForm.prodIp"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="description">
          <el-input v-model="editProjectForm.description" style="width: 510px"></el-input>
        </el-form-item>
        <el-form-item label="后端路径" prop="behindPath" inline="false">
          <el-input v-model="editProjectForm.behindPath" style="width: 510px"></el-input>
        </el-form-item>
        <el-form-item label="前端路径" prop="frontPath" inline="false">
          <el-input v-model="editProjectForm.frontPath" style="width: 510px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editProjectDV = false">取 消</el-button>
        <el-button type="primary" @click="editProject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: '',
  created() {
    this.getProjectList()
  },
  data() {
    return {
      projectList: null,
      addProjectDV: false,
      addProjectForm: {
        projectName: '',
        projectCnName: '',
        dbIp: '',
        dbPort: '',
        dbUser: '',
        dbPassword: '',
        charge: '',
        createDate: '',
        company: '',
        author: '',
        groupId: '',
        artifactId: '',
        projectPort: '',
        snowIdSeq: '',
        devIp: '',
        testIp: '',
        uatIp: '',
        prodIp: '',
        description: '',
        behindPath: '',
        frontPath: ''
      },
      addProjectFormRules: {
        projectName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        projectCnName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbPort: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbUser: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbPassword: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        charge: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        createDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        groupId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        artifactId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        projectPort: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        snowIdSeq: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        devIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        testIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        uatIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        prodIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        behindPath: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 70, message: '长度不能超过 70 个字符', trigger: 'blur' }
        ],
        frontPath: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 70, message: '长度不能超过 70 个字符', trigger: 'blur' }
        ]
      },
      editProjectDV: false,
      editProjectForm: {
        id: '',
        projectName: '',
        projectCnName: '',
        dbIp: '',
        dbPort: '',
        dbUser: '',
        dbPassword: '',
        charge: '',
        createDate: '',
        company: '',
        author: '',
        groupId: '',
        artifactId: '',
        projectPort: '',
        snowIdSeq: '',
        devIp: '',
        testIp: '',
        uatIp: '',
        prodIp: '',
        description: '',
        behindPath: '',
        frontPath: ''
      },
      editProjectFormRules: {
        projectName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        projectCnName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbPort: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbUser: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbPassword: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        charge: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        createDate: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        groupId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        artifactId: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        projectPort: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        snowIdSeq: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        devIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        testIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        uatIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        prodIp: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        behindPath: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        frontPath: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 70, message: '长度不能超过 70 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    async getProjectList() {
      const { data: res } = await this.$http.post('/api/projectInfo/getAll', {})
      if (res.code !== 200) return this.$message.error(res.message)
      this.projectList = res.data
    },
    async projectStateChange(projectInfo) {
      console.log(projectInfo)
      const { data: res } = await this.$http.post('/api/projectInfo/upStatebykey', projectInfo)
      if (res.code !== 200) {
        if (projectInfo.useStatus === '1') {
          projectInfo.useStatus = '0'
        } else {
          projectInfo.useStatus = '1'
        }
        return this.$message.error(res.message)
      }
      this.$message({
        showClose: true,
        message: '更新项目状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getProjectList()
    },
    addProjectDVClose() {
      this.$refs.addProjectFormRef.resetFields()
    },
    addProject() {
      this.$refs.addProjectFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/projectInfo/add', this.addProjectForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addProjectDV = false
        this.getProjectList()
      })
    },
    editProjectDVClose() {
      this.$refs.editProjectFormRef.resetFields()
    },
    handleClose() {

    },
    async editProjectDVShow(id) {
      this.editProjectDV = true
      this.editProjectForm.id = id
      const { data: res } = await this.$http.post('/api/projectInfo/getbykey', this.editProjectForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editProjectForm = res.data
    },
    editProject() {
      this.$refs.editProjectFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/projectInfo/upbykey', this.editProjectForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editProjectDV = false
        this.getProjectList()
        this.$message.success(res.message)
      })
    },
    delProjectById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/projectInfo/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getProjectList()
        this.$message.success(res.message)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  margin-top: 10px;
}
.el-form {
  margin: 0 35px !important;
}
</style>
