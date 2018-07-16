<style lang="less">
    // @import '../../styles/common.less';
    @import './articleDetail.less';
</style>

<template>
    <div class="articleDetail">
        <Row>
            <Col span="24">
                <Card>
                    <p slot="title">
                        <!-- <Icon type="android-contact"></Icon> -->
                        文章详情
                    </p>
                    <div class="article-con">
                       <!--  <img :src="avatorPath" alt="">
                        <p>当前用户权限值:<b>{{ accessCode }}</b></p> -->
                        文章内容
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
    data () {
        return {
           /*  accessCode: parseInt(Cookies.get('access')),
            switchValue: parseInt(Cookies.get('access')) === 1 */
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
