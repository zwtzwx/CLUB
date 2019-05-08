<template>
  <div class="admin-section">
    <div class="add-section">
      <add-btn text="添加版块" @click="addSection"></add-btn>
    </div>
    <el-table
    :data="sectionList"
    v-loading="tableLoading"
    stripe
    border>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="版块名" prop="name"></el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.created | formateTime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button class="btn-green" @click="sectionChange(scope.row.id)">修改</el-button>
          <el-button class="btn-light-red">隐藏版块</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
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
import AddBtn from '@/components/addbtn.vue'
export default {
  data () {
    return {
      sectionList: [],
      page_params: {
        page: 1,
        size: 5,
        total: 0
      },
      tableLoading: false
    }
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    AddBtn
  },
  created () {
    this.getList()
  },
  methods: {
    getList () {
      this.tableLoading = true
      this.$form.get('admin/section',{
        params: {
          page: this.page_params.page,
          size: this.page_params.size
        }
      }).then(res => {
        if (res.ret) {
          this.sectionList = res.data.data
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
    // 添加分类
    addSection () {
      this.$router.push({ name: 'sectionadd' })
    },
    // 修改分类
    sectionChange (id) {
      this.$router.push({ name: 'sectionedit', query: { id } })
    }
  }
}
</script>
<style lang="scss">
.admin-section {
  .add-section {
    text-align: right;
  }
  .pagination {
    margin-top: 20px;
    text-align: right;
  }
}
</style>