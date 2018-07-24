<style lang="less" scoped>
  @import '../../styles/common.less';
</style>

<template>
  <div class="imgUpload">
    <Row>
      <Col span="18">
      <Card>
        <Form :label-width="80">
          <FormItem label="图片标题" :error="imgTitleError">
            <Input v-model="imgTitle" @on-blur="handleImgTitleBlur" icon="android-list" placeholder="请输入图片标题" />
          </FormItem>
        </Form>
        <Form :label-width="80">
          <FormItem label="图片描述">
            <Input v-model="description" icon="android-list" placeholder="请输入20-50字图片描述" />
          </FormItem>
        </Form>
        <Form :label-width="80">
          <FormItem label="图片地址">
            <Input v-model="linkURL" icon="image" placeholder="可点击右侧缩略图上传，也可使用第三方图床链接。仅支持单张图片" />
          </FormItem>
        </Form>

        <div class="margin-top-20">
          <img :src="linkURL" :alt="imgTitle" width="100%">
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
          <span>图片分类：</span>

          <Cascader :data="imgsCascade" v-model="classify" trigger="hover"></Cascader>
        </p>

        <!-- <Row class="margin-top-20 publish-button-con"> -->
        <Row class="margin-top-20">
          <span class="publish-button">
            <Button @click="handlePublish" :loading="publishLoading" icon="ios-checkmark" style="width:90px;" type="primary">发布</Button>
          </span>
        </Row>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
var Utils = require('@/libs/utils');
import util from '@/libs/util.js';

export default {
  name: '',
  data() {
    return {
      imgTitleError: '',
      imgTitle: '',
      description: '',
      linkURL: '',
      imgsCascade: [
        {
          value: 1,
          label: '荣誉证书'
        },
        {
          value: 2,
          label: '团队风采'
        },
      ], // 图片分类 菜单列表,
      classify: [],
      publishLoading: false
    };
  },
  computed: {},
  methods: {
    /* 图片标题失去焦点触发 */
    handleImgTitleBlur() {
      if (this.imgTitle.length === 0) {
        this.imgTitleError = '图片标题不可为空哦';
        // this.$Message.error('图片标题不可为空哦')
      }
    },
    // 判断上传格式
    handleFormatError(file) {
      this.$Notice.warning({
        title: '文件格式不正确',
        desc: '文件 ' + file.name + ' 格式不正确，请选择图片文件。'
      });
    },
    beforeUpload(promise1, promise2, promise3) {
      console.log("befor::", promise1, promise2, promise3);
    },
    // 文件上传回调钩子
    uploadSuccess(response, file, fileList) {
      console.log("success", response, file, fileList);
      // console.log("t-url", response.data.uri.t_url);
      this.linkURL = response.data.uri.linkurl
    },
    /* 图片发布 */
    handlePublish() {
      if (this.canPublish()) {
        this.publishLoading = true;

        let arg = {
          "title": this.imgTitle,
          "imgMode": this.classify[0],
          "imgItem": this.classify[1],
          "linkURL": this.linkURL,
          "description": this.description
        }

        console.log("arg::::----------", arg);
        Utils.api('/api/addImg', arg, callback => {
          if (callback.code === 200) {
            this.publishLoading = false;
            this.$Notice.success({
              title: '发布成功',
              desc: '图片《' + this.imgTitle + '》保存成功'
            });
          }
        })
      }
    },
    /* 其他方法调用，判断图片关键项是否为空 */
    canPublish() {
      if (this.imgTitle.length === 0) {
        this.$Message.error('请输入图片标题');
        return false;
      } else if (this.classify.length === 0) {
        this.$Message.error('请选择图片分类');
        return false;
      } else if (this.linkURL === '') {
        this.$Message.error('请上传图片');
        return false;
      } else if (this.description === '') {
        this.$Message.error('建议输入图片描述');
        return false;
      }
      else { return true }
    },
    searchImgList() {
      Utils.api('/api/searchImgList', {}, callback => {
        console.log("callback", callback);
        if (callback.code === 200) {
          for (const item of callback.data.items) {
            let children = {
              value: item.imgItem,
              label: item.imgItem
            };

            let inArr = util.getIndex(this.imgsCascade, "value", item.imgMode)

            let thisObj = this.imgsCascade[inArr]

            if (inArr > -1) {
              thisObj.children ?
                thisObj.children.push(children) :
                thisObj.children = [children];
            } else {
              this.imgsCascade.push({
                value: item.imgMode,
                label: item.imgItem,
                children: [children]
              })
            }
          }
        }
      })
    },
  },
  created() {
    this.searchImgList()
  }
}
</script>
