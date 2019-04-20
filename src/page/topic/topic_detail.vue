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
            </div>
            <div class="main-right">

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
            }
        }
    },
    created() {
        this.getTopicDetail()
    },
    methods: {
        getTopicDetail() {
            this.$form.get(`topic/${this.$route.params.id}`).then(res => {
                if (res.ret) {
                    this.author.id = res.data.user.id
                    this.author.name = res.data.user.name
                    this.author.pic = res.data.user.pic || ''
                    this.author.descript = res.data.user.descript || ''
                    this.article.title = res.data.title
                    this.article.content = res.data.content
                    this.article.scan = res.data.scan || 0
                    this.article.createdAt = this.formateDate(res.data.created)
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
}
</style>
