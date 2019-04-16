<template>
    <div>
        <my-header></my-header>
        <!-- 板块 -->
        <div class="main-box topic-add">
            <el-form  :model="topicContent">
                <!-- 板块 -->
                <el-form-item label="请选择板块：" label-width="100px" prop="plate">
                    <el-select v-model="topicContent.plate" placeholder="清选择">
                        <el-option v-for="item in plateList" 
                        :key="item.value"
                        :value="item.value"
                        :label="item.label"></el-option>
                        </el-select>
                </el-form-item>
                <!-- 标题 -->
                <el-form-item prop="title">
                     <el-input v-model="topicContent.title" placeholder="请输入标题"></el-input>
                </el-form-item>
                 <!-- 内容 -->
                <el-form-item prop="content">
                    <quill-editor v-model="topicContent.content"
                    @change="onEditorChange($event)">
                    </quill-editor> 
                    <el-upload
                        action="http://localhost:3000/images"
                        :data="uploadData"
                        :before-upload="beforeUpload"
                        style="display:none"
                        :on-success="uploadSuccess">    
                    </el-upload>
                </el-form-item>
                <!-- 提交 -->
                <el-form-item>
                     <el-button plain>提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import 'quill/dist/quill.bubble.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
// import { quillEditor } from 'vue-quill-editor';
import MyHeader from '@/components/header';
import { Select, Option, Upload } from 'element-ui';
export default {
    data() {
        return {
            // 板块数组
            plateList: [
                {
                    label: '分享',
                    value: 1
                },
                {
                    label: "问答",
                    value: 2
                },
                {
                    label: "招聘",
                    value: 3
                }
            ],
            topicContent: {
                plate: '',
                title: '',
                content: ''
            },
            uploadData: {

            }
        }
    },
    methods: {
        onEditorChange({ html }) {
            console.log(html);
        },
        // 上传前
        beforeUpload (file) {

        },
        // 上传成功后
        uploadSuccess () {}
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
}
.ql-container {
    height: 400px;
}
</style>
