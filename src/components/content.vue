<template>
  <div class="left">
    <!-- 文章显示 -->
    <div class="article-list">
      <ul>
        <li class="article-item" v-for="post in posts" :key="post.id">
          <div class="title">{{ post.post_title }}</div>
          <div class="meta-row">
            <span class="hot">推荐</span>
            <span class="username">{{ 'user ' + post.user_id }}</span>
            <span class="time">6天前</span>
            <span class="tag">JavaScript</span>
          </div>
          <!-- 留言 -->
          <div class="count">

          </div>
        </li>
        <!-- 占位符的了解还不够 -->
        <!-- <p>{{ categories }}</p> -->

        <li class="article-item">
          <el-pagination
          background
          class="pagination"
          layout="prev, pager, next"
          :page-size="20"
          :total="100">
          </el-pagination>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>

export default {
  name: 'my-content',
  data () {
    return {
      posts: [],
      total: 0,
    }
  },
  // 父组件传递过来的 prop 属性
  props: ['categories'],
  // 组件创建时触发
  created: function () {
    console.log('确实创建了')
    console.log(this.cate)
    this.$json.get('/post')
    .then((res) => {
      this.posts = res.data.data
      this.total = res.data.total
      console.log(this.posts)
    }, (err) => {
      console.log(err)
    })
  },
  watch: {
    // 复用组件生命周期钩子不再适用，需要用到监听属性监听路由
    // [vue-router 官方文档](https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html)
    '$route' (to, from) {
      // 判断路由是否是去向分类详情--应该没必要，如果去往别处，此组件将不再复用，即次监听属性的意义不复存在
      if (true) {}

      this.$json.get('/post')
        .then((res) => {
          this.posts = res.data.data
          this.total = res.data.total
          console.log('监听属性生效')
        }, (err) => {
          console.log(err)
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
      .nav-item {
        color: #90979c;
        font-size: 16px;
      }
      .nav-item:hover {
        color: #3F7FBF;
      }
      .nav-item_status_active {
        color: #3F7FBF;
        border-bottom: 2px solid #3F7FBF;
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


