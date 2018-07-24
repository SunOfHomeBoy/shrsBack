<style lang="less">
    // @import '../../styles/common.less';
    // @import './article.less';
</style>

<template>
  <div class="article">
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="images"></Icon>
          图片管理
        </p>
        <div class="article-con">
          <Row :gutter="16">
            <Col span="6">
            <Cascader :data="imgsCascade" v-model="imgsCascadeType" trigger="hover"></Cascader>
            </Col>
            <Col span="6">
            <Button type="primary" shape="circle" icon="ios-search" @click="searchImg">Search</Button>
            </Col>
          </Row>
          <Table class="margin-top-20" stripe border :columns="articleCol" :data="imgList"></Table>
        </div>
      </Card>
      </Col>
    </Row>
    <Modal v-model="modifyImgModal" :width="1000">
      <img :src="checkImg" alt="" width="100%">
    </Modal>
  </div>
</template>

<script>
var Utils = require('@/libs/utils');
import Cookies from 'js-cookie';
import util from '@/libs/util.js';

export default {
  name: '',
  data() {
    return {
      modifyImgModal: false,
      checkImg: '',
      imgList: [],
      imgsCascade: [
        {
          value: 1,
          label: '荣誉证书'
        },
        {
          value: 2,
          label: '团队风采'
        },
      ], // 图片分类 菜单列表
      imgsCascadeType: [], // 已选择图片分类
    };
  },
  computed: {
    articleCol() {
      let col = [];

      col.push(
        {
          title: 'imgID',
          key: 'imgID'
        },
        {
          title: '图片标题',
          key: 'title'
        },
        {
          title: '图片地址',
          key: 'linkURL'
        },
        {
          title: "操作",
          key: "action",
          // width: 200,
          align: "center",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {}
              },
              [
                h(
                  "Button",
                  {
                    props: {
                      type: "warning",
                      size: "small"
                    },
                    style: {
                      marginRight: "10px"
                    },
                    on: {
                      click: () => {
                        this.modifyImgModal = true;
                        this.checkImg = params.row.linkURL
                        console.log(params);
                      }
                    }
                  },
                  "查看"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error",
                      size: "small"
                    },
                    style: {},
                    on: {
                      click: () => {
                        // 调用删除方法，加删除数据库api
                        // 界面删除、数据库删除
                        // (params.row.articleID)
                        // this.tableData.splice(index, 1);
                        console.log(params.row);
                        this.deleteImg(params.row.imgID, params.index, params.row.title)
                      }
                    }
                  },
                  "删除"
                )
              ]
            )
          }
        }
      )
      return col
    }
  },
  methods: {
    searchImg() {
      if (this.imgsCascadeType.length !== 0) {
        Utils.api('/api/searchImg', {
          "imgMode": this.imgsCascadeType[0],
          "imgItem": this.imgsCascadeType[1] // 文章分类 String 非空
        }, callback => {
          console.log("callback searchImg", callback);
          if (callback.code === 200) {
            this.imgList = callback.data.items
          }
        })
      } else this.$Message.error('请选择图片分类')
    },
    searchImgList() {
      Utils.api('/api/searchImgList', {}, callback => {
        console.log("searchImgList", callback);

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
    deleteImg(imgID, index, title){
      Utils.api('/api/delImg', {
        "imgID": imgID
      }, callback => {
        console.log(callback);
        if (callback.code === 200) {
          // this.remove(params.index);
          this.imgList.splice(index, 1);
          this.$Notice.success({
            title: '删除成功',
            desc: '图片《' + title + '》删除成功'
          });
        }
      })
    }
  },
  created() {
    this.searchImgList()
  }
};
</script>

<style>
</style>
