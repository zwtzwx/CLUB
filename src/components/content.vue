<template>
  <div class="left">
    <!-- 文章显示 -->
    <div class="article-list">
      <ul>
        <router-link
            v-for="post in posts" 
            :to="{path: 'detail/' + post.id}"
            :key="post.id"
            tag="li"
            class="article-item">
            <div class="title">{{ post.post_title }}</div>
            <div class="meta-row">
              <span v-if="post.is_hot" class="hot">推荐</span>
              <span v-else class="usual">普通</span>

              <span class="username">{{ 'user ' + post.user_id }}</span>
              <span class="time">6天前</span>
              <span class="tag">{{ post.tag }}</span>
            </div>
            <!-- 留言 -->
            <div class="count"></div>
            
          </router-link>

        <!-- 占位符的了解还不够 -->
        <!-- <p>{{ categories }}</p> -->

        <li class="article-item">
          <el-pagination
          background
          class="pagination"
          layout="prev, pager, next"
          :page-size="10"
          :total="total"
          @current-change="changePage"
          >
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
      page: 1,
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
      this.page = res.data.page
      console.log(this.posts)
    }, (err) => {
      console.log(err)
    })
  },
  methods: {
    changePage(page) {
      console.log('当前切换的页码为：', page)
      this.$json.get('/post', {
        params: {
          page: page
        }
      })
        .then((res) => {
          this.posts = res.data.data
          this.total = res.data.total
          this.page = res.data.page
          console.log(this.posts)
          console.log('监听页码生效')
        }, (err) => {
          console.log('监听页码失败')
          console.log(err)
        })
    }
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
          this.page = res.data.page
          console.log('监听路由生效')
        }, (err) => {
          console.log('监听路由失败')
          console.log(err)
        })
    },
    // 如果 `page` 发生改变，这个函数就会运行
    //TODO: 此方法不对
    // page (val) {
    //   this.$json.get('/post', {
    //     param: {
    //       page: this.page
    //     }
    //   })
    //     .then((res) => {
    //       this.posts = res.data.data
    //       this.total = res.data.total
    //       this.page = res.data.page
    //       console.log('监听页码生效')
    //     }, (err) => {
    //       console.log('监听页码失败')
    //       console.log(err)
    //     })
    // }
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
      .usual {
        color: #b2bac2;
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


