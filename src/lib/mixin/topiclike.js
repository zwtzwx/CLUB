export default {
  methods: {
    // 点赞、取消点赞
    onTopicLike (item) {
      if (!this.$store.state.user.id) return this.$message.info('请登录后在执行此操作')
       let [method, num, params] = item.isLiked ? ['delete', -1, { params: { topic_id: item.id } }] : ['post', 1, { topic_id: item.id }]
      this.$json[method](`/like`, params).then (res => {
        if (res.ret) {
          item.likesCount += num
          item.isLiked = !item.isLiked
        }
      })
    }
  }
}