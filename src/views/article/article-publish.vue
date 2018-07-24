<style lang="less">
    @import '../../styles/common.less';
    @import './article-publish.less';
</style>

<template>
  <div>
    <Row>
      <Col span="18">
        <Card>
          <Form :label-width="80">
            <FormItem label="文章标题" :error="articleError">
              <Input v-model="articleTitle" @on-blur="handleArticletitleBlur" icon="android-list" placeholder="请输入文章标题" />
            </FormItem>
          </Form>
          <Form :label-width="80">
            <FormItem label="文章描述">
              <Input v-model="description" icon="android-list" placeholder="请输入20-50字文章描述" />
            </FormItem>
          </Form>
          <Form :label-width="80">
            <FormItem label="缩略图地址">
              <Input v-model="articleThumb" icon="android-list" placeholder="可点击右侧缩略图上传，也可使用第三方图床链接。仅支持单张图片" />
            </FormItem>
          </Form>

          <div class="margin-top-20">
            <textarea id="articleEditor"></textarea>
          </div>
        </Card>
      </Col>
      <Col span="6" class="padding-left-10">
        <Card>
          <p slot="title">
            <Icon type="upload"></Icon>
            缩略图上传(可限制文件类型)
          </p>
          <div class="height-120px">
            <Row type="flex" justify="center" align="middle" class="height-100">
              <Upload name="photos" action="http://127.0.0.1:10007/service/upload/imgUpload" accept="image/*" :format="['jpg', 'png', 'jpeg', 'gif', 'bmp', 'svg']" :on-format-error="handleFormatError" :on-success="uploadSuccess" :before-upload="beforeUpload" show-upload-list>
                <span>选择图片上传&nbsp;&nbsp;</span>
                <Button class="margin-top-20" type="ghost" icon="ios-cloud-upload-outline">上传文件</Button>
              </Upload>
            </Row>
          </div>
        </Card>
        <Card class="margin-top-20">
          <p slot="title">
            <Icon type="paper-airplane"></Icon>
            发布
          </p>
          <p class="">
            <span>文章分类：</span>
            <!-- <Cascader :data="cascade" v-model="classify" @on-change="handleSelectTag"></Cascader> -->
            <Cascader :data="cascade" v-model="classify"></Cascader>
          </p>

          <!-- <Row class="margin-top-20 publish-button-con"> -->
          <Row class="margin-top-20">
            <span class="publish-button">
              <Button @click="handlePreview">预览</Button>
            </span>

            <span class="publish-button">
              <Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button>
            </span>
          </Row>
        </Card>
      </Col>
    </Row>
    <Modal v-model="previewArticle" :width="1000">
      <Card>
        <h1>{{ articleTitle }}</h1>
        <p class="preview-publish-time">
          <Icon type="android-alarm-clock"></Icon>&nbsp;发布时间：{{ publishTime }}</p>
        <div class="preview-tags-con">
          <b class="preview-tip">
            <Icon type="ios-pricetags-outline"></Icon>&nbsp;标签：</b>
          <Tag v-for="item in tagsList" type="border" color="blue" :key="item">{{ item }}</Tag>
        </div>
        <div class="preview-content-con" v-html="content"></div>
        <div class="preview-classifition-con">
          <b class="preview-tip">
            <Icon type="navicon-round"></Icon>&nbsp;目录：</b>
          <a class="preview-classifition-item" v-for="item in classify" :key="item">
            <Icon type="android-folder-open"></Icon>
            {{ item }}
          </a>
        </div>
      </Card>
    </Modal>
  </div>

</template>

<script>
import tinymce from 'tinymce';
var Utils = require('@/libs/utils');

export default {
  name: 'artical-publish',
  data() {
    return {
      routing: false, // 路由判断
      articleID: '',
      articleTitle: '', // 文章标题
      articleThumb: '', // 缩略图
      classify: [], // 文章分类目录
      description: '',
      content: '', // 文章内容
      publishTime: '', // 发布时间

      cascade: [
        {
          value: '服务项目',
          label: '服务项目',
          children: [
            {
              value: '项目详情',
              label: '项目详情',
            }
          ]
        },
        {
          value: '施工案例',
          label: '施工案例',
          children: [
            {
              value: '成品保护',
              label: '成品保护',
            },
            {
              value: '保洁',
              label: '保洁',
            },
            {
              value: '外墙清洗',
              label: '外墙清洗',
            },
            {
              value: '石材翻新',
              label: '石材翻新',
            },
            {
              value: '家政服务',
              label: '家政服务',
            },
            {
              value: '电梯司机',
              label: '电梯司机',
            },
            {
              value: '停车管理',
              label: '停车管理',
            },
            {
              value: '消防工程',
              label: '消防工程',
            },
            {
              value: '拆迁工程',
              label: '拆迁工程',

            }
          ]
        },
        {
          value: '新闻中心',
          label: '新闻中心',
          children: [
            {
              value: '新闻详情',
              label: '新闻详情',

            }
          ]
        }
      ], // 文章分类列表模型

      previewArticle: false, // 文章预览模态框
      tagsList: [],


      articleError: '',


      classificationList: [],

      publishLoading: false,

    };
  },
  computed: {},
  methods: {
    // 路由检测
    routeTest() {
      let curPath = this.$router.history.current.path
      let routeReg = /artical-modify/
      this.routing = routeReg.test(curPath)
      console.log(`%c test route %c ${this.routing}`, "background:greenyellow");

      if (this.routing) {
        let artID = curPath.split('artical-modify/')[1]
        console.log("artID::", artID, decodeURI(artID));
        Utils.api('/api/article/detArticle', {
          "articleID": artID
        }, callback => {
          console.log(callback);
          if (callback.code === 200) {
            // console.log(`%c test callback %c ${this.routing}`, callback, "background:greenyellow");

            let clbArt = callback.data;
            this.articleID = clbArt.articleID
            this.articleTitle = clbArt.title // 文章标题
            this.articleThumb = clbArt.thumb // 缩略图
            this.classify = [clbArt.articleMode, clbArt.articleType] // 文章分类目录
            this.description = clbArt.description
            this.content = clbArt.content // 文章内容
            this.publishTime = clbArt.publish // 发布时间
            tinymce.activeEditor.setContent(this.content)
          }
        })
      }
    },
    // 判断上传格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
      });
    },
    // beforeUpload
    beforeUpload(promise1, promise2, promise3) {
      console.log("befor::", promise1, promise2, promise3);
    },
    // 文件上传回调钩子
    uploadSuccess(response, file, fileList) {
      // console.log("success", response, file, fileList);
      // console.log("t-url", response.data.uri.t_url);
      this.articleThumb = response.data.uri.t_url
    },
    /* 文章标题失去焦点触发 */
    handleArticletitleBlur() {
      if (this.articleTitle.length === 0) {
        this.articleError = '文章标题不可为空哦';
        // this.$Message.error('文章标题不可为空哦')
      } else {
        this.articleError = '';
        // localStorage.articleTitle = this.articleTitle; // 本地存储文章标题
      }
    },

    /* 其他方法调用，判断文章关键项是否为空 */
    canPublish() {
      if (this.articleTitle.length === 0) {
        this.$Message.error('请输入文章标题');
        return false;
      } else if (this.classify.length === 0) {
        this.$Message.error('请选择文章分类');
        return false;
      } else if (this.articleThumb === '') {
        this.$Message.error('建议上传缩略图');
        return false;
      } else if (this.description === '') {
        this.$Message.error('建议输入文章描述');
        return false;
      }
      else { return true }
    },
    /* 文章预览 */
    handlePreview() {
      if (this.canPublish()) {
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hour = date.getHours();
        let minute = date.getMinutes();
        let second = date.getSeconds();
        this.publishTime = year + ' 年 ' + month + ' 月 ' + day + ' 日 -- ' + hour + ' : ' + minute + ' : ' + second;

        this.content = tinymce.activeEditor.getContent();

        this.previewArticle = true;
      }
    },
    /* 文章发布 */
    handlePublish() {
      if (this.canPublish()) {
        this.publishLoading = true;
        let arg = {
          "title": this.articleTitle,
          "articleMode": this.classify[0], // 文章模型 非空 默认值：空字符串
          "articleType": this.classify[1],
          "thumb": this.articleThumb,
          "description": this.description,
          "content": tinymce.activeEditor.getContent(),
        }
        if (this.articleID !== '') arg["articleID"] = this.articleID

        console.log("arg::::----------", arg);
        Utils.api('/api/article/addArticle', arg, callback => {
          if (callback.code === 200) {
            this.publishLoading = false;
            let title = arg.articleID ? '修改成功' : '发布成功';
            this.$Notice.success({
              title: title,
              desc: '文章《' + this.articleTitle + '》保存成功'
            });
          }
        })
      }
    }
  },
  created() {},
  mounted() {
    // 富文本编辑器初始化
    tinymce.init({
      selector: '#articleEditor',
      branding: false,
      elementpath: false,
      height: 600,
      language: 'zh_CN.GB2312',
      menubar: 'edit insert view format table tools',
      theme: 'modern',
      plugins: [
        'advlist autolink lists link image charmap print preview hr anchor pagebreak imagetools',
        'searchreplace visualblocks visualchars code fullscreen fullpage',
        'insertdatetime media nonbreaking save table contextmenu directionality',
        'emoticons paste textcolor colorpicker textpattern imagetools codesample'
      ],
      toolbar1: ' newnote print fullscreen preview | undo redo | insert | styleselect | forecolor backcolor bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image emoticons media codesample',
      autosave_interval: '20s',
      image_advtab: true,
      table_default_styles: {
        width: '100%',
        borderCollapse: 'collapse'
      }
    }).then(() => this.routeTest())
  },
  updated() {
    // console.log("up con");
  },
  destroyed() {
    tinymce.get('articleEditor').destroy();
    console.log("%c 销毁实例", "background:red");
  }
};
</script>
