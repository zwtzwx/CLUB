<template>
  <div>
    <!-- 头部 -->
    <my-header></my-header>
    <main class="main-box">
      <!-- 左侧 -->
      <div class="wrapper">
          <div class="topic-nav">
            
            <span class="topic_full_title">
            <span class="put_top">置顶</span>服务器迁移至 aws 日本机房</span>
            <div class="changes">
            <span>发布于 5 个月前</span>
            <span>作者 <a href="/user/alsotang">alsotang</a></span>
            <span>20540 次浏览</span>
            <span> 来自 分享</span>
            <input class="span-common span-success pull-right collect_btn" type="submit" value="收藏" action="collect">
            </div>
            <div id="manage_topic"></div>
            <!-- zIndex 显示的先后顺序，越大越会被显示 -->
          </div>
                    <button @click="markdown2Html">To HTML</button>

          <markdown-editor id="contentEditor" ref="contentEditor" v-model="content" :height="300" :zIndex="20"></markdown-editor>

      </div>
      <!-- 右侧 -->
      <my-right></my-right>
    </main>
    <!-- 底部 toTop 标识 -->
    <to-top></to-top>
  </div>
</template>

<script>
import showDown from 'showdown';

import MyHeader from '@/components/header';
import MyLeft from '@/components/left';
import MyRight from '@/components/right';
import ToTop from '@/components/topbtn';
import MarkdownEditor from '@/components/simpleMDE';

const content = `
**this is test**
1. markdown
2. editor
## Simplemde
[link](https://www.baidu.com) 
![图片](https://i.imgur.com/sZlktY7.png)
`
export default {
    components: {
    MyHeader,
    MyLeft,
    MyRight,
    ToTop,
    MarkdownEditor
  },
  data () {
    return {
      isLogin: false,
      content: content,
      html: ''
    }
  },
  methods: {
       markdown2Html() {
        const converter = new showDown.Converter()
        this.html = converter.makeHtml(this.content)
        console.log(this.html)
      }
  }
}

</script>

<style lang="scss">
@import '../sass/_variable.scss';
@import '../sass/comment.scss';
main {
  overflow: hidden;
}
.panel .header.topic_header, .panel .inner {
    background-color: #fff;
}
.header {
    padding: 10px;
    background-color: #f6f6f6;
    border-radius: 3px 3px 0 0;
}
.topic_full_title {
    font-size: 22px;
    font-weight: 700;
    margin: 8px 0;
    display: inline-block;
    vertical-align: bottom;
    width: 75%;
    line-height: 130%;
}
.put_good, .put_top {
    background: #80bd01;
    padding: 2px 4px;
    border-radius: 3px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -o-border-radius: 3px;
    color: #fff;
    font-size: 12px;
}
.changes {
    font-size: 12px;
    color: #838383;
}
.changes span:before {
    content: "•";
}
.span-success {
    border-radius: 3px;
    background-color: #80bd01;
}
.pull-right {
    float: right;
}
.wrapper {
  background-color: #fff;
  float: left;
  width: calc(100% - 290px);
  .topic-nav {
    box-sizing: border-box;
    height: 100px;
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
}
</style>