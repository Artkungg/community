<template>
    <nav class="navbar navbar-light bg-light">
        <div class="container-fluid">
            <router-link to="/">Home</router-link>
            <div class="d-flex">
                <router-link v-if="!isAuthen()" class="mx-5" to="/login">Login</router-link>
                <router-link v-if="!isAuthen()" to="/register">Register</router-link>
                <a v-if="isAuthen()" class="mx-5" href="javascript:void(0)" @click="logout()">Logout</a>
            </div>
        </div>
    </nav>
</template>

<script>
import AuthUser from '@/store/AuthUser.js'
export default{
    methods:{
        isAuthen(){
            return AuthUser.getters.isAuthen
        },
        async logout(){
            let res = await AuthUser.dispatch('logout')
            if(res.success){
                this.$router.push('/login')
            }
        }
    }
}
</script>

<style>

</style>