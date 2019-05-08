<template>
    <div>
        <my-header></my-header>
        <!-- 板块 -->
        <div class="main-box topic-add">
            <el-form  :model="topicContent">
                <!-- 板块 -->
                <el-form-item label="请选择板块：" label-width="100px" prop="plate">
                    <el-select v-model="topicContent.plate" placeholder="清选择">
                        <el-option v-for="item in sections" 
                        :key="item.id"
                        :value="item.id"
                        :label="item.name"></el-option>
                        </el-select>
                </el-form-item>
                <!-- 标题 -->
                <el-form-item prop="title">
                     <el-input v-model="topicContent.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                 <!-- 内容 -->
                <el-form-item prop="content">
                    <mavon-editor
                        ref="md"
                        class="editor"
                        defaultOpen="edit"
                        @imgAdd="imgAdd"
                        v-model="topicContent.content"
                        :toolbars="toolbar"></mavon-editor>
                </el-form-item>
                <!-- 提交 -->
                <el-form-item>
                     <el-button type="primary" @click="saveTopic" :loading="btnLoading">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import 'mavon-editor/dist/css/index.css'
import MyHeader from '../common/header';
import mavonEditor from '@/lib/mixin/mavonedit.js';
import { Select, Option, Upload } from 'element-ui';
export default {
    data() {
        return {
            // 板块数组
            sections: [],
            topicContent: {
                plate: '',
                title: '',
                content: ''
            },
            btnLoading: false
        }
    },
    mixins: [mavonEditor],
    created () {
        this.getSection()
    },
    methods: {
        // 获取板块列表
        getSection () {
            this.$form.get('/section').then(res => {
                if (res.ret) {
                this.sections = res.data || []
                }
            })
        },
        // 发表评论
        saveTopic () {
            this.btnLoading = true;
            this.topicContent['user_id'] = this.$route.params.id;
            this.$json.post('topic', {...this.topicContent}).then(res => {
                if (res.ret) {
                    this.$message({
                        message: res.msg,
                        type: 'success'
                    })
                    this.$router.push({ name: 'home' });
                }
                this.btnLoading = false
            }).finally(() => {
                this.btnLoading = false
            })
        }
    },
    components: {
        MyHeader,
        [Select.name]: Select,
        [Option.name]: Option,
        [Upload.name]: Upload
    }
}
</script>
<style lang="scss">
.topic-add {
    background-color: #fff;
    padding: 20px;
    .editor {
        min-height: 600px;
    }
}
</style>
