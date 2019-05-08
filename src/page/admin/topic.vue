<template>
  <div class="admin-topic">
    <div class="search-box">
      <input-search @search="getList" placeholder="请输入话题标题"></input-search>
    </div>
    <el-table
    :data="topicList"
    v-loading="tableLoading"
    stripe
    border>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="话题标题" prop="title"></el-table-column>
      <el-table-column label="作者" prop="user.name"></el-table-column>
      <el-table-column label="所属版块" prop="section.name"></el-table-column>
      <el-table-column label="是否推荐" width="50px">
        <template slot-scope="scope">
          <span v-if="scope.row.recommend">是</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="邮箱" prop="email"></el-table-column>
      <el-table-column label="个性签名" prop="descript"></el-table-column> -->
      <el-table-column label="发表时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="btn-deep-purple" v-if="scope.row.recommend" @click="onRecommend(scope.row.id)">取消推荐</el-button>
          <el-button v-else class="btn-purple" @click="onRecommend(scope.row.id, 1)">推荐</el-button>
          <el-button class="btn-light-red" @click="deleteTopic(scope.row.id)">
            删除
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
export default {
  data () {
    return {
      topicList: [],
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
      this.$form.get('admin/topic',{
        params: {
          page: this.page_params.page,
          size: this.page_params.size,
          name
        }
      }).then(res => {
        if (res.ret) {
          this.topicList = res.data.data
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
    // 删除话题
    deleteTopic (id) {
      this.$confirm(`删除话题会同时删除话题下的评论，你确定要删除吗？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$form.delete(`admin/topic/${id}`).then(res => {
          if (res.ret) {
            this.$notify.success({
              title: '操作成功',
              message: res.msg
            })
            this.getList()
          }
        })
      })
    },
    // 推荐、取消推荐话题
    onRecommend (id) {
      this.$form.put(`admin/topic/recommend/${id}`).then(res => {
        if (res.ret) {
            this.$notify.success({
              title: '操作成功',
              message: res.msg
            })
            this.getList()
          }
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
.admin-topic {
  .search-box {
    margin-bottom: 15px;
    overflow: hidden;
  }
}
</style>

