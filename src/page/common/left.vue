<template>
  <div class="left main-left">
    <!-- 文章分类导航 -->
    <div class="category-nav">
      <ul>
        <li @click="changeSection(item.id)" v-for="item in sections" :key="item.id"
          :class="[item.id === selected && 'select']">{{ item.name }}</li>
        <!-- <li>全部</li>
        <li>推荐</li>
        <li>问答</li>
        <li>招聘</li> -->
      </ul>
    </div>
    <!-- 文章显示 -->
    <div class="article-list">
      <ul>
        <li class="article-item" 
          v-for="item in topicList" :key="item.id"
          @click="onTopicDetail(item.id)">
          <div class="meta-row">
            <span class="hot" v-if="item.recommend">推荐</span>
            <span class="username">{{ item.user.name }}</span>
            <span class="time">{{ item.created | formateTime }}</span>
            <!-- <span class="tag">JavaScript</span> -->
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="about">
            <span :class="['info', { liked: item.isLiked }]" @click.stop="onTopicLike(item)">
              <i class="iconfont icon-dianzan"></i>
              {{ item.likesCount ? item.likesCount : '' }}
            </span>
            <span class="info">
              <i class="iconfont icon-pinglun"></i>
              {{ item.comment }}
            </span> 
          </div>
        </li>

        <li class="article-item">
          <el-pagination
          class="pagination"
          @current-change="handleCurrentChange"
          layout="prev, pager, next, total, jumper"
          :current-page="page_params.page"
          :page-size="page_params.size"
          :total="page_params.total">
        </el-pagination>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      topicList: [],
      page_params: {
        page: 1,
        size: 20,
        section: '',
        total: 0
      },
      sections: [],
      selected: 0
    }
  },
  created() {
    this.getSection()
    this.getTopicList()
  },
  methods: {
    // 获取板块列表
    getSection () {
      this.$form.get('/section').then(res => {
        if (res.ret) {
          this.sections = res.data || []
          this.sections.unshift({ id: 0, name: '全部'})
        }
      })
    },
    // 获取话题列表，默认获取 `全部` 下的话题
    getTopicList () {
      this.$form.get(`topic`, {
        params: {
          page: this.page_params.page,
          size: this.page_params.size,
          section: this.page_params.section
        }
      }).then(res => {
        if (res.ret) {
          this.page_params.total = res.data.total || 0
          this.page_params.page = Number.parseInt(res.data.currentPage) || 1
          this.topicList = res.data.data
        }
      })
    },
    // 话题详情
    onTopicDetail (topicID) {
      this.$router.push({ name: 'topicdetail', params: { id: topicID } })
    },
    // 选择板块
    changeSection (sectionID) {
      if (this.selected === sectionID) return
      this.selected = sectionID
      if (sectionID !== 0) {
        this.page_params.section = sectionID
      } else {
        this.page_params.section = ''
      }
      this.getTopicList()
    },
    handleCurrentChange (page) {
      this.page_params.page = page
      this.getTopicList()
    },
    // 点赞、取消点赞
    onTopicLike (item) {
      if (!this.$store.state.user.id) return this.$message.info('请登录后在执行此操作')
       let [method, num, params] = item.isLiked ? ['delete', -1, { params: { topic_id: item.id } }] : ['post', 1, { topic_id: item.id }]
      this.$json[method](`/like`, params).then (res => {
        if (res.ret) {
          item.likesCount += num
          item.isLiked = !item.isLiked
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/sass/_variable.scss';
.left {
  .category-nav {
    box-sizing: border-box;
    height: 50px;
    color: $nav-gray;
    padding: 10px;
    border-bottom: 1px solid $border-color;
    ul {
      display: flex;
      height: 100%;
      align-items: center;
      li {
        font-size: 14px;
        margin: 0 10px;
        padding: 5px 10px;
        cursor: pointer;
        &.select {
          color: #007fff;
        }
        &:hover {
          color: #007fff;
        }
      }
    }
  }
  .article-item {
    height: 80px;
    padding: 10px 20px;
    border-bottom: 1px solid $border-color;
    cursor: pointer;
    .title {
      color: $title-color;
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 10px;
      &:hover {
        text-decoration: underline;
      }
    }
    .meta-row {
      color: #b2bac2;
      font-size: 14px;
      line-height: 23px;
      .hot {
        color: red;
      }
      span {
        // padding-right: 10px;
        &:not(:last-child)::after {
          content: "·";
          color: #b2bac2;
          margin: 0 3px;
        }
      }
      
    }
  }
  .selected {
    color: $main-color;
  }
  .pagination {
    margin-top: 10px;
  }
  .about {
    color: #b2bac2;
    font-size: 0;
    i {
      font-size: 16px;
      position: relative;
      top: 1px;
    }
  }
  .info {
    display: inline-block;
    padding: 2px 9px;
    font-size: 14px;
    border: 1px solid #edeeef;
  }
}
</style>


