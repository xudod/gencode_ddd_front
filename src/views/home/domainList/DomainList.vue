<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>领域/微服务管理</el-breadcrumb-item>
      <el-breadcrumb-item>领域/微服务列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div>
        <el-select v-model="projectId" placeholder="请选择" @change="getDomainList" style="margin-right: 20px">
          <el-option v-for="item in projectList" :key="item.id" :label="item.projectName" :value="item.id">
          </el-option>
        </el-select>
        <el-button type="primary" @click="addDomainBtn" style="margin-right: 20px">添加领域/微服务</el-button>
        <el-button type="primary" @click="genDB" style="margin-right: 20px">生成数据库表</el-button>
        <el-button type="primary" @click="genCode" style="margin-right: 20px">生成项目</el-button>
        <el-button type="primary" @click="genFrontCode" style="margin-right: 20px">生成前端项目</el-button>
        <!-- <el-button type="primary" @click="addDomainBtn" style="margin-right: 20px">添加领域/微服务</el-button>
        <el-button type="primary" @click="addDomainBtn" style="margin-right: 20px">添加领域/微服务</el-button>
        <el-button type="primary" @click="addDomainBtn" style="margin-right: 20px">添加领域/微服务</el-button>
        <el-button type="primary" @click="addDomainBtn" style="margin-right: 20px">添加领域/微服务</el-button>
        <el-button type="primary" @click="addDomainBtn" style="margin-right: 20px">添加领域/微服务</el-button> -->
      </div>
      <el-table :data="domaimList" stripe border size="mini">

        <el-table-column type="index"></el-table-column>
        <!-- <el-table-column label="项目名称" prop="projectName"></el-table-column> -->
        <el-table-column label="管理类型" prop="manageType" width="120px"></el-table-column>
        <el-table-column label="领域名" prop="dbName"></el-table-column>
        <el-table-column label="领域中文名" prop="cnName"></el-table-column>
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
        <!-- <el-table-column label="项目路径" prop="path"></el-table-column> -->
        <el-table-column label="状态" width="80px">
          <template slot-scope='scope'>
            <el-switch v-model="scope.row.useStatus" active-value="1" inactive-value="0" @change="domainStateChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope='scope'>
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="editDomainDVShow(scope.row.id)"></el-button>
            <el-button title="管理领域表信息" type="primary" icon="el-icon-date" size="mini" @click="editTableInfoDVShow(scope.row)"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="delDomainById(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="添加领域/微服务" :visible.sync="addDomainDV" width="750px" :before-close="handleClose" @close="addDomainDVClose">
      <el-form inline :model="addDomainForm" :rules="addDomainFormRules" ref="addDomainFormRef" label-width="120px" size="small">
        <el-form-item label="管理类型" prop="manageType">
          <el-input v-model="addDomainForm.manageType"></el-input>
        </el-form-item>
        <el-form-item label="领域中文名" prop="cnName">
          <el-input v-model="addDomainForm.cnName"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="charge">
          <el-input v-model="addDomainForm.charge"></el-input>
        </el-form-item>
        <el-form-item label="数据库ip" prop="dbIp">
          <el-input v-model="addDomainForm.dbIp"></el-input>
        </el-form-item>
        <el-form-item label="数据库port" prop="dbPort">
          <el-input v-model="addDomainForm.dbPort"></el-input>
        </el-form-item>
        <el-form-item label="db用户名" prop="dbUser">
          <el-input v-model="addDomainForm.dbUser"></el-input>
        </el-form-item>
        <el-form-item label="db密码" prop="dbPassword">
          <el-input v-model="addDomainForm.dbPassword"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="createDate">
          <el-input v-model="addDomainForm.createDate"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="addDomainForm.company"></el-input>
        </el-form-item>
        <el-form-item label="代码作者" prop="author">
          <el-input v-model="addDomainForm.author"></el-input>
        </el-form-item>
        <el-form-item label="项目groupId" prop="groupId">
          <el-input v-model="addDomainForm.groupId"></el-input>
        </el-form-item>
        <el-form-item label="项目artifactId" prop="artifactId">
          <el-input v-model="addDomainForm.artifactId"></el-input>
        </el-form-item>
        <el-form-item label="项目port" prop="projectPort">
          <el-input v-model="addDomainForm.projectPort"></el-input>
        </el-form-item>
        <el-form-item label="雪花id序号" prop="snowIdSeq">
          <el-input v-model="addDomainForm.snowIdSeq"></el-input>
        </el-form-item>
        <el-form-item label="开发环境ip" prop="devIp">
          <el-input v-model="addDomainForm.devIp"></el-input>
        </el-form-item>
        <el-form-item label="测试环境ip" prop="testIp">
          <el-input v-model="addDomainForm.testIp"></el-input>
        </el-form-item>
        <el-form-item label="UAT环境ip" prop="uatIp">
          <el-input v-model="addDomainForm.uatIp"></el-input>
        </el-form-item>
        <el-form-item label="生产环境ip" prop="prodIp">
          <el-input v-model="addDomainForm.prodIp"></el-input>
        </el-form-item>
        <el-form-item label="数据库名" prop="dbName">
          <el-input v-model="addDomainForm.dbName" title="如果领域没有拆分为微服务，则此处为领域名称，但不是数据库名，当领域拆分为微服务时，并且拆分了数据库，则此处为微服务项目名称，也是数据库名称，同时也是领域名称。"></el-input>
        </el-form-item>
        <el-form-item label="数据表名" prop="dbTableList">
          <el-input v-model="addDomainForm.dbTableList" placeholder="多个表用英文逗号隔开" style="width: 510px"></el-input>
        </el-form-item>
        <el-form-item label="领域描述" prop="description">
          <el-input v-model="addDomainForm.description" style="width: 510px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDomainDV = false">取 消</el-button>
        <el-button type="primary" @click="addDomain">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑领域/微服务" :visible.sync="editDomainDV" width="750px" @close="editDomainDVClose">
      <el-form inline :model="editDomainForm" :rules="editDomainFormRules" ref="editDomainFormRef" label-width="120px" size="small">
        <el-form-item label="管理类型" prop="manageType">
          <el-input v-model="editDomainForm.manageType"></el-input>
        </el-form-item>
        <el-form-item label="领域中文名" prop="cnName">
          <el-input v-model="editDomainForm.cnName"></el-input>
        </el-form-item>
        <el-form-item label="负责人" prop="charge">
          <el-input v-model="editDomainForm.charge"></el-input>
        </el-form-item>
        <el-form-item label="数据库ip" prop="dbIp">
          <el-input v-model="editDomainForm.dbIp"></el-input>
        </el-form-item>
        <el-form-item label="数据库port" prop="dbPort">
          <el-input v-model="editDomainForm.dbPort"></el-input>
        </el-form-item>
        <el-form-item label="db用户名" prop="dbUser">
          <el-input v-model="editDomainForm.dbUser"></el-input>
        </el-form-item>
        <el-form-item label="db密码" prop="dbPassword">
          <el-input v-model="editDomainForm.dbPassword"></el-input>
        </el-form-item>
        <el-form-item label="开始日期" prop="createDate">
          <el-input v-model="editDomainForm.createDate"></el-input>
        </el-form-item>
        <el-form-item label="公司" prop="company">
          <el-input v-model="editDomainForm.company"></el-input>
        </el-form-item>
        <el-form-item label="代码作者" prop="author">
          <el-input v-model="editDomainForm.author"></el-input>
        </el-form-item>
        <el-form-item label="项目groupId" prop="groupId">
          <el-input v-model="editDomainForm.groupId"></el-input>
        </el-form-item>
        <el-form-item label="项目artifactId" prop="artifactId">
          <el-input v-model="editDomainForm.artifactId"></el-input>
        </el-form-item>
        <el-form-item label="项目port" prop="projectPort">
          <el-input v-model="editDomainForm.projectPort"></el-input>
        </el-form-item>
        <el-form-item label="雪花id序号" prop="snowIdSeq">
          <el-input v-model="editDomainForm.snowIdSeq"></el-input>
        </el-form-item>
        <el-form-item label="开发环境ip" prop="devIp">
          <el-input v-model="editDomainForm.devIp"></el-input>
        </el-form-item>
        <el-form-item label="测试环境ip" prop="testIp">
          <el-input v-model="editDomainForm.testIp"></el-input>
        </el-form-item>
        <el-form-item label="UAT环境ip" prop="uatIp">
          <el-input v-model="editDomainForm.uatIp"></el-input>
        </el-form-item>
        <el-form-item label="生产环境ip" prop="prodIp">
          <el-input v-model="editDomainForm.prodIp"></el-input>
        </el-form-item>
        <el-form-item label="数据库名" prop="dbName">
          <el-input v-model="editDomainForm.dbName"></el-input>
        </el-form-item>
        <el-form-item label="数据表名" prop="dbTableList">
          <el-input v-model="editDomainForm.dbTableList" placeholder="多个表用英文逗号隔开" style="width: 510px"></el-input>
        </el-form-item>
        <el-form-item label="领域描述" prop="description">
          <el-input v-model="editDomainForm.description" style="width: 510px"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDomainDV = false">取 消</el-button>
        <el-button type="primary" @click="editDomain">确 定</el-button>
      </span>
    </el-dialog>
    <el-drawer :title="tableEditTitle" size="70%" :visible.sync="editTableInfoDV" @close="editTableInfoDVClose" direction="btt" :wrapperClosable=false>
      <div>
        <vxe-toolbar>
          <template v-slot:buttons>
            <!-- <vxe-button icon="fa fa-plus" @click="insertEvent()">新增</vxe-button>
            <vxe-button @click="insertEvent(tableData[2])">在第3行插入并激活 Sex 单元格</vxe-button>
            <vxe-button @click="insertEvent(-1)">在最后行插入</vxe-button>
            <vxe-button @click="$refs.xTable.removeCheckboxRow()">删除选中</vxe-button>
            <vxe-button @click="getSelectionEvent">获取选中</vxe-button>
            <vxe-button @click="getInsertEvent">获取新增</vxe-button>
            <vxe-button icon="fa fa-save" @click="saveEvent">保存</vxe-button> -->
            <vxe-select v-model="tableItem" placeholder="请选择当前编辑表" @change="tableChange">
              <vxe-option v-for="item in tableNameList" :key="item.id" :label="item.tableName" :value="item"></vxe-option>
            </vxe-select>
            <el-divider direction="vertical"></el-divider>
            <vxe-button status="primary" @click="insertId()" title="建议最后插入该字段">自动插入id</vxe-button>
            <el-divider direction="vertical"></el-divider>
            <vxe-button status="primary" @click="insertCommon()" title="建议最后插入公共字段">自动插入公共字段</vxe-button>
            <el-divider direction="vertical"></el-divider>
            <vxe-input v-model="insertNumber" placeholder="请输插入位置" style="margin-right: 10px;width: 50px"></vxe-input>
            <vxe-button status="primary" @click="insertEventInSet">在指定位置插入新行</vxe-button>
            <el-divider direction="vertical"></el-divider>
            <vxe-button status="primary" @click="insertEventAddLast">新增一行</vxe-button>
            <el-divider direction="vertical"></el-divider>
            <!-- <vxe-button @click="delCheckboxRow()">删除选中</vxe-button> 有行的删除就不要这个功能了
            <el-divider direction="vertical"></el-divider> -->
            <!-- <el-select size="small" v-model="tableId" placeholder="请选择" @change="getDomainList" style="margin-right: 20px">
              <el-option v-for="item in tableNameList" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select> -->
            <!-- 是否可以行编辑后边再加 -->
            <vxe-input v-model="addTableName" placeholder="请输入新增表名" style="margin-right: 10px"></vxe-input>
            <vxe-button status="primary" @click="addtable()" title="在左侧输入框中输入表名">新增表</vxe-button>
            <el-divider direction="vertical"></el-divider>
            <vxe-button status="primary" @click="deltable()" title="在左侧输入框中输入表名">删除当前表</vxe-button>
          </template>
        </vxe-toolbar>
        <vxe-table keep-source showStatus @edit-actived="editActivedEvent" :edit-config="{trigger: 'click', mode: 'cell', showStatus: true}" auto-resize size="mini" border resizable highlight-hover-row :edit-rules="columnInfoRules" show-overflow ref="xTable" class="my_table_insert" height="91%" :data="ColumnInfoList">
          <vxe-table-column type="checkbox" width="60"></vxe-table-column>
          <vxe-table-column type="seq" width="60"></vxe-table-column>
          <vxe-table-column field="name" title="名称" :edit-render="{name: 'input', attrs: {disabled: nameDisabled}}"></vxe-table-column>
          <vxe-table-column field="nameCn" title="中文描述" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="columnType" title="类型" :edit-render="{name: 'select', options: columnTypeList, defaultValue: 'varchar'}" width="95px"></vxe-table-column>
          <vxe-table-column field="columnLen" title="长度" :edit-render="{name: 'input', defaultValue: 255}" width="80px"></vxe-table-column>
          <vxe-table-column field="decimalPoint" title="小数位" :edit-render="{name: 'input', defaultValue: 0}" width="80px"></vxe-table-column>
          <vxe-table-column field="nullIs" title="不为空" :edit-render="{name: 'select', options: isList, defaultValue: '0'}" width="80px"></vxe-table-column>
          <vxe-table-column field="keyIs" title="主键" :edit-render="{name: 'select', options: isList, defaultValue: '0'}" width="80px"></vxe-table-column>
          <vxe-table-column field="checkType" title="校验类型" :edit-render="{name: 'select', options: checkTypeList}" width="100px"></vxe-table-column>
          <vxe-table-column field="checkValue" title="校验值" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="pageTitle" title="页面提示" :edit-render="{name: 'input'}"></vxe-table-column>
          <vxe-table-column field="newShow" title="新建显示" :edit-render="{name: 'select', options: isList, defaultValue: '1'}" width="100px"></vxe-table-column>
          <vxe-table-column field="editUse" title="编辑可用" :edit-render="{name: 'select', options: isList, defaultValue: '1'}" width="100px"></vxe-table-column>
          <vxe-table-column field="tableShow" title="表格显示" :edit-render="{name: 'select', options: isList, defaultValue: '1'}" width="100px"></vxe-table-column>
          <vxe-table-column field="partSequence" title="排序" :edit-render="{name: 'input'}" width="80px"></vxe-table-column>
          <!-- 共公字段是createby等字段，用来设定这些字段，可以一键配置到其他表中。 -->
          <!-- <vxe-table-column field="publicIs" title="共公字段" :edit-render="{name: 'select', options: isList, defaultValue: '0'}" width="100px"></vxe-table-column> -->
          <!-- <vxe-table-column title="状态" width="80"> 这里的功能不需要状态
            <template v-slot="{ row }">
              <template>
                <el-switch v-model="row.useStatus" active-value="1" inactive-value="0" @change="ColumnInfoStateChange(row)"></el-switch>
              </template>
            </template>
          </vxe-table-column> -->
          <vxe-table-column title="操作" width="200">
            <template v-slot="{ row }">
              <template>
                <!-- v-if="row.publicIs === '0'" 判断是否是公共字段，不要了。还是每张表保存独立的公共字段，公共字段保存在其他表里就可以了。 -->
                <el-button type="primary" icon="el-icon-edit" size="mini" @click="saveColumnInfo(row)" :loading="row.loading">保存</el-button>
                <el-button v-if="row.id" type="danger" icon="el-icon-delete" size="mini" @click="delColumnInfoById(row.id)" :loading="row.loading"></el-button>
              </template>
            </template>
          </vxe-table-column>
        </vxe-table>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  name: '',
  created() {
    this.getPorjectList()
  },
  data() {
    return {
      projectList: null,
      projectId: '',
      domaimList: null,
      addDomainDV: false,
      editDomainDV: false,
      editTableInfoDV: false,
      addDomainForm: {
        projectId: '',
        cnName: '',
        manageType: '',
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
        dbName: '',
        dbTableList: ''
      },
      addDomainFormRules: {
        manageType: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        cnName: [
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
        dbName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbTableList: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 200, message: '长度不能超过 200 个字符', trigger: 'blur' }
        ]
      },
      editDomainForm: {
        projectId: '',
        cnName: '',
        manageType: '',
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
        dbName: '',
        dbTableList: ''
      },
      editDomainFormRules: {
        manageType: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        cnName: [
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
        dbName: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 36, message: '长度不能超过 36 个字符', trigger: 'blur' }
        ],
        dbTableList: [
          { required: true, message: '该属性不能为空', trigger: 'blur' },
          { max: 200, message: '长度不能超过 200 个字符', trigger: 'blur' }
        ]
      },
      columnInfoRules: {
        name: [
          { required: true, message: '该属性不能为空' },
          { max: 36, message: '长度不能超过 36 个字符' }
        ],
        nameCn: [
          { required: true, message: '该属性不能为空' }
        ]
      },
      ColumnInfoList: [],
      sexList: [],
      addTableName: '',
      tableNameList: [],
      tableItem: null,
      domainId: '',
      insertNumber: 1,
      columnTypeList: [
        { label: 'char', value: 'char' },
        { label: 'varchar', value: 'varchar' },
        { label: 'int', value: 'int' },
        { label: 'timestamp', value: 'timestamp' }
      ],
      isList: [
        { label: '是', value: '1' },
        { label: '否', value: '0' }
      ],
      checkTypeList: [
        { label: '不校验', value: 'NO' },
        { label: '必填', value: 'REQ' },
        { label: '最小长度', value: 'MINLEN' },
        { label: '最小最大长度', value: 'MINLEN-MAXLEN' },
        { label: '最大长度', value: 'MAXLEN' },
        { label: '最小值', value: 'MINVAL' },
        { label: '最小最大值', value: 'MINVAL-MAXVAL' },
        { label: '最大值', value: 'MAXVAL' },
        { label: '手机格式', value: 'PHONE' },
        { label: '邮箱格式', value: 'MAIL' }
      ],
      tableEditTitle: '',
      tableId: '',
      selectRecords: '',
      nameDisabled: false
      // saveButtonDisabled: true
    }
  },
  methods: {
    async getPorjectList() {
      const { data: res } = await this.$http.post('api/projectInfo/getAll', {})
      if (res.code !== 200) return this.$message.error(res.message)
      this.projectList = res.data
      if (res.data.length > 0) {
        this.projectId = res.data[0].id
        this.getDomainList()
      }
    },
    async getDomainList() {
      const { data: res } = await this.$http.post('api/domainInfo/getDomainListByProjectId', { id: this.projectId })
      if (res.code !== 200) return this.$message.error(res.message)
      this.addDomainForm.projectId = this.editDomainForm.projectId = this.projectId
      this.domaimList = res.data
    },
    async domainStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/domainInfo/upStatebykey', domaimInfo)
      if (res.code !== 200) {
        if (domaimInfo.useStatus === '1') {
          domaimInfo.useStatus = '0'
        } else {
          domaimInfo.useStatus = '1'
        }
        return this.$message.error(res.message)
      }
      this.$message({
        showClose: true,
        message: '更新领域/微服务状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getDomainList()
    },
    addDomainDVClose() {
      this.$refs.addDomainFormRef.resetFields()
    },
    async addDomainBtn() {
      const { data: res } = await this.$http.post('/api/projectInfo/getbykey', { id: this.projectId })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      res.data.id = undefined
      this.addDomainForm = res.data
      this.addDomainForm.projectId = this.projectId
      this.addDomainDV = true
    },
    addDomain() {
      this.$refs.addDomainFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/domainInfo/add', this.addDomainForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: res.message,
          type: 'success',
          duration: 1500
        })
        this.addDomainDV = false
        this.getDomainList()
      })
    },
    editDomainDVClose() {
      this.$refs.editDomainFormRef.resetFields()
    },
    handleClose() {

    },
    async editDomainDVShow(id) {
      this.editDomainDV = true
      this.editDomainForm.id = id
      const { data: res } = await this.$http.post('/api/domainInfo/getbykey', this.editDomainForm)
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.editDomainForm = res.data
    },
    editDomain() {
      this.$refs.editDomainFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('/api/domainInfo/upbykey', this.editDomainForm)
        if (res.code !== 200) {
          this.$message.error(res.message)
        }
        this.editDomainDV = false
        this.getDomainList()
        this.$message.success(res.message)
      })
    },
    delDomainById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/domainInfo/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getDomainList()
        this.$message.success(res.message)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    genDB() {
      this.$confirm('该功能会生成所有数据库表, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/gencode/genDB', { id: this.projectId })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.$message.success(res.message)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消生成'
        })
      })
    },
    genCode() {
      this.$confirm('该功能会生成所有项目内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/gencode/genCodeAllProject', { id: this.projectId })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.$message.success(res.message)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消生成'
        })
      })
    },
    genFrontCode() {
      this.$confirm('该功能会生成前端所有项目内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/gencode/genFrontProject', { id: this.projectId })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.$message.success(res.message)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消生成'
        })
      })
    },
    // 下边是对数据库表的操作。
    async addtable() {
      const addTableObj = {}
      addTableObj.domainId = this.domainId
      addTableObj.tableName = this.addTableName
      const { data: res } = await this.$http.post('/api/tableBaseInfo/addTableNameInDomain', addTableObj)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.tableId = res.data
      this.getTableNameList(this.domainId)
    },
    async deltable() {
      const addTableObj = {}
      addTableObj.domainId = this.domainId
      addTableObj.tableName = this.tableItem
      debugger
      const { data: res } = await this.$http.post('/api/tableBaseInfo/delTableNameInDomain', addTableObj)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.tableItem = null
      this.getTableNameList(this.domainId)
    },
    async editTableInfoDVShow(row) {
      this.editTableInfoDV = true
      this.tableEditTitle = row.cnName + '领域--表信息管理'
      this.domainId = row.id
      this.getTableNameList(row.id)
    },
    async getTableNameList(id) {
      const { data: res } = await this.$http.post('/api/domainInfo/getTableInfo', { id: id })
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.tableNameList = res.data
      if (this.addTableName !== '' && this.addTableName !== undefined) {
        this.tableItem = this.addTableName
        this.addTableName = ''
      } else {
        if (res.data.length > 0) {
          this.tableItem = res.data[0].tableName
          this.tableId = res.data[0].id
        }
      }
      this.getColumnInfo()
    },
    async tableChange(value) {
      this.tableItem = value.value.tableName
      this.tableId = value.value.id
      this.getColumnInfo()
    },
    async getColumnInfo() {
      const queryInfo = this.tableId
      const { data: res } = await this.$http.post('/api/columnInfo/getTableColumnByTableId', { tableId: queryInfo })
      if (res.code !== 200) {
        this.$message.error(res.message)
      }
      this.ColumnInfoList = res.data
    },
    editTableInfoDVClose() {
      this.ColumnInfoList = []
      this.tableNameList = []
      this.tableItem = ''
      this.tableEditTitle = ''
    },
    async insertId() {
      const record = { tableId: this.tableId, name: 'id', nameCn: 'id', columnType: 'char', columnLen: 36, nullIs: '0', keyIs: '1', pageTitle: 'id', partSequence: '010' }
      // const { row: newRow } = await this.$refs.xTable.insertAt(record, row)
      // await this.$refs.xTable.setActiveCell(newRow, 'name')
      this.saveColumnInfo(record)
    },
    async insertCommon() {
      const record = [
        { tableId: this.tableId, name: 'sq', nameCn: '排序号', columnType: 'int', columnLen: 10, nullIs: '0', keyIs: '0', pageTitle: '排序号', partSequence: '900' },
        { tableId: this.tableId, name: 'rm', nameCn: '备注', columnType: 'varchar', columnLen: 2000, nullIs: '0', keyIs: '0', pageTitle: '备注', partSequence: '910' },
        { tableId: this.tableId, name: 'ds', nameCn: '来源', columnType: 'varchar', columnLen: 20, nullIs: '0', keyIs: '0', pageTitle: '数据来源，是从哪个系统对接的数据，还是自己产生的数据P-GH,表示手机端光合', partSequence: '920' },
        { tableId: this.tableId, name: 'dst', nameCn: '状态', columnType: 'char', columnLen: 1, nullIs: '0', keyIs: '0', pageTitle: '数据状态，1为可用，0为不可用', partSequence: '930' },
        { tableId: this.tableId, name: 'vs', nameCn: '版本号', columnType: 'int', columnLen: 10, nullIs: '0', keyIs: '0', pageTitle: '实现乐观锁', partSequence: '940' },
        { tableId: this.tableId, name: 'de', nameCn: '已删除', columnType: 'char', columnLen: 1, nullIs: '0', keyIs: '0', pageTitle: '1为被删除，0为未删除', partSequence: '950' },
        { tableId: this.tableId, name: 'cb', nameCn: '创建人', columnType: 'varchar', columnLen: 50, nullIs: '0', keyIs: '0', pageTitle: '', partSequence: '960' },
        { tableId: this.tableId, name: 'ct', nameCn: '创建时间', columnType: 'timestamp', columnLen: 6, nullIs: '0', keyIs: '0', pageTitle: '', partSequence: '970' },
        { tableId: this.tableId, name: 'mb', nameCn: '修改人', columnType: 'varchar', columnLen: 50, nullIs: '0', keyIs: '0', pageTitle: '', partSequence: '980' },
        { tableId: this.tableId, name: 'mt', nameCn: '修改时间', columnType: 'timestamp', columnLen: 6, nullIs: '0', keyIs: '0', pageTitle: '', partSequence: '990' }
      ]
      const { data: res } = await this.$http.post('/api/columnInfo/addBatchColumn', record)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.ColumnInfoList = res.data
    },
    async insertEventInSet() {
      const a = parseInt(this.insertNumber)
      const b = this.ColumnInfoList.length
      let row = this.ColumnInfoList[a]
      if (this.insertNumber < 0 || this.insertNumber > this.ColumnInfoList.length) {
        return this.$message.error('指定位置错误，或者有数据未保存！')
      }
      if (a === b) {
        row = -1
      }
      const record = { partSequence: this.tableItem.tableName + a * 10 }
      const { row: newRow } = await this.$refs.xTable.insertAt(record, row)
      this.insertEvent(newRow)
    },
    async insertEventAddLast() {
      console.log(this.tableName)
      const record = { partSequence: this.tableItem.tableName + this.ColumnInfoList.length * 10 }
      const { row: newRow } = await this.$refs.xTable.insertAt(record, -1)
      this.insertEvent(newRow)
    },
    async insertEvent(newRow) {
      // const { row: newRow } = await this.$refs.xTable.insertAt({}, row)
      // await this.$refs.xTable.setActiveCell(newRow, 'sex') sex是源代码中要激活的列
      await this.$refs.xTable.setActiveCell(newRow)
    },
    getInsertEvent() {
      const insertRecords = this.$refs.xTable.getInsertRecords()
      this.$XModal.alert(insertRecords.length)
    },
    getSelectionEvent() {
      const selectRecords = this.$refs.xTable.getCheckboxRecords()
      this.selectRecords = selectRecords
      // this.$XModal.alert(selectRecords.length)
    },
    delCheckboxRow() {
      this.getSelectionEvent()
      const selectRecords = this.selectRecords
      if (selectRecords.length < 1) {
        return this.$message.error('没有选中任何内容！')
      }
      if (selectRecords.length > 1) {
        return this.$message.error('为了操作安全，不允许同时删除多条数据！')
      }
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/columnInfo/delbykey', { id: selectRecords[0].id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.$message({
          showClose: true,
          message: '删除成功！',
          type: 'success',
          duration: 1500
        })
        this.getColumnInfo()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    saveEvent() {
      // const { insertRecords, removeRecords, updateRecords } = this.$refs.xTable.getRecordset()
      const { insertRecords } = this.$refs.xTable.getRecordset()
      // this.$XModal.alert(`insertRecords=${insertRecords.length} removeRecords=${removeRecords.length} updateRecords=${updateRecords.length}`)
      alert(JSON.stringify(insertRecords))
    },
    // 下边是自动生成的代码复制过来的
    // async getColumnInfoList() {
    //   const { data: res } = await this.$http.post('/api/columnInfo/getall', {})
    //   if (res.code !== 200) return this.$message.error(res.message)
    //   this.ColumnInfoList = res.data
    // },
    async ColumnInfoStateChange(domaimInfo) {
      console.log(domaimInfo)
      const { data: res } = await this.$http.post('/api/columnInfo/upstatebykey', domaimInfo)
      if (res.code !== 200) {
        if (domaimInfo.useStatus === '1') {
          domaimInfo.useStatus = '0'
        } else {
          domaimInfo.useStatus = '1'
        }
        return this.$message.error(res.message)
      }
      this.$message({
        showClose: true,
        message: '更新领域库表管理状态成功！',
        type: 'success',
        duration: 1500
      })
      this.getColumnInfo()
    },
    // 可以控制表字段属性表格保存按钮是否可用
    // editClosedEvent({ row, column }) {
    //   const xTable = this.$refs.xTable
    //   const field = column.property
    //   // const cellValue = row[field]
    //   // 判断单元格值是否被修改
    //   if (xTable.isUpdateByRow(row, field)) {
    //     this.saveButtonDisabled = false
    //   }
    // },
    editActivedEvent({ rowIndex, row }) {
      debugger
      this.nameDisabled = !(row.name === '' || row.name === null)
    },
    async saveColumnInfo(row) {
      const errMap = await this.$refs.xTable.validate(row).catch(errMap => errMap)
      if (!errMap) {
        if (row.tableId === undefined || row.tableId === null) {
          row.tableId = this.tableId
        }
        if (row.id) {
          this.editColumnInfo(row)
        } else {
          this.addColumnInfo(row)
        }
      }
    },
    async addColumnInfo(row) {
      const { data: res } = await this.$http.post('/api/columnInfo/add', row)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.$message({
        showClose: true,
        message: res.message,
        type: 'success',
        duration: 1500
      })
      this.getColumnInfo()
    },
    async editColumnInfo(row) {
      const { data: res } = await this.$http.post('/api/columnInfo/upbykey', row)
      if (res.code !== 200) {
        return this.$message.error(res.message)
      }
      this.getColumnInfo()
      this.$message.success(res.message)
    },
    delColumnInfoById(id) {
      this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const { data: res } = await this.$http.post('/api/columnInfo/delbykey', { id })
        if (res.code !== 200) {
          return this.$message.error(res.message)
        }
        this.getColumnInfo()
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
.my_table_insert .vxe-body--row.is--new {
  background-color: #f1fdf1;
}
/deep/.el-drawer__header {
  margin-bottom: 10px !important;
}
/deep/.el-drawer__body {
  margin: 0 20px 20px 20px !important;
}
.el-divider {
  margin: 0 30px !important;
}
</style>
