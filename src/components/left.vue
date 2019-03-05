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
        <li class="article-item" v-for="item in 20" :key="item">
          <div class="title">TypeScript 初学</div>
          <div class="meta-row">
            <span class="hot">推荐</span>
            <span class="username">sponing</span>
            <span class="time">6天前</span>
            <span class="tag">JavaScript</span>
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


