<template>
  <div class="left">
    <!-- 文章分类导航 -->
    <div class="category-nav">
      <ul>
          <router-link
            v-for="category in categories"
            :to="{path: category.path}"
            :key="category.name"
            tag="li"
            class="nav-item"
            active-class="nav-item_status_active">
            {{ category.name }}
          </router-link>
        </ul>
    </div>
    <!-- 文章显示 -->
    <router-view :categories="categories"></router-view>
  </div>
</template>
<script>
import MyContent from './content'

export default {
  name: 'left',
  components: { MyContent },
  data () {
    return {
      categories: [
        {
          name: '全部',
          path: 'home',
          active: false
        },
        {
          name: '推荐',
          path: 'recommend',
          active: false
        },
        {
          name: '问答',
          path: 'question',
          active: false
        },
        {
          name: '招聘',
          path: 'resume',
          active: false
        }
      ]
    }
  },
  computed: {
    // productIcon () {
    //   // console.log(this.$route.path, this.imgMap) //debug
    //   return this.imgMap[this.$route.path]
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


