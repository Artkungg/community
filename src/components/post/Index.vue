<template>
    <div class="container-fluid">
        <div class="row justify-content-center mt-4">
            <div class="col-sm-12 col-md-9 col-lg-6">

                <add-post></add-post>

                <div class="mt-5" v-if="posts.length">
                    <div class="p-2" v-for="(post, index) in posts" :key="index">
                        <div class="card">
                            <div class="card-body">
                                <div>
                                    <h5 class="card-title">Card title</h5>
                                    <font-awesome-icon icon="fa-solid fa-ellipsis" />
                                </div>

                                <div class="card-text" v-html="post.detail"></div>

                                <div class="row"  v-if="post.files.length">
                                    <div class="col-sm-8" v-for="(file, i) in post.files.slice(0, 1)" :key="i">
                                        <img style="width: 100%; height: 100%;" :src=file.file_path />
                                    </div>
                                    <div class="col-sm-4">
                                        <div class="row" v-for="(file, i) in post.files.slice(1)" :key="i">
                                            <img style="width: 100%; height: auto;" :src=file.file_path />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AuthService from '@/services/AuthService'
import AuthUser from '@/store/AuthUser'
import Post from '@/store/Post'
import Editor from './Editor.vue'
import AddPost from './Add.vue'

export default{
    components: {
        Editor,
        AddPost,
    },

    data(){
        return{
            posts: [],
            files: [],
        }
    },

    async created(){
        await this.fetchPosts()
    },

    methods:{
        async fetchPosts(){
            await Post.dispatch('fetchPosts', AuthUser.getters.user.id)
            this.posts = Post.getters.posts
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/post_scss.scss';
</style>