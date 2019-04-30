<template>
  <div class="left main-left">
    <!-- 文章分类导航 -->
    <div class="category-nav">
      <ul>
        <li @click="changeSection(item.key)" v-for="item in sections" :key="item.key"
          :class="[item.key === selected && 'select']">{{ item.value }}</li>
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
            <span class="time">{{ item.created | formateDate }}</span>
            <!-- <span class="tag">JavaScript</span> -->
          </div>
          <div class="title">{{ item.title }}</div>
          <div class="about">
            <span class="info">
              <i class="el-icon-view"></i>
              {{ item.scan }}
            </span>
            <span class="info">
              <i class="iconfont icon-liuyan" style="top: 2px"></i>
              {{ item.comment }}
            </span> 
          </div>
        </li>

        <li class="article-item">
          <el-pagination
          class="pagination"
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
      sections: [
        {
          key: 0,
          value: '全部'
        },
        {
          key: 1,
          value: '分享'
        },
        {
          key: 2,
          value: '问答'
        },
        {
          key: 3,
          value: '招聘'
        }
      ],
      selected: 0
    }
  },
  created() {
    this.getTopicList()
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
    i {
      font-size: 18px;
      position: relative;
      top: 1px;
      font-weight: 700;
    }
  }
  .info {
    margin-right: 10px;
    // font-weight: 700;
  }
}
</style>


