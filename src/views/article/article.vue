<style lang="less">
    @import '../../styles/common.less';
    @import './article.less';
</style>

<template>
  <div class="article">
    <Row>
      <Col span="24">
      <Card>
        <p slot="title">
          <Icon type="android-contact"></Icon>
          选择文章列表
        </p>
        <div class="article-con">
          <Row :gutter="16">
            <Col span="6">
              <Cascader :data="articleCascade" v-model="articleCascadeType" trigger="hover"></Cascader>
            </Col>
            <Col span="6">
              <Button type="primary" shape="circle" icon="ios-search" @click="searchArt">Search</Button>
            </Col>
          </Row>
          <Table class="margin-top-20" stripe border :columns="articleCol" :data="articleList"></Table>
        </div>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
var Utils = require('@/libs/utils');
import Cookies from 'js-cookie';

export default {
  name: 'access_index',
  components: {},
  data() {
    return {
      modifyArtModal: false,
      articleCascade: [
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
      ], // 文章分类 菜单列表
      articleCascadeType: [], // 文章分类 已选择数据
      columns1: [
        {
          title: 'ArticleID',
          key: 'articleID'
        },
        {
          title: '文章标题',
          key: 'title'
        },
        {
          title: '文章日期',
          key: 'publish'
        }
      ], // 列表表头
      articleList: [] // 列表数据
    };
  },
  computed: {
    articleCol() {
      let col = [];
      col.push(
        {
          title: 'ArticleID',
          key: 'articleID'
        },
        {
          title: '文章标题',
          key: 'title'
        },
        {
          title: '文章日期',
          key: 'publish'
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
                        console.log(`我是params`, params);
                        console.log(`这是第${params.index + 1}行数据`, params.row.articleID);

                        // 做路由跳转
                        this.$router.push({
                          path: `artical-modify/${params.row.articleID}`
                        });
                      }
                    }
                  },
                  "修改"
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

                        this.deleteArt(params.row.articleID, params.index, params.row.title)
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
    searchArt() {
      if (this.articleCascadeType.length !== 0) {
        Utils.api('/api/article/searchArticle', {
          "articleMode": this.articleCascadeType[0],
          "articleType": this.articleCascadeType[1] // 文章分类 String 非空
        }, callback => {
          let artList = callback.data.items
          // this.articleList = artList.map((item, index) => item )
          this.articleList = artList
          console.log("artList", artList);
        })
      } else this.$Message.error('请选择文章分类')
    },
    detailArt(articleID) {
      Utils.api('/api/article/detArticle', {
        "articleID": articleID
      }, callback => {
        
        console.log("artDetCLB:::", callback);
        
        if (callback.code === 200) {
          
          this.modifyArtModal = true
          this.articleContent = callback.data
        }
      })
    },
    deleteArt(articleID, index, title){
      Utils.api('/api/article/delArticle', {
        "articleID": articleID
      }, callback => {
        console.log(callback);
        if (callback.code === 200) {
          // this.remove(params.index);
          this.articleList.splice(index, 1);
          this.$Notice.success({
            title: '删除成功',
            desc: '文章《' + title + '》删除成功'
          });
        }
      })
    },
    modifyArt() {
      // 启动 minyce
      this.modifyArtModal = true
      // 进行赋值
      console.log('articleListCallback', this.articleList);
      // 修改

      // Modal 中 的插件修改其他细节 , Button按钮调用,修改文章的 方法
    }
  },
  mounted() { }
};
</script>

<style>
</style>
