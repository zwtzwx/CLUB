<template>
  <div class="search-box">
    <my-header @search="onSearch" :query="page_params.query"></my-header>
    <main>
      <ul class="search-list">
        <li class="search-item" v-for="item in topicList" :key="item.id" @click="onTopicDetail(item.id)">
          <div class="meta-row">
            <span class="hot" v-if="item.recommend">推荐</span>
            <span class="username">{{ item.user && item.user.name }}</span>
            <span class="time">2019-01-01</span>
            <!-- <span class="tag">JavaScript</span> -->
          </div>
          <div class="title" v-html="item.title"></div>
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
        <li class="search-item info-search-item">
          <span v-if="more" class="more" @click="getSearchList(true)">加载更多...</span>
          <span v-else class="more-no">——已经到底啦——</span>
        </li>
      </ul>
    </main>
  </div>
</template>
<script>
import MyHeader from '../common/header'
export default {
  components: {
    MyHeader
  },
  data() {
    return {
      page_params: {
        page: 1,
        size: 20,
        query: this.$route.query.query,
      },
      topicList: [],
      total: 0,
      more: false
    }
  },
  created () {
    this.getSearchList()
  },
  methods: {
    // 查询关键字
    onSearch (query = '') {
      if (!query) return
      this.$router.push({ name: 'topicsearch', query: { query } })
    },
    // 根据关键字获话题列表
    getSearchList (page = false) {
      if (page) this.page_params.page++
      this.$form.get('/search', {
        params: { ...this.page_params }
      }).then(res => {
        if (res.ret) {
          res.data.data && this.topicList.push(...res.data.data)
          this.total = res.data.total || 0
          this.page_params.page = res.data.currentPage || 1
          if (this.page_params.page * this.page_params.size < this.total) {
            this.more = true
          } else {
            this.more = false
          }
        }
      })
    },
    onTopicDetail (id) {
      this.$router.push({ name: 'topicdetail', params: { id } })
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.page_params.query = to.query.query
    this.topicList = []
    this.getSearchList()
    next()
  }
}
</script>
<style lang="scss">
@import '@/sass/_variable.scss';
.search-box {
  main {
    width: 710px;
    margin: 30px;
    background-color: #fff;
  }
  mark {
    background: none;
    color: #f00;
  }
  .search-item {
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
  .info-search-item {
    height: auto;
    text-align: center;
  .more {
    color: $main-color;
    text-decoration: underline;
  }
  .more-no {
    color: #b2bac2;
  }
  }
}
</style>
