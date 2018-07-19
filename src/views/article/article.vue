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
            data1: [
                {
                    name: 'John Brown',
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
        };
    },
    computed: {
        /*  avatorPath () {
             return localStorage.avatorImgPath;
         } */
    },
    methods: {
        /* changeAccess (res) {
            if (res) {
                this.accessCode = 1;
                Cookies.set('access', 1);
            } else {
                this.accessCode = 0;
                Cookies.set('access', 0);
            }
            this.$store.commit('updateMenulist');
        } */
    }
};
</script>

<style>
</style>
