<template>
  <div class="admin-user">
    <div class="search-box">
      <input-search @search="getList" placeholder="请输入用户名"></input-search>
    </div>
    <el-table
    :data="userList"
    v-loading="tableLoading"
    stripe
    border>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <span v-if="!scope.row.status">禁用</span>
        </template>
      </el-table-column>
      <el-table-column label="用户头像" width="80px">
        <template slot-scope="scope">
          <img v-if="scope.row.pic" :src="`${avatarURL}/${scope.row.pic}`" class="avatar">
        </template>
      </el-table-column>
      <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="个性签名" prop="descript"></el-table-column>
      <el-table-column label="加入时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <!-- <el-button class="btn-green" @click="sectionChange(scope.row.id)">查看</el-button> -->
          <el-button class="btn-light-red" @click="disableUser(scope.row.id, scope.row.name)">
            {{ scope.row.status ? '取消权限' : '恢复权限' }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="admin-pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page_params.page"
        :page-sizes="[5, 10]"
        :page-size="page_params.size"
        layout="sizes, prev, pager, next, jumper, total"
        :total="page_params.total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { Table, TableColumn } from 'element-ui'
import InputSearch from '@/components/inputsearch.vue'
import { avatarURL } from '@/lib/axios/base_url.js'
export default {
  data () {
    return {
      userList: [],
      avatarURL,
      page_params: {
        page: 1,
        size: 5,
        total: 0
      },
      tableLoading: false
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList (name = '') {
      this.tableLoading = true
      this.$form.get('admin/user',{
        params: {
          page: this.page_params.page,
          size: this.page_params.size,
          name
        }
      }).then(res => {
        if (res.ret) {
          this.userList = res.data.data
          this.page_params.total = res.data.total
          this.page_params.page = res.data.currentPage
        }
      }).finally(() => {
        this.tableLoading = false
      })
    },
     // size 改变
    handleSizeChange (size) {
      this.page_params.size = size
      this.getList()
    },
    // page 改变
    handleCurrentChange (page) {
      this.page_params.page = page
      this.getList()
    },
    // 禁用用户
    disableUser (id, name) {
      this.$confirm(`是否要改变用户${name}的权限？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$form.put(`admin/user/status/${id}`).then(res => {
          if (res.ret) {
            this.$notify.success({
              title: '操作成功',
              message: res.msg
            })
            this.getList()
          }
        })
      })
    }
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    InputSearch
  },
}
</script>
<style lang="scss">
.admin-user {
  .avatar {
    width: 50px;
    border: 1px solid #eee;
  }
  .search-box {
    margin-bottom: 15px;
    overflow: hidden;
  }
}
</style>
