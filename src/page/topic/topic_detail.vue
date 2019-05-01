<template>
    <div class="topic-detail">
        <my-header></my-header>
        <main class="main-box">
            <div class="main-left article">
                <div class="author-info-block">
                    <a href="#" target="_blank" class="author-avatar" 
                    style="background-image: url('../../asset/images/default-avatar.svg')">
                    </a>
                    <div>
                        <a href="#" target="_blank" class="author-name">{{ author.name }}</a>
                        <div class="meta-box">{{ article.createdAt }} 浏览 {{ article.scan }}</div>
                    </div>
                </div>
                <h1>{{ article.title }}</h1>
                <mavon-editor v-model="article.content"
                class="md-editor"
                :toolbarsFlag="false"
                :subfield="false"
                defaultOpen="preview">
                </mavon-editor>

                <!-- 评论 -->
                <div class="comment-box">
                    <div class="title">评论</div>
                    <div class="publish">
                        <div class="avatar-box">
                            <img src="../../asset/images/default-avatar.svg" alt="" class="avatar-img">
                        </div>
                        <div class="rich-input">
                            <el-input type="textarea" autosize 
                                placeholder="输入评论..."
                                class="comment"
                                @focus="showAddBtn"
                                @blur="addBtn = false"
                                v-model="comment_params.content"></el-input>
                        </div>
                    </div>
                    <div class="add-btn" v-show="addBtn">
                        <el-button type="primary" size="small" @click="onComment">发表评论</el-button>
                    </div>
                    <div class="comment-list">
                        <div class="comment-item">
                            <div class="user-avatar">
                                <img src="../../asset/images/default-avatar.svg" alt="" class="avatar-img">
                            </div>
                            <div class="comment-meta">
                                <div class="meta-data">xl_code（作者）</div>
                                <div class="content">在性能够好的机子上，idea确实更方便一些</div>
                                <div class="comment-sub-box">
                                    <div class="time">20小时前</div>
                                    <div class="commit-action">
                                        <div class="like-action">
                                            <img src="../../asset/images/zan.svg" alt="">
                                            1
                                        </div>
                                        <div class="comment-action">
                                            <span>
                                                <img src="../../asset/images/comment.svg" alt="">
                                                回复
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-right">
                <!-- 作者信息 -->
                <div class="author-box">
                    <div class="title">关于作者</div>
                    <div class="author-info">
                        <div class="author-avatar">
                            <img src="../../asset/images/default-avatar.svg" alt="">
                        </div>
                        <div class="author-name">{{ author.name }}</div>
                    </div>
                    <div class="descript">{{ author.descript || '"这个人什么也没留下！"' }}</div>
                </div>
                <!-- 作者文章   -->
                <div class="author-article">
                    <div class="title">作者文章</div>
                    <ul class="articles">
                        <li v-for="item in articleList" :key="item.id">
                            <div>{{ item.title }}</div>
                            <div class="article-comment">
                                <i class="iconfont icon-liuyan"></i>
                                <span>{{ item.comment }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
// import 'mavon-editor/dist/css/index.css'
import MyHeader from '../common/header'
export default {
    data() {
        return {
            article: {
                id: '',  // 文章 ID
                content: '',  // 文章内容
                title: '',  // 文章标题
                scan: 0,  // 文章浏览数
                createdAt: ''  // 文章发表时间
            },
            author: {
                id: '',  // 作者 id
                name: '',  // 作者名
                pic: '',  // 作者头像
                descript: ''  // 作者个性签名
            },
            articleList: [],
            comment_params: {
                content: '',  // 评论内容
                userID: this.$store.state.user.id || localStorage.getItem('SUID') || ''
            },
            addBtn: false
        }
    },
    created() {
        this.getTopicDetail()
    },
    methods: {
        // 获取话题详情
        getTopicDetail() {
            this.$form.get(`topic/${this.$route.params.id}`).then(res => {
                if (res.ret) {
                    this.author.id = res.data.topic.user.id
                    this.author.name = res.data.topic.user.name
                    this.author.pic = res.data.topic.user.pic || ''
                    this.author.descript = res.data.topic.user.descript || ''
                    this.article.id = res.data.topic.id
                    this.article.title = res.data.topic.title
                    this.article.content = res.data.topic.content
                    this.article.scan = res.data.topic.scan || 0
                    this.article.createdAt = this.formateDate(res.data.topic.created)
                    this.articleList = res.data.articles || []
                }
            })
        },
        formateDate (dateStr) {
            let dateList = dateStr.split('T')[0].split('-')
            if (dateList[1].indexOf('0') === 0) {
                dateList[1] = dateList[1].slice(1)
            }
            if (dateList[2].indexOf('0') === 0) {
                dateList[2] = dateList[2].slice(1)
            }
            dateList.splice(1, 0, '年')
            dateList.splice(3, 0, '月')
            dateList.push('日')
            return dateList.join('')
        },
        // 发表评论
        onComment () {
            if (!this.comment_params.content) return
            this.$json.post('comment', {
                topicID: this.article.id,
                userID: this.comment_params.userID,
                content: this.comment_params.content
            }).then(res => {
                if (res.ret) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                }
                this.$router.go(0)
            })
        },
        // 评论框获取焦点时显示发表按钮
        showAddBtn () {
            this.addBtn = true
        }
    },
    components: {
        MyHeader
    }
}
</script>
<style lang="scss">
.topic-detail {
    .article {
        padding: 20px;
    }
    .author-info-block {
        display: flex; 
        margin-bottom: 20px; 
    }
    .author-avatar {
        width: 50px;
        margin-right: 10px;
        background-repeat: no-repeat;
        background-size: cover;
    }
    .author-name {
        text-decoration: none;
        font-size: 18px;
        font-weight: 700;
        color: #333;
    }
    .meta-box {
        color: #909090;
        font-size: 15px;
    }
    .v-show-content {
        padding: 0 !important;
        background-color: #fff !important;
    }
    .v-note-panel.shadow {
        box-shadow: none !important;
    }
    .author-box {
        background-color: #fff;
        .author-info {
            padding: 10px;
            display: flex;
        }
        .descript {
            padding: 0 10px 10px 10px;
        }
    }
    .author-article {
        margin-top: 20px;
        background-color: #fff;
        li {
            padding: 10px 15px;
            cursor: pointer;
            line-height: 24px;
            &:hover {
                background-color: #fbfbfb;
            }
        }
        .article-comment {
            color: #555; 
        }
    }
    .author-box, .author-article {
        .title {
            padding: 10px;
            font-size: 14px;
            border-bottom: 1px solid rgba(150, 150, 150, .1);
        }
    }
    .comment-box {
        .title {
            padding: 20px 0;
            text-align: center;
            color: #8A9AA9;
        }
        .publish {
            padding: 15px;
            display: flex;
            background-color: #fafbfc;
            border-radius: 4px;
            margin: 15px 0;
        }
        .avatar-img {
            border-radius: 50%;
        }
        textarea {
            min-height: 36px !important;
            margin-left: 10px;
            width: 500px;
            resize: none;
        }
    }
    .comment-list {
        margin-left: 45px;
    }
    .comment-item {
        display: flex;
        font-size: 14px;
        .comment-meta {
            flex: 1 1 auto;
            margin-left: 15px;
        }
        .comment-sub-box {
            display: flex;
            color: #8A93A0;
        }
        .commit-action {
            display: flex;
            flex: 0 0 auto;
            justify-content: space-between;
            margin-left: auto;
            min-width: 100px;
        }
        .content {
            margin: 8px 0;
            color: #505050;
        }
    }
    .add-btn {
        text-align: right;
    }
}
</style>
