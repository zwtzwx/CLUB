<template>
    <div class="topic-detail">
        <my-header></my-header>
        <main class="main-box">
            <div class="main-left article">
                <div class="author-info-block">
                    <a :href="`#/user/${author.name}`" target="_blank" class="author-avatar" >
                        <img :src="avatar" alt="avatar" style="width: 100%">
                    </a>
                    <div>
                        <a :href="`#/user/${author.name}`" target="_blank" class="author-name">{{ author.name }}</a>
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
                    <div class="title">评论({{ commentTotal }})</div>
                    <div class="comment-list">
                        <div class="comment-item" v-for="(item, index) in commentList" :key="item.id">
                            <div class="comment-info-box">
                                <div class="user-avatar">
                                    <img src="../../asset/images/default-avatar.svg" alt="" class="avatar-img">
                                </div>
                                <div class="comment-meta">
                                    <div class="meta-data">{{ item.user.name }}{{ item.user.id === author.id ? '（作者）' : '' }}</div>
                                    <div class="content">
                                        <el-popover
                                        v-if="item.parent_id" 
                                        placement="left"
                                        width="300"
                                        trigger="hover"
                                        @show="getDialogue(item.parent_id)"
                                        title="对话">
                                        <div class="dialogue-box">
                                            <div class="dialogue-item" v-for="ele in dialogueList" :key="ele.id">
                                                <p style="margin: 3px 0; color: #0366D6">{{ ele.user.name }}</p>
                                                <mavon-editor v-model="ele.content"
                                                :boxShadow="false"
                                                :toolbarsFlag="false"
                                                :subfield="false"
                                                defaultOpen="preview">
                                                </mavon-editor>
                                            </div>
                                        </div>   
                                        <a :href="`#/user/${item.user.name}`" target="_blank" slot="reference" class="reply-user">@{{ item.user.name }}</a>
                                        </el-popover>
                                        <mavon-editor v-model="item.content"
                                        class="md-comment"
                                        :toolbarsFlag="false"
                                        :subfield="false"
                                        defaultOpen="preview">
                                        </mavon-editor>
                                    </div>
                                    <div class="comment-sub-box">
                                        <div class="time">20小时前</div>
                                        <div class="commit-action">
                                            <div :class="['like-action', { liked:  item.isLiked}]" @click="onLike(item)">
                                                <i class="iconfont icon-dianzan"></i>
                                                {{ item.likesCount ? item.likesCount : '' }}
                                            </div>
                                            <div class="comment-action" @click.stop="item.show = !item.show">
                                                <i class="iconfont icon-icon_reply"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="reply" v-show="item.show">
                                <mavon-editor
                                class="editor"
                                defaultOpen="edit"
                                :boxShadow="false"
                                @imgAdd="imgAdd"
                                v-model="item.replyContent"
                                :toolbars="commentToolBar"></mavon-editor>
                                <div class="add-btn">
                                    <el-button class="comment-btn" type="primary" size="small" :loading="btnLoading" @click="onComment(item.id, index)">回复</el-button>
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
                            <img :src="avatar" alt="avatar" style="width: 100%">
                        </div>
                        <div class="author-name">{{ author.name }}</div>
                    </div>
                    <div class="descript" style="font-style: italic">{{ author.descript || '"这个人什么也没留下！"' }}</div>
                </div>
                <!-- 作者文章   -->
                <div class="author-article">
                    <div class="title">作者文章</div>
                    <ul class="articles">
                        <li v-for="item in articleList" :key="item.id">
                            <div>{{ item.title }}</div>
                            <div class="article-comment">
                                <span style="margin-right: 10px"><i class="iconfont icon-dianzan"></i> {{ item.comment }}</span>
                                <span><i class="iconfont icon-pinglun"></i> {{ item.comment }}</span>
                            </div>
                        </li>
                    </ul>
                </div>
                <!-- 文章信息 -->
                <div class="article-meta">
                    <el-badge :value="1" type="primary">
                        <div class="like-box meta-box">
                            <i class="iconfont icon-dianzan"></i>
                        </div>
                    </el-badge>
                    <br>
                    <el-badge :value="commentTotal" type="primary">
                        <div class="reply-box meta-box">
                            <i class="iconfont icon-pinglun"></i>
                        </div>
                    </el-badge>
                </div>
            </div>
            <div class="publish main-left">
                <p class="title">添加评论</p>
                <div class="rich-input">
                    <mavon-editor
                        ref="md"
                        class="editor"
                        defaultOpen="edit"
                        :boxShadow="false"
                        @imgAdd="imgAdd"
                        v-model="comment_params.content"
                        :toolbars="commentToolBar"></mavon-editor>
                    <div class="add-btn">
                        <el-button type="primary" class="comment-btn" size="small" :loading="btnLoading" @click="onComment()">添加评论</el-button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>
<script>
import 'mavon-editor/dist/css/index.css'
import mavonEditor from '@/lib/mixin/mavonedit.js'
import MyHeader from '../common/header'
import { avatarURL } from '@/lib/axios/base_url.js'
import { Popover, Badge } from 'element-ui'
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
            addBtn: false,
            commentList: [],
            commentTotal: 0,
            btnLoading: false,
            dialogueList: []
        }
    },
    mixins: [mavonEditor],
    created() {
        this.getTopicDetail()
        this.getCommentsList()
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
        // 获取评论列表
        getCommentsList () {
            this.$form.get('/comment', {
                params: {
                    topic_id: this.$route.params.id
                }
            }).then(res => {
                if (res.ret) {
                    this.commentTotal = res.data.total || 0
                    res.data.data.forEach(item => {
                        item.show = 0
                        item.replyContent = ''
                    })
                    this.commentList = res.data.data || []
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
        onComment (parentID = '', index) {
            console.log(parentID)
            let content = parentID ? this.commentList[index].replyContent : this.comment_params.content
            if (!content) return
            if (!this.comment_params.userID) {
                this.$message({
                    message: '请登录后在执行此操作',
                    type: 'info'
                })
                return
            }
            this.btnLoading = true
            this.$json.post('comment', {
                topicID: this.article.id,
                userID: this.comment_params.userID,
                content,
                parentID
            }).then(res => {
                if (res.ret) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                }
                this.btnLoading = false
                this.$router.go(0)
            }).finally(() => {
                this.btnLoading = false
            })
        },
        // 显示某一评论下的所有回复对话
        getDialogue (parentID) {
            this.dialogueList = []
            let length = this.commentList.length
            while(parentID != 0) {
                for(let i=0; i<length; i++) {
                    let item = this.commentList[i]
                    if (item.id == parentID) {
                        this.dialogueList.unshift(item)
                        parentID = item.parent_id
                        break
                    }
                }
            }
        },
        // 点赞
        onLike (commentItem) {
            if (!this.comment_params.userID) {
                this.$message({
                    message: '请登录后在执行此操作',
                    type: 'info'
                })
                return
            }
            // 如果已点赞，则取消点赞，否则点赞
            let [mothod, num, params] = commentItem.isLiked ? ['delete', -1, { params: { comment_id: commentItem.id } }] : ['post', 1, { comment_id: commentItem.id, topic_id: this.article.id }]
            this.$json[mothod]('/like', params).then(res => {
                if (res.ret) {
                    commentItem.isLiked = !commentItem.isLiked
                    commentItem.likesCount = commentItem.likesCount + num
                }
            })
        }
    },
    computed: {
        avatar () {
            if (this.author.pic) {
                return `${avatarURL}/${this.author.pic}`
            } else {
                return '../../asset/images/default-avatar.svg'
            }
        }
    },
    components: {
        MyHeader,
        [Popover.name]: Popover,
        [Badge.name]: Badge
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
    }
    .comment-item {
        font-size: 14px;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
        .comment-info-box {
            display: flex;
        }
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
        }
        .like-action, .commit-action {
            cursor: pointer;
        }
    }
    .add-btn {
        text-align: right;
    }
    .comment-btn {
        margin-top: 10px
    }
    .publish {
        margin: 30px 0;
        padding: 10px;
        .title {
            font-size: 14px;
            color: #555;
            line-height: 31px;
            // border-bottom: 1px solid #fafbfc;
        }
    }
    .md-comment {
        min-height: auto;
        color: #505050;
        font-size: 14px;
    }
    .reply {
        margin: 10px 0 0 46px;
        .editor {
            min-height: 200px;
        }
    }
    .reply-user {
        color: #0366D6;
        text-decoration: none;
    }
    .article-meta {
        margin-top: 30px;
        color: #8A93A0;
        .meta-box {
            padding: 10px 12px;
            background-color: #fff;
            border-radius: 50%;
            margin-bottom: 15px;
            cursor: pointer;
        }
        i {
            font-size: 18px;
        }
        .el-badge__content {
            top: 3px;
            right: 15px;
        }
    }
}
.dialogue-item {
    padding: 5px 0; 
    border-top: 1px solid #eee;
    .markdown-body {
        min-height: auto;
        font-size: 14px;
    }
    .v-note-panel {
        border: none !important;
    }
    .v-show-content {
        background: #fff !important;
        padding: 3px 0 !important;
        p {
            margin-bottom: 0;
        }
    }
}
</style>
