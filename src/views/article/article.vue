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
                    <Table stripe :columns="columns1" :data="data1"></Table>
                </div>
            </Card>
            </Col>

        </Row>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
export default {
    name: 'access_index',
    data() {
        return {
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
            ], // 文章分类列表模型
            columns1: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'Address',
                    key: 'address'
                }
            ],
            data1: []
        };
    },
    computed: {

    },
    methods: {
        
    },
    mounted() {
        this.data1 = [
            {
                name: 'John Brown222',
                age: 18,
                address: 'New York No. 1 Lake Park',
                date: '2016-10-03'
            },
            {
                name: 'Jim Green',
                age: 24,
                address: 'London No. 1 Lake Park',
                date: '2016-10-01'
            },
            {
                name: 'Joe Black',
                age: 30,
                address: 'Sydney No. 1 Lake Park',
                date: '2016-10-02'
            },
            {
                name: 'Jon Snow',
                age: 26,
                address: 'Ottawa No. 2 Lake Park',
                date: '2016-10-04'
            }
        ]
    }

};
</script>

<style>
</style>
