<template>
    <div class="container-fluid">
        <div class="wrapper">
            <div class="logo">
                <img src="https://www.freepnglogos.com/uploads/twitter-logo-png/twitter-bird-symbols-png-logo-0.png" alt="">
            </div>
            <div class="text-center mt-4 name">
                Twitter
            </div>
            <form @submit.prevent="login" class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <!-- <span class="far fa-user"></span> -->
                    <input type="text" v-model="form.email" placeholder="Email">
                </div>
                <div class="form-field d-flex align-items-center">
                    <!-- <span class="fas fa-key"></span> -->
                    <input type="password" v-model="form.password" placeholder="Password">
                </div>
                <button class="btn mt-3">Login</button>
            </form>
            <div class="text-center fs-6">
                <a href="#">Forget password?</a> or <a href="#">Sign up</a>
            </div>
        </div>
    </div>
</template>

<script>
import AuthUser from '@/store/AuthUser.js'
export default{
    data(){
        return{
            form: {
                email: '',
                password: ''
            }
        }
    },
    methods:{
        async login(){
            let res = await AuthUser.dispatch('login', this.form)
            if(res.success){
                this.$router.push('/')
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/login.scss';
</style>