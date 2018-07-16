<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.userName" placeholder="请输入用户名">
                            <span slot="prepend">
                                <Icon :size="16" type="person"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                            <span slot="prepend">
                                <Icon :size="14" type="locked"></Icon>
                            </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                    <p v-show="unLogin" class="login-tip">用户名或密码错误</p>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import Cookies from 'js-cookie';
import logoH from '@/images/logo-min.jpg'
// import api from '@/libs/utils'
// var api = require('@/libs/utils/api.js')
var Utils = require('@/libs/utils')

export default {
    data() {
        return {
            unLogin: false,
            form: {
                userName: '',
                password: ''
            },
            rules: {
                userName: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit() {
            this.$refs.loginForm.validate((valid) => {
                console.log(this.$refs.loginForm);
                console.log("-----------------------------")
                console.log("valid::", valid);
                console.log("-----------------------------")

                if (valid) {
                    Utils.api('/api/searchImg', {
                        "imgMode": 2,
                        imgItem: "外墙清洗"
                    }, callback => {
                        console.log(callback);
                        if (callback[xxx] === "asd") {


                            // Cookies.set('user', this.form.userName);
                            // Cookies.set('password', this.form.password);
                            // this.$store.commit('setAvator', logoH);
                            // if (this.form.userName === '四海日盛') {
                            //     Cookies.set('access', 0);
                            // } else {
                            //     Cookies.set('access', 1);
                            // }
                        } else {
                            this.unLogin = true
                        }

                    })
                    console.log(this.$router);
                    Cookies.set('user', this.form.userName);
                    Cookies.set('password', this.form.password);
                    this.$store.commit('setAvator', logoH);
                    if (this.form.userName === '四海日盛') {
                        Cookies.set('access', 0);
                    } else {
                        Cookies.set('access', 1);
                    }
                    this.$router.push({
                        name: 'home_index'
                    });
                }

                /*  axios.post('http://localhost:10007/api/searchImg', {
                     parameters: JSON.stringify({
                         "imgMode": 2,
                         imgItem: "外墙清洗"
                     })
                 }, {
                         transformRequest: [
                             (data) => {
                                 let buf = []
 
                                 for (let i in data) {
                                     buf.push(...[
                                         global.encodeURIComponent(i),
                                         '=',
                                         global.encodeURIComponent(data[i]),
                                         '&'
                                     ])
                                 }
 
                                 return buf.join('')
                             }
                         ],
                         headers: {
                             'Content-Type': 'application/x-www-form-urlencoded'
                         }
                     })
                     .then(function (response) {
                         console.log("axiosNative", response);
                     })
                     .catch(function (error) {
                         console.log(error);
                     }); */
            });
        }
    }
};
</script>

<style>
</style>
