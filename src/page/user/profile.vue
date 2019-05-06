<template>
  <div class="profile">
    <my-header></my-header>
    <main class="main-box">
      <section class="user-box">
        <p class="title user-title">主页</p>
        <div class="user-info">
          <img :src="avatar" :title="userInfo.name" style="width: 50px">
          <span class="name">{{ userInfo.name }}</span>
          <p>{{ userInfo.integral }} 积分</p>
          <p class="descript">"{{ userInfo.descript }}"</p>
          <p style="color: #888">加入时间：{{ userInfo.created }}</p>
        </div>
      </section>
      <section class="topic-created">
        <p class="title user-title" style="margin-bottom: 0">最近创建的话题</p>
        <ul v-if="topicList.length">
          <li v-for="item in topicList" :key="item.id" class="topic-item">
            <div class="title" @click="onDetail(item.id)">{{ item.title }}</div>
            <div>
              <span class="info">
                <span class="comment" title="评论数">{{ item.comment }}</span>/<span title="浏览数">{{ item.scan }}</span>
              </span>
              <span class="float-right">{{ item.created | formateCreated }}</span>
            </div>
          </li>
          <li class="topic-item more" v-if="more" @click="getTopics(true)">查看更多>></li>
        </ul>
        <div v-else class="topic-item">无话题</div>
      </section>
    </main>
    <!-- <my-right></my-right> -->
    <!-- <div class="main-right"></div> -->
  </div>
</template>
<script>
import MyHeader from '../common/header.vue'
import { avatarURL } from '@/lib/axios/base_url.js'
export default {
  data () {
    return {
      userInfo: {
        id: '',
        name: '',
        avatar: '',
        descript: '',
        integral: 0,
        created: ''
      },
      pageParams: {
        page: 1,
        size: 1,
        total: 0
      },
      topicList: [],
      more: false
    }
  },
  components: {
    MyHeader
  },
  created() {
    this.getUser()
    this.getTopics()
  },
  methods: {
    // 获取用户信息
    getUser () {
      this.$form.get('/user/user-info', {
        params: {
          name: this.$route.params.username
        }
      }).then(res => {
        if (res.ret) {
          this.userInfo.id = res.data.id
          this.userInfo.name = res.data.name
          this.userInfo.avatar = res.data.pic
          this.userInfo.integral = res.data.integral || 0
          this.userInfo.descript = res.data.descript
          this.userInfo.created = this.formateDate(res.data.created)
        }
      })
    },
    // 获取用户创建的话题
    getTopics (more = false) {
      if (more) this.pageParams.page++
      this.$form.get(`user/topics`, {
        params: {
          page: this.pageParams.page,
          size: this.pageParams.size,
          name: this.$route.params.username
        }
      }).then(res => {
        if (res.ret) {
          this.pageParams.total = res.data.total
          this.pageParams.page = res.data.currentPage || 1
          res.data.topic_list && this.topicList.push(...res.data.topic_list)
          console.log(this.topicList)
          if (this.pageParams.page * this.pageParams.size < this.pageParams.total) {
            this.more = true
          }else {
            this.more = false
          }
        }
      })
    },
    formateDate (value) {
      if (!value) return ''
      let dateList = value.split('T')[0].split('-')
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
    // 话题详情
    onDetail (id) {
      this.$router.push({ name: 'topicdetail', params: { id } })
    }
  },
  computed: {
    avatar () {
      if (this.userInfo.avatar) {
        return `${avatarURL}/${this.userInfo.avatar}`
      }else {
        return '../../asset/images/default-avatar.svg'
      }
    }
  },
  filters: {
    formateCreated (value) {
      if (!value) return ''
      console.log(value, 111)
      let dateList = value.split('T')[0].split('-')
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
  }
}
</script>
<style lang="scss">
.profile {
  color: #333;
  .user-box, .topic-created {
    background-color: #fff;
    border-radius: 4px;
  }
  .topic-created {
    margin-top: 30px;
  }
  .user-info {
    padding: 10px 30px;
    .name {
      vertical-align: top;
      color: #778087;
      margin-left: 15px;
    }
  }
  .topic-item {
    padding: 10px 10px 10px 30px;
    font-size: 14px;
    line-height: 25px;
    border-top: 1px solid #f0f0f0;
    .title {
      color: #0088CC;
      cursor: pointer;
      &:hover {
        color: #409EFF;
        text-decoration: underline;
      }
    }
    .info {
      font-size: 12px;
    }
    .comment {
      color: palevioletred;
    }
    &.more {
      color: #666;
      cursor: pointer;
    }
  }
}

</style>

