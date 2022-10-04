<template>
    <div class="container-fluid">
        <div class="wrapper">
            <div class="text-center mt-4 name">
                Register
            </div>
            <form @submit.prevent="register" class="p-3 mt-3">
                <div class="form-field d-flex align-items-center">
                    <!-- <span class="far fa-user"></span> -->
                    <input type="text" v-model="form.firstname" placeholder="Firstname">
                </div>
                <div class="form-field d-flex align-items-center">
                    <!-- <span class="far fa-user"></span> -->
                    <input type="text" v-model="form.lastname" placeholder="Lastname">
                </div>
                <div class="form-field d-flex align-items-center">
                    <!-- <span class="far fa-user"></span> -->
                    <input type="text" v-model="form.email" placeholder="Email">
                </div>
                <div class="form-field d-flex align-items-center">
                    <!-- <span class="fas fa-key"></span> -->
                    <input type="password" v-model="form.password" placeholder="Password">
                </div>
                <div class="form-field d-flex align-items-center">
                    <!-- <span class="far fa-user"></span> -->
                    <input type="password" v-model="form.password_confirm" placeholder="Password Confirm">
                </div>
                <button class="btn mt-3">Sign up</button>
            </form>
        </div>
    </div>
</template>

<script>
import AuthUser from '@/store/AuthUser.js'
export default {
    data(){
        return{
            form:{
                firstname: '',
                lastname: '',
                email: '',
                password: '',
                password_confirm: ''
            }
        }
    },
    methods:{
        async register(){
            let res = await AuthUser.dispatch('register', this.form)
            if(res.success){
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style scoped lang="scss">
@import '@/assets/login.scss'
</style>