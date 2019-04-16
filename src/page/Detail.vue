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
          </div>

          <article class="markdown-body">
            <!-- 此处有一个问题，编辑器保存的 markdown 是什么格式的，然后是 markdown 转 html 怎么转 -->
                <h1 id="cmdmarkdown">欢迎使用 Cmd Markdown 编辑阅读器</h1>
                  <hr />
                  <p>我们理解您需要更便捷更高效的工具记录思想，整理笔记、知识，并将其中承载的价值传播给他人，<strong>Cmd Markdown</strong> 是我们给出的答案 —— 我们为记录思想和分享知识提供更专业的工具。 您可以使用 Cmd Markdown：</p>
                  <!-- <blockquote>
                    <ul>
                    <li>整理知识，学习笔记</li>
                    <li>发布日记，杂文，所见所想</li>
                    <li>撰写发布技术文稿（代码支持）</li>
                    <li>撰写发布学术论文（LaTeX 公式支持）</li>
                    </ul>
                  </blockquote>
                  <p><img src="https://www.zybuluo.com/static/img/logo.png" alt="cmd-markdown-logo" /></p>
                  <p>除了您现在看到的这个 Cmd Markdown 在线版本，您还可以前往以下网址下载：</p>
                  <h3 id="windowsmaclinuxhttpswwwzybuluocomcmd"><a href="https://www.zybuluo.com/cmd/">Windows/Mac/Linux 全平台客户端</a></h3>
                  <blockquote>
                    <p>请保留此份 Cmd Markdown 的欢迎稿兼使用说明，如需撰写新稿件，点击顶部工具栏右侧的 <i class="icon-file"></i> <strong>新文稿</strong> 或者使用快捷键 <code>Ctrl+Alt+N</code>。</p>
                  </blockquote> -->
          </article> 

          <div class="comment__header">
            <span>回复</span>
          </div>

          <div class="comment__cell">aaa</div>
            

      </div>

      <!-- 右侧 -->
      <my-right></my-right>
    </main>
    <!-- 底部 toTop 标识 -->
    <to-top></to-top>
  </div>
</template>

<script>
import MyHeader from '@/components/header';
import MyLeft from '@/components/left';
import MyRight from '@/components/right';
import ToTop from '@/components/topbtn';
import 'github-markdown-css';

export default {
  data() {
    return {
      isLogin: false,
    }
  },
  components: {
    MyHeader,
    MyLeft,
    MyRight,
    ToTop
  },
  created () {
    // 初始化获取用户信息
    
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
  .markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
    border-bottom: 30px solid $border-color;
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}

  .comment__header {
    padding: 10px;
    background-color: #fdfdfd;
    border-radius: 3px 3px 0 0;
    border-bottom: 2px solid $border-color;
    }

  .comment__cell {
      box-sizing: border-box;
      height: 100px;
      color: $nav-gray;
      padding: 10px;
      // border-bottom: 20px solid $border-color;
     
      font-size: 14px;
      }
}

</style>

