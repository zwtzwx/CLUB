<template>
  <div class="left">
    <!-- 文章分类导航 -->
    <div class="category-nav">
      <ul>
        <li>全部</li>
        <li>推荐</li>
        <li>问答</li>
        <li>招聘</li>
      </ul>
    </div>
    <!-- 文章显示 -->
    <div class="article-list">
      <ul>
        <li class="article-item" v-for="item in topicList" :key="item.id">
          <div class="title">{{ item.title }}</div>
          <div class="meta-row">
            <span class="hot" v-if="item.recommend">推荐</span>
            <span class="username">{{ item.user.name }}</span>
            <span class="time">6天前</span>
            <!-- <span class="tag">JavaScript</span> -->
          </div>
          <!-- 留言 -->
          <div class="count">

          </div>
        </li>

        <li class="article-item">
          <el-pagination
          background
          class="pagination"
          layout="prev, pager, next"
          :page-size="page_params.size"
          :total="100">
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
        page: '',
        size: 20,
        section: '',
        total: 0
      }
    }
  },
  created() {
    this.getTopicList();
  },
  methods: {
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
          this.topicList = res.data.data
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '../sass/_variable.scss';
@import '../sass/comment.scss';
.left {
  background-color: #fff;
  float: left;
  width: calc(100% - 290px);
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
        margin: 0 10px;
      }
    }
  }
  .article-item {
    height: 60px;
    padding: 10px;
    border-bottom: 1px solid $border-color;
    cursor: pointer;
    .title {
      color: $title-color;
      font-size: 17px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .meta-row {
      color: #b2bac2;
      font-size: 14px;
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
}
</style>


