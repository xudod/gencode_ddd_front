<template>
  <el-container class="home-container">
    <el-aside width="200px">
      <div>
        **系统
      </div>
      <el-menu background-color="#545c64" text-color="#fff" active-text-color="#3CA7FF" unique-opened router :default-active="activePath">
        <el-submenu :index="item.path" v-for="item in realMenuList.data" :key="item.id">
          <template slot="title">
            <i class="el-icon-location"></i>
            <span>{{item.authName}}</span>
          </template>
          <el-menu-item :index="subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveActivePath(subItem.path)">
            <i class="el-icon-menu"></i>
            <span>{{subItem.authName}}</span>
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          一些操作
        </div>
        <el-button type='info' @click="logout">退出</el-button>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer height='30px'>审</el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'home',
  created() {
    this.getMenuList()
    this.activePath = window.sessionStorage.getItem('pathStr')
  },
  data() {
    return {
      activePath: '',
      isCollapse: true,
      realMenuList: {},
      menuList: {
        code: 200,
        message: '查询成功！',
        data: [
          {
            id: 1,
            authName: '开发项目',
            order: 1,
            path: '',
            children: [
              {
                id: 11,
                authName: '开发项目列表',
                order: 1,
                path: '/projectList'
              },
              {
                id: 12,
                authName: '领域列表',
                order: 1,
                path: '/domainList'
              }
            ]
          }
        ],
        currentTime: 1585960903058
      }
    }
  },
  methods: {
    logout() {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    getMenuList() {
      this.realMenuList = this.menuList
    },
    saveActivePath(pathStr) {
      window.sessionStorage.setItem('pathStr', pathStr)
      this.activePath = pathStr
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #333;
  > div {
    display: flex;
    align-items: center;
  }
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 30px;
  line-height: 30px;
  font-size: 12px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  height: 100%;
  min-height: 590px;
  .el-menu {
    border-right: none;
  }
  > div {
    height: 60px;
    line-height: 60px;
    text-align: center;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  min-height: 500px;
}

body > .el-container {
  height: 100%;
}
</style>
